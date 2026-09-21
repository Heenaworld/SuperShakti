# Deploying SuperShakti to Google Cloud

SuperShakti is packaged for seamless, zero-configuration deployment to **Google Cloud Run** (Recommended) or **Google App Engine**.

---

## Method 1: Google Cloud Run via Web Console (No CLI Needed - Easiest)

If you do not have the Google Cloud SDK installed locally, you can deploy in ~2 minutes directly from the Google Cloud Web Console:

1. **Push your code to GitHub** (or GitLab / Bitbucket).
2. Go to the [Google Cloud Run Console](https://console.cloud.google.com/run).
3. Click **Create Service**.
4. Select **Continuously deploy from a repository** and click **Set up with Cloud Build**.
5. Connect your repository, select branch `main`, and select **Dockerfile** build type (`/Dockerfile`).
6. Under **Authentication**, select **Allow unauthenticated invocations** (so public visitors can access the website).
7. Under **Container, Networking, Security**, ensure:
   - **Container port**: `8080`
   - **Memory**: `512 MiB`
   - **Minimum instances**: `0` (scales to zero when idle = free!)
8. Click **Create**.
9. In ~60 seconds, Google Cloud will provide your live HTTPS URL:
   `https://supershakti-xxxxxx-uc.a.run.app`

---

## Method 2: Google Cloud CLI (`gcloud`)

If you have the `gcloud` CLI installed:

### Step 1: Login and Set Project
```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

### Step 2: One-Command Cloud Run Deployment
From your project folder (`c:\Users\heena\Downloads\supershaki`):
```bash
gcloud run deploy supershakti --source . --region us-central1 --allow-unauthenticated
```
Google Cloud Build will automatically build the container from `Dockerfile`, push it to Artifact Registry, and launch Cloud Run.

Or run our automated helper:
```powershell
.\deploy_gcp.ps1
```

---

## Method 3: Google App Engine (Standard)

To deploy via Google App Engine instead of Cloud Run:
```bash
gcloud app deploy app.yaml
```
Once complete, view your live app with:
```bash
gcloud app browse
```

---

## Cloud Features Configured in SuperShakti:
- **Automatic Scaling to Zero**: Zero cost when there is no traffic.
- **Global CDN & HTTPS**: Automatic TLS/SSL certificate managed by Google.
- **Privacy Architecture**: No IP logging, no client location tracking.
- **Container Security**: Runs under an unprivileged non-root user (`appuser`).
