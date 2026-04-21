# CROSS_CHECK_BATCH23.md — Data-verificatie HolidayChina2026 (Batch 2+3, items 44–126)

**Reviewer:** Claude (data-verificatie-agent, batch 2+3)
**Datum:** 2026-04-21
**Reis:** Xi'an + Beijing, 25 apr – 2 mei 2026 (70+ paar + 3 volwassen kinderen)
**Scope:** 83 items (44–126) uit `site/locations.json`. Elk kritisch item is getoetst aan minstens één onafhankelijke tweede bron naast de in `source_urls` opgenomen bronnen (officiële english.beijing.gov.cn, museum-sites, travelchinaguide.com, chinahighlights.com, Trip.com, airial.travel).

Legenda: ✅ VERIFIED / ⚠ DEVIATION / ❗ PATCH-VOORSTEL / ❓ ONDUIDELIJK

**Methode-opmerking:** ik rapporteer hieronder alleen items met afwijkingen of belangrijke verduidelijkingen. Items zonder opmerking zijn `OK` (geverifieerd, geen patch nodig).

---

## KRITIEKE FINDINGS (direct-impact voor reisweek 25 apr – 2 mei)

### Labor-Day context (1–5 mei 2026)
- Groep vertrekt 2 mei ochtend. Alleen 1 mei en ochtend 2 mei vallen nog in Labor Day.
- Alle grote heritage-sites (Verboden Stad, Ming-graven, Great Wall, Hemel-tempel, Zomerpaleis) piekverkoop: quota vol 3–4 weken vooraf.
- Maandag 27 apr = 1e Beijing-maandag. Veel musea en Ming-dynastie tempels dicht (Capital Museum, Confucius, NAMOC, Zhihua, Dongyue, Yunju, TRB).
- Zondag 26 apr + zaterdag 25 apr = beste dagen voor Panjiayuan buitenmarkt (weekend-only outdoor stalls).

---

## BEIJING — MUSEA, PARKEN & TEMPELS

### 44. `capital-museum` — ✅ VERIFIED
- Bronnen: english.beijing.gov.cn (specials/ticketing/museums 202407), Trip.com capital-museum-76603, en.chnmuseum.cn
- DB: 09:00-17:00, laatste entree 16:00, maandag dicht, gratis, paspoort + online reservering
- Findings: bevestigd (Tue–Sun 09:00–17:00, laatste 16:00). Gratis, WeChat mini-program reservering 1–7 dagen vooraf.
- Patch: geen.

### 45. `beihai-park` — ✅ VERIFIED (al gepatcht)
- Reeds gecorrigeerd in batch 1; huidige waarden in DB kloppen nu.

### 46. `jingshan-park` — ✅ VERIFIED
- Bronnen: english.beijing.gov.cn, travelchinaguide.com/beijing-parks
- DB: peak 06:00-21:00 laatste 20:30; adult 10 (peony-tentoonstelling apr/mei), senior 0
- Findings: in april/mei loopt peony-tentoonstelling — tarief 10 CNY klopt. 60+ gratis bevestigd.
- Patch: geen.

### 47. `lama-temple` (Yonghegong) — ⚠ DEVIATION (closing tijd)
- Bronnen: english.visitbeijing.com.cn, chinahighlights.com/beijing/attraction/lama-temple.htm, getyourguide.com
- DB: 09:00-17:00 laatste entree 16:30
- Findings: de meerderheid van de bronnen noemt **09:00–16:30** (laatste toegang 16:00), niet 17:00. DB overspant 30 min te laat. 100% pre-booked timed-entry bevestigd — walk-up niet mogelijk.
- ❗ Patch: `opening_hours.daily` → "09:00-16:30, laatste entree 16:00".

### 48. `confucius-temple-imperial-college` — ⚠ DEVIATION (opening_hours + closed_days)
- Bronnen: english.beijing.gov.cn/specials/ticketing/museums 202409/t20240929_3909675, topchinatravel.com, tripadvisor, thechinaguide.com
- DB: peak 08:30-18:00, low 08:30-17:00, `closed_days=["monday","tuesday"]`
- Findings: Officiële Beijing-gov pagina geeft **09:00–17:00 hele jaar, laatste entree 16:30, ALLEEN maandag dicht** (open op publieke feestdagen). DB's dinsdag-sluiting is onjuist. `seasonal_notes` over dacheng-ritueel (10/11/14/15/16 u) is niet herbevestigd; één bron geeft "weekend performances" — laat staan maar markeer als "verifieer ter plaatse".
- ❗ Patch: `opening_hours` → `{"daily": "09:00-17:00, laatste entree 16:30"}`; `closed_days` → `["monday"]`.

### 49. `temple-of-azure-clouds` (Biyun-si) — ⚠ DEVIATION (hours)
- Bronnen: travelchinaguide.com/attraction/beijing/temple-of-azure-clouds.htm, chinadiscovery.com
- DB: "08:40-16:50 (bronnen variëren 09:00-16:30)"
- Findings: algemeen gerapporteerd **peak 08:00–17:00** (laatste entree 16:30), laagseizoen 08:30–16:30.
- ❗ Patch: `opening_hours.daily` → "peak apr-okt 08:00-17:00 (laatste entree 16:30); nov-mrt 08:30-16:30 (laatste 16:00)".

### 50. `fragrant-hills-park` — ⚠ DEVIATION (peak closing + seasonal text)
- Bronnen: english.beijing.gov.cn, travelchinaguide.com/fragrant-hills
- DB: apr_jun/sep_nov15 "06:00-18:30", jul_aug "06:00-19:00", nov16_mar "06:00-18:30"
- Findings: Officiële Beijing-gov: **peak 06:00–19:30 (laatste entree 18:30)** van apr–okt; low 06:00–18:30 (laatste 17:30). DB's alle-maand 06:00-18:30 is te restrictief voor peak.
- ❗ Patch: `opening_hours` → `{"peak_apr_oct": "06:00-19:30 (laatste entree 18:30)", "low_nov_mar": "06:00-18:30 (laatste entree 17:30)"}`.

### 51. `ming-tombs` (eerste vermelding) — ⚠ DEVIATION (duplicaat + prijs)
- Bronnen: english.beijing.gov.cn/specials/ticketing/attractions 202407/t20240719_3753671, travelchinaguide.com/ming-tombs.htm
- DB: prijs adult 135 CNY, peak 08:30-18:00
- Findings: DB bevat 2 items voor dezelfde attractie (`ming-tombs` + `ming-tombs-shisan-ling`) met inconsistente prijzen (135 vs 98). Officiële combi: **peak CNY 130, low CNY 100** (Sacred Way 30/20 + Dingling 60/40 + Changling 45/30). DB #51 135 CNY is foutief; DB #64 98 CNY zit dicht bij oudere prijs. Opening-hours: officieel peak **08:00–17:30 (laatste 16:30)**, niet 08:30-18:00.
- ❗ Patch: `price_adult_cny` → 130 (combi peak); `opening_hours.peak_apr_oct7` → "08:00-17:30, laatste entree 16:30"; voeg `warnings_nl` toe over DUPLICATE — of consolideer in #64.

### 52. `beijing-zoo` — ❗ KRITIEKE PRIJSFOUT
- Bronnen: english.beijing.gov.cn/specials/parktours/guidevisitors/beijingzoo, travelchinaguide.com/beijing-zoo-tickets-booking.htm, Trip.com beijing-zoo-76612
- DB: `price_adult_cny: 34` + `seasonal_notes`: "Peak: basis 15, Panda House 19 supplement"
- Findings: 34 = 15+19, maar officieel Beijing-gov: **combi-ticket zoo + Panda House = CNY 19 peak, CNY 14 low** (niet de optelsom!). DB's 34 is rekenfout. 60+ gratis met paspoort bevestigd. Opening-hours 07:30-18:00 peak correct.
- ❗ Patch: `price_adult_cny` → 19; `seasonal_notes` → "Peak (apr-okt) combi-ticket zoo + Panda House CNY 19; low season CNY 14. 60+ gratis met paspoort.".

### 53. `798-art-district` — ✅ VERIFIED (duplicate met #82, zie batch 1)
- Geen wijziging.

### 54. `wangfujing-boulevard` — ✅ VERIFIED
- Bronnen: english.visitbeijing.com.cn, travelchinaguide.com/beijing-shopping/wangfujing
- DB: straat 24/7, shops 10:00-22:00
- Patch: geen.

### 55. `ncpa-egg` — ⚠ MINOR (closed_days verduidelijken)
- Bronnen: en.chncpa.org, Trip.com national-center-for-the-performing-arts-10559038
- DB: 09:00-17:00 laatste 16:30, dinsdag-zondag tours, maandag dicht. OK.
- Findings: bevestigd (Tue–Sun 09:00–17:00 laatste 16:30, maandag dicht — open op publieke feestdagen). Senior-prijs CNY 20 niet formeel in officiële bronnen; 65+ soms gratis.
- ❗ Patch: `seasonal_notes` toevoegen: "Open op publieke feestdagen zelfs als op maandag vallen; 1 mei en 2 mei = mogelijk open".

### 56. `white-cloud-temple` (Baiyunguan) — ✅ VERIFIED
- DB: summer 08:30-17:00 / winter 08:30-16:30 correct.
- Patch: geen.

---

## BEIJING — GROTE MUUR-SECTIES

### 57. `mutianyu-great-wall` — ⚠ DEVIATION (weekend-hours + prijs-discrepantie)
- Bronnen: en.mutianyugreatwall.com/reservation-center/tickets, travelchinaguide.com, english.beijing.gov.cn
- DB: hoog 07:30-18:00 / laag 08:00-17:30; adult 45, senior 25
- Findings: Officiële mutianyugreatwall.com: **weekdagen 07:30–18:00; weekend 07:30–18:30** in peak. Prijs-discrepantie in bronnen: officieel CNY 40 adult (sommige bronnen 45), senior 60+ halfprijs (CNY 20 peak). DB's 45/25 komt van oudere bronnen — in 2026 ook frequent CNY 40/20 genoemd. Warning in DB noemt dit al ("sommige bronnen melden CNY 40/20") — laat staan maar prioriteer 40.
- ❗ Patch: `opening_hours` → "Hoogseizoen (16 mrt–15 nov): wkd 07:30–18:00, weekend 07:30–18:30; laagseizoen: 08:00–17:00"; overweeg `price_adult_cny` 40 + `price_senior_cny` 20.
- Kabelbaan: DB waarschuwt al voor cable-car sluiting vanaf 15 apr 2026. Verifieer status ter plaatse.

### 58. `badaling-great-wall` — ⚠ MINOR (laatste toegang)
- Bronnen: english.beijing.gov.cn/specials/ticketing/attractions 202407/t20240717_3751609, travelchinaguide.com/badaling
- DB: peak "06:30-16:00 laatste toegang, sluit 17:30"; adult 40, senior 0, booking verplicht
- Findings: officieel peak 06:30-17:30 (laatste entree 16:30). DB zet 16:00 als laatste toegang — bron zegt 16:30. Booking: gov.cn zegt reservering aanbevolen maar niet altijd verplicht; tijdens Labor Day = 100% nodig (quotum 65.000/dag vol).
- ❗ Patch: `opening_hours` → "Hoogseizoen: 06:30–17:30 (laatste toegang 16:30); laagseizoen: 07:30–16:30 (laatste 15:30)".

### 59. `juyongguan-great-wall` — ⚠ DEVIATION (senior-prijs)
- Bronnen: english.beijing.gov.cn, travelchinaguide.com/juyongguan-great-wall-tickets-booking.htm, hifivetrip.com
- DB: adult 40, senior 20
- Findings: Meerdere bronnen bevestigen **60+ GRATIS** bij Juyongguan (met paspoort). DB's CNY 20 is verouderd (oud 60-64 halfprijs, 65+ gratis). Huidige praktijk: 60+ gratis.
- ❗ Patch: `price_senior_cny` → 0; tip: "paspoort meenemen voor gratis ticket bij balie".

### 60. `jinshanling-great-wall` — ⚠ DEVIATION (senior-prijs trapsgewijs)
- Bronnen: travelchinaguide.com/jinshanling-great-wall, chinaodysseytours.com/jinshanling, trip.com
- DB: senior 35
- Findings: **60–69: halfprijs (±33 peak); 70+: GRATIS.** Ouders zijn 70+ → gratis. Kinderen (adult volwassen zoons) betalen vol.
- ❗ Patch: `price_senior_cny` → 0 (voor 70+); voeg tip dat 60-69 halfprijs, 70+ gratis.

### 61. `simatai-great-wall` — ⚠ DEVIATION (senior-prijs + kabelbaan)
- Bronnen: travelchinaguide.com/simatai-great-wall-tickets-booking.htm, gubeiwatertown.com, trip.com
- DB: adult 40, senior 20, kabelbaan 90 enkel / 160 retour
- Findings: entree zelf: 60+ halfprijs, 70+ gratis. Kabelbaan **geen korting voor senior** — volle CNY 90/160. Bevestigd door travelchinaguide.
- ❗ Patch: `price_senior_cny` → 0 (voor 70+ ouders); voeg warning: "Kabelbaan NIET met seniorkorting — CNY 90/160 vol tarief".
- Avondtoegang: reservering verplicht, bevestigd.

### 62. `huanghuacheng-great-wall` — ✅ VERIFIED (senior-prijs halfprijs)
- Bronnen: english.beijing.gov.cn 202409/t20240930_3910070, travelchinaguide.com/huanghuacheng
- DB: adult 60, senior 30 — bevestigd (60+ halfprijs CNY 30, niet gratis).
- Patch: geen.

### 63. `gubeikou-great-wall` — ⚠ MINOR (senior-prijs)
- Bronnen: travelchinaguide.com/gubeikou, trip.com gubeikou-great-wall
- DB: adult 25, senior 15
- Findings: de "wild" sectie heeft vaak geen officieel ticketsysteem (entry via dorpspad). De CNY 25 bezoekerscentrum-ticket wordt lokaal meestal volledig gevraagd, 70+ vaak geaccepteerd als gratis.
- ❗ Patch: kleine noot in `warnings_nl`: "Geen consistent officieel prijs-regime — ter plaatse afrekenen, 70+ paspoort tonen voor mogelijk gratis toegang".

### 64. `ming-tombs-shisan-ling` — ⚠ DEVIATION (duplicaat + hours)
- Bronnen: english.beijing.gov.cn 202407/t20240719_3753671, travelchinaguide.com
- DB: hoog 08:00-17:30 / laag 08:30-17:00, adult 98 combi, senior 0
- Findings: Opening-hours bevestigd. Combi-prijs peak actueel **CNY 130** (niet 98). Senior 60+ gratis bevestigd.
- ❗ Patch: `price_adult_cny` → 130 (peak); ensure duplicaat met #51 wordt opgelost (bij voorkeur #51 verwijderen, #64 behouden als canonieke entry).

### 65. `sacred-way-shen-dao` — ⚠ MINOR (prijs)
- Bronnen: travelchinaguide.com, visitourchina.com/ming-tombs
- DB: adult 30, senior 0
- Findings: peak CNY 30 bevestigd. 60+ gratis. Hours 08:00-17:30 peak correct.
- Patch: geen.

### 66. `yunju-temple` — ⚠ DEVIATION (peak hours)
- Bronnen: Trip.com yunju-temple-76657, loongwander.com
- DB: summer 08:30-17:00 / winter 08:30-16:30
- Findings: officieel **peak (apr-okt) 08:30–16:30 laatste 16:00; winter 08:30–16:00 laatste 15:30**. DB zet peak te laat.
- ❗ Patch: `opening_hours` → "peak apr-okt 08:30-16:30 (laatste 16:00); winter 08:30-16:00 (laatste 15:30); tijdens publieke feestdagen tot 17:00".

---

## BEIJING — HUTONGS / BUURTEN

### 67–73. `nanluoguxiang`, `yandai-xiejie`, `maoer-hutong`, `guozijian-street`, `shichahai-houhai`, `dashilan`, `qianmen-street` — ✅ ALL VERIFIED (openbare buurt, 24/7)
- Opmerking: `guozijian-street` (70) koppelt aan Confucius-tempel met aangepaste closed_days (alleen maandag — zie #48).
- Patch: `guozijian-street.closed_days` indien aanwezig → `["monday"]` (was `["monday"]` — correct, geen wijziging).

### 74. `liulichang` — ✅ VERIFIED
- Winkels 09:30-18:00. OK.
- Patch: geen.

---

## BEIJING — PARKEN & OLYMPICS

### 75. `ritan-park` — ✅ VERIFIED (gratis, 06:00-21:00)
### 76. `ditan-park` — ✅ VERIFIED (CNY 2 park-entree, altaar-binnenplaats extra)
### 77. `yuyuantan-park` — ✅ VERIFIED
- Kersenbloesem: late april piek meestal al voorbij — DB `seasonal_notes` vermeldt dit correct.
- Patch: geen.

### 78. `olympic-park-birds-nest` — ⚠ DEVIATION (senior-prijs)
- Bronnen: Trip.com national-stadium-bird-s-nest-10559019, eastchinatrip.com, wildgreatwall.com
- DB: adult 50, senior 25
- Findings: officieel **basis-ticket 40 CNY (niet 50)**; panoramisch ticket CNY 100. **65+ gratis**, 60-64 halfprijs. DB's CNY 50 adult en 25 senior voor 60+ is aannemelijk voor 60-64, maar ouders (70+) = gratis.
- ❗ Patch: `price_adult_cny` → 40 (basis); `price_senior_cny` → 0 (voor 65+); tips aanpassen.

---

## BEIJING — OVERIGE TEMPELS & KUNST

### 79. `dongyue-temple` — ✅ VERIFIED (closed Monday — 27 apr valt op maandag, warning correct)
- Patch: geen.

### 80. `fayuan-temple` — ⚠ DEVIATION (prijs mogelijk gratis)
- Bronnen: Trip.com fayuan-temple-83691, travelchinaguide.com/fayuan-temple.htm, koryogroup.com
- DB: adult 5, senior 0, woensdag dicht
- Findings: bronnen-inconsistentie over prijs: meerdere zeggen **gratis toegang**, andere CNY 5 of CNY 10. Travelchinaguide bevestigt gratis; airial.travel vermeldt 10 RMB. Woensdag-sluiting niet bevestigd; één bron zegt "gesloten verschillende dagen — bel vooraf". Seringen-festival half apr-begin mei klopt (bloesem tijdens reisperiode).
- ❗ Patch: `price_adult_cny` → 0 (gratis — meest gangbaar); `closed_days` → [] met warning "sluitingsdag varieert — dinsdag of woensdag; verifieer via hotel".

### 81. `zhihua-temple` — ⚠ MINOR (hours)
- Bronnen: english.visitbeijing.com.cn (Beijing Cultural Exchange Museum), Trip.com zhihua-temple-90849
- DB: 08:30-16:30, maandag dicht, muziek meestal 10:00 en 15:00
- Findings: bevestigd **09:00–16:30 (laatste 16:00)**, muziekperformance inderdaad 10:00 en 15:00 dagelijks (27e generatie Jing-muziek). DB zegt 08:30 — waarschijnlijk 09:00.
- ❗ Patch: `opening_hours` → "09:00-16:30 (laatste entree 16:00)".

### 82. `798-art-zone` — ✅ VERIFIED (al behandeld batch 1)
- Patch: geen.

### 83. `caochangdi` — ✅ VERIFIED (galerie-district, 10:00-18:00 typisch, maandag dicht, Didi aanbevolen)
- Patch: geen.

### 84. `panjiayuan-market` — ✅ VERIFIED
- Bronnen: visitourchina.com, travelchinaguide.com/cityguides/beijing/shopping/panjiayuan-market.htm
- DB: buiten 04:30-18:00 weekend, overdekte ma-vr 08:30-18:30
- Findings: bevestigd. Labor Day-specifieke uitzondering (weekend-markt-modus óók op 1+4+5 mei) — niet officieel bevestigd in bronnen; laat DB's `seasonal_notes` "verifieer via Dianping" staan.
- Patch: geen.

### 85. `namoc` (Nationaal Kunstmuseum) — ✅ VERIFIED
- 09:00-17:00 laatste 16:00, maandag dicht, gratis met paspoort + online reservering. Correct.
- Patch: geen.

### 86. `sanlitun` — ✅ VERIFIED (modern winkeldistrict, 10:00-22:00, bars later)
### 87. `gulou-drum-tower` — ✅ VERIFIED
- Trommeltoren 09:00-17:00 laatste 16:30, performances half-uur. Correct.
- Patch: geen.

---

## XI'AN — RESTAURANTS (88–95)

Algemeen: restaurants hebben doorgaans geen openbare "closed_day"; opening-hours zijn indicatief van Dianping/Trip.com/BaiduMaps.

### 88. `jiasan-guantang-baozi-xian` — ✅ VERIFIED
- 08:30-21:30 op Beiyuanmen, hoofdvestiging. Halal. OK.

### 89. `lao-sun-jia-yangrou-paomo` — ✅ VERIFIED
- Dongguan-hoofdvestiging 10:30-21:00 bevestigd.

### 90. `tongshengxiang-paomo` — ✅ VERIFIED (al in batch 4 besproken)
- Patch: geen nieuwe.

### 91. `defachang-dumpling-banquet` — ✅ VERIFIED
- 11:00-14:30, 17:00-21:00 geverifieerd via Trip.com xian-defachang-dumpling-house.

### 92. `muslim-quarter-street-food` (Huimin Jie) — ✅ VERIFIED
- 10:00-23:00, piek 18:00-22:00. Zakkenroller-warning correct.

### 93. `biangbiang-noodles-first-under-sun` — ✅ VERIFIED

### 94. `yintai-food-court-xian` — ✅ VERIFIED
- 10:00-22:00 mall-hours. OK.

### 95. `muji-hotel-cafe-xian` — ⚠ MINOR
- Muji Hotel Xi'an: Muji Diner-cafe ligt in Muji Hotel (bij Jiefang Road). Trip.com bevestigt 07:00-22:00. OK.
- Patch: geen.

---

## BEIJING — RESTAURANTS (96–109)

Algemeen: Peking-eend restaurants vaak geen aparte senior-korting; prijzen p.p. en openingstijden getoetst via Trip.com en Dianping-equivalenten.

### 96. `siji-minfu-peking-duck` — ✅ VERIFIED
- Nanchizi: 10:30–22:30 doorlopend; andere filialen 11:00–14:30 + 17:00–21:30. Correct. Reserveren via wechat/dianping sterk aanbevolen tijdens Labor Day.

### 97. `quanjude-peking-duck` — ⚠ MINOR (hours)
- DB: 11:00-13:30, 16:30-21:00
- Findings: Qianmen-vestiging (origineel): 11:00-21:30 doorlopend volgens Trip.com; DB's split-schema lijkt verouderd.
- ❗ Patch: `opening_hours` → "11:00-14:00, 16:30-21:00 (hoofdvestiging Qianmen: doorlopend tot 21:30)".

### 98. `da-dong-peking-duck` — ✅ VERIFIED (11:00-22:00 doorlopend)

### 99. `liqun-roast-duck-hutong` — ✅ VERIFIED
- Warning "smalle hutong, taxi vindt niet" correct. Toiletten basic Chinees-hurkmodel warning correct.

### 100. `jing-yaa-tang-opposite-house` — ✅ VERIFIED
- Opposite House hotel, lunch 11:30-14:30, dinner 17:30-22:30. Michelin Bib.

### 101. `haidilao-hotpot-beijing` — ✅ VERIFIED (doorlopend 11:00-06:00, sommige filialen 24u)

### 102. `din-tai-fung-beijing` — ✅ VERIFIED

### 103. `mr-shis-dumplings-hutong` — ✅ VERIFIED

### 104. `king-s-joy-vegetarian` — ✅ VERIFIED (Michelin 2-ster, 11:30-14:00 + 17:30-21:30)

### 105. `wangfujing-snack-street` — ⚠ KRITISCHE WARNING
- DB: 10:00-22:00, warning "traditionele stalls grotendeels verdwenen sinds..."
- Findings: klopt — **Wangfujing Xiaochi Jie is grotendeels gesloten sinds renovatie 2018-2019 en nooit in oude vorm heropend.** De snackmarkt bestaat niet meer als toeristische belevenis; alleen de naam-doorverwijzing in sommige reis-gidsen is verouderd. Alternatief: Nanluoguxiang, Dashilan voor snacks.
- ❗ Patch: `warnings_nl` versterken met "MOGELIJK GESLOTEN — check ter plaatse; de originele snackstraat Donghuamen Yeshi is sinds 2016 dicht en Wangfujing Xiaochi Jie na 2018-19 grotendeels verdwenen. Overweeg Nanluoguxiang of Houhai voor street-food sfeer.".

### 106. `old-beijing-zhajiangmian-laobeijing` — ✅ VERIFIED
### 107. `capital-m-beijing-western` — ✅ VERIFIED (Sunday brunch 11:30-15:00, 2 avondslots)
### 108. `lost-heaven-beijing-yunnan` — ✅ VERIFIED (11:30-14:30, 17:30-22:00)

### 109. `trb-forbidden-city` — ✅ VERIFIED
- 12:00-14:30, 18:00-22:00. Maandag dicht. Prijs CNY 900-1400 p.p. correct.
- Attentie: 27 apr = maandag = TRB dicht; plan niet op die dag.

---

## XI'AN — SHOPPING / SHOWS / AVOND (110–115)

### 110. `xian-tang-west-market` — ✅ VERIFIED
### 111. `xian-muslim-quarter-shopping` — ✅ VERIFIED (zie ook #92)
### 112. `xian-skp` — ✅ VERIFIED
### 113. `xian-tang-dynasty-show` — ✅ VERIFIED
- Banquet 18:00-19:30 + show 19:30-20:35 bevestigd via tang-dynasty-show.com / Trip.com. Prijs CNY 320 bevestigd.
### 114. `xian-big-wild-goose-fountain` — zie batch 4 (items 127+) — al behandeld.
### 115. `xian-city-wall-night` — zie batch 4.

---

## BEIJING — SHOPPING / SHOWS (116–126)

Alle items hieronder in-line getoetst via 2e bron (Trip.com, officiële theater-sites).

### 116. `beijing-wangfujing` — ✅ VERIFIED (zie ook #54)
### 117. `beijing-xidan` — ✅ VERIFIED (10:00-22:00)
### 118. `beijing-sanlitun-taikoo-li` — ✅ VERIFIED (Pageone 24u, mall 10:00-22:00)
### 119. `beijing-qianmen-street` — ✅ VERIFIED (zie ook #73)
### 120. `beijing-silk-street-xiushui` — ✅ VERIFIED
- Warning over agressieve verkopers + nepbiljetten: correct en kritisch.
### 121. `beijing-dashilan-liulichang` — ✅ VERIFIED
- DB hours 10:00-19:00 iets vroeger dan Qianmen-straat (20:00) — klopt voor Liulichang specifiek.
### 122. `beijing-hongqiao-pearl-market` — ✅ VERIFIED
- 09:30-19:00 dagelijks. Parel-testmethoden correct.
### 123. `beijing-skp` — ✅ VERIFIED
### 124. `beijing-solana` — ✅ VERIFIED
### 125. `beijing-red-theatre-kungfu` — ✅ VERIFIED
- Show 17:15 + 19:30, extra 15:00 in hoogseizoen. CNY 380 volgens officiële red-theatre.com.
### 126. `beijing-chaoyang-acrobatics` — ⚠ zie batch 1 — bestaand advies: "shows 17:15 en 19:30" in DB; officiële site variëert (16:00/17:30 soms). Verifieer bij ticketkanaal.

---

## SAMENVATTING — PATCHES IN BATCH 2+3

Kritieke prijs/tijd-correcties:
1. **beijing-zoo**: CNY 34 → 19 (peak combi).
2. **ming-tombs (#51)**: 135 → 130 + hours; **duplicaat met ming-tombs-shisan-ling (#64)** — één moet verwijderd.
3. **lama-temple**: 17:00 → 16:30 sluit.
4. **confucius-temple**: 08:30-18:00 peak → 09:00-17:00 year-round; closed_days van `["monday","tuesday"]` → `["monday"]`.
5. **temple-of-azure-clouds**: 08:40 → 08:00 peak.
6. **fragrant-hills-park**: 18:30 → 19:30 peak closing.
7. **juyongguan-great-wall**: senior 20 → 0 (60+ gratis).
8. **jinshanling-great-wall**: senior 35 → 0 (70+ gratis).
9. **simatai-great-wall**: senior 20 → 0 (70+ gratis); kabelbaan geen korting.
10. **fayuan-temple**: 5 → 0 (gratis).
11. **olympic-park-birds-nest**: adult 50 → 40, senior 25 → 0 (65+).
12. **ming-tombs-shisan-ling**: 98 → 130 peak combi.
13. **yunju-temple**: peak 17:00 → 16:30.
14. **zhihua-temple**: 08:30 → 09:00 opening.
15. **quanjude-peking-duck**: hours-range verruimen.
16. **wangfujing-snack-street**: warning versterken (grotendeels gesloten).
17. **mutianyu-great-wall**: weekend 18:00 → 18:30 peak.
18. **badaling-great-wall**: laatste entree 16:00 → 16:30.

---

## NOTITIE OVER DUPLICATEN

DB bevat duplicaat-entries:
- `ming-tombs` (#51) + `ming-tombs-shisan-ling` (#64) → dezelfde locatie met andere prijzen.
- `798-art-district` (#53) + `798-art-zone` (#82) → al in batch 1 gemarkeerd.

Aanbeveling: deduplicaat bij volgende edit-pass; tot die tijd: patch beide met identieke actuele prijs.

---

**Einde CROSS_CHECK_BATCH23.md**
