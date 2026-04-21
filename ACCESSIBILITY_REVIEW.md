# Toegankelijkheids-review — Reisgenoot China 2026

> WCAG 2.1 AA + senior-specifieke richtlijnen voor de primaire gebruikers (echtpaar 70+, 3 kinderen 45-50). Eerste keer in China. Mobiele webapp (PWA), Nederlands primair, Spaans + Chinees secundair.

**Samenvatting van de aanpak:** WCAG 2.1 AA is de ondergrens. Voor deze specifieke doelgroep (senioren + stress van een eerste reis naar een land met een ander schrift) hanteren we op meerdere punten AAA. "Werkt het voor Oma in een drukke hutong met felle zon op het scherm en een taxi die wacht?" is de toetssteen.

---

## 1. Visueel — font, contrast, touch targets

### Fontgrootte (WCAG 1.4.4 _Resize Text_, AAA)

| Element | Minimaal | Onze richtlijn | Reden |
|---|---|---|---|
| Body tekst | 16 px | **18 px** | Vermoeide ogen na lange vlucht |
| Secundaire tekst / bijschrift | 14 px | **16 px** | Nooit kleiner — anders onleesbaar bij zon |
| Knop-label | 16 px | **18 px bold** | Herkenbaar onder druk |
| H1 (schermtitel) | — | **26 px bold** | Duidelijke hiërarchie |
| H2 (sectie) | — | **22 px semibold** | |
| Chinese zin (vol scherm) | — | **48–72 px** | Taxi-chauffeur moet op armlengte kunnen lezen |
| Pinyin-hint | — | **18 px lichtgrijs** | Uitspraak-hulp, niet dominant |

Gebruiker kan systeem-fontgrootte tot **200%** vergroten zonder horizontaal scrollen (WCAG 1.4.10 _Reflow_).

### Contrast (WCAG 1.4.3 AA + 1.4.6 AAA waar kritiek)

| Combinatie | Minimum | Onze doel |
|---|---|---|
| Body tekst (normale groep) | 4.5:1 (AA) | **≥ 7:1 (AAA)** |
| Grote tekst (≥18px bold / 24px) | 3:1 (AA) | **≥ 4.5:1** |
| Primaire knoppen | 3:1 UI (AA 1.4.11) | **≥ 7:1 tekst op knop** |
| Kritieke waarschuwing (nood, annuleren) | — | **AAA, 7:1+** |
| Secundaire iconen | 3:1 | 3:1 + altijd gelabeld |
| Placeholder / hint-tekst | — | **Nooit de énige bron** — altijd ook een label |

Geen informatie alleen met kleur. Iconen krijgen een tekstlabel (bijv. `🔊 Laat horen` ipv alleen 🔊).

### Touch targets (WCAG 2.5.5 AAA)

- **Minimaal 48 × 48 px** voor élke interactieve zone, ook iconen.
- **Aanbevolen 56 × 56 px** voor primaire acties (Start, Op vandaag, Laat horen).
- Tussen twee knoppen minimaal **8 px luchtruimte**.
- Filter-chips: 40 px hoog is te klein — **pill-vorm 44 px hoog, 12 px horizontaal padding**.
- Drag-handle in planner: 48 × 48 visueel klein, hit-area doorlopen tot celrand.

### Animatie en beweging (WCAG 2.3.3 AAA / 2.2.2)

- Respecteer `prefers-reduced-motion`. Standaard transitions ≤ 200 ms.
- **Geen flikker**, geen auto-play video. Carousel's stoppen bij focus.
- Stappen in het onboarding-walkthrough schuiven handmatig (swipe + knop), nooit automatisch.

---

## 2. Cognitieve belasting — leesbaarheid, taal, structuur

### Leesniveau

- **Doel: Nederlands B1** (gemiddeld begrijpelijk voor 90%+ van volwassenen, óók niet-moedertalers onder stress).
- Zinslengte gemiddeld **≤ 15 woorden**; max 22.
- Actieve stem, directe aanspreekvorm ("je/jullie" tutoyerend — dit is familie).
- Geen vaktermen zonder uitleg. "QR-code" → "QR-code (het vierkant­je om te scannen)". "VPN" → "VPN (toegang tot Google & WhatsApp)".
- Getallen in Arabische cijfers (`5 nachtjes`), niet voluit.

### Informatie-hiërarchie

- **Eén primaire actie per scherm.** Secundaire acties duidelijk kleiner en grijzer.
- **Brood-kruim niet nodig** op mobiel; altijd zichtbare **← Terug** linksboven.
- Belangrijke cijfers (tijd, prijs, afstand) zijn **dikgedrukt én iconisch gemarkeerd**.
- Niemand hoeft iets te onthouden tussen schermen. Elk scherm is zelf-uitleggend.

### Woorden-regel: vermijd

| Niet gebruiken | Gebruik wel |
|---|---|
| "Input" | "Invoer" / "Iets intikken" |
| "Saven" | "Opslaan" |
| "Device" | "Telefoon" |
| "Payment method" | "Manier van betalen" |
| "Location services" | "Waar ben ik" |
| "Acceptance" | "Ja / Akkoord" |

---

## 3. Offline-first UX (kritiek voor China)

China's Great Firewall + variabele 4G in toeristengebieden = **we plannen voor geen-internet als normaal, niet uitzondering.**

### Principes

1. **Alles wat al gezien is, blijft bruikbaar zonder internet.** Eenmaal geladen locaties, favorieten, dagplan — allemaal cached.
2. **Schrijven naar Supabase queued lokaal.** Verschijnt direct in UI; sync'et vanzelf.
3. **Statusindicator**: discreet cloud-icoontje rechtsboven:
   - ✓ cloud → alles gesynct
   - ⟳ cloud → bezig
   - ☁︎ cloud offline → wachtrij
   - Geen scary rode "GEEN VERBINDING"-banner, nooit.
4. **Kaart-tiles** pre-cached voor Xi'an-binnen­stad, Beijing-centrum, Mutianyu, Jingshan, Terracotta-site.
5. **Chinese zinnen** werken volledig offline. TTS ligt standaard op `zh-CN` systeem-stem; bij afwezigheid tonen we alleen de tekst + pinyin (geen stilte-fout).
6. **Afbeeldingen lazy-load**, maar met `fetchpriority="low"` en fallback-plaatsholder. Geen broken-image icoon ooit.

### Service worker gedrag

- Precache: app shell, i18n JSON's, eerste map-tiles, phrases.json.
- Runtime cache: locatie-foto's (stale-while-revalidate).
- Nooit oude content "expiren" terwijl offline — alleen vervangen bij geslaagde refresh.

---

## 4. Senior-specifieke aandachtspunten

### Geen tijdsdruk

- **Geen timers** waar iets "binnen 30 seconden" moet. WCAG 2.2.1.
- Bevestigings-dialogen hebben géén auto-close.
- Toasts verschijnen 4 sec (standaard 2 sec is voor senioren te kort om te lezen).

### Bevestiging bij destructief

- Verwijder-acties altijd met modal (nooit alleen een "X").
- Modal-kop begint met de actie: "Weg uit jullie dag?" — niet "Zeker weten?".
- Vernietigende knop: rood + het actie-woord ("Verwijderen", niet "OK").
- Niet-destructieve knop links (gewoonte-positie), destructieve rechts.

### Één kolom op mobiel

- Geen multi-column layouts onder 768 px.
- Lange lijsten: max 5 items zichtbaar voor scroll-hint; daarna "Meer laden" of native scroll.
- Kaart-weergave en lijst-weergave hebben **beide een zichtbare toggle**, nooit alleen één weg.

### Altijd een weg terug

- **← Terug** linksboven op élk scherm behalve de 5 hoofd-tabs.
- Browser-back werkt hetzelfde als de in-app knop (geen onverwachte page-reloads).
- "Home"-icoon (🏠) altijd bereikbaar in de tab-bar.

### Minder opties per moment

- Filters zitten achter één knop "🔍 Filteren" + een tellertje wanneer actief.
- Planner-cel heeft 3 acties max: ⏰ tijd, 📝 notitie, 🗑️ weg.
- Home heeft **max 4 primaire kaarten**. Meer → "Alle snelkoppelingen".

### Voorkeur voor consistentie

- Hoofd­navigatie verandert nooit van plek of kleur.
- Dezelfde actie ziet er overal hetzelfde uit (`+ Op vandaag` heeft altijd hetzelfde icoon en label).
- Taal-switch staat altijd rechts boven, met huidig actief *in kleur* en de andere twee grijs.

### Audio-hulp

- Bij élke Chinese zin en élke kritieke waarschuwing is een **🔊 Laat horen** knop.
- Volume-hint: bij eerste tik een discrete tip _"Zet je geluid hard"_ (dismiss-baar).

---

## 5. Toets- en schermlezer-ondersteuning (WCAG 2.1)

- Volledig bedienbaar met een externe toetsenbord (WCAG 2.1.1).
- Focus-indicator zichtbaar met **3 px ring, contrast 3:1+** (WCAG 2.4.7 + 2.4.11 in WCAG 2.2).
- Logische tab-volgorde: taalswitch → hoofdnavigatie → primaire actie → secundaire → content.
- Correcte landmark-rollen: `<header>`, `<nav>`, `<main>`, `<footer>`.
- Alle iconen `aria-hidden="true"` als er een tekstlabel naast staat; `aria-label` als stand-alone.
- Afbeeldingen hebben `alt`: beschrijvend voor contextuele beelden, leeg voor puur decoratief.
- Formulier-elementen altijd met `<label>` (niet alleen placeholder).
- Live updates (sync-status, toast) via `aria-live="polite"`.
- Taal-wissel zet `<html lang>` naar "nl", "es" of "zh-CN".

---

## 6. Anti-oplichting — toon-richtlijnen

**Doel:** informeren zonder vrees. Reizigers die bang zijn om opgelicht te worden, hebben minder plezier. We willen dat ze geïnformeerd afdingen, niet dat ze geen markt meer durven op.

### Vuistregels

1. **Begin met "Goed om te weten"** in plaats van "Pas op" / "Let op".
2. **Noem de rol, niet de persoon.** "Sommige verkopers" in plaats van "ze".
3. **Geef een actie mee.** Elke tip eindigt met wat je kunt doen (`vraag éérst de prijs`, `tel je wisselgeld rustig na`).
4. **Frequentie eerlijk benoemen.** "Zelden", "soms", "een enkele keer" — niet "vaak" of "altijd".
5. **Geen negatieve culturele generalisaties.** Nooit "Chinezen doen X" — altijd "op deze markt" of "in dit soort winkeltjes".
6. **Met een knipoog kan, dramatisch nooit.** "Geniet ervan als decoratie, niet als investering" is goed.

### Voorbeeld-vergelijking

| 🚫 Nee | ✅ Ja |
|---|---|
| "PAS OP voor oplichters op de markt!" | "Goed om te weten: op markten hoort afdingen erbij. Begin op 30% van de vraagprijs." |
| "Veel verkopers geven vals wisselgeld." | "Tel je wisselgeld rustig na — verkopers vinden een zorgvuldige klant prettig." |
| "Nep-antiek is overal — je wordt bedrogen." | "'Antieke' stukken op Panjiayuan zijn prachtig als decoratie. Echt antiek is zeldzaam." |
| "DUWEN SUBSTANTIE — SIMONS NIET!" | "Bij gratis proeven soms subtiele aandrang. Voel je niet verplicht." |

### Ter-afsluiting gevoel

Na het lezen van de 12 tips zou Oma moeten denken: *"Oké, nu weet ik hoe het werkt, lekker shoppen."* — niet *"Ik durf dadelijk niks te kopen."*

---

## 7. Kleur- en beeld-toegankelijkheid

### Kleurenblindheid

- Groen ↔ rood nooit de énige informatie (verwijder = rood + tekst "Verwijderen" + 🗑️).
- Status-indicatoren gebruiken óók een vorm of icoon (✓ / ⟳ / ☁︎).
- Getest met Deuteranopie + Tritanopie simulator.

### Beelden

- **Belangrijke informatie nooit alleen in een plaatje** (openingstijden als tekst, niet in de foto).
- Landkaart heeft een lijst-alternatief (toggle rechtsboven op Kaart-scherm).
- Chinees schrift nooit als plaatje — altijd echte tekst voor zoomen en copy-paste.

---

## 8. Testplan (vóór deploy)

| Test | Hoe | Slaag-criterium |
|---|---|---|
| Axe-linter WCAG 2.1 AA | `@axe-core/cli` op elk scherm | Geen kritieke issues |
| Lighthouse Accessibility | Chrome DevTools | ≥ 95 per scherm |
| Contrast-check primaire knoppen | WebAIM Contrast Checker | ≥ 7:1 |
| Tap-target audit | Inspect & meten | ≥ 48×48 overal |
| Schermlezer-walk | iOS VoiceOver + Android TalkBack | Elk scherm volledig navigeerbaar |
| Senior-proeftest | Lees-sessie met een 70+ gebruiker (kan Jack zelf regelen vóór vertrek) | Kan zonder hulp: vandaag openen, iets toevoegen, Chinees zinnetje tonen, noodnummer vinden |
| Offline-scenario | Chrome DevTools → Offline, dan alle 5 schermen | Geen blocking errors, alles wat gecachet is werkt |
| Zoom-test | Chrome 200% + iOS dynamic type XXL | Geen horizontaal scroll, geen overlap |
| Kleurenblindheid | Coblis / Chrome DevTools Emulate Vision | Alle statussen herkenbaar |
| Felle-zon-simulatie | Max helderheid + outdoor-reflectie | Tekst leesbaar, contrast houdbaar |

---

## 9. Bijzondere scenario's (senior + eerste China-reis)

### Scenario A — Oma moet naar het toilet in een shopping mall

1. Tik op 🆘 (altijd zichtbaar in de tab-bar? nee — op Hulp-scherm, snel bereikbaar).
2. Of tik op Chinese zinnen → 🏨 Hotel → "Waar is de wc?" toont 洗手间在哪里？ in vol-scherm.
3. Vol-scherm-modus: kop klein NL "Toon dit aan een medewerker", grote ZH in midden, pinyin eronder. Scherm blijft aan (wake-lock).

**Succes:** < 15 sec van intentie naar zin in de hand van een medewerker.

### Scenario B — De taxichauffeur begrijpt het adres niet

1. Op een locatie-detail → `📋 Adres` kopieert NL+ZH adres naar klembord.
2. Alternatief: op de kaart-pin → 🚕-knop → direct vol-scherm met ZH adres + "Kunt u mij hier naartoe brengen?" + prijsschatting.

**Succes:** adres in ZH leesbaar vanaf armlengte voor chauffeur; geen vertaling nodig door reizigers.

### Scenario C — Geen internet tijdens een muur-trip

1. Kaart laadt gecachete tiles rondom Mutianyu.
2. Locatie-details tonen alle info zonder sync-foutmeldingen.
3. Planner toont het plan van vandaag; eventuele bewerkingen worden gequeued.
4. Sync-indicator: ☁︎ grijs + klein getal (aantal wachtende wijzigingen). Tap = korte uitleg.

**Succes:** gebruiker merkt niets op behalve het subtiele icoon.

### Scenario D — Iemand voelt zich onwel

1. Op Hulp-scherm: kaart "🆘 In noodgevallen" met 3 knoppen:
   - **📞 Bel 120 (ambulance)**
   - **💊 Ik heb een apotheek nodig** (toont ZH zin + kaart met dichtstbijzijnde)
   - **🏥 Verzekering contact** (pre-filled reizigers-verzekering NL)
2. Medische zinnen werken offline en klikken door naar vol-scherm modus.

---

## 10. Samenvatting — top-10 niet-onderhandelbare regels

1. Body text ≥ 18 px.
2. Touch target ≥ 48 × 48 px.
3. Contrast ≥ 7:1 voor alles wat door senioren wordt gelezen.
4. Elke icon-only knop krijgt ofwel een tekst-label of een `aria-label`.
5. Geen tijdsdruk, geen auto-close op belangrijke dialogen.
6. Alle kritieke flows werken **offline** (zinnen, kaart-tiles, dagplan).
7. Destructieve acties vragen altijd bevestiging en zijn kleur+woord gemarkeerd.
8. Één primaire actie per scherm; geen mobiele multi-column layouts.
9. "← Terug" op élk niet-hoofd-tabblad, linksboven, consistent.
10. Anti-scam-copy begint met **"Goed om te weten"**, nooit met "Pas op".

---

_Deze review sluit aan op `DESIGN_SPEC.md` en `UX_COPY.md`. Afwijkingen tijdens implementatie worden hier gelogd in sectie 11 (Issue-log)._

## 11. Issue-log (wordt ingevuld tijdens implementatie)

_Nog leeg — bij elke nieuwe a11y-check die tijdens de build wordt ontdekt, beknopt toevoegen: datum, scherm, bevinding, oplossing._
