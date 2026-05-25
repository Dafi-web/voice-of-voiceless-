# Tigray Truth Chronicle

A React site exposing what happened during the war in Tigray, Ethiopia — with a photo gallery and a call for justice.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Output is in the `dist` folder.

## Deploy on Vercel

### Option A — Import from GitHub (recommended)

1. Go to [vercel.com](https://vercel.com) and sign in with **GitHub**.
2. Click **Add New… → Project**.
3. Import **[Dafi-web/voice-of-voiceless-](https://github.com/Dafi-web/voice-of-voiceless-)**.
4. Vercel detects **Vite** automatically. Keep these settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click **Deploy**. Your site will be live at a `*.vercel.app` URL in about a minute.

Every push to `main` redeploys automatically.

### Option B — Deploy from your computer

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts, then run `vercel --prod` for production.

## Repository

https://github.com/Dafi-web/voice-of-voiceless-
