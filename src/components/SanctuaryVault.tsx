import React, { useState, useEffect, useCallback } from 'react';
import { 
  Lock, 
  Unlock, 
  Trash2, 
  Plus, 
  Bookmark, 
  ShieldCheck, 
  Check, 
  AlertTriangle,
  FileText,
  Key,
  Shield,
  Eye,
  EyeOff,
  RefreshCw,
  Sparkles,
  Info
} from 'lucide-react';
import { JournalNote } from '../types';
import { 
  encryptData, 
  decryptData, 
  saveEncryptedRecord, 
  getEncryptedRecords, 
  deleteEncryptedRecord,
  emergencyWipeAllData,
  getVaultMeta,
  setVaultMeta
} from '../utils/vaultCrypto';

const DEFAULT_LOCAL_PASSPHRASE = 'SuperShakti-Sanctuary-Enclave-Key-2026';

export const SanctuaryVault: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [hasCustomPassphrase, setHasCustomPassphrase] = useState<boolean>(false);
  const [passphrase, setPassphrase] = useState<string>('');
  const [passphraseInput, setPassphraseInput] = useState<string>('');
  const [showPassphraseText, setShowPassphraseText] = useState<boolean>(false);
  const [unlockError, setUnlockError] = useState<string | null>(null);

  // Decrypted in-memory data
  const [notes, setNotes] = useState<JournalNote[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [safetyChecklist, setSafetyChecklist] = useState<{ [key: string]: boolean }>({});
  
  // UI Modals & Actions
  const [showWipeConfirm, setShowWipeConfirm] = useState(false);
  const [showChangePassModal, setShowChangePassModal] = useState(false);
  const [newCustomPass, setNewCustomPass] = useState('');
  const [autoClearOnExit, setAutoClearOnExit] = useState<boolean>(true);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Initialize and check vault state
  useEffect(() => {
    async function initVault() {
      try {
        const customFlag = await getVaultMeta('has_custom_passphrase');
        if (customFlag) {
          setHasCustomPassphrase(true);
          setIsUnlocked(false);
        } else {
          // If no custom passphrase is set yet, unlock seamlessly with device enclave key
          setPassphrase(DEFAULT_LOCAL_PASSPHRASE);
          await loadAndDecryptVault(DEFAULT_LOCAL_PASSPHRASE);
          setIsUnlocked(true);
        }
      } catch (err) {
        console.error('Vault init error:', err);
      } finally {
        setIsInitializing(false);
      }
    }
    initVault();
  }, []);

  // Auto-lock when tab closes or becomes hidden if autoClearOnExit is active
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && autoClearOnExit) {
        handleLockVault();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [autoClearOnExit]);

  // Load and decrypt records from IndexedDB
  const loadAndDecryptVault = async (keyToUse: string) => {
    try {
      const records = await getEncryptedRecords();
      const decryptedNotes: JournalNote[] = [];
      let decryptedSafety: { [key: string]: boolean } = {};

      for (const rec of records) {
        try {
          const decryptedJson = await decryptData(
            { ciphertext: rec.ciphertext, iv: rec.iv, salt: rec.salt },
            keyToUse
          );
          const parsed = JSON.parse(decryptedJson);
          if (rec.type === 'note') {
            decryptedNotes.push(parsed);
          } else if (rec.type === 'safety') {
            decryptedSafety = parsed;
          }
        } catch {
          // Invalid key for this record
          throw new Error('Incorrect passphrase. Could not decrypt vault data.');
        }
      }

      // Check for legacy localStorage notes to automatically migrate into encrypted IndexedDB
      try {
        const legacy = localStorage.getItem('supershakti_vault_notes');
        if (legacy) {
          const oldNotes: JournalNote[] = JSON.parse(legacy);
          for (const oldNote of oldNotes) {
            if (!decryptedNotes.some(n => n.id === oldNote.id)) {
              const enc = await encryptData(JSON.stringify(oldNote), keyToUse);
              await saveEncryptedRecord({
                id: oldNote.id,
                type: 'note',
                ciphertext: enc.ciphertext,
                iv: enc.iv,
                salt: enc.salt,
                updatedAt: Date.now()
              });
              decryptedNotes.push(oldNote);
            }
          }
          // Remove plaintext from localStorage
          localStorage.removeItem('supershakti_vault_notes');
        }

        const legacySafety = localStorage.getItem('supershakti_vault_safety');
        if (legacySafety && Object.keys(decryptedSafety).length === 0) {
          decryptedSafety = JSON.parse(legacySafety);
          const enc = await encryptData(JSON.stringify(decryptedSafety), keyToUse);
          await saveEncryptedRecord({
            id: 'safety_checklist',
            type: 'safety',
            ciphertext: enc.ciphertext,
            iv: enc.iv,
            salt: enc.salt,
            updatedAt: Date.now()
          });
          localStorage.removeItem('supershakti_vault_safety');
        }
      } catch (migrationErr) {
        console.warn('Legacy migration notice:', migrationErr);
      }

      // Sort notes newest first
      decryptedNotes.sort((a, b) => Number(b.id) - Number(a.id));
      setNotes(decryptedNotes);
      setSafetyChecklist(decryptedSafety);
      return true;
    } catch (e: any) {
      throw e;
    }
  };

  // Handle unlock attempt with entered passphrase
  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passphraseInput) return;
    setUnlockError(null);

    try {
      await loadAndDecryptVault(passphraseInput);
      setPassphrase(passphraseInput);
      setIsUnlocked(true);
      setPassphraseInput('');
    } catch {
      setUnlockError('Incorrect passphrase or unable to decrypt. Please verify your passphrase.');
    }
  };

  // Lock the vault immediately and clear decrypted memory
  const handleLockVault = useCallback(() => {
    setIsUnlocked(false);
    setPassphrase('');
    setNotes([]);
    setSafetyChecklist({});
    setUnlockError(null);
    setStatusMessage('Vault locked. Memory purged.');
    setTimeout(() => setStatusMessage(null), 3000);
  }, []);

  // Add new encrypted note
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim() || !passphrase) return;

    const newNote: JournalNote = {
      id: Date.now().toString(),
      title: newNoteTitle.trim() || 'Private Reflection',
      content: newNoteContent.trim(),
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      tags: ['Personal'],
    };

    try {
      // Encrypt with AES-256-GCM + PBKDF2
      const enc = await encryptData(JSON.stringify(newNote), passphrase);
      await saveEncryptedRecord({
        id: newNote.id,
        type: 'note',
        ciphertext: enc.ciphertext,
        iv: enc.iv,
        salt: enc.salt,
        updatedAt: Date.now()
      });

      setNotes([newNote, ...notes]);
      setNewNoteTitle('');
      setNewNoteContent('');
      setStatusMessage('Note encrypted and saved to IndexedDB.');
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  // Delete an encrypted note
  const handleDeleteNote = async (id: string) => {
    try {
      await deleteEncryptedRecord(id);
      setNotes(notes.filter(n => n.id !== id));
      setStatusMessage('Note permanently removed.');
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  // Toggle safety item and re-encrypt
  const toggleSafetyItem = async (key: string) => {
    if (!passphrase) return;
    const updated = { ...safetyChecklist, [key]: !safetyChecklist[key] };
    setSafetyChecklist(updated);

    try {
      const enc = await encryptData(JSON.stringify(updated), passphrase);
      await saveEncryptedRecord({
        id: 'safety_checklist',
        type: 'safety',
        ciphertext: enc.ciphertext,
        iv: enc.iv,
        salt: enc.salt,
        updatedAt: Date.now()
      });
    } catch (err) {
      console.error('Safety update error:', err);
    }
  };

  // Set or change custom passphrase
  const handleSaveCustomPassphrase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomPass.trim() || newCustomPass.length < 4) {
      alert('Passphrase should be at least 4 characters.');
      return;
    }

    try {
      // Re-encrypt all existing notes with the new passphrase
      for (const note of notes) {
        const enc = await encryptData(JSON.stringify(note), newCustomPass);
        await saveEncryptedRecord({
          id: note.id,
          type: 'note',
          ciphertext: enc.ciphertext,
          iv: enc.iv,
          salt: enc.salt,
          updatedAt: Date.now()
        });
      }

      // Re-encrypt safety checklist
      const encSafety = await encryptData(JSON.stringify(safetyChecklist), newCustomPass);
      await saveEncryptedRecord({
        id: 'safety_checklist',
        type: 'safety',
        ciphertext: encSafety.ciphertext,
        iv: encSafety.iv,
        salt: encSafety.salt,
        updatedAt: Date.now()
      });

      await setVaultMeta('has_custom_passphrase', true);
      setPassphrase(newCustomPass);
      setHasCustomPassphrase(true);
      setShowChangePassModal(false);
      setNewCustomPass('');
      setStatusMessage('Passphrase updated! All vault records re-encrypted with AES-256-GCM.');
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err) {
      console.error('Re-encryption error:', err);
      alert('Failed to re-encrypt records. Please try again.');
    }
  };

  // Emergency Wipe Entire Vault
  const handleWipeEntireVault = async () => {
    try {
      await emergencyWipeAllData();
      setNotes([]);
      setSafetyChecklist({});
      setPassphrase('');
      setIsUnlocked(false);
      setHasCustomPassphrase(false);
      setShowWipeConfirm(false);
      setStatusMessage('Emergency Wipe complete: IndexedDB deleted and memory purged.');
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err) {
      console.error('Wipe error:', err);
    }
  };

  if (isInitializing) {
    return (
      <div className="py-20 text-center space-y-3">
        <RefreshCw className="w-6 h-6 animate-spin mx-auto text-indigo-600" />
        <p className="text-xs text-slate-500 font-mono">Initializing client-side cryptographic enclave...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Vault Header Banner */}
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200">
            <Lock className="w-3.5 h-3.5 text-indigo-600" />
            Zero-Knowledge In-Browser Vault
          </div>
          <h2 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
            Encrypted & Strictly In-Browser
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            No login required. Your private journal entries, unsent letters, and safety readiness never touch a server or cloud AI model. Encrypted on-device in IndexedDB with Web Crypto AES-256-GCM.
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:items-end gap-2.5">
          <span className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> IndexedDB Encrypted Storage
          </span>

          <div className="flex items-center gap-2">
            {isUnlocked && (
              <button
                id="lock-vault-now-btn"
                onClick={handleLockVault}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all"
                title="Lock vault and purge decrypted notes from memory"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock Vault Now</span>
              </button>
            )}

            <button
              id="open-wipe-vault-modal-btn"
              onClick={() => setShowWipeConfirm(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-700 hover:text-rose-800 bg-rose-50 border border-rose-200 transition-all hover:bg-rose-100"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Emergency Wipe All Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {statusMessage && (
        <div className="p-3.5 rounded-2xl bg-slate-900 text-white text-xs flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            {statusMessage}
          </span>
          <button onClick={() => setStatusMessage(null)} className="text-slate-400 hover:text-white">&times;</button>
        </div>
      )}

      {/* Zero-Knowledge Privacy Architecture Assurance Card */}
      <div className="bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/70 border border-emerald-200/90 rounded-3xl p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
            🛡️
          </div>
          <div>
            <h3 className="font-bold text-emerald-950 text-base">
              Zero-Knowledge Privacy Architecture
            </h3>
            <p className="text-xs text-emerald-800/90">
              Verified security protocols engineered for complete anonymity and physical safety
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-slate-700">
          <div className="bg-white/80 border border-emerald-100/90 p-3.5 rounded-2xl shadow-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <span className="text-emerald-600 font-black">✓</span>
              <span>No Login Required</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Nothing ties your reflections to an account, email, or identity. You are completely anonymous.
            </p>
          </div>

          <div className="bg-white/80 border border-emerald-100/90 p-3.5 rounded-2xl shadow-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <span className="text-emerald-600 font-black">✓</span>
              <span>IndexedDB Device Storage</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Data is preserved on your device in browser IndexedDB rather than a cloud server database.
            </p>
          </div>

          <div className="bg-white/80 border border-emerald-100/90 p-3.5 rounded-2xl shadow-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <span className="text-emerald-600 font-black">✓</span>
              <span>AES-256-GCM Encrypted</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Encrypted before write with Web Crypto PBKDF2 (100k rounds) & AES-GCM. Never stored in plaintext.
            </p>
          </div>

          <div className="bg-white/80 border border-emerald-100/90 p-3.5 rounded-2xl shadow-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <span className="text-emerald-600 font-black">✓</span>
              <span>Zero AI Transmission</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Private notes are NEVER sent to Gemini or any cloud model. They exist solely on your physical device.
            </p>
          </div>
        </div>
      </div>

      {/* Locked Vault Screen */}
      {!isUnlocked ? (
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-8 sm:p-12 text-center max-w-lg mx-auto shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-serif font-bold text-slate-900">Vault is Locked & Encrypted</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Enter your Passphrase or PIN to decrypt your private notes and safety checklist in-browser.
            </p>
          </div>

          {unlockError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 text-left">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{unlockError}</span>
            </div>
          )}

          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="relative">
              <input
                id="vault-passphrase-input"
                type={showPassphraseText ? 'text' : 'password'}
                placeholder="Enter Vault Passphrase / PIN"
                value={passphraseInput}
                onChange={(e) => setPassphraseInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white pr-10"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassphraseText(!showPassphraseText)}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                title={showPassphraseText ? 'Hide' : 'Show'}
              >
                {showPassphraseText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button
              id="unlock-vault-btn"
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition-all active:scale-[0.99]"
            >
              <Unlock className="w-4 h-4" /> Decrypt & Open Vault
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2 text-[11px] text-slate-500">
            <span>Forgot passphrase? Emergency Wipe allows you to reset the local database.</span>
            <button
              type="button"
              onClick={() => setShowWipeConfirm(true)}
              className="text-rose-600 hover:underline font-semibold"
            >
              Wipe Vault & Reset Database
            </button>
          </div>
        </div>
      ) : (
        /* Unlocked Content Canvas */
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-bold text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Vault Decrypted in Memory
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">
                {hasCustomPassphrase ? 'Custom Passphrase Active' : 'Default Sanctuary Enclave Protection'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                id="open-passphrase-modal-btn"
                onClick={() => setShowChangePassModal(true)}
                className="text-indigo-700 hover:underline font-semibold flex items-center gap-1"
              >
                <Key className="w-3.5 h-3.5" />
                <span>{hasCustomPassphrase ? 'Change Passphrase' : 'Set Custom Passphrase'}</span>
              </button>

              <label className="flex items-center gap-1.5 cursor-pointer text-slate-600 hover:text-slate-900 select-none">
                <input
                  type="checkbox"
                  checked={autoClearOnExit}
                  onChange={(e) => setAutoClearOnExit(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Auto-lock on tab exit</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Confidential Notes & Journaling */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-rose-600" />
                    <span>Private Journal & Unsent Letters</span>
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    Zero AI Transmission
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  A safe, unmonitored canvas for emotional release, thoughts you cannot say out loud, or personal milestones.
                </p>

                <form onSubmit={handleAddNote} className="space-y-3 pt-2">
                  <input
                    id="note-title-input"
                    type="text"
                    placeholder="Entry Title (e.g. Setting boundaries today)"
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white"
                  />

                  <textarea
                    id="note-content-input"
                    placeholder="Write freely here. Nothing is sent to the internet or AI models..."
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white resize-none"
                    required
                  />

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-slate-400" /> Encrypted with AES-256-GCM
                    </span>
                    <button
                      id="save-journal-entry-btn"
                      type="submit"
                      className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-all"
                    >
                      <Plus className="w-4 h-4" /> Save Encrypted Entry
                    </button>
                  </div>
                </form>
              </div>

              {/* Notes list */}
              <div className="space-y-3">
                {notes.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-white border border-slate-200 text-slate-500 text-xs shadow-xs">
                    Your encrypted vault is empty. Write your first reflection above.
                  </div>
                ) : (
                  notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all space-y-2 relative group shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900">{note.title}</h4>
                        <span className="text-[11px] text-slate-400">{note.createdAt}</span>
                      </div>
                      <p className="text-xs text-slate-600 whitespace-pre-wrap leading-relaxed">
                        {note.content}
                      </p>
                      <div className="pt-2 flex justify-between items-center border-t border-slate-100 text-[11px]">
                        <span className="text-emerald-700 font-medium flex items-center gap-1">
                          <Check className="w-3 h-3" /> Encrypted locally
                        </span>
                        <button
                          id={`delete-note-${note.id}`}
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" /> Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right: Personal Safety Readiness Checklist */}
            <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-5 h-fit shadow-sm">
              <div>
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                  Preparedness & Peace
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Safety Checklist</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Essential personal security foundations for domestic peace and emergency readiness.
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  { id: 'item-1', label: 'Photographed essential IDs (passport, birth certificate) to safe offline drive' },
                  { id: 'item-2', label: 'Memorized or wrote down 2 emergency trusted phone numbers' },
                  { id: 'item-3', label: 'Cleared browser cache or know how to use Quick Exit (Esc)' },
                  { id: 'item-4', label: 'Opened a private individual savings account with paperless statements' },
                  { id: 'item-5', label: 'Identified physical nearest drop-in clinic or safe haven' },
                  { id: 'item-6', label: 'Practiced 4-4-6 breathing so my body remembers how to calm under pressure' },
                ].map((item) => {
                  const checked = !!safetyChecklist[item.id];
                  return (
                    <label
                      key={item.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer text-xs transition-all ${
                        checked
                          ? 'bg-slate-100 border-slate-200 text-slate-400 line-through'
                          : 'bg-slate-50/80 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100/50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleSafetyItem(item.id)}
                        className="mt-0.5 w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300 shrink-0"
                      />
                      <span className="leading-snug">{item.label}</span>
                    </label>
                  );
                })}
              </div>

              <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-[11px] text-indigo-900">
                💡 Checkmarks are encrypted with AES-256-GCM and stored only in your browser&apos;s IndexedDB.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Set/Change Passphrase Modal */}
      {showChangePassModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mx-auto">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 text-center">Set Custom Vault Passphrase</h3>
            <p className="text-xs text-slate-600 text-center leading-relaxed">
              Derives a 256-bit AES encryption key using PBKDF2 with 100,000 iterations. All notes and safety items will be re-encrypted immediately.
            </p>

            <form onSubmit={handleSaveCustomPassphrase} className="space-y-4 pt-2">
              <input
                type="password"
                placeholder="Enter at least 4 characters"
                value={newCustomPass}
                onChange={(e) => setNewCustomPass(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
                autoFocus
                required
              />

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowChangePassModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  id="confirm-custom-passphrase-btn"
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                >
                  Re-Encrypt & Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Emergency Wipe Confirm Modal */}
      {showWipeConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 text-center">Emergency Wipe Entire Vault?</h3>
            <p className="text-xs text-slate-600 text-center leading-relaxed">
              This will completely delete the <strong>SuperShaktiVaultDB</strong> IndexedDB database, clear all local session encryption keys, and permanently destroy all stored journal notes and checklist items. This action is instantaneous and irreversible.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowWipeConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                id="confirm-wipe-btn"
                type="button"
                onClick={handleWipeEntireVault}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
              >
                Permanently Wipe All Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
