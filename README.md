# QUEST Frontend Setup Guide

This guide outlines the steps to set up and run the **Joinda Quest App** frontend locally.

**Requirements:**

*   Git
*   Node.js & npm (or yarn/pnpm/bun)

---

## 1. Clone and Install

```bash
gh auth login
gh repo clone thejoinio/quest-frontend
cd quest-frontend
npm install
```

---

## 2. Environment Variables

Create a `.env` file in the project root. You can use the `.env.example` file as a template if one exists, or refer to the backend README for common variables.

```bash
# Application
NEXT_PUBLIC_API_BASE_URL="http://localhost:3030/v1"
PORT="3000"

# Fingerprint Pro
NEXT_PUBLIC_FPJS_PUBLIC_API_KEY="<your_fingerprint_public_key>"

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY="<your_turnstile_site_key>"

# Sentry
SENTRY_AUTH_TOKEN="<your_sentry_auth_token>"
SENTRY_ENVIRONMENT="staging"
```

⚠️ **Notes:**

*   No spaces around `=`.
*   Ensure `NEXT_PUBLIC_API_BASE_URL` points to your running backend.

---

## 3. Run the Frontend

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 4. Running Tests

This project uses Playwright for end-to-end testing.

```bash
npm test
```

**Disabling Security Features for Testing:**

For reliable test runs, third-party security features like Cloudflare Turnstile and FingerprintJS are disabled in the test environment. This is controlled by the `NEXT_PUBLIC_DISABLE_SECURITY_FEATURES` environment variable.

---

## Troubleshooting

*   **Port Conflict:**
    Update `PORT` in `.env` or kill process:

    *   Windows: `netstat -aon | findstr :3000`
    *   Ubuntu: `lsof -i :3000`

*   **`npm install` Errors:**

    ```bash
    rm -rf node_modules package-lock.json && npm install
    # Windows:
    del /s /q node_modules package-lock.json
    ```

    Share error logs with the team if issues persist.

---