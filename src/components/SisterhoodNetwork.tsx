import React, { useState } from 'react';
import { 
  Users, 
  MessageSquareHeart, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle, 
  Send, 
  Heart,
  UserCheck,
  Compass,
  X
} from 'lucide-react';
import { PEER_BUDDIES } from '../data/sanctuaryData';
import { PeerBuddy } from '../types';

export const SisterhoodNetwork: React.FC = () => {
  const [selectedBuddy, setSelectedBuddy] = useState<PeerBuddy | null>(null);
  const [introMessage, setIntroMessage] = useState('');
  const [connectionSent, setConnectionSent] = useState(false);

  const [activeCircleTab, setActiveCircleTab] = useState<'buddies' | 'circles'>('buddies');

  const communityCircles = [
    {
      id: 'circle-postpartum',
      name: 'The 4th Trimester Sisterhood',
      members: '342 Sisters',
      topics: 'Sleepless nights, identity grief, birth trauma recovery',
      moderator: 'Priya Sharma (Peer Mentor)',
      recentNote: '"Reminder that asking your partner to take the 2 AM shift is not an imposition; it is shared parenthood."',
    },
    {
      id: 'circle-career',
      name: 'Quiet Quitting & Career Pivot Sanctuary',
      members: '519 Sisters',
      topics: 'Overcoming impostor syndrome, uncompensated overtime, resignation plans',
      moderator: 'Elena Rostova (Peer Mentor)',
      recentNote: '"I handed in my notice today after 9 years. My chest feels lighter than it has since 2019."',
    },
    {
      id: 'circle-rebuild',
      name: 'Solo Motherhood & Rebuilding Autonomy',
      members: '287 Sisters',
      topics: 'Divorce paperwork, coparenting boundaries, single-parent joy',
      moderator: 'Maya Johnson (Peer Mentor)',
      recentNote: '"Cooked dinner tonight in my own peaceful apartment. The quiet is sacred."',
    },
    {
      id: 'circle-grief',
      name: 'Gentle Bereavement & Silent Loss Solace',
      members: '194 Sisters',
      topics: 'Pregnancy loss, parental passing, ambiguous relationship grief',
      moderator: 'Fatima Al-Zahra (Peer Mentor)',
      recentNote: '"Grief does not have a 12-month expiration date. Take all the time you need."',
    },
  ];

  const handleOpenConnect = (buddy: PeerBuddy) => {
    setSelectedBuddy(buddy);
    setConnectionSent(false);
    setIntroMessage(`Hi ${buddy.name.split(' ')[0]}, I saw your story on SuperShakti and am currently going through a similar phase. I would love to connect for mutual support.`);
  };

  const handleSendIntro = (e: React.FormEvent) => {
    e.preventDefault();
    setConnectionSent(true);
    setTimeout(() => {
      // simulate auto-close or leave open with confirmation
    }, 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200 mb-4">
            <Users className="w-3.5 h-3.5 text-purple-600" />
            Tier 2 • Human Connection & Sisterhood
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Connect With Women Who Walked Your Exact Path
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            No diagnostic labels, zero fake profiles. Chat with vetted peer mentors who overcame postpartum depression, high-conflict divorce, burnout, and family estrangement.
          </p>
        </div>

        {/* Verification Guarantee Strip */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4 sm:gap-8 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Vetted Non-Profit Sisterhoods
          </div>
          <div className="flex items-center gap-1.5 text-purple-700 font-medium">
            <UserCheck className="w-4 h-4 text-purple-600" /> Identity Verified Mentors
          </div>
          <div className="flex items-center gap-1.5 text-rose-700 font-medium">
            <Heart className="w-4 h-4 text-rose-600" /> 100% Free Peer Care
          </div>
        </div>
      </div>

      {/* Switcher: Mentors vs Circles */}
      <div className="flex items-center justify-center gap-1.5 max-w-md mx-auto p-1.5 bg-slate-100/90 backdrop-blur-md border border-slate-200/80 rounded-2xl">
        <button
          id="peer-mentors-tab-btn"
          onClick={() => setActiveCircleTab('buddies')}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeCircleTab === 'buddies'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Lived-Experience Mentors
        </button>
        <button
          id="community-circles-tab-btn"
          onClick={() => setActiveCircleTab('circles')}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeCircleTab === 'circles'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Community Circles
        </button>
      </div>

      {/* 1. PEER MENTORS LIST */}
      {activeCircleTab === 'buddies' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PEER_BUDDIES.map((buddy) => (
            <div
              key={buddy.id}
              className="bg-white/90 backdrop-blur-md border border-slate-200/90 hover:border-slate-300 rounded-3xl p-6 shadow-sm transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-rose-500 flex items-center justify-center font-serif font-bold text-lg text-white shadow-sm">
                      {buddy.initials}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                        {buddy.name}
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" title="Online Sanctuary" />
                      </h3>
                      <p className="text-xs font-medium text-amber-700 mt-0.5">{buddy.badge}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Available
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic mb-3">
                  &quot;{buddy.bio}&quot;
                </p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 mb-4 space-y-1 text-xs text-slate-600">
                  <div>
                    <strong className="text-slate-900">Lived Experience:</strong> {buddy.experience}
                  </div>
                  <div>
                    <strong className="text-slate-900">Affiliation:</strong> {buddy.verifiedOrg}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <span className="text-[11px] text-slate-400">{buddy.location}</span>
                <button
                  id={`connect-buddy-btn-${buddy.id}`}
                  onClick={() => handleOpenConnect(buddy)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white shadow-sm transition-all flex items-center gap-1.5"
                >
                  <MessageSquareHeart className="w-3.5 h-3.5" />
                  <span>1-Click Safe Intro</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. COMMUNITY CIRCLES LIST */}
      {activeCircleTab === 'circles' && (
        <div className="space-y-4">
          {communityCircles.map((circle) => (
            <div
              key={circle.id}
              className="bg-white/90 backdrop-blur-md border border-slate-200/90 hover:border-slate-300 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-purple-700 uppercase tracking-wide">
                    Sisterhood Circle
                  </span>
                  <span className="text-xs text-slate-400">• {circle.members}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{circle.name}</h3>
                <p className="text-xs text-slate-600">
                  <strong className="text-slate-800">Focus:</strong> {circle.topics}
                </p>
                <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 italic">
                  {circle.recentNote}
                </div>
                <p className="text-[11px] text-slate-500">Moderated with trauma care by {circle.moderator}</p>
              </div>

              <button
                id={`join-circle-${circle.id}`}
                onClick={() => alert(`Joined ${circle.name}! In this zero-tracking preview, you are automatically subscribed to daily supportive insights.`)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-sm shrink-0 self-start sm:self-center"
              >
                Join Sanctuary Circle
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 1-Click Intro Modal */}
      {selectedBuddy && (
        <div 
          id="buddy-connect-modal"
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative">
            <button
              id="close-buddy-modal-btn"
              onClick={() => setSelectedBuddy(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-rose-500 flex items-center justify-center font-bold text-lg text-white">
                {selectedBuddy.initials}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Connect with {selectedBuddy.name}</h3>
                <p className="text-xs text-amber-700 font-semibold">{selectedBuddy.badge}</p>
              </div>
            </div>

            {connectionSent ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Safe Intro Transmitted</h4>
                <p className="text-xs text-emerald-800">
                  Your confidential note was delivered to {selectedBuddy.name}. In SuperShakti, your personal contact details are shielded until you mutually choose to share them.
                </p>
                <button
                  id="buddy-modal-done-btn"
                  onClick={() => setSelectedBuddy(null)}
                  className="mt-2 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Return to Sisterhood
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendIntro} className="space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  SuperShakti uses peer mediation to protect your privacy. Your message will be sent through our encrypted sisterhood exchange.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your introductory note:
                  </label>
                  <textarea
                    value={introMessage}
                    onChange={(e) => setIntroMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-all resize-none"
                    required
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500">
                  🔒 Zero IP logging • Peer response typically within 4-6 hours
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedBuddy(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    id="submit-intro-msg-btn"
                    className="px-5 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white shadow-sm flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Confidential Intro</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
