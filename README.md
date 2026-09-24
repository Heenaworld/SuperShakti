# SuperShakti — Women's Feeling-First Sanctuary & Care Ecosystem

SuperShakti is a feeling-first women's sanctuary and support ecosystem designed to provide immediate care, compassionate sisterhood, and vetted professional help in a secure, zero-tracking space.

## Core Pillars & Architecture

1. **Feeling-First Care Matcher**:
   - Emotion-led onboarding (Overwhelmed, Anxious, Heartbroken, Postpartum, Career Pivot, Safety).
   - Generates an instant 360-degree Sanctuary Care Plan combining somatic micro-tools, sisterhood mentors, and clinical care.
   - Powered by an Express backend (`/api/matcher`) with Gemini API empathy analysis and smart offline heuristics.

2. **Tier 1 • Immediate Relief Micro-Tools**:
   - **4-4-6 Vagus Nerve Somatic Breathing Engine**: Animated interactive pacing visualizer to gently down-regulate sympathetic heart rate.
   - **5-4-3-2-1 Sensory Grounding Routine**: Interactive sensory checklist to de-escalate panic attacks.
   - **Copyable Boundary Scripts Vault**: Categorized verbal scripts (Family, Work, Partner, Postpartum, Money) with gentle and firm variations.

3. **Tier 2 • Human Connection & Sisterhood**:
   - **Lived-Experience Peer Mentors**: Vetted sisterhood mentors for postpartum depression, divorce, burnout, and autonomy.
   - **1-Click Community Circles**: Supportive circles moderated with trauma care.

4. **Tier 3 • Vetted Specialists & 24/7 Lifelines**:
   - **Sliding-Scale Therapists & LMFTs**: Verified telehealth counseling ($30 - $80).
   - **Direct Emergency Lifelines**: One-tap dialing to 988, National DV Hotline (1-800-799-SAFE), and Crisis Text Line.

5. **16 Curated Milestone Care Packages**:
   - 3-phase roadmaps for major life transitions with printable / PDF-ready 1-page summaries.

6. **Physical Sanctuary Drop-In Map**:
   - Offline directory of free clinics, safe havens, and legal aid centers.

7. **Zero-Tracking Sovereignty, Encrypted Vault & Quick Exit**:
   - One-tap / `Esc` key Quick Exit disguise displaying an innocuous, realistic local weather widget.
   - **Zero-Knowledge Encrypted Sanctuary Vault**:
     - Client-side AES-256-GCM authenticated encryption via Web Crypto API.
     - PBKDF2 key derivation with 100,000 iterations using user-provided passphrase.
     - 100% on-device IndexedDB storage (`SuperShaktiVaultDB`) with zero server persistence.
     - Zero AI transmission: personal journal reflections and unsent letters are never sent to Gemini or any cloud model.
     - 1-click Emergency Wipe button instantly purges the local database and cryptographic keys.
   - **Zero-Knowledge Network Architecture**:
     - Strips and anonymizes all IP addresses (`X-Forwarded-For`, `X-Real-IP`, etc.) at the backend gateway.
     - Enforces strict `Permissions-Policy: geolocation=(), camera=(), microphone=(), payment=()`.
     - 100% verified 501(c)(3) institutions, recognized clinics, and certified helplines.
     - Transparent, opt-in AI controls with explicit data disclosure.

## Development & Deployment

- **Port**: Runs on port `3000` (host `0.0.0.0`).
- **Commands**:
  - `npm run dev`: Boots full-stack application using Vite and Express.
  - `npm run build`: Builds production static assets and standalone CommonJS server bundle.
  - `npm start`: Runs production server.
  - `npm run lint`: Runs TypeScript validation.

## Docker Containerization

The repository includes a multi-stage `Dockerfile` and `docker-compose.yml` for production deployments:

### 1. Build and Run with Docker
```bash
# Build the Docker container image
docker build -t supershakti .

# Run the container (listening on port 3000)
docker run -d -p 3000:3000 --name supershakti -e GEMINI_API_KEY="your-key-here" supershakti
```

### 2. Using Docker Compose
```bash
# Start container with docker compose
docker compose up -d

# Stop container
docker compose down
```

### 3. Healthcheck Endpoint
The Docker image incorporates a healthcheck against `http://localhost:3000/api/health` with automatic retry handling.

