# Beyond Silence

Platform by **Rahwa Kahsay Tesfamariam** — exposing truth about Tigray and giving voice to the unheard.

## Quick links

| Task | Guide |
|------|--------|
| **Deploy backend (Render)** | **[DEPLOY.md](./DEPLOY.md)** ← start here for admin & API |
| Run locally | Below |
| Admin features | [DEPLOY.md](./DEPLOY.md#step-6--use-the-site) |

## Architecture

- **Frontend** — React (Vite)
- **Backend** — Express API + SQLite database + file uploads
- **Admin** — `/admin` (gallery, comments, messages, change password)

**Production:** host the **full app on [Render](https://render.com)** so admin, forms, and uploads work.  
Vercel alone is not enough for the backend — see **[DEPLOY.md](./DEPLOY.md)**.

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

- **Website:** http://localhost:5173  
- **Admin:** http://localhost:5173/admin  
- **Default password:** `rahwa2026` (change in admin → **Password** tab)

## Admin features

| Tab | What you can do |
|-----|-----------------|
| **Overview** | Pending comments & messages |
| **Gallery** | Upload images/videos |
| **Comments** | Approve or reject |
| **Messages** | Accept contact & requests |
| **Password** | Change admin password after login |

## Scripts

```bash
npm run dev      # Frontend + API (ports 5173 + 3001)
npm run build    # Build React → dist/
npm run start    # Production server (API + site)
```

## Repository

https://github.com/Dafi-web/voice-of-voiceless-
