# Beyond Silence

Platform by **Rahwa Kahsay Tesfamariam** — exposing truth about Tigray and giving voice to the unheard.

## Run locally (site + admin API)

```bash
npm install
cp .env.example .env
npm run dev
```

- **Website:** http://localhost:5173  
- **Admin:** http://localhost:5173/admin  
- **Default admin password:** `rahwa2026` (change in `.env` → `ADMIN_PASSWORD`)

## Admin features

| Tab | What you can do |
|-----|-----------------|
| **Overview** | See pending comments and messages |
| **Gallery** | Upload images/videos, publish or hide, delete |
| **Comments** | Approve or reject user comments on gallery items |
| **Messages** | Accept, read, or reject contact forms and requests |

## Production deploy

Vercel hosts the frontend only. For admin + database + uploads, deploy the full app to **Render** or **Railway**:

1. Connect this GitHub repo  
2. Build: `npm install && npm run build`  
3. Start: `npm run start`  
4. Set env vars: `ADMIN_PASSWORD`, `JWT_SECRET`, `PORT`

## Scripts

```bash
npm run dev          # Frontend + API together
npm run build        # Build React for production
npm run start        # API + serve built site
```
