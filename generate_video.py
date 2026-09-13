import os
import sys
import math
import struct
import wave
import textwrap
import subprocess
from pathlib import Path

# Ensure UTF-8 output on Windows terminal
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

from PIL import Image, ImageDraw, ImageFont, ImageFilter

BASE_DIR = Path(r"c:\Users\heena\Downloads\supershaki")
OUTPUT_DIR = BASE_DIR / "video_build"
OUTPUT_DIR.mkdir(exist_ok=True)

FINAL_OUTPUT = BASE_DIR / "supershakti_showcase_2min.mp4"
FFMPEG = r"C:\ProgramData\chocolatey\bin\ffmpeg.exe"

# Total duration: exactly 120.0 seconds
SCENES = [
    {
        "id": 1,
        "duration": 13.5,
        "category": "THE CHALLENGE",
        "title": "Facing Life's Toughest Moments Alone",
        "subtitle": "Millions of women navigate silent struggles with zero accessible support",
        "highlights": [
            ("Overwhelming Life Transitions", "Postpartum, divorce, sudden grief, or burnout left untreated."),
            ("Fragmented & Costly Care", "Weeks-long waitlists, expensive sessions, and sterile medical intake forms."),
            ("Critical Lack of Privacy", "Fear of judgment or domestic surveillance prevents asking for help.")
        ],
        "narration": "Every day, millions of women face life-altering transitions, anxiety, emotional burnout, or crisis, often feeling isolated and unsure where to turn. Finding safe, judgment-free support shouldn't feel impossible.",
        "side_type": "problem_card"
    },
    {
        "id": 2,
        "duration": 13.5,
        "category": "THE SOLUTION",
        "title": "Introducing SuperShakti",
        "subtitle": "A Feeling-First Women's Sanctuary & Compassionate Support Ecosystem",
        "highlights": [
            ("Feeling-First Philosophy", "Starts with your human emotion, not diagnostic labels or questionnaires."),
            ("3-Tier Holistic Support", "Immediate browser micro-tools, lived-experience peer buddies, and vetted specialists."),
            ("Zero-Tracking Safe Space", "Strict local-only storage, zero IP logging, and instant discreet safety exits.")
        ],
        "narration": "Meet SuperShakti: a feeling-first women's sanctuary and support ecosystem designed to provide immediate care, compassionate sisterhood, and vetted professional help, all in one secure, private place.",
        "side_type": "hero_brand"
    },
    {
        "id": 3,
        "duration": 14.5,
        "category": "INNOVATION • SMART MATCHING",
        "title": "Feeling-First Care Matcher",
        "subtitle": "Compassionate AI and smart logic that understands what you are going through",
        "highlights": [
            ("Emotion-Led Selection", "Choose how you feel right now: Overwhelmed, Grieving, Anxious, or Rebuilding."),
            ("Dual Intelligence Engine", "Fast offline matching logic combined with Gemini 1.5 Flash empathy analysis."),
            ("Instant 360-Degree Care Plan", "Immediate personalized tools, community spaces, and counselors in under 1 second.")
        ],
        "narration": "Instead of cold menus or tedious questionnaires, SuperShakti begins with pure empathy: How are you feeling right now? Powered by smart matching and Gemini AI, it instantly surfaces personalized resources tailored to your exact emotional state.",
        "side_type": "matcher_preview"
    },
    {
        "id": 4,
        "duration": 14.0,
        "category": "TIER 1 • IMMEDIATE RELIEF",
        "title": "Instant Self-Care Micro-Tools",
        "subtitle": "Evidence-based somatic calming and emotional regulation within seconds",
        "highlights": [
            ("4-4-6 Vagus Nerve Breathing", "Animated pacing timer that immediately calms your nervous system and heart rate."),
            ("5-4-3-2-1 Sensory Grounding", "Interactive checklist to halt panic attacks and restore mindful presence."),
            ("Copyable Boundary Scripts", "Pre-written, trauma-informed scripts for tough conversations and personal boundaries.")
        ],
        "narration": "Tier 1 delivers instant relief right in your browser: guided 4-4-6 vagus nerve breathing to lower stress hormones, 5-4-3-2-1 grounding routines, and copyable communication scripts for setting firm, healthy boundaries.",
        "side_type": "breathing_demo"
    },
    {
        "id": 5,
        "duration": 13.5,
        "category": "TIER 2 • HUMAN CONNECTION",
        "title": "Peer Networks & Sisterhood",
        "subtitle": "Connect with women who have walked your exact path",
        "highlights": [
            ("Lived-Experience Buddies", "Browse vetted peer mentors who overcame postpartum, divorce, or career pivots."),
            ("1-Click Community Circles", "Join moderated discussion circles, girls groups, and healing sisterhood spaces."),
            ("Zero Fake Profiles", "Real community members verified through trusted nonprofit networks.")
        ],
        "narration": "Tier 2 connects you to real human empathy. Chat with vetted peer buddies who have walked your exact path, join one-click community circles, or participate in safe local sisterhood meetups where lived experience turns into collective strength.",
        "side_type": "peer_buddies"
    },
    {
        "id": 6,
        "duration": 14.0,
        "category": "TIER 3 • EXPERT CARE",
        "title": "Vetted Specialists & 24/7 Helplines",
        "subtitle": "Professional clinical help with transparent, sliding-scale pricing",
        "highlights": [
            ("Licensed Therapists & LMFTs", "Carefully vetted counselors with sliding-scale badges for affordable therapy."),
            ("Direct 24/7 Crisis Lifelines", "One-tap emergency call and text routing to 988, DV Hotlines, and Crisis Text Line."),
            ("Global National Coverage", "Automatic routing for US, Canada, UK, Australia, India, and European Union.")
        ],
        "narration": "When deeper support is needed, Tier 3 provides certified professional counselors with transparent sliding-scale fees, alongside direct, one-tap access to 24/7 national helplines including the 988 Lifeline and domestic violence shelters.",
        "side_type": "specialists_hotlines"
    },
    {
        "id": 7,
        "duration": 12.5,
        "category": "EXPLORE & DISCOVER",
        "title": "16 Curated Packages & Advice Map",
        "subtitle": "Holistic roadmaps for life milestones and interactive physical drop-in clinics",
        "highlights": [
            ("16 Specialized Packages", "Postpartum Healing, Burnout Recovery, Financial Autonomy, Grief & Divorce."),
            ("Interactive Leaflet Map", "Explore verified physical crisis clinics, women's centers, and free legal aid."),
            ("Printable Care Summary", "Generate a 1-page PDF-ready personal action plan with one tap.")
        ],
        "narration": "Explore 16 specialized care packages tackling everything from postpartum recovery to financial independence, and navigate our interactive Sanctuary Map to locate nearby physical drop-in clinics and resource centers.",
        "side_type": "packages_map"
    },
    {
        "id": 8,
        "duration": 14.0,
        "category": "PRIVACY & SECURITY",
        "title": "Uncompromising Safety & Quick Exit",
        "subtitle": "Engineered for complete personal sovereignty and domestic safety",
        "highlights": [
            ("Zero-Tracking Architecture", "No IP addresses stored, no GPS tracking, and no third-party analytics."),
            ("One-Tap Weather Disguise", "Instant curtain switches app to a realistic weather widget for discreet browsing."),
            ("My Sanctuary Local Vault", "Bookmarks, notes, and buddy connections stay strictly on your private device.")
        ],
        "narration": "Your safety is paramount. SuperShakti operates on a zero-tracking architecture with no IP logging. If someone walks into the room, one tap activates the Quick Exit weather disguise, protecting your privacy in an instant.",
        "side_type": "safety_curtain"
    },
    {
        "id": 9,
        "duration": 10.5,
        "category": "JOIN THE SISTERHOOD",
        "title": "SuperShakti • You Are Never Alone",
        "subtitle": "Empowering women with compassion, sisterhood, and instant care.",
        "highlights": [
            ("Free & Open Sanctuary", "Accessible to every woman worldwide with zero barriers."),
            ("Start Your Journey Today", "Visit SuperShakti and experience compassionate care.")
        ],
        "narration": "SuperShakti. You are never alone. Experience compassionate care today.",
        "side_type": "conclusion_badge"
    }
]

def synthesize_speech(text: str, output_wav: Path, rate: int = 0):
    """Synthesize speech using Windows PowerShell System.Speech.Synthesis."""
    clean_text = text.replace('"', '`"').replace("'", "''")
    ps_cmd = f"""
Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.SelectVoice("Microsoft Zira Desktop")
$synth.Rate = {rate}
$synth.SetOutputToWaveFile('{output_wav}')
$synth.Speak('{clean_text}')
$synth.Dispose()
"""
    cmd = ["powershell", "-NoProfile", "-NonInteractive", "-Command", ps_cmd]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        raise RuntimeError(f"Speech synthesis failed: {res.stderr}")

def get_wav_duration(wav_path: Path) -> float:
    with wave.open(str(wav_path), "rb") as wf:
        frames = wf.getnframes()
        rate = wf.getframerate()
        return frames / float(rate)

def pad_wav_to_duration(input_wav: Path, output_wav: Path, target_sec: float):
    with wave.open(str(input_wav), "rb") as wf:
        params = wf.getparams()
        nchannels = params.nchannels
        sampwidth = params.sampwidth
        framerate = params.framerate
        nframes = params.nframes
        data = wf.readframes(nframes)

    current_sec = nframes / float(framerate)
    if current_sec >= target_sec:
        target_frames = int(target_sec * framerate)
        data = data[:target_frames * nchannels * sampwidth]
        with wave.open(str(output_wav), "wb") as wf:
            wf.setparams((nchannels, sampwidth, framerate, target_frames, params.comptype, params.compname))
            wf.writeframes(data)
    else:
        needed_frames = int((target_sec - current_sec) * framerate)
        silence_bytes = b'\x00' * (needed_frames * nchannels * sampwidth)
        with wave.open(str(output_wav), "wb") as wf:
            wf.setparams((nchannels, sampwidth, framerate, nframes + needed_frames, params.comptype, params.compname))
            wf.writeframes(data)
            wf.writeframes(silence_bytes)

def generate_ambient_bgm(output_wav: Path, duration_sec: float = 120.0):
    """Synthesizes a serene, warm, gentle ambient musical background chord pad."""
    framerate = 44100
    total_frames = int(duration_sec * framerate)
    
    chords = [
        [110.0, 164.81, 220.0, 277.18, 329.63], # A major
        [92.50, 146.83, 185.0, 220.0, 293.66],  # F# minor 7
        [146.83, 220.0, 293.66, 369.99, 440.0], # D major 9
        [164.81, 246.94, 329.63, 392.00, 493.88]# E major add9
    ]
    chord_duration = 15.0
    
    samples = []
    for i in range(total_frames):
        t = i / float(framerate)
        chord_idx = int((t / chord_duration) % len(chords))
        freqs = chords[chord_idx]
        
        local_t = t % chord_duration
        fade_len = 2.0
        env = 1.0
        if local_t < fade_len:
            env = 0.5 * (1.0 - math.cos(math.pi * local_t / fade_len))
        elif local_t > (chord_duration - fade_len):
            env = 0.5 * (1.0 + math.cos(math.pi * (local_t - (chord_duration - fade_len)) / fade_len))
        
        master_env = 1.0
        if t < 2.5:
            master_env = t / 2.5
        elif t > (duration_sec - 3.5):
            master_env = max(0.0, (duration_sec - t) / 3.5)
            
        lfo = 0.85 + 0.15 * math.sin(2 * math.pi * 0.25 * t)
        
        val = 0.0
        for f_idx, f in enumerate(freqs):
            weight = 1.0 / (f_idx + 1.2)
            val += weight * math.sin(2 * math.pi * f * t)
            
        final_amp = val * env * master_env * lfo * 0.12
        sample_val = int(max(-32767, min(32767, final_amp * 32767)))
        samples.append(sample_val)
        
    with wave.open(str(output_wav), "wb") as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(framerate)
        packed = bytearray()
        for s in samples:
            packed.extend(struct.pack("<hh", s, s))
        wf.writeframes(packed)

def get_font(size: int, bold: bool = False):
    font_path = "C:\\Windows\\Fonts\\segoeuib.ttf" if bold else "C:\\Windows\\Fonts\\segoeui.ttf"
    try:
        return ImageFont.truetype(font_path, size)
    except Exception:
        return ImageFont.load_default()

def draw_rounded_rect(draw, box, radius, fill, outline=None, width=1):
    x0, y0, x1, y1 = box
    draw.rounded_rectangle([x0, y0, x1, y1], radius=radius, fill=fill, outline=outline, width=width)

def render_scene_image(scene: dict, scene_idx: int, elapsed_start: float) -> Path:
    width, height = 1920, 1080
    img = Image.new("RGBA", (width, height), (15, 12, 35, 255))
    draw = ImageDraw.Draw(img)

    for y in range(height):
        ratio = y / float(height)
        r = int(18 + (38 - 18) * ratio)
        g = int(14 + (18 - 14) * ratio)
        b = int(45 + (65 - 45) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))

    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse([width - 600, -200, width + 400, 600], fill=(124, 58, 237, 35))
    glow_draw.ellipse([-200, height - 500, 500, height + 200], fill=(236, 72, 153, 30))
    glow_draw.ellipse([800, 200, 1600, 900], fill=(245, 158, 11, 15))
    glow = glow.filter(ImageFilter.GaussianBlur(90))
    img = Image.alpha_composite(img, glow)
    draw = ImageDraw.Draw(img)

    total_time = 120.0
    progress_ratio = min(1.0, (elapsed_start + scene["duration"]) / total_time)
    draw.rectangle([0, 0, width, 6], fill=(30, 27, 75, 255))
    draw.rectangle([0, 0, int(width * progress_ratio), 6], fill=(236, 72, 153, 255))

    logo_path = BASE_DIR / "web" / "assets" / "supershaki_logo.jpg"
    if logo_path.exists():
        try:
            logo_img = Image.open(logo_path).convert("RGBA").resize((56, 56), Image.Resampling.LANCZOS)
            mask = Image.new("L", (56, 56), 0)
            ImageDraw.Draw(mask).ellipse([0, 0, 56, 56], fill=255)
            img.paste(logo_img, (80, 25), mask)
            draw.ellipse([78, 23, 138, 83], outline=(245, 158, 11, 220), width=2)
        except Exception:
            pass

    font_brand = get_font(26, bold=True)
    font_tagline = get_font(15, bold=False)
    draw.text((150, 27), "SuperShakti", font=font_brand, fill=(255, 255, 255, 255))
    draw.text((150, 58), "Women's Sanctuary & Care Ecosystem", font=font_tagline, fill=(196, 181, 253, 240))

    font_time = get_font(17, bold=True)
    mins = int(elapsed_start // 60)
    secs = int(elapsed_start % 60)
    time_str = f"TIME: {mins:02d}:{secs:02d} / 02:00"
    draw_rounded_rect(draw, [width - 330, 30, width - 80, 75], radius=22, fill=(30, 27, 75, 200), outline=(139, 92, 246, 120), width=1)
    draw.text((width - 310, 42), time_str, font=font_time, fill=(244, 244, 245, 255))

    scene_str = f"Scene {scene_idx + 1} of {len(SCENES)}"
    draw_rounded_rect(draw, [width - 500, 30, width - 345, 75], radius=22, fill=(88, 28, 135, 150), outline=(216, 180, 254, 80), width=1)
    draw.text((width - 485, 42), scene_str, font=get_font(16, bold=True), fill=(233, 213, 255, 255))

    draw.line([(80, 100), (width - 80, 100)], fill=(255, 255, 255, 30), width=1)

    draw_rounded_rect(draw, [80, 130, 80 + len(scene["category"]) * 14 + 30, 168], radius=8, fill=(124, 58, 237, 200))
    draw.text((95, 138), scene["category"], font=get_font(15, bold=True), fill=(255, 255, 255, 255))

    font_title = get_font(44, bold=True)
    draw.text((80, 185), scene["title"], font=font_title, fill=(255, 255, 255, 255))

    font_sub = get_font(22, bold=False)
    draw.text((80, 245), scene["subtitle"], font=font_sub, fill=(216, 180, 254, 255))

    start_y = 310
    card_h = 135
    gap_y = 22
    for h_idx, (h_title, h_desc) in enumerate(scene["highlights"]):
        y_pos = start_y + h_idx * (card_h + gap_y)
        draw_rounded_rect(draw, [80, y_pos, 980, y_pos + card_h], radius=16, fill=(24, 20, 56, 210), outline=(139, 92, 246, 70), width=1)
        
        badge_colors = [(236, 72, 153), (124, 58, 237), (13, 148, 136)]
        draw.ellipse([105, y_pos + 26, 155, y_pos + 76], fill=badge_colors[h_idx % 3])
        draw.text((120, y_pos + 33), str(h_idx + 1), font=get_font(26, bold=True), fill=(255, 255, 255, 255))
        
        draw.text((175, y_pos + 22), h_title, font=get_font(23, bold=True), fill=(255, 255, 255, 255))
        desc_font = get_font(17, bold=False)
        draw.text((175, y_pos + 62), h_desc, font=desc_font, fill=(209, 213, 219, 240))

    rx0, ry0, rx1, ry1 = 1040, 130, width - 80, 770
    draw_rounded_rect(draw, [rx0, ry0, rx1, ry1], radius=24, fill=(18, 14, 44, 220), outline=(168, 85, 247, 90), width=2)

    stype = scene["side_type"]
    if stype == "problem_card":
        draw.text((rx0 + 40, ry0 + 45), "THE REALITY FOR WOMEN", font=get_font(20, bold=True), fill=(244, 63, 94, 255))
        draw.text((rx0 + 40, ry0 + 85), "84% of Women Hesitate", font=get_font(36, bold=True), fill=(255, 255, 255, 255))
        draw.text((rx0 + 40, ry0 + 135), "to seek help during deep crises due to:", font=get_font(20, bold=False), fill=(209, 213, 219, 240))

        reasons = [
            ("Fear of Domestic Surveillance", "Phones and browser history inspected at home."),
            ("Cost & Bureaucracy", "Average therapy cost $150+/hr without insurance."),
            ("Stigma & Shame", "Societal pressure to appear 'strong and holding it together'."),
            ("Isolation & Loneliness", "Belief that nobody truly understands their exact pain.")
        ]
        for r_i, (rt, rd) in enumerate(reasons):
            box_y = ry0 + 190 + r_i * 105
            draw_rounded_rect(draw, [rx0 + 35, box_y, rx1 - 35, box_y + 88], radius=12, fill=(30, 22, 60, 220), outline=(244, 63, 94, 60), width=1)
            draw.text((rx0 + 55, box_y + 16), f"[!]  {rt}", font=get_font(20, bold=True), fill=(253, 164, 175, 255))
            draw.text((rx0 + 55, box_y + 48), rd, font=get_font(15, bold=False), fill=(229, 231, 235, 220))

    elif stype == "hero_brand":
        hero_path = BASE_DIR / "web" / "assets" / "hero_women_support.jpg"
        if hero_path.exists():
            try:
                hero = Image.open(hero_path).convert("RGBA").resize((rx1 - rx0 - 60, 360), Image.Resampling.LANCZOS)
                mask = Image.new("L", (rx1 - rx0 - 60, 360), 0)
                ImageDraw.Draw(mask).rounded_rectangle([0, 0, rx1 - rx0 - 60, 360], radius=16, fill=255)
                img.paste(hero, (rx0 + 30, ry0 + 30), mask)
            except Exception:
                pass
        
        draw_rounded_rect(draw, [rx0 + 30, ry0 + 410, rx1 - 30, ry1 - 30], radius=16, fill=(28, 22, 64, 240), outline=(245, 158, 11, 100), width=1)
        draw.text((rx0 + 55, ry0 + 430), "OUR SACRED MISSION", font=get_font(18, bold=True), fill=(245, 158, 11, 255))
        draw.text((rx0 + 55, ry0 + 465), "No woman should ever have to heal alone.", font=get_font(26, bold=True), fill=(255, 255, 255, 255))
        draw.text((rx0 + 55, ry0 + 510), "SuperShakti brings together instant nervous-system relief,\nvetted sisterhood peer buddies, and accredited counselors\nin a zero-surveillance sanctuary.", font=get_font(18, bold=False), fill=(216, 180, 254, 240))

    elif stype == "matcher_preview":
        draw.text((rx0 + 40, ry0 + 40), "FEELING-FIRST INTELLIGENCE", font=get_font(18, bold=True), fill=(236, 72, 153, 255))
        draw.text((rx0 + 40, ry0 + 75), "How are you feeling right now?", font=get_font(30, bold=True), fill=(255, 255, 255, 255))
        
        emotions = [
            ("Overwhelmed & Burnt Out", "High Stress", (239, 68, 68)),
            ("Anxious & Panicked", "Rapid Heartbeat", (245, 158, 11)),
            ("Heartbroken / Grieving", "Loss & Pain", (236, 72, 153)),
            ("Postpartum & Lonely", "New Motherhood", (168, 85, 247)),
            ("Seeking Career Clarity", "Big Transition", (13, 148, 136)),
            ("Relationship Safety", "Need Exit Plan", (59, 130, 246))
        ]
        
        cols = 2
        chip_w = (rx1 - rx0 - 90) // cols
        chip_h = 95
        for e_i, (etitle, ebadge, ecolor) in enumerate(emotions):
            c = e_i % cols
            r = e_i // cols
            cx = rx0 + 35 + c * (chip_w + 20)
            cy = ry0 + 130 + r * (chip_h + 16)
            
            border_col = (236, 72, 153, 255) if e_i == 0 else (139, 92, 246, 80)
            fill_col = (48, 25, 75, 240) if e_i == 0 else (24, 18, 52, 220)
            draw_rounded_rect(draw, [cx, cy, cx + chip_w, cy + chip_h], radius=14, fill=fill_col, outline=border_col, width=2 if e_i==0 else 1)
            
            draw.text((cx + 18, cy + 18), etitle, font=get_font(19, bold=True), fill=(255, 255, 255, 255))
            draw.text((cx + 18, cy + 54), f"• {ebadge}", font=get_font(15, bold=False), fill=ecolor)

        draw_rounded_rect(draw, [rx0 + 35, ry0 + 480, rx1 - 35, ry1 - 30], radius=14, fill=(16, 36, 50, 220), outline=(13, 148, 136, 120), width=1)
        draw.text((rx0 + 60, ry0 + 505), "Gemini 1.5 Flash Empathy Matcher", font=get_font(20, bold=True), fill=(45, 212, 191, 255))
        draw.text((rx0 + 60, ry0 + 540), "Translates raw emotional prompts into exact clinical micro-tools,\npeer matches, and local support groups in under 500ms.", font=get_font(16, bold=False), fill=(204, 251, 241, 220))

    elif stype == "breathing_demo":
        draw.text((rx0 + 40, ry0 + 40), "VAGUS NERVE CALMING", font=get_font(18, bold=True), fill=(13, 148, 136, 255))
        draw.text((rx0 + 40, ry0 + 75), "4-4-6 Somatic Breathing Engine", font=get_font(30, bold=True), fill=(255, 255, 255, 255))
        
        center_x = (rx0 + rx1) // 2
        center_y = ry0 + 260
        radii = [130, 95, 60]
        colors = [(13, 148, 136, 40), (13, 148, 136, 90), (20, 184, 166, 220)]
        for r_val, c_val in zip(radii, colors):
            draw.ellipse([center_x - r_val, center_y - r_val, center_x + r_val, center_y + r_val], fill=c_val)
        draw.text((center_x - 55, center_y - 20), "INHALE", font=get_font(28, bold=True), fill=(255, 255, 255, 255))
        draw.text((center_x - 30, center_y + 15), "4 sec", font=get_font(18, bold=False), fill=(204, 251, 241, 240))
        
        steps = [
            ("Inhale 4s", "Nose breath deeply", (13, 148, 136)),
            ("Hold 4s", "Oxygenate blood", (245, 158, 11)),
            ("Exhale 6s", "Stimulate vagus nerve", (236, 72, 153))
        ]
        step_w = (rx1 - rx0 - 80) // 3
        for s_i, (st, sd, sc) in enumerate(steps):
            sx = rx0 + 35 + s_i * (step_w + 10)
            sy = ry0 + 430
            draw_rounded_rect(draw, [sx, sy, sx + step_w, sy + 100], radius=12, fill=(24, 20, 56, 220), outline=sc, width=1)
            draw.text((sx + 15, sy + 18), st, font=get_font(18, bold=True), fill=(255, 255, 255, 255))
            draw.text((sx + 15, sy + 52), sd, font=get_font(14, bold=False), fill=sc)

        draw_rounded_rect(draw, [rx0 + 35, ry0 + 550, rx1 - 35, ry1 - 25], radius=12, fill=(30, 25, 65, 220), outline=(139, 92, 246, 80), width=1)
        draw.text((rx0 + 55, ry0 + 565), "[Vault] 5-4-3-2-1 Grounding Routine & Script Vault Included", font=get_font(18, bold=True), fill=(245, 243, 255, 255))

    elif stype == "peer_buddies":
        draw.text((rx0 + 40, ry0 + 40), "LIVED-EXPERIENCE SISTERHOOD", font=get_font(18, bold=True), fill=(168, 85, 247, 255))
        draw.text((rx0 + 40, ry0 + 75), "Vetted Peer Support Mentors", font=get_font(30, bold=True), fill=(255, 255, 255, 255))
        
        buddies = [
            ("Priya Sharma", "Postpartum & New Motherhood", "Overcame severe postpartum anxiety; guided 80+ new moms.", "1-Click Intro"),
            ("Elena Rostova", "Career Burnout & Toxic Workplaces", "Tech executive turned holistic coach; career boundaries.", "Connect Safely"),
            ("Maya Johnson", "Divorce, Grief & Rebuilding", "Single mother of 2; legal navigation & emotional rebirth.", "Send Intro")
        ]
        for b_i, (bname, brole, bdesc, bbtn) in enumerate(buddies):
            by = ry0 + 130 + b_i * 145
            draw_rounded_rect(draw, [rx0 + 35, by, rx1 - 35, by + 130], radius=14, fill=(28, 20, 58, 220), outline=(168, 85, 247, 80), width=1)
            
            draw.ellipse([rx0 + 55, by + 20, rx0 + 125, by + 90], fill=(124, 58, 237, 200), outline=(245, 158, 11, 200), width=2)
            draw.text((rx0 + 75, by + 35), bname[0], font=get_font(32, bold=True), fill=(255, 255, 255, 255))
            
            draw.text((rx0 + 145, by + 20), bname, font=get_font(21, bold=True), fill=(255, 255, 255, 255))
            draw.text((rx0 + 145, by + 48), brole, font=get_font(15, bold=True), fill=(245, 158, 11, 255))
            draw.text((rx0 + 145, by + 74), bdesc, font=get_font(14, bold=False), fill=(209, 213, 219, 240))
            
            draw_rounded_rect(draw, [rx1 - 170, by + 25, rx1 - 50, by + 68], radius=8, fill=(124, 58, 237, 220))
            draw.text((rx1 - 158, by + 36), bbtn, font=get_font(14, bold=True), fill=(255, 255, 255, 255))

        draw_rounded_rect(draw, [rx0 + 35, ry0 + 580, rx1 - 35, ry1 - 25], radius=12, fill=(16, 40, 30, 220), outline=(34, 197, 94, 80), width=1)
        draw.text((rx0 + 55, ry0 + 595), "[OK] Zero Fake Profiles • Verified Non-Profit Sisterhoods", font=get_font(18, bold=True), fill=(74, 222, 128, 255))

    elif stype == "specialists_hotlines":
        draw.text((rx0 + 40, ry0 + 40), "ACCREDITED CLINICAL CARE", font=get_font(18, bold=True), fill=(59, 130, 246, 255))
        draw.text((rx0 + 40, ry0 + 75), "Vetted Counselors & Helplines", font=get_font(30, bold=True), fill=(255, 255, 255, 255))
        
        draw_rounded_rect(draw, [rx0 + 35, ry0 + 130, rx1 - 35, ry0 + 290], radius=14, fill=(24, 28, 62, 220), outline=(59, 130, 246, 90), width=1)
        draw.text((rx0 + 55, ry0 + 150), "Dr. Sarah Lin, LMFT", font=get_font(24, bold=True), fill=(255, 255, 255, 255))
        draw.text((rx0 + 55, ry0 + 185), "Specialty: Trauma Recovery, Somatic Experiencing, Family Systems", font=get_font(16, bold=False), fill=(191, 219, 254, 240))
        
        draw_rounded_rect(draw, [rx0 + 55, ry0 + 225, rx0 + 245, ry0 + 265], radius=6, fill=(30, 58, 138, 200))
        draw.text((rx0 + 70, ry0 + 235), "Sliding Scale: $30-$80", font=get_font(15, bold=True), fill=(147, 197, 253, 255))
        
        draw_rounded_rect(draw, [rx0 + 260, ry0 + 225, rx0 + 420, ry0 + 265], radius=6, fill=(6, 78, 59, 200))
        draw.text((rx0 + 275, ry0 + 235), "Telehealth Verified", font=get_font(15, bold=True), fill=(110, 231, 183, 255))

        draw_rounded_rect(draw, [rx0 + 35, ry0 + 315, rx1 - 35, ry1 - 25], radius=14, fill=(50, 18, 30, 220), outline=(244, 63, 94, 90), width=1)
        draw.text((rx0 + 55, ry0 + 335), "DIRECT 24/7 EMERGENCY LIFELINES", font=get_font(19, bold=True), fill=(253, 164, 175, 255))
        
        lines = [
            ("988 Suicide & Crisis Lifeline", "Call or Text 988 • 24/7 • Free & Confidential"),
            ("National Domestic Violence Hotline", "Call 1-800-799-SAFE (7233) • Or Text 'START' to 88788"),
            ("Crisis Text Line", "Text HOME to 741741 to connect with a crisis counselor")
        ]
        for l_i, (ltitle, ldetail) in enumerate(lines):
            ly = ry0 + 380 + l_i * 68
            draw.text((rx0 + 55, ly), f"• {ltitle}", font=get_font(18, bold=True), fill=(255, 255, 255, 255))
            draw.text((rx0 + 80, ly + 28), ldetail, font=get_font(14, bold=False), fill=(254, 205, 211, 230))

    elif stype == "packages_map":
        draw.text((rx0 + 40, ry0 + 40), "COMMUNITY SANCTUARY", font=get_font(18, bold=True), fill=(245, 158, 11, 255))
        draw.text((rx0 + 40, ry0 + 75), "16 Packages & Advice Map", font=get_font(30, bold=True), fill=(255, 255, 255, 255))
        
        pkg_list = [
            ("Postpartum Bloom", "Nervous reset & lactation support"),
            ("Career Reboot", "Negotiation & burnout recovery"),
            ("Rebuilding After Split", "Custody, emotional healing & budget"),
            ("Grief Companion", "Gentle stages of loss navigation")
        ]
        pw = (rx1 - rx0 - 90) // 2
        for p_i, (pt, pd) in enumerate(pkg_list):
            px = rx0 + 35 + (p_i % 2) * (pw + 20)
            py = ry0 + 130 + (p_i // 2) * 110
            draw_rounded_rect(draw, [px, py, px + pw, py + 95], radius=12, fill=(28, 20, 56, 220), outline=(245, 158, 11, 80), width=1)
            draw.text((px + 16, py + 16), pt, font=get_font(18, bold=True), fill=(255, 255, 255, 255))
            draw.text((px + 16, py + 48), pd, font=get_font(14, bold=False), fill=(216, 180, 254, 220))

        draw_rounded_rect(draw, [rx0 + 35, ry0 + 370, rx1 - 35, ry1 - 25], radius=14, fill=(16, 30, 45, 230), outline=(13, 148, 136, 100), width=1)
        draw.text((rx0 + 55, ry0 + 395), "Interactive Leaflet Sanctuary Map", font=get_font(21, bold=True), fill=(45, 212, 191, 255))
        draw.text((rx0 + 55, ry0 + 435), "Find drop-in non-profit clinics, safe women's shelters,\nand free legal clinics. Zero location tracking, zero IP logs.", font=get_font(16, bold=False), fill=(204, 251, 241, 230))
        
        pins = ["Hope Valley Clinic (Drop-In)", "Haven Women's Shelter", "FairPath Legal Clinic"]
        for p_i, p_name in enumerate(pins):
            draw.text((rx0 + 75, ry0 + 500 + p_i * 35), f"• {p_name}", font=get_font(16, bold=True), fill=(255, 255, 255, 255))

    elif stype == "safety_curtain":
        draw.text((rx0 + 40, ry0 + 40), "PRIVACY BY DESIGN", font=get_font(18, bold=True), fill=(74, 222, 128, 255))
        draw.text((rx0 + 40, ry0 + 75), "Quick Safety Exit Disguise", font=get_font(30, bold=True), fill=(255, 255, 255, 255))
        
        draw_rounded_rect(draw, [rx0 + 35, ry0 + 130, rx1 - 35, ry0 + 350], radius=16, fill=(15, 23, 42, 240), outline=(56, 189, 248, 120), width=2)
        draw.text((rx0 + 60, ry0 + 155), "TODAY'S WEATHER", font=get_font(16, bold=True), fill=(56, 189, 248, 255))
        draw.text((rx0 + 60, ry0 + 190), "72°F", font=get_font(52, bold=True), fill=(255, 255, 255, 255))
        draw.text((rx0 + 220, ry0 + 205), "Partly Cloudy • Mild Breeze", font=get_font(22, bold=False), fill=(226, 232, 240, 240))
        draw.text((rx0 + 60, ry0 + 270), "Humidity: 48%  •  Wind: 6 mph  •  Precipitation: 0%", font=get_font(17, bold=False), fill=(148, 163, 184, 240))
        draw_rounded_rect(draw, [rx1 - 220, ry0 + 150, rx1 - 55, ry0 + 195], radius=8, fill=(14, 116, 144, 180))
        draw.text((rx1 - 205, ry0 + 162), "Disguise Active", font=get_font(15, bold=True), fill=(255, 255, 255, 255))

        draw_rounded_rect(draw, [rx0 + 35, ry0 + 375, rx1 - 35, ry1 - 25], radius=14, fill=(20, 35, 28, 220), outline=(34, 197, 94, 90), width=1)
        draw.text((rx0 + 55, ry0 + 395), "ZERO TRACKING ARCHITECTURE", font=get_font(20, bold=True), fill=(74, 222, 128, 255))
        guarantees = [
            "No IP Address or GPS Tracking Ever Logged",
            "No User Accounts Required For Instant Access",
            "Everything Saves Strictly on Your Local Browser Storage",
            "One-Tap Quick Exit Immediately Erases Tab State"
        ]
        for g_i, gt in enumerate(guarantees):
            draw.text((rx0 + 60, ry0 + 440 + g_i * 38), f"[OK]  {gt}", font=get_font(16, bold=False), fill=(240, 253, 244, 240))

    elif stype == "conclusion_badge":
        logo_path = BASE_DIR / "web" / "assets" / "supershaki_logo.jpg"
        if logo_path.exists():
            try:
                logo_img = Image.open(logo_path).convert("RGBA").resize((220, 220), Image.Resampling.LANCZOS)
                mask = Image.new("L", (220, 220), 0)
                ImageDraw.Draw(mask).ellipse([0, 0, 220, 220], fill=255)
                cx = (rx0 + rx1) // 2
                cy = ry0 + 180
                img.paste(logo_img, (cx - 110, cy - 110), mask)
                draw.ellipse([cx - 114, cy - 114, cx + 114, cy + 114], outline=(245, 158, 11, 255), width=4)
            except Exception:
                pass
        
        draw.text((rx0 + 80, ry0 + 330), "WELCOME TO SUPERSHAKTI", font=get_font(22, bold=True), fill=(245, 158, 11, 255))
        draw.text((rx0 + 80, ry0 + 375), "Your Sanctuary is Always Open.", font=get_font(34, bold=True), fill=(255, 255, 255, 255))
        
        draw_rounded_rect(draw, [rx0 + 80, ry0 + 460, rx1 - 80, ry0 + 540], radius=16, fill=(124, 58, 237, 255), outline=(236, 72, 153, 255), width=2)
        draw.text((rx0 + 130, ry0 + 482), "Enter SuperShakti Sanctuary  >>", font=get_font(24, bold=True), fill=(255, 255, 255, 255))

    # Bottom Narration Ticker
    draw_rounded_rect(draw, [80, 800, width - 80, 930], radius=18, fill=(20, 16, 48, 230), outline=(139, 92, 246, 60), width=1)
    draw_rounded_rect(draw, [105, 815, 225, 842], radius=6, fill=(236, 72, 153, 220))
    draw.text((118, 820), "VOICEOVER", font=get_font(13, bold=True), fill=(255, 255, 255, 255))
    
    # Clean text wrapping
    wrapped_narr = textwrap.fill(scene["narration"], width=92)
    font_narr = get_font(21, bold=False)
    draw.text((105, 850), f'"{wrapped_narr}"', font=font_narr, fill=(244, 244, 245, 255))

    # Global Emergency Bottom Bar
    draw_rounded_rect(draw, [80, 955, width - 80, 1030], radius=14, fill=(18, 14, 40, 240), outline=(255, 255, 255, 25), width=1)
    draw.text((105, 978), "Crisis Support: Call 911 (US/Canada) • 988 Lifeline • 999 (UK) • 112 (EU/India)", font=get_font(17, bold=True), fill=(254, 205, 211, 255))
    
    privacy_badge = "Zero-Tracking Sanctuary • No GPS or IP Stored"
    draw_rounded_rect(draw, [width - 530, 965, width - 105, 1015], radius=10, fill=(20, 45, 30, 220), outline=(34, 197, 94, 90), width=1)
    draw.text((width - 510, 978), privacy_badge, font=get_font(16, bold=True), fill=(74, 222, 128, 255))

    img_out = OUTPUT_DIR / f"scene_{scene_idx + 1:02d}.png"
    img.save(str(img_out), "PNG")
    return img_out

def main():
    print("=== SuperShakti 2-Minute Video Generator ===")
    total_target_time = sum(s["duration"] for s in SCENES)
    print(f"Total planned duration: {total_target_time:.1f} seconds (2:00)")

    scene_audios = []
    elapsed = 0.0
    scene_images = []

    for idx, scene in enumerate(SCENES):
        dur = scene["duration"]
        print(f"\n[Scene {idx + 1}/{len(SCENES)}] '{scene['title']}' ({dur}s)")
        
        img_path = render_scene_image(scene, idx, elapsed)
        scene_images.append(img_path)
        print(f"  - Rendered slide image: {img_path.name}")

        raw_wav = OUTPUT_DIR / f"speech_raw_{idx + 1:02d}.wav"
        padded_wav = OUTPUT_DIR / f"speech_padded_{idx + 1:02d}.wav"
        
        # Test rate 0, if duration exceeds allocated - 0.8s, increase rate
        rate = 0
        synthesize_speech(scene["narration"], raw_wav, rate=rate)
        raw_dur = get_wav_duration(raw_wav)
        
        if raw_dur > (dur - 0.8):
            rate = 1
            synthesize_speech(scene["narration"], raw_wav, rate=rate)
            raw_dur = get_wav_duration(raw_wav)
            if raw_dur > (dur - 0.5):
                rate = 2
                synthesize_speech(scene["narration"], raw_wav, rate=rate)
                raw_dur = get_wav_duration(raw_wav)

        print(f"  - Speech rate: {rate}, duration: {raw_dur:.2f}s (allocated: {dur}s)")
        
        pad_wav_to_duration(raw_wav, padded_wav, dur)
        final_dur = get_wav_duration(padded_wav)
        print(f"  - Padded audio duration: {final_dur:.2f}s")
        scene_audios.append(padded_wav)

        elapsed += dur

    scene_videos = []
    for idx, scene in enumerate(SCENES):
        img_path = scene_images[idx]
        wav_path = scene_audios[idx]
        dur = scene["duration"]
        vid_out = OUTPUT_DIR / f"scene_{idx + 1:02d}.mp4"
        
        print(f"  Encoding video segment {idx + 1} ({dur}s)...")
        cmd = [
            FFMPEG, "-y",
            "-loop", "1",
            "-i", str(img_path),
            "-i", str(wav_path),
            "-c:v", "libx264",
            "-tune", "stillimage",
            "-pix_fmt", "yuv420p",
            "-c:a", "aac",
            "-b:a", "192k",
            "-t", f"{dur:.2f}",
            "-shortest",
            str(vid_out)
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            print(res.stderr)
            raise RuntimeError(f"FFmpeg failed rendering scene {idx + 1}")
        scene_videos.append(vid_out)

    concat_list = OUTPUT_DIR / "concat_list.txt"
    with open(concat_list, "w", encoding="utf-8") as f:
        for vid in scene_videos:
            clean_p = str(vid).replace("\\", "/")
            f.write(f"file '{clean_p}'\n")

    raw_full_mp4 = OUTPUT_DIR / "full_video_voice.mp4"
    print("\nConcatenating scene videos into unified full presentation...")
    cmd_concat = [
        FFMPEG, "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", str(concat_list),
        "-c", "copy",
        str(raw_full_mp4)
    ]
    subprocess.run(cmd_concat, check=True)

    bgm_wav = OUTPUT_DIR / "ambient_bgm.wav"
    print("\nGenerating warm ambient background audio bed (120s)...")
    generate_ambient_bgm(bgm_wav, duration_sec=120.0)

    print(f"\nFinal assembly: mixing video, voiceover, and ambient music into {FINAL_OUTPUT.name}...")
    cmd_final = [
        FFMPEG, "-y",
        "-i", str(raw_full_mp4),
        "-i", str(bgm_wav),
        "-filter_complex",
        "[1:a]volume=0.18[bgm];[0:a][bgm]amix=inputs=2:duration=first:dropout_transition=2[aout]",
        "-map", "0:v",
        "-map", "[aout]",
        "-c:v", "copy",
        "-c:a", "aac",
        "-b:a", "192k",
        "-t", "120.0",
        str(FINAL_OUTPUT)
    ]
    subprocess.run(cmd_final, check=True)

    print("\nSUCCESS! 2-Minute Video Generated:")
    print(f"Path: {FINAL_OUTPUT}")
    print(f"Size: {FINAL_OUTPUT.stat().st_size / (1024*1024):.2f} MB")

if __name__ == "__main__":
    main()
