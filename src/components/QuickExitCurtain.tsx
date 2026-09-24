import React, { useState, useEffect } from 'react';
import { CloudSun, Wind, Droplets, Compass, Sun, CloudRain, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';

interface QuickExitCurtainProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickExitCurtain: React.FC<QuickExitCurtainProps> = ({ isOpen, onClose }) => {
  const [city, setCity] = useState('Chicago, IL');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleExitPermanently = () => {
    window.location.replace('https://www.google.com/search?q=weather+today');
  };

  return (
    <div 
      id="quick-exit-curtain"
      className="fixed inset-0 z-50 bg-slate-50 text-slate-900 flex flex-col justify-between p-6 sm:p-12 overflow-y-auto animate-in fade-in duration-150"
    >
      {/* Top Disguise Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center border border-cyan-200 shadow-xs">
            <CloudSun className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-900">MetroWeather Network</h1>
            <p className="text-xs text-slate-500">Local Radar & Forecast Live</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Disguise Active
          </span>
          <button
            id="leave-browser-permanently-btn"
            onClick={handleExitPermanently}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            Google Weather <ExternalLink className="w-3 h-3" />
          </button>
          <button
            id="resume-sanctuary-btn"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-colors flex items-center gap-1 shadow-sm"
          >
            Return to Sanctuary <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Weather Card Display */}
      <div className="max-w-5xl mx-auto w-full py-8 space-y-8">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-sm backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-cyan-700 text-sm font-semibold tracking-wide uppercase">
                <CloudSun className="w-4 h-4" /> Current Conditions
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mt-1">{city}</h2>
              <p className="text-slate-500 text-sm mt-0.5">Updated 4 mins ago • Radar Scan Complete</p>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-6xl sm:text-7xl font-light text-slate-900 tracking-tighter">72°</span>
              <div className="text-right sm:text-left">
                <span className="block text-xl font-semibold text-slate-800">Partly Cloudy</span>
                <span className="text-sm text-slate-500">Feels like 74° • Mild Breeze</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                <Droplets className="w-4 h-4 text-cyan-600" /> Humidity
              </div>
              <p className="text-xl font-bold text-slate-900">48%</p>
              <p className="text-xs text-slate-500 mt-1">Comfortable range</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                <Wind className="w-4 h-4 text-emerald-600" /> Wind
              </div>
              <p className="text-xl font-bold text-slate-900">6 mph WNW</p>
              <p className="text-xs text-slate-500 mt-1">Gentle breeze</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                <Compass className="w-4 h-4 text-purple-600" /> Barometer
              </div>
              <p className="text-xl font-bold text-slate-900">29.98 in</p>
              <p className="text-xs text-slate-500 mt-1">Steady atmospheric</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                <Sun className="w-4 h-4 text-amber-600" /> UV Index
              </div>
              <p className="text-xl font-bold text-slate-900">3 of 10</p>
              <p className="text-xs text-slate-500 mt-1">Moderate protection</p>
            </div>
          </div>
        </div>

        {/* 5-Day Outlook */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">5-Day Meteorological Trend</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { day: 'Today', icon: CloudSun, high: '72°', low: '58°', cond: 'Partly Sunny' },
              { day: 'Tue', icon: Sun, high: '76°', low: '60°', cond: 'Clear Sky' },
              { day: 'Wed', icon: CloudRain, high: '68°', low: '54°', cond: 'Scattered Showers' },
              { day: 'Thu', icon: CloudSun, high: '70°', low: '56°', cond: 'Mostly Sunny' },
              { day: 'Fri', icon: Sun, high: '74°', low: '59°', cond: 'Pleasant' },
            ].map((f, idx) => {
              const IconComp = f.icon;
              return (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs font-semibold text-slate-600 block mb-2">{f.day}</span>
                  <IconComp className="w-6 h-6 mx-auto text-amber-500 mb-2" />
                  <span className="text-base font-bold text-slate-900 block">{f.high}</span>
                  <span className="text-xs text-slate-500 block">{f.low}</span>
                  <span className="text-[11px] text-slate-500 mt-1 block truncate">{f.cond}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Safety Notice Footer */}
      <div className="border-t border-slate-200 pt-4 max-w-5xl mx-auto w-full text-center">
        <p className="text-xs text-slate-500">
          SuperShakti Zero-Tracking Privacy Guard • Browser history wiped in memory • Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-semibold">Esc</kbd> anytime to return.
        </p>
      </div>
    </div>
  );
};
