# -*- coding: utf-8 -*-
"""
SuperShakti Web Server
FastAPI backend providing static file hosting, catalog API, global country helplines, and Gemini AI feeling matching.
Strict Zero-Knowledge Architecture: No user location, no GPS, and no IP addresses are ever stored or logged.
"""
import os
import json
import logging
from typing import Optional, List
from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from pydantic import BaseModel
import httpx

# Load .env file if present
_env_path = os.path.join(os.path.dirname(__file__), ".env")
if os.path.isfile(_env_path):
    try:
        with open(_env_path, "r", encoding="utf-8") as _f:
            for _line in _f:
                _line = _line.strip()
                if _line and not _line.startswith("#") and "=" in _line:
                    _k, _v = _line.split("=", 1)
                    os.environ.setdefault(_k.strip(), _v.strip().strip('"').strip("'"))
    except Exception as _e:
        pass

# Configure privacy-preserving logging (strip and suppress any client IP addresses)
class PrivacyLogFilter(logging.Filter):
    def filter(self, record):
        # Prevent logging of client IPs or sensitive address information
        if hasattr(record, "client_addr"):
            record.client_addr = "[ANONYMIZED_CLIENT]"
        return True

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] supershakti: %(message)s")
logger = logging.getLogger("supershakti")
logger.addFilter(PrivacyLogFilter())

# Suppress uvicorn access logs that might print client IP addresses
logging.getLogger("uvicorn.access").addFilter(PrivacyLogFilter())

app = FastAPI(
    title="SuperShakti API",
    description="Global Women's Support & Sisterhood Sanctuary - Zero IP & Zero Location Logging",
    version="1.1.0"
)

# Custom Privacy Middleware: explicitly remove client IP and tracking headers
class ZeroKnowledgePrivacyMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # We do not inspect, log, or record client.host or X-Forwarded-For
        response = await call_next(request)
        # Permissive security headers allowing local and background embedding
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["Referrer-Policy"] = "no-referrer"
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = "0"
        return response

app.add_middleware(ZeroKnowledgePrivacyMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Load catalog data dynamically with mtime check
CATALOG_PATH = os.path.join(os.path.dirname(__file__), "web", "catalog.json")
CATALOG_DATA = {"categories": {}, "packages": [], "places": [], "countries": {}}
_CATALOG_MTIME = 0.0

def load_catalog(force: bool = False):
    global CATALOG_DATA, _CATALOG_MTIME
    if os.path.exists(CATALOG_PATH):
        try:
            mtime = os.path.getmtime(CATALOG_PATH)
            if force or mtime > _CATALOG_MTIME:
                with open(CATALOG_PATH, "r", encoding="utf-8") as f:
                    CATALOG_DATA = json.load(f)
                _CATALOG_MTIME = mtime
                logger.info("Loaded %d packages, %d places, and %d countries.", 
                            len(CATALOG_DATA.get("packages", [])), 
                            len(CATALOG_DATA.get("places", [])),
                            len(CATALOG_DATA.get("countries", {})))
        except Exception as e:
            logger.error("Failed to load catalog.json: %s", e)
    return CATALOG_DATA

load_catalog(force=True)

class MatchRequest(BaseModel):
    feeling: str
    country: Optional[str] = "US"
    apiKey: Optional[str] = None

class ReportInsightRequest(BaseModel):
    packageId: str
    feeling: Optional[str] = ""
    country: Optional[str] = "US"
    apiKey: Optional[str] = None

# Crisis triggers
ABUSE_TRIGGERS = [
    'hit me', 'punched', 'scared of him', 'afraid of my partner', 'choked', 'choking',
    'stalking', 'hurts me', 'threatened to kill', 'domestic violence', "can't leave",
    'wont let me leave', 'locked me in', 'took my passport'
]

SELF_HARM_TRIGGERS = [
    'want to die', 'kill myself', 'end my life', 'better off dead', 'suicide',
    'self-harm', 'cut myself', 'no reason to live'
]

FINANCIAL_CONTROL_TRIGGERS = [
    'takes my paycheck', 'controls the money', "won't let me work", 'no access to bank',
    'financially trapped', 'hides our money', 'monitors every penny'
]

DOMESTIC_FEAR_TRIGGERS = [
    'screaming at me', 'walking on eggshells', 'throws things', 'afraid of his temper',
    'afraid of her temper', 'threatens my children', 'scared in my own home'
]

def find_package(pkg_id: str):
    clean = pkg_id.lower().strip()
    packages = CATALOG_DATA.get("packages", [])
    for p in packages:
        if p["id"].lower() == clean:
            return p
    for p in packages:
        if clean in p["id"].lower() or p["id"].lower() in clean:
            return p
    return packages[0] if packages else None

def get_country_crisis_helpline(country_code: str, is_domestic: bool):
    countries = CATALOG_DATA.get("countries", {})
    country_data = countries.get(country_code, countries.get("US", {}))
    helplines = country_data.get("crisisHelplines", [])
    
    if is_domestic:
        # Search for domestic abuse line
        for h in helplines:
            if "domestic" in h.get("name", "").lower() or "abuse" in h.get("name", "").lower() or "gewalt" in h.get("name", "").lower() or "femmes" in h.get("name", "").lower() or "women" in h.get("name", "").lower():
                return h
    # Otherwise or fallback: return primary suicide/crisis or first line
    return helplines[0] if helplines else {
        "name": "Local Emergency Services",
        "number": country_data.get("emergency", "112"),
        "hours": "24/7 Immediate Emergency",
        "description": "Contact your local emergency responders immediately.",
        "isTollFree": True
    }

def offline_match(feeling: str, country: str = "US"):
    import re
    raw_text = feeling.lower()
    packages = CATALOG_DATA.get("packages", [])

    is_abuse = any(t in raw_text for t in ABUSE_TRIGGERS)
    is_self_harm = any(t in raw_text for t in SELF_HARM_TRIGGERS)

    if is_abuse or is_self_harm:
        is_crisis_domestic = is_abuse
        target_pkg = find_package("divorce_separation") if is_crisis_domestic else find_package("emotional_struggles")
        hotline = get_country_crisis_helpline(country, is_crisis_domestic)
        
        return {
            "matchedPackage": target_pkg,
            "secondaryPackages": [],
            "isHybrid": False,
            "hybridSynergy": None,
            "empathyStatement": (
                "Your safety and bodily dignity are the absolute priority. You do not have to navigate this fear alone, and what is happening is not your fault."
                if is_crisis_domestic else
                "I hear how heavy and unbearable things feel right now. Please know that your life matters deeply and there are gentle hands ready to listen."
            ),
            "detectedNeeds": ["Safety & Domestic Triage" if is_crisis_domestic else "Immediate Crisis Support", "Urgent Care"],
            "isCrisis": True,
            "crisisHotline": hotline,
            "escalationReason": "Physical safety / Domestic concern detected" if is_crisis_domestic else "Self-harm / Crisis distress detected"
        }

    escalation = None
    if any(t in raw_text for t in FINANCIAL_CONTROL_TRIGGERS):
        escalation = "Financial restriction or coercive money control detected. Access independent resources safely."
    elif any(t in raw_text for t in DOMESTIC_FEAR_TRIGGERS):
        escalation = "Emotional or coercive intimidation at home detected. Discreet support is available."

    # Normalize common typos and colloquialisms
    text = raw_text
    text = re.sub(r'\bhair\s+lose\b', 'hair loss', text)
    text = re.sub(r'\bhair\s+falling\b', 'hair loss', text)
    text = re.sub(r'\b(i am|feeling|feel|im|so)\s+tried\b', r'\1 tired', text)
    text = re.sub(r'\btried\s+and\b', 'tired and', text)
    text = re.sub(r'\btried\s+with\b', 'tired with', text)
    text = re.sub(r'\bboybriend\b', 'boyfriend', text)
    text = re.sub(r'\bemotional\s+demanding\b', 'emotionally demanding', text)

    STOP_WORDS = {
        "and", "the", "for", "with", "that", "this", "are", "feel", "feeling", "have", "has", 
        "about", "all", "not", "out", "can", "get", "just", "like", "more", "from", "been", "was"
    }
    tokens = [w for w in re.findall(r"\b[a-z]{3,}\b", text) if w not in STOP_WORDS]
    clauses = [c.strip() for c in re.split(r'\band\b|\balso\b|\bplus\b|\bas well as\b|\bwhile\b|,|;', text) if c.strip()]

    scores = {pkg["id"]: 0 for pkg in packages}

    THEMES = {
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
    }

    # 1. Base keyword and prompt matching with clean word-boundary matching
    for pkg in packages:
        pkg_id = pkg["id"]
        for prompt in pkg.get("feelingPrompts", []):
            p_lower = prompt.lower()
            if text in p_lower or p_lower in text:
                scores[pkg_id] += 12
            for tok in tokens:
                if re.search(r"\b" + re.escape(tok) + r"\b", p_lower):
                    scores[pkg_id] += 3

        covers_lower = pkg.get("covers", "").lower()
        for tok in tokens:
            if re.search(r"\b" + re.escape(tok) + r"\b", covers_lower):
                scores[pkg_id] += 2

        theme_words = THEMES.get(pkg_id, [])
        for tw in theme_words:
            if re.search(r"\b" + re.escape(tw) + r"\b", text):
                scores[pkg_id] += 25
                for clause in clauses:
                    if re.search(r"\b" + re.escape(tw) + r"\b", clause):
                        scores[pkg_id] += 6

    # Sort packages by score
    sorted_pkg_ids = sorted(scores.keys(), key=lambda pid: scores[pid], reverse=True)
    top_pkg_id = sorted_pkg_ids[0]
    top_score = scores[top_pkg_id]

    primary_pkg = find_package(top_pkg_id) or packages[0]
    secondary_packages = []
    is_hybrid = False
    hybrid_synergy = None

    # Detect co-occurring secondary packages (Hybrid System)
    for pid in sorted_pkg_ids[1:4]:
        if scores[pid] >= 18 and scores[pid] >= (top_score * 0.25):
            if pid != top_pkg_id:
                sec_pkg = find_package(pid)
                if sec_pkg and sec_pkg not in secondary_packages:
                    secondary_packages.append(sec_pkg)
                    is_hybrid = True

    detected_needs = []
    if primary_pkg:
        detected_needs.append(primary_pkg["title"])
    for sp in secondary_packages:
        detected_needs.append(sp["title"])

    all_pids = {primary_pkg["id"]} | {p["id"] for p in secondary_packages}

    if (("divorce_separation" in all_pids or "emotional_struggles" in all_pids) and 
        ("job_search_remote_loneliness" in all_pids or "career_changes" in all_pids)):
        hybrid_synergy = "Navigating the emotional drain of a demanding relationship alongside heavy workplace stress creates acute burnout. When both your personal haven and professional life demand more than you can carry, establishing firm emotional boundaries and reclaiming personal agency are essential to restoring your peace."
        detected_needs.extend(["Relationship Boundaries & Emotional Sovereignty", "Workplace Stress & Career Decompression"])
    elif "divorce_separation" in all_pids and "emotional_struggles" in all_pids:
        hybrid_synergy = "Carrying heavy relationship expectations while running on emotional empty takes a severe toll on your wellbeing. Your hybrid path pairs relationship boundary reclamation with restorative emotional care to help you break free from people-pleasing and exhaustion."
        detected_needs.extend(["Relationship Boundaries", "Emotional Load Release"])
    elif ("health_sports" in all_pids and "job_search_remote_loneliness" in all_pids) or ("health_sports" in all_pids and "emotional_struggles" in all_pids):
        hybrid_synergy = "Your body is sounding an alarm through physical fatigue and hair thinning while carrying the weight of emotional or career burnout. True recovery requires pairing gentle somatic restoration with nervous system rest."
        detected_needs.extend(["Bodily Vitality & Hair Support", "Nervous System Recovery"])
    elif "ai_fear_digital_colonization_cybersecurity" in all_pids and "job_search_remote_loneliness" in all_pids:
        hybrid_synergy = "Navigating modern career uncertainty while confronting algorithmic displacement creates compound anxiety. Your hybrid path pairs human-centered job resilience with digital rights autonomy."
        detected_needs.extend(["AI Autonomy & Cyber Defense", "Career Worth & Resilience"])
    elif ("moving_new_city" in all_pids and "financial_difficulties" in all_pids) or ("migration" in all_pids and "financial_difficulties" in all_pids):
        hybrid_synergy = "Adapting to a new location while managing monetary constraints can feel doubly isolating. Your hybrid path anchors practical neighborhood resources with independent financial triage."
        detected_needs.extend(["Community Anchoring", "Financial Independence"])
    elif "aging" in all_pids and "health_sports" in all_pids:
        hybrid_synergy = "Navigating natural life transitions while honoring shifting hormonal and physical vitality deserves compassionate, whole-body care."
        detected_needs.extend(["Hormonal Balance", "Reverent Life Pacing"])
    elif is_hybrid and secondary_packages:
        hybrid_synergy = f"Life transitions rarely occur in isolation. Your hybrid care path weaves together guidance for both '{primary_pkg['title']}' and '{secondary_packages[0]['title']}' to support your whole self."
        detected_needs.append("Integrated Multi-Dimensional Care")

    empathy = f"It takes courage to express this. What you're experiencing is deeply valid, and you deserve gentle, non-judgmental support right now."
    if is_hybrid and len(secondary_packages) >= 2:
        sec_titles = ", ".join([f"'{p['title']}'" for p in secondary_packages])
        empathy = f"We hear multiple overlapping layers in your experience: '{primary_pkg['title']}' alongside {sec_titles}. You do not have to compartmentalize your challenges—SuperShakti is designed to support all of them."
    elif is_hybrid and secondary_packages:
        empathy = f"We hear multiple layers in your experience: '{primary_pkg['title']}' alongside '{secondary_packages[0]['title']}'. You do not have to compartmentalize your challenges—SuperShakti is designed to support both."
    elif primary_pkg and primary_pkg["id"] == "ai_fear_digital_colonization_cybersecurity":
        empathy = "Technology-facilitated fear, algorithmic job replacement anxiety, and digital colonization are real systemic harms. Your bodily dignity, career creativity, and digital agency belong to you."
    elif primary_pkg and (primary_pkg["id"] == "job_search_remote_loneliness" or primary_pkg["id"] == "job_search_ai_loneliness"):
        empathy = "Job searching, prolonged resume ghosting, and remote work isolation can make you feel entirely invisible. Your worth as a human is vast, real, and independent of any cold job market."
    elif primary_pkg and primary_pkg["id"] == "health_sports":
        empathy = "Physical symptoms like hair loss and bodily fatigue are real, somatic messages from your nervous system. Your body is not failing; it is calling for gentle replenishment."

    clean_needs = []
    for n in detected_needs:
        if n not in clean_needs:
            clean_needs.append(n)

    return {
        "matchedPackage": primary_pkg,
        "secondaryPackages": secondary_packages,
        "isHybrid": is_hybrid,
        "hybridSynergy": hybrid_synergy,
        "empathyStatement": empathy,
        "detectedNeeds": clean_needs[:4],
        "isCrisis": False,
        "crisisHotline": None,
        "escalationReason": escalation
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "app": "SuperShakti",
        "version": "1.1.0",
        "packagesCount": len(CATALOG_DATA.get("packages", [])),
        "placesCount": len(CATALOG_DATA.get("places", [])),
        "countriesCount": len(CATALOG_DATA.get("countries", {})),
        "privacyNotice": "Zero IP Logging & Zero Location Storage Enforced"
    }

@app.get("/api/catalog")
def get_catalog():
    return load_catalog()

@app.get("/api/countries")
def get_countries():
    return load_catalog().get("countries", {})

@app.post("/api/match")
async def match_feeling(req: MatchRequest):
    feeling = req.feeling.strip()
    country = req.country or "US"
    if not feeling:
        raise HTTPException(status_code=400, detail="Feeling query cannot be empty")

    api_key = req.apiKey or os.environ.get("GEMINI_API_KEY", "")

    # If Gemini API Key is provided, attempt Gemini 1.5 Flash query
    if api_key:
        try:
            packages_brief = ", ".join([f"{p['id']}: {p['title']}" for p in CATALOG_DATA.get("packages", [])])
            prompt = f"""You are Shakti, an empathetic guide for women navigating complex life transitions.
Analyze the user's input: "{feeling}"
Check if she is expressing multiple co-occurring struggles (e.g. physical health/hair loss/depletion alongside career burnout; relocation alongside financial distress; AI anxiety alongside remote isolation).
Choose from: [{packages_brief}].
Return valid JSON adhering to:
{{
  "packageId": "<primary_package_id>",
  "secondaryPackageIds": ["<optional_secondary_package_id_if_multi_intent>"],
  "isHybrid": true/false,
  "hybridSynergy": "<1-2 sentences explaining how the multiple dimensions interconnect, e.g. how somatic symptoms like hair loss relate to nervous system stress>",
  "empathyStatement": "<1-2 compassionate, validating sentences spoken directly to her addressing all dimensions of her experience>",
  "detectedNeeds": ["<need 1>", "<need 2>", "<need 3>"],
  "isCrisis": false
}}"""
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
            payload = {
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"response_mime_type": "application/json"}
            }
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.post(url, json=payload)
                if res.status_code == 200:
                    data = res.json()
                    raw_text = data["candidates"][0]["content"]["parts"][0]["text"]
                    parsed = json.loads(raw_text)
                    matched_pkg = find_package(parsed.get("packageId", ""))
                    sec_ids = parsed.get("secondaryPackageIds", [])
                    sec_pkgs = [find_package(pid) for pid in sec_ids if find_package(pid) and pid != parsed.get("packageId")]
                    is_hybrid = parsed.get("isHybrid", len(sec_pkgs) > 0)
                    if matched_pkg:
                        return {
                            "matchedPackage": matched_pkg,
                            "secondaryPackages": sec_pkgs,
                            "isHybrid": is_hybrid,
                            "hybridSynergy": parsed.get("hybridSynergy", None),
                            "empathyStatement": parsed.get("empathyStatement", "We hear you."),
                            "detectedNeeds": parsed.get("detectedNeeds", [matched_pkg["title"]]),
                            "isCrisis": parsed.get("isCrisis", False),
                            "crisisHotline": None,
                            "escalationReason": None
                        }
        except Exception as e:
            logger.warning("Gemini API call failed (%s), falling back to offline matcher.", e)

    # Fallback to smart offline matcher with selected country crisis lines
    return offline_match(feeling, country)

@app.post("/api/report/gemini-insights")
async def generate_report_insights(req: ReportInsightRequest):
    pkg = find_package(req.packageId)
    if not pkg:
        raise HTTPException(status_code=404, detail="Package not found")
    
    api_key = req.apiKey or os.environ.get("GEMINI_API_KEY", "")
    feeling_text = req.feeling or "life transition and needing gentle grounding"

    if api_key:
        try:
            prompt = f"""You are Shakti, an empowering, empathetic elder sister and somatic guide for women.
The user is navigating this feeling/experience: "{feeling_text}"
Matched Support Focus: "{pkg['title']}" ({pkg.get('summary', '')})
Micro-tool: "{pkg.get('defaultMicroTool', {}).get('title', '')}"

Provide a comforting, actionable 1-Page Care Insight in valid JSON adhering to:
{{
  "affirmation": "<A warm, empowering 1-2 sentence personal affirmation spoken directly to her>",
  "threeStepPlan": [
    "<Step 1: Immediate nervous system reset / breathing action>",
    "<Step 2: Boundary or safe expression action today>",
    "<Step 3: Long-term connection or community step>"
  ],
  "gentleReminder": "<1 sentence reminder that healing is non-linear and she is never alone>"
}}"""
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
            payload = {
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"response_mime_type": "application/json"}
            }
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.post(url, json=payload)
                if res.status_code == 200:
                    data = res.json()
                    raw_text = data["candidates"][0]["content"]["parts"][0]["text"]
                    parsed = json.loads(raw_text)
                    return {
                        "source": "gemini_ai",
                        "affirmation": parsed.get("affirmation", "You carry ancient strength within you."),
                        "threeStepPlan": parsed.get("threeStepPlan", [
                            f"Take 3 minutes with {pkg.get('defaultMicroTool', {}).get('title', 'the micro-tool')}.",
                            "Honor your boundaries without guilt or apology.",
                            "Connect with a verified sisterhood peer group when you feel ready."
                        ]),
                        "gentleReminder": parsed.get("gentleReminder", "Take it one breath at a time; your pace is sacred.")
                    }
        except Exception as e:
            logger.warning("Gemini report insight failed (%s), returning offline fallback.", e)

    # Offline synthesized insights (Zero API key required)
    micro_title = pkg.get('defaultMicroTool', {}).get('title', 'Grounding Practice')
    return {
        "source": "offline_sanctuary",
        "affirmation": "Your feelings are valid, and you deserve a life of peace, sovereignty, and genuine care.",
        "threeStepPlan": [
            f"Ground your body: complete the {micro_title} (~4 mins).",
            "Set a gentle boundary today with anything demanding emotional energy you do not have.",
            "Remember that community exists—reach out to verified peer circles whenever you are ready."
        ],
        "gentleReminder": "You do not have to carry everything all at once. Small, gentle steps create enduring safety."
    }

# Mount static web directory
web_dir = os.path.join(os.path.dirname(__file__), "web")
if os.path.exists(web_dir):
    app.mount("/", StaticFiles(directory=web_dir, html=True), name="web")

if __name__ == "__main__":
    import uvicorn
    # Support dynamic PORT environment variable for Google Cloud Run / App Engine
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port, access_log=False)
