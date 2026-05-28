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
| **Build command** | `npm install --prefix frontend && npm install --prefix backend && npm run build --prefix frontend` |
| **Start command** | `npm run start --prefix backend` |

> **Do not use** Render’s default `yarn install; yarn build` — it skips `frontend/node_modules` and fails with `vite: not found`. Paste the build command above manually under **Settings → Build & Deploy**.

### Environment variables

| Key | Value |
|-----|--------|
| `ADMIN_PASSWORD` | your login password |
| `JWT_SECRET` | long random string |
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

| Setting | Value |
|---------|--------|
| **Root directory** | `frontend` |
| **Framework** | Vite |
| **Build** | `npm run build` |
| **Output** | `dist` |

**Environment variable on Vercel:**

| Key | Value |
|-----|--------|
| `VITE_API_URL` | `https://your-backend.onrender.com` |
| `ALLOWED_ORIGIN` | *(on backend)* `https://your-site.vercel.app` |

Redeploy both.

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
