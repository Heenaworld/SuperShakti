<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/271e1a4a-d418-460e-856e-682d52b9f719

## Run Web Application Locally

In addition to the Android app, a complete web application is available in the `web/` directory.

### Quick Start:
Double-click `run_web.bat` or run:
```powershell
python -m uvicorn server:app --host 127.0.0.1 --port 8000 --reload
```
Then open [http://localhost:8000](http://localhost:8000) in any modern browser.

### Web Features:
- **Feeling-First Care Matcher**: Offline smart matcher + optional Gemini 1.5 Flash dynamic empathy matching.
- **3-Tier Care System**:
  - *Tier 1*: Immediate self-care micro-tools (4-4-6 vagus nerve breathing timer, grounding routines, copyable communication scripts).
  - *Tier 2*: Peer buddies with lived experience & intro messaging, community circles & girls groups with 1-click join, sisterhood meetups with RSVP.
  - *Tier 3*: Vetted professional counselors with sliding scale badges & direct 24/7 helpline links (988, DV, etc.).
- **Quick Safety Exit Curtain**: One-tap weather widget disguise (`Sunny & Mild • 72°F`) for discreet privacy.
- **Community Advice & Sanctuary Map**: Interactive canvas with 8 vetted drop-in clinics and resource centers across 5 categories.
- **My Sanctuary**: Localized private bookmarked tools, active buddy connections, and care history.
- **1-Page Care Summary**: Printable/copyable PDF-ready action plan.

