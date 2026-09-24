import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { QuickExitCurtain } from './components/QuickExitCurtain';
import { CommandPalette } from './components/CommandPalette';
import { FeelingMatcher } from './components/FeelingMatcher';
import { MicroTools } from './components/MicroTools';
import { SisterhoodNetwork } from './components/SisterhoodNetwork';
import { SpecialistsAndHotlines } from './components/SpecialistsAndHotlines';
import { CarePackages } from './components/CarePackages';
import { SanctuaryMap } from './components/SanctuaryMap';
import { SanctuaryVault } from './components/SanctuaryVault';
import { BackgroundIcons } from './components/BackgroundIcons';
import { SanctuaryTab } from './types';
import { ShieldCheck, Wind, Sparkles, Command, HeartHandshake, PhoneCall } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<SanctuaryTab>('matcher');
  const [isQuickExitOpen, setIsQuickExitOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [initialMicroTool, setInitialMicroTool] = useState<'breathing' | 'grounding' | 'boundaries'>('breathing');

  // Global keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsQuickExitOpen(prev => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenTool = (toolId: 'breathing' | 'grounding' | 'boundaries') => {
    setInitialMicroTool(toolId);
    setActiveTab('microtools');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col selection:bg-rose-500/15 selection:text-rose-800 relative overflow-x-hidden sanctuary-bg-grid">
      {/* Ambient background atmosphere */}
      <div className="absolute inset-0 sanctuary-ambient-glow pointer-events-none" />

      {/* Floating Ambient Background Icons */}
      <BackgroundIcons />

      {/* Quick Exit Disguise Curtain */}
      <QuickExitCurtain
        isOpen={isQuickExitOpen}
        onClose={() => setIsQuickExitOpen(false)}
      />

      {/* Quick Jump Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectTab={setActiveTab}
        onTriggerQuickExit={() => setIsQuickExitOpen(true)}
      />

      {/* Main Sanctuary Remote Navigation */}
      <div className="relative z-30">
        <Navbar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onQuickExit={() => setIsQuickExitOpen(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />
      </div>

      {/* Sanctuary Module Quick Status Dock */}
      <div className="relative z-20 border-b border-slate-200/80 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs text-slate-500 gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Private Enclave Active
            </span>
            <span className="hidden sm:inline text-slate-500">
              Zero cookies • Zero remote logs • Local-first encrypted state
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Quick action to start vagus breath */}
            <button
              id="quick-breath-launcher-btn"
              onClick={() => handleOpenTool('breathing')}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-50 hover:bg-teal-100/80 border border-teal-200 text-teal-800 text-[11px] font-medium transition-colors"
            >
              <Wind className="w-3 h-3 text-teal-600" />
              <span>4-4-6 Breath</span>
            </button>

            {/* Quick command search hint */}
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/70 border border-slate-200 text-slate-700 text-[11px] font-medium transition-colors"
            >
              <Command className="w-3 h-3 text-slate-500" />
              <span>Jump anywhere (⌘K)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Canvas */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'matcher' && (
          <FeelingMatcher
            onNavigateTab={setActiveTab}
            onOpenTool={handleOpenTool}
          />
        )}

        {activeTab === 'microtools' && (
          <MicroTools initialTool={initialMicroTool} />
        )}

        {activeTab === 'sisterhood' && (
          <SisterhoodNetwork />
        )}

        {activeTab === 'specialists' && (
          <SpecialistsAndHotlines />
        )}

        {activeTab === 'packages' && (
          <CarePackages />
        )}

        {activeTab === 'map' && (
          <SanctuaryMap onNavigateTab={setActiveTab} />
        )}

        {activeTab === 'vault' && (
          <SanctuaryVault />
        )}
      </main>

      {/* Modern Light Sanctuary Footer */}
      <footer className="relative z-10 border-t border-slate-200 bg-white/90 backdrop-blur-xl py-8 px-4 sm:px-6 lg:px-8 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-slate-900 text-sm tracking-wide">SuperShakti</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">Feeling-First Women&apos;s Sanctuary Ecosystem</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> No Tracker Telemetry
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">
              National Lifeline: <strong className="text-slate-900">988</strong> | Domestic Violence: <strong className="text-slate-900">1-800-799-SAFE</strong>
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-rose-700 font-semibold">You Are Protected</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

