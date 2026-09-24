import React from 'react';
import { 
  Sparkles, 
  Wind, 
  Users, 
  HeartHandshake, 
  Layers, 
  MapPin, 
  ShieldCheck, 
  Lock, 
  LogOut,
  PhoneCall,
  Search,
  Command,
  Activity,
  Compass
} from 'lucide-react';
import { SanctuaryTab } from '../types';

interface NavbarProps {
  activeTab: SanctuaryTab;
  onTabChange: (tab: SanctuaryTab) => void;
  onQuickExit: () => void;
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onQuickExit,
  onOpenCommandPalette,
}) => {
  const navItems: { id: SanctuaryTab; label: string; icon: React.ElementType }[] = [
    { id: 'matcher', label: 'Feeling Matcher', icon: Sparkles },
    { id: 'microtools', label: 'Somatic Micro-Tools', icon: Wind },
    { id: 'sisterhood', label: 'Sisterhood Buddies', icon: Users },
    { id: 'specialists', label: 'Care & Helplines', icon: HeartHandshake },
    { id: 'packages', label: '16 Packages', icon: Layers },
    { id: 'map', label: 'Advice Map & Clinics', icon: Compass },
    { id: 'vault', label: 'My Vault', icon: Lock },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/90 shadow-xs">
      {/* Top Urgent Emergency Stripe */}
      <div className="bg-gradient-to-r from-rose-50 via-slate-50 to-rose-50 px-4 py-1.5 border-b border-rose-100/70 text-xs text-slate-700">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-semibold text-rose-900">24/7 Confidential Crisis:</span>
            <span className="text-slate-700 flex items-center gap-2 text-[11px] sm:text-xs">
              <a href="tel:988" className="hover:underline font-bold text-rose-800 bg-rose-100 px-1.5 py-0.5 rounded border border-rose-200">
                Call or Text 988
              </a>
              <span className="hidden sm:inline text-slate-300">•</span>
              <a href="tel:18007997233" className="hidden sm:inline hover:underline text-slate-700 font-medium">
                DV: <strong>1-800-799-SAFE</strong>
              </a>
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <span className="hidden md:flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Zero-Tracking Node
            </span>
            <span className="hidden md:inline text-slate-300">•</span>
            <span className="text-slate-500 font-mono text-[10px] hidden sm:inline">256-bit Local Enclave</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <button 
          id="nav-brand-btn"
          onClick={() => onTabChange('matcher')}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 via-purple-600 to-amber-500 p-0.5 shadow-md shadow-rose-500/10 group-hover:scale-105 transition-transform shrink-0">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <span className="text-lg font-serif font-bold text-transparent bg-clip-text bg-gradient-to-tr from-rose-600 to-amber-600">
                श
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-slate-900 font-serif">SuperShakti</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                Sanctuary
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-sans tracking-normal hidden sm:block">
              Feeling-First Women&apos;s Care Ecosystem
            </p>
          </div>
        </button>

        {/* Center/Right Remote Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Command / Search Bar Trigger */}
          {onOpenCommandPalette && (
            <button
              id="nav-command-palette-btn"
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-700 transition-all group"
            >
              <Search className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-900" />
              <span className="hidden md:inline text-slate-600">Jump to module...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] bg-white rounded border border-slate-300 text-slate-600 font-mono shadow-xs">
                <Command className="w-2.5 h-2.5" /> K
              </kbd>
            </button>
          )}

          {/* Quick Safety Exit Button */}
          <button
            id="nav-quick-exit-btn"
            onClick={onQuickExit}
            title="Press Esc or click to instantly disguise screen with weather forecast"
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-600/20 transition-all active:scale-95 shrink-0"
          >
            <LogOut className="w-4 h-4" />
            <span>Safety Exit</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-rose-800 rounded border border-rose-500 text-rose-100 font-mono">
              Esc
            </kbd>
          </button>
        </div>
      </div>

      {/* Tabs Navigation Strip */}
      <div className="border-t border-slate-200/80 bg-white/70 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1.5 py-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`tab-btn-${item.id}`}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-rose-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

