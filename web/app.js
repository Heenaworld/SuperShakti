// SuperShakti Web Application Logic
// Zero-Knowledge Architecture: No GPS, No Location Storage, No IP Logging.
// Zero Fake Profiles: All networks, meetups, and centers are verified real organizations.
import {
  COUNTRIES,
  SUPPORT_PACKAGES,
  ADVICE_PLACES,
  ADVICE_CATEGORIES,
  findPackageById,
  getMeetupsForPackage,
  getGirlsGroupsForPackage,
  getHelplinesForCountry,
  getPlacesForCountry,
  getStatesForCountry,
  getCitiesForCountryAndState
} from './catalog.js?v=2.2.0';

export const COUNTRY_FLAGS = {
  US: '🇺🇸',
  GB: '🇬🇧',
  UK: '🇬🇧',
  CA: '🇨🇦',
  AU: '🇦🇺',
  EU: '🇪🇺',
  IN: '🇮🇳',
  GLOBAL: '🌍'
};

// State Management
const STATE = {
  screen: 'home',
  country: (localStorage.getItem('supershakti_country') || localStorage.getItem('supershaki_country')) || 'US',
  feelingInput: '',
  matchResult: null,
  activePackage: null,
  activeModal: null,
  activeTool: null,
  isBreathingActive: false,
  breathingInterval: null,
  breathPhase: 'Inhale softly through nose',
  breathCountdown: 4,
  mapViewMode: 'radar',
  selectedAdviceNodeId: 'immediate-safety-exit',
  mapCategory: 'ALL',
  mapCountry: (localStorage.getItem('supershakti_country') || localStorage.getItem('supershaki_country')) || 'ALL',
  mapState: localStorage.getItem('supershakti_map_state') || 'ALL',
  mapCity: localStorage.getItem('supershakti_map_city') || 'ALL',
  selectedPlaceId: 'place_sf_womens_building',
  mapSearchQuery: '',
  isSafetyCurtainActive: false,
  mentorSearchQuery: '',
  savedTools: JSON.parse((localStorage.getItem('supershakti_saved_tools') || localStorage.getItem('supershaki_saved_tools')) || '[]'),
  peerMatchRequests: JSON.parse((localStorage.getItem('supershakti_peer_requests') || localStorage.getItem('supershaki_peer_requests')) || '[]'),
  careHistory: JSON.parse((localStorage.getItem('supershakti_history') || localStorage.getItem('supershaki_history')) || '[]'),
  rsvpedMeetupIds: new Set(JSON.parse((localStorage.getItem('supershakti_meetups') || localStorage.getItem('supershaki_meetups')) || '[]')),
  joinedGroupIds: new Set(JSON.parse((localStorage.getItem('supershakti_groups') || localStorage.getItem('supershaki_groups')) || '[]')),
  geminiApiKey: (localStorage.getItem('supershakti_gemini_key') || localStorage.getItem('supershaki_gemini_key')) || '',
};

function getPackageImageUrl(pkg) {
  if (!pkg) return '';
  const img = pkg.image || `assets/packages/pkg_${pkg.id}.jpg`;
  return `${img}?v=2.2.0`;
}

function persistState() {
  localStorage.setItem('supershakti_country', STATE.country);
  localStorage.setItem('supershakti_map_state', STATE.mapState);
  localStorage.setItem('supershakti_map_city', STATE.mapCity);
  localStorage.setItem('supershakti_saved_tools', JSON.stringify(STATE.savedTools));
  localStorage.setItem('supershakti_peer_requests', JSON.stringify(STATE.peerMatchRequests));
  localStorage.setItem('supershakti_history', JSON.stringify(STATE.careHistory));
  localStorage.setItem('supershakti_meetups', JSON.stringify([...STATE.rsvpedMeetupIds]));
  localStorage.setItem('supershakti_groups', JSON.stringify([...STATE.joinedGroupIds]));
  localStorage.setItem('supershakti_gemini_key', STATE.geminiApiKey);
  localStorage.setItem('supershakti_feedback', JSON.stringify(STATE.feedbacks));
  updateBadges();
  updateCountryUI();
}

function updateBadges() {
  const badge = document.getElementById('sanctuary-badge');
  if (!badge) return;
  const count = STATE.savedTools.length + STATE.peerMatchRequests.length + STATE.rsvpedMeetupIds.size + STATE.joinedGroupIds.size;
  if (count > 0) {
    badge.textContent = count;
    badge.style.display = 'inline-block';
  } else {
    badge.style.display = 'none';
  }
}

function updateCountryUI() {
  const cData = COUNTRIES[STATE.country] || COUNTRIES['US'];
  const flagEl = document.getElementById('header-country-flag');
  const labelEl = document.getElementById('header-country-name');
  const bannerText = document.getElementById('emergency-banner-text');
  const footerText = document.getElementById('footer-emergency-text');

  if (flagEl) flagEl.textContent = cData.flag;
  if (labelEl) labelEl.textContent = cData.name;
  const bannerBtn = document.getElementById('banner-change-country-btn');
  if (bannerBtn) bannerBtn.innerHTML = ` Switch Country ▾`;
  
  const topCrisis = (cData.crisisHelplines && cData.crisisHelplines[0]) || { name: 'Emergency', number: cData.emergency };
  if (bannerText) {
    bannerText.innerHTML = `Immediate crisis in <strong>${cData.name}</strong>? Call <strong>${cData.emergency}</strong> or <strong>${topCrisis.name}</strong> (${topCrisis.number}).`;
  }
  if (footerText) {
    footerText.innerHTML = `National crisis emergency in ${cData.name}: <strong>${cData.emergency}</strong> • ${topCrisis.name}: <strong>${topCrisis.number}</strong>. Zero IP logging & zero location tracking enforced.`;
  }
}

const ABUSE_TRIGGERS = [
  'hit me', 'punched', 'scared of him', 'afraid of my partner', 'choked', 'choking',
  'stalking', 'hurts me', 'threatened to kill', 'domestic violence', "can't leave",
  'wont let me leave', 'locked me in', 'took my passport'
];

const SELF_HARM_TRIGGERS = [
  'want to die', 'kill myself', 'end my life', 'better off dead',
  'self-harm', 'cut myself', 'no reason to live'
];

const FINANCIAL_CONTROL_TRIGGERS = [
  'takes my paycheck', 'controls the money', "won't let me work", 'no access to bank',
  'financially trapped', 'hides our money', 'monitors every penny'
];

const DOMESTIC_FEAR_TRIGGERS = [
  'screaming at me', 'walking on eggshells', 'throws things', 'afraid of his temper',
  'afraid of her temper', 'threatens my children', 'scared in my own home'
];

function matchOffline(inputFeeling, countryCode = 'US') {
  let text = (inputFeeling || '').toLowerCase();
  const cData = COUNTRIES[countryCode] || COUNTRIES['US'];
  const helplines = cData.crisisHelplines || [];

  const isAbuse = ABUSE_TRIGGERS.some(t => text.includes(t));
  const isSelfHarm = SELF_HARM_TRIGGERS.some(t => text.includes(t));

  if (isAbuse || isSelfHarm) {
    const isDomestic = isAbuse;
    const targetPkg = isDomestic
      ? findPackageById('divorce_separation')
      : findPackageById('emotional_struggles');

    let hotline = helplines[0];
    if (isDomestic) {
      const dvLine = helplines.find(h => 
        h.name.toLowerCase().includes('domestic') || 
        h.name.toLowerCase().includes('abuse') || 
        h.name.toLowerCase().includes('violence') ||
        h.name.toLowerCase().includes('refuge') ||
        h.name.toLowerCase().includes('gewalt') ||
        h.name.toLowerCase().includes('femmes')
      );
      if (dvLine) hotline = dvLine;
    }

    return {
      matchedPackage: targetPkg,
      secondaryPackages: [],
      isHybrid: false,
      hybridSynergy: null,
      empathyStatement: isDomestic
        ? "Your safety, autonomy, and bodily dignity are the absolute priority. You do not have to carry this fear alone, and what is happening is not your fault."
        : "I hear how heavy and unbearable everything feels right now. Please know that your life matters deeply and there are gentle hands ready to listen.",
      detectedNeeds: [isDomestic ? "Safety & Domestic Triage" : "Immediate Crisis Support", "Urgent Care"],
      isCrisis: true,
      crisisHotline: hotline || { name: "Emergency Services", number: cData.emergency, hours: "24/7" },
      escalationReason: isDomestic ? "Physical safety / Domestic concern detected" : "Self-harm / Crisis distress detected"
    };
  }

  let escalation = null;
  if (FINANCIAL_CONTROL_TRIGGERS.some(t => text.includes(t))) {
    escalation = "Financial restriction or coercive money control detected. Access independent resources safely.";
  } else if (DOMESTIC_FEAR_TRIGGERS.some(t => text.includes(t))) {
    escalation = "Emotional or coercive intimidation at home detected. Discreet support is available.";
  }

  // Normalize typos
  text = text.replace(/\bhair\s+lose\b/g, 'hair loss');
  text = text.replace(/\bhair\s+falling\b/g, 'hair loss');
  text = text.replace(/\b(i am|feeling|feel|im|so)\s+tried\b/g, '$1 tired');
  text = text.replace(/\btried\s+and\b/g, 'tired and');
  text = text.replace(/\btried\s+with\b/g, 'tired with');
  text = text.replace(/\bboybriend\b/g, 'boyfriend');
  text = text.replace(/\bemotional\s+demanding\b/g, 'emotionally demanding');

  const STOP_WORDS = new Set([
    "and", "the", "for", "with", "that", "this", "are", "feel", "feeling", "have", "has", 
    "about", "all", "not", "out", "can", "get", "just", "like", "more", "from", "been", "was"
  ]);
  const tokens = (text.match(/\b[a-z]{3,}\b/g) || []).filter(w => !STOP_WORDS.has(w));
  const clauses = text.split(/\band\b|\balso\b|\bplus\b|\bas well as\b|\bwhile\b|,|;/).map(c => c.trim()).filter(Boolean);

  const scores = {};
  SUPPORT_PACKAGES.forEach(pkg => { scores[pkg.id] = 0; });

  const THEMES = {
    "health_sports": [
      "hair loss", "hair lose", "hair thinning", "hair fall", "hormone", "thyroid", "menopause", 
      "perimenopause", "period", "bodily", "fatigue", "depletion", "vitamin", "ferritin", "insomnia", 
      "body ache", "physical", "drained", "doctor", "health"
    ],
    "job_search_remote_loneliness": [
      "job", "work stress", "job stress", "workplace", "career", "boss", "laid off", "layoff", 
      "unemploy", "interview", "remote work", "work from home", "office isolation", "resume", 
      "unemployed", "jobless", "toxic job", "job pressure"
    ],
    "ai_fear_digital_colonization_cybersecurity": [
      "ai", "replace", "automation", "obsolete", "algorithm", "coloniz", "cyber", "eu ai", 
      "ai safety", "deepfake", "surveillance", "doxx", "stalkerware", "biometric", "chatgpt"
    ],
    "emotional_struggles": [
      "emotional", "emotionally", "demanding", "stress", "stressful", "drained", "burnout", 
      "exhausted", "overwhelmed", "anxious", "anxiety", "crying", "depressed", "depression", 
      "struggling", "numb", "hopeless", "cant cope", "mental health", "sad", "boundary fatigue", 
      "emotional load", "emotionally drained", "running on empty"
    ],
    "financial_difficulties": [
      "money", "debt", "rent", "budget", "broke", "financial", "afford", "bills", "poverty", "inflation"
    ],
    "moving_new_city": [
      "moving", "relocat", "new city", "moved", "new town", "relocation"
    ],
    "migration": [
      "immigrant", "visa", "new country", "culture shock", "language barrier", "homesick", "dual identity"
    ],
    "divorce_separation": [
      "boyfriend", "girlfriend", "partner", "husband", "relationship", "breakup", "broke up", 
      "dumped", "demanding boyfriend", "demanding partner", "toxic relationship", "separation", 
      "divorce", "uncoupling", "ex-partner", "ex-husband", "custody", "split up", "marital", "dating"
    ],
    "loneliness_friends": [
      "lonely", "no friends", "making friends", "isolated", "no one to talk to", "friendless"
    ],
    "parenting": [
      "toddler", "kids", "parenting", "teenager", "tantrum", "child", "school run"
    ],
    "pregnancy_new_parents": [
      "pregnant", "pregnancy", "baby", "postpartum", "newborn", "breastfeeding", "birth"
    ],
    "caring_for_parents": [
      "caregiver", "elder", "dementia", "aging parent", "caring for my mom", "caring for my dad"
    ],
    "aging": [
      "aging", "older", "wrinkles", "getting older", "menopause", "retirement", "grey hair"
    ]
  };

  SUPPORT_PACKAGES.forEach(pkg => {
    const pkgId = pkg.id;
    (pkg.feelingPrompts || []).forEach(prompt => {
      const pLower = prompt.toLowerCase();
      if (text.includes(pLower) || pLower.includes(text)) scores[pkgId] += 12;
      tokens.forEach(tok => {
        const re = new RegExp('\\b' + tok + '\\b');
        if (re.test(pLower)) scores[pkgId] += 3;
      });
    });

    const coversLower = (pkg.covers || '').toLowerCase();
    tokens.forEach(tok => {
      const re = new RegExp('\\b' + tok + '\\b');
      if (re.test(coversLower)) scores[pkgId] += 2;
    });

    const themeWords = THEMES[pkgId] || [];
    themeWords.forEach(tw => {
      const re = new RegExp('\\b' + tw + '\\b');
      if (re.test(text)) {
        scores[pkgId] += 25;
        clauses.forEach(clause => {
          if (re.test(clause)) scores[pkgId] += 6;
        });
      }
    });
  });

  const sortedPkgIds = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
  const topPkgId = sortedPkgIds[0];
  const topScore = scores[topPkgId];
  const primaryPkg = findPackageById(topPkgId) || SUPPORT_PACKAGES[0];

  const secondaryPackages = [];
  let isHybrid = false;
  let hybridSynergy = null;

  for (let i = 1; i < Math.min(5, sortedPkgIds.length); i++) {
    const pid = sortedPkgIds[i];
    if ((scores[pid] >= 8 && scores[pid] >= (topScore * 0.18)) || scores[pid] >= 14) {
      if (pid !== topPkgId) {
        const sec = findPackageById(pid);
        if (sec && !secondaryPackages.some(p => p.id === sec.id)) {
          secondaryPackages.push(sec);
          isHybrid = true;
        }
      }
    }
  }

  const detectedNeeds = [primaryPkg.title];
  secondaryPackages.forEach(sp => detectedNeeds.push(sp.title));

  const allPids = new Set([primaryPkg.id, ...secondaryPackages.map(p => p.id)]);

  if (secondaryPackages.length >= 2) {
    const secList = secondaryPackages.map(p => p.title).join(' and ');
    hybridSynergy = `Your prompt articulates ${1 + secondaryPackages.length} intersecting life transitions: <strong>${primaryPkg.title}</strong>, alongside <strong>${secList}</strong>. All matching packages are accessible together so you don't have to navigate any part alone.`;
    detectedNeeds.push("Multi-Dimensional Sisterhood Support");
  } else if ((allPids.has("divorce_separation") || allPids.has("emotional_struggles")) && 
      (allPids.has("job_search_remote_loneliness") || allPids.has("career_changes"))) {
    hybridSynergy = "Navigating the emotional drain of a demanding relationship alongside heavy workplace stress creates acute burnout. When both your personal haven and professional life demand more than you can carry, establishing firm emotional boundaries and reclaiming personal agency are essential to restoring your peace.";
    detectedNeeds.push("Relationship Boundaries & Emotional Sovereignty", "Workplace Stress & Career Decompression");
  } else if (allPids.has("divorce_separation") && allPids.has("emotional_struggles")) {
    hybridSynergy = "Carrying heavy relationship expectations while running on emotional empty takes a severe toll on your wellbeing. Your hybrid path pairs relationship boundary reclamation with restorative emotional care to help you break free from people-pleasing and exhaustion.";
    detectedNeeds.push("Relationship Boundaries", "Emotional Load Release");
  } else if ((allPids.has("health_sports") && allPids.has("job_search_remote_loneliness")) || 
             (allPids.has("health_sports") && allPids.has("emotional_struggles"))) {
    hybridSynergy = "Your body is sounding an alarm through physical fatigue and hair thinning while carrying the weight of emotional or career burnout. True recovery requires pairing gentle somatic restoration with nervous system rest.";
    detectedNeeds.push("Bodily Vitality & Hair Support", "Nervous System Recovery");
  } else if (allPids.has("ai_fear_digital_colonization_cybersecurity") && allPids.has("job_search_remote_loneliness")) {
    hybridSynergy = "Navigating modern career uncertainty while confronting algorithmic displacement creates compound anxiety. Your hybrid path pairs human-centered job resilience with digital rights autonomy.";
    detectedNeeds.push("AI Autonomy & Cyber Defense", "Career Worth & Resilience");
  } else if ((allPids.has("moving_new_city") && allPids.has("financial_difficulties")) || 
             (allPids.has("migration") && allPids.has("financial_difficulties"))) {
    hybridSynergy = "Adapting to a new location while managing monetary constraints can feel doubly isolating. Your hybrid path anchors practical neighborhood resources with independent financial triage.";
    detectedNeeds.push("Community Anchoring", "Financial Independence");
  } else if (allPids.has("aging") && allPids.has("health_sports")) {
    hybridSynergy = "Navigating natural life transitions while honoring shifting hormonal and physical vitality deserves compassionate, whole-body care.";
    detectedNeeds.push("Hormonal Balance", "Reverent Life Pacing");
  } else if (isHybrid && secondaryPackages.length > 0) {
    hybridSynergy = `Life transitions rarely occur in isolation. Your hybrid care path weaves together guidance for both '${primaryPkg.title}' and '${secondaryPackages[0].title}' to support your whole self.`;
    detectedNeeds.push("Integrated Multi-Dimensional Care");
  }

  let empathy = `It takes courage to express this. What you're experiencing is deeply valid, and you deserve gentle, non-judgmental support right now.`;
  if (isHybrid && secondaryPackages.length >= 2) {
    const secTitles = secondaryPackages.map(p => `'${p.title}'`).join(', ');
    empathy = `We hear multiple overlapping layers in your experience: '${primaryPkg.title}' alongside ${secTitles}. You do not have to compartmentalize your challenges—SuperShakti is designed to support all of them.`;
  } else if (isHybrid && secondaryPackages.length > 0) {
    empathy = `We hear multiple layers in your experience: '${primaryPkg.title}' alongside '${secondaryPackages[0].title}'. You do not have to compartmentalize your challenges—SuperShakti is designed to support both.`;
  } else if (primaryPkg.id === 'ai_fear_digital_colonization_cybersecurity') {
    empathy = "Technology-facilitated fear, algorithmic job replacement anxiety, and digital colonization are real systemic harms. Your bodily dignity, career creativity, and digital agency belong to you.";
  } else if (primaryPkg.id === 'job_search_remote_loneliness' || primaryPkg.id === 'job_search_ai_loneliness') {
    empathy = "Job searching, prolonged resume ghosting, and remote work isolation can make you feel entirely invisible. Your worth as a human is vast, real, and independent of any cold job market.";
  } else if (primaryPkg.id === 'health_sports') {
    empathy = "Physical symptoms like hair loss and bodily fatigue are real, somatic messages from your nervous system. Your body is not failing; it is calling for gentle replenishment.";
  }

  const cleanNeeds = Array.from(new Set(detectedNeeds)).slice(0, 4);

  return {
    matchedPackage: primaryPkg,
    secondaryPackages: secondaryPackages,
    isHybrid: isHybrid,
    hybridSynergy: hybridSynergy,
    empathyStatement: empathy,
    detectedNeeds: cleanNeeds,
    isCrisis: false,
    crisisHotline: null,
    escalationReason: escalation
  };
}

function navigateTo(screenName) {
  STATE.screen = screenName;
  document.querySelectorAll('.nav-btn[data-screen]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.screen === screenName);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderApp();
}

function toggleSafetyCurtain() {
  STATE.isSafetyCurtainActive = !STATE.isSafetyCurtainActive;
  const container = document.getElementById('safety-curtain-container');
  if (!container) return;

  if (STATE.isSafetyCurtainActive) {
    container.innerHTML = `
      <div class="weather-overlay">
        <div class="weather-header">
          <div style="font-weight: 700; font-size: 1.1rem; color: #1E293B;">Weather Forecast & Radar</div>
          <button id="exit-weather-btn" style="background: #E2E8F0; border: none; padding: 6px 14px; border-radius: 999px; font-weight: 600; cursor: pointer; color: #475569;">
            Close & Return
          </button>
        </div>
        <div class="weather-card">
          <div style="font-size: 3.5rem;"></div>
          <div class="weather-temp">68°F</div>
          <div class="weather-desc">Partly Cloudy • Humidity 48% • Wind 5 mph</div>
          <div style="margin-top: 18px; font-size: 0.9rem; color: #64748B;">
            Hourly: 9 AM (64°) • 12 PM (68°) • 3 PM (71°) • 6 PM (66°)
          </div>
        </div>
      </div>
    `;
    document.getElementById('exit-weather-btn').addEventListener('click', toggleSafetyCurtain);
  } else {
    container.innerHTML = '';
  }
}

function renderApp() {
  const main = document.getElementById('app-main');
  if (!main) return;

  if (STATE.screen !== 'map' && leafletMapInstance) {
    try {
      leafletMapInstance.remove();
    } catch (e) {
      console.warn("Leaflet cleanup:", e);
    }
    leafletMapInstance = null;
    leafletMarkersMap.clear();
  }

  switch (STATE.screen) {
    case 'home':
      main.innerHTML = renderHomeScreen();
      attachHomeListeners();
      break;
    case 'match':
      main.innerHTML = renderMatchResults();
      attachMatchListeners();
      break;
    case 'packages':
      main.innerHTML = renderPackagesScreen();
      attachPackagesListeners();
      break;
    case 'mentors':
      main.innerHTML = renderMentorsScreen();
      attachMentorsListeners();
      break;
    case 'map':
      main.innerHTML = renderMapScreen();
      attachMapListeners();
      break;
    case 'sanctuary':
      main.innerHTML = renderSanctuaryScreen();
      attachSanctuaryListeners();
      break;
    default:
      main.innerHTML = renderHomeScreen();
      attachHomeListeners();
  }

  updateBadges();
  updateCountryUI();
}

function renderHomeScreen() {
  const cData = COUNTRIES[STATE.country] || COUNTRIES['US'];
  return `
    <div>
      <div class="hero-card">
        <div class="hero-content">
          <div class="hero-badge">Women Support System Sanctuary</div>
          <h1 class="hero-title">Start with How You Feel. We Untangle the Rest.</h1>
          <p class="hero-subtitle">
            A safe space connecting you to immediate nervous system relief, verified peer sisterhood circles, and accredited support organizations in your region.
          </p>
        </div>
        <img src="assets/hero_women_support.jpg" alt="Women Supporting Each Other" class="hero-img">
      </div>

      <div class="feeling-section">
        <div class="feeling-title">What feels heavy or unsaid today?</div>
        <div class="feeling-subtitle">
          Share raw thoughts, anxiety, life transitions, or digital burnout. We listen to the feeling first.
        </div>
        <textarea id="feeling-input" class="feeling-textarea" placeholder="e.g. I moved to a new country and don't know anyone... or I feel like I'm losing myself since having my baby... or I feel overwhelmed by AI surveillance and online harassment targeting women.">${STATE.feelingInput}</textarea>
        
        <div class="feeling-actions">
          <span class="feeling-help-text">Type freely or tap any life prompt below</span>
          <button id="match-button" class="match-btn">
            <span>Find My Care Path</span>
          </button>
        </div>
      </div>

      <div class="chips-section">
        <div class="section-label">Common Heartfelt Prompts (Tap to Explore)</div>
        <div class="chips-cloud">
          <button class="chip prompt-chip" data-text="I've been job hunting for months, getting ghosted, and feel completely exhausted and isolated working from home"> Job hunting fatigue & remote work isolation</button>
          <button class="chip prompt-chip" data-text="I'm terrified AI is going to make my job obsolete, and anxious about deepfakes and tech surveillance"> AI Fear, Job Replacement & Digital Sovereignty</button>
          <button class="chip prompt-chip" data-text="I feel like I've lost myself since having a baby and nobody told me it would feel this lonely"> Lost myself after having a baby</button>
          <button class="chip prompt-chip" data-text="I don't know who I am outside of my marriage and I'm scared to be alone"> Separating & rebuilding my life</button>
          <button class="chip prompt-chip" data-text="I'm the only one taking care of my mom and I'm running on empty"> Caregiver burnout & fatigue</button>
          <button class="chip prompt-chip" data-text="I moved here for work and don't know a single person"> Alone in a new city</button>
          <button class="chip prompt-chip" data-text="I say yes to everything and I'm running on empty"> Chronic people-pleasing burnout</button>
          <button class="chip prompt-chip" data-text="I'm scared to check my bank account and feel so ashamed"> Overwhelmed by money stress</button>
          <button class="chip prompt-chip" data-text="I don't have anyone to call when something good or bad happens"> Need genuine adult friendships</button>
        </div>
      </div>

      <div style="margin-top: 36px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h2 style="font-size: 1.2rem; font-weight: 800; color: var(--text-main);">Explore All 16 Support Packages</h2>
          <button id="see-all-packages-btn" style="background: none; border: none; color: var(--primary); font-weight: 700; cursor: pointer;">View All →</button>
        </div>
        <div class="packages-grid">
          ${SUPPORT_PACKAGES.slice(0, 6).map(pkg => `
            <div class="package-card" data-pkg-id="${pkg.id}">
              <div class="package-header">
                <img src="${getPackageImageUrl(pkg)}" alt="${pkg.title}" class="package-img">
                <div class="package-title">${pkg.title}</div>
              </div>
              <div class="package-covers">${pkg.covers}</div>
              <div class="package-footer">
                <span>Explore Care Package</span>
                <span>→</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function attachHomeListeners() {
  const input = document.getElementById('feeling-input');
  if (input) {
    input.addEventListener('input', (e) => {
      STATE.feelingInput = e.target.value;
    });
  }

  const matchBtn = document.getElementById('match-button');
  if (matchBtn) {
    matchBtn.addEventListener('click', handleMatchTrigger);
  }

  document.querySelectorAll('.prompt-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.dataset.text;
      STATE.feelingInput = text;
      const inputEl = document.getElementById('feeling-input');
      if (inputEl) inputEl.value = text;
      handleMatchTrigger();
    });
  });

  const seeAllBtn = document.getElementById('see-all-packages-btn');
  if (seeAllBtn) {
    seeAllBtn.addEventListener('click', () => navigateTo('packages'));
  }

  const switchCountryBtn = document.getElementById('home-switch-country-btn');
  if (switchCountryBtn) {
    switchCountryBtn.addEventListener('click', openCountrySelectorModal);
  }

  document.querySelectorAll('.package-card').forEach(card => {
    card.addEventListener('click', () => {
      const pkg = findPackageById(card.dataset.pkgId);
      openPackageDetail(pkg);
    });
  });
}

async function handleMatchTrigger() {
  const feeling = (STATE.feelingInput || '').trim();
  if (!feeling) {
    alert("Please share a sentence or pick one of the life prompts below.");
    return;
  }

  const matchBtn = document.getElementById('match-button');
  if (matchBtn) {
    matchBtn.disabled = true;
    matchBtn.innerHTML = `<span> Listening with Empathy...</span>`;
  }

  try {
    const res = await fetch('/api/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        feeling: feeling,
        country: STATE.country,
        apiKey: STATE.geminiApiKey || undefined
      })
    });

    if (res.ok) {
      const data = await res.json();
      STATE.matchResult = data;
    } else {
      STATE.matchResult = matchOffline(feeling, STATE.country);
    }
  } catch (err) {
    console.warn("Backend unavailable, using offline intelligent match:", err);
    STATE.matchResult = matchOffline(feeling, STATE.country);
  }

  if (STATE.matchResult && STATE.matchResult.matchedPackage) {
    STATE.careHistory.unshift({
      date: new Date().toLocaleDateString(),
      feeling: feeling.slice(0, 100),
      packageName: STATE.matchResult.matchedPackage.title,
      packageId: STATE.matchResult.matchedPackage.id
    });
    if (STATE.careHistory.length > 20) STATE.careHistory.pop();
    persistState();
  }

  if (matchBtn) {
    matchBtn.disabled = false;
    matchBtn.innerHTML = `<span>Find My Care Path</span>`;
  }

  navigateTo('match');
}

function renderMatchResults() {
  const res = STATE.matchResult;
  if (!res || !res.matchedPackage) {
    return `
      <div style="text-align: center; padding: 60px 20px;">
        <h2>No Active Match</h2>
        <p style="color: var(--text-muted); margin: 12px 0 20px;">Please share a thought or feeling first.</p>
        <button class="match-btn" onclick="window.SuperShakti.nav('home')">Return Home</button>
      </div>
    `;
  }

  const pkg = res.matchedPackage;
  const tool = pkg.defaultMicroTool;
  const peerNet = pkg.peerNetwork || {
    networkName: `${pkg.title} Verified Peer Network`,
    description: `Connect with verified real women who have walked through ${pkg.title.toLowerCase()}. No bots or fake profiles.`,
    facilitatorType: "Verified Community Facilitator"
  };
  const comm = (pkg.communities && pkg.communities[0]) || null;
  const meetups = getMeetupsForPackage(pkg);
  const girlsGroups = getGirlsGroupsForPackage(pkg);
  const specialist = pkg.specialist;

  const cData = COUNTRIES[STATE.country] || COUNTRIES['US'];
  const helpline = res.crisisHotline || (cData.crisisHelplines && cData.crisisHelplines[0]) || pkg.helpline;

  const isToolSaved = STATE.savedTools.some(t => t.id === tool.id);
  const hasRequestedMatch = STATE.peerMatchRequests.some(r => r.packageId === pkg.id);
  const allMatches = [pkg, ...(res.secondaryPackages || [])].filter((p, idx, arr) => p && arr.findIndex(x => x.id === p.id) === idx);

  return `
    <div class="match-result-container">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
        <button class="nav-btn" onclick="window.SuperShakti.nav('home')">← Change Feeling</button>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
          <button class="nav-btn report-btn" id="open-report-btn">
            
            <span>Report</span>
          </button>
          <button class="nav-btn" id="open-feedback-btn">Rate Match</button>
          <button class="country-select-btn" id="match-switch-country-btn" title="Change country for local advice map and hotlines">
            <span>${cData.name}</span> ▾
          </button>
        </div>
      </div>

      ${res.isCrisis ? `
        <div class="crisis-banner">
          <div class="crisis-banner-title">
            <span>Immediate Safety & Crisis Care Available (${cData.name})</span>
          </div>
          <p style="font-size: 0.95rem; line-height: 1.5;">
            ${res.empathyStatement}
          </p>
          <div class="crisis-hotline-row">
            <a href="tel:${helpline.number}" class="crisis-call-btn">
              Call ${helpline.name} (${helpline.number})
            </a>
            ${helpline.sms ? `
              <a href="sms:${helpline.sms}" class="crisis-call-btn" style="background: #B91C1C;">
                Text Crisis Line (${helpline.sms})
              </a>
            ` : `
              <a href="tel:${cData.emergency}" class="crisis-call-btn" style="background: #B91C1C;">
                Call Emergency (${cData.emergency})
              </a>
            `}
          </div>
        </div>
      ` : ''}

      ${res.escalationReason && !res.isCrisis ? `
        <div style="background: #FEF3C7; border: 1px solid #F59E0B; border-radius: var(--radius-lg); padding: 16px 20px; color: #92400E; display: flex; align-items: center; gap: 12px;">
          <strong style="color: #B45309; font-size: 0.9rem;">[Notice]</strong>
          <div style="font-size: 0.92rem; line-height: 1.4;">
            <strong>Safety Note:</strong> ${res.escalationReason}
          </div>
        </div>
      ` : ''}

      ${allMatches.length >= 2 ? `
        <div class="multi-matches-showcase">
          <div class="multi-matches-header">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="multi-matches-badge">✨ All Matching Packages Identified (${allMatches.length} Matches Found)</span>
            </div>
            <span style="font-size: 0.82rem; color: #6D28D9; font-weight: 700;">Showing All Matching Support Enclaves</span>
          </div>
          <p style="font-size: 0.92rem; color: #4B5563; margin: 4px 0 16px; line-height: 1.5;">
            Your prompt touches multiple life facets. We matched <strong>${allMatches.length} specialized support packages</strong> to your exact words. Every matching package is unlocked below; toggle your primary focus anytime:
          </p>

          <div class="matched-packages-selector-grid">
            ${allMatches.map((mPkg, idx) => {
              const isCurrent = mPkg.id === pkg.id;
              const mTool = mPkg.defaultMicroTool || (mPkg.careTools && mPkg.careTools[0]) || null;
              return `
                <div class="matched-pkg-selector-card ${isCurrent ? 'active' : ''}">
                  <div>
                    <div class="matched-pkg-selector-top">
                      <img src="${getPackageImageUrl(mPkg)}" alt="${mPkg.title}" class="matched-pkg-mini-img">
                      <div style="flex: 1; min-width: 0;">
                        <div class="matched-pkg-selector-role">
                          ${idx === 0 ? 'Primary Match' : `Co-Occurring Match #${idx + 1}`}
                          ${isCurrent ? ' • Active View' : ''}
                        </div>
                        <div class="matched-pkg-selector-title">${mPkg.title}</div>
                      </div>
                    </div>
                    <div class="matched-pkg-selector-covers" style="margin-top: 8px;">${mPkg.covers}</div>
                    ${mTool ? `
                      <div class="matched-pkg-tool-chip" style="margin-top: 8px;">
                        <span>⚡ ${mTool.title} (~${mTool.durationMinutes}m)</span>
                      </div>
                    ` : ''}
                  </div>
                  <div class="matched-pkg-actions" style="margin-top: 10px;">
                    ${isCurrent ? `
                      <span class="active-focus-pill">✓ Currently Viewing Full Path</span>
                    ` : `
                      <div style="display: flex; gap: 6px;">
                        <button class="nav-btn switch-focus-btn" data-pkg-id="${mPkg.id}" style="flex: 1; justify-content: center; background: #7C3AED; color: white; font-size: 0.82rem; padding: 7px 10px;">
                          Focus on This →
                        </button>
                        <button class="nav-btn explore-sec-pkg-btn" data-sec-id="${mPkg.id}" style="font-size: 0.82rem; padding: 7px 10px;" title="Preview Package Details">
                          Details
                        </button>
                      </div>
                    `}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}

      ${res.isHybrid && res.secondaryPackages && res.secondaryPackages.length > 0 ? `
        <div class="hybrid-banner">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px;">
            <div class="hybrid-badge">Hybrid Care Path • Multi-Dimensional Support</div>
            <span style="font-size: 0.8rem; font-weight: 700; color: #6D28D9;">Primary + Co-Occurring Care</span>
          </div>
          <h2 style="font-size: 1.25rem; font-weight: 800; color: #4C1D95; margin: 4px 0 8px;">
            Multiple Dimensions Recognized
          </h2>
          <div class="hybrid-synergy-text">
            ${res.hybridSynergy || `Your experience weaves together primary support in <strong>${pkg.title}</strong> with co-occurring care in <strong>${res.secondaryPackages[0].title}</strong>.`}
          </div>

          <div style="font-size: 0.84rem; font-weight: 800; color: #5B21B6; margin: 12px 0 6px; text-transform: uppercase; letter-spacing: 0.5px;">
            Connected Co-Occurring Support:
          </div>
          <div class="secondary-packages-grid">
            ${res.secondaryPackages.map(secPkg => {
              const secTool = secPkg.defaultMicroTool || (secPkg.careTools && secPkg.careTools[0]) || null;
              return `
                <div class="secondary-package-card">
                  <div style="display: flex; gap: 12px; align-items: center;">
                    <img src="${getPackageImageUrl(secPkg)}" alt="${secPkg.title}" style="width: 48px; height: 48px; border-radius: 10px; object-fit: cover;">
                    <div>
                      <div style="font-weight: 800; color: var(--text-main); font-size: 0.98rem;">${secPkg.title}</div>
                      <div style="font-size: 0.78rem; color: var(--text-muted);">${secPkg.covers}</div>
                    </div>
                  </div>
                  ${secTool ? `
                    <div style="background: #FAF5FF; padding: 10px 12px; border-radius: 8px; border: 1px solid #E9D5FF; font-size: 0.84rem;">
                      <strong>Connected Grounding Tool:</strong> ${secTool.title} (~${secTool.durationMinutes} min)
                      <div style="font-size: 0.78rem; color: #6B7280; margin-top: 4px;">${secTool.description}</div>
                    </div>
                  ` : ''}
                  <div style="display: flex; gap: 8px; margin-top: 6px;">
                    <button class="nav-btn switch-to-secondary-btn" data-sec-id="${secPkg.id}" style="flex: 1; font-size: 0.82rem; background: #7C3AED; color: white;">
                      Switch Focus to This
                    </button>
                    <button class="nav-btn explore-sec-pkg-btn" data-sec-id="${secPkg.id}" style="font-size: 0.82rem;">
                      View Package Detail
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}

      <div class="empathy-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <div class="empathy-headline">We Hear You Deeply</div>
            <p class="empathy-text">"${res.empathyStatement}"</p>
          </div>
          <img src="${getPackageImageUrl(pkg)}" alt="${pkg.title}" class="match-package-img">
        </div>
        <div class="needs-tags-row">
          ${res.detectedNeeds.map(n => `<span class="need-tag"># ${n}</span>`).join('')}
        </div>
      </div>

      <!-- TIER 1: IMMEDIATE MICRO-TOOL -->
      <div class="tier-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <div class="tier-badge t1">Tier 1: Immediate Self-Help</div>
            <h2 class="tier-title">${tool.title}</h2>
            <div class="tier-subtitle">${tool.category} • ~${tool.durationMinutes} min practice</div>
          </div>
          <button class="nav-btn" id="save-tool-btn" style="font-size: 0.85rem;">
            ${isToolSaved ? 'Saved in Sanctuary' : 'Save Tool'}
          </button>
        </div>

        <p style="font-size: 0.95rem; color: #374151; margin-bottom: 12px;">${tool.description}</p>

        ${tool.type === 'BREATHING' ? `
          <div class="breathing-container">
            <div class="breathing-phase" id="breath-phase-text">Inhale softly through nose</div>
            <div class="breathing-circle-wrapper">
              <div class="breathing-circle inhale" id="breath-circle">
                <span class="breathing-countdown" id="breath-countdown-val">4</span>
                <span class="breathing-unit">seconds</span>
              </div>
            </div>
            <div class="breathing-subtext">Engages your vagus nerve to calm the fight-or-flight nervous response.</div>
            <div style="margin-top: 14px;">
              <button class="nav-btn" id="toggle-breathing-btn" style="background: var(--primary); color: white;">
                Pause Breath Guide
              </button>
            </div>
          </div>
        ` : ''}

        ${tool.scriptContent ? `
          <div class="script-card">
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--primary); text-transform: uppercase; margin-bottom: 6px;">Copyable Communication / Affirmation Script</div>
            <div class="script-text">"${tool.scriptContent}"</div>
            <button class="copy-btn" id="copy-script-btn">
              Copy Script to Clipboard
            </button>
          </div>
        ` : ''}

        ${tool.instructions && tool.instructions.length > 0 ? `
          <div style="margin-top: 18px;">
            <div style="font-weight: 700; font-size: 0.92rem; color: var(--text-main); margin-bottom: 10px;">Practical Micro-Steps:</div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${tool.instructions.map((inst, i) => `
                <div style="display: flex; gap: 12px; align-items: flex-start;">
                  <span style="background: #EDE9FE; color: #6D28D9; font-weight: 800; font-size: 0.8rem; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">${i+1}</span>
                  <span style="font-size: 0.9rem; color: #374151;">${inst}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>

      <!-- TIER 2: VERIFIED PEER SISTERHOOD & REAL COMMUNITIES -->
      <div class="tier-card">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <div class="tier-badge t2">Tier 2: Peer Sisterhood & Communities</div>
          <span class="verified-badge"> Real Vetted Peer Network • No Fake Profiles</span>
        </div>
        <h2 class="tier-title">You Don't Have to Walk This Alone</h2>
        <div class="tier-subtitle">Connect with real women who have lived this transition through verified programs.</div>

        <div style="background: #FDF4FF; border: 1px solid #F5D0FE; border-radius: var(--radius-lg); padding: 20px; margin: 16px 0;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
            <div>
              <div style="font-weight: 800; color: #86198F; font-size: 1.1rem;">${peerNet.networkName}</div>
              <div style="font-size: 0.84rem; color: #A21CAF; margin-top: 2px;">
                 <strong>Facilitated by:</strong> ${peerNet.facilitatorType}
              </div>
            </div>
            <span class="badge" style="background: #701A75;">Verified Sister Matching</span>
          </div>

          <p style="font-size: 0.9rem; color: #4A044E; margin: 12px 0; line-height: 1.45;">
            ${peerNet.description}
          </p>

          <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
            <button class="match-btn" id="request-peer-match-btn" style="padding: 9px 18px; font-size: 0.88rem;">
              ${hasRequestedMatch ? ' Matching Request Saved in Sanctuary' : 'Request 1-on-1 Sister Match (Confidential)'}
            </button>
            <span style="font-size: 0.8rem; color: #701A75;">* Completely private. Matching is handled by real community coordinators.</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 18px;">
          ${comm ? `
            <div style="background: #F9FAFB; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 18px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <div style="font-weight: 700; color: var(--text-main); font-size: 1rem;">${comm.name}</div>
                <span class="badge" style="background: #3B82F6;">${comm.memberCount} sisters</span>
              </div>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 10px;">${comm.description}</p>
              <div style="background: white; border: 1px dashed #CBD5E1; border-radius: 8px; padding: 8px 12px; font-size: 0.82rem; color: #4B5563; margin-bottom: 12px;">
                <strong>Active Topic:</strong> "${comm.activeTopic}"
              </div>
              <button class="nav-btn group-toggle-btn" data-group-id="${comm.id}" style="width: 100%; justify-content: center;">
                ${STATE.joinedGroupIds.has(comm.id) ? ' Joined Circle' : '+ Join Community Circle'}
              </button>
            </div>
          ` : ''}

          ${girlsGroups.slice(0, 1).map(grp => `
            <div style="background: #FDF2F8; border: 1px solid #FBCFE8; border-radius: var(--radius-lg); padding: 18px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <div style="font-weight: 700; color: #9D174D; font-size: 1rem;">${grp.name}</div>
                <span class="badge" style="background: #EC4899;">${grp.memberCount} members</span>
              </div>
              <p style="font-size: 0.85rem; color: #831843; margin-bottom: 10px;">${grp.tagLine}</p>
              <div style="font-size: 0.82rem; color: #9D174D; margin-bottom: 12px;">
                <strong>Meets:</strong> ${grp.meetingFrequency}
              </div>
              <button class="nav-btn group-toggle-btn" data-group-id="${grp.id}" style="width: 100%; justify-content: center; background: white; color: #BE185D; border-color: #F472B6;">
                ${STATE.joinedGroupIds.has(grp.id) ? ' Joined Sisterhood' : '+ Join Girls Group'}
              </button>
            </div>
          `).join('')}
        </div>

        <div style="margin-top: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <div style="font-weight: 700; font-size: 1rem; color: var(--text-main);">
              Real Peer Support Groups & Meetups
            </div>
            <span class="verified-badge"> Real Verified Organizations</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 14px;">
            ${meetups.map(m => `
              <div style="background: white; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 16px 18px; display: flex; flex-direction: column; gap: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px;">
                  <div>
                    <div style="font-weight: 700; color: var(--text-main); font-size: 1rem;">${m.title}</div>
                    <div style="font-size: 0.84rem; color: var(--text-muted); margin-top: 2px;">
                       ${m.dayTime} •  ${m.location} (${m.isVirtual ? 'Virtual Stream' : 'In-Person'})
                    </div>
                  </div>
                  <span class="badge" style="background: #059669;">${m.attendeeCount || 25}+ Sisters</span>
                </div>
                
                <p style="font-size: 0.88rem; color: #4B5563;">${m.description}</p>
                <div style="font-size: 0.82rem; color: var(--primary); font-weight: 600;">Vibe: ${m.vibe}</div>

                <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-top: 4px; padding-top: 10px; border-top: 1px dashed var(--border);">
                  <a href="${m.url}" target="_blank" rel="noopener noreferrer" class="external-btn">
                    Open Official Support Group ↗
                  </a>
                  <button class="nav-btn meetup-rsvp-btn" data-meetup-id="${m.id}">
                    ${STATE.rsvpedMeetupIds.has(m.id) ? ' Saved in Sanctuary' : ' Save to My Sanctuary'}
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- TIER 3: VETTED SPECIALIST & REGIONAL HELPLINES -->
      <div class="tier-card">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <div class="tier-badge t3">Tier 3: Professional Referrals & Helplines</div>
          <span class="verified-badge"> Accredited Networks (${cData.name})</span>
        </div>
        <h2 class="tier-title">Clinical Care & Regional Crisis Numbers</h2>
        <div class="tier-subtitle">When you need accredited clinical navigation or immediate crisis intervention in ${cData.name}.</div>

        ${specialist ? `
          <div style="background: #FAF5FF; border: 1px solid #E9D5FF; border-radius: var(--radius-lg); padding: 20px; margin: 16px 0;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px;">
              <div>
                <h3 style="font-size: 1.1rem; font-weight: 800; color: #581C87;">${specialist.name}</h3>
                <div style="font-size: 0.85rem; color: #6D28D9; font-weight: 600;">${specialist.title} • ${specialist.credentials}</div>
              </div>
              <span class="badge" style="background: #10B981;">Licensed Practitioners</span>
            </div>
            <div style="font-size: 0.9rem; color: #4B5563; margin: 10px 0;">
              <strong>Focus Area:</strong> ${specialist.focus}
            </div>
            <div style="font-size: 0.85rem; color: #6B7280; margin-bottom: 14px;">
               ${specialist.bookingInfo}
            </div>
            <a href="https://findahelpline.com/" target="_blank" rel="noopener noreferrer" class="external-btn" style="background: #7C3AED;">
              Find Licensed Practitioners in ${cData.name} ↗
            </a>
          </div>
        ` : ''}

        <div style="margin-top: 18px;">
          <div style="font-weight: 700; color: var(--text-main); font-size: 0.95rem; margin-bottom: 10px;">
            Verified 24/7 Helplines in ${cData.name}:
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${(cData.crisisHelplines || []).map(hl => `
              <div style="background: #F3F4F6; border-radius: var(--radius-md); padding: 14px 18px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                <div>
                  <div style="font-weight: 700; color: var(--text-main); font-size: 0.92rem;">${hl.name}</div>
                  <div style="font-size: 0.82rem; color: var(--text-muted);">${hl.hours} • ${hl.description}</div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center;">
                  ${hl.number.startsWith('Visit') ? `
                    <a href="${hl.url}" target="_blank" rel="noopener noreferrer" class="external-btn">
                      Visit Website ↗
                    </a>
                  ` : `
                    <a href="tel:${hl.number}" class="nav-btn" style="background: #1F2937; color: white; text-decoration: none;">
                      Call ${hl.number}
                    </a>
                  `}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function attachMatchListeners() {
  const res = STATE.matchResult;
  if (!res) return;

  const pkg = res.matchedPackage;
  const tool = pkg.defaultMicroTool;

  const saveBtn = document.getElementById('save-tool-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const idx = STATE.savedTools.findIndex(t => t.id === tool.id);
      if (idx >= 0) {
        STATE.savedTools.splice(idx, 1);
        saveBtn.textContent = 'Save Tool';
      } else {
        STATE.savedTools.push({ ...tool, savedAt: new Date().toISOString(), packageTitle: pkg.title });
        saveBtn.textContent = 'Saved in Sanctuary';
      }
      persistState();
    });
  }

  const copyBtn = document.getElementById('copy-script-btn');
  if (copyBtn && tool.scriptContent) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(tool.scriptContent).then(() => {
        copyBtn.innerHTML = `<span></span> Copied to Clipboard!`;
        setTimeout(() => {
          copyBtn.innerHTML = `Copy Script to Clipboard`;
        }, 2000);
      });
    });
  }

  const toggleBreathBtn = document.getElementById('toggle-breathing-btn');
  if (toggleBreathBtn) {
    toggleBreathBtn.addEventListener('click', () => {
      if (STATE.isBreathingActive) {
        stopBreathing();
        toggleBreathBtn.textContent = '▶ Resume Breath Guide';
      } else {
        startBreathing();
        toggleBreathBtn.textContent = 'Pause Breath Guide';
      }
    });
    if (!STATE.isBreathingActive && tool.type === 'BREATHING') {
      startBreathing();
    }
  }

  const requestPeerBtn = document.getElementById('request-peer-match-btn');
  if (requestPeerBtn) {
    requestPeerBtn.addEventListener('click', () => {
      openPeerRequestModal(pkg);
    });
  }

  const matchCountryBtn = document.getElementById('match-switch-country-btn');
  if (matchCountryBtn) {
    matchCountryBtn.addEventListener('click', openCountrySelectorModal);
  }

  document.querySelectorAll('.group-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const gId = btn.dataset.groupId;
      if (STATE.joinedGroupIds.has(gId)) {
        STATE.joinedGroupIds.delete(gId);
        btn.textContent = '+ Join Sisterhood';
        btn.style.background = '';
      } else {
        STATE.joinedGroupIds.add(gId);
        btn.textContent = ' Joined Sisterhood';
        btn.style.background = '#EDE9FE';
      }
      persistState();
    });
  });

  document.querySelectorAll('.meetup-rsvp-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mId = btn.dataset.meetupId;
      if (STATE.rsvpedMeetupIds.has(mId)) {
        STATE.rsvpedMeetupIds.delete(mId);
        btn.textContent = ' Save to My Sanctuary';
      } else {
        STATE.rsvpedMeetupIds.add(mId);
        btn.textContent = ' Saved in Sanctuary';
      }
      persistState();
    });
  });

  document.querySelectorAll('.switch-to-secondary-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const secId = btn.dataset.secId;
      const targetSec = findPackageById(secId);
      if (targetSec && res) {
        const oldPrimary = res.matchedPackage;
        res.matchedPackage = targetSec;
        res.secondaryPackages = [oldPrimary, ...(res.secondaryPackages || []).filter(p => p.id !== targetSec.id)];
        renderApp();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  document.querySelectorAll('.switch-focus-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pkgId = btn.dataset.pkgId;
      const target = findPackageById(pkgId);
      if (target && res) {
        const oldPrimary = res.matchedPackage;
        const currentSecondaries = res.secondaryPackages || [];
        const newSecondaries = [oldPrimary, ...currentSecondaries.filter(p => p.id !== target.id)];
        res.matchedPackage = target;
        res.secondaryPackages = newSecondaries;
        renderApp();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  document.querySelectorAll('.explore-sec-pkg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const secId = btn.dataset.secId;
      const targetSec = findPackageById(secId);
      if (targetSec) {
        openPackageDetailModal(targetSec);
      }
    });
  });

  const reportBtn = document.getElementById('open-report-btn');
  if (reportBtn) {
    reportBtn.addEventListener('click', () => openReportModal(pkg, res));
  }

  const feedbackBtn = document.getElementById('open-feedback-btn');
  if (feedbackBtn) {
    feedbackBtn.addEventListener('click', () => openFeedbackModal(pkg));
  }
}

function startBreathing() {
  stopBreathing();
  STATE.isBreathingActive = true;
  let phaseIndex = 0;
  const phases = [
    { name: 'Inhale gently through nose', duration: 4, css: 'inhale' },
    { name: 'Hold your breath softly', duration: 4, css: 'hold' },
    { name: 'Exhale smoothly through mouth', duration: 6, css: 'exhale' }
  ];

  let currentPhase = phases[0];
  let timeLeft = currentPhase.duration;

  STATE.breathingInterval = setInterval(() => {
    timeLeft--;
    const phaseEl = document.getElementById('breath-phase-text');
    const countEl = document.getElementById('breath-countdown-val');
    const circleEl = document.getElementById('breath-circle');

    if (countEl) countEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      phaseIndex = (phaseIndex + 1) % phases.length;
      currentPhase = phases[phaseIndex];
      timeLeft = currentPhase.duration;

      if (phaseEl) phaseEl.textContent = currentPhase.name;
      if (circleEl) {
        circleEl.className = `breathing-circle ${currentPhase.css}`;
      }
    }
  }, 1000);
}

function stopBreathing() {
  STATE.isBreathingActive = false;
  if (STATE.breathingInterval) {
    clearInterval(STATE.breathingInterval);
    STATE.breathingInterval = null;
  }
}

function renderPackagesScreen() {
  return `
    <div>
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 1.6rem; font-weight: 800; color: var(--text-main);">All 16 Life Transitions & Support Packages</h1>
        <p style="color: var(--text-muted); font-size: 0.95rem;">Curated micro-tools, verified sister circles, and regional advice centers for every chapter of womanhood.</p>
      </div>

      <div class="packages-grid">
        ${SUPPORT_PACKAGES.slice().sort((a, b) => a.title.localeCompare(b.title)).map(pkg => `
          <div class="package-card" data-pkg-id="${pkg.id}">
            <div class="package-header">
              <img src="${getPackageImageUrl(pkg)}" alt="${pkg.title}" class="package-img">
              <div class="package-title">${pkg.title}</div>
            </div>
            <div class="package-covers">${pkg.covers}</div>
            <div style="font-size: 0.8rem; color: #4B5563; margin-bottom: 10px; font-style: italic;">
              "${pkg.exampleInput}"
            </div>
            <div class="package-footer">
              <span>Explore Package</span>
              <span>→</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function attachPackagesListeners() {
  document.querySelectorAll('.package-card').forEach(card => {
    card.addEventListener('click', () => {
      const pkg = findPackageById(card.dataset.pkgId);
      openPackageDetail(pkg);
    });
  });
}

function renderMentorsScreen() {
  const query = (STATE.mentorSearchQuery || '').toLowerCase();
  const cData = COUNTRIES[STATE.country] || COUNTRIES['US'];

  const filtered = SUPPORT_PACKAGES.filter(pkg => {
    if (!query) return true;
    const titleMatch = pkg.title.toLowerCase().includes(query);
    const coversMatch = pkg.covers.toLowerCase().includes(query);
    const netName = (pkg.peerNetwork && pkg.peerNetwork.networkName.toLowerCase().includes(query)) || false;
    return titleMatch || coversMatch || netName;
  });

  return `
    <div>
      <div style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <h1 style="font-size: 1.6rem; font-weight: 800; color: var(--text-main);">Peer Sisterhood Networks</h1>
          <span class="verified-badge"> Real Vetted Networks • Zero Fake Profiles</span>
        </div>
        <p style="color: var(--text-muted); font-size: 0.95rem;">Verified peer sisterhood cohorts mapped across all 16 life transitions. Connect with real women through authentic community circles.</p>
      </div>

      <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: var(--radius-md); padding: 12px 16px; margin-bottom: 20px; font-size: 0.84rem; color: #166534;">
        <strong>Private & Safe:</strong> All peer circles and meetups are hosted by vetted, accredited non-profits. We do not track your IP address or physical location.
      </div>

      <div style="margin-bottom: 20px;">
        <input type="text" id="mentor-search-input" class="feeling-textarea" style="min-height: 48px; height: 48px; padding: 10px 16px; font-size: 0.95rem;" placeholder=" Search peer networks by transition (e.g. postpartum, AI fear, divorce, caregiving, moving)..." value="${STATE.mentorSearchQuery}">
      </div>

      <div class="mentors-grid">
        ${filtered.map(pkg => {
          const peerNet = pkg.peerNetwork || {
            networkName: `${pkg.title} Peer Sisterhood Circle`,
            facilitatorType: "Certified Community Facilitator",
            description: `A peer network for women navigating ${pkg.title.toLowerCase()}.`
          };
          const meetups = getMeetupsForPackage(pkg);
          const topMeetup = meetups[0];
          const hasRequested = STATE.peerMatchRequests.some(r => r.packageId === pkg.id);

          return `
            <div style="background: white; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 20px; display: flex; flex-direction: column; justify-content: space-between; gap: 14px;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="${getPackageImageUrl(pkg)}" alt="${pkg.title}" class="mentor-package-img">
                    <div>
                      <div style="font-weight: 800; color: var(--text-main); font-size: 1.05rem;">${peerNet.networkName}</div>
                      <div style="font-size: 0.8rem; color: var(--primary); font-weight: 700;">${pkg.title}</div>
                    </div>
                  </div>
                  <span class="verified-badge"> Real Program</span>
                </div>

                <div style="margin-top: 10px; font-size: 0.88rem; color: #4B5563; line-height: 1.4;">
                  ${peerNet.description}
                </div>

                <div style="margin-top: 10px; font-size: 0.82rem; color: #6B7280; background: #F9FAFB; padding: 8px 12px; border-radius: 6px;">
                  <strong>Coordinators:</strong> ${peerNet.facilitatorType}
                </div>

                ${topMeetup ? `
                  <div style="margin-top: 8px; font-size: 0.82rem; color: #065F46; background: #ECFDF5; padding: 8px 12px; border-radius: 6px;">
                    <strong>Active Group:</strong> ${topMeetup.title} (${topMeetup.dayTime})
                  </div>
                ` : ''}
              </div>

              <div style="display: flex; gap: 8px; flex-direction: column;">
                <button class="match-btn request-peer-from-card-btn" data-pkg-id="${pkg.id}" style="padding: 9px 14px; font-size: 0.85rem; width: 100%; justify-content: center;">
                  ${hasRequested ? ' Matching Request Saved' : 'Request 1-on-1 Sister Match'}
                </button>
                <div style="display: flex; gap: 8px;">
                  <button class="nav-btn view-pkg-from-mentor-btn" data-pkg-id="${pkg.id}" style="flex: 1; justify-content: center; font-size: 0.82rem;">
                    View Package
                  </button>
                  ${topMeetup ? `
                    <a href="${topMeetup.url}" target="_blank" rel="noopener noreferrer" class="external-btn" style="flex: 1; justify-content: center; font-size: 0.82rem; padding: 6px 10px;">
                      Support Group ↗
                    </a>
                  ` : ''}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function attachMentorsListeners() {
  const searchInput = document.getElementById('mentor-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      STATE.mentorSearchQuery = e.target.value;
      renderApp();
      const el = document.getElementById('mentor-search-input');
      if (el) {
        el.focus();
        el.setSelectionRange(el.value.length, el.value.length);
      }
    });
  }

  document.querySelectorAll('.request-peer-from-card-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pkg = findPackageById(btn.dataset.pkgId);
      openPeerRequestModal(pkg);
    });
  });

  document.querySelectorAll('.view-pkg-from-mentor-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pkg = findPackageById(btn.dataset.pkgId);
      openPackageDetail(pkg);
    });
  });
}

let leafletMapInstance = null;
let leafletMarkersMap = new Map();

function getFilteredMapPlaces() {
  const query = (STATE.mapSearchQuery || '').trim().toLowerCase();

  // 1. Filter by Country
  const countryFiltered = (!STATE.mapCountry || STATE.mapCountry === 'ALL')
    ? ADVICE_PLACES
    : ADVICE_PLACES.filter(p => p.country === STATE.mapCountry);

  // 2. Filter by State / Province
  const stateFiltered = (!STATE.mapState || STATE.mapState === 'ALL')
    ? countryFiltered
    : countryFiltered.filter(p => 
        (p.state || '').toLowerCase() === STATE.mapState.toLowerCase() ||
        (p.stateCode || '').toLowerCase() === STATE.mapState.toLowerCase()
      );

  // 3. Filter by City
  const cityFiltered = (!STATE.mapCity || STATE.mapCity === 'ALL')
    ? stateFiltered
    : stateFiltered.filter(p =>
        (p.cityName || p.city || '').toLowerCase() === STATE.mapCity.toLowerCase() ||
        (p.city || '').toLowerCase().includes(STATE.mapCity.toLowerCase())
      );

  // 4. Filter by Category
  const catFiltered = (!STATE.mapCategory || STATE.mapCategory === 'ALL')
    ? cityFiltered
    : cityFiltered.filter(p => p.category === STATE.mapCategory);

  if (!query) return catFiltered;

  return catFiltered.filter(p => {
    const text = `${p.name} ${p.city || ''} ${p.state || ''} ${p.cityName || ''} ${p.address || ''} ${p.adviceType || ''} ${(p.keyAdviceOffered || []).join(' ')}`.toLowerCase();
    return text.includes(query);
  });
}

function renderPlaceDetailCard(place) {
  if (!place) {
    return `
      <div class="map-selected-card" style="border-color: #E2E8F0; text-align: center; padding: 24px 14px;">
        <div style="font-size: 2rem; margin-bottom: 6px;">🕊️</div>
        <div style="font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">
          No direct sanctuaries match this filter
        </div>
        <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px; line-height: 1.4;">
          Try adjusting your search keywords, region, or category filter.
        </div>
        <button class="map-btn-secondary" id="reset-map-filter-btn" style="align-self: center; font-size: 0.78rem; cursor: pointer;">
          Reset All Filters
        </button>
      </div>
    `;
  }

  const cat = ADVICE_CATEGORIES[place.category] || ADVICE_CATEGORIES.COMMUNITY_SANCTUARY;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ', ' + place.address)}`;

  return `
    <div class="map-selected-card" style="border-color: ${cat.color};">
      <div class="map-selected-header">
        <div>
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px; flex-wrap: wrap;">
            <span style="background: ${cat.color}22; color: ${cat.color}; padding: 2px 8px; border-radius: 999px; font-size: 0.72rem; font-weight: 800; display: inline-flex; align-items: center; gap: 4px;">
              <span>${cat.icon}</span> ${cat.label}
            </span>
            <span class="verified-badge" style="font-size: 0.7rem; padding: 2px 6px;">Verified Sanctuary</span>
            <span style="font-size: 0.75rem; font-weight: 700; color: #64748B;">${place.city || place.countryName || place.country}</span>
          </div>
          <div class="map-selected-title">${place.name}</div>
        </div>
      </div>

      <div class="map-selected-address">
        <span>📍</span>
        <span>${place.address}</span>
      </div>

      <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: var(--radius-sm); padding: 8px 10px; font-size: 0.78rem; display: flex; flex-direction: column; gap: 3px;">
        <div><strong style="color: #334155;">Advice & Care:</strong> ${place.adviceType}</div>
        <div><strong style="color: #334155;">Hours:</strong> ${place.hours}</div>
        <div><strong style="color: #059669;">Intake:</strong> 100% Free / Sliding Scale</div>
      </div>

      ${place.keyAdviceOffered && place.keyAdviceOffered.length ? `
        <div style="font-size: 0.76rem; color: #4B5563; line-height: 1.35;">
          <div style="font-weight: 700; color: #1E293B; margin-bottom: 2px;">Key Services:</div>
          <div style="display: flex; flex-direction: column; gap: 2px;">
            ${place.keyAdviceOffered.slice(0, 3).map(k => `
              <div style="display: flex; gap: 5px; align-items: baseline;">
                <span style="color: ${cat.color}; font-weight: bold;">•</span>
                <span>${k}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="map-action-btns">
        <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="map-btn-primary" title="Open GPS directions in Google Maps">
          Directions ↗
        </a>
        <a href="tel:${place.phone}" class="map-btn-secondary" title="Call directly">
          📞 Call
        </a>
        ${place.website ? `
          <a href="${place.website}" target="_blank" rel="noopener noreferrer" class="map-btn-web" title="Visit official verified website">
            Website ↗
          </a>
        ` : ''}
      </div>
    </div>
  `;
}

function selectPlaceOnMap(pId, shouldFlyTo = true) {
  STATE.selectedPlaceId = pId;
  const targetP = ADVICE_PLACES.find(p => p.id === pId);
  if (!targetP) return;

  // 1. Update Detail Container
  const detailContainer = document.getElementById('selected-sanctuary-detail');
  if (detailContainer) {
    detailContainer.innerHTML = renderPlaceDetailCard(targetP);
  }

  // 2. Update Place Cards in List
  document.querySelectorAll('.map-place-card').forEach(card => {
    const isMatch = card.dataset.placeId === pId;
    card.classList.toggle('active', isMatch);
    const footerStatus = card.querySelector('.map-card-footer span:first-child');
    if (footerStatus) {
      footerStatus.textContent = isMatch ? '● Active on Map' : 'Tap to focus';
      footerStatus.style.color = isMatch ? 'var(--primary)' : '#6B7280';
    }
    if (isMatch) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  // 3. Highlight Marker & Open Popup
  leafletMarkersMap.forEach((marker, id) => {
    const isMatch = id === pId;
    const el = marker.getElement();
    if (el) {
      const pin = el.querySelector('.custom-marker-pin');
      if (pin) pin.classList.toggle('active', isMatch);
    }
    if (isMatch) {
      marker.openPopup();
    }
  });

  // 4. Smooth Pan
  if (shouldFlyTo && leafletMapInstance && targetP.lat && targetP.lng) {
    leafletMapInstance.flyTo([targetP.lat, targetP.lng], 14, { duration: 0.6 });
  }
}

function initLeafletMap(filteredPlaces, currentPlace) {
  const mapEl = document.getElementById('leaflet-map');
  const fallbackEl = document.getElementById('fallback-canvas');
  if (!mapEl) return;

  if (typeof window.L === 'undefined') {
    if (fallbackEl) fallbackEl.style.display = 'block';
    return;
  }

  if (leafletMapInstance) {
    try {
      leafletMapInstance.remove();
    } catch (e) {
      console.warn("Leaflet cleanup notice:", e);
    }
    leafletMapInstance = null;
    leafletMarkersMap.clear();
  }

  const cData = COUNTRIES[STATE.mapCountry] || COUNTRIES['GLOBAL'] || COUNTRIES['US'];
  let initCenter = [37.7616, -122.4217];
  let initZoom = 4;

  if (currentPlace && currentPlace.lat && currentPlace.lng) {
    initCenter = [currentPlace.lat, currentPlace.lng];
    initZoom = 13;
  } else if (cData && cData.mapCenter) {
    initCenter = cData.mapCenter;
    initZoom = cData.mapZoom || 4;
  }

  try {
    leafletMapInstance = window.L.map('leaflet-map', {
      center: initCenter,
      zoom: initZoom,
      scrollWheelZoom: true,
      attributionControl: false
    });

    // Note: Background OpenStreetMap tileLayer is removed to eliminate 403 Forbidden ("Access blocked")
    // and protect women's privacy with zero third-party tile telemetry.

    filteredPlaces.forEach(p => {
      if (!p.lat || !p.lng) return;
      const pCat = ADVICE_CATEGORIES[p.category] || ADVICE_CATEGORIES.COMMUNITY_SANCTUARY;
      const isSelected = currentPlace && p.id === currentPlace.id;

      const markerHtml = `
        <div class="custom-marker-pin ${isSelected ? 'active' : ''}" style="background: ${pCat.color};" title="${p.name}">
          <span class="pin-icon">${pCat.icon}</span>
        </div>
      `;

      const customIcon = window.L.divIcon({
        className: 'custom-leaflet-marker',
        html: markerHtml,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -34]
      });

      const marker = window.L.marker([p.lat, p.lng], { icon: customIcon }).addTo(leafletMapInstance);
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + ', ' + p.address)}`;

      marker.bindPopup(`
        <div style="font-family: inherit; min-width: 210px;">
          <div style="font-size: 0.72rem; font-weight: 800; color: ${pCat.color}; text-transform: uppercase; margin-bottom: 2px;">
            ${pCat.icon} ${pCat.label}
          </div>
          <div style="font-size: 0.95rem; font-weight: 800; color: #1E293B; margin-bottom: 4px;">
            ${p.name}
          </div>
          <div style="font-size: 0.8rem; color: #64748B; margin-bottom: 6px;">
            ${p.address}
          </div>
          <div style="font-size: 0.78rem; color: #334155; margin-bottom: 8px;">
            ${p.hours} • <strong style="color: #059669;">Free Intake</strong>
          </div>
          <div style="display: flex; gap: 6px;">
            <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 0.75rem; background: #7C3AED; color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-weight: bold;">
              Directions ↗
            </a>
            <a href="tel:${p.phone}" style="font-size: 0.75rem; background: #F1F5F9; color: #334155; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-weight: bold;">
              Call
            </a>
          </div>
        </div>
      `);

      marker.on('click', () => {
        selectPlaceOnMap(p.id, false);
      });

      leafletMarkersMap.set(p.id, marker);

      if (isSelected) {
        marker.openPopup();
      }
    });

    if (filteredPlaces.length > 1) {
      const bounds = window.L.latLngBounds(filteredPlaces.map(p => [p.lat, p.lng]));
      leafletMapInstance.fitBounds(bounds, { padding: [35, 35], maxZoom: 13 });
    } else if (filteredPlaces.length === 1) {
      leafletMapInstance.setView([filteredPlaces[0].lat, filteredPlaces[0].lng], 13);
    }

    setTimeout(() => {
      if (leafletMapInstance) leafletMapInstance.invalidateSize();
    }, 150);

  } catch (err) {
    console.warn("Leaflet map init notice:", err);
    if (fallbackEl) fallbackEl.style.display = 'block';
  }
}

function renderMapBreadcrumbsHtml() {
  const isFiltered = (STATE.mapCountry !== 'ALL' || STATE.mapState !== 'ALL' || STATE.mapCity !== 'ALL');
  if (!isFiltered) return '';

  const countryObj = COUNTRIES[STATE.mapCountry];
  return `
    <div class="map-location-breadcrumbs">
      <span class="map-breadcrumb-label"><span>📍</span> Filter Hierarchy:</span>
      ${STATE.mapCountry !== 'ALL' ? `
        <span class="map-breadcrumb-tag">
          ${COUNTRY_FLAGS[STATE.mapCountry] || countryObj?.flag || '🌍'} ${countryObj?.name || STATE.mapCountry}
          <button class="map-breadcrumb-remove" data-level="country" title="Remove country filter">×</button>
        </span>
      ` : ''}
      ${STATE.mapState !== 'ALL' ? `
        <span class="map-breadcrumb-separator">›</span>
        <span class="map-breadcrumb-tag">
          🏛️ ${STATE.mapState}
          <button class="map-breadcrumb-remove" data-level="state" title="Remove state filter">×</button>
        </span>
      ` : ''}
      ${STATE.mapCity !== 'ALL' ? `
        <span class="map-breadcrumb-separator">›</span>
        <span class="map-breadcrumb-tag">
          📍 ${STATE.mapCity}
          <button class="map-breadcrumb-remove" data-level="city" title="Remove city filter">×</button>
        </span>
      ` : ''}
      <button id="map-clear-locations-btn" class="map-clear-locations-btn" title="Reset all location filters">Clear All Locations</button>
    </div>
  `;
}

function attachBreadcrumbListeners() {
  document.querySelectorAll('.map-breadcrumb-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const level = btn.dataset.level;
      if (level === 'country') {
        STATE.mapCountry = 'ALL';
        STATE.mapState = 'ALL';
        STATE.mapCity = 'ALL';
      } else if (level === 'state') {
        STATE.mapState = 'ALL';
        STATE.mapCity = 'ALL';
      } else if (level === 'city') {
        STATE.mapCity = 'ALL';
      }
      STATE.selectedPlaceId = null;
      persistState();
      updateMapFilters();
    });
  });

  const clearBtn = document.getElementById('map-clear-locations-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      STATE.mapCountry = 'ALL';
      STATE.mapState = 'ALL';
      STATE.mapCity = 'ALL';
      STATE.selectedPlaceId = null;
      persistState();
      updateMapFilters();
    });
  }
}

function updateMapFilters() {
  const filteredPlaces = getFilteredMapPlaces();

  // 1. Update Country dropdown
  const countrySelect = document.getElementById('map-country-select');
  if (countrySelect && countrySelect.value !== STATE.mapCountry) {
    countrySelect.value = STATE.mapCountry;
  }

  // 1b. Update State dropdown options based on selected country
  const stateSelect = document.getElementById('map-state-select');
  if (stateSelect) {
    const states = getStatesForCountry(STATE.mapCountry);
    const totalStatePlaces = states.reduce((sum, s) => sum + s.count, 0);
    const currentSelected = STATE.mapState;
    stateSelect.innerHTML = `
      <option value="ALL" ${currentSelected === 'ALL' ? 'selected' : ''}>🏛️ All States / Regions (${totalStatePlaces})</option>
      ${states.map(s => `
        <option value="${s.name}" ${currentSelected === s.name ? 'selected' : ''}>
          ${s.name}${s.count > 0 ? ` (${s.count})` : ''}
        </option>
      `).join('')}
    `;
    if (currentSelected !== 'ALL' && !states.some(s => s.name === currentSelected)) {
      STATE.mapState = 'ALL';
      stateSelect.value = 'ALL';
    } else {
      stateSelect.value = STATE.mapState;
    }
  }

  // 1c. Update City dropdown options based on selected country + state
  const citySelect = document.getElementById('map-city-select');
  if (citySelect) {
    const cities = getCitiesForCountryAndState(STATE.mapCountry, STATE.mapState);
    const totalCityPlaces = cities.reduce((sum, c) => sum + c.count, 0);
    const currentCity = STATE.mapCity;
    citySelect.innerHTML = `
      <option value="ALL" ${currentCity === 'ALL' ? 'selected' : ''}>📍 All Cities (${totalCityPlaces})</option>
      ${cities.map(c => `
        <option value="${c.name}" ${currentCity === c.name ? 'selected' : ''}>
          ${c.name}${c.count > 0 ? ` (${c.count})` : ''}
        </option>
      `).join('')}
    `;
    if (currentCity !== 'ALL' && !cities.some(c => c.name === currentCity)) {
      STATE.mapCity = 'ALL';
      citySelect.value = 'ALL';
    } else {
      citySelect.value = STATE.mapCity;
    }
  }

  // 1d. Update Breadcrumbs Bar
  const breadcrumbsContainer = document.getElementById('map-breadcrumbs-container');
  if (breadcrumbsContainer) {
    breadcrumbsContainer.innerHTML = renderMapBreadcrumbsHtml();
    attachBreadcrumbListeners();
  }

  // 2. Update Category chips
  document.querySelectorAll('.map-cat-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.cat === STATE.mapCategory);
  });

  // 3. Update category counts in chips reflecting the current hierarchical location
  const locationScopedPlaces = ADVICE_PLACES.filter(p => {
    const matchCountry = (!STATE.mapCountry || STATE.mapCountry === 'ALL') || p.country === STATE.mapCountry;
    const matchState = (!STATE.mapState || STATE.mapState === 'ALL') || 
      (p.state || '').toLowerCase() === STATE.mapState.toLowerCase() || 
      (p.stateCode || '').toLowerCase() === STATE.mapState.toLowerCase();
    const matchCity = (!STATE.mapCity || STATE.mapCity === 'ALL') || 
      (p.cityName || p.city || '').toLowerCase() === STATE.mapCity.toLowerCase() ||
      (p.city || '').toLowerCase().includes(STATE.mapCity.toLowerCase());
    return matchCountry && matchState && matchCity;
  });

  const allChip = document.querySelector('.map-cat-chip[data-cat="ALL"]');
  if (allChip) {
    allChip.textContent = `All (${locationScopedPlaces.length})`;
  }

  Object.values(ADVICE_CATEGORIES).forEach(c => {
    const chip = document.querySelector(`.map-cat-chip[data-cat="${c.key}"]`);
    if (chip) {
      const count = locationScopedPlaces.filter(p => p.category === c.key).length;
      chip.innerHTML = `<span>${c.icon}</span> ${c.label} (${count})`;
    }
  });

  // 4. Update Leaflet Markers
  if (leafletMapInstance && window.L) {
    leafletMarkersMap.forEach(m => leafletMapInstance.removeLayer(m));
    leafletMarkersMap.clear();

    filteredPlaces.forEach(p => {
      if (!p.lat || !p.lng) return;
      const pCat = ADVICE_CATEGORIES[p.category] || ADVICE_CATEGORIES.COMMUNITY_SANCTUARY;
      const isSelected = p.id === STATE.selectedPlaceId;

      const markerHtml = `
        <div class="custom-marker-pin ${isSelected ? 'active' : ''}" style="background: ${pCat.color};" title="${p.name}">
          <span class="pin-icon">${pCat.icon}</span>
        </div>
      `;

      const customIcon = window.L.divIcon({
        className: 'custom-leaflet-marker',
        html: markerHtml,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -34]
      });

      const marker = window.L.marker([p.lat, p.lng], { icon: customIcon }).addTo(leafletMapInstance);
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + ', ' + p.address)}`;

      marker.bindPopup(`
        <div style="font-family: inherit; min-width: 210px;">
          <div style="font-size: 0.72rem; font-weight: 800; color: ${pCat.color}; text-transform: uppercase; margin-bottom: 2px;">
            ${pCat.icon} ${pCat.label}
          </div>
          <div style="font-size: 0.95rem; font-weight: 800; color: #1E293B; margin-bottom: 4px;">
            ${p.name}
          </div>
          <div style="font-size: 0.8rem; color: #64748B; margin-bottom: 6px;">
            ${p.address}
          </div>
          <div style="font-size: 0.78rem; color: #334155; margin-bottom: 8px;">
            ${p.hours} • <strong style="color: #059669;">Free Intake</strong>
          </div>
          <div style="display: flex; gap: 6px;">
            <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 0.75rem; background: #7C3AED; color: white; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-weight: bold;">
              Directions ↗
            </a>
            <a href="tel:${p.phone}" style="font-size: 0.75rem; background: #F1F5F9; color: #334155; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-weight: bold;">
              Call
            </a>
          </div>
        </div>
      `);

      marker.on('click', () => {
        selectPlaceOnMap(p.id, false);
      });

      leafletMarkersMap.set(p.id, marker);
    });

    if (filteredPlaces.length > 1) {
      const bounds = window.L.latLngBounds(filteredPlaces.map(p => [p.lat, p.lng]));
      leafletMapInstance.fitBounds(bounds, { padding: [35, 35], maxZoom: 13 });
    } else if (filteredPlaces.length === 1) {
      leafletMapInstance.setView([filteredPlaces[0].lat, filteredPlaces[0].lng], 13);
    }
  }

  // 5. Select Place
  const activePlace = filteredPlaces.find(p => p.id === STATE.selectedPlaceId) || filteredPlaces[0] || null;
  STATE.selectedPlaceId = activePlace ? activePlace.id : null;

  // 6. Update Detail Container
  const detailContainer = document.getElementById('selected-sanctuary-detail');
  if (detailContainer) {
    detailContainer.innerHTML = renderPlaceDetailCard(activePlace);
    const resetBtn = document.getElementById('reset-map-filter-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        STATE.mapCategory = 'ALL';
        STATE.mapSearchQuery = '';
        const searchInput = document.getElementById('map-search-input');
        if (searchInput) searchInput.value = '';
        updateMapFilters();
      });
    }
  }

  // 7. Update Places List
  const listContainer = document.getElementById('places-grid-container');
  const countEl = document.getElementById('map-count-indicator');
  if (countEl) {
    countEl.textContent = `${filteredPlaces.length} verified sanctuaries`;
  }

  if (listContainer) {
    if (filteredPlaces.length === 0) {
      listContainer.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-muted); background: white; border-radius: var(--radius-md); border: 1.5px dashed var(--border); font-size: 0.85rem;">
          No verified centers match your filter. Try searching a different city or resetting filters.
        </div>
      `;
    } else {
      listContainer.innerHTML = filteredPlaces.map(p => {
        const pCat = ADVICE_CATEGORIES[p.category] || ADVICE_CATEGORIES.COMMUNITY_SANCTUARY;
        const isSelected = activePlace && p.id === activePlace.id;
        return `
          <div class="map-place-card ${isSelected ? 'active' : ''}" data-place-id="${p.id}">
            <div class="map-card-top">
              <div>
                <div class="map-card-name">${p.name}</div>
                <div class="map-card-sub">📍 ${p.city || p.countryName || p.country}</div>
              </div>
              <span style="font-size: 1.15rem;">${pCat.icon}</span>
            </div>
            <div class="map-card-advice">${p.adviceType}</div>
            <div class="map-card-footer">
              <span style="font-weight: 700; color: ${isSelected ? 'var(--primary)' : '#6B7280'};">
                ${isSelected ? '● Active on Map' : 'Tap to focus'}
              </span>
              <span style="color: #6B7280; font-weight: 600;">${p.phone}</span>
            </div>
          </div>
        `;
      }).join('');

      listContainer.querySelectorAll('.map-place-card').forEach(card => {
        card.addEventListener('click', () => {
          selectPlaceOnMap(card.dataset.placeId, true);
        });
      });
    }
  }

  if (activePlace && leafletMarkersMap.has(activePlace.id)) {
    leafletMarkersMap.get(activePlace.id).openPopup();
  }
}

const ADVICE_NODES = [
  {
    id: 'immediate-safety-exit',
    title: 'Discreet Exit & Physical Safety Protocol',
    domain: 'safety',
    domainLabel: 'Safety & Protection',
    badge: 'Urgent Safety',
    icon: '🛡️',
    summary: 'Tactical guidance for preparing a secure departure without tipping off an escalating or abusive partner.',
    xPercent: 26,
    yPercent: 26,
    coreAnchor: 'Your physical safety precedes all relational obligations or emotional processing.',
    immediateStep: 'Keep car keys and essential documents (ID, passport, cash) stored together inside a discreet everyday container.',
    script: '"I am stepping out to pick up groceries and baby supplies. I will have my phone on silent to keep the baby calm."',
    warningSigns: [
      'Partner monitoring phone battery percentage or mileage tracker',
      'Escalating threats involving household pets or belongings',
      'Sudden confiscation of car keys, wallets, or identification'
    ],
    lifeline: 'National Domestic Violence Hotline: 1-800-799-SAFE (Text START to 88788)',
    relatedPackageId: 'divorce_separation'
  },
  {
    id: 'somatic-downregulation-freeze',
    title: 'Nervous System & Somatic Down-Regulation',
    domain: 'somatic',
    domainLabel: 'Somatic Grounding',
    badge: 'Panic & Freeze',
    icon: '🌿',
    summary: 'Polyvagal grounding practices to break freeze response and restore blood flow to executive processing brain centers.',
    xPercent: 50,
    yPercent: 18,
    coreAnchor: 'You cannot think your way out of a survival state your body is feeling. Physiology must be soothed first.',
    immediateStep: 'Run cold water over wrists or press a cold drink can to cheek, then take a double inhale through nose followed by slow 6-second sigh.',
    script: '"My body is misinterpreting stress as physical danger. Right now, in this second, I am in a chair and I am safe."',
    warningSigns: [
      'Heart pounding over 110 BPM while seated',
      'Feeling detached from hands or surroundings (dissociation)',
      'Compulsive phone checking or looping doom-scrolling'
    ],
    lifeline: 'Crisis Text Line: Text HOME to 741741 (Free 24/7)',
    relatedPackageId: 'emotional_struggles'
  },
  {
    id: 'gray-rock-counter-narcissism',
    title: 'Gray Rocking & Toxic Relatives Defense',
    domain: 'relationships',
    domainLabel: 'Relationships & Boundaries',
    badge: 'Boundary Mastery',
    icon: '🪨',
    summary: 'Neutralize emotional baiting, guilt-trips, and high-conflict family members by becoming as uninteresting as a plain gray rock.',
    xPercent: 74,
    yPercent: 26,
    coreAnchor: 'Emotional vampires crave your emotional reactivity. Monotone neutrality starves the drama cycle.',
    immediateStep: 'Keep vocal pitch completely flat. Refuse to defend, justify, or explain (JADE principle).',
    script: '"I hear your perspective. I have made my decision, and it is not open for debate."',
    warningSigns: [
      'Bringing up past mistakes to distract from current boundary violations',
      'Weaponizing tears or shouting to force an immediate concession',
      'Triangulating other family members to pressure you'
    ],
    lifeline: 'Sisterhood Peer Mentors • Free 1-on-1 Confidential Sanctuary',
    relatedPackageId: 'healthy_anger'
  },
  {
    id: 'postpartum-fourth-trimester',
    title: 'Postpartum Depletion & Maternal Identity',
    domain: 'maternal',
    domainLabel: 'Maternal Sanctuary',
    badge: 'Maternal Care',
    icon: '🤱',
    summary: 'Navigating baby blues, sleep deprivation psychosis risk, intrusive thoughts, and unlearning the "Supermom" myth.',
    xPercent: 23,
    yPercent: 48,
    coreAnchor: 'Intrusive thoughts are a symptom of an exhausted maternal brain, not a reflection of your moral fitness as a mother.',
    immediateStep: 'Hand baby to any safe adult or put baby safely in crib for 10 minutes while you take a warm shower alone with earplugs.',
    script: '"I love our baby, but my mental health requires 4 uninterrupted hours of sleep tonight. We need a shift system starting today."',
    warningSigns: [
      'Inability to sleep even when baby is deeply sleeping',
      'Constant dread that something catastrophic will happen to baby',
      'Feeling numb or resentful toward partner and infant'
    ],
    lifeline: 'Postpartum Support International: 1-800-944-4773 (Call/Text)',
    relatedPackageId: 'pregnancy_postpartum'
  },
  {
    id: 'career-burnout-boundaries',
    title: 'Corporate Burnout & Quiet Quitting Sanctuary',
    domain: 'career',
    domainLabel: 'Career & Purpose',
    badge: 'Work Sovereignty',
    icon: '💼',
    summary: 'Detaching self-worth from productivity metrics, establishing rigid 5 PM communication cutoffs, and preparing an exit.',
    xPercent: 77,
    yPercent: 48,
    coreAnchor: 'Companies will replace you within two weeks if you work yourself into a hospital bed. Treat your job as a business contract, not a family.',
    immediateStep: 'Remove Slack and work email from personal phone immediately. Set status to "Away / Focus Block".',
    script: '"Thank you for reaching out. I have reached capacity on my prioritized deliverables for today and will review this tomorrow at 9 AM."',
    warningSigns: [
      'Crying on Sunday evenings in anticipation of Monday morning',
      'Feeling cynical, numb, and physically fatigued every morning',
      'Taking on extra unpaid emotional labor and organizing in the office'
    ],
    lifeline: 'Women in Tech & Leadership Allies Network',
    relatedPackageId: 'career_pivot'
  },
  {
    id: 'financial-sovereignty',
    title: 'Financial Sovereignty & Secret Savings Enclave',
    domain: 'financial',
    domainLabel: 'Financial Independence',
    badge: 'Financial Autonomy',
    icon: '🗝️',
    summary: 'Discreetly building an emergency cash runway and establishing separate banking away from controlling household partners.',
    xPercent: 74,
    yPercent: 74,
    coreAnchor: 'Economic autonomy is the foundational prerequisite for physical and emotional freedom.',
    immediateStep: 'Open a paperless savings account at a completely different financial institution than joint bank, opting for e-statements only.',
    script: '"I am setting up an individual emergency reserve as part of standard financial health best practices."',
    warningSigns: [
      'Partner demanding to see receipts for everyday grocery runs',
      'Hidden debts taken out under your name without explicit consent',
      'Having zero access to tax filings or household account passwords'
    ],
    lifeline: 'Free Credit Report Check: AnnualCreditReport.com (Check for unauthorized accounts)',
    relatedPackageId: 'financial_difficulties'
  },
  {
    id: 'custody-evidence-log',
    title: 'Custody Rights & Safe Evidentiary Journaling',
    domain: 'legal',
    domainLabel: 'Legal & Custody',
    badge: 'Family Defense',
    icon: '⚖️',
    summary: 'Creating court-admissible, tamper-evident communication logs to protect custody and parental rights.',
    xPercent: 26,
    yPercent: 74,
    coreAnchor: 'Courts do not care about who felt hurt; judges care about documentation, dates, times, and impact on children.',
    immediateStep: 'Log incident notes in the offline SuperShakti Vault with neutral, factual descriptions: "On [Date] at [Time], [Person] arrived 45 mins late."',
    script: '"Per our court-approved schedule, pick-up is at 4:00 PM at the neutral school entrance. I will see you there."',
    warningSigns: [
      'Threats to "take the kids away" or tell child protective services false stories',
      'Unilateral cancellations of scheduled visitation without notice',
      'Subtle alienation attempts turning children against you'
    ],
    lifeline: 'Legal Services Corporation: lsc.gov/find-legal-aid',
    relatedPackageId: 'divorce_separation'
  },
  {
    id: 'grief-pacing-anchor',
    title: 'Grief Pacing & Sudden Shock Containment',
    domain: 'grief',
    domainLabel: 'Grief & Loss',
    badge: 'Grief & Renewal',
    icon: '🕊️',
    summary: 'Allowing the tidal waves of grief without letting them wash away your baseline physical survival needs.',
    xPercent: 50,
    yPercent: 50,
    coreAnchor: 'Grief is love with nowhere to go. It does not obey a 5-step linear timeline; it comes in unpredictable waves.',
    immediateStep: 'Eat one spoonful of protein and drink one full glass of water. Give yourself permission to do nothing else for 12 hours.',
    script: '"Thank you for checking in. I cannot talk on the phone today, but knowing you are thinking of me brings warmth."',
    warningSigns: [
      'Skipping meals for multiple consecutive days',
      'Total isolation and ignoring all outreach from safe friends',
      'Guilt over experiencing brief moments of relief or laughter'
    ],
    lifeline: '988 Crisis & Support Lifeline • Free 24/7 Call/Text',
    relatedPackageId: 'loss_grief'
  }
];

function renderMapScreen() {
  const filteredPlaces = getFilteredMapPlaces();
  const currentPlace = filteredPlaces.find(p => p.id === STATE.selectedPlaceId) || filteredPlaces[0] || null;
  const currentAdviceNode = ADVICE_NODES.find(n => n.id === STATE.selectedAdviceNodeId) || ADVICE_NODES[0];
  const availableStates = getStatesForCountry(STATE.mapCountry);
  const availableCities = getCitiesForCountryAndState(STATE.mapCountry, STATE.mapState);

  return `
    <div class="map-screen-wrapper">
      <!-- Top Title & Privacy Bar -->
      <div class="map-top-bar">
        <div class="map-header-title-box">
          <h1>
            <span>Community Advice & Sanctuary Map</span>
            <span class="verified-badge">${STATE.mapViewMode === 'radar' ? '8 Life Domains' : 'Physical Sanctuaries'}</span>
          </h1>
          <p>Confidential guidance and physical refuge for legal rights, career navigation, mental health, and sisterhood sovereignty.</p>
          
          <div class="advice-map-mode-tabs">
            <button class="advice-map-mode-tab ${STATE.mapViewMode === 'radar' ? 'active' : ''}" data-mode="radar">
              <span>🌌</span> Advice Constellations (8 Domains)
            </button>
            <button class="advice-map-mode-tab ${STATE.mapViewMode === 'places' ? 'active' : ''}" data-mode="places">
              <span>📍</span> Physical Sanctuaries (${ADVICE_PLACES.length})
            </button>
          </div>
        </div>
        <div class="map-privacy-pill">
          <span>🛡️</span>
          <span>Zero-Location Tracking • No GPS or IP Stored</span>
        </div>
      </div>

      ${STATE.mapViewMode === 'radar' ? `
        <!-- Constellation Radar View -->
        <div class="radar-layout">
          <!-- Left: Visual Interactive Constellation Canvas -->
          <div class="radar-stage-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <div style="font-size: 0.82rem; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">
                Interactive Advice Radar
              </div>
              <div style="font-size: 0.78rem; color: #7C3AED; font-weight: 600;">
                Click any node to reveal tactical scripts
              </div>
            </div>

            <div class="radar-canvas-container">
              <div class="radar-sweep-line"></div>
              <svg class="radar-rings" width="100%" height="100%" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="15" fill="none" stroke="#E2E8F0" stroke-width="0.8" stroke-dasharray="2,2" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#E2E8F0" stroke-width="0.8" stroke-dasharray="2,2" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#CBD5E1" stroke-width="1" />
                <line x1="50" y1="5" x2="50" y2="95" stroke="#F1F5F9" stroke-width="0.8" />
                <line x1="5" y1="50" x2="95" y2="50" stroke="#F1F5F9" stroke-width="0.8" />
              </svg>

              ${ADVICE_NODES.map(node => {
                const isSelected = node.id === currentAdviceNode.id;
                return `
                  <button 
                    class="radar-node-btn ${isSelected ? 'active' : ''}" 
                    data-node-id="${node.id}"
                    style="left: ${node.xPercent}%; top: ${node.yPercent}%;"
                    title="${node.title} • ${node.domainLabel}"
                    aria-label="${node.badge}: ${node.title}"
                  >
                    <div class="radar-node-icon-wrapper">
                      <span class="radar-node-icon">${node.icon}</span>
                      ${isSelected ? '<span class="radar-active-pulse"></span>' : ''}
                    </div>
                    <span class="radar-node-badge">${node.badge}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Right: Detailed Guidance & Boundary Script Panel -->
          <div class="radar-detail-panel">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div>
                <span class="persona-badge">${currentAdviceNode.domainLabel}</span>
                <h2 style="font-size: 1.25rem; font-weight: 800; color: #0F172A; margin: 6px 0;">
                  ${currentAdviceNode.title}
                </h2>
              </div>
            </div>

            <div style="background: #F1F5F9; border-radius: 8px; padding: 12px; font-size: 0.88rem; color: #334155; line-height: 1.5;">
              <strong>Core Truth:</strong> ${currentAdviceNode.coreAnchor}
            </div>

            <div style="margin-top: 4px;">
              <div style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; color: #059669; letter-spacing: 0.5px; margin-bottom: 4px;">
                ⚡ Immediate 30-Second Somatic Step
              </div>
              <p style="font-size: 0.92rem; color: #1E293B; line-height: 1.5; margin: 0;">
                ${currentAdviceNode.immediateStep}
              </p>
            </div>

            <div>
              <div style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; color: #7C3AED; letter-spacing: 0.5px; margin-bottom: 6px;">
                💬 Word-For-Word Boundary Script
              </div>
              <div class="script-quote-card">
                ${currentAdviceNode.script}
              </div>
              <button class="copy-script-btn" data-script="${encodeURIComponent(currentAdviceNode.script)}">
                <span>📋</span> Copy Script to Clipboard
              </button>
            </div>

            <div>
              <div style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; color: #E11D48; letter-spacing: 0.5px; margin-bottom: 6px;">
                ⚠️ Warning Signs to Watch For
              </div>
              <ul style="margin: 0; padding-left: 18px; font-size: 0.86rem; color: #475569; display: flex; flex-direction: column; gap: 4px;">
                ${currentAdviceNode.warningSigns.map(w => `<li>${w}</li>`).join('')}
              </ul>
            </div>

            <div style="background: #FFFBEB; border: 1px solid #FCD34D; border-radius: 8px; padding: 10px 14px; font-size: 0.84rem; color: #92400E; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
              <span>📞 <strong>24/7 Lifeline:</strong> ${currentAdviceNode.lifeline}</span>
            </div>

            ${currentAdviceNode.relatedPackageId ? `
              <button class="match-btn" data-open-package="${currentAdviceNode.relatedPackageId}" style="width: 100%; margin-top: 8px;">
                Open Related Sanctuary Package
              </button>
            ` : ''}
          </div>
        </div>
      ` : `
        <!-- Controls & Instant Search Row -->
        <div class="map-filters-row">
          <div class="map-search-box">
            <span class="map-search-icon">🔍</span>
            <input
              type="text"
              id="map-search-input"
              class="map-search-input"
              placeholder="Search center name, city (e.g. San Francisco, London), or service..."
              value="${STATE.mapSearchQuery || ''}"
            />
            <button id="map-search-clear" class="map-search-clear" title="Clear search" style="${STATE.mapSearchQuery ? 'display: block;' : 'display: none;'}">✕</button>
          </div>

          <!-- Country, State, and City Unified Selectors -->
          <div class="map-location-cascade">
            <!-- 1. Country Selector -->
            <div class="map-select-wrapper">
              <label for="map-country-select" class="map-select-label">Country</label>
              <select id="map-country-select" class="map-cascade-select" title="Filter by Country">
                <option value="ALL" ${STATE.mapCountry === 'ALL' ? 'selected' : ''}>🌍 All Countries (${ADVICE_PLACES.length})</option>
                ${Object.values(COUNTRIES).map(c => `
                  <option value="${c.code}" ${STATE.mapCountry === c.code ? 'selected' : ''}>
                    ${COUNTRY_FLAGS[c.code] || '🌍'} ${c.name} (${ADVICE_PLACES.filter(p => p.country === c.code).length})
                  </option>
                `).join('')}
              </select>
            </div>

            <!-- 2. State / Province Selector -->
            <div class="map-select-wrapper">
              <label for="map-state-select" class="map-select-label">State / Province</label>
              <select id="map-state-select" class="map-cascade-select" title="Filter by State or Province">
                <option value="ALL" ${STATE.mapState === 'ALL' ? 'selected' : ''}>🏛️ All States / Regions (${availableStates.reduce((sum, s) => sum + s.count, 0)})</option>
                ${availableStates.map(s => `
                  <option value="${s.name}" ${STATE.mapState === s.name ? 'selected' : ''}>
                    ${s.name}${s.count > 0 ? ` (${s.count})` : ''}
                  </option>
                `).join('')}
              </select>
            </div>

            <!-- 3. City Selector -->
            <div class="map-select-wrapper">
              <label for="map-city-select" class="map-select-label">City</label>
              <select id="map-city-select" class="map-cascade-select" title="Filter by City">
                <option value="ALL" ${STATE.mapCity === 'ALL' ? 'selected' : ''}>📍 All Cities (${availableCities.reduce((sum, c) => sum + c.count, 0)})</option>
                ${availableCities.map(c => `
                  <option value="${c.name}" ${STATE.mapCity === c.name ? 'selected' : ''}>
                    ${c.name}${c.count > 0 ? ` (${c.count})` : ''}
                  </option>
                `).join('')}
              </select>
            </div>
          </div>
        </div>

        <!-- Breadcrumbs Container -->
        <div id="map-breadcrumbs-container">
          ${renderMapBreadcrumbsHtml()}
        </div>

        <!-- Category Filter Chips Strip -->
        <div class="map-category-strip">
          <button class="map-cat-chip ${STATE.mapCategory === 'ALL' ? 'active' : ''}" data-cat="ALL">
            All (${filteredPlaces.length})
          </button>
          ${Object.values(ADVICE_CATEGORIES).map(c => {
            const count = filteredPlaces.filter(p => p.category === c.key).length;
            return `
              <button class="map-cat-chip ${STATE.mapCategory === c.key ? 'active' : ''}" data-cat="${c.key}">
                <span>${c.icon}</span> ${c.label} (${count})
              </button>
            `;
          }).join('')}
        </div>

        <!-- Split Explorer Layout -->
        <div class="map-explorer-layout">
          <!-- Left Sidebar: Active Detail Card + Directory List -->
          <div class="map-sidebar-panel">
            <div id="selected-sanctuary-detail">
              ${renderPlaceDetailCard(currentPlace)}
            </div>

            <div class="map-directory-header">
              <span id="map-count-indicator">${filteredPlaces.length} verified sanctuaries</span>
              <span style="font-size: 0.75rem; color: #94A3B8;">Click to focus on map</span>
            </div>

            <div id="places-grid-container" class="map-places-list">
              ${filteredPlaces.length === 0 ? `
                <div style="padding: 24px 18px; text-align: center; background: white; border-radius: var(--radius-md); border: 1.5px solid #E2E8F0; box-shadow: var(--shadow-sm);">
                  <div style="font-size: 2rem; margin-bottom: 8px;">🛡️</div>
                  <div style="font-weight: 700; color: #1E293B; font-size: 0.92rem; margin-bottom: 4px;">
                    Statewide & National Sanctuary Coverage Active
                  </div>
                  <div style="color: #64748B; font-size: 0.8rem; line-height: 1.5; margin-bottom: 12px;">
                    No physical walk-in pins are currently registered for <strong>${STATE.mapCity !== 'ALL' ? STATE.mapCity + ', ' : ''}${STATE.mapState !== 'ALL' ? STATE.mapState : 'this region'}</strong>, but 24/7 crisis hotlines, emergency dispatch, and legal referral networks are 100% active here.
                  </div>
                  <button class="action-btn action-btn-secondary" id="empty-state-reset-btn" style="font-size: 0.78rem; padding: 6px 14px; margin: 0 auto; display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
                    <span>↩</span> Show All Centers in ${countryObj?.name || 'Country'}
                  </button>
                </div>
              ` : filteredPlaces.map(p => {
                const pCat = ADVICE_CATEGORIES[p.category] || ADVICE_CATEGORIES.COMMUNITY_SANCTUARY;
                const isSelected = currentPlace && p.id === currentPlace.id;
                return `
                  <div class="map-place-card ${isSelected ? 'active' : ''}" data-place-id="${p.id}">
                    <div class="map-card-top">
                      <div>
                        <div class="map-card-name">${p.name}</div>
                        <div class="map-card-sub">📍 ${p.city || p.countryName || p.country}</div>
                      </div>
                      <span style="font-size: 1.15rem;">${pCat.icon}</span>
                    </div>
                    <div class="map-card-advice">${p.adviceType}</div>
                    <div class="map-card-footer">
                      <span style="font-weight: 700; color: ${isSelected ? 'var(--primary)' : '#6B7280'};">
                        ${isSelected ? '● Active on Map' : 'Tap to focus'}
                      </span>
                      <span style="color: #6B7280; font-weight: 600;">${p.phone}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Right Viewport: Sticky Map Canvas -->
          <div class="map-viewport-panel" id="map-canvas">
            <button class="map-floating-recenter" id="map-recenter-btn" title="Fit all visible markers into view">
              <span>⛶</span> Fit All Sanctuaries
            </button>
            <div id="leaflet-map"></div>
            <div class="map-privacy-watermark">
              <span>🛡️</span>
              <span>Confidential Sanctuary Map • 100% Private (Zero 3rd-party tile tracking)</span>
            </div>
            <div id="fallback-canvas" style="display: none; position: absolute; inset: 0;">
              <div class="map-grid-bg"></div>
              ${filteredPlaces.map(p => {
                const pCat = ADVICE_CATEGORIES[p.category] || ADVICE_CATEGORIES.COMMUNITY_SANCTUARY;
                const leftPercent = (p.mapCoordX * 100).toFixed(1);
                const topPercent = (p.mapCoordY * 100).toFixed(1);
                const isSelected = currentPlace && p.id === currentPlace.id;
                return `
                  <div class="map-pin ${isSelected ? 'active' : ''}" data-place-id="${p.id}" style="left: ${leftPercent}%; top: ${topPercent}%;">
                    <div class="map-pin-body" style="background: ${pCat.color};">
                      <span class="map-pin-icon">${pCat.icon}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      `}
    </div>
  `;
}

function attachMapListeners() {
  // Mode switcher tabs
  document.querySelectorAll('.advice-map-mode-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      STATE.mapViewMode = tab.dataset.mode;
      renderApp();
    });
  });

  if (STATE.mapViewMode === 'radar') {
    // Radar node clicks
    document.querySelectorAll('.radar-node-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        STATE.selectedAdviceNodeId = btn.dataset.nodeId;
        renderApp();
      });
    });

    // Copy script button
    document.querySelectorAll('.copy-script-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const textToCopy = decodeURIComponent(btn.dataset.script || '');
        if (textToCopy) {
          try {
            await navigator.clipboard.writeText(textToCopy);
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<span>✓</span> Copied to clipboard!';
            btn.style.background = '#10B981';
            btn.style.color = '#FFFFFF';
            setTimeout(() => {
              btn.innerHTML = originalHTML;
              btn.style.background = '';
              btn.style.color = '';
            }, 2000);
          } catch (e) {
            console.warn('Clipboard copy failed:', e);
          }
        }
      });
    });

    // Open related package
    document.querySelectorAll('[data-open-package]').forEach(btn => {
      btn.addEventListener('click', () => {
        const pkgId = btn.dataset.openPackage;
        const pkg = findPackageById(pkgId);
        if (pkg) {
          openPackageModal(pkg);
        }
      });
    });

    return;
  }

  const filteredPlaces = getFilteredMapPlaces();
  const currentPlace = filteredPlaces.find(p => p.id === STATE.selectedPlaceId) || filteredPlaces[0] || null;

  initLeafletMap(filteredPlaces, currentPlace);

  // 1. Country Dropdown
  const countrySelect = document.getElementById('map-country-select');
  if (countrySelect) {
    countrySelect.addEventListener('change', (e) => {
      STATE.mapCountry = e.target.value;
      STATE.mapState = 'ALL';
      STATE.mapCity = 'ALL';
      STATE.selectedPlaceId = null;
      persistState();
      updateMapFilters();
    });
  }

  // 1b. State / Province Dropdown
  const stateSelect = document.getElementById('map-state-select');
  if (stateSelect) {
    stateSelect.addEventListener('change', (e) => {
      STATE.mapState = e.target.value;
      STATE.mapCity = 'ALL';
      STATE.selectedPlaceId = null;
      persistState();
      updateMapFilters();
    });
  }

  // 1c. City Dropdown
  const citySelect = document.getElementById('map-city-select');
  if (citySelect) {
    citySelect.addEventListener('change', (e) => {
      STATE.mapCity = e.target.value;
      STATE.selectedPlaceId = null;
      persistState();
      updateMapFilters();
    });
  }

  // Reset button inside empty coverage notice
  const emptyStateResetBtn = document.getElementById('empty-state-reset-btn');
  if (emptyStateResetBtn) {
    emptyStateResetBtn.addEventListener('click', () => {
      STATE.mapState = 'ALL';
      STATE.mapCity = 'ALL';
      STATE.mapSearchQuery = '';
      persistState();
      updateMapFilterDropdowns();
      updateMapFilters();
    });
  }

  attachBreadcrumbListeners();

  // 2. Real-Time Search Input
  const searchInput = document.getElementById('map-search-input');
  const clearBtn = document.getElementById('map-search-clear');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      STATE.mapSearchQuery = e.target.value;
      if (clearBtn) {
        clearBtn.style.display = STATE.mapSearchQuery ? 'block' : 'none';
      }
      updateMapFilters();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      STATE.mapSearchQuery = '';
      if (searchInput) searchInput.value = '';
      clearBtn.style.display = 'none';
      updateMapFilters();
    });
  }

  // 3. Category Filter Chips
  document.querySelectorAll('.map-cat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      STATE.mapCategory = chip.dataset.cat;
      STATE.selectedPlaceId = null;
      updateMapFilters();
    });
  } );

  // 4. Place Cards in List
  document.querySelectorAll('.map-place-card').forEach(card => {
    card.addEventListener('click', () => {
      selectPlaceOnMap(card.dataset.placeId, true);
    });
  });

  // 5. Fallback Map Pins
  document.querySelectorAll('.map-pin').forEach(pin => {
    pin.addEventListener('click', () => {
      selectPlaceOnMap(pin.dataset.placeId, true);
    });
  });

  // 6. Recenter Button
  const recenterBtn = document.getElementById('map-recenter-btn');
  if (recenterBtn) {
    recenterBtn.addEventListener('click', () => {
      const places = getFilteredMapPlaces();
      if (leafletMapInstance && places.length > 0) {
        if (places.length > 1) {
          const bounds = window.L.latLngBounds(places.map(p => [p.lat, p.lng]));
          leafletMapInstance.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
        } else {
          leafletMapInstance.setView([places[0].lat, places[0].lng], 14);
        }
      }
    });
  }

  // 7. Reset Filter Button in Empty State
  const resetBtn = document.getElementById('reset-map-filter-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      STATE.mapCategory = 'ALL';
      STATE.mapSearchQuery = '';
      if (searchInput) searchInput.value = '';
      if (clearBtn) clearBtn.style.display = 'none';
      updateMapFilters();
    });
  }
}


function renderSanctuaryScreen() {
  const cData = COUNTRIES[STATE.country] || COUNTRIES['US'];
  return `
    <div>
      <div style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <h1 style="font-size: 1.6rem; font-weight: 800; color: var(--text-main);">My Private Sanctuary</h1>
          <span class="privacy-shield-badge">Stored 100% In Your Browser</span>
        </div>
        <p style="color: var(--text-muted); font-size: 0.95rem;">Your private toolkit, active sister circles, and confidential peer match requests.</p>
      </div>

      <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: var(--radius-md); padding: 12px 16px; margin-bottom: 24px; font-size: 0.84rem; color: #166534; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
        <div>
          <strong>Zero Cloud Persistence:</strong> This sanctuary exists exclusively inside your browser's private storage. No servers, trackers, or cookies have access to your saved care tools or notes.
        </div>
        <button id="clear-sanctuary-btn" style="background: none; border: 1px solid #DC2626; color: #DC2626; padding: 4px 10px; border-radius: 6px; font-size: 0.78rem; font-weight: 700; cursor: pointer;">
          Delete All My Data
        </button>
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 12px; color: var(--text-main);">
          Saved Micro-Tools (${STATE.savedTools.length})
        </h2>
        ${STATE.savedTools.length === 0 ? `
          <div style="background: white; border: 1px dashed var(--border); border-radius: var(--radius-md); padding: 24px; text-align: center; color: var(--text-muted);">
            You haven't saved any grounding micro-tools yet. When exploring packages, tap <strong>Save Tool</strong>.
          </div>
        ` : `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
            ${STATE.savedTools.map(t => `
              <div class="tier-card" style="margin-bottom: 0;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
                  <div>
                    <h3 style="font-size: 1.05rem; font-weight: 700;">${t.title}</h3>
                    <div style="font-size: 0.78rem; color: var(--primary); font-weight: 600;">${t.packageTitle || t.category}</div>
                  </div>
                  <button class="remove-tool-btn" data-tool-id="${t.id}" style="background: none; border: none; color: #EF4444; cursor: pointer; font-size: 0.8rem;">Remove</button>
                </div>
                <p style="font-size: 0.85rem; color: #4B5563; margin: 8px 0 12px;">${t.description}</p>
                ${t.scriptContent ? `
                  <button class="copy-btn copy-saved-script-btn" data-script="${encodeURIComponent(t.scriptContent)}" style="padding: 6px 10px; font-size: 0.8rem;">
                    Copy Script
                  </button>
                ` : ''}
              </div>
            `).join('')}
          </div>
        `}
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 12px; color: var(--text-main);">
          Confidential Peer Sister Match Requests (${STATE.peerMatchRequests.length})
        </h2>
        ${STATE.peerMatchRequests.length === 0 ? `
          <div style="background: white; border: 1px dashed var(--border); border-radius: var(--radius-md); padding: 24px; text-align: center; color: var(--text-muted);">
            No match requests submitted. You can request 1-on-1 verified sister matching from any package view.
          </div>
        ` : `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
            ${STATE.peerMatchRequests.map(r => `
              <div style="background: white; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <div style="font-weight: 700; color: var(--text-main); font-size: 0.95rem;">${r.packageName}</div>
                  <span class="badge" style="background: #10B981;">Active Request</span>
                </div>
                <div style="font-size: 0.82rem; color: var(--text-muted); margin: 6px 0;">
                   Requested on ${r.date} • Region: ${r.country}
                </div>
                <div style="background: #F9FAFB; padding: 10px; border-radius: 6px; font-size: 0.84rem; color: #374151; margin-bottom: 10px; font-style: italic;">
                  "${r.note}"
                </div>
                <div style="font-size: 0.8rem; color: var(--primary);">
                  Mode: ${r.preferredContact}
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 12px; color: var(--text-main);">
          Saved Support Groups & Sisterhood Circles (${STATE.rsvpedMeetupIds.size + STATE.joinedGroupIds.size})
        </h2>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${[...STATE.rsvpedMeetupIds].map(mId => {
            let foundMeetup = null;
            for (const pkg of SUPPORT_PACKAGES) {
              const mList = getMeetupsForPackage(pkg);
              const m = mList.find(x => x.id === mId);
              if (m) { foundMeetup = m; break; }
            }
            if (!foundMeetup) return '';
            return `
              <div style="background: white; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                <div>
                  <div style="font-weight: 700; color: var(--text-main); font-size: 0.95rem;">${foundMeetup.title}</div>
                  <div style="font-size: 0.82rem; color: var(--text-muted);">${foundMeetup.dayTime} • ${foundMeetup.location}</div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center;">
                  <a href="${foundMeetup.url}" target="_blank" rel="noopener noreferrer" class="external-btn" style="padding: 6px 12px; font-size: 0.8rem;">
                    Open Link ↗
                  </a>
                  <button class="remove-meetup-btn" data-meetup-id="${foundMeetup.id}" style="background: none; border: none; color: #EF4444; cursor: pointer; font-size: 0.8rem;">Remove</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

function attachSanctuaryListeners() {
  document.querySelectorAll('.remove-tool-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.toolId;
      STATE.savedTools = STATE.savedTools.filter(t => t.id !== id);
      persistState();
      renderApp();
    });
  });

  document.querySelectorAll('.remove-meetup-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      STATE.rsvpedMeetupIds.delete(btn.dataset.meetupId);
      persistState();
      renderApp();
    });
  });

  document.querySelectorAll('.copy-saved-script-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const script = decodeURIComponent(btn.dataset.script);
      navigator.clipboard.writeText(script).then(() => {
        btn.textContent = ' Copied!';
        setTimeout(() => { btn.textContent = 'Copy Script'; }, 1800);
      });
    });
  });

  const clearBtn = document.getElementById('clear-sanctuary-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm("Are you sure you want to delete all saved data from this browser? This cannot be undone.")) {
        STATE.savedTools = [];
        STATE.peerMatchRequests = [];
        STATE.careHistory = [];
        STATE.rsvpedMeetupIds.clear();
        STATE.joinedGroupIds.clear();
        persistState();
        renderApp();
      }
    });
  }
}

function openCountrySelectorModal() {
  const container = document.getElementById('modal-container');
  if (!container) return;

  // Local state for the modal until user confirms
  let modalCountry = STATE.country || 'US';
  let modalState = STATE.mapState || 'ALL';
  let modalCity = STATE.mapCity || 'ALL';

  function renderModalContent() {
    const states = getStatesForCountry(modalCountry);
    const totalStateCount = states.reduce((sum, s) => sum + s.count, 0);

    const cities = getCitiesForCountryAndState(modalCountry, modalState);
    const totalCityCount = cities.reduce((sum, c) => sum + c.count, 0);

    const countryObj = COUNTRIES[modalCountry] || COUNTRIES['US'];
    const flag = COUNTRY_FLAGS[modalCountry] || '🌍';
    const emergencyNum = countryObj?.emergency || '911';
    const helplineCount = countryObj?.crisisHelplines?.length || 0;
    const placesInCountry = ADVICE_PLACES.filter(p => {
      const code = modalCountry === 'UK' ? 'GB' : modalCountry;
      return p.country === code || (code === 'GB' && p.country === 'UK');
    }).length;

    container.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-card" style="max-width: 540px; border-radius: var(--radius-lg); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
          <div class="modal-header" style="border-bottom: 1px solid #F1F5F9; padding-bottom: 14px; margin-bottom: 14px;">
            <div style="font-weight: 800; font-size: 1.15rem; color: var(--text-main); display: flex; align-items: center; gap: 8px;">
              <span>📍</span> Select Your Location
            </div>
            <button class="modal-close-btn" id="close-country-modal" title="Close" aria-label="Close dialog">&times;</button>
          </div>

          <p style="font-size: 0.86rem; color: var(--text-muted); margin-bottom: 12px; line-height: 1.5;">
            Configure your country, state, and city all together to localize emergency numbers, 24/7 crisis hotlines, and safe walk-in sanctuary centers.
          </p>

          <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: var(--radius-md); padding: 9px 12px; margin-bottom: 16px; font-size: 0.78rem; color: #166534; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.05rem;">🔒</span>
            <div>
              <strong>Zero-Tracking Privacy:</strong> Stored strictly in your browser. We never track your IP address or GPS coordinates.
            </div>
          </div>

          <!-- Country, State, and City Unified Form -->
          <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px; background: #FAF5FF; border: 1.5px solid #E9D5FF; border-radius: var(--radius-md);">
            <div style="font-weight: 700; font-size: 0.88rem; color: #6B21A8; display: flex; align-items: center; justify-content: space-between;">
              <span>🌍 Country, State & City</span>
              <span style="font-size: 0.74rem; font-weight: 600; color: #7E22CE;">All In One View</span>
            </div>

            <!-- 1. Country -->
            <div>
              <label for="modal-country-select" style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: #6B21A8; display: block; margin-bottom: 4px; letter-spacing: 0.04em;">
                Country
              </label>
              <select id="modal-country-select" style="width: 100%; padding: 9px 12px; font-size: 0.88rem; border-radius: 8px; border: 1.5px solid #D8B4FE; background: white; font-weight: 600; color: #1E293B; cursor: pointer; outline: none;">
                ${Object.values(COUNTRIES).map(c => {
                  const cFlag = COUNTRY_FLAGS[c.code] || '🌍';
                  const cCount = ADVICE_PLACES.filter(p => p.country === c.code).length;
                  return `
                    <option value="${c.code}" ${modalCountry === c.code ? 'selected' : ''}>
                      ${cFlag} ${c.name} (${cCount} sanctuaries)
                    </option>
                  `;
                }).join('')}
              </select>
            </div>

            <!-- 2. State / Province -->
            <div>
              <label for="modal-state-select" style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: #6B21A8; display: block; margin-bottom: 4px; letter-spacing: 0.04em;">
                State / Province
              </label>
              <select id="modal-state-select" style="width: 100%; padding: 9px 12px; font-size: 0.88rem; border-radius: 8px; border: 1.5px solid #D8B4FE; background: white; font-weight: 600; color: #1E293B; cursor: pointer; outline: none;">
                <option value="ALL" ${modalState === 'ALL' ? 'selected' : ''}>🏛️ All States / Regions (${totalStateCount})</option>
                ${states.map(s => `
                  <option value="${s.name}" ${modalState === s.name ? 'selected' : ''}>
                    ${s.name}${s.count > 0 ? ` (${s.count} centers)` : ''}
                  </option>
                `).join('')}
              </select>
            </div>

            <!-- 3. City -->
            <div>
              <label for="modal-city-select" style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: #6B21A8; display: block; margin-bottom: 4px; letter-spacing: 0.04em;">
                City
              </label>
              <select id="modal-city-select" style="width: 100%; padding: 9px 12px; font-size: 0.88rem; border-radius: 8px; border: 1.5px solid #D8B4FE; background: white; font-weight: 600; color: #1E293B; cursor: pointer; outline: none;">
                <option value="ALL" ${modalCity === 'ALL' ? 'selected' : ''}>📍 All Cities (${totalCityCount})</option>
                ${cities.map(c => `
                  <option value="${c.name}" ${modalCity === c.name ? 'selected' : ''}>
                    ${c.name}${c.count > 0 ? ` (${c.count} centers)` : ''}
                  </option>
                `).join('')}
              </select>
            </div>
          </div>

          <!-- Live Region Safety Snapshot Card -->
          <div style="margin-top: 14px; padding: 12px 14px; background: white; border: 1px solid #E2E8F0; border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.6rem;">${flag}</span>
              <div>
                <div style="font-weight: 700; color: var(--text-main); font-size: 0.9rem;">
                  ${countryObj?.name || modalCountry}
                  ${modalState !== 'ALL' ? `<span style="font-weight: 500; color: #64748B;"> › ${modalState}</span>` : ''}
                  ${modalCity !== 'ALL' ? `<span style="font-weight: 500; color: #64748B;"> › ${modalCity}</span>` : ''}
                </div>
                <div style="font-size: 0.78rem; color: var(--text-muted);">
                  Emergency: <strong style="color: #E11D48;">${emergencyNum}</strong> • Helplines: <strong>${helplineCount} verified</strong>
                </div>
              </div>
            </div>
            <div style="font-size: 0.76rem; background: #F1F5F9; color: #475569; padding: 4px 10px; border-radius: 20px; font-weight: 600;">
              ${placesInCountry} Sanctuaries
            </div>
          </div>

          <!-- Modal Action Buttons -->
          <div style="margin-top: 16px; display: flex; gap: 10px; justify-content: flex-end;">
            <button id="modal-cancel-btn" style="padding: 9px 18px; background: #F1F5F9; color: #475569; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer;">
              Cancel
            </button>
            <button id="modal-save-location-btn" style="padding: 9px 22px; background: var(--primary); color: white; border: none; border-radius: 8px; font-size: 0.85rem; font-weight: 700; cursor: pointer; box-shadow: 0 2px 6px rgba(124, 58, 237, 0.25);">
              Save & Apply Location
            </button>
          </div>
        </div>
      </div>
    `;

    // Event listeners inside modal
    document.getElementById('close-country-modal')?.addEventListener('click', () => {
      container.innerHTML = '';
    });
    document.getElementById('modal-cancel-btn')?.addEventListener('click', () => {
      container.innerHTML = '';
    });

    const countrySelect = document.getElementById('modal-country-select');
    const stateSelect = document.getElementById('modal-state-select');
    const citySelect = document.getElementById('modal-city-select');

    if (countrySelect) {
      countrySelect.addEventListener('change', () => {
        modalCountry = countrySelect.value;
        modalState = 'ALL';
        modalCity = 'ALL';
        renderModalContent();
      });
    }

    if (stateSelect) {
      stateSelect.addEventListener('change', () => {
        modalState = stateSelect.value;
        modalCity = 'ALL';
        renderModalContent();
      });
    }

    if (citySelect) {
      citySelect.addEventListener('change', () => {
        modalCity = citySelect.value;
        renderModalContent();
      });
    }

    const saveBtn = document.getElementById('modal-save-location-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        STATE.country = modalCountry;
        STATE.mapCountry = modalCountry;
        STATE.mapState = modalState;
        STATE.mapCity = modalCity;
        STATE.selectedPlaceId = null;
        persistState();
        container.innerHTML = '';
        renderApp();
      });
    }
  }

  renderModalContent();
}

function openPeerRequestModal(pkg) {
  const container = document.getElementById('modal-container');
  if (!container) return;

  const peerNet = pkg.peerNetwork || { networkName: `${pkg.title} Peer Network` };

  container.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-card" style="max-width: 500px;">
        <div class="modal-header">
          <div>
            <div style="font-weight: 800; font-size: 1.15rem; color: var(--text-main);">
              Request 1-on-1 Sister Match
            </div>
            <div style="font-size: 0.82rem; color: var(--primary); font-weight: 700;">
              ${peerNet.networkName}
            </div>
          </div>
          <button class="modal-close-btn" id="close-request-modal">&times;</button>
        </div>

        <div style="background: #FDF4FF; border: 1px solid #F5D0FE; border-radius: var(--radius-md); padding: 12px; margin: 12px 0 16px; font-size: 0.84rem; color: #701A75;">
          <strong>Zero Fake Profiles Pledge:</strong> You will only ever be connected with verified real women through facilitated peer cohorts. No bots or synthetic personas.
        </div>

        <div style="margin-bottom: 14px;">
          <label style="display: block; font-size: 0.85rem; font-weight: 700; color: var(--text-main); margin-bottom: 6px;">Your Region / Country</label>
          <select id="peer-request-country" class="feeling-textarea" style="min-height: 42px; height: 42px; padding: 6px 12px; font-size: 0.9rem;">
            ${Object.values(COUNTRIES).map(c => `
              <option value="${c.name}" ${STATE.country === c.code ? 'selected' : ''}>${c.flag} ${c.name}</option>
            `).join('')}
          </select>
        </div>

        <div style="margin-bottom: 14px;">
          <label style="display: block; font-size: 0.85rem; font-weight: 700; color: var(--text-main); margin-bottom: 6px;">Preferred Communication Mode</label>
          <select id="peer-request-contact" class="feeling-textarea" style="min-height: 42px; height: 42px; padding: 6px 12px; font-size: 0.9rem;">
            <option value="Signal Encrypted Chat"> Signal Safe Chat</option>
            <option value="Virtual Zoom / Google Meet">Video Sisterhood Circle</option>
            <option value="Private Email Exchange">Anonymous Email Exchange</option>
          </select>
        </div>

        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 0.85rem; font-weight: 700; color: var(--text-main); margin-bottom: 6px;">What you would like to share (Optional & Confidential)</label>
          <textarea id="peer-request-note" class="feeling-textarea" style="min-height: 90px;" placeholder="e.g. Navigating this transition alone and would cherish speaking with someone who has been through it..."></textarea>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button class="nav-btn" id="cancel-request-btn">Cancel</button>
          <button class="match-btn" id="submit-peer-request-btn" style="padding: 10px 20px;">
            Save Request to Sanctuary
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('close-request-modal').addEventListener('click', () => { container.innerHTML = ''; });
  document.getElementById('cancel-request-btn').addEventListener('click', () => { container.innerHTML = ''; });

  document.getElementById('submit-peer-request-btn').addEventListener('click', () => {
    const country = document.getElementById('peer-request-country').value;
    const contact = document.getElementById('peer-request-contact').value;
    const note = (document.getElementById('peer-request-note').value || 'Seeking gentle lived-experience companion').trim();

    STATE.peerMatchRequests.push({
      packageId: pkg.id,
      packageName: pkg.title,
      country: country,
      preferredContact: contact,
      note: note,
      date: new Date().toLocaleDateString()
    });
    persistState();
    container.innerHTML = '';
    alert(" Sister match request saved in your private sanctuary! In production, vetted community coordinators connect you via your preferred channel.");
    renderApp();
  });
}

function openPackageDetail(pkg) {
  const container = document.getElementById('modal-container');
  if (!container) return;

  const tool = pkg.defaultMicroTool;
  const meetups = getMeetupsForPackage(pkg);

  container.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-card" style="max-width: 640px;">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${getPackageImageUrl(pkg)}" alt="${pkg.title}" class="detail-package-img">
            <div>
              <div style="font-weight: 800; font-size: 1.2rem; color: var(--text-main);">${pkg.title}</div>
              <div style="font-size: 0.85rem; color: var(--text-muted);">${pkg.covers}</div>
            </div>
          </div>
          <button class="modal-close-btn" id="close-pkg-modal">&times;</button>
        </div>

        <div style="margin: 16px 0;">
          <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 6px;">Included Micro-Tool:</div>
          <div style="background: #F9FAFB; border: 1px solid var(--border); border-radius: 8px; padding: 12px;">
            <div style="font-weight: 700; color: var(--primary);">${tool.title}</div>
            <div style="font-size: 0.85rem; color: #4B5563; margin-top: 4px;">${tool.description}</div>
          </div>
        </div>

        <div style="margin: 16px 0;">
          <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 6px;">Verified Support Groups:</div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${meetups.map(m => `
              <div style="background: white; border: 1px solid var(--border); border-radius: 8px; padding: 10px 12px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-weight: 700; font-size: 0.88rem;">${m.title}</div>
                  <div style="font-size: 0.78rem; color: var(--text-muted);">${m.dayTime}</div>
                </div>
                <a href="${m.url}" target="_blank" rel="noopener noreferrer" class="external-btn" style="padding: 5px 10px; font-size: 0.78rem;">
                  Open ↗
                </a>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
          <button class="nav-btn" id="close-pkg-detail-btn">Close</button>
          <button class="match-btn" id="match-with-this-pkg-btn" style="padding: 10px 18px;">
            View Care Path For This Package
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('close-pkg-modal').addEventListener('click', () => { container.innerHTML = ''; });
  document.getElementById('close-pkg-detail-btn').addEventListener('click', () => { container.innerHTML = ''; });

  document.getElementById('match-with-this-pkg-btn').addEventListener('click', () => {
    container.innerHTML = '';
    STATE.feelingInput = pkg.exampleInput;
    STATE.matchResult = {
      matchedPackage: pkg,
      empathyStatement: `Holding space for your transition in "${pkg.title}". You are worthy of gentle care and understanding.`,
      detectedNeeds: [pkg.title, "Community Sisterhood", "Nervous System Recovery"],
      isCrisis: false,
      crisisHotline: null,
      escalationReason: null
    };
    navigateTo('match');
  });
}

function openReportModal(pkg, res) {
  const container = document.getElementById('modal-container');
  if (!container) return;

  if (!pkg) {
    pkg = STATE.activePackage || (STATE.matchResult && STATE.matchResult.matchedPackage) || SUPPORT_PACKAGES[0];
  }
  if (!res) {
    res = STATE.matchResult || {
      matchedPackage: pkg,
      empathyStatement: `You are held and valued in the ${pkg.title} sanctuary. Take gentle steps forward today.`,
      detectedNeeds: [pkg.title, "Nervous System Recovery", "Women Support System"],
      isCrisis: false,
      crisisHotline: null
    };
  }

  const tool = pkg.defaultMicroTool;
  const cData = COUNTRIES[STATE.country] || COUNTRIES['US'];
  const helpline = res.crisisHotline || (cData.crisisHelplines && cData.crisisHelplines[0]) || pkg.helpline;

  container.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-card" style="max-width: 680px;">
        <div class="modal-header">
          <div style="font-weight: 800; font-size: 1.2rem; color: var(--text-main); display: flex; align-items: center; gap: 8px;">
            
            <span>Women Support System Report</span>
          </div>
          <button class="modal-close-btn" id="close-report-modal">&times;</button>
        </div>

        <div style="margin: 14px 0; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 18px; background: white;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--border); padding-bottom: 10px; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <img src="assets/supershaki_logo.jpg" alt="SuperShakti" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; object-position: top center; border: 2px solid #F59E0B; box-shadow: 0 0 8px rgba(245, 158, 11, 0.4);">
              <div>
                <div style="font-size: 1.2rem; font-weight: 800; color: var(--primary);">Women Support System Report</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">Generated locally • ${new Date().toLocaleDateString()} • Region: ${cData.name}</div>
              </div>
            </div>
            <img src="${getPackageImageUrl(pkg)}" alt="${pkg.title}" class="report-package-img">
          </div>

          <div style="margin-bottom: 12px;">
            <div style="font-weight: 700; font-size: 0.88rem; color: var(--text-main);">Identified Transition Focus:</div>
            <div style="font-size: 1.05rem; font-weight: 800; color: var(--text-main); margin-top: 2px;">${pkg.title}</div>
            <div style="font-size: 0.85rem; color: var(--text-muted); font-style: italic;">"${res.empathyStatement}"</div>
          </div>

          <div style="margin-bottom: 12px;">
            <div style="font-weight: 700; font-size: 0.88rem; color: var(--text-main);">Key Needs Identified:</div>
            <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px;">
              ${res.detectedNeeds.map(n => `<span class="need-tag"># ${n}</span>`).join('')}
            </div>
          </div>

          ${res.isHybrid && res.secondaryPackages && res.secondaryPackages.length > 0 ? `
            <div style="margin-bottom: 12px; background: #FAF5FF; border: 1.5px solid #DDD6FE; padding: 12px; border-radius: 8px;">
              <div style="font-weight: 800; font-size: 0.8rem; color: #7C3AED; text-transform: uppercase; letter-spacing: 0.5px;">
                Hybrid Care Dimension (Co-Occurring Support)
              </div>
              <div style="font-size: 1rem; font-weight: 800; color: #4C1D95; margin-top: 3px;">
                Connected Focus: ${res.secondaryPackages.map(s => s.title).join(', ')}
              </div>
              ${res.hybridSynergy ? `<div style="font-size: 0.85rem; color: #5B21B6; margin-top: 5px; line-height: 1.4;">${res.hybridSynergy}</div>` : ''}
            </div>
          ` : ''}

          <div style="margin-bottom: 12px; background: #F9FAFB; padding: 10px; border-radius: 6px;">
            <div style="font-weight: 700; font-size: 0.85rem; color: var(--primary);">Tier 1 Grounding Micro-Tool:</div>
            <div style="font-weight: 600; font-size: 0.9rem;">${tool.title}</div>
            <div style="font-size: 0.82rem; color: #4B5563;">${tool.description}</div>
          </div>

          <!-- Optional Gemini AI Personalization Section -->
          <div class="report-gemini-box" id="report-gemini-section">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                
                <div>
                  <div style="font-weight: 700; font-size: 0.88rem; color: #4338CA;">
                    AI Personalized Action Insights (Opt-In Only)
                  </div>
                  <div style="font-size: 0.76rem; color: #6B7280;">
                    SuperShakti is 100% offline by default. AI is strictly opt-in. Information sent: only the package title and feeling keywords. Never your private reflections, IP address, or identity.
                  </div>
                </div>
              </div>
              <button id="report-enhance-gemini-btn" class="report-gemini-toggle-btn" title="Generate personalized insights with optional Gemini API">
                Generate AI Insights (Optional)
              </button>
            </div>
            
            <div id="report-gemini-key-row" style="margin-top: 10px; display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
              <input type="password" id="report-api-key-input" placeholder="Optional: Enter Gemini API Key (or leave blank for offline)" class="report-gemini-input" value="${STATE.geminiApiKey}">
              <span style="font-size: 0.74rem; color: #6B7280;">Optional • Key never leaves your browser</span>
            </div>

            <div id="report-gemini-results" style="display: none; margin-top: 12px; padding-top: 10px; border-top: 1px dashed #C7D2FE;">
              <div id="report-gemini-status" style="font-size: 0.82rem; color: #4338CA; font-weight: 600; margin-bottom: 6px;"></div>
              <div id="report-gemini-affirmation" style="font-style: italic; color: #3730A3; font-size: 0.86rem; margin-bottom: 8px;"></div>
              <ul id="report-gemini-steps" style="padding-left: 18px; margin: 0 0 8px 0; font-size: 0.82rem; color: #1E1B4B; line-height: 1.4;"></ul>
              <div id="report-gemini-reminder" style="font-size: 0.78rem; color: #6D28D9; font-weight: 600;"></div>
            </div>
          </div>

          <div style="margin-bottom: 12px;">
            <div style="font-weight: 700; font-size: 0.85rem; color: #166534;">Verified Emergency & Helpline:</div>
            <div style="font-size: 0.88rem; font-weight: 700;">${helpline.name} (${helpline.number})</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${helpline.hours} • ${helpline.description}</div>
          </div>

          <div style="font-size: 0.75rem; color: #6B7280; border-top: 1px dashed var(--border); padding-top: 8px;">
            Privacy & AI: Zero telemetry or IP logging. Google Gemini API is 100% optional; this care plan functions completely offline.
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button class="nav-btn" id="print-report-btn">Print / Save as PDF</button>
          <button class="match-btn" id="dismiss-report-btn">Done</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('close-report-modal').addEventListener('click', () => { container.innerHTML = ''; });
  document.getElementById('dismiss-report-btn').addEventListener('click', () => { container.innerHTML = ''; });

  document.getElementById('print-report-btn').addEventListener('click', () => {
    window.print();
  });

  const enhanceBtn = document.getElementById('report-enhance-gemini-btn');
  const keyInput = document.getElementById('report-api-key-input');
  const resultsDiv = document.getElementById('report-gemini-results');
  const statusDiv = document.getElementById('report-gemini-status');
  const affDiv = document.getElementById('report-gemini-affirmation');
  const stepsList = document.getElementById('report-gemini-steps');
  const remDiv = document.getElementById('report-gemini-reminder');

  if (enhanceBtn) {
    enhanceBtn.addEventListener('click', async () => {
      const inputKey = keyInput ? keyInput.value.trim() : '';
      if (inputKey) {
        STATE.geminiApiKey = inputKey;
        persistState();
      }

      enhanceBtn.disabled = true;
      enhanceBtn.textContent = 'Synthesizing Care Insights...';
      resultsDiv.style.display = 'block';
      statusDiv.textContent = inputKey ? 'Connecting to Gemini AI Sanctuary...' : 'Synthesizing local offline insights...';

      try {
        const resInsights = await fetch('/api/report/gemini-insights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            packageId: pkg.id,
            feeling: STATE.feelingInput,
            country: STATE.country,
            apiKey: inputKey || STATE.geminiApiKey || undefined
          })
        });

        if (resInsights.ok) {
          const data = await resInsights.json();
          statusDiv.innerHTML = data.source === 'gemini_ai'
            ? '<strong>Personalized via Gemini 1.5 Flash (Optional)</strong>'
            : ' <strong>Offline Care Synthesis (No API Key Required)</strong>';
          affDiv.textContent = `"${data.affirmation}"`;
          stepsList.innerHTML = data.threeStepPlan.map(s => `<li>${s}</li>`).join('');
          remDiv.textContent = data.gentleReminder;
        } else {
          statusDiv.textContent = ' Offline Care Synthesis (No API Key Required)';
          affDiv.textContent = `"Your feelings are valid, and you deserve a life of peace, sovereignty, and genuine care."`;
          stepsList.innerHTML = `<li>Take 3 minutes with ${tool.title}.</li><li>Set a gentle boundary today for your emotional capacity.</li><li>Reach out to verified peer circles when ready.</li>`;
          remDiv.textContent = 'Small gentle steps create lasting safety.';
        }
      } catch (err) {
        statusDiv.textContent = ' Offline Care Synthesis (No API Key Required)';
        affDiv.textContent = `"Your feelings are valid, and you deserve a life of peace, sovereignty, and genuine care."`;
        stepsList.innerHTML = `<li>Take 3 minutes with ${tool.title}.</li><li>Set a gentle boundary today for your emotional capacity.</li><li>Reach out to verified peer circles when ready.</li>`;
        remDiv.textContent = 'Small gentle steps create lasting safety.';
      } finally {
        enhanceBtn.disabled = false;
        enhanceBtn.textContent = 'Regenerate Insights (Optional)';
      }
    });
  }
}

function openFeedbackModal(pkg) {
  const container = document.getElementById('modal-container');
  if (!container) return;

  container.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-card" style="max-width: 480px;">
        <div class="modal-header">
          <div style="font-weight: 800; font-size: 1.15rem; color: var(--text-main);">
            How Well Did This Resonate?
          </div>
          <button class="modal-close-btn" id="close-feedback-modal">&times;</button>
        </div>

        <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 14px;">
          Your feedback stays on your local device to help tune the feeling-matching engine.
        </p>

        <div style="display: flex; justify-content: center; gap: 12px; margin: 16px 0;">
          <button class="nav-btn star-btn" data-stars="1" style="font-weight: 700; padding: 8px 16px;">Good Match</button>
          <button class="nav-btn star-btn" data-stars="2" style="font-weight: 700; padding: 8px 16px;">Strong Match</button>
          <button class="nav-btn star-btn" data-stars="3" style="font-weight: 700; padding: 8px 16px;">Deeply Supportive</button>
        </div>

        <textarea id="feedback-notes" class="feeling-textarea" style="min-height: 80px;" placeholder="Optional thoughts: What felt helpful? What was missing?"></textarea>

        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 14px;">
          <button class="nav-btn" id="cancel-feedback-btn">Cancel</button>
          <button class="match-btn" id="submit-feedback-btn">Save Feedback</button>
        </div>
      </div>
    </div>
  `;

  let selectedStars = 3;
  document.querySelectorAll('.star-btn').forEach(b => {
    b.addEventListener('click', () => {
      selectedStars = parseInt(b.dataset.stars);
      document.querySelectorAll('.star-btn').forEach(btn => btn.style.background = '');
      b.style.background = '#EDE9FE';
    });
  });

  document.getElementById('close-feedback-modal').addEventListener('click', () => { container.innerHTML = ''; });
  document.getElementById('cancel-feedback-btn').addEventListener('click', () => { container.innerHTML = ''; });

  document.getElementById('submit-feedback-btn').addEventListener('click', () => {
    const notes = document.getElementById('feedback-notes').value;
    STATE.feedbacks.push({
      packageId: pkg.id,
      stars: selectedStars,
      notes: notes,
      date: new Date().toISOString()
    });
    persistState();
    container.innerHTML = '';
    alert("Thank you! Your feedback has been saved locally.");
  });
}

function openSettingsModal() {
  const container = document.getElementById('modal-container');
  if (!container) return;

  const cData = COUNTRIES[STATE.country] || COUNTRIES['US'];

  container.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-card" style="max-width: 520px;">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="assets/supershaki_logo.jpg" alt="SuperShakti" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover; object-position: top center; border: 2px solid #F59E0B; box-shadow: 0 0 6px rgba(245, 158, 11, 0.4);">
            <div style="font-weight: 800; font-size: 1.2rem; color: var(--text-main);">
              Settings & Privacy Architecture
            </div>
          </div>
          <button class="modal-close-btn" id="close-settings-modal">&times;</button>
        </div>

        <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: var(--radius-md); padding: 14px; margin: 12px 0 16px;">
          <div style="font-weight: 800; color: #166534; font-size: 0.95rem; margin-bottom: 4px;">
            Zero-Knowledge Privacy Architecture
          </div>
          <div style="font-size: 0.82rem; color: #15803D; line-height: 1.45;">
            • <strong>No IP Logging:</strong> Our backend strips and anonymizes all IP addresses.<br>
            • <strong>No Location Tracking:</strong> GPS and device geolocation are completely disabled.<br>
            • <strong>Zero Fake Profiles:</strong> All peer programs, meetups, and clinics are verified real institutions.<br>
            • <strong>Client-Side Storage:</strong> Your private sanctuary notes exist only in your browser.
          </div>
        </div>

        <div style="margin-bottom: 18px;">
          <label style="display: block; font-size: 0.85rem; font-weight: 700; color: var(--text-main); margin-bottom: 6px;">
            Current Country / Regional Helplines
          </label>
          <div style="display: flex; gap: 8px; align-items: center;">
            <div style="flex: 1; background: #F9FAFB; border: 1px solid var(--border); padding: 10px 14px; border-radius: var(--radius-md); font-weight: 700; font-size: 0.9rem;">
              ${cData.name} (Emergency: ${cData.emergency})
            </div>
            <button class="nav-btn" id="settings-change-country-btn" style="background: var(--primary); color: white;">
              Change ▾
            </button>
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
          <button class="match-btn" id="close-settings-btn">Done</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('close-settings-modal').addEventListener('click', () => { container.innerHTML = ''; });
  document.getElementById('close-settings-btn').addEventListener('click', () => { container.innerHTML = ''; });

  document.getElementById('settings-change-country-btn').addEventListener('click', () => {
    container.innerHTML = '';
    openCountrySelectorModal();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-btn[data-screen]').forEach(btn => {
    btn.addEventListener('click', () => {
      navigateTo(btn.dataset.screen);
    });
  });

  const headerCountryBtn = document.getElementById('header-country-btn');
  if (headerCountryBtn) {
    headerCountryBtn.addEventListener('click', openCountrySelectorModal);
  }

  const bannerChangeCountryBtn = document.getElementById('banner-change-country-btn');
  if (bannerChangeCountryBtn) {
    bannerChangeCountryBtn.addEventListener('click', openCountrySelectorModal);
  }

  const exitBtn = document.getElementById('quick-safety-exit-btn');
  if (exitBtn) {
    exitBtn.addEventListener('click', toggleSafetyCurtain);
  }

  const settingsBtn = document.getElementById('settings-btn');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', openSettingsModal);
  }

  const headerReportBtn = document.getElementById('header-report-btn');
  if (headerReportBtn) {
    headerReportBtn.addEventListener('click', () => openReportModal());
  }

  const brandLogo = document.getElementById('brand-logo');
  if (brandLogo) {
    brandLogo.addEventListener('click', () => navigateTo('home'));
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleSafetyCurtain();
    }
  });

  window.SuperShakti = window.SuperShaki = {
    nav: navigateTo,
    toggleSafety: toggleSafetyCurtain
  };

  updateCountryUI();
  renderApp();
});
