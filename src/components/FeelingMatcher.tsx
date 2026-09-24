import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Heart, 
  Wind, 
  Users, 
  Layers, 
  ShieldAlert, 
  Flame, 
  Zap, 
  HeartCrack, 
  Baby, 
  Compass, 
  CheckCircle2, 
  RefreshCw,
  MessageCircleHeart
} from 'lucide-react';
import { EMOTIONS, PEER_BUDDIES, CARE_PACKAGES } from '../data/sanctuaryData';
import { EmotionOption, CarePlanResult, SanctuaryTab } from '../types';

interface FeelingMatcherProps {
  onNavigateTab: (tab: SanctuaryTab) => void;
  onOpenTool: (toolId: 'breathing' | 'grounding' | 'boundaries') => void;
}

export const FeelingMatcher: React.FC<FeelingMatcherProps> = ({
  onNavigateTab,
  onOpenTool,
}) => {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionOption>(EMOTIONS[0]);
  const [userWords, setUserWords] = useState('');
  const [useAiConsent, setUseAiConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [carePlan, setCarePlan] = useState<(CarePlanResult & { source?: string }) | null>(null);

  const getEmotionIcon = (name: string) => {
    switch (name) {
      case 'Flame': return <Flame className="w-5 h-5 text-rose-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'HeartCrack': return <HeartCrack className="w-5 h-5 text-pink-400" />;
      case 'Baby': return <Baby className="w-5 h-5 text-purple-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-teal-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-cyan-400" />;
      default: return <Heart className="w-5 h-5 text-rose-400" />;
    }
  };

  const handleGeneratePlan = async () => {
    setLoading(true);
    try {
      let data: any = null;

      if (useAiConsent && userWords.trim()) {
        const response = await fetch('/api/matcher', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            emotionId: selectedEmotion.id,
            emotionLabel: selectedEmotion.label,
            userStory: userWords.trim(),
            useAi: true
          }),
        });
        data = await response.json();
      } else {
        // 100% Offline Sanctuary Engine
        data = {
          source: 'offline_framework',
          validation: `Navigating feeling ${selectedEmotion.label.toLowerCase()} is valid. You do not have to carry this alone.`,
          reliefStep: selectedEmotion.recommendedTool === 'breathing' 
            ? 'Take 3 deliberate breaths with the 4-4-6 vagus nerve breathing tool.'
            : selectedEmotion.recommendedTool === 'grounding'
            ? 'Practice the 5-4-3-2-1 sensory grounding routine to steady your nervous system.'
            : 'Review our gentle boundary templates to protect your emotional energy today.',
          affirmation: 'You have innate strength, and your pace of healing is sacred.'
        };
      }

      // Find matched buddy and package
      const matchedBuddy = PEER_BUDDIES.find(b => {
        if (selectedEmotion.id === 'postpartum') return b.id === 'priya-sharma';
        if (selectedEmotion.id === 'career-pivot') return b.id === 'elena-rostova';
        if (selectedEmotion.id === 'heartbroken') return b.id === 'maya-johnson';
        if (selectedEmotion.id === 'relationship-safety') return b.id === 'ananya-patel';
        return b.id === 'fatima-al-zahra';
      }) || PEER_BUDDIES[0];

      const matchedPackage = CARE_PACKAGES.find(p => p.id === selectedEmotion.recommendedPackageId) || CARE_PACKAGES[0];

      const toolInfo = {
        breathing: {
          id: 'breathing' as const,
          title: '4-4-6 Vagus Nerve Calming Breathing',
          instructions: 'Gentle somatic respiration pacing to immediately down-regulate sympathetic fight-or-flight heart rate.',
        },
        grounding: {
          id: 'grounding' as const,
          title: '5-4-3-2-1 Sensory Grounding Routine',
          instructions: 'Interactive somatic checklist to anchor your consciousness back in your physical body and environment.',
        },
        boundaries: {
          id: 'boundaries' as const,
          title: 'Boundary Scripts & Script Vault',
          instructions: 'Trauma-informed, copyable verbal boundary templates for difficult relational conversations.',
        },
      }[selectedEmotion.recommendedTool];

      setCarePlan({
        source: data.source,
        emotionalSummary: data.validation,
        primaryReliefStep: data.reliefStep,
        recommendedTool: toolInfo,
        matchedBuddy,
        matchedPackage,
        specialistOrHelpline: selectedEmotion.id === 'relationship-safety'
          ? 'National Domestic Violence Hotline: 1-800-799-SAFE or text START to 88788'
          : '988 Crisis & Support Lifeline • 24/7 Free & Confidential Support',
        gentleAffirmation: data.affirmation,
      });
    } catch (err) {
      console.error('Plan error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Intro Banner */}
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            Feeling-First Care Triage
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
            How are you feeling right now?
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            No clinical diagnostic forms, no judgment. Select your current state or type what is weighing on you. SuperShakti will assemble a complete 360-degree sanctuary care plan in seconds.
          </p>
        </div>

        {/* Emotion Chip Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-8">
          {EMOTIONS.map((emotion) => {
            const isSelected = selectedEmotion.id === emotion.id;
            return (
              <button
                key={emotion.id}
                id={`emotion-chip-${emotion.id}`}
                onClick={() => setSelectedEmotion(emotion)}
                className={`text-left p-4 rounded-2xl border transition-all duration-200 relative group ${
                  isSelected
                    ? 'bg-rose-50/70 border-rose-400 shadow-sm ring-1 ring-rose-300'
                    : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center border border-slate-200 shadow-xs shrink-0">
                    {getEmotionIcon(emotion.iconName)}
                  </div>
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-xs" />
                  )}
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mt-3">{emotion.label}</h3>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{emotion.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Custom optional prompt input */}
        <div className="mt-6 pt-6 border-t border-slate-200/80">
          <label htmlFor="user-story-input" className="block text-xs font-medium text-slate-700 mb-2 flex items-center gap-1.5">
            <MessageCircleHeart className="w-3.5 h-3.5 text-rose-500" />
            <span>Express in your own words (optional):</span>
          </label>
          <div className="relative">
            <textarea
              id="user-story-input"
              value={userWords}
              onChange={(e) => setUserWords(e.target.value)}
              placeholder="e.g. I haven't slept properly in days and feel like I am letting everyone down at work and at home..."
              rows={2}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:bg-white focus:ring-1 focus:ring-rose-300 transition-all resize-none shadow-inner"
            />
          </div>

          {/* Transparent AI Opt-In Privacy Control */}
          <div className="mt-4 p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="ai-consent-toggle" className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-indigo-950 select-none">
                <input
                  id="ai-consent-toggle"
                  type="checkbox"
                  checked={useAiConsent}
                  onChange={(e) => setUseAiConsent(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                />
                <span>Enhance with Gemini AI Insights (Optional • Opt-In)</span>
              </label>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                useAiConsent 
                  ? 'bg-rose-100 text-rose-800 border-rose-300' 
                  : 'bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}>
                {useAiConsent ? 'AI Opt-In Enabled' : '100% Offline Mode (Default)'}
              </span>
            </div>

            {useAiConsent ? (
              <div className="text-[11px] text-indigo-900/90 leading-relaxed border-t border-indigo-200/60 pt-2 space-y-1">
                <p className="font-semibold text-indigo-950">
                  ℹ️ Transparent Data Disclosure:
                </p>
                <p>
                  • <strong>What is sent:</strong> Only your selected feeling category (&quot;{selectedEmotion.label}&quot;) and the text in the prompt box above are sent to Google Gemini to formulate comforting words.
                </p>
                <p>
                  • <strong>What is NEVER sent:</strong> Your IP address, device location, identity, and private vault notes are strictly excluded.
                </p>
              </div>
            ) : (
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                ✓ <strong>Zero Data Leaves Your Device:</strong> Running on our curated, 100% offline clinical rules engine.
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
            <p className="text-[11px] text-slate-500">
              No account required • Instant matching • Zero tracking
            </p>
            <button
              id="generate-care-plan-btn"
              onClick={handleGeneratePlan}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Connecting to Sanctuary...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Assemble My Care Plan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Care Plan Result Display */}
      {carePlan && (
        <div 
          id="generated-care-plan-card"
          className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-rose-700 text-xs font-semibold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-rose-600" /> Your Personalized Sanctuary Plan
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500 font-medium">Feeling: {selectedEmotion.label}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                carePlan.source === 'gemini_opt_in'
                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                {carePlan.source === 'gemini_opt_in' ? '✨ Gemini AI Enhanced' : '🌿 100% Offline Engine'}
              </span>
            </div>
          </div>

          {/* Emotional Validation Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-purple-50/80 border border-purple-200/70">
            <h4 className="text-xs font-semibold text-purple-900 uppercase tracking-wide mb-1">Empathetic Validation</h4>
            <p className="text-purple-950 text-sm sm:text-base leading-relaxed italic">
              &quot;{carePlan.emotionalSummary}&quot;
            </p>
          </div>

          {/* Immediate Somatic Relief Step */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <Wind className="w-4 h-4 text-emerald-600" /> Step 1: Immediate Physical Relief
              </div>
              <p className="text-sm text-emerald-950 font-medium">{carePlan.primaryReliefStep}</p>
            </div>
            <button
              id="plan-start-tool-btn"
              onClick={() => {
                onNavigateTab('microtools');
                onOpenTool(carePlan.recommendedTool.id);
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-700 text-white hover:bg-emerald-800 transition-all flex items-center gap-1.5 shrink-0 shadow-xs"
            >
              Open {carePlan.recommendedTool.title.split(' ')[0]} Tool <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 360-Degree Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Pillar 1: Peer Sisterhood Buddy */}
            <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-purple-700 mb-2">
                  <Users className="w-4 h-4 text-purple-600" /> Matched Peer Sister
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center font-bold text-sm text-purple-800">
                    {carePlan.matchedBuddy.initials}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">{carePlan.matchedBuddy.name}</h5>
                    <p className="text-[11px] text-amber-700 font-medium">{carePlan.matchedBuddy.badge}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 line-clamp-3">{carePlan.matchedBuddy.experience}</p>
              </div>

              <button
                id="plan-connect-buddy-btn"
                onClick={() => onNavigateTab('sisterhood')}
                className="mt-4 w-full py-2 rounded-lg text-xs font-semibold bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 transition-colors shadow-xs"
              >
                View Sisterhood Profile
              </button>
            </div>

            {/* Pillar 2: Curated Care Package */}
            <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 mb-2">
                  <Layers className="w-4 h-4 text-rose-600" /> Curated Life Roadmap
                </div>
                <h5 className="text-sm font-bold text-slate-900 mb-1">{carePlan.matchedPackage.title}</h5>
                <p className="text-xs text-slate-600 line-clamp-3">{carePlan.matchedPackage.description}</p>
              </div>

              <button
                id="plan-view-package-btn"
                onClick={() => onNavigateTab('packages')}
                className="mt-4 w-full py-2 rounded-lg text-xs font-semibold bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 transition-colors shadow-xs"
              >
                Read 3-Stage Package
              </button>
            </div>

            {/* Pillar 3: Helpline / Clinical Care */}
            <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-800 mb-2">
                  <ShieldAlert className="w-4 h-4 text-cyan-600" /> Professional & Emergency
                </div>
                <h5 className="text-sm font-bold text-slate-900 mb-1">Direct Confidential Support</h5>
                <p className="text-xs text-slate-600">{carePlan.specialistOrHelpline}</p>
              </div>

              <button
                id="plan-view-specialists-btn"
                onClick={() => onNavigateTab('specialists')}
                className="mt-4 w-full py-2 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs"
              >
                Browse Licensed Counselors
              </button>
            </div>
          </div>

          {/* Sisterhood Affirmation Card */}
          <div className="text-center pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">Sanctuary Blessing</p>
            <p className="text-sm sm:text-base font-serif text-rose-900 max-w-xl mx-auto italic">
              &quot;{carePlan.gentleAffirmation}&quot;
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
