/**
 * SuperShakti Client-Side Zero-Knowledge Encryption & IndexedDB Engine
 * 
 * Security Specifications:
 * - Passphrase-derived AES-GCM (256-bit) encryption using Web Crypto API.
 * - Key derivation via PBKDF2 with SHA-256 and 100,000 iterations.
 * - Cryptographically random 16-byte salt per vault and 12-byte IV per record.
 * - Device-only storage via browser IndexedDB ('SuperShaktiVaultDB').
 * - Zero plaintext stored locally. Zero server transmission.
 * - 1-Click complete database wipe.
 */

import { JournalNote } from '../types';

const DB_NAME = 'SuperShaktiVaultDB';
const DB_VERSION = 1;
const STORE_NAME = 'encrypted_records';
const META_STORE = 'vault_meta';

export interface EncryptedPayload {
  ciphertext: string; // Base64
  iv: string;         // Base64
  salt: string;       // Base64
}

export interface EncryptedRecord {
  id: string;
  type: 'note' | 'safety' | 'config';
  ciphertext: string;
  iv: string;
  salt: string;
  updatedAt: number;
}

// Convert ArrayBuffer or Uint8Array <-> Base64 safely
function bufferToBase64(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToBuffer(b64: string): ArrayBuffer {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// Derive AES-GCM key from passphrase using PBKDF2
export async function deriveKeyFromPassphrase(passphrase: string, saltBuffer: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBuffer as any,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

// Encrypt plaintext string with AES-256-GCM
export async function encryptData(plaintext: string, passphrase: string, existingSalt?: string): Promise<EncryptedPayload> {
  const salt = existingSalt ? new Uint8Array(base64ToBuffer(existingSalt)) : window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKeyFromPassphrase(passphrase, salt);

  const enc = new TextEncoder();
  const encryptedBuf = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(plaintext)
  );

  return {
    ciphertext: bufferToBase64(encryptedBuf),
    iv: bufferToBase64(iv),
    salt: bufferToBase64(salt)
  };
}

// Decrypt AES-256-GCM ciphertext
export async function decryptData(payload: EncryptedPayload, passphrase: string): Promise<string> {
  const salt = new Uint8Array(base64ToBuffer(payload.salt));
  const iv = new Uint8Array(base64ToBuffer(payload.iv));
  const ciphertextBuf = base64ToBuffer(payload.ciphertext);

  const key = await deriveKeyFromPassphrase(passphrase, salt);

  const decryptedBuf = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertextBuf
  );

  const dec = new TextDecoder();
  return dec.decode(decryptedBuf);
}

// Open IndexedDB database with schema initialization
export function openVaultDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('IndexedDB is not supported in this browser.'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e: IDBVersionChangeEvent) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(META_STORE)) {
        db.createObjectStore(META_STORE, { keyPath: 'key' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Save encrypted record into IndexedDB
export async function saveEncryptedRecord(record: EncryptedRecord): Promise<void> {
  const db = await openVaultDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(record);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// Get all encrypted records of a given type
export async function getEncryptedRecords(type?: 'note' | 'safety'): Promise<EncryptedRecord[]> {
  const db = await openVaultDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();
    req.onsuccess = () => {
      const all: EncryptedRecord[] = req.result || [];
      if (type) {
        resolve(all.filter(r => r.type === type));
      } else {
        resolve(all);
      }
    };
    req.onerror = () => reject(req.error);
  });
}

// Delete a single record from IndexedDB
export async function deleteEncryptedRecord(id: string): Promise<void> {
  const db = await openVaultDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// Vault Metadata: check if vault is initialized with a passphrase
export async function getVaultMeta(key: string): Promise<any> {
  try {
    const db = await openVaultDB();
    return new Promise((resolve) => {
      const tx = db.transaction(META_STORE, 'readonly');
      const store = tx.objectStore(META_STORE);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result ? req.result.value : null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function setVaultMeta(key: string, value: any): Promise<void> {
  const db = await openVaultDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(META_STORE, 'readwrite');
    const store = tx.objectStore(META_STORE);
    const req = store.put({ key, value });
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// Wipe entire IndexedDB database and local caches
export async function emergencyWipeAllData(): Promise<void> {
  // 1. Delete IndexedDB database
  await new Promise<void>((resolve) => {
    if ('indexedDB' in window) {
      const req = indexedDB.deleteDatabase(DB_NAME);
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
      req.onblocked = () => resolve();
    } else {
      resolve();
    }
  });

  // 2. Clear sensitive items from localStorage & sessionStorage
  try {
    localStorage.removeItem('supershakti_vault_notes');
    localStorage.removeItem('supershakti_vault_safety');
    localStorage.removeItem('supershakti_vault_salt');
    localStorage.removeItem('supershakti_has_passphrase');
    sessionStorage.clear();
  } catch {
    // ignore
  }
}
