# Deployment Guide

This document outlines the **current deployment setup** for the Quest App frontend.
While these instructions reflect the present configuration, the application should **not be considered tied to this setup** — infrastructure choices may evolve as the project grows.

---

## Environments & Infrastructure

### Doppler (Environment Management)

*   **Source of truth** for all environment variables.
*   Integrated with **Render** for automatic redeploys when variables change.
*   Used in **CI** (GitHub Actions) to fetch envs for tests (see `fetch-env.ts`).

**Environments in Doppler:**

*   `dev` (may be sub-categorized as `dev_personal/<dev-name>`).
*   `ci` (used in GitHub Actions).
*   `stg` (staging).
*   `prd` (production).

**Current integrations:**

*   **Staging & Production:** Doppler → Render sync.
*   **CI:** Doppler token is set as a GitHub secret for workflows.

---

### Render (Hosting)

*   **App hosting:** The Next.js frontend application is hosted on Render.
*   **Environments running:**
    *   **Staging**
    *   **Production**
*   **Autoscaling:** Not yet enabled (planned as usage grows).
*   **Deployment Trigger:** Render automatically detects successful CI checks on merges to `staging` and `main`, then pulls the latest commit and deploys it.
*   **Rollbacks:** Failed deployments will not replace the currently running instance, ensuring stability.

---

### CI/CD

*   CI configured with **GitHub Actions**.
*   Workflow file: `.github/workflows/test.yml`.
*   **Test runs** pull environment variables from Doppler.
*   Tests are written and executed using **Playwright**.
*   PRs must have accompanying tests and pass all checks before being merged into `staging`.

---

## Domains & DNS

*   **Domain:** `joindaquest.io`
*   Managed by: **Bunny DNS**

**Staging:**

*   Frontend: `preview.joindaquest.io`

**Production:**

*   Frontend: `joindaquest.io`

**Development (not currently set up):**

*   Frontend: `dev.joindaquest.io`

**DNS Setup:**

*   **Root domain (production frontend):** A record pointing to Render.
*   **Other subdomains:** CNAMEs pointing to Render.
*   There are no external load balancers or reverse proxies configured.

---

## Monitoring & Logging

*   **Sentry** is configured for a comprehensive suite of monitoring:
    *   Error Tracking
    *   Performance Monitoring (Tracing)
    *   Session Replays
    *   Log Management
    *   Profiling

---

## Third-Party Integrations

The following external services are integrated via environment variables managed in Doppler:

*   **Cloudflare Turnstile** → Captcha.
*   **Fingerprint Pro** → Bot detection.
*   **Social Media Integrations:** Telegram, X (Twitter), Discord, etc.

**Note:** No marketing or product analytics tools (e.g., Google Analytics, Mixpanel, PostHog) are currently configured.

> ⚠️ Always consult **Doppler** for the up-to-date list of required keys and configurations.

---

## Deployment Flow (Summary)

1.  **Developer pushes branch → GitHub.**
2.  **CI runs (GitHub Actions).**
    *   Pulls envs from Doppler.
    *   Runs Playwright tests.
3.  **PR merges into `staging` (via rebase).**
    *   Render waits for successful CI checks.
    *   Render automatically triggers a new deployment for the `staging` environment.
4.  **Staging verification.**
5.  **Promote to Production (via Render).**

---

## Setting Up a New Environment

This section describes how to provision a new environment (e.g., `dev`, `qa`) across **Doppler**, **Render**, and **DNS**.

---

### 1. Doppler Setup

1.  Create a new environment in the Doppler dashboard (e.g., `dev`, `qa`).
2.  Duplicate configuration from an existing environment (`stg` or `prd`) to ensure all required variables are present.
3.  Override values as needed (API keys, secrets, service-specific settings).

---

### 2. Render Setup

1.  Provision a new **Web Service** for the frontend.
    *   Ensure the correct **repository**, **build command** (`npm run build`), and **start command** (`npm start`) are defined.
2.  Connect Doppler to the new Render service for automatic environment variable synchronization.
    *   Go to the service's "Environment" tab in Render.
    *   Connect to Doppler and select the correct project and environment.
    *   Ensure "Auto-deploy on commit" is enabled for the desired branch.

---

### 3. GitHub Actions (CI/CD)

1.  If the new environment requires a separate CI process, add a new **Doppler token** for it.
    *   Generate a `ci` service token via Doppler.
    *   Store it in GitHub secrets (e.g., `DOPPLER_TOKEN_<ENV>`).
2.  Update workflow configuration (`.github/workflows/test.yml`) if needed to target the new environment or branch.

---

### 4. DNS Configuration

1.  Decide the subdomain for the new environment (e.g., `dev.joindaquest.io`).
2.  In **Bunny DNS**:
    *   Add a `CNAME` record for the subdomain, pointing to the `.onrender.com` URL provided by the new Render service.
    *   Verify propagation.
3.  Confirm HTTPS certificates are correctly applied (Render handles this automatically for connected domains).

---

### 5. Verification

1.  Trigger a deploy by pushing a test commit to the connected branch.
2.  Verify the frontend loads at its new URL (e.g., `https://dev.joindaquest.io`).
3.  Run integration tests against the new environment.
4.  Ensure logs, errors, and session replays flow into **Sentry** under the correct environment tag.

---

After these steps, the environment is fully onboarded and ready for use.
