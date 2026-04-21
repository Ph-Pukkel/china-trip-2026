# Reisgenoot China 2026 — Plan voor de app

_Een companion-webapp voor het stel (70) + 3 kinderen (45–50) die op 25 april 2026 naar Xi'an en Beijing vertrekken._

---

## 1. Doel & uitgangspunten

De app moet vóór én tijdens de reis bruikbaar zijn. Voor vertrek: kennismaken met het programma, zekerheid geven, de planning fijnslijpen. Onderweg: dagelijkse houvast, routes, tips, en een paniek-knop-gevoel als je iets niet snapt (scams, taxi, menu).

**Drie ontwerp­principes**

1. **Zo simpel dat een 70-jarige het zonder uitleg begrijpt.** Grote knoppen, één actie per scherm, geen jargon.
2. **Altijd "waar ben ik, wat nu?"-antwoord.** Homepage toont altijd de dag van vandaag en de eerstvolgende activiteit.
3. **Vertrouwen bovenaan.** Elke tip over oplichting, betaling of taal staat maximaal één tik verwijderd.

---

## 2. Reis­samenvatting (datums omgezet)

| Datum | Dag | Stad | Kern |
|---|---|---|---|
| Za 25 apr 2026 | 1 | Xi'an | Aankomst, stadsmuur / Muslim Quarter |
| Zo 26 apr 2026 | 2 | Xi'an | Terracotta Leger |
| Ma 27 apr 2026 | 3 | Reis → Beijing | Hogesnelheidstrein Xi'an → Beijing (±4u30) |
| Di 28 apr | 4 | Beijing | Verboden Stad + Tiananmen |
| Wo 29 apr | 5 | Beijing | Chinese Muur (Mutianyu) |
| Do 30 apr | 6 | Beijing | Hutongs + Tempel van de Hemel |
| Vr 1 mei | 7 | Beijing | Zomerpaleis (⚠ 1 mei = feestdag, druk!) |
| Za 2 mei | 8 | Beijing | Shoppen Wangfujing + vertrek |

**Let op:** 1 mei is Labor Day, begin van een Chinese feestweek — enorm druk bij toeristische trekpleisters. Voorstel: Zomerpaleis vroeg in de ochtend, of ruilen met een rustigere dag.

---

## 3. App-structuur (5 hoofdschermen)

De app heeft onderaan een vaste navigatiebalk met 5 iconen. Zo blijft elk scherm één tik weg.

```
┌─────────────────────────────────────┐
│    🏠      📅      🧭      🗺️      💡  │
│   Thuis  Vandaag  Verken  Kaart  Hulp│
└─────────────────────────────────────┘
```

### 🏠 Thuis
- Groot: "Goedemorgen 👋 — Vandaag is **dag 4 van 8**"
- Vandaag-kaart: eerstvolgende activiteit met tijd, adres, route-knop
- Countdown tot vertrek (voor de periode voor de reis)
- Aftelling ter plaatse: "nog 3 dagen in Beijing"
- Snelkoppelingen: _Taxi-kaart_ · _Notgeval_ · _Chinese zinnen_

### 📅 Vandaag / Planning
- Dagoverzicht per dag, per uur gesorteerd
- Elk item toont: tijd · naam · duur · kosten · status (bekeken/gedaan)
- **Drag-to-reorder** of pijltjes omhoog/omlaag om volgorde te wijzigen
- "Voeg toe" knop → kies uit Verken, of typ zelf
- Verwijderen/verplaatsen naar andere dag

### 🧭 Verken
Gecureerde bibliotheek van álle plekken uit hun route, sorteerbaar en filterbaar.

**Filter-chips (aanklikbaar, meerdere tegelijk):**
- Stad — Xi'an · Beijing
- Categorie — 🏛️ Musea · ⛩️ Tempels · 🏯 Monumenten · 🍜 Restaurants · 🛍️ Shoppen · 🌳 Parken/tuinen · 🎭 Avond/show · 💎 Verborgen pareltjes · 📸 Fotospots · 🎪 Markten · 🌃 Nightlife · 🎨 Kunst/cultuur · 🏞️ Viewpoints · 🧧 Lokale ervaring (tea house, kalligrafie, massage)
- Bijzonder — UNESCO · Senior-vriendelijk · Gratis · Weinig lopen · Kindvriendelijk · Regenbestendig

**Sorteer op:** afstand tot hotel · openingstijden nu · prijs · populariteit · onze aanbeveling

**Per locatie zie je:**
- Grote foto + naam (NL) + Chinees + pinyin
- Categorie-icoon + tags
- ⏰ Openingstijden + **waarschuwing in rood** als het vandaag dicht is, of als het alleen op bepaalde dagen open is
- 💴 Prijs (volwassen / senior 60+)
- ⏱️ Geschatte duur
- 📍 "Route hierheen" (lopen / metro)
- 🇨🇳 "Toon aan taxichauffeur" (groot Chinees adres)
- 📚 Bron-link (zodat ze zelf kunnen checken)
- ⚠️ Tips/waarschuwingen specifiek voor deze plek (scams, beste tijd, drukte)
- 🗓️ **Seizoen­waarschuwing** uitgelicht (bv. "Kabelbaan dicht vanaf 15 april 2026" of "Alleen open di–zo")
- ➕ **Voeg toe aan mijn planning** (gedeeld met de groep via Supabase)
- ❤️ Favoriet maken

**Belangrijk:** elk datapunt is minstens één keer geverifieerd op een tweede bron, en elk item heeft een `verified_at` datum. Als iets seizoens­gebonden is of op bepaalde dagen dicht, staat dat prominent in rood — nooit in kleine lettertjes.

### 🗺️ Kaart
Interactieve kaart (Leaflet + OpenStreetMap) met:
- Gekleurde markers per categorie
- Hun hotel als vertrekpunt
- Klik op een marker → "Route hierheen" (lopen/metro) + "Voeg toe aan planning"
- Werkt offline als ze vooraf de kaart laden

### 💡 Hulp
Alle 'safety net'-info, gegroepeerd als Whats­app-achtige kaartjes:

- **📱 Chinese zinnen** — 6 situaties (taxi, restaurant, winkel, hulp, noodgeval, richting). Per zin: Chinees · pinyin · Nederlands · Spaans · 🔊 uitspraak (browser text-to-speech) · 📋 kopiëren.
- **🚕 Taxi-kaart** — Kies een bestemming uit je planning → groot Chinees adres in grote letters om aan de chauffeur te laten zien. Controleert ook dat er "京B" op het kenteken staat (Beijing).
- **⚠ Pas op!** — De 5 grootste scams (thee­ceremonie, taxi, valse gids, wisselgeld, 'kunst­galerij'). Kort, met wat te doen.
- **💳 Betalen** — Alipay/WeChat Pay instellen, foreign card linken (Visa/Mastercard sinds 2024 toegestaan), wanneer wel/niet cash.
- **📶 Internet** — VPN/eSIM adviezen om WhatsApp en Google te blijven gebruiken (allebei geblokkeerd in China).
- **📋 Checklist** — Vóór vertrek (visum — Nederland en Spanje tot eind 2026 visumvrij 30 dagen; paspoort 6 maanden geldig; eSIM/VPN geïnstalleerd; Alipay/WeChat geregistreerd; DiDi werkt). Elke dag (meeneemlijst).
- **🆘 Noodgeval** — 110 politie · 120 ambulance · Nederlandse ambassade Peking · Spaanse ambassade · eigen hotel­kaartje.

---

## 4. De planner (het hart van de app) — met live groeps-sync

Dit is wat de app bijzonder maakt.

**Zo werkt het:**

1. In **Verken** of op de **Kaart** staan alle voor-gecureerde plekken.
2. Tik **+ Voeg toe aan mijn planning** → kies een dag → kies een tijd (of "ergens deze dag").
3. Het item verschijnt op **Vandaag/Planning** bij **iedereen** in de reisgroep — binnen seconden. Real-time via Supabase.
4. Ze kunnen verslepen, verwijderen, aantekening toevoegen ("Pietje wil dit per se"), een andere dag kiezen.
5. Wie wat heeft toegevoegd staat erbij ("door Oma toegevoegd") zodat er geen verwarring ontstaat.
6. Ook zelfgemaakte items kunnen toegevoegd (een restaurant dat niet in de databank staat, een eigen wandeling).
7. Werkt ook **offline**: wijzigingen worden opgeslagen en automatisch gesynct zodra er weer verbinding is.

**Inloggen zonder gedoe:** één gedeelde reiscode (bv. `china2026`) die de groep bij eerste gebruik invoert. Geen wachtwoord. Geen e-mail. Wel veilig omdat niemand buiten de groep de code kent.

**Extra aanrader:** een knop **"Loop de vakantie eens door"** op Thuis. Die speelt elke dag kort af: tekst + foto + "volgende dag ➡". Voor­pret én ze weten wat er komt.

---

## 5. Concrete inhoud die ik al klaarzet

Dit voorstel doe ik op basis van onderzoek vandaag:

### Xi'an (25–27 apr)
- **Stadsmuur** — 54 CNY, 8:00–22:00, 1,5–2u; optie elektrisch karretje of huurfiets
- **Terracotta Leger** — 120 CNY (inc. Lishan + shuttle), 8:30–18:30, online 3–5 dagen vooraf boeken (12306.cn of via hotel), 3u
- **Muslim Quarter** — gratis straat, 500 m foodstraat achter de Drum Tower, 's avonds op z'n mooist
- **Big Wild Goose Pagoda** — pagode 50 CNY, fontein­show 's avonds gratis (21:00)
- **Bell + Drum Tower** — 50 CNY combi
- **Jiasan Guantang Bao** — soepdumplings, Muslim Quarter, must-try

### Beijing (27 apr – 2 mei)
- **Verboden Stad** — 40–60 CNY, 8:30–17:00 (di gesloten), 3–4u, online tickets verplicht via 故宫博物院. Senioren 60+ halve prijs.
- **Tiananmen-plein** — gratis, direct voor Verboden Stad, paspoortcontrole
- **Mutianyu Chinese Muur** — 45 CNY muur + 160 CNY kabelbaan heen/terug, ±4u ter plaatse inc. reizen. ⚠ Kabelbaan onderhoud start 15 april 2026 (check vlak voor reis)
- **Tempel van de Hemel** — 35 CNY, 6:00–22:00 (park), 2u
- **Zomerpaleis** — 30 CNY, 6:30–18:00, 3u
- **Hutong Nanluoguxiang** — gratis, best bij zonsondergang, combineren met riksja-tour
- **Wangfujing winkelstraat** — gratis, avondmarkt
- **Peking eend bij Quanjude of Siji Minfu** — Chinees adres staat paraat

### Reis Xi'an → Beijing
- **G-trein Xi'an Noord → Beijing West**, 4u11–6u, 2e klas 470–577 CNY (ongeveer €60–75), boeken via 12306.cn (officieel) of Trip.com. 17 G-treinen per dag, 06:38–19:00.

### Praktisch (in Hulp-sectie)
- **Visum:** NL + ES burgers tot 31 dec 2026 visumvrij 30 dagen. Paspoort ≥6 mnd geldig.
- **Betalen:** Alipay / WeChat Pay linken met Visa/Mastercard (limiet $5000/transactie). Cash als back-up. Pin op cash nog steeds iets hit-or-miss.
- **Internet:** Eigen Google Maps/WhatsApp werken niet zonder VPN/eSIM. Aanbevolen: reis-eSIM (Airalo, Holafly, etc.) vóór vertrek activeren.
- **Taxi:** alleen "京B" kenteken in Beijing, of DiDi via WeChat-miniprogramma (Engels).
- **Scams:** thee­ceremonie (bij Forbidden City), taxi-meter, "kunst­student" wil je galerij showen, gewisseld biljet.

---

## 6. Wat ik zelf nog voorstel (ideeën die jij niet noemde)

1. **"Ik ben hier"-knop** op elk item → één tik, laat in Chinees adres + pijl richting taxichauffeur zien. Geen gezoek.
2. **Dag-dagboekje** — na elke dag één regel "hoogtepunt" invullen. Wordt hun reisherinnering.
3. **Foto-checklist per locatie** — de 3 klassieke foto's per plek als inspiratie.
4. **Geluidsknop voor Chinees** — browser kan pinyin hardop lezen. Helpt enorm bij taxi.
5. **Uur-per-uur weer voor vandaag** (via open-meteo API, gratis, geen key nodig).
6. **Printbare noodpagina** — A4 met hotel-adres Chinees, ambassade, bloed­groep, etc. Voor in de portemonnee.
7. **"Welke dag is het?"-toon** — homepage wisselt automatisch per dag. Geen kalender openen.
8. **Gast-mode** — niet alleen senior stel kan plannen, ook de kinderen kunnen toevoegen (bij vertrek synchroniseren we de JSON).

---

## 7. Technische aanpak

### Front-end
- **Mobielvriendelijke webpagina** met HTML + Tailwind + vanilla JS (geen build step nodig, werkt op elke telefoon).
- **Leaflet** voor de kaart (open source, geen API-key).
- **Service Worker** voor offline: kaart-tegels en app zelf blijven werken zonder internet.
- **Text-to-speech** via `SpeechSynthesisUtterance('zh-CN')` — in de browser ingebouwd.
- **PWA-manifest** zodat ze 'm op hun homescreen kunnen zetten.
- **Taalkeuze** — één JSON met vertalingen per string, switcher rechtsboven (NL/ES/中文).

### Back-end — Supabase voor real-time synchronisatie
Als één reiziger een activiteit toevoegt of verschuift, zien de anderen het binnen seconden. Dát is wat dit tot een echte groeps-app maakt.

- **Supabase** (gratis tier voldoet ruim) levert:
  - PostgreSQL database voor alle data (locaties + gedeelde planning + favorieten + dagboek)
  - Real-time subscriptions — elke wijziging in de planning wordt live naar alle andere telefoons gepusht
  - Row Level Security zodat alleen het reisgroepje zelf bij de data kan
  - Storage voor foto's van locaties
- **Auth-aanpak (simpel):** één gedeelde **reis-code** ("china2026") die de groep samen invoert. Geen wachtwoord, geen e-mail-gedoe voor de senioren. Geavanceerder: magic-link per e-mail, maar dat is overkill voor deze reis.
- **Offline-fallback:** mutaties worden lokaal (IndexedDB) opgeslagen en gesynct zodra er weer internet is.

### Datamodel (Supabase tabellen)

```sql
-- Alle locaties (bezienswaardigheden, restaurants, shoppen, ...)
locations (
  id uuid primary key,
  slug text unique,
  name_nl text, name_es text, name_zh text, pinyin text,
  city text,                    -- 'xian' of 'beijing'
  category text,                -- 'museum', 'tempel', 'restaurant', 'monument', 'park', 'shopping', 'avond', 'hidden-gem', 'markt', 'viewpoint'
  subcategory text,
  tags text[],                  -- bv ['unesco', 'senior-vriendelijk', 'eten', 'gratis']
  description_nl text, description_es text,
  address_nl text, address_zh text,      -- Chinees adres in karakters voor taxi
  lat numeric, lng numeric,
  nearest_metro text,
  opening_hours jsonb,          -- {mon:'8:30-17:00', tue:'closed', ...} + seasonal {summer:..., winter:...}
  closed_days text[],           -- bv ['monday']
  seasonal_notes text,          -- bv 'Kabelbaan dicht vanaf 15 april 2026'
  price_adult_cny numeric,
  price_senior_cny numeric,     -- 60+
  price_child_cny numeric,
  booking_required boolean,
  booking_url text,
  duration_min integer,         -- geschatte tijd in minuten
  tips_nl text[],
  warnings_nl text[],           -- scams, drukte, etc.
  photo_url text,
  source_urls text[],           -- waar we dit geverifieerd hebben
  verified_at date
)

-- Gedeelde groepsplanning
trip_items (
  id uuid primary key,
  trip_code text,               -- 'china2026'
  day date,
  start_time time,
  end_time time,
  location_id uuid references locations,
  custom_title text,            -- of eigen titel als niet uit locations
  notes text,
  status text,                  -- 'planned' / 'done' / 'skipped'
  added_by text,                -- wie heeft 't toegevoegd
  created_at timestamptz,
  updated_at timestamptz
)

-- Favorieten (per persoon, optioneel)
favorites (
  id uuid primary key,
  trip_code text,
  user_name text,               -- 'Oma', 'Pedro', etc.
  location_id uuid references locations,
  created_at timestamptz
)

-- Reis-dagboekje (gedeelde herinneringen)
diary_entries (
  id uuid primary key,
  trip_code text,
  day date,
  author text,
  text text,
  photo_url text,
  created_at timestamptz
)
```

Met Row Level Security op `trip_code`: alleen wie de code weet ziet de planning.

### Hosting
- Front-end op **Netlify** of **Vercel** (gratis, HTTPS, korte URL).
- Supabase gratis tier — ruim voldoende voor 5 gebruikers.

---

## 8. Design-stijl voorstel

- **Kleuren:** warm rood (Chinees rood) als accent, diep­blauw voor rust, crème achtergrond, geen fel wit
- **Font:** groot — minimaal 18px body, 28px koppen
- **Knoppen:** groot, rond, met icoon én tekst (nooit alleen icoon)
- **Één scherm = één beslissing.** Geen lange lijsten zonder filter.
- **Bevestigingstoon** bij "toegevoegd aan planning" — klein groen vinkje

---

## 9. Volgende stappen — wat ik voorstel

1. **Jij leest dit plan en reageert** — wat eruit mag, wat erbij moet, wat ik verkeerd snap.
2. **Ik maak een klikbare HTML-prototype van 1 scherm** (Thuis + Vandaag) — zodat je de look & feel ziet voordat ik alles bouw.
3. **Jij geeft groen licht op het prototype.**
4. **Ik bouw alle schermen** + vul de inhoud met onderzoek per plek.
5. **We testen samen** op jouw telefoon.
6. **Ik lever op** als zipje + online URL, plus korte uitleg­video/PDF voor de reizigers.

---

## 10. Open vragen waarop ik graag antwoord wil

- Vertrek­plaats Xi'an: weet je al het hotel of het vliegveld? Nodig voor "route van/naar".
- Hotel in Beijing al bekend? Anders zet ik "centraal — wordt later ingevuld".
- Willen de ouders per se zelf hun planning kunnen bewerken, of mogen de kinderen dat voor ze doen? (beïnvloedt edit-UI)
- Budgetindicatie per persoon per dag (grof: zuinig / middel / ruim) → filtert Verken.
- Is er een vlucht­nummer en -datum die je in de app wilt hebben (handig voor check-in countdown)?
