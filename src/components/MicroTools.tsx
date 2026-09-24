import React, { useState, useEffect, useRef } from 'react';
import { 
  Wind, 
  Eye, 
  Copy, 
  Check, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Volume2, 
  VolumeX,
  Shield,
  Heart,
  ChevronRight
} from 'lucide-react';
import { BOUNDARY_SCRIPTS } from '../data/sanctuaryData';
import { BoundaryScript } from '../types';

interface MicroToolsProps {
  initialTool?: 'breathing' | 'grounding' | 'boundaries';
}

export const MicroTools: React.FC<MicroToolsProps> = ({ initialTool = 'breathing' }) => {
  const [activeSubTab, setActiveSubTab] = useState<'breathing' | 'grounding' | 'boundaries'>(initialTool);

  // Synchronize if prop changes
  useEffect(() => {
    if (initialTool) {
      setActiveSubTab(initialTool);
    }
  }, [initialTool]);

  /* ------------------------------------------------------------- */
  /* 4-4-6 VAGUS NERVE PACING STATE & LOGIC                        */
  /* ------------------------------------------------------------- */
  const [isBreathingRunning, setIsBreathingRunning] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState(4);
  const [completedCycles, setCompletedCycles] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isBreathingRunning) {
      timer = setInterval(() => {
        setPhaseSecondsLeft((prev) => {
          if (prev <= 1) {
            // transition to next phase
            if (breathPhase === 'inhale') {
              setBreathPhase('hold');
              return 4;
            } else if (breathPhase === 'hold') {
              setBreathPhase('exhale');
              return 6;
            } else {
              setBreathPhase('inhale');
              setCompletedCycles((c) => c + 1);
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isBreathingRunning, breathPhase]);

  const resetBreathing = () => {
    setIsBreathingRunning(false);
    setBreathPhase('inhale');
    setPhaseSecondsLeft(4);
  };

  /* ------------------------------------------------------------- */
  /* 5-4-3-2-1 GROUNDING STATE                                     */
  /* ------------------------------------------------------------- */
  const [groundingStep, setGroundingStep] = useState(1);
  const [groundingItems, setGroundingItems] = useState<{ [key: string]: boolean }>({});

  const toggleGroundingCheck = (key: string) => {
    setGroundingItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  /* ------------------------------------------------------------- */
  /* BOUNDARY SCRIPTS STATE                                        */
  /* ------------------------------------------------------------- */
  const [selectedScript, setSelectedScript] = useState<BoundaryScript>(BOUNDARY_SCRIPTS[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Sub-navigation pills */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-100/80 backdrop-blur-md border border-slate-200 rounded-2xl max-w-lg mx-auto shadow-xs">
        <button
          id="subtab-breathing-btn"
          onClick={() => setActiveSubTab('breathing')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeSubTab === 'breathing'
              ? 'bg-white text-slate-900 border border-slate-300/80 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Wind className="w-4 h-4 text-teal-600" />
          <span>4-4-6 Vagus Breathing</span>
        </button>

        <button
          id="subtab-grounding-btn"
          onClick={() => setActiveSubTab('grounding')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeSubTab === 'grounding'
              ? 'bg-white text-slate-900 border border-slate-300/80 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Eye className="w-4 h-4 text-amber-600" />
          <span>5-4-3-2-1 Grounding</span>
        </button>

        <button
          id="subtab-boundaries-btn"
          onClick={() => setActiveSubTab('boundaries')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeSubTab === 'boundaries'
              ? 'bg-white text-slate-900 border border-slate-300/80 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Copy className="w-4 h-4 text-rose-600" />
          <span>Boundary Scripts</span>
        </button>
      </div>

      {/* 1. 4-4-6 BREATHING SECTION */}
      {activeSubTab === 'breathing' && (
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-semibold text-teal-700 uppercase tracking-widest">
              Somatic Nervous System Calming
            </span>
            <h2 className="text-3xl font-serif font-bold text-slate-900">4-4-6 Vagus Nerve Reset</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Extending the exhale to 6 seconds gently stimulates your vagus nerve, sending an immediate biological signal to your brain that you are safe.
            </p>
          </div>

          {/* Interactive Breathing Visualizer Circle */}
          <div className="relative flex flex-col items-center justify-center py-10 sm:py-16">
            {/* Ambient pulsating rings */}
            <div 
              className={`w-64 h-64 sm:w-80 sm:h-80 rounded-full flex items-center justify-center transition-all duration-1000 ease-in-out border ${
                breathPhase === 'inhale'
                  ? 'scale-110 bg-teal-50 border-teal-300 shadow-xl shadow-teal-500/10'
                  : breathPhase === 'hold'
                  ? 'scale-110 bg-amber-50 border-amber-300 shadow-xl shadow-amber-500/10'
                  : 'scale-90 bg-rose-50 border-rose-300 shadow-xl shadow-rose-500/10'
              }`}
            >
              {/* Inner core circle */}
              <div 
                className={`w-44 h-44 sm:w-56 sm:h-56 rounded-full flex flex-col items-center justify-center text-center p-4 transition-all duration-1000 ease-in-out shadow-md ${
                  breathPhase === 'inhale'
                    ? 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white'
                    : breathPhase === 'hold'
                    ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white'
                    : 'bg-gradient-to-br from-rose-500 to-purple-600 text-white'
                }`}
              >
                <span className="text-xs uppercase font-bold tracking-widest text-white/90">
                  {breathPhase === 'inhale' ? 'Inhale Softly' : breathPhase === 'hold' ? 'Gently Hold' : 'Exhale Slowly'}
                </span>
                <span className="text-5xl sm:text-6xl font-serif font-bold text-white my-1">
                  {phaseSecondsLeft}
                </span>
                <span className="text-[11px] text-white/80 font-medium">
                  {breathPhase === 'inhale' ? 'Nose breath' : breathPhase === 'hold' ? 'Relax shoulders' : 'Vagus nerve reset'}
                </span>
              </div>
            </div>

            {/* Breathing Controls */}
            <div className="flex items-center gap-4 mt-8">
              <button
                id="breathing-toggle-btn"
                onClick={() => setIsBreathingRunning(!isBreathingRunning)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-md active:scale-95 text-white ${
                  isBreathingRunning
                    ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
                    : 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
                }`}
              >
                {isBreathingRunning ? (
                  <>
                    <Pause className="w-4 h-4" /> Pause Rhythm
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" /> Start Paced Breathing
                  </>
                )}
              </button>

              <button
                id="breathing-reset-btn"
                onClick={resetBreathing}
                title="Reset rhythm"
                className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 transition-colors shadow-xs"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Cycle indicator */}
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Cycles completed: <strong className="text-slate-900">{completedCycles}</strong> (3-5 cycles recommended for noticeable calming)</span>
            </div>
          </div>

          {/* 3 Step Phase Guides */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/80">
              <div className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">1. Inhale (4s)</div>
              <p className="text-xs text-slate-700">Breathe gently through the nose into the lower belly without forcing the chest upward.</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">2. Hold (4s)</div>
              <p className="text-xs text-slate-700">Suspend the breath effortlessly. Let the facial muscles and tongue relax away from the roof of mouth.</p>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80">
              <div className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-1">3. Exhale (6s)</div>
              <p className="text-xs text-slate-700">Part your lips and release with a soft whisper. Feel your heart decelerate naturally.</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. 5-4-3-2-1 SENSORY GROUNDING */}
      {activeSubTab === 'grounding' && (
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-widest">
              Anxiety & Panic De-escalation
            </span>
            <h2 className="text-3xl font-serif font-bold text-slate-900">5-4-3-2-1 Sensory Grounding</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              When anxious thoughts hijack your attention, interacting with your immediate physical senses pulls brain activity back into the sensory cortex.
            </p>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            {[
              {
                step: 5,
                sense: 'SEE',
                title: '5 Things You Can See',
                desc: 'Look around your room. Notice colors, shapes, light reflections, or subtle patterns on the wall.',
                items: ['A shadow or light reflection', 'A textured fabric or blanket', 'Something green or living', 'A small wooden object', 'A favorite book or item'],
                color: 'border-cyan-200 bg-cyan-50/60 text-cyan-900',
              },
              {
                step: 4,
                sense: 'TOUCH',
                title: '4 Things You Can Physically Feel',
                desc: 'Bring awareness to touch. The soles of your feet in your socks, the coolness of a glass, the warmth of your skin.',
                items: ['The fabric against your skin', 'The firmness of the floor beneath feet', 'The coolness of a surface', 'The temperature of your hands'],
                color: 'border-emerald-200 bg-emerald-50/60 text-emerald-900',
              },
              {
                step: 3,
                sense: 'HEAR',
                title: '3 Things You Can Hear',
                desc: 'Tune into background acoustics. Distant traffic, hum of an appliance, or your own slow breath.',
                items: ['A distant background hum', 'A sound outside your window', 'The soft rhythm of your breathing'],
                color: 'border-purple-200 bg-purple-50/60 text-purple-900',
              },
              {
                step: 2,
                sense: 'SMELL',
                title: '2 Things You Can Smell',
                desc: 'Notice ambient aromas. Your soap, a cup of tea, the breeze from an open window, or essential oils.',
                items: ['Fresh air or room fragrance', 'Clean fabric or skin aroma'],
                color: 'border-amber-200 bg-amber-50/60 text-amber-900',
              },
              {
                step: 1,
                sense: 'TASTE / AFFIRM',
                title: '1 True Affirmation or Taste',
                desc: 'A sip of cool water, lingering tea, or the grounded truth: "I am safe in this room right now."',
                items: ['I am safe, sovereign, and held in this moment'],
                color: 'border-rose-200 bg-rose-50/60 text-rose-900',
              },
            ].map((section) => (
              <div
                key={section.step}
                className={`p-5 rounded-2xl border ${section.color} transition-all shadow-xs`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center font-bold text-xs text-white">
                      {section.step}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">{section.title}</h3>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                    {section.sense}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-4">{section.desc}</p>

                <div className="space-y-2">
                  {section.items.map((item, idx) => {
                    const keyId = `g-${section.step}-${idx}`;
                    const isChecked = !!groundingItems[keyId];
                    return (
                      <label
                        key={idx}
                        className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all text-xs ${
                          isChecked
                            ? 'bg-slate-100 border-slate-300 text-slate-400 line-through'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 shadow-xs'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleGroundingCheck(keyId)}
                          className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300"
                        />
                        <span>{item}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. BOUNDARY SCRIPTS VAULT */}
      {activeSubTab === 'boundaries' && (
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-semibold text-purple-700 uppercase tracking-widest">
              Trauma-Informed Communication
            </span>
            <h2 className="text-3xl font-serif font-bold text-slate-900">Boundary Scripts Vault</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              When overwhelmed, our minds struggle to formulate words. Use these tested scripts to set firm, respectful boundaries without agonizing over drafting them.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Script Categories Selector */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 px-1 mb-2">
                Select Scenario
              </h3>
              {BOUNDARY_SCRIPTS.map((script) => {
                const isSelected = selectedScript.id === script.id;
                return (
                  <button
                    key={script.id}
                    id={`script-select-${script.id}`}
                    onClick={() => setSelectedScript(script)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-rose-50 border-rose-300 text-rose-900 font-medium shadow-xs'
                        : 'bg-slate-50/80 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-rose-700">{script.category}</span>
                      <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-rose-600' : 'text-slate-400'}`} />
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">{script.scenario}</p>
                  </button>
                );
              })}
            </div>

            {/* Active Script Details & Copy Boxes */}
            <div className="lg:col-span-2 space-y-5 bg-slate-50/80 p-6 rounded-2xl border border-slate-200">
              <div>
                <span className="text-xs font-bold text-rose-700 uppercase tracking-widest">
                  {selectedScript.category}
                </span>
                <h4 className="text-lg font-bold text-slate-900 mt-1">{selectedScript.scenario}</h4>
                <p className="text-xs text-slate-600 mt-1 italic">💡 {selectedScript.contextNote}</p>
              </div>

              {/* Primary Recommended Script */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-teal-800">Standard Clear Script</span>
                  <button
                    id={`copy-standard-${selectedScript.id}`}
                    onClick={() => handleCopy(selectedScript.script, `std-${selectedScript.id}`)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    {copiedId === `std-${selectedScript.id}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm text-slate-800 font-sans leading-relaxed">
                  &quot;{selectedScript.script}&quot;
                </p>
              </div>

              {/* Gentle Variation */}
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200 space-y-2 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-purple-800">Gentle / Warm Variation</span>
                  <button
                    id={`copy-gentle-${selectedScript.id}`}
                    onClick={() => handleCopy(selectedScript.gentleVersion, `gnt-${selectedScript.id}`)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    {copiedId === `gnt-${selectedScript.id}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm text-slate-700 font-sans leading-relaxed">
                  &quot;{selectedScript.gentleVersion}&quot;
                </p>
              </div>

              {/* Firm Variation */}
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200 space-y-2 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-rose-800">Firm / Non-Negotiable Variation</span>
                  <button
                    id={`copy-firm-${selectedScript.id}`}
                    onClick={() => handleCopy(selectedScript.firmVersion, `frm-${selectedScript.id}`)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    {copiedId === `frm-${selectedScript.id}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm text-slate-700 font-sans leading-relaxed">
                  &quot;{selectedScript.firmVersion}&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
