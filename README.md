# Voice of Tigray

A React website documenting wartime atrocities in Tigray, preserving survivor testimony, collecting evidence for justice, fundraising for international legal counsel, and connecting survivors with counselors.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  App.jsx                 # Page layout
  components/
    Header.jsx            # Navigation
    Hero.jsx              # Landing
    Pillars.jsx           # Six mission areas
    ShareStory.jsx        # Survivor testimony form
    EvidenceSubmission.jsx
    DocumentArchive.jsx
    Fundraising.jsx
    Justice.jsx
    PsychologistNetwork.jsx
    Footer.jsx
    Section.jsx           # Shared section wrapper
    FormField.jsx         # Shared form fields
    ContentWarning.jsx
```

## Before going live

- Connect forms to a secure backend with encryption at rest
- Add privacy policy and trauma-informed moderation workflow
- Integrate a payment provider for the legal fund
- Replace placeholder archive entries with verified, consented content
