import React, { useState } from 'react';
import { 
  HeartHandshake, 
  PhoneCall, 
  MessageSquare, 
  ShieldAlert, 
  Video, 
  Globe, 
  DollarSign, 
  Check, 
  ExternalLink,
  Mail
} from 'lucide-react';
import { SPECIALISTS, CRISIS_LINES } from '../data/sanctuaryData';
import { Specialist, CrisisLine } from '../types';

export const SpecialistsAndHotlines: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [inquiredSpecialist, setInquiredSpecialist] = useState<Specialist | null>(null);

  const filteredCrisisLines = selectedCountry === 'all'
    ? CRISIS_LINES
    : CRISIS_LINES.filter(l => l.country.toLowerCase().includes(selectedCountry.toLowerCase()));

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* 24/7 Urgent Lifelines Hero */}
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200 mb-2">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              Direct 24/7 Crisis Lifelines • Free & Confidential
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Instant Help is One Tap Away
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              If you or someone you know is in acute danger, experiencing violence, or having thoughts of self-harm, please connect with these confidential national lifelines immediately.
            </p>
          </div>

          {/* Country filter */}
          <div className="shrink-0 flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-500" />
            <select
              id="country-filter-select"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              aria-label="Filter crisis lines by region"
              className="bg-white border border-slate-200 text-xs text-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-rose-500 shadow-xs"
            >
              <option value="all">Global / All Regions</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="India">India</option>
              <option value="Australia">Australia</option>
            </select>
          </div>
        </div>

        {/* Lifeline cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCrisisLines.map((line) => (
            <div
              key={line.id}
              className="bg-slate-50/90 border border-slate-200 hover:border-rose-300 rounded-2xl p-5 flex flex-col justify-between transition-all shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider">
                    {line.country}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                    24/7 Open
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">{line.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{line.description}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200">
                <a
                  href={`tel:${line.callNumber.replace(/[^0-9+]/g, '')}`}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Call: {line.callNumber}
                </a>

                {line.textNumber && (
                  <div className="text-center">
                    <span className="text-[11px] text-slate-500 font-medium">
                      Or Text: <strong className="text-slate-800">{line.textNumber}</strong>
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vetted Licensed Counselors & LMFTs Section */}
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-800 border border-cyan-200 mb-2">
            <HeartHandshake className="w-3.5 h-3.5 text-cyan-600" />
            Accredited Clinical Practitioners
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Vetted Specialists with Sliding-Scale Pricing
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Mental healthcare should not be a luxury. Every counselor listed has committed dedicated sliding-scale and tele-sanctuary appointments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SPECIALISTS.map((spec) => (
            <div
              key={spec.id}
              className="bg-slate-50/90 border border-slate-200 hover:border-cyan-400 rounded-3xl p-6 flex flex-col justify-between transition-all shadow-xs"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{spec.name}</h3>
                    <p className="text-xs text-cyan-700 font-semibold">{spec.title}</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-800 border border-cyan-200 shrink-0">
                    {spec.slidingScale}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{spec.bio}</p>

                {/* Specialties tags */}
                <div className="flex flex-wrap gap-1.5 my-3">
                  {spec.specialties.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 shadow-2xs font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Video className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Telehealth: {spec.telehealth ? 'Yes (Secure Video Link)' : 'In-person only'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-purple-600" />
                    <span>Languages: {spec.languages.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400">{spec.location}</span>
                <button
                  id={`inquire-specialist-${spec.id}`}
                  onClick={() => setInquiredSpecialist(spec)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-700 text-white shadow-xs transition-all flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Request Intake Info</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Intake Inquiry Modal */}
      {inquiredSpecialist && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5">
            <h3 className="text-lg font-bold text-slate-900">Intake Information for {inquiredSpecialist.name}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              In SuperShakti, appointments are booked through secure, direct clinical channels. You can reach out directly via their encrypted practice email:
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="text-slate-500 font-medium">Practitioner Email:</div>
              <div className="text-sm font-semibold text-cyan-700 select-all font-mono">{inquiredSpecialist.contactEmail}</div>
              <div className="text-slate-500 mt-2">Mention in Subject: <strong className="text-slate-900">&quot;SuperShakti Sanctuary Referral - Sliding Scale Inquiry&quot;</strong></div>
            </div>

            <div className="flex justify-end">
              <button
                id="close-intake-modal-btn"
                onClick={() => setInquiredSpecialist(null)}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
