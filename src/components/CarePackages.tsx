import React, { useState } from 'react';
import { 
  Layers, 
  Printer, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  Download, 
  ArrowRight,
  BookOpen,
  X
} from 'lucide-react';
import { CARE_PACKAGES } from '../data/sanctuaryData';
import { CarePackage } from '../types';

export const CarePackages: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePackage, setActivePackage] = useState<CarePackage>(CARE_PACKAGES[0]);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  const categories = ['All', 'Motherhood', 'Wellness', 'Safety', 'Empowerment', 'Transitions', 'Neurodiversity', 'Mindset', 'Health', 'Healing'];

  const filteredPackages = selectedCategory === 'All'
    ? CARE_PACKAGES
    : CARE_PACKAGES.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200">
            <Layers className="w-3.5 h-3.5 text-rose-600" />
            16 Curated Life Milestone Packages
          </div>
          <h2 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
            Holistic Roadmaps for Tough Chapters
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            From postpartum identity resets and financial independence to quiet quitting and grief accompaniment. Tested, step-by-step guidance designed to be taken one breath at a time.
          </p>
        </div>

        <button
          id="open-printable-summary-btn"
          onClick={() => setShowPrintModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs transition-all shrink-0 self-start sm:self-center"
        >
          <Printer className="w-4 h-4 text-rose-600" />
          <span>Printable Care Summary</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`filter-cat-${cat}`}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid: 16 Packages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left List of packages */}
        <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
          {filteredPackages.map((pkg) => {
            const isSelected = activePackage.id === pkg.id;
            return (
              <button
                key={pkg.id}
                id={`pkg-item-${pkg.id}`}
                onClick={() => setActivePackage(pkg)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-rose-50/90 border-rose-400 shadow-xs ring-1 ring-rose-300'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {pkg.category}
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-rose-600' : 'text-slate-400'}`} />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-2">{pkg.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{pkg.tagline}</p>
              </button>
            );
          })}
        </div>

        {/* Right Active Package Deep Dive */}
        <div className="lg:col-span-2 bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200">
                {activePackage.category} Roadmap
              </span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-900 mt-2">{activePackage.title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">{activePackage.tagline}</p>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {activePackage.description}
          </p>

          {/* 3 Step Stages */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              The 3-Phase Action Plan
            </h4>
            {activePackage.steps.map((step, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-700">{step.phase}</span>
                  <span className="w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                    0{idx + 1}
                  </span>
                </div>
                <h5 className="text-sm font-bold text-slate-900">{step.action}</h5>
                <p className="text-xs text-slate-600 leading-relaxed">{step.details}</p>
              </div>
            ))}
          </div>

          {/* Key Sacred Takeaway Banner */}
          <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-rose-700">
              Sacred Anchor
            </span>
            <p className="text-sm sm:text-base font-serif italic text-rose-950">
              &quot;{activePackage.keyTakeaway}&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Printable Care Summary Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto space-y-6 relative print:p-0 print:bg-white print:text-black">
            <button
              id="close-print-modal-btn"
              onClick={() => setShowPrintModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 print:hidden"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center border-b border-slate-200 pb-4 print:border-black">
              <span className="text-xs uppercase font-bold tracking-widest text-rose-700 print:text-rose-600">
                SuperShakti • Personal Sanctuary Care Summary
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 print:text-black mt-1">
                {activePackage.title}
              </h3>
              <p className="text-xs text-slate-500 print:text-gray-600">{activePackage.tagline}</p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 print:bg-gray-100 print:border-gray-300">
                <strong className="block text-slate-900 print:text-black mb-1">Overview:</strong>
                <p className="text-slate-600 print:text-gray-800">{activePackage.description}</p>
              </div>

              <div className="space-y-2">
                <strong className="block text-slate-900 print:text-black">Personal Action Phases:</strong>
                {activePackage.steps.map((s, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 print:bg-white print:border-gray-300">
                    <div className="font-semibold text-rose-700 print:text-rose-700">{s.phase}: {s.action}</div>
                    <div className="text-slate-600 print:text-gray-700 text-xs mt-0.5">{s.details}</div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 print:bg-purple-50 print:border-purple-200">
                <strong className="block text-purple-900 print:text-purple-900 mb-0.5">Emergency Lifelines:</strong>
                <p className="text-slate-700 print:text-gray-700 text-xs">
                  24/7 Crisis & Support Lifeline: Call/Text 988 • National Domestic Violence Hotline: 1-800-799-SAFE (7233)
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 print:hidden">
              <p className="text-[11px] text-slate-500">
                Formatted for standard 1-page letter printing
              </p>
              <button
                id="do-print-btn"
                onClick={handlePrint}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print or Save to PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
