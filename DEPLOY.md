# Deployen — Reisgenoot China 2026

De app is volledig klaar. Alles wat nog nodig is: 1 Vercel login + 1 commando.

## Stap 1 — Lokaal testen (optioneel)

```bash
cd site
python3 -m http.server 5173
# open http://localhost:5173
```

De app werkt direct: inloggen met reiscode **`china2026`**, Supabase-sync staat aan, offline werkt via de service worker.

## Stap 2 — Deploy naar Vercel

```bash
# Installeer Vercel CLI (eenmalig)
npm install -g vercel

# Login (opent je browser)
vercel login

# Deploy
cd /pad/naar/HolidayChina2026
vercel --prod
```

Het `vercel.json` in de project-root is al geconfigureerd:
- `outputDirectory: "site"` — Vercel serveert de `site/`-map
- SPA rewrites voor Clean URLs
- Juiste cache-headers voor `service-worker.js` en `manifest.webmanifest`

Na `vercel --prod` krijg je een URL terug (bijv. `https://china-trip-2026.vercel.app`). Deel die met de familie.

## Stap 3 — GitHub (optioneel, voor versiebeheer)

```bash
# Install gh CLI (macOS)
brew install gh
gh auth login

# Maak de repo en push
cd /pad/naar/HolidayChina2026
gh repo create china-trip-2026 --public --source=. --remote=origin --push
```

Als je de Vercel GitHub-integratie aanzet, deployt elke `git push` automatisch.

## Wat staat waar

| | |
|---|---|
| **Live-app (na deploy)** | `https://<jouw>-vercel-url` |
| **Supabase project** | `china-trip-2026` (ID: `yjqyycnweeqtzxyyuulv`, eu-west-1) |
| **Supabase URL** | `https://yjqyycnweeqtzxyyuulv.supabase.co` |
| **Reiscode (voor familie)** | `china2026` |
| **Inhoudelijke plekken** | `site/locations.json` (169 entries, geverifieerd) |
| **Kopij** | `site/locales/{nl,es,zh}.json` |
| **Hotels** | `site/config.js` → `HOTELS` (coördinaten na boeking invullen) |

## Tabellen in Supabase

Alle seed data is al geladen (169 locations + 16 brands + 12 shopping tips).

| Tabel | Rij-aantal | Doel |
|---|---|---|
| `locations` | 169 | Statische catalogus (SELECT voor anon) |
| `trip_items` | 0 | Planning-items (full CRUD voor anon + realtime) |
| `diary_entries` | 0 | Dagboek-notities (full CRUD + realtime) |
| `favorites` | 0 | Favorieten per familielid |
| `brands` | 16 | Chinese kleding/beauty merken |
| `shopping_tips` | 12 | Winkel-tips |
| `profiles` | 0 | Familieleden (display name + avatar) |

RLS staat aan met permissive policies (per familie-reis met gedeelde trip_code is dat voldoende).

## Als er iets mis gaat

- **Service worker blijft oude versie cachen** → verhoog `VERSION` in `site/service-worker.js`.
- **Supabase realtime werkt niet** → check `ALTER PUBLICATION supabase_realtime ADD TABLE …` voor de tabel.
- **Familieleden zien elkaars plannen niet** → ze moeten alle dezelfde `TRIP_CODE` invoeren bij inloggen.
- **Kaart laadt niet offline** → het is gewoon: tiles zijn stale-while-revalidate; eerste bezoek aan een zoomniveau heeft internet nodig.
