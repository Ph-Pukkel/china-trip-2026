# Reisgenoot China 2026 — DESIGN SPEC

_Product designer handoff voor de mobiele PWA. Audience: echtpaar 70+ (primair) + 3 volwassen kinderen (45–50). NL primair, ES secundair, ZH voor praktische communicatie met taxi/restaurant. Mobile-first HTML + Tailwind + vanilla JS, PWA, geen build step._

Geldig vanaf 20 april 2026. Reis: 25 april – 2 mei 2026. Xi'an + Beijing.

---

## 0. Ontwerpfilosofie in één zin

> "Oma opent de app bij een druk taxi-stationnetje in Xi'an. Binnen 3 seconden zonder bril weet ze: wat is de volgende stop, wat is het adres in het Chinees, en waar is de rode hulp-knop."

Alles in dit document dient dat moment.

---

## 1. Design principes (7)

| # | Principe | Waarom (door de bril van de 70+ reiziger) |
|---|---|---|
| 1 | **Eén tik per beslissing.** Elk scherm heeft één primaire actie die visueel domineert. Geen carousels, geen verborgen menus. | Senioren raken het spoor bijster bij keuzedruk. Als "de grote knop" altijd de juiste is, hoeven ze de interface niet te leren — ze volgen 'm. |
| 2 | **Nederlands eerst, Chinees altijd ≤1 tik weg.** Alle primaire copy in NL; elk adres en restaurant heeft een altijd-zichtbare "Toon in Chinees"-knop; taalswitch NL/ES/ZH in de header. | Ze lezen NL moeiteloos, maar moeten op onverwachte momenten snel iets aan een Chinees kunnen laten zien. Die transitie mag nooit door een menu. |
| 3 | **Vertrouwen bovenaan, paniek aan de zijlijn.** Homepage toont rust (dag X van 8 + eerstvolgende stap); scams, noodgevallen en taxi-kaart zijn altijd bereikbaar via één herkenbare "Hulp"-tab. | Hulp mag nooit gezocht worden — als je 'm zoekt is het al te laat. Maar hij mag ook niet de sfeer verzieken: dus zichtbaar, niet prominent. |
| 4 | **AAA-contrast op kritieke acties. AA op alles.** Primaire knoppen, noodwaarschuwingen en Chinese adressen voldoen aan WCAG AAA (≥7:1). Rest ≥4.5:1. | 70-jarige ogen met staar of leesbril op, buiten in fel Chinees voorjaarszonlicht, moeten dit kunnen lezen zonder schaduw. |
| 5 | **Geen rauwe iconen.** Elk icoon heeft een NL-tekstlabel eronder of ernaast. Icoon verdwijnt nooit "voor elegantie". | De universele betekenis van iconen is een mythe voor niet-native digitale gebruikers. Tekst ernaast = altijd goed. |
| 6 | **Offline-first, nooit stil falen.** Alles wat ze vandaag al gezien hebben blijft zichtbaar zonder internet. Bij geen verbinding: rustige banner "Zonder internet — je planning blijft werken", nooit een rode fout. | Veel van China loopt zonder VPN vast. Een wit scherm of "network error" veroorzaakt paniek. Een geruststellende banner niet. |
| 7 | **Warm, niet zakelijk.** Terracotta, oker, crème — geen ziekenhuis-wit, geen banken-blauw. Afgeronde hoeken (rounded-2xl), zachte schaduwen, illustratieve foto's per locatie. | De app moet voelen als een reisgids van een lieve kleindochter, niet als een Chinese overheidsportaal. Emotionele warmte = lager cognitief drempel. |

**Niet-principes** (expliciet weggelaten, zodat de principes scherp blijven):

- Niet: "minimalistisch". Senioren hebben duidelijkheid nodig, geen leegte.
- Niet: "dark mode". Eén consistent thema — één minder knop om te zoeken.
- Niet: "power-user shortcuts". Geen gestures, geen long-press menu's, geen swipe-to-delete zonder confirm.

---

## 2. Kleursysteem

### 2.1 Palet

Warm-oosters, crème-basis, terracotta-accent, diep teal voor vertrouwen. Bewust géén hard Chinees rood als dominante kleur (cultureel oké, maar te aggro en slecht voor contrast).

| Rol | Naam | Hex | Tailwind-alias | Op wit (WCAG) | Op crème `#FAF6EF` |
|---|---|---|---|---|---|
| **Primary** (CTA, tabs active) | Terracotta 600 | `#B4451F` | `brand-600` | 5.86:1 ✅ AA | 5.52:1 ✅ AA (lg text AAA) |
| Primary hover | Terracotta 700 | `#8E3414` | `brand-700` | 8.34:1 ✅ AAA | 7.85:1 ✅ AAA |
| Primary tekst-op | Crème | `#FAF6EF` | `brand-50` | — | op brand-600: 5.86:1 ✅ AA large; op brand-700: 8.34:1 ✅ AAA |
| **Secondary** (trust, links, map pins) | Deep Teal 700 | `#0E5A5E` | `trust-700` | 8.14:1 ✅ AAA | 7.66:1 ✅ AAA |
| Secondary soft | Teal 100 | `#D5ECEC` | `trust-100` | (achtergrond) | — |
| **Accent** (favoriet, highlight) | Oker 500 | `#D39E3A` | `accent-500` | 3.02:1 ❌ (alleen groot) | 2.84:1 ❌ (alleen groot) |
| Accent donker (tekst) | Oker 800 | `#6B4A0F` | `accent-800` | 9.71:1 ✅ AAA | 9.14:1 ✅ AAA |
| **Success** (toegevoegd, gedaan) | Jade 700 | `#1E6F4A` | `success-700` | 6.63:1 ✅ AA | 6.24:1 ✅ AA |
| Success soft | Jade 100 | `#D8EBDE` | `success-100` | — | — |
| **Warning** (sluitdagen, drukte) | Saffraan 700 | `#9A5A00` | `warn-700` | 5.82:1 ✅ AA | 5.48:1 ✅ AA |
| Warning soft | Saffraan 100 | `#FBEBCC` | `warn-100` | — | — |
| **Danger** (noodgeval, scam) | Vermiljoen 700 | `#B01E24` | `danger-700` | 6.83:1 ✅ AA (large AAA) | 6.43:1 ✅ AA |
| Danger soft | Vermiljoen 100 | `#F7DADB` | `danger-100` | — | — |
| **Bg basis** | Crème | `#FAF6EF` | `bg` | — | — |
| **Bg kaart** | Wit warm | `#FFFDF8` | `bg-card` | — | — |
| **Tekst primair** | Inkt 900 | `#1A1613` | `ink-900` | 17.4:1 ✅ AAA | 16.4:1 ✅ AAA |
| **Tekst secundair** | Inkt 700 | `#3E352E` | `ink-700` | 11.4:1 ✅ AAA | 10.7:1 ✅ AAA |
| **Tekst hint** | Inkt 500 | `#6F6055` | `ink-500` | 5.07:1 ✅ AA | 4.77:1 ✅ AA |
| **Border zacht** | Zand 200 | `#E8DFD1` | `line` | — | — |

### 2.2 Regels

- **Achtergrond app:** `bg` (crème), nooit puur wit. Minder lichtflux op oudere ogen.
- **Kaarten en modals:** `bg-card` op `bg` — het subtiele verschil creëert diepte zonder slagschaduw.
- **Accent oker** mag nooit op wit als body tekst gebruikt worden. Alleen voor iconen ≥24px of als vlak.
- **Rood (danger) mag nooit meer dan 20% van een scherm bedekken.** Rood is paniek; overmatig rood = constant alarm.

### 2.3 CSS custom properties (voor Tailwind config)

```css
:root {
  --bg: #FAF6EF;
  --bg-card: #FFFDF8;
  --ink-900: #1A1613;
  --ink-700: #3E352E;
  --ink-500: #6F6055;
  --line: #E8DFD1;
  --brand-600: #B4451F;  --brand-700: #8E3414;  --brand-50: #FAF6EF;
  --trust-700: #0E5A5E;  --trust-100: #D5ECEC;
  --accent-500: #D39E3A; --accent-800: #6B4A0F;
  --success-700: #1E6F4A; --success-100: #D8EBDE;
  --warn-700: #9A5A00;    --warn-100: #FBEBCC;
  --danger-700: #B01E24;  --danger-100: #F7DADB;
}
```

---

## 3. Typografie

### 3.1 Font stack (geen webfonts — werkt offline zonder download)

```css
font-family:
  ui-sans-serif, system-ui, -apple-system, "Segoe UI Variable", "Segoe UI",
  Roboto, "Helvetica Neue", Arial, "Noto Sans", "PingFang SC", "Microsoft YaHei",
  "Hiragino Sans GB", sans-serif;
```

De Chinese fallbacks (`PingFang SC`, `Microsoft YaHei`, `Hiragino Sans GB`) zijn standaard op iOS/Android/Windows en renderen Chinese karakters vlekkeloos — cruciaal voor taxi-kaart en phrase-cards.

### 3.2 Schaal (mobile-first, base 18px — groter dan default 16px)

| Rol | px / rem | Line-height | Weight | Tailwind | Voorbeeld |
|---|---|---|---|---|---|
| Display (hero "Goedemorgen") | 36 / 2.25 | 1.15 | 700 | `text-4xl font-bold leading-tight` | Homepage groet |
| H1 (schermtitel) | 28 / 1.75 | 1.2 | 700 | `text-[28px] font-bold leading-tight` | "Vandaag", "Verken" |
| H2 (sectiekop) | 22 / 1.375 | 1.3 | 600 | `text-[22px] font-semibold` | "Eerstvolgende stop" |
| **Body L** (primair) | **18 / 1.125** | **1.55** | **400** | `text-[18px] leading-relaxed` | Alle body tekst |
| Body M (secundair) | 16 / 1 | 1.5 | 400 | `text-base` | Metadata onder kaart |
| Small (meta) | 14 / 0.875 | 1.45 | 400 | `text-sm` | Tijdstempels, "door Oma" |
| Button L | 20 / 1.25 | 1 | 600 | `text-xl font-semibold` | Primaire CTA |
| Button M | 18 / 1.125 | 1 | 600 | `text-[18px] font-semibold` | Secundaire |
| Chinese karakter groot | 40 / 2.5 | 1.4 | 500 | `text-[40px] leading-snug` | Taxi-kaart |
| Chinese karakter inline | 22 / 1.375 | 1.5 | 500 | — | In phrase-card |
| Pinyin | 16 / 1 | 1.4 | 400 italic | `text-base italic text-ink-500` | Onder Chinees |

### 3.3 Hiërarchie (Nederlandse toon)

- **Headings in zinsvorm** — "Eerstvolgende stop" (niet "EERSTVOLGENDE STOP" of "Eerstvolgende Stop"). Lezen is gemakkelijker.
- **Geen all-caps** behalve op de letterlijke afkorting CNY.
- **Getallen altijd met NL-notatie** — `€ 1.250` (punt als duizendtalscheiding), tijd `14:30`, datum `za 25 apr`.
- **Chinees karakter + pinyin altijd samen** — nooit alleen pinyin (taxi begrijpt het niet), nooit alleen karakters (kinderen kunnen dan niet meelezen).

### 3.4 Line-height, letter-spacing

- Body `leading-relaxed` (1.55) — ruimte om woorden snel te scannen.
- Headings `leading-tight` (1.15–1.2) — compact blok.
- Geen extra `letter-spacing`, behalve `tracking-wide` op één plek: de `京B`-kenteken-check op Taxi-kaart (mono feel).

---

## 4. Component library

Elke component: **doel · visueel · states · maten · toegankelijkheid**. Klassen in Tailwind; aannames in Tailwind config uitgebreid met custom colors hierboven.

### 4.1 Button

**Doel:** duidelijke actie initiëren. Drie varianten; nooit méér.

| Variant | Wanneer | Tailwind |
|---|---|---|
| **Primary** | De hoofdactie op een scherm (max 1) | `bg-brand-600 text-brand-50 hover:bg-brand-700 active:bg-brand-700 shadow-sm` |
| **Secondary** | Alternatieve actie (max 1 naast primary) | `bg-trust-100 text-trust-700 hover:bg-trust-700 hover:text-white border border-trust-700/20` |
| **Ghost** | Tertiaire actie, navigatielink-achtig | `bg-transparent text-ink-900 hover:bg-line/50 underline-offset-2` |
| **Danger** | Verwijderen, afsluiten met gevolg | `bg-danger-700 text-white hover:bg-[#8A171C]` |

**Maten**

| Maat | Hoogte | Padding X | Font | Gebruik |
|---|---|---|---|---|
| L | **56px** | 24 | 20/600 | Primaire CTA op scherm, "Voeg toe aan mijn dag" |
| M | **48px** | 20 | 18/600 | In kaarten, modals |
| S | 40px | 16 | 16/600 | Alleen in tabellen/diary — zelden |

Minimum touch target = 48×48 altijd. S-button heeft 4px extra padding om touch ring ≥48px te houden.

**States**

- `default` zoals boven.
- `hover` (desktop only, telefoon negeert): iets donkerder.
- `active`/pressed: `transform scale-[0.98] transition-transform duration-75` — geeft CSS-"haptic" gevoel.
- `focus-visible`: `ring-4 ring-brand-600/40 ring-offset-2 ring-offset-bg` — enorm zichtbaar, want keyboard/screenreader.
- `disabled`: `opacity-50 cursor-not-allowed` + `aria-disabled="true"`; nooit écht `disabled` als er een geldige reden is die we kunnen uitleggen (toon `title` met uitleg).
- `loading`: vervang label door "Bezig…" + kleine spinner; knop blijft zelfde breedte; `aria-busy="true"`.

**Anatomy**

```html
<button class="h-14 px-6 rounded-2xl bg-brand-600 text-brand-50 text-xl font-semibold
               shadow-sm transition active:scale-[0.98]
               focus-visible:ring-4 focus-visible:ring-brand-600/40 focus-visible:ring-offset-2
               flex items-center justify-center gap-2 min-w-[48px]">
  <svg aria-hidden="true" class="w-6 h-6">…</svg>
  Voeg toe aan mijn dag
</button>
```

**Toegankelijkheid**

- Altijd tekst in de knop. Icon-only alleen met `aria-label` én een zichtbaar label elders (bv. bottom tab bar, waar tekst onder icoon staat).
- Contrast ≥7:1 op primary.
- Tap target ≥48×48 inclusief padding.

---

### 4.2 Card

Vier varianten. Alle gedeeld: `bg-bg-card rounded-2xl border border-line p-4 shadow-[0_1px_2px_rgba(60,40,20,0.04)]`.

#### 4.2.1 Location card (in Verken, Kaart-tooltip)

```
┌────────────────────────────────┐
│  [ foto 16:9, afgerond ]       │
│                                │
│  Terracotta Leger              │  <- H2, text-[22px] font-semibold
│  秦始皇帝陵博物院 / 兵马俑      │  <- ZH, text-[18px], ink-700
│                                │
│  [🏛️ Museum] [UNESCO] [Senior ✓]│  <- chips
│                                │
│  ⏰ 8:30–18:30 · ⏱️ ~4u · 💴 120 Y│  <- body-M, ink-700
│  📍 Xi'an · metro Lijn 9       │
│                                │
│  ─────────────────────────     │  divider
│  [ Voeg toe aan mijn dag  + ]  │  <- primary button full-width
│  [ Toon op kaart ] [ ♥ ]       │  <- ghost, 2 columns
└────────────────────────────────┘
```

**States**

- `default`
- `in-planner` — groene dunne rand (`border-success-700`) + badge rechtsboven "✓ In jouw planning"
- `closed-today` — warning-100 banner bovenaan: "⚠ Vandaag gesloten (di)"
- `favorite` — hartje vol (`accent-500`)

#### 4.2.2 Shopping tip card

Kleiner, horizontaal. Gebruikt in Hulp → shoppen en in Verken onder `category=shopping`.

```
┌──────────────────────────────┐
│ [foto 96×96] │ Wangfujing    │
│              │ Winkelstraat  │
│              │ 王府井大街     │
│              │ 🕓 Avondmarkt  │
└──────────────────────────────┘
```

#### 4.2.3 Diary card (dagboekje)

```
┌────────────────────────────────┐
│ Donderdag 30 apr · dag 6       │  <- meta
│ [ foto, optioneel ]            │
│ "De hutongs waren magisch      │
│  en Pedro vond een kat."       │  <- body-L
│ — door Oma, 19:42              │  <- small ink-500
└────────────────────────────────┘
```

#### 4.2.4 Brand card (op Thuis: "Vandaag is dag X")

Grote hero card, terracotta gradient achtergrond, crème tekst.

```
┌────────────────────────────────┐
│ Goedemorgen 👋                 │  <- Display
│                                │
│ Vandaag is dag 4 van 8         │  <- H2
│ Dinsdag 28 april — Beijing     │  <- body-L, ink-700
│                                │
│ [ Bekijk mijn dag → ]          │  <- primary L
└────────────────────────────────┘
```

Tailwind: `bg-gradient-to-br from-brand-600 to-brand-700 text-brand-50 rounded-3xl p-6`.

---

### 4.3 Filter chip

**Doel:** meerdere filters tegelijk aan/uit. Gebruikt in Verken.

**Visueel**

- Off (default): `bg-bg-card text-ink-700 border border-line px-4 h-11 rounded-full text-base`
- On (selected): `bg-brand-600 text-brand-50 border-brand-600` + kleine ✓ ervoor
- Hover/active: scale 0.98

**Maten**

- Hoogte 44px (net onder 48px wegens veel chips horizontaal; touch target compenseren met `py-3 -my-3` onzichtbare padding → effectief 50px)
- Padding X 16px
- Gap tussen chips: 8px
- Rij wraps automatisch (`flex flex-wrap gap-2`)

**Toegankelijkheid**

- `role="button"` + `aria-pressed="true|false"`
- Tekstlabel altijd aanwezig (nooit alleen icoon).
- Screen reader zegt: "Museum, filter, aan" / "Museum, filter, uit".

---

### 4.4 Bottom tab bar (5 tabs)

**Structuur:** vast onderaan, `h-20` (80px), veilige zone `pb-[env(safe-area-inset-bottom)]`.

```
┌─────────────────────────────────────┐
│  🏠      📅      🧭      🗺️      💡  │
│  Thuis  Vandaag  Verken  Kaart  Hulp│
└─────────────────────────────────────┘
```

**Per tab**

- Icoon 28×28 (boven), label 14/600 (onder), 4px gap.
- Active: icoon + label in `brand-600`, bovenaan de tab een 3px `brand-600` onderstreeplijn (niet boven, want onderaan zit het dichter bij duim).
- Inactive: `ink-500`.
- Touch target hele tab: 60×80.

**Staat & navigatie**

- Scrollt niet weg (fixed). Op scroll naar beneden op Verken: blijft staan — senioren mogen de navigatie nooit "kwijtraken".
- Tik op actieve tab = scroll naar top van dat scherm.

**Toegankelijkheid**

- `role="tablist"`, elke tab `role="tab"` met `aria-selected`.
- Labels uit `i18n` — NL/ES/ZH: `Thuis/Inicio/首页 · Vandaag/Hoy/今天 · Verken/Explorar/探索 · Kaart/Mapa/地图 · Hulp/Ayuda/帮助`.

---

### 4.5 Header met taalswitcher

**Structuur:** `h-14` (56px), sticky top, `bg-bg/90 backdrop-blur border-b border-line`.

```
┌─────────────────────────────────────┐
│  ← Terug      Verken       🌐 NL ▾  │
└─────────────────────────────────────┘
```

- Linker slot: terug-pijl (alleen op detailschermen); 48×48 touch target.
- Midden: schermtitel H2 (niet op Thuis — daar is groot hero-card).
- Rechts: **taalswitcher**, dropdown met 3 opties:

```
🌐 NL ▾
  ● Nederlands
  ○ Español
  ○ 中文
```

- Altijd vlag-vrij (vlag = politiek gedoe met Taiwan); gebruik codes NL / ES / 中文.
- Tap opent een bottom-sheet modal met 3 grote opties (48px rij).
- Keuze blijft opgeslagen in `localStorage.lang`.

**Toegankelijkheid**

- `<button aria-haspopup="listbox" aria-label="Taal kiezen, nu Nederlands">`
- Na keuze: live region update `aria-live="polite"` → "Taal gewijzigd naar Español".

---

### 4.6 Modal / Bottom sheet

**Gebruik:** snelle acties, confirm-dialogen, "toon Chinees adres" overlay.

**Visueel**

- Slides up van onderaan, `rounded-t-3xl`, `bg-bg-card`, schaduw bovenop `shadow-[0_-4px_20px_rgba(60,40,20,0.12)]`.
- Drag handle bovenaan (4×36px `bg-line` bar) — visueel signaal "ik kan naar beneden".
- Achtergrond: `bg-ink-900/40` overlay, blur `backdrop-blur-sm`.
- Max hoogte `85vh`, scrollbaar binnen.

**States**

- `opening` — translate-y 100% → 0 in 200ms `ease-out`.
- `closing` — omgekeerd, 150ms `ease-in`.
- `dismissible` — tik op achtergrond of drag naar beneden sluit.
- `locked` — destructive confirms kunnen niet door drag-down gesloten worden; alleen via expliciete knop.

**Toegankelijkheid**

- `role="dialog" aria-modal="true" aria-labelledby="sheet-title"`.
- Focus-trap binnen modal.
- Escape key sluit (voor desktop).
- Na sluiten: focus terug op trigger-element.

**Content-structuur**

```
┌────────────────────────────────┐
│          ▬▬▬▬▬ (handle)         │
│                                │
│ Chinees adres voor de taxi     │  <- H2
│                                │
│  [ 陕西省西安市… ] groot        │  <- 40px ZH
│  Qinling Beilu, Lintong…       │  <- 16 ink-500
│                                │
│ [   🔊 Uitspraak afspelen    ] │  <- secondary L
│ [   📋 Kopieer adres         ] │  <- ghost L
│ [           Sluiten          ] │  <- ghost L
└────────────────────────────────┘
```

---

### 4.7 Empty states

**Patroon:** illustratie/emoji + kop + uitleg + actie.

| Scherm | Empty copy |
|---|---|
| Vandaag leeg | **Nog niets gepland voor vandaag.**<br>Voeg iets toe uit Verken — of rust lekker uit, dat mag ook.<br>**[ Ga naar Verken ]** |
| Favorieten leeg | **Nog geen favorieten.**<br>Tik op het ♥ bij een plek om 'm hier te bewaren.<br>**[ Ontdek plekken ]** |
| Zoekresultaat leeg | **Niks gevonden voor "…".**<br>Probeer een kortere zoekterm, of kies uit de filters hieronder.<br>**[ Wis zoekopdracht ]** |
| Dagboek leeg | **Nog geen herinneringen.**<br>Aan het eind van een dag kun je één regel invullen — wordt jullie reisherinnering.<br>**[ Schrijf vandaag ]** |

**Visueel:** gecentreerd, 64px emoji, H2 kop, body-L uitleg (max 2 regels), primary button.

---

### 4.8 Loading skeletons

**Patroon:** grijze blokken (`bg-line/60`) met subtiele `animate-pulse`, in de exacte vorm van het komende content.

**Nooit spinner-only.** Spinners maken senioren onzeker ("is de app stuk?"). Skeletons tonen "de vorm komt eraan".

```html
<div class="animate-pulse">
  <div class="h-44 bg-line rounded-2xl mb-3"></div>
  <div class="h-6 bg-line rounded w-3/4 mb-2"></div>
  <div class="h-4 bg-line rounded w-1/2"></div>
</div>
```

**Duration:** skeleton toont minimaal 150ms (anders flicker), maximaal 3s. Na 3s → "Duurt langer dan verwacht — controleer je internetverbinding" banner.

---

### 4.9 Error states

Drie soorten — verschillend in toon:

| Soort | Toon | Voorbeeld |
|---|---|---|
| **Offline / netwerk** | Rustig, geruststellend — `bg-warn-100 text-warn-700` banner boven content. | "Je bent zonder internet. Je planning blijft gewoon zichtbaar." |
| **Data niet gevonden** | Neutraal — empty state met suggestie. | "Deze plek kon niet geladen worden. Probeer het straks opnieuw." |
| **Kritieke fout** (mutation faalt) | Alert — `bg-danger-100 border-danger-700` modal, maar met oplossing. | "De wijziging is nog niet opgeslagen. We proberen het zodra je weer internet hebt. **[ Oké, begrepen ]**" |

**Nooit:** rode pagina-vullende error, stack-trace, "Error 500", technisch jargon.

---

### 4.10 Chinese phrase card

**De belangrijkste custom component.** Dit is wat de oma aan de kelner laat zien.

**Structuur:**

```
┌────────────────────────────────┐
│ Ik heb een tafel voor 5         │  <- NL, H2 22/600
│ Tengo una mesa para 5           │  <- ES, body-L, ink-500 (optioneel)
│                                │
│ ┌────────────────────────────┐ │
│ │  我们有五个人的位子         │ │  <- ZH, 40px, weight 500, center
│ │                            │ │
│ │  Wǒmen yǒu wǔ gè rén       │ │  <- pinyin, 16 italic, ink-500
│ │  de wèizi                  │ │
│ └────────────────────────────┘ │
│                                │
│ [    🔊 Laat horen            ]│  <- secondary L, h-14
│ [  📋 Kopie  ] [ ⭐ Bewaar  ]  │  <- ghost, 2 col
└────────────────────────────────┘
```

**Visueel**

- Kaart zelf: `bg-bg-card rounded-2xl p-5 border border-line`
- ZH-blok: iets donkerder `bg-trust-100/40 rounded-xl p-4` — visueel het "laten-zien"-deel.
- Op tik op 🔊: knop verandert 2s in `bg-success-700 text-white` "🔊 Speelt af…" met puls-animatie.

**TTS-implementatie**

```js
const u = new SpeechSynthesisUtterance(chineseText);
u.lang = 'zh-CN';
u.rate = 0.85;          // iets trager dan default — duidelijker
speechSynthesis.speak(u);
```

**States**

- `default`
- `playing` — knop pulseert, progress bar onderaan kaart
- `unavailable` (geen TTS-support) — 🔊 knop vervangen door "Speler niet beschikbaar op dit toestel"
- `bookmarked` — ⭐ gevuld + gele rand

**Toegankelijkheid**

- `lang="zh-CN"` attribuut op ZH-tekst zodat screenreaders het correct uitspreken.
- 🔊 knop met `aria-label="Zin hardop laten voorlezen in het Chinees"`.
- Contrast ZH-tekst op trust-100 achtergrond: `ink-900` → 16:1 AAA.

---

### 4.11 Day planner row

**Gebruikt op Vandaag/Planning. Drag-reorder + tik voor detail.**

```
┌────────────────────────────────┐
│ ⠿  09:00   Terracotta Leger    │
│    2–3 uur   👤 door Pedro  ›  │
└────────────────────────────────┘
```

**Structuur**

- Drag handle links: 44×64, `text-ink-500`, icoon `⠿` (grip), `cursor-grab`, alleen zichtbaar in "Bewerk"-modus.
- Tijd blok: 64px breed, tijd in 18/700, duur 14/400 eronder.
- Titel + meta: overige breedte, 2 regels max.
- Chevron `›` rechts: tikken → detail-scherm.
- Hele rij: `h-16` minimum, `bg-bg-card hover:bg-line/30 rounded-xl border border-line mb-2`.

**States**

- `default`
- `dragging` — `shadow-lg scale-[1.02] bg-warn-100`
- `drop-target` — 2px `brand-600` top-border op de plek waar hij komt te staan
- `done` — opacity 60%, check-icoon ✓ bij tijd, doorstreepte titel
- `skipped` — opacity 40%, icoon 🙅 bij tijd
- `added-by-other-live` — 1s puls `ring-2 ring-success-700/50` bij realtime insert van ander groepslid

**Drag-UX**

- Op mobile: long-press 400ms om drag te starten (anders conflict met scroll).
- CSS-haptic: bij lift `scale 1.02 + shadow-lg`, bij drop `scale 1.00 + shadow-sm`.
- Alternatief voor wie geen drag lukt: twee pijltjes omhoog/omlaag in detail-modal → **beide UIs beschikbaar**.

**Verwijderen**

- Swipe-left onthult nooit een destructive action zonder confirm.
- In plaats daarvan: tik op rij → detail-modal → knop "Verwijder uit planning" → confirm dialog.

---

### 4.12 Map pin + tooltip (Leaflet)

**Pin**

- SVG marker, 40×52 (met puntje onderaan).
- Kleur volgens categorie:
  - Museum/monument → `brand-600`
  - Restaurant → `accent-800`
  - Tempel → `trust-700`
  - Shopping → `warn-700`
  - Hotel / vertrekpunt → `success-700` met 🏨-icoon
  - In planning → diepere kleur + wit randje
- Tekstlabel (categorie-emoji) in het midden, wit, 18px.
- Accessibility: alt-tekst op marker = "Terracotta Leger, museum".

**Tooltip (tap op pin)**

Opent niet als hover-tooltip (mobile heeft geen hover), maar als **bottom-sheet** met location-card (zie 4.2.1). Dat is consistent met de rest van de app: één tik, één beslissing.

**"Jij bent hier"-pin**

- Groen pulsering-stippel (16px + 32px animated ring), `trust-700`.
- Altijd bovenop andere pins (z-index).

---

## 5. Scherm-specs

Layout grid: mobile 375×812 (iPhone SE/mini) en 414×896 (iPhone Plus/Pro). Design werkt responsive tussen beide zonder breakpoints; testen op beide.

**Globale container:** `max-w-[420px] mx-auto px-4` — zelfs op tablet blijft de app in 1 kolom.

**Vertical rhythm:** alles in veelvouden van 4. Gap tussen secties standaard `space-y-6` (24px).

### 5.1 🏠 Thuis

**Wireframe (375×812):**

```
┌─────────────────────────┐
│ Header (56)             │
│ [logo]   🌐 NL ▾        │
├─────────────────────────┤
│                         │
│  Goedemorgen 👋         │  <- Display 36/700
│  Oma & Opa              │
│                         │
│ ╔═════════════════════╗ │  <- Brand hero card
│ ║ Vandaag is dag 4/8  ║ │
│ ║ Di 28 apr · Beijing ║ │
│ ║ [Bekijk mijn dag →] ║ │
│ ╚═════════════════════╝ │
│                         │
│ Eerstvolgende stop      │  <- H2
│ ┌─────────────────────┐ │
│ │ 09:00               │ │
│ │ Verboden Stad       │ │
│ │ 3–4 uur · 60 Y      │ │
│ │ [Route] [Toon adres]│ │
│ └─────────────────────┘ │
│                         │
│ Snel nodig              │  <- H2
│ [🚕 Taxi  ] [🗣 Zinnen ] │
│ [⚠ Scams ] [🆘 Nood   ] │
│                         │
│ Vandaag in Beijing      │  <- H2
│ 🌤 18–22°C, licht regen │
│                         │
│ ┌─────────────────────┐ │
│ │ Loop je vakantie    │ │  <- pre-walk teaser
│ │ eens door →         │ │
│ └─────────────────────┘ │
│                         │
├─────────────────────────┤
│ Tab bar (80)            │
└─────────────────────────┘
```

**Above the fold (eerste 600px):** groet + hero card "dag 4/8" + begin van "Eerstvolgende stop".

**Wat de 70+ gebruiker eerst ziet:** "Vandaag is dag 4 van 8" — groot, warm, met de datum. Beantwoordt meteen de belangrijkste vraag: "waar zit ik in de reis?".

**Key actions:**

1. `[Bekijk mijn dag →]` — primair, naar Vandaag tab
2. `[Toon adres in Chinees]` — opent bottom sheet met ZH-adres van de eerstvolgende stop
3. `[🚕 Taxi]` — opent taxi-kaart met dat zelfde adres klaar
4. Noodgeval-knop altijd bereikbaar maar niet dominant (rechtsboven in de "Snel nodig"-grid, niet knalrood)

**Pre-trip modus (vóór 25 apr 2026):** Hero card toont "Nog 5 dagen tot vertrek" + CTA `[Loop de vakantie door]`. Waar "Eerstvolgende stop" zit, staat: "Over 5 dagen: Xi'an — Stadsmuur".

---

### 5.2 📅 Vandaag / Planning

```
┌─────────────────────────┐
│ Header                  │
│ ← Dag 4 van 8   🌐      │
├─────────────────────────┤
│                         │
│ Di 28 apr · Beijing     │  <- H1 28/700
│ Verboden Stad-dag       │  <- H2 ink-500
│                         │
│ [‹ Ma 27] [Di 28] [Wo 29›] <- datum-switcher chips
│                         │
│ 🌤 18–22°C licht regen  │
│                         │
│ ┌─────────────────────┐ │
│ │ 09:00  Verboden Stad│ │  <- planner row
│ │ 3–4u · door Pedro  ›│ │
│ ├─────────────────────┤ │
│ │ 13:00  Lunch Quanju │ │
│ │ 1u · door Oma      ›│ │
│ ├─────────────────────┤ │
│ │ 15:00  Tempel v Hem │ │
│ │ 2u                 ›│ │
│ └─────────────────────┘ │
│                         │
│ [   + Voeg toe          │  <- primary L, full-width
│       uit Verken   →   ]│
│                         │
│ [   ✎ Eigen activiteit ]│  <- secondary
│                         │
│ Notities van de dag     │  <- H2
│ [       leeg veld      ]│
│                         │
├─────────────────────────┤
│ Tab bar                 │
└─────────────────────────┘
```

**Above the fold:** datum + 1e activiteit.

**Wat de 70+ ziet eerst:** "Di 28 apr · Beijing" + "Verboden Stad-dag" — kort gelabeld zodat ze met één blik weten "dat is die dag dat we …".

**Key actions:**

1. `+ Voeg toe uit Verken` — hoofd-CTA
2. Tik op rij → detail-modal
3. Datum-chips → wisselen naar andere dag (+ bij wissel: naar nu-vandaag is er een "vandaag"-label)

**Interaction:** realtime insert door ander groepslid toont 1s puls + kleine toast bovenaan: "Pedro heeft '16:00 Theehuis' toegevoegd. [Terugdraaien]".

---

### 5.3 🧭 Verken

```
┌─────────────────────────┐
│ Header                  │
│ ← Verken        🌐      │
├─────────────────────────┤
│                         │
│ [🔍 Zoek plek, tempel…] │  <- searchbar h-14
│                         │
│ Stad                    │
│ [Alles] [Xi'an] [Beijing]│  <- chip row
│                         │
│ Categorie               │
│ [🏛️Musea] [⛩️Tempels]   │
│ [🍜Eten] [🛍️Shop] [... ]│  <- wrap
│                         │
│ Bijzonder               │
│ [UNESCO] [Senior ✓]     │
│ [Gratis] [Weinig lopen] │
│                         │
│ Sorteer: [afstand ▾]    │
│ 42 plekken              │
│                         │
│ ┌─────────────────────┐ │
│ │ [ Location card ]   │ │  <- 4.2.1
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ [ Location card ]   │ │
│ └─────────────────────┘ │
│   …                     │
├─────────────────────────┤
│ Tab bar                 │
└─────────────────────────┘
```

**Above the fold:** zoekbalk + stadsfilter + 1e chip-rij.

**Wat de 70+ ziet eerst:** een grote zoekbalk + de 3 stad-chips. Boodschap: "dit is waar je plekken vindt".

**Key actions:**

1. Tik op chip → filter direct toepassen (geen "apply" knop, live)
2. Tik op card → detail-scherm (push, of modal)
3. Uit card: `[ Voeg toe aan mijn dag + ]` → kies-dag bottom sheet

**Detail-scherm:** zelfde layout als location card maar volbreed, met alle tips/warnings uitklapbaar in accordeons, en onderaan sticky "Voeg toe aan mijn dag" knop.

---

### 5.4 🗺️ Kaart

```
┌─────────────────────────┐
│ Header                  │
│ ← Kaart         🌐      │
├─────────────────────────┤
│                         │
│ [ 🔍 ] Filter: [All ▾]  │  <- floating pill, rechtsbov
│                         │
│                         │
│                         │
│    [ Leaflet kaart ]    │  <- full area
│       📍 📍 📍          │
│         📍 (jij)        │
│                         │
│                         │
│  ┌──────────────────┐   │
│  │ [ Jouw hotel ]   │   │  <- klein info-pil
│  └──────────────────┘   │
│                         │
│ [ 📍 Waar ben ik? ]     │  <- floating CTA bottom-right
├─────────────────────────┤
│ Tab bar                 │
└─────────────────────────┘
```

**Above the fold:** kaart zelf, gecentreerd op hotel of huidige locatie.

**Wat de 70+ ziet eerst:** de kaart met gekleurde pins. Plus het "Waar ben ik?"-knopje rechtsonder.

**Key actions:**

1. Tik op pin → bottom sheet met location card
2. `Waar ben ik?` — centreert op GPS + grote groene stip
3. Filter-pill → bottom-sheet met chip-filters (zelfde als Verken-chips)

**Offline:** als kaart-tegels niet geladen zijn, toont een nette placeholder "Kaart is niet geladen. Je kunt wel je opgeslagen plekken bekijken." + lijst view.

---

### 5.5 💡 Hulp

```
┌─────────────────────────┐
│ Header                  │
│ ← Hulp          🌐      │
├─────────────────────────┤
│                         │
│ Waar kunnen we je mee   │  <- H1
│ helpen?                 │
│                         │
│ ┌─────────────────────┐ │
│ │ 🗣 Chinese zinnen    │ │  <- grote tegel
│ │ Voor taxi, eten, …  │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ 🚕 Taxi-kaart       │ │
│ │ Adres in Chinees    │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ ⚠ Pas op: scams     │ │
│ │ De 5 grootste       │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ 💳 Betalen          │ │
│ │ Alipay, WeChat Pay  │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ 📶 Internet & VPN   │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ 📋 Checklist        │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ 🆘 Noodgeval        │ │  <- danger-100 bg, danger-700 text
│ │ 110 · 120 · ambassade│ │
│ └─────────────────────┘ │
├─────────────────────────┤
│ Tab bar                 │
└─────────────────────────┘
```

**Above the fold:** vraag + eerste 2 tegels.

**Wat de 70+ ziet eerst:** "Waar kunnen we je mee helpen?" — een menselijke vraag, geen dashboard.

**Key actions:**

1. Tegel tik → sub-scherm met die sectie
2. Noodgeval-tegel is gemarkeerd anders (danger-soft) maar niet knipperend — altijd vindbaar, nooit alarmerend.

---

## 6. Key user flows

### 6.1 Pre-trip walkthrough ("Loop de vakantie eens door")

Doel: voor 25 apr — voorpret + mentaal voorbereiden wat elke dag brengt.

```
Frame 1 — Thuis               Frame 2 — Intro              Frame 3 — Dag-kaart          Frame 4 — Laatste dag
┌──────────────┐              ┌──────────────┐            ┌──────────────┐             ┌──────────────┐
│ [hero card]  │              │              │            │ Dag 1        │             │ Dag 8        │
│ 5 dagen tot  │              │ Jullie reis  │            │ Zaterdag     │             │ Zaterdag     │
│ vertrek      │              │ duurt 8 dagen│            │ 25 apr · 🛬  │             │ 2 mei · 🛫  │
│              │   tap        │              │   ➡ ➡ ➡     │ Xi'an        │             │ Beijing      │
│ [Loop de     │  ────→       │ We lopen hem │  (swipe     │              │             │              │
│  vakantie →] │              │ even door.   │   of knop)  │ [ foto stad] │             │ [ foto luch] │
│              │              │              │            │              │             │              │
│              │              │ Neem rustig  │            │ Aankomst, een│             │ Shoppen in   │
│              │              │ de tijd.     │            │ wandeling op │             │ Wangfujing,  │
│              │              │              │            │ de stadsmuur │             │ vertrek om   │
│              │              │ [ Start → ]  │            │              │             │ 19:00.       │
│              │              │              │            │ [← Vorige]   │             │              │
│              │              │              │            │ [Volgende →] │             │ [✓ Klaar]    │
└──────────────┘              └──────────────┘            └──────────────┘             └──────────────┘
```

**UX-details:**

- Progress dots boven (●●●○○○○○)
- Swipe L/R werkt, maar **ook grote [Vorige] [Volgende] knoppen** voor wie zwaait.
- Elke dag-kaart: foto, 2-zins samenvatting, 1 highlight ("Op deze dag zien we..."), 1 "let op" ("we lopen vandaag ~3 km").
- Laatste frame: "Je bent klaar. Je kunt dit altijd opnieuw bekijken via de Thuis-tab." + knop naar Thuis.

---

### 6.2 "Voeg toe aan mijn dag" vanuit Verken

```
Frame 1 — Location card       Frame 2 — Kies dag            Frame 3 — Kies tijd           Frame 4 — Bevestiging
┌──────────────┐              ┌──────────────┐             ┌──────────────┐              ┌──────────────┐
│ Terracotta   │              │ ▬▬▬          │             │ ▬▬▬          │              │              │
│ Leger        │              │              │             │              │              │      ✓       │
│ …            │              │ Welke dag?   │             │ Hoe laat?    │              │              │
│              │              │              │             │              │              │ Toegevoegd!  │
│ [+ Voeg toe  │   tap        │ [Za 25 apr]  │   tap       │ [Ergens deze │              │              │
│   aan mijn   │  ────→       │ [Zo 26 apr]← │  ────→      │   dag]       │              │ Terracotta   │
│   dag  +  ]  │              │ [Ma 27 apr]  │             │ [08:30]      │              │ Leger staat  │
│              │              │ [Di 28 apr]  │             │ [10:00] ←    │              │ nu op Zo 26  │
│              │              │ …            │             │ [13:00]      │              │ apr, 10:00.  │
│              │              │              │             │              │              │              │
│              │              │ [Volgende →] │             │ [Volgende →] │              │ [Bekijk dag] │
│              │              │              │             │              │              │ [Nog een     │
│              │              │              │             │              │              │  toevoegen]  │
└──────────────┘              └──────────────┘             └──────────────┘              └──────────────┘
```

**Details:**

- Frame 2 + 3 zijn bottom-sheets, geen paginawissel — psychologisch gevoel van "ik blijf bij dit item".
- Standaard-selectie in frame 3: "Ergens deze dag" (laagdrempelig — ze hoeven niet direct een tijd te kiezen).
- Frame 4: success-700 checkmark, subtiele confetti **niet** (te kinderachtig), wél 1 korte animatie waarbij checkmark scale-in (200ms).
- Realtime: andere groepsleden zien meteen een toast "Oma heeft 'Terracotta Leger' toegevoegd aan zo 26 apr".

---

### 6.3 Chinees adres aan taxichauffeur tonen

```
Frame 1 — Thuis/Vandaag       Frame 2 — Taxi-modal         Frame 3 — Groot adres         Frame 4 — Terug
┌──────────────┐              ┌──────────────┐             ╔══════════════╗              ┌──────────────┐
│              │              │ ▬▬▬          │             ║              ║              │              │
│ Eerstvolgende│              │ Naar welke   │             ║ 陕西省西安市  ║              │ Fijn dat 't   │
│ stop         │              │ bestemming?  │             ║ 临潼区        ║              │ lukte!       │
│              │              │              │             ║ 秦陵北路      ║              │              │
│ Verboden Stad│              │ ● Verboden   │             ║              ║              │ Controleer:  │
│              │   tap        │   Stad (nu)  │   tap       ║              ║              │ staat 京B op  │
│ [Route]      │  ────→       │ ○ Hotel      │  ────→      ║ (40pt, cntr) ║              │ kenteken?    │
│ [Toon adres  │              │ ○ Terracotta │             ║              ║              │ Zo ja: oké.  │
│  in Chinees]│              │   Leger      │             ║              ║              │              │
│              │              │              │             ║ 🔊 Laat horen║              │ [Sluiten]    │
│              │              │ [Volgende →] │             ║ 📋 Kopie     ║              │              │
│              │              │              │             ║ [Klaar]      │              │              │
└──────────────┘              └──────────────┘             ╚══════════════╝              └──────────────┘
```

**Details:**

- Frame 3 is **full-screen**, niet bottom-sheet — maximale grootte voor de chauffeur; draai toestel in portrait maar extra grote ZH-typografie.
- Achtergrond crème, ZH in `ink-900`, contrast 16:1.
- Helderheid: wanneer dit scherm geopend wordt, verzoeken we (indien mogelijk) `screen.wakeLock` en hoge helderheid (bouncing disabled) — niet kritiek, gewoon nice-to-have.
- Knop "Laat horen" speelt de pinyin in zh-CN → handig als chauffeur toch slecht ziet.

---

### 6.4 Offline-modus & opgeslagen planning browsen

```
Frame 1 — Opent app           Frame 2 — Banner             Frame 3 — Plant een            Frame 4 — Internet terug
zonder verbinding              zichtbaar, navig werkt       wijziging                       → sync
┌──────────────┐              ┌──────────────┐             ┌──────────────┐               ┌──────────────┐
│ ⚠ Zonder     │              │ Vandaag      │             │ Tempel Hemel │               │              │
│ internet —   │              │              │             │              │               │ ✓ Alles     │
│ je planning  │              │ 09:00 …      │             │ [Verwijder]  │               │ gesynct.    │
│ blijft       │              │ 13:00 …      │             │              │               │              │
│ werken.      │              │              │             │ Modal: "Weet │               │ 2 wijziginge│
│              │              │ [+ Voeg toe] │             │ je 't zeker? │               │ van Opa     │
│ [ Open app ] │              │              │             │ Dit wordt    │               │ gesynct.    │
│              │              │ (offline-dot)│             │ gesynct als  │               │              │
│              │              │              │             │ je weer      │               │ [Oké]       │
│              │              │              │             │ internet     │               │              │
│              │              │              │             │ hebt."       │               │              │
│              │              │              │             │              │               │              │
│              │              │              │             │ [Verwijder]  │               │              │
│              │              │              │             │ [Bewaar]     │               │              │
└──────────────┘              └──────────────┘             └──────────────┘               └──────────────┘
```

**Details:**

- Offline detectie via `navigator.onLine` + periodieke fetch-check.
- Banner `bg-warn-100 text-warn-700` bovenaan, dismissible niet (blijft staan tot online).
- Mutaties in IndexedDB queue, sync-flow bij `online` event.
- Offline-dot: rechts boven in tab bar, kleine grijze cirkel met streep; verdwijnt bij online.

---

## 7. Toegankelijkheid checklist (WCAG 2.1 AA + senior-specifiek)

### 7.1 Basis (WCAG AA)

- [ ] **Touch targets ≥48×48** voor alle interactieve elementen. Uitzondering: filter chips h-44, maar met onzichtbare padding-hitbox.
- [ ] **Font size ≥18px** voor body; ≥22px voor headers.
- [ ] **Line-height ≥1.5** voor body; ≥1.2 voor headers.
- [ ] **Contrast ≥4.5:1** voor alle tekst op achtergrond (AA).
- [ ] **Contrast ≥7:1** op primaire knoppen, Chinese adressen, noodwaarschuwingen (AAA).
- [ ] **Focus-visible** op elke interactieve: 4px ring, ≥3:1 contrast met achtergrond.
- [ ] **Keyboard navigable** — Tab-volgorde logisch, Esc sluit modals, Enter activeert knoppen.
- [ ] **Form labels** — elk input heeft een `<label>`, nooit alleen placeholder.
- [ ] **Alt-tekst** op alle foto's. Decoratieve foto: `alt=""`.
- [ ] **Lang-attribuut** op HTML (`lang="nl"`) en op ZH-blokken (`lang="zh-CN"`).
- [ ] **Semantische HTML** — `<nav>`, `<main>`, `<section>`, `<button>` (niet `<div onclick>`).
- [ ] **Reduced motion** — `@media (prefers-reduced-motion: reduce)` schakelt transitions uit.
- [ ] **Landmark regions** — elke pagina heeft `<header>`, `<main>`, `<nav>` met `aria-label`.
- [ ] **Skip-link** "Spring naar inhoud" bovenaan (hidden tot focus).

### 7.2 Senior-specifiek

- [ ] **Geen ambiguë iconen zonder label.** Icon + tekst altijd. Uitzondering: ← terug-pijl (universeel + `aria-label="Terug"`).
- [ ] **Eén kolom op mobile, altijd.** Nooit 2-koloms grid behalve homepage "Snel nodig"-2×2.
- [ ] **Geen hover-afhankelijke info.** Alles dat op hover zichtbaar zou zijn, is op tik zichtbaar.
- [ ] **Geen gestures als enige pad.** Drag-reorder heeft pijltjes-alternatief. Swipe-to-delete bestaat niet.
- [ ] **Timeout-vrij.** Geen automatische logout, geen auto-dismissing modals (toast 5s is OK, maar nooit destructive).
- [ ] **Undo bij destructieve acties.** "Verwijder uit planning" → 5s toast "Verwijderd. [Terugdraaien]".
- [ ] **Confirm-before-destructive** met expliciete actie-labels ("Verwijderen" / "Behouden"), nooit "OK" / "Annuleren".
- [ ] **Read-aloud voor Chinees** — elke ZH-string heeft een 🔊-knop met TTS.
- [ ] **Read-aloud voor kritieke waarschuwingen** — optioneel: bij `warning-700` banner, een 🔊 die de NL-waarschuwing voorleest (voor brildragers in het donker).
- [ ] **Geen dunne fonts.** Minimum font-weight: 400 (normal). Headings ≥600.
- [ ] **Geen laag-contrast decoratie als info-drager.** Bv. geen grijs "nieuw" badge; gebruik tekst.
- [ ] **Respecteer systeem font-size.** Gebruik `rem` in plaats van `px` voor tekst (behalve displays waar het visueel moet kloppen).

### 7.3 Anti-scam toon — specifieke copy

**Principe:** waarschuw zonder bang maken. Feit → gedrag → geruststelling.

| Situatie | ✅ Goede copy | ❌ Slechte copy |
|---|---|---|
| Thee­ceremonie-scam | **Gratis theehuis bij Forbidden City?**<br>Dat is zelden écht gratis. Bedank vriendelijk en loop door.<br>Echte theehuizen hebben een menukaart met prijzen. | "PAS OP VOOR SCAMS!! Vreemden kunnen je oplichten!" |
| Taxi-meter | **Taxichauffeur zet de meter niet aan?**<br>Vraag rustig: "Meter, please." Werkt dat niet, stap uit bij het volgende stoplicht. Geen probleem.<br>In Beijing herken je officiële taxi's aan `京B` op het kenteken. | "Chauffeurs zijn onbetrouwbaar — wees altijd op je hoede" |
| Wisselgeld-truc | **Kreeg je te weinig wisselgeld?**<br>Tel rustig na. Zeg "Bù duì" (bù duèi, "niet juist"). Meestal is het een vergissing, soms niet — in beide gevallen werkt rustig tellen het beste. | "Winkeliers proberen je geld afhandig te maken" |
| "Kunststudent"-scam | **Vriendelijke student wil je galerij showen?**<br>Leuk bedoeld, maar het eindigt vaak met dure prints. Een glimlach en "No thank you" is genoeg. | "Wees wantrouwend tegen Chinezen die u aanspreken" |
| Valse gids bij monument | **Iemand biedt gids aan bij de poort?**<br>Officiële gidsen zijn bij de ticketbalie. Andere gidsen: meestal aardig, soms overpriced. Jij kiest. | "Gidsen zijn vaak oplichters" |

**Algemene toon:**

- Je-vorm (informeel, warm), niet u-vorm (te formeel voor NL in deze context).
- "Rustig" en "vriendelijk" vaak herhaald — dat is het recept.
- Noem wat lokalen doen (meeste Chinezen zijn eerlijk en behulpzaam) om geen xenofobie te zaaien.
- Geef een concrete zin of actie — passiviteit maakt bang; een script geeft controle.

### 7.4 Noodgeval-scherm copy

```
🆘 Noodgeval

Bel hier:

[   Politie — 110    ]    <- danger button L, tel: link
[   Ambulance — 120   ]
[   Ambassade NL (Beijing)
     +86 10 8532 0200  ]
[   Ambassade ES (Beijing)
     +86 10 6532 3629  ]

Jouw hotel:
Beijing — [hotel naam + adres in ZH]
Tik om adres te tonen.

Als je even niet weet wat te doen:
bel 120 voor medisch, 110 voor politie.
Zij spreken beperkt Engels, houd kort en
noem je locatie.
```

---

## 8. Content-prioriteit per scherm

| Scherm | Primair (eerste blik) | Secundair | Tertiair (onder de vouw) |
|---|---|---|---|
| Thuis | Dag X/8, datum, stad | Eerstvolgende stop | Weer, pre-walk teaser, snelkoppelingen |
| Vandaag | Dagnaam + label | Eerste activiteit van de dag | Andere activiteiten, notities |
| Verken | Zoekbalk + stad-filter | Resultatenlijst | Extra filters in accordeons |
| Kaart | De kaart zelf + jouw locatie | Pins | Filterpill, hotel-info |
| Hulp | "Waar kunnen we je mee helpen?" + top 2 tegels | Betalen, internet | Noodgeval (onderaan, apart gemarkeerd) |

**Regel:** op elk scherm is de primaire inhoud binnen 600px zichtbaar op 375×812. De 70+ gebruiker scrollt niet proactief.

---

## 9. Interactie-details

### 9.1 Transitie-duraties

| Actie | Duur | Easing |
|---|---|---|
| Knop active (scale 0.98) | 75ms | `ease-out` |
| Modal open | 200ms | `ease-out` |
| Modal close | 150ms | `ease-in` |
| Tab change (cross-fade) | 100ms | `linear` |
| Chip toggle | 150ms | `ease-out` |
| Toast appear | 180ms | `ease-out` |
| Toast dismiss | 220ms | `ease-in` |
| Drag lift | 120ms | `ease-out` |
| Drag drop | 180ms | spring (CSS cubic-bezier(0.34, 1.56, 0.64, 1)) |
| Skeleton pulse | 1.5s loop | `ease-in-out` |
| Success checkmark | 280ms | elastic ease |

**Respect `prefers-reduced-motion: reduce`:** alle boven ≥150ms worden 0ms.

### 9.2 CSS "haptic" feedback

Geen echte haptics in web, maar we simuleren:

- **Tap-feedback (knop):** `active:scale-[0.98]` + `active:shadow-none` — visuele depressie.
- **Toggle (chip):** korte kleur-animatie + lichte scale-up (1.02) bij activate, terug naar 1.0 in 150ms.
- **Succesvol toegevoegd:** checkmark zoomt in (scale 0 → 1 in 280ms, elastic) + confetti-vrij (te veel voor deze audience). Optional: zachte "tik" als device.vibrate beschikbaar: `navigator.vibrate?.(10)`.
- **Realtime sync ontvangen:** zachte pulse op de nieuwe rij (`ring-2 ring-success-700/40` voor 1s).

### 9.3 Confirm-before-destructive regels

| Actie | Confirm? | Undo? |
|---|---|---|
| Verwijder item uit planning | **Ja** — modal "Verwijderen uit dag 4? [Verwijderen] [Behouden]" | Ja, 5s toast "Verwijderd. [Terugdraaien]" |
| Verplaats item naar andere dag | Nee | Ja, 5s toast |
| Markeer als "gedaan" | Nee | Ja, instant terug te klikken |
| Favoriet aan/uit | Nee | Instant terug |
| Dagboek entry verwijderen | **Ja** — modal | Nee (na confirm echt weg, te gevoelig om stilletjes weg te laten) |
| Taal wisselen | Nee | Instant terug |
| Offline mutatie (geen internet) | Nee, maar waarschuw in toast: "Wordt opgeslagen zodra je internet hebt." | Nee nodig |

### 9.4 Toast pattern

- Positie: bottom, 24px boven tab bar.
- Max breedte: 340px, `max-w-[calc(100%-32px)]`.
- Duration: 5s (senior-vriendelijk, lang genoeg om te lezen).
- Dismissible via × of swipe.
- `aria-live="polite"` voor non-urgent; `aria-live="assertive"` voor destructief undo.

### 9.5 Scroll-gedrag

- Tab change: scroll position per tab **onthouden** (niet automatisch naar top).
- Tik op actieve tab = scroll naar top (native iOS-patroon).
- Infinite scroll: **niet gebruiken**. Als lijst >30 items, paginate met grote "Laad meer" knop.

---

## 10. Visuele voorbeelden (Tailwind snippets)

### 10.1 Primary button

```html
<button class="h-14 w-full px-6 rounded-2xl bg-brand-600 text-brand-50
               text-xl font-semibold shadow-sm
               transition active:scale-[0.98]
               focus-visible:ring-4 focus-visible:ring-brand-600/40
               focus-visible:ring-offset-2 focus-visible:ring-offset-bg
               flex items-center justify-center gap-2">
  <svg aria-hidden="true" class="w-6 h-6"><use href="#icon-plus"/></svg>
  Voeg toe aan mijn dag
</button>
```

### 10.2 Hero card (Thuis)

```html
<section class="rounded-3xl p-6 bg-gradient-to-br from-brand-600 to-brand-700
                text-brand-50 shadow-md">
  <p class="text-sm opacity-90">Dinsdag 28 april 2026</p>
  <h1 class="text-4xl font-bold leading-tight mt-1">Vandaag is dag 4 van 8</h1>
  <p class="text-lg mt-2 opacity-95">Beijing — Verboden Stad-dag</p>
  <button class="mt-5 h-12 px-5 rounded-xl bg-brand-50 text-brand-700
                 font-semibold hover:bg-white transition">
    Bekijk mijn dag →
  </button>
</section>
```

### 10.3 Chinese phrase card

```html
<article class="rounded-2xl bg-bg-card border border-line p-5">
  <h3 class="text-[22px] font-semibold text-ink-900">Ik heb een tafel voor 5</h3>
  <p class="text-base text-ink-500 italic mt-1">Tengo una mesa para 5</p>

  <div class="mt-4 rounded-xl bg-trust-100/40 p-4 text-center">
    <p lang="zh-CN" class="text-[40px] leading-snug font-medium text-ink-900">
      我们有五个人的位子
    </p>
    <p class="mt-2 text-base italic text-ink-500">Wǒmen yǒu wǔ gè rén de wèizi</p>
  </div>

  <button class="mt-4 w-full h-14 rounded-2xl bg-trust-100 text-trust-700
                 font-semibold hover:bg-trust-700 hover:text-white
                 border border-trust-700/20 transition
                 flex items-center justify-center gap-2"
          aria-label="Zin hardop laten voorlezen in het Chinees">
    🔊 Laat horen
  </button>

  <div class="mt-2 grid grid-cols-2 gap-2">
    <button class="h-12 rounded-xl bg-transparent text-ink-900 hover:bg-line/50
                   font-semibold">📋 Kopie</button>
    <button class="h-12 rounded-xl bg-transparent text-ink-900 hover:bg-line/50
                   font-semibold">⭐ Bewaar</button>
  </div>
</article>
```

### 10.4 Filter chip (toggle)

```html
<button role="button" aria-pressed="true"
        class="h-11 px-4 rounded-full border text-base font-medium
               transition
               aria-pressed:bg-brand-600 aria-pressed:text-brand-50
               aria-pressed:border-brand-600
               not-aria-pressed:bg-bg-card not-aria-pressed:text-ink-700
               not-aria-pressed:border-line">
  ✓ Musea
</button>
```

*(Gebruik `data-*` attributen of JS class-toggle als Tailwind `aria-*` variants niet beschikbaar zijn; equivalent fallback: simpele `.is-on` class.)*

### 10.5 Tab bar

```html
<nav role="tablist" aria-label="Hoofdnavigatie"
     class="fixed bottom-0 inset-x-0 bg-bg-card border-t border-line
            h-20 pb-[env(safe-area-inset-bottom)] grid grid-cols-5">
  <button role="tab" aria-selected="true"
          class="flex flex-col items-center justify-center gap-1
                 text-brand-600 relative">
    <span class="absolute top-0 inset-x-6 h-[3px] bg-brand-600 rounded-full"></span>
    <svg class="w-7 h-7" aria-hidden="true"><use href="#icon-home"/></svg>
    <span class="text-sm font-semibold">Thuis</span>
  </button>
  <!-- 4× herhaald voor Vandaag, Verken, Kaart, Hulp -->
</nav>
```

### 10.6 Planner row (draggable)

```html
<li class="flex items-center gap-3 h-16 px-3 bg-bg-card border border-line
           rounded-xl mb-2 transition"
    draggable="true" aria-grabbed="false">
  <button aria-label="Verslepen" class="w-11 h-11 grid place-items-center
          text-ink-500 cursor-grab touch-none">⠿</button>
  <div class="w-16 shrink-0">
    <div class="text-[18px] font-bold text-ink-900">09:00</div>
    <div class="text-sm text-ink-500">2–3 u</div>
  </div>
  <div class="flex-1 min-w-0">
    <div class="text-[18px] font-semibold text-ink-900 truncate">Verboden Stad</div>
    <div class="text-sm text-ink-500">door Pedro</div>
  </div>
  <svg class="w-5 h-5 text-ink-500" aria-hidden="true"><use href="#icon-chevron"/></svg>
</li>
```

---

## 11. Open beslissingen (afstemming met dev/product nodig)

1. **"Door Oma toegevoegd"** — hoe identificeren we users? Voorstel: bij 1e gebruik "Wie ben jij?" (Oma / Opa / Pedro / Ana / Luis) dropdown — 1x, in localStorage.
2. **Pre-walk content-formaat** — vereist foto per dag. Dummy foto's uit locations.json kunnen hergebruikt, maar dag-samenvattingen moeten geschreven worden (NL).
3. **Leaflet tile-provider** — OSM is gratis maar niet offline out-of-the-box. Voorstel: pre-cache tegels voor Xi'an en Beijing ROI's tijdens eerste online bezoek (service worker).
4. **Supabase realtime reconnect** — wat toont de UI wanneer socket tijdelijk weg is maar HTTP wel werkt? Voorstel: kleine grijze bolletje "Live sync even uit, jij kunt normaal doorwerken".
5. **Dark-achtergrond taxi-adres?** — sommige chauffeurs in felle zon vinden donkere tekst op lichte achtergrond moeilijk leesbaar. Voorstel: in taxi-full-screen een toggle "Inverteer" (licht/donker), niet default.

---

## 12. Definition of done (voor dev-handoff)

Een scherm/component is "af" als:

- [ ] Getest op 375×812 én 414×896.
- [ ] Getoetst aan contrast op alle tekst/achtergrond combinaties.
- [ ] Keyboard navigable (Tab, Enter, Esc).
- [ ] Screen reader getest (VoiceOver iOS of TalkBack Android) — titels, labels, landmarks kloppen.
- [ ] `prefers-reduced-motion` gerespecteerd.
- [ ] Offline gedrag: scherm blijft zichtbaar, mutaties queueen.
- [ ] Alle copy in NL, ES, ZH vertaald (of fallback gedefinieerd).
- [ ] Loading skeleton + empty state + error state bestaan.
- [ ] Getest met een 70-jarige (als dat niet kan: met bril op, scherm op maximale helderheid, telefoon in zon).

---

_Einde DESIGN_SPEC.md — Versie 1.0, 20 april 2026. Door: lead product designer._
