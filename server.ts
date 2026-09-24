import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (err) {
      console.warn('Failed to initialize GoogleGenAI client:', err);
    }
  }
  return aiClient;
}

// Load catalog data from web/catalog.json
let catalogData: any = { packages: [], places: [], countries: {}, categories: {} };
try {
  const catalogPath = path.join(process.cwd(), 'web', 'catalog.json');
  if (fs.existsSync(catalogPath)) {
    catalogData = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));
  }
} catch (err) {
  console.warn('Failed to load web/catalog.json:', err);
}

function findPackage(id: string) {
  if (!id) return null;
  return (catalogData.packages || []).find((p: any) => p.id === id) || null;
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

function matchOffline(inputFeeling: string, countryCode = 'US') {
  const text = (inputFeeling || '').toLowerCase();
  const cData = (catalogData.countries || {})[countryCode] || (catalogData.countries || {})['US'] || {};
  const helplines = cData.crisisHelplines || [];

  for (const t of SELF_HARM_TRIGGERS) {
    if (text.includes(t)) {
      const line = helplines.find((h: any) => h.type === 'crisis' || h.type === 'mental_health' || h.name.toLowerCase().includes('988') || h.name.toLowerCase().includes('crisis')) || helplines[0] || { name: 'Emergency', number: cData.emergency || '911' };
      return {
        matchedPackage: findPackage('emotional_struggles') || (catalogData.packages || [])[0],
        secondaryPackages: [],
        isHybrid: false,
        hybridSynergy: null,
        empathyStatement: 'We hear how much unbearable pain you are carrying right now. Your life is precious, and you do not have to walk through this alone.',
        detectedNeeds: ['Immediate Crisis Care', 'Trained Compassionate Listener'],
        isCrisis: true,
        crisisHotline: line,
        escalationReason: 'Immediate mental health crisis support needed.'
      };
    }
  }

  for (const t of ABUSE_TRIGGERS) {
    if (text.includes(t)) {
      const line = helplines.find((h: any) => h.type === 'dv' || h.name.toLowerCase().includes('domestic') || h.name.toLowerCase().includes('violence')) || helplines[0] || { name: 'Emergency', number: cData.emergency || '911' };
      return {
        matchedPackage: findPackage('divorce_separation') || findPackage('financial_difficulties') || (catalogData.packages || [])[0],
        secondaryPackages: [],
        isHybrid: false,
        hybridSynergy: null,
        empathyStatement: 'Your physical and emotional safety is sacred. You are not at fault for what is happening to you, and help is available.',
        detectedNeeds: ['Safety Planning', 'Confidential Shelter / Legal Protection'],
        isCrisis: true,
        crisisHotline: line,
        escalationReason: 'Domestic safety protocol active.'
      };
    }
  }

  // Multi-package scoring
  const scoredPackages: { pkg: any; score: number }[] = [];
  const THEMES: Record<string, string[]> = {
    "health_sports": ["hair", "hair loss", "hormone", "thyroid", "menopause", "period", "bodily", "fatigue", "depletion", "vitamin", "insomnia", "body", "health"],
    "job_search_remote_loneliness": ["job", "work", "career", "boss", "laid off", "layoff", "unemploy", "interview", "remote", "resume", "jobless", "toxic job", "workplace"],
    "ai_fear_digital_colonization_cybersecurity": ["ai", "replace", "automation", "algorithm", "deepfake", "surveillance", "doxx", "stalkerware", "chatgpt"],
    "emotional_struggles": ["emotional", "stress", "drained", "burnout", "exhausted", "overwhelmed", "anxious", "anxiety", "crying", "depressed", "depression", "sad"],
    "financial_difficulties": ["money", "debt", "rent", "budget", "broke", "financial", "afford", "bills", "poverty"],
    "moving_new_city": ["moving", "relocat", "new city", "moved", "new town"],
    "migration": ["immigrant", "visa", "new country", "culture shock", "language barrier", "homesick"],
    "divorce_separation": ["boyfriend", "girlfriend", "partner", "husband", "relationship", "breakup", "broke up", "dumped", "divorce", "separation", "split"],
    "loneliness_friends": ["lonely", "no friends", "making friends", "isolated", "alone", "friendless"],
    "parenting": ["toddler", "kids", "parenting", "teenager", "child"],
    "pregnancy_new_parents": ["pregnant", "pregnancy", "baby", "postpartum", "newborn", "breastfeeding", "birth"],
    "caring_for_parents": ["caregiver", "elder", "dementia", "aging parent", "caring for my mom", "caring for my dad"],
    "aging": ["aging", "older", "wrinkles", "getting older", "menopause", "retirement"]
  };

  for (const pkg of catalogData.packages || []) {
    let score = 0;
    const keywords = (pkg.covers || '').toLowerCase().split(/[\s,]+/);
    for (const kw of keywords) {
      if (kw.length > 3 && text.includes(kw)) {
        score += 2;
      }
    }
    if ((pkg.title || '').toLowerCase().includes(text) || text.includes((pkg.title || '').toLowerCase())) {
      score += 6;
    }
    const themeWords = THEMES[pkg.id] || [];
    for (const tw of themeWords) {
      if (text.includes(tw)) {
        score += 10;
      }
    }
    (pkg.feelingPrompts || []).forEach((fp: string) => {
      if (text.includes(fp.toLowerCase()) || fp.toLowerCase().includes(text)) {
        score += 8;
      }
    });
    scoredPackages.push({ pkg, score });
  }

  scoredPackages.sort((a, b) => b.score - a.score);
  const primary = scoredPackages[0]?.pkg || (catalogData.packages || [])[0];
  const topScore = scoredPackages[0]?.score || 0;

  // Collect 2 or 3 matching packages if present
  const secondaryPackages: any[] = [];
  for (let i = 1; i < Math.min(4, scoredPackages.length); i++) {
    const candidate = scoredPackages[i];
    if (candidate.score >= 6 && candidate.score >= (topScore * 0.25)) {
      if (candidate.pkg.id !== primary.id) {
        secondaryPackages.push(candidate.pkg);
      }
    }
  }

  const isHybrid = secondaryPackages.length > 0;
  const matchedTitles = [primary.title, ...secondaryPackages.map(p => p.title)];
  let hybridSynergy: string | null = null;
  if (secondaryPackages.length >= 2) {
    hybridSynergy = `Your prompt touches 3 intersecting life areas: ${primary.title}, ${secondaryPackages[0].title}, and ${secondaryPackages[1].title}. We have unlocked all matching packages so you have unified care across every dimension.`;
  } else if (secondaryPackages.length === 1) {
    hybridSynergy = `We detected co-occurring needs in both '${primary.title}' and '${secondaryPackages[0].title}'. Holding space for both dimensions brings comprehensive, compassionate relief.`;
  }

  return {
    matchedPackage: primary,
    secondaryPackages: secondaryPackages,
    isHybrid: isHybrid,
    hybridSynergy: hybridSynergy,
    empathyStatement: 'Thank you for honoring your truth. Every transition is an opportunity to reclaim your power and peace.',
    detectedNeeds: matchedTitles,
    isCrisis: false,
    crisisHotline: null,
    escalationReason: null
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Zero-Knowledge Privacy Architecture Middleware
  // 1. IP Stripping & Anonymization: Ensure no IP address is logged, tracked, or stored
  app.use((req, res, next) => {
    // Strip incoming identifying IP headers
    delete req.headers['x-forwarded-for'];
    delete req.headers['x-real-ip'];
    delete req.headers['cf-connecting-ip'];
    delete req.headers['true-client-ip'];
    delete req.headers['x-client-ip'];

    // Overwrite socket and express IP identifiers with anonymized loopback address
    try {
      Object.defineProperty(req, 'ip', { value: '0.0.0.0', writable: true });
      if (req.socket) {
        Object.defineProperty(req.socket, 'remoteAddress', { value: '0.0.0.0', writable: true });
      }
    } catch {
      // Ignore if property redefinition is locked
    }

    // Zero-Knowledge Security & Anti-Tracking Headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    // Disable browser GPS, camera, microphone, and payment APIs
    res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=(), payment=()');
    res.setHeader('X-Privacy-Architecture', 'zero-ip-logging; no-location-tracking; client-side-notes-only; zero-fake-profiles');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'SuperShakti Sanctuary',
      version: '1.2.0',
      packagesCount: (catalogData.packages || []).length,
      placesCount: (catalogData.places || []).length,
      countriesCount: Object.keys(catalogData.countries || {}).length,
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
      privacyNotice: 'Zero IP Logging & Zero Location Storage Enforced'
    });
  });

  // Catalog API
  app.get('/api/catalog', (req, res) => {
    res.json(catalogData);
  });

  // Countries API
  app.get('/api/countries', (req, res) => {
    res.json(catalogData.countries || {});
  });

  // Feeling Matcher API
  app.post('/api/match', async (req, res) => {
    try {
      const { feeling, country = 'US', apiKey } = req.body || {};
      const cleanFeeling = (feeling || '').trim();

      if (!cleanFeeling) {
        return res.status(400).json({ error: 'Feeling query cannot be empty' });
      }

      const client = getAiClient();
      const effectiveKey = apiKey || process.env.GEMINI_API_KEY;

      if (client || effectiveKey) {
        try {
          const aiToUse = client || new GoogleGenAI({ apiKey: effectiveKey });
          const packagesBrief = (catalogData.packages || []).map((p: any) => `${p.id}: ${p.title}`).join(', ');
          const prompt = `You are Shakti, an empathetic guide for women navigating complex life transitions.
Analyze the user's prompt: "${cleanFeeling}"
CRITICAL INSTRUCTION: Women frequently experience multi-layered struggles simultaneously (e.g., job burnout + relationship strain + financial anxiety, or health/hormones + emotional fatigue + loneliness).
If the user's prompt matches or touches upon two or three distinct packages from our catalog, YOU MUST IDENTIFY AND RETURN ALL OF THEM.
Choose from packages: [${packagesBrief}].
Return valid JSON adhering to:
{
  "packageId": "<primary_package_id>",
  "secondaryPackageIds": ["<second_matching_package_id>", "<optional_third_matching_package_id>"],
  "isHybrid": true/false (set to true whenever 2 or 3 packages match),
  "hybridSynergy": "<2-3 compassionate sentences explaining how these 2 or 3 matching areas interconnect and validate her experience>",
  "empathyStatement": "<1-2 compassionate, validating sentences spoken directly to her acknowledging all her shared concerns>",
  "detectedNeeds": ["<need 1>", "<need 2>", "<need 3>"],
  "isCrisis": false
}`;

          const aiResp = await aiToUse.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { responseMimeType: 'application/json' }
          });

          const rawText = aiResp.text || '{}';
          const parsed = JSON.parse(rawText);
          const matchedPkg = findPackage(parsed.packageId);
          const secPkgs = (parsed.secondaryPackageIds || [])
            .map((id: string) => findPackage(id))
            .filter((p: any) => p && p.id !== parsed.packageId);

          if (matchedPkg) {
            return res.json({
              matchedPackage: matchedPkg,
              secondaryPackages: secPkgs,
              isHybrid: parsed.isHybrid || secPkgs.length > 0,
              hybridSynergy: parsed.hybridSynergy || null,
              empathyStatement: parsed.empathyStatement || 'We hear you.',
              detectedNeeds: parsed.detectedNeeds || [matchedPkg.title],
              isCrisis: !!parsed.isCrisis,
              crisisHotline: null,
              escalationReason: null
            });
          }
        } catch (genErr) {
          console.warn('Gemini API match failed, using offline matcher:', genErr);
        }
      }

      // Offline matcher fallback
      const offlineResult = matchOffline(cleanFeeling, country);
      return res.json(offlineResult);
    } catch {
      return res.status(500).json({ error: 'Matcher unavailable' });
    }
  });

  // Dedicated React Feeling Matcher endpoint (Opt-in AI supported)
  app.post('/api/matcher', async (req, res) => {
    try {
      const { emotionId, emotionLabel, userStory, useAi = false, apiKey } = req.body || {};
      const cleanStory = (userStory || '').trim();
      const cleanLabel = (emotionLabel || emotionId || 'Transition').trim();

      // If user did not opt-in to AI or no story provided, return offline care plan immediately
      if (!useAi || !cleanStory) {
        return res.json({
          source: 'offline_framework',
          validation: `Navigating feeling ${cleanLabel} is valid. You do not have to carry this alone.`,
          reliefStep: 'Take 3 deliberate breaths with the 4-4-6 vagus nerve breathing tool.',
          affirmation: 'You have innate strength, and your pace of healing is sacred.'
        });
      }

      // If AI is opted-in
      const client = getAiClient();
      const effectiveKey = apiKey || process.env.GEMINI_API_KEY;

      if (client || effectiveKey) {
        try {
          const aiToUse = client || new GoogleGenAI({ apiKey: effectiveKey });
          const prompt = `You are Shakti, an empathetic elder sister for women.
User feeling state: "${cleanLabel}"
Shared words: "${cleanStory}"
Provide a brief comforting response in valid JSON with schema:
{
  "validation": "<1 compassionate sentence validating her feeling without diagnosis>",
  "reliefStep": "<1 practical immediate grounding or breathing step>",
  "affirmation": "<1 empowering affirmation>"
}`;

          const aiResp = await aiToUse.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { responseMimeType: 'application/json' }
          });

          const rawText = aiResp.text || '{}';
          const parsed = JSON.parse(rawText);

          return res.json({
            source: 'gemini_opt_in',
            validation: parsed.validation || `We hear your feeling of ${cleanLabel}.`,
            reliefStep: parsed.reliefStep || 'Somatic grounding reset.',
            affirmation: parsed.affirmation || 'You are worthy of peace and sovereign boundaries.'
          });
        } catch {
          // Fall back gracefully to offline framework without logging user reflection
        }
      }

      return res.json({
        source: 'offline_framework',
        validation: `Navigating ${cleanLabel} is emotionally significant. Honor your body’s signals today.`,
        reliefStep: 'Practice the 5-4-3-2-1 sensory grounding routine to steady your nervous system.',
        affirmation: 'You are worthy of ease, safety, and deep restorative rest.'
      });
    } catch {
      return res.status(500).json({ error: 'Matcher processing error' });
    }
  });

  // 1-Page Care Report Gemini Insights API
  app.post('/api/report/gemini-insights', async (req, res) => {
    try {
      const { packageId, feeling, apiKey } = req.body || {};
      const pkg = findPackage(packageId);

      if (!pkg) {
        return res.status(404).json({ error: 'Package not found' });
      }

      const effectiveKey = apiKey || process.env.GEMINI_API_KEY;
      const client = getAiClient();
      const feelingText = feeling || 'life transition and needing gentle grounding';

      if (client || effectiveKey) {
        try {
          const aiToUse = client || new GoogleGenAI({ apiKey: effectiveKey });
          const microTitle = pkg.defaultMicroTool?.title || 'Grounding Practice';
          const prompt = `You are Shakti, an empowering, empathetic elder sister and somatic guide for women.
The user is navigating this feeling/experience: "${feelingText}"
Matched Support Focus: "${pkg.title}" (${pkg.summary || ''})
Micro-tool: "${microTitle}"
Provide a comforting, actionable 1-Page Care Insight in valid JSON adhering to:
{
  "affirmation": "<A warm, empowering 1-2 sentence personal affirmation spoken directly to her>",
  "threeStepPlan": [
    "<Step 1: Immediate nervous system reset / breathing action>",
    "<Step 2: Boundary or safe expression action today>",
    "<Step 3: Long-term connection or community step>"
  ],
  "gentleReminder": "<1 sentence reminder that healing is non-linear and she is never alone>"
}`;

          const aiResp = await aiToUse.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { responseMimeType: 'application/json' }
          });

          const rawText = aiResp.text || '{}';
          const parsed = JSON.parse(rawText);

          return res.json({
            source: 'gemini_ai',
            affirmation: parsed.affirmation || 'You carry ancient strength within you.',
            threeStepPlan: parsed.threeStepPlan || [
              `Take 3 minutes with ${microTitle}.`,
              'Honor your boundaries without guilt or apology.',
              'Connect with a verified sisterhood peer group when you feel ready.'
            ],
            gentleReminder: parsed.gentleReminder || 'Take it one breath at a time; your pace is sacred.'
          });
        } catch (genErr) {
          console.warn('Gemini report insights failed, using offline fallback:', genErr);
        }
      }

      // Offline report fallback
      const microTitle = pkg.defaultMicroTool?.title || 'Grounding Practice';
      return res.json({
        source: 'offline_sanctuary',
        affirmation: 'Your feelings are valid, and you deserve a life of peace, sovereignty, and genuine care.',
        threeStepPlan: [
          `Ground your body: complete the ${microTitle} (~4 mins).`,
          'Set a gentle boundary today with anything demanding emotional energy you do not have.',
          'Remember that community exists—reach out to verified peer circles whenever you are ready.'
        ],
        gentleReminder: 'You do not have to carry everything all at once. Small, gentle steps create enduring safety.'
      });
    } catch (err: any) {
      console.error('Report insights endpoint error:', err);
      return res.status(500).json({ error: 'Internal report error', message: err.message });
    }
  });

  // Serve static files from web/
  const webDir = fs.existsSync(path.join(process.cwd(), 'web'))
    ? path.join(process.cwd(), 'web')
    : fs.existsSync(path.join(__dirname, 'web'))
      ? path.join(__dirname, 'web')
      : path.join(__dirname, '..', 'web');

  app.use(express.static(webDir));

  // Fallback to index.html in web/
  app.get('*', (req, res) => {
    res.sendFile(path.join(webDir, 'index.html'));
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌸 SuperShakti Sanctuary server running on http://localhost:${PORT}`);
  });
}

startServer();

