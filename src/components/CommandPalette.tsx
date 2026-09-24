import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Sparkles, 
  Wind, 
  Users, 
  HeartHandshake, 
  Layers, 
  MapPin, 
  Lock, 
  PhoneCall, 
  ShieldAlert, 
  X, 
  ArrowRight,
  Command,
  Activity
} from 'lucide-react';
import { SanctuaryTab } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: SanctuaryTab) => void;
  onTriggerQuickExit: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onTriggerQuickExit,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'tab-matcher',
      category: 'Primary Modules',
      title: 'Feeling-First Care Plan Matcher',
      desc: 'Instant 360° triage matching your exact emotional state',
      icon: Sparkles,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      action: () => { onSelectTab('matcher'); onClose(); },
    },
    {
      id: 'tab-microtools',
      category: 'Primary Modules',
      title: 'Somatic Micro-Tools & Nervous System Relief',
      desc: '4-4-6 vagus nerve breathwork, 5-4-3-2-1 grounding, boundary scripts',
      icon: Wind,
      color: 'text-teal-600 bg-teal-50 border-teal-200',
      action: () => { onSelectTab('microtools'); onClose(); },
    },
    {
      id: 'tab-sisterhood',
      category: 'Primary Modules',
      title: 'Sisterhood Peer Buddies & Circles',
      desc: 'Connect with lived-experience women mentors and moderated circles',
      icon: Users,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      action: () => { onSelectTab('sisterhood'); onClose(); },
    },
    {
      id: 'tab-specialists',
      category: 'Primary Modules',
      title: 'Sliding-Scale Therapists & 24/7 Hotlines',
      desc: 'Vetted trauma-informed clinical care ($30–$80/session)',
      icon: HeartHandshake,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      action: () => { onSelectTab('specialists'); onClose(); },
    },
    {
      id: 'tab-packages',
      category: 'Primary Modules',
      title: '16 Curated Milestone Roadmaps',
      desc: 'Postpartum, career pivots, divorce shields, elder care, ADHD',
      icon: Layers,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      action: () => { onSelectTab('packages'); onClose(); },
    },
    {
      id: 'tab-map',
      category: 'Primary Modules',
      title: 'Advice Map & Sanctuary Clinics',
      desc: 'Interactive life advice constellation, crisis scripts & walk-in clinics',
      icon: MapPin,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      action: () => { onSelectTab('map'); onClose(); },
    },
    {
      id: 'tab-vault',
      category: 'Primary Modules',
      title: 'My Encrypted Vault',
      desc: 'Local, private notes and safety plan checklist stored on-device',
      icon: Lock,
      color: 'text-slate-600 bg-slate-100 border-slate-200',
      action: () => { onSelectTab('vault'); onClose(); },
    },
    // Emergency & Quick Actions
    {
      id: 'emergency-988',
      category: 'Immediate Emergency Dial',
      title: 'Call 988 (Crisis & Support Lifeline)',
      desc: 'Free, confidential, 24/7 support across the US & Canada',
      icon: PhoneCall,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      action: () => { window.location.href = 'tel:988'; },
    },
    {
      id: 'emergency-dv',
      category: 'Immediate Emergency Dial',
      title: 'Call 1-800-799-SAFE (DV Hotline)',
      desc: 'National Domestic Violence 24/7 advocate line',
      icon: PhoneCall,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      action: () => { window.location.href = 'tel:18007997233'; },
    },
    {
      id: 'action-quick-exit',
      category: 'Safety & Disguise',
      title: 'Trigger Quick Safety Disguise (Esc)',
      desc: 'Instantly disguises screen as a realistic weather forecast',
      icon: ShieldAlert,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      action: () => { onTriggerQuickExit(); onClose(); },
    },
  ];

  const filtered = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.desc.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-900/20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Type a module, feeling, breathwork, crisis line, or command..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No matching modules or actions found for &quot;{query}&quot;.
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-left transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-lg border ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-900 truncate">{item.title}</span>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>Instant navigation</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Command className="w-3 h-3 text-slate-400" /> + K to toggle
            </span>
          </div>
          <span className="text-emerald-700 font-medium flex items-center gap-1">
            <Activity className="w-3 h-3 text-emerald-600" /> Zero-Tracking Session
          </span>
        </div>
      </div>
    </div>
  );
};
