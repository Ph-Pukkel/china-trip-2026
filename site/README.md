# Reisgenoot China 2026

Een mobiele web-app (PWA) voor onze reis naar Xi'an en Beijing, 25 april – 2 mei 2026.

**Voor wie:** een 70+ echtpaar + drie volwassen kinderen (45–50). NL primair, ES secundair, Chinees voor taxi/menu-communicatie.

## Hoe de familie hem gebruikt

1. Open de URL (link in ons groepsappje).
2. Voer de reiscode `china2026` in bij de eerste start.
3. Tik onderin op **Thuis / Vandaag / Verken / Kaart / Hulp** om te navigeren.
4. In **Verken** kies je plekken; tik *+ Voeg toe aan mijn dag* om ze in de planning te zetten. Iedereen ziet de planning meteen.
5. Installeer de app op je startscherm (Safari: "Zet op beginscherm" / Chrome: "App installeren") — dan werkt 'ie ook offline.

## Architectuur

- **Front-end:** HTML + Tailwind Play CDN + vanilla JS (geen build step).
- **Kaart:** Leaflet met OpenStreetMap-tegels.
- **Realtime sync:** Supabase (optioneel — zonder sleutels werkt de app lokaal via localStorage).
- **Offline:** Service Worker cached de app-shell + locations.json + CDN-assets.
- **PWA:** manifest.webmanifest + icons → installeerbaar.
- **Spraak:** SpeechSynthesisUtterance('zh-CN') voor Chinese zinnen hardop.
- **Weer:** open-meteo.com (gratis, geen key).

## Lokaal testen

```bash
cd site
python3 -m http.server 5173
# open http://localhost:5173
```

## Supabase configureren (optioneel — voor groeps-sync)

1. Maak een Supabase-project.
2. Draai het SQL-migratiescript in `../supabase/schema.sql`.
3. Zet je URL en ANON key in `config.js`.
4. Seed met `../supabase/seed.sql` (gegenereerd uit `locations.json`).

## Deploy

- **Vercel:** `vercel --prod` vanaf deze directory.
- **GitHub Pages:** push naar `gh-pages` branch.

## Structuur

```
site/
├── index.html                 — één pagina, 5 schermen
├── config.js                  — trip metadata + Supabase sleutels
├── app.js                     — router, i18n, state, home/explore/help render
├── planner.js                 — Sortable.js drag-and-drop
├── map.js                     — Leaflet, hotels + category pins
├── supabase-client.js         — realtime + offline queue
├── help-content.js            — taxi/scams/payments/internet/emergency/brands
├── phrases.js                 — 6 groepen Chinese zinnen
├── service-worker.js          — offline cache
├── manifest.webmanifest       — PWA
├── locations.json             — 169 plekken, geverifieerd
├── locales/{nl,es,zh}.json
└── icons/
```

## Data-bronnen

Elk item in `locations.json` heeft `source_urls` en `verified_at`. De hoogste-prioriteit bevindingen van de cross-check staan in `../CROSS_CHECK_BATCH{1,4}.md`.

## Voor de ontwikkelaar (Jack)

- Alle copy kan in `locales/*.json` aangepast worden — geen code nodig.
- Nieuwe plekken: voeg toe aan `locations.json`, push → cache update bij volgende bezoek.
- Als je iets breekt: zet `service-worker.js` op een nieuwe VERSION string zodat de cache invalideert.
