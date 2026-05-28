# Beyond Silence

Platform by **Rahwa Kahsay Tesfamariam**.

## Project structure

```
voice/
├── frontend/    React website (Vite)
├── backend/     Express API, SQLite, admin, uploads
├── DEPLOY.md    How to deploy (Render + Vercel)
└── package.json Run both locally from root
```

## Quick start (local)

```bash
npm run install:all
cp .env.example backend/.env
npm run dev
```

- **Site:** http://localhost:5173  
- **Admin:** http://localhost:5173/admin  

## Deploy

| What | Where | Guide |
|------|--------|--------|
| **Backend + full site** | [Render](https://render.com) | [DEPLOY.md](./DEPLOY.md#option-1--full-site-on-render-easiest) |
| **Frontend only** | [Vercel](https://vercel.com) | [DEPLOY.md](./DEPLOY.md#option-2--frontend-on-vercel--backend-on-render) |

**Deploy instructions:** **[DEPLOY.md](./DEPLOY.md)**

## Repository

https://github.com/Dafi-web/voice-of-voiceless-
