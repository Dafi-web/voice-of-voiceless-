# Deployment guide — Beyond Silence

This project has **two parts**:

| Part | What it does | Where to host |
|------|----------------|---------------|
| **Frontend** | React website (pages, design) | Vercel *(optional)* |
| **Backend** | API, admin, database, uploads | **Render** *(recommended)* |

For **admin**, **comments**, **contact form**, and **image uploads** to work reliably, deploy the **backend on Render**.

---

## Option 1 — Everything on Render (recommended)

One URL for the website, admin, and API.

### Step 1 — Create Render account

1. Go to [https://render.com](https://render.com) and sign up (free tier works).
2. Connect your **GitHub** account.

### Step 2 — New Web Service

1. Click **New +** → **Web Service**.
2. Connect repo: **`Dafi-web/voice-of-voiceless-`** (or your fork).
3. Use these settings:

| Setting | Value |
|---------|--------|
| **Name** | `beyond-silence` (or any name) |
| **Region** | Choose closest to your users |
| **Branch** | `main` |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm run start` |

### Step 3 — Environment variables

In **Environment** → **Add Environment Variable**:

| Key | Value | Notes |
|-----|--------|--------|
| `ADMIN_PASSWORD` | `your-secure-password` | First login password (change later in admin → Password tab) |
| `JWT_SECRET` | long random string | e.g. 32+ random characters |
| `NODE_ENV` | `production` | |
| `DATA_DIR` | `/opt/render/project/src/data` | Database folder |
| `UPLOADS_DIR` | `/opt/render/project/src/data/uploads` | Uploaded images/videos |

### Step 4 — Persistent disk (important)

Without a disk, data resets when Render restarts.

1. After creating the service, open **Disks** → **Add disk**.
2. **Mount path:** `/opt/render/project/src/data`
3. **Size:** 1 GB (enough to start).
4. Save and **Redeploy**.

### Step 5 — Deploy

Click **Create Web Service** (or **Manual Deploy** → **Deploy latest commit**).

When finished, Render gives you a URL like:

`https://beyond-silence.onrender.com`

### Step 6 — Use the site

| Page | URL |
|------|-----|
| **Homepage** | `https://your-app.onrender.com/` |
| **Admin** | `https://your-app.onrender.com/admin` |

**First login:** password = `ADMIN_PASSWORD` you set in Step 3.  
Then open **Password** tab and set your own password.

---

## Option 2 — Frontend on Vercel + Backend on Render

Use Vercel for a fast static site and Render for the API.

### A) Deploy backend on Render

Follow **Option 1** above. Copy your Render URL, e.g.:

`https://beyond-silence.onrender.com`

### B) Deploy frontend on Vercel

1. Go to [https://vercel.com](https://vercel.com) → import the same GitHub repo.
2. Framework: **Vite**
3. Build: `npm run build`
4. Output: `dist`

### C) Point Vercel to Render API

In Vercel → **Settings** → **Environment Variables**, add:

| Key | Value |
|-----|--------|
| `VITE_API_URL` | `https://beyond-silence.onrender.com` |

*(No trailing slash)*

Redeploy Vercel.

### D) CORS on Render (if needed)

If the browser blocks API calls, add on Render:

| Key | Value |
|-----|--------|
| `ALLOWED_ORIGIN` | `https://your-site.vercel.app` |

*(We can enable this in code if you need it — ask if forms fail with CORS errors.)*

---

## Option 3 — Blueprint (one-click on Render)

1. In Render dashboard → **Blueprints** → **New Blueprint Instance**.
2. Connect repo `voice-of-voiceless-`.
3. Render reads `render.yaml` in the repo.
4. Set `ADMIN_PASSWORD` when prompted.
5. Deploy.

---

## Local development

```bash
npm install
cp .env.example .env
npm run dev
```

- Site: http://localhost:5173  
- Admin: http://localhost:5173/admin  
- API: http://localhost:3001 (proxied through Vite)

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| **405 error on admin login** | You are on Vercel only — deploy backend on **Render** (Option 1 or 2). |
| **Admin login fails** | Check `ADMIN_PASSWORD` on Render and redeploy. |
| **Uploads disappear** | Add **persistent disk** on Render (Step 4). |
| **Free Render sleeps** | First visit after idle may take 30–60 seconds to wake up. |
| **Change password** | Admin → **Password** tab (after login). |

---

## Summary

```
GitHub repo
    │
    ├── Render (backend)  ←  API + database + admin + uploads  ✅ USE THIS
    │       npm run build && npm run start
    │
    └── Vercel (optional)   ←  static frontend only
            needs VITE_API_URL → Render
```

**Admin URL:** `https://YOUR-RENDER-URL.onrender.com/admin`
