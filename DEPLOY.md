# Deployment guide

Project layout:

```
voice/
├── frontend/     ← React website (deploy to Vercel)
├── backend/      ← API + admin + database (deploy to Render)
├── package.json  ← run both locally
└── DEPLOY.md     ← this file
```

---

## Option 1 — Full site on Render (easiest)

**One service** serves the website + admin + API.

### Render settings

| Setting | Value |
|---------|--------|
| **Root directory** | *(leave empty — use repo root)* |
| **Build command** | `npm install` |
| **Start command** | `npm run start` (or `npm run start --prefix backend`) |

Root **`postinstall`** installs `frontend/` and `backend/` dependencies and, on Render (`RENDER=true`), runs the Vite production build. Using only `npm install` as the build command is enough — you do not need a separate `npm run build` at the repo root.

> If the service was created before `postinstall` existed, set **Build command** to `npm install` under **Settings → Build & Deploy** (not `yarn install` / `yarn build`).

### Environment variables

| Key | Value |
|-----|--------|
| `ADMIN_PASSWORD` | your login password |
| `JWT_SECRET` | long random string |
| `MONGODB_URI` | *(optional)* your MongoDB Atlas connection string — if set, all messages/comments/gallery are stored in MongoDB instead of SQLite |
| `NODE_ENV` | `production` |
| `DATA_DIR` | `/opt/render/project/src/backend/data` |
| `UPLOADS_DIR` | `/opt/render/project/src/backend/data/uploads` |

### Persistent disk

- **Mount path:** `/opt/render/project/src/backend/data`
- **Size:** 1 GB

### URLs after deploy

| Page | URL |
|------|-----|
| Website | `https://YOUR-APP.onrender.com/` |
| Admin | `https://YOUR-APP.onrender.com/admin` |

Or use **Blueprint** → connect repo → Render reads `render.yaml` at repo root.

---

## Option 2 — Frontend on Vercel + Backend on Render

### Deploy `backend/` on Render

| Setting | Value |
|---------|--------|
| **Root directory** | `backend` |
| **Build command** | `npm install` |
| **Start command** | `npm start` |

Same environment variables as above, but paths:

| Key | Value |
|-----|--------|
| `DATA_DIR` | `/opt/render/project/src/data` |
| `UPLOADS_DIR` | `/opt/render/project/src/data/uploads` |

**Disk mount:** `/opt/render/project/src/data`

Copy your Render URL: `https://beyond-silence-api.onrender.com`

### Deploy `frontend/` on Vercel

Use **one** of these setups (not both):

**A — Recommended**

| Setting | Value |
|---------|--------|
| **Root directory** | `frontend` |
| **Framework** | Vite |
| **Build command** | *(leave default, or `npm run build`)* |
| **Output directory** | `dist` |

**B — Repo root**

| Setting | Value |
|---------|--------|
| **Root directory** | *(empty)* |
| **Build command** | `npm run build --prefix frontend` |
| **Output directory** | `frontend/dist` |

If the build succeeds but deploy fails with **“No Output Directory named dist”**, Vercel is looking in the wrong folder — use **A** or set **Output directory** to `frontend/dist` for **B**.

**Environment variable on Vercel:**

| Key | Value |
|-----|--------|
| `VITE_API_URL` | `https://your-backend.onrender.com` (no trailing slash) |

Redeploy after saving. The build generates `vercel.json` rewrites so `/api/*` and `/uploads/*` forward to Render. Without this variable, the contact form hits Vercel and returns **405 Method Not Allowed**.

**CORS on Render** (only if the browser calls Render directly, not when using Vercel `/api` proxy):

| Key | Value |
|-----|--------|
| `ALLOWED_ORIGIN` | `https://voice-of-voiceless-smoky.vercel.app` (your **current** Vercel URL) |

Multiple sites: comma-separated `ALLOWED_ORIGINS`.  
All Vercel previews: set `ALLOW_VERCEL_PREVIEWS=true` instead of listing every preview URL.

If you see CORS errors mentioning `voice-of-voiceless-alpha.vercel.app` while using `smoky`, update `ALLOWED_ORIGIN` on Render and redeploy — an old preview URL was saved there.

---

## Run locally

From the **`voice`** folder (repo root):

```bash
npm run install:all
cp .env.example backend/.env
npm run dev
```

| Service | URL |
|---------|-----|
| Website | http://localhost:5173 |
| Admin | http://localhost:5173/admin |
| API | http://localhost:3001 |

Default password: `rahwa2026` — change in admin → **Password** tab.

### Run separately

```bash
# Terminal 1 — frontend
cd frontend && npm install && npm run dev

# Terminal 2 — backend
cd backend && npm install && cp ../.env.example .env && npm run dev
```

---

## Summary

| Folder | Deploy to | Gets you |
|--------|-----------|----------|
| **`frontend/`** | Vercel | Public website only |
| **`backend/`** | Render | API, admin, database, uploads |
| **Repo root** | Render | Website + admin + API together |

**Recommended for Rahwa:** deploy **repo root** on Render (Option 1) — everything in one place.
