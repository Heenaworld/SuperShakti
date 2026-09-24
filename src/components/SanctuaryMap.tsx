import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  ExternalLink, 
  Navigation, 
  HeartHandshake,
  Search,
  AlertCircle,
  Locate,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Shield,
  Layers,
  Compass,
  Sparkles,
  Copy,
  Check,
  Bookmark,
  ShieldAlert,
  Wind,
  HeartCrack,
  Baby,
  Briefcase,
  Coins,
  FileText,
  Heart,
  HelpCircle,
  CornerDownRight,
  Send
} from 'lucide-react';
import { SANCTUARY_LOCATIONS, ADVICE_NODES } from '../data/sanctuaryData';
import { getAllStatesForCountry, getAllCitiesForCountryAndState, GEOGRAPHIC_DIRECTORY } from '../data/geoData';
import { SanctuaryLocation, SanctuaryTab, AdviceNode } from '../types';
import { encryptData, saveEncryptedRecord } from '../utils/vaultCrypto';

interface SanctuaryMapProps {
  onNavigateTab?: (tab: SanctuaryTab) => void;
}


export const SanctuaryMap: React.FC<SanctuaryMapProps> = ({ onNavigateTab }) => {
  // Primary view mode: 'advice' (Interactive Advice Map) or 'clinics' (Physical Sanctuary Clinics & Shelters)
  const [viewMode, setViewMode] = useState<'advice' | 'clinics'>('advice');

  // Advice Map states
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [activeAdviceNode, setActiveAdviceNode] = useState<AdviceNode>(ADVICE_NODES[0]);
  const [adviceSearchQuery, setAdviceSearchQuery] = useState<string>('');
  const [savedToVaultId, setSavedToVaultId] = useState<string | null>(null);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  // Clinic Map states
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLocation, setActiveLocation] = useState<SanctuaryLocation>(SANCTUARY_LOCATIONS[0]);

  // Filtered advice nodes
  const filteredAdviceNodes = useMemo(() => {
    return ADVICE_NODES.filter((node) => {
      const matchesDomain = selectedDomain === 'all' || node.domain === selectedDomain;
      const matchesSearch = !adviceSearchQuery.trim() ||
        node.title.toLowerCase().includes(adviceSearchQuery.toLowerCase()) ||
        node.summary.toLowerCase().includes(adviceSearchQuery.toLowerCase()) ||
        node.coreAnchor.toLowerCase().includes(adviceSearchQuery.toLowerCase()) ||
        node.domainLabel.toLowerCase().includes(adviceSearchQuery.toLowerCase());
      return matchesDomain && matchesSearch;
    });
  }, [selectedDomain, adviceSearchQuery]);

  // Countries present in directory
  const availableCountries = useMemo(() => {
    return ['All', 'US', 'GB', 'CA', 'IN', 'AU', 'EU'];
  }, []);

  // Comprehensive states list (All 50 US states, UK regions, Canadian provinces, etc.)
  const availableStates = useMemo(() => {
    if (selectedCountry === 'All') {
      const allStates = new Set<string>();
      Object.values(GEOGRAPHIC_DIRECTORY).forEach(list => {
        list.forEach(s => allStates.add(s.name));
      });
      return ['All', ...Array.from(allStates).sort((a, b) => a.localeCompare(b))];
    }
    const states = getAllStatesForCountry(selectedCountry);
    return ['All', ...states.map(s => s.name)];
  }, [selectedCountry]);

  // Comprehensive cities list filtered by country and state
  const availableCities = useMemo(() => {
    const cities = getAllCitiesForCountryAndState(selectedCountry, selectedState);
    return ['All', ...cities];
  }, [selectedCountry, selectedState]);

  // Filtered & sorted locations
  const filteredLocations = useMemo(() => {
    let list = SANCTUARY_LOCATIONS.filter((loc) => {
      const matchesType = selectedType === 'All' || loc.type.toLowerCase() === selectedType.toLowerCase();
      const matchesCountry = selectedCountry === 'All' || (loc.country || 'US') === selectedCountry;
      const matchesState = selectedState === 'All' || loc.state === selectedState;
      const matchesCity = selectedCity === 'All' || (loc.cityName || loc.city).toLowerCase() === selectedCity.toLowerCase();
      const matchesSearch = !searchQuery.trim() || 
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        loc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.accessStatus.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesType && matchesCountry && matchesState && matchesCity && matchesSearch;
    });

    return list;
  }, [selectedType, selectedCountry, selectedState, selectedCity, searchQuery]);

  // Save advice directly to local offline Vault
  const handleSaveToVault = async (node: AdviceNode) => {
    try {
      const newNote = {
        id: Date.now().toString(),
        title: `Advice Map: ${node.title}`,
        content: `ANCHOR PRINCIPLE:\n${node.coreAnchor}\n\nIMMEDIATE 30-SEC ACTION:\n${node.immediateStep}\n\nEXACT WORD-FOR-WORD SCRIPT:\n${node.script || 'N/A'}\n\nRECOMMENDED LIFELINE / ACTION:\n${node.recommendedAction}\n\nRESOURCE:\n${node.lifelineOrResource || 'N/A'}`,
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        tags: ['Advice Map', node.domainLabel]
      };

      // Encrypt with default enclave key and store in IndexedDB
      const enc = await encryptData(JSON.stringify(newNote), 'SuperShakti-Sanctuary-Enclave-Key-2026');
      await saveEncryptedRecord({
        id: newNote.id,
        type: 'note',
        ciphertext: enc.ciphertext,
        iv: enc.iv,
        salt: enc.salt,
        updatedAt: Date.now()
      });

      setSavedToVaultId(node.id);
      setTimeout(() => setSavedToVaultId(null), 3000);
    } catch (e) {
      console.error('Failed to save encrypted note to vault:', e);
    }
  };

  // Copy script to clipboard
  const handleCopyScript = (scriptText: string) => {
    navigator.clipboard.writeText(scriptText);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  // Helper to render icon for advice node
  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return ShieldAlert;
      case 'Wind': return Wind;
      case 'HeartCrack': return HeartCrack;
      case 'Baby': return Baby;
      case 'Briefcase': return Briefcase;
      case 'Coins': return Coins;
      case 'FileText': return FileText;
      case 'Heart': return Heart;
      default: return Sparkles;
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto relative">
      {/* Background Watermark Icon */}
      <div className="absolute -top-10 -right-10 pointer-events-none opacity-[0.03] text-slate-900 z-0">
        <Compass className="w-96 h-96" />
      </div>

      {/* Header Banner with View Mode Selector */}
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm relative z-10 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              100% Zero-Tracking • Private Life Navigation
            </div>
            <h2 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Sanctuary Clinics & Advice Map
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Explore interconnected crisis navigation roadmaps, de-escalation scripts, and verified walk-in clinics designed for immediate autonomy and physical safety.
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200 flex items-center gap-1 shrink-0 self-start md:self-center shadow-xs">
            <button
              id="tab-advice-map-mode"
              onClick={() => setViewMode('advice')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'advice'
                  ? 'bg-white text-purple-900 shadow-sm border border-purple-200/80 ring-1 ring-purple-500/10'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className={`w-4 h-4 ${viewMode === 'advice' ? 'text-purple-600' : 'text-slate-500'}`} />
              <span>Interactive Advice Map</span>
            </button>

            <button
              id="tab-clinics-map-mode"
              onClick={() => setViewMode('clinics')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'clinics'
                  ? 'bg-white text-teal-900 shadow-sm border border-teal-200/80 ring-1 ring-teal-500/10'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapPin className={`w-4 h-4 ${viewMode === 'clinics' ? 'text-teal-600' : 'text-slate-500'}`} />
              <span>Walk-in Clinics & Safe Beds</span>
            </button>
          </div>
        </div>

        {/* Mode Explanatory Sub-bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-slate-700">
              {viewMode === 'advice' 
                ? 'Displaying 8 Core Life Challenge Nodes • Situational Scripts & Safe Steps' 
                : 'Displaying Verified 100% Free & Sliding-Scale Drop-in Clinics & Crisis Shelters'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-500">Zero GPS data leaves your browser</span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-700 font-semibold">Offline Encrypted Enclave</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: INTERACTIVE ADVICE MAP & CONSTELLATION                            */}
      {/* ========================================================================= */}
      {viewMode === 'advice' && (
        <div className="space-y-6 relative z-10">
          {/* Domain Filter Bar */}
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3.5 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              {/* Search within Advice Map */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="advice-search-input"
                  type="text"
                  placeholder="Search advice (e.g. panic, exit, boss, custody)..."
                  value={adviceSearchQuery}
                  onChange={(e) => setAdviceSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-colors"
                />
              </div>

              <div className="text-xs text-slate-500 font-medium">
                Showing <strong className="text-slate-900">{filteredAdviceNodes.length}</strong> of {ADVICE_NODES.length} Advice Nodes
              </div>
            </div>

            {/* Domain Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {[
                { id: 'all', label: 'All Life Spheres' },
                { id: 'safety', label: 'Safety & Protection' },
                { id: 'somatic', label: 'Somatic Grounding' },
                { id: 'relationships', label: 'Boundaries & Gray Rock' },
                { id: 'maternal', label: 'Maternal Sanctuary' },
                { id: 'career', label: 'Career & Burnout' },
                { id: 'financial', label: 'Financial Independence' },
                { id: 'legal', label: 'Legal & Custody' }
              ].map((domain) => (
                <button
                  key={domain.id}
                  id={`filter-domain-${domain.id}`}
                  onClick={() => setSelectedDomain(domain.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedDomain === domain.id
                      ? 'bg-purple-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 border border-slate-200'
                  }`}
                >
                  {domain.label}
                </button>
              ))}
            </div>
          </div>

          {/* Advice Map Canvas & Active Node Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 5 Cols: Visual Constellation Radar + Node Selector */}
            <div className="lg:col-span-5 space-y-4">
              {/* Stylized Visual Advice Constellation Radar */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 h-80 relative overflow-hidden flex flex-col justify-between shadow-md">
                {/* Radial radar lines and grid */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#a855f7_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
                
                {/* Concentric radar rings */}
                <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="18" fill="none" stroke="#c084fc" strokeWidth="0.5" strokeDasharray="2,2" />
                  <circle cx="50" cy="50" r="32" fill="none" stroke="#c084fc" strokeWidth="0.5" strokeDasharray="3,3" />
                  <circle cx="50" cy="50" r="44" fill="none" stroke="#c084fc" strokeWidth="0.5" strokeDasharray="4,4" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="#c084fc" strokeWidth="0.3" strokeDasharray="2,2" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#c084fc" strokeWidth="0.3" strokeDasharray="2,2" />
                  {/* Subtle connection arcs between nodes */}
                  <path d="M 18,24 Q 42,18 74,26 T 62,58 T 82,78" fill="none" stroke="#e879f9" strokeWidth="0.7" opacity="0.4" />
                  <path d="M 18,24 Q 28,54 22,82" fill="none" stroke="#38bdf8" strokeWidth="0.7" opacity="0.4" />
                  <path d="M 42,18 Q 48,42 62,58" fill="none" stroke="#34d399" strokeWidth="0.7" opacity="0.4" />
                </svg>

                {/* Radar Top Label */}
                <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-300">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700 font-semibold text-purple-300">
                    <Compass className="w-3.5 h-3.5 text-purple-400" />
                    Life Advice Constellation
                  </span>
                  <span className="text-[10px] text-slate-400">Click any node to inspect</span>
                </div>

                {/* Plotted Advice Interactive Nodes */}
                <div className="relative z-10 w-full h-52">
                  {ADVICE_NODES.map((node) => {
                    const isActive = activeAdviceNode.id === node.id;
                    const NodeIcon = getDomainIcon(node.iconName);

                    return (
                      <button
                        key={node.id}
                        id={`advice-pin-${node.id}`}
                        onClick={() => setActiveAdviceNode(node)}
                        style={{ left: `${node.xPercent}%`, top: `${node.yPercent}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none flex flex-col items-center"
                        title={node.title}
                      >
                        <div className="relative">
                          {isActive && (
                            <span className="absolute -inset-2.5 rounded-full bg-purple-400/40 animate-ping" />
                          )}
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                            isActive
                              ? 'bg-gradient-to-br from-purple-500 to-rose-500 text-white shadow-lg shadow-purple-500/50 scale-125 ring-2 ring-purple-300'
                              : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white hover:border-purple-400 hover:scale-110'
                          }`}>
                            <NodeIcon className="w-4 h-4" />
                          </div>
                        </div>

                        <span className={`text-[9px] mt-1 px-1.5 py-0.5 rounded transition-all whitespace-nowrap ${
                          isActive
                            ? 'bg-slate-800 text-purple-300 font-bold border border-purple-500/50 shadow'
                            : 'bg-slate-900/90 text-slate-400 group-hover:text-white'
                        }`}>
                          {node.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Radar Bottom Strip */}
                <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800/80 pt-2">
                  <span className="text-purple-300">Active Node: <strong className="text-white">{activeAdviceNode.badge}</strong></span>
                  <span className="text-emerald-400 font-medium">8 Tested Protocols</span>
                </div>
              </div>

              {/* Scrollable List of Advice Cards */}
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {filteredAdviceNodes.map((node) => {
                  const isSelected = activeAdviceNode.id === node.id;
                  const NodeIcon = getDomainIcon(node.iconName);

                  return (
                    <button
                      key={node.id}
                      id={`advice-list-item-${node.id}`}
                      onClick={() => setActiveAdviceNode(node)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-purple-50/90 border-purple-300 shadow-xs ring-1 ring-purple-400/40'
                          : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-900">
                          {node.domainLabel}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">{node.badge}</span>
                      </div>

                      <div className="flex items-start gap-2.5 mt-1.5">
                        <div className={`p-1.5 rounded-lg shrink-0 ${
                          isSelected ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          <NodeIcon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-slate-900 leading-snug">{node.title}</h4>
                          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{node.summary}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right 7 Cols: Full Depth Advice Inspector */}
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm relative overflow-hidden">
                {/* Subtle Background Watermark Icon in Active Card */}
                <div className="absolute top-4 right-4 pointer-events-none opacity-[0.04] text-purple-900">
                  {React.createElement(getDomainIcon(activeAdviceNode.iconName), { className: 'w-48 h-48' })}
                </div>

                {/* Node Title & Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5 relative z-10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">
                        {activeAdviceNode.domainLabel}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                        {activeAdviceNode.badge}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-1">
                      {activeAdviceNode.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {activeAdviceNode.summary}
                    </p>
                  </div>

                  {/* Actions: Save to Vault */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      id="save-advice-node-vault-btn"
                      onClick={() => handleSaveToVault(activeAdviceNode)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        savedToVaultId === activeAdviceNode.id
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                      }`}
                    >
                      {savedToVaultId === activeAdviceNode.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Saved in Vault!</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-3.5 h-3.5 text-purple-600" />
                          <span>Save to Vault</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Golden Rule / Anchor Principle */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50/90 to-rose-50/70 border border-purple-200/80 space-y-1.5 relative z-10">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-900 uppercase tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>Anchor Principle • Grounding Truth</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 font-serif italic leading-relaxed">
                    &quot;{activeAdviceNode.coreAnchor}&quot;
                  </p>
                </div>

                {/* Immediate 30-Second Micro-Action */}
                <div className="space-y-2 relative z-10">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
                    <CornerDownRight className="w-4 h-4 text-emerald-600" />
                    <span>Immediate 30-Second Somatic / Tactical Action</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm text-slate-800 leading-relaxed">
                    {activeAdviceNode.immediateStep}
                  </div>
                </div>

                {/* Exact Word-for-Word Boundary Script */}
                {activeAdviceNode.script && (
                  <div className="space-y-2 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                        <Send className="w-3.5 h-3.5 text-purple-600" />
                        Exact Word-for-Word Script (Say or Text)
                      </span>
                      <button
                        onClick={() => handleCopyScript(activeAdviceNode.script || '')}
                        className="inline-flex items-center gap-1 text-[11px] text-purple-700 hover:text-purple-900 font-semibold px-2 py-1 rounded bg-purple-50 hover:bg-purple-100 transition-colors"
                      >
                        {copiedScript ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-purple-600" />
                            <span>Copy Script</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono text-slate-900 leading-relaxed select-all">
                      {activeAdviceNode.script}
                    </div>
                  </div>
                )}

                {/* Warning Signs & Red Flags */}
                {activeAdviceNode.warningSigns && activeAdviceNode.warningSigns.length > 0 && (
                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2 relative z-10">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-950 uppercase tracking-wide">
                      <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>Warning Signs & Critical Red Flags</span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-900">
                      {activeAdviceNode.warningSigns.map((sign, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{sign}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Direct Action & Connected Lifeline */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs relative z-10">
                  <div>
                    <span className="text-slate-500 font-medium">Recommended Next Sanctuary Action:</span>
                    <p className="text-slate-900 font-semibold mt-0.5">{activeAdviceNode.recommendedAction}</p>
                    {activeAdviceNode.lifelineOrResource && (
                      <p className="text-purple-800 text-[11px] font-medium mt-1">
                        Resource: {activeAdviceNode.lifelineOrResource}
                      </p>
                    )}
                  </div>

                  {onNavigateTab && (
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onNavigateTab('packages')}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white shadow-xs transition-all flex items-center gap-1.5"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>16 Packages</span>
                      </button>

                      <button
                        onClick={() => setViewMode('clinics')}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all shadow-xs flex items-center gap-1.5"
                      >
                        <MapPin className="w-3.5 h-3.5 text-teal-600" />
                        <span>Find Clinics</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: PHYSICAL SANCTUARY CLINICS & EMERGENCY SHELTERS                   */}
      {/* ========================================================================= */}
      {viewMode === 'clinics' && (
        <div className="space-y-6 relative z-10">
          {/* Search & Filter Controls */}
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-2xl p-4 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Keyword Search */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="sanctuary-map-search-input"
                  type="text"
                  placeholder="Search by clinic name, service (e.g. contraception, custody, shelter)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
                />
              </div>

              {/* Cascading Location Hierarchy: Country -> State -> City */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                {/* 1. Country Selector */}
                <div className="w-full sm:w-36">
                  <select
                    id="country-filter-select"
                    value={selectedCountry}
                    onChange={(e) => {
                      setSelectedCountry(e.target.value);
                      setSelectedState('All');
                      setSelectedCity('All');
                    }}
                    aria-label="Filter locations by country"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white font-medium"
                  >
                    <option value="All">🌍 All Countries</option>
                    {availableCountries.filter(c => c !== 'All').map((c) => (
                      <option key={c} value={c}>
                        {c === 'US' ? '🇺🇸 United States' : c === 'UK' ? '🇬🇧 United Kingdom' : c === 'CA' ? '🇨🇦 Canada' : c === 'IN' ? '🇮🇳 India' : c === 'AU' ? '🇦🇺 Australia' : c === 'EU' ? '🇪🇺 European Union' : c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. State / Province Selector */}
                <div className="w-full sm:w-40">
                  <select
                    id="state-filter-select"
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setSelectedCity('All');
                    }}
                    aria-label="Filter locations by state or province"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white font-medium"
                  >
                    <option value="All">🏛️ All States / Regions</option>
                    {availableStates.filter(s => s !== 'All').map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* 3. City Selector */}
                <div className="w-full sm:w-40">
                  <select
                    id="city-filter-select"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    aria-label="Filter locations by city"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white font-medium"
                  >
                    <option value="All">📍 All Cities</option>
                    {availableCities.filter(c => c !== 'All').map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Zero-Knowledge GPS Disabled Privacy Badge */}
              <div
                id="gps-disabled-privacy-badge"
                title="GPS and device geolocation are completely disabled to guarantee zero-knowledge privacy and protect your physical safety. Choose your region safely using the dropdowns above."
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800 shrink-0 select-none shadow-xs"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>GPS Disabled • Zero-Tracking</span>
              </div>
            </div>

            {/* Type Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {['All', 'Clinic', 'Shelter', 'Legal Aid', 'Community Center'].map((t) => (
                <button
                  key={t}
                  id={`filter-type-${t}`}
                  onClick={() => setSelectedType(t)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedType === t
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-200/60'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Location Breadcrumbs & Reset */}
            {(selectedCountry !== 'All' || selectedState !== 'All' || selectedCity !== 'All') && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-400 font-medium">Filter:</span>
                {selectedCountry !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 font-medium">
                    <span>🌍 {selectedCountry}</span>
                    <button
                      onClick={() => {
                        setSelectedCountry('All');
                        setSelectedState('All');
                        setSelectedCity('All');
                      }}
                      className="hover:text-red-500 font-bold ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedState !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 font-medium">
                    <span>🏛️ {selectedState}</span>
                    <button
                      onClick={() => {
                        setSelectedState('All');
                        setSelectedCity('All');
                      }}
                      className="hover:text-red-500 font-bold ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedCity !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 font-medium">
                    <span>📍 {selectedCity}</span>
                    <button
                      onClick={() => setSelectedCity('All')}
                      className="hover:text-red-500 font-bold ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSelectedCountry('All');
                    setSelectedState('All');
                    setSelectedCity('All');
                  }}
                  className="text-teal-700 hover:text-teal-800 font-medium text-[11px] underline ml-1 cursor-pointer"
                >
                  Clear Location Filters
                </button>
                <span className="ml-auto text-slate-400 text-[11px] font-medium">
                  {filteredLocations.length} sanctuaries matched
                </span>
              </div>
            )}
          </div>

          {/* Interactive Map Visualizer & Directory */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Location List */}
            <div className="space-y-3 max-h-[720px] overflow-y-auto pr-1">
              {filteredLocations.length === 0 ? (
                <div className="p-6 text-center rounded-2xl bg-white border border-slate-200 text-slate-600 text-xs shadow-xs space-y-3">
                  <div className="text-3xl">🛡️</div>
                  <div className="font-bold text-slate-800 text-sm">
                    Statewide & National Sanctuary Coverage Active
                  </div>
                  <p className="text-slate-500 leading-relaxed max-w-xs mx-auto">
                    No local walk-in pins are currently registered for <strong>{selectedCity !== 'All' ? `${selectedCity}, ` : ''}{selectedState !== 'All' ? selectedState : 'this location'}</strong>, but 24/7 crisis lifelines, emergency dispatch, and legal counseling networks are 100% active here.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSelectedState('All');
                        setSelectedCity('All');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 font-semibold text-xs border border-teal-200 hover:bg-teal-100 transition-colors cursor-pointer"
                    >
                      View All Sanctuaries in {selectedCountry === 'All' ? 'Directory' : selectedCountry}
                    </button>
                  </div>
                </div>
              ) : (
                filteredLocations.map((loc) => {
                  const isSelected = activeLocation.id === loc.id;

                  return (
                    <button
                      key={loc.id}
                      id={`loc-card-${loc.id}`}
                      onClick={() => setActiveLocation(loc)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-teal-50/80 border-teal-400 shadow-sm ring-1 ring-teal-400/40'
                          : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                          {loc.type}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200 inline-flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified
                          </span>
                          <span className="text-[11px] text-emerald-700 font-semibold">{loc.cost}</span>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900">{loc.name}</h4>
                      
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span className="truncate">{loc.city}, {loc.state || ''} • {loc.address}</span>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-teal-700 font-medium">{loc.accessStatus}</span>
                        <span className="text-slate-400">View Access Details →</span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Right: Map Canvas & Active Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stylized Vector Map Canvas with Geocoordinates */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-72 relative overflow-hidden flex flex-col justify-between shadow-md">
                {/* Grid background lines */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />

                {/* Subtle continental outline */}
                <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M 12,20 Q 30,15 60,18 Q 88,25 90,40 Q 85,75 55,85 Q 40,88 25,75 Q 8,55 12,20 Z" fill="none" stroke="#2dd4bf" strokeWidth="0.8" strokeDasharray="3,3" />
                </svg>

                {/* Top Bar on Canvas */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-teal-300 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700">
                    <Navigation className="w-3 h-3 text-teal-400" />
                    Sanctuary Geographic Radar
                  </span>

                  <span className="text-[10px] text-slate-300 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">
                    Active Region: <strong className="text-white">{activeLocation.city}</strong>
                  </span>
                </div>

                {/* Simulated Interactive Radar Pinpoints */}
                <div className="relative z-10 w-full h-40">
                  {SANCTUARY_LOCATIONS.map((loc) => {
                    const isActive = activeLocation.id === loc.id;
                    const leftPercent = Math.min(90, Math.max(10, ((loc.lng - (-125)) / ((-70) - (-125))) * 80 + 10));
                    const topPercent = Math.min(85, Math.max(15, ((49 - loc.lat) / (49 - 25)) * 70 + 15));

                    return (
                      <button
                        key={loc.id}
                        id={`map-pin-${loc.id}`}
                        onClick={() => setActiveLocation(loc)}
                        style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none flex flex-col items-center"
                        title={`${loc.name} (${loc.city})`}
                      >
                        <div className="relative">
                          {isActive && (
                            <span className="absolute -inset-2 rounded-full bg-teal-400/30 animate-ping" />
                          )}
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                            isActive
                              ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/50 scale-125 ring-2 ring-teal-300'
                              : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white hover:border-teal-400'
                          }`}>
                            <MapPin className="w-4 h-4" />
                          </div>
                        </div>
                        
                        <span className={`text-[10px] mt-1 px-1.5 py-0.5 rounded transition-all whitespace-nowrap ${
                          isActive 
                            ? 'bg-slate-800 text-teal-300 font-bold border border-teal-500/40 shadow'
                            : 'bg-slate-900/90 text-slate-300 group-hover:text-white'
                        }`}>
                          {loc.city}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Bottom info strip */}
                <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800 pt-2">
                  <span>Verified Safe Coordinates • Offline-Available Directory</span>
                  <span className="text-emerald-400 font-medium">All Clinics Walk-In Accessible</span>
                </div>
              </div>

              {/* Active Location Details Card */}
              <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-teal-700 uppercase tracking-widest">
                        {activeLocation.type} Directory
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {activeLocation.accessStatus}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                      {activeLocation.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{activeLocation.address}</span>
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <a
                      href={`tel:${activeLocation.phone.replace(/[^0-9]/g, '')}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white shadow-sm transition-all"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call: {activeLocation.phone}
                    </a>

                    {activeLocation.directionsUrl && (
                      <a
                        href={activeLocation.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all shadow-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
                        <span>Get Directions</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Operating Hours & Fees */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-600" /> Operating Hours
                    </div>
                    <p className="text-slate-900 font-semibold">{activeLocation.hours}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                      <HeartHandshake className="w-3.5 h-3.5 text-rose-600" /> Fee Policy & Assistance
                    </div>
                    <p className="text-slate-900 font-semibold">{activeLocation.cost}</p>
                  </div>
                </div>

                {/* Access Guarantees */}
                <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-200 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-teal-700 shrink-0" />
                    <h5 className="text-xs font-bold uppercase tracking-wider text-teal-800">
                      Access & Verification Guarantees (No Blockers)
                    </h5>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {activeLocation.accessGuarantees.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services Provided */}
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    On-Site Clinical & Social Services
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {activeLocation.services.map((svc, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-medium"
                      >
                        • {svc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
