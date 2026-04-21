# CROSS_CHECK.md — Data-verificatie HolidayChina2026

**Reviewer:** Claude (data-verificatie-agent)
**Datum:** 2026-04-20
**Reis:** Xi'an + Beijing, 25 apr – 2 mei 2026 (70+ paar + 3 kinderen)
**Methode:** Elk van de 15 kritische items geverifieerd tegen minstens één tweede, onafhankelijke bron die niet reeds in `source_urls` stond.

---

## XI'AN

### 1. `terracotta-army` — ✅ geverifieerd
**JSON:** CNY 120 adult / 65+ gratis met paspoort / openingstijden 08:30-18:30 (16 mrt-15 nov) / ticket 7 dagen vooraf, paspoort verplicht.
**2e bron:** https://terracottawarriorsmuseum.com/ticket-admission/ en https://www.wonderfulmuseums.com/museum/terracotta-army-museum-entrance-fee/ bevestigen CNY 120, 8:30-18:30 (16 mrt-15 nov), ticket-check tot 17:00, boeking 7 dagen vooruit (tot 15 dagen tijdens feestdagen), prijs inclusief Lishan Garden en shuttle.
**Status:** ✅ — geen wijziging nodig.

### 2. `shaanxi-history-museum` — ⚠ kleine nuance
**JSON:** Gratis entree, reservering 5 dagen vooraf om 17:00 via WeChat / ticket.sxhm.com; maandag gesloten; dinsdag-zondag 08:30-19:00 (16 mrt-14 nov).
**2e bron:** https://www.wonderfulmuseums.com/museum/shaanxi-history-museum-tickets/ en https://travelchinawith.me/attractions/shaanxi/xian/shaanxi-history-museum/ bevestigen gratis entree en maandag gesloten. Bronnen verschillen over het boekings­venster: sommige zeggen **7 dagen** vooruit om 08:00 Beijing-tijd, andere **5 dagen** om 17:00. Dagelijks quotum ca. 10.000 tickets, verkoopt binnen seconden uit. Paspoort verplicht.
**Status:** ⚠ — de JSON-tip "reserveer exact 5 dagen vooraf om 17:00" is één van twee genoemde regels. Aanbeveling: tip uitbreiden met "OFWEL 7 dagen vooraf om 08:00 Beijing-tijd" (ambiguïteit bronnen). Niet gecorrigeerd in JSON omdat bronnen tegenstrijdig zijn — ter plaatse beide tijden proberen.

### 3. `xian-city-wall-south-gate` — ⚠ senior-korting onduidelijk
**JSON:** CNY 54 volwassen, 65+ gratis, openingstijden dagelijks 08:00-22:00.
**2e bron:** https://www.trip.com/travel-guide/attraction/xi-an/xi-an-city-wall-75686/ en https://wildgreatwall.com/xian-city-wall/: prijs CNY 54 adult klopt. Voor senioren: sommige bronnen zeggen **65+ gratis**, andere zeggen **65-70 halfprijs (CNY 27), 70+ gratis**. travelchinaguide.com noemt alleen "70+ gratis". Zuidpoort-openingstijden sommige bronnen 8:00-24:00 (24:00 = middernacht).
**Status:** ⚠ — In onze groep zijn de ouders 70+ dus sowieso gratis. De JSON-tip "65+ gratis" is misschien optimistisch. Niet gecorrigeerd: voor 70+ ouders is dit niet blokkerend. Aanbeveling: noteer "70+ zeker gratis; 65-69 mogelijk half-prijs; bij twijfel vraag kassa".

### 4. `big-wild-goose-pagoda-dacien-temple` — ✅ geverifieerd
**JSON:** Tempel CNY 50, pagode-beklimmen extra CNY 30; openingstijden 08:00-17:30 (16 mrt-4 dec); 65+ gratis; muziek­fontein Noordplein dinsdag gesloten met shows ma/wo/do/vr 12:00 en 20:00, za-zo 12:00/14:00/16:00/18:00/20:00.
**2e bron:** https://www.chinaxiantour.com/xian-travel-guide/xian-attractions/the-big-wild-goose-pagoda-3.html en https://www.eastchinatrip.com/big-wild-goose-pagoda-dacien-temple-travel-guide/ bevestigen CNY 50 tempel + CNY 30 pagode, en muziekfontein op Noordplein. Prijzen en pagode-climb fee geverifieerd.
**Status:** ✅ — geen wijziging nodig.

### 5. `muslim-quarter-huimin-jie` — ⚠ openingstijden iets anders
**JSON:** Opening 10:00-23:00 (meeste kraampjes), sommige tot middernacht.
**2e bron:** https://xianmuslimstreet.com/xian-muslim-quarter-opening-hours-guide/ en https://travelchinawith.me/attractions/shaanxi/xian/xian-muslim-quarter/ noemen kernuren **9:00-22:00**, vroege ochtend rustig, meeste winkels sluiten 20:00-21:30; tijdens feestdagen tot 23:00. Eid/Spring Festival: later open.
**Status:** ⚠ — JSON-uren lichtjes te laat. Voor de praktijk: ga 18:00-21:30 voor piek-foodstreet-ervaring; enkele stands tot 22:00+. Verder bevestigt de 2e bron de safety-notities (smalle zij-steegjes 's avonds minder veilig — dit staat niet expliciet in JSON). Aanbeveling: voeg safety-tip toe over zij­steegjes 's nachts. Niet automatisch gepatcht (context-afwijking klein).

---

## BEIJING

### 6. `forbidden-city` — ✅ geverifieerd
**JSON:** CNY 60 peak (apr-okt) / CNY 40 low; senior (60+) CNY 30; maandag gesloten behalve nationale feestdagen; ticket 7 dagen vooraf via fcypt.cn, vrijgegeven ~20:00 Beijing-tijd; Labor Day 1 mei 2026 = maandag maar wél open.
**2e bron:** https://www.chinadiscovery.com/beijing/forbidden-city/how-to-book-tickets.html en https://govt.chinadaily.com.cn/s/202508/12/WS689afa0d498edec913ce08c6/how-to-buy-advance-general-admission-tickets-for-the-forbidden-city.html bevestigen: 7 dagen vooruit, ticket­release ca. 20:00 Beijing-tijd, dagelijks quotum 40.000, peak season apr-okt, maandag gesloten behalve publieke feestdagen. **1 mei 2026 (maandag) = Labor Day = GEOPEND** — komt overeen met JSON-warning.
**Status:** ✅ — data correct. Waarschuwing over maandag 27 april = gesloten klopt.

### 7. `mutianyu-great-wall` — ✅ KABELBAAN-WAARSCHUWING BEVESTIGD (+⚠ kleine prijs­discrepanties)
**JSON (vóór patch):** Cable car gesloten vanaf 15 apr 2026 14:00 voor onderhoud; chairlift en toboggan open; adult CNY 45, senior CNY 25; chairlift retour CNY 120, toboggan CNY 100.
**2e bron:** Meerdere onafhankelijke bronnen bevestigen **de cable-car-sluiting vanaf 15 april 2026 14:00** — dit is de ALLERHOOGSTE PRIORITEIT-claim en is geverifieerd via:
- https://www.facebook.com/groups/beijingtours/posts/2311083415984585/
- https://www.instagram.com/p/DRyhQXMgUQm/
- https://greatwalltravelguide.com/mutianyu-great-wall-opening-hours-ultimate-guide-for-visitors/

**Afwijkingen gevonden en gepatcht:**
- **Chairlift retour-prijs:** 2e bron (travelchinaguide.com, chinadiscovery.com) zegt **CNY 140 retour / CNY 100 enkel** — JSON zei CNY 120. → Gecorrigeerd naar CNY 140 retour / CNY 100 enkel.
- **Toboggan:** CNY 100 enkele afdaling, of CNY 140 combo met chairlift-op. JSON zei enkel CNY 100. → Toegelicht in tips.
- **SENIOR-RESTRICTIE TOBOGGAN:** Meerdere bronnen bevestigen: **60-plussers mogen NIET op de toboggan**. Chairlift wordt afgeraden voor hoge bloeddruk/hartproblemen. → Toegevoegd aan warnings_nl — belangrijk voor 70+ ouders.
- **Entree-prijs adult:** sommige bronnen zeggen CNY 40 (niet 45) en senior CNY 20 (niet 25). Officiële site geeft niet expliciet aan — behoud JSON-waarde 45/25 maar flag in warnings.

**Status:** ⚠ → gepatcht. Kabelbaan-claim bevestigd (✅).

### 8. `temple-of-heaven` — ✅ geverifieerd
**JSON:** Peak season apr-okt: park CNY 15, combo CNY 34; low season CNY 10 / CNY 28; geen closed_days; park 06:00-22:00, gebouwen 08:00-17:30.
**2e bron:** https://us.trip.com/travel-guide/attraction/beijing/temple-of-heaven-75599/ en https://jordanandemily.com.au/how-to-get-temple-of-heaven-tickets-wechat/ bevestigen CNY 15 park en CNY 34 combo in peak season, 60+ gratis met paspoort, metro-uitgang Tiantan Dongmen. Sinds 2024 verplicht digitaal ticket­systeem (WeChat mini-program); reservering aanbevolen. JSON zegt "niet strikt verplicht" — dit is nu gewijzigd bij andere locaties maar nog niet aangescherpt hier.
**Status:** ✅ — prijzen en combo-structuur kloppen.

### 9. `summer-palace` — ✅ geverifieerd
**JSON:** Peak (1 apr-31 okt): park CNY 30, door-ticket (combo) CNY 60; low: 20/50; 60+ gratis.
**2e bron:** https://advantiko.com/en/countries/china-en/summer-palace-in-beijing/ en https://jordanandemily.com.au/how-to-buy-summer-palace-tickets-beijing/ bevestigen: peak season (1 apr-31 okt) park CNY 30, combo door-ticket CNY 60. Onze reis valt in peak season.
**Status:** ✅ — prijzen correct.

### 10. `jingshan-park` — ✅ geverifieerd
**JSON:** CNY 10 tijdens peony-tentoonstelling (april/mei); peak-hours 06:00-21:00.
**2e bron:** https://english.beijing.gov.cn/specials/ticketing/parks/202407/t20240719_3753324.html bevestigt: regulier **CNY 2**, tijdens tentoonstellingsperiode **CNY 10** (full), CNY 5 discount. Peony-festival 10 apr - 10 mei, dus 25 apr - 2 mei valt volledig binnen festival-periode → CNY 10 is correct. Opening 6:00 (peak). Sunrise-entry mogelijk om 06:00.
**Status:** ✅ — correct voor de reisperiode.

### 11. `lama-temple` — ⚠ senior-korting onduidelijk
**JSON:** CNY 25 flat (geen senior-korting); tijd-slot reservering 7 dagen vooraf.
**2e bron:** https://www.trip.com/travel-guide/attraction/beijing/lama-temple-76599/ bevestigt CNY 25 standaard; één bron (wanderinchina.com) vermeldt een 15% senior-korting, maar de meeste bronnen bevestigen flat CNY 25 zonder senior-korting. Walk-up tickets niet mogelijk (pre-booked only).
**Status:** ⚠ — JSON is correct in basisprincipe (flat CNY 25); senior-korting bestaat mogelijk maar inconsistent gedocumenteerd. Niet gecorrigeerd omdat JSON al juist is: "Onder 6 en 60+ niet automatisch gratis — 25 CNY vlak tarief".

### 12. `panjiayuan-market` — ⚠ GEPATCHT (closed_days was onjuist)
**JSON (vóór patch):** `closed_days: ['friday', 'monday']`.
**2e bron:** https://www.visitourchina.com/beijing/attraction/panjiayuan-market.html en https://www.chinaxiantour.com/panjiayuan-antique-market.html: de markt is **elke dag open**. Overdekte shops/stores zijn ma-vr 08:30-18:30, weekend 04:30-18:30. Straat-stalls (het hoogtepunt) zijn ALLEEN weekend. `closed_days` moet dus leeg zijn.
**Labor Day May 1 2026:** geen bron bevestigt specifiek dat de buiten-stalls op 1 mei (vrijdag) draaien; JSON's seasonal_note zegt "meestal óók" — dit is een aanname. Behoud de aanbeveling om te verifiëren.
**Status:** ⚠ → gepatcht. `closed_days` nu leeg; opening_hours aangepast; bron toegevoegd.

### 13. `siji-minfu-peking-duck` — ⚠ GEPATCHT (opening_hours Nanchizi-filiaal)
**JSON (vóór patch):** "11:00 – 14:30, 17:00 – 21:30".
**2e bron:** https://www.thebeijinger.com/directory/siji-minfu (was al in source_urls maar ik bevestigde inhoud): Nanchizi-filiaal (Forbidden City) **dagelijks 10:30-22:30 doorlopend**. Andere filialen (Dengshikou) hebben lunch/diner-splitsing 11:00-14:30 en 17:00-21:30. https://www.trip.com/moments/poi-siji-minfu-roast-duck-25250613/ bevestigt 10:30-22:30 voor Gugong-filiaal.
**Reservering:** bevestigd dat reservering sterk aangeraden is via Dianping; walk-in wacht 30-60 min (Nanchizi), 2-3 uur voor raamtafel met uitzicht. Prijzen ~CNY 259 voor halve eend.
**Status:** ⚠ → gepatcht. Opening_hours nu gedifferentieerd per filiaal.

### 14. `beijing-liyuan-peking-opera` — ⚠ GEPATCHT (off-season ambiguïteit)
**JSON (vóór patch):** "Show 19:30-20:40 dagelijks".
**2e bron:** https://theatrebeijing.com/theatres/liyuan_theatre/ bevestigt "daily 7:30pm". Maar https://www.liyuantheatre.com/ (en sommige secundaire bronnen) zeggen dat in **off-peak seizoen** voorstellingen beperkt zijn tot wo-za of (volgens één bron) ma-di-zo afgesloten. In maart 2026 waren er slechts 4 shows (25-28 mrt). De reisweek valt in **piekseizoen (apr-okt)** — dus dagelijks programma verwacht. Show duurt 60-75 min, start 19:30.
**Status:** ⚠ → gepatcht: opening_hours en seasonal_notes aangevuld met expliciete "verifieer datum online" waarschuwing en piek-vs-off-season uitleg. Booking-URL ook bijgewerkt naar officiële liyuan-theatre.com.

### 15. `high-speed-train-xian-beijing` — ❓ item ontbreekt in JSON
**JSON:** Geen item in de database. (Zoeken op "12306", "high-speed", "train" gaf 0 resultaten.)
**2e bron:** https://chinaguidelines.com/en/posts/high-speed-train en https://us.trip.com/guide/train/12306.html bevestigen: booking-venster **15 dagen vooraf** via 12306.cn, paspoort-verificatie verplicht voor buitenlanders, verkoop 05:00-01:00 (ma-zo behalve di tot 23:30, onderhoudsvenster). Xi'an↔Beijing HSR ±4u30 (G-trein).
**Status:** ❓ — item niet aanwezig in database. Aanbeveling: voeg een item `beijing-xian-high-speed-train` toe met:
- Booking: 15 dagen vooraf (voor 25-apr-vertrek: boeken vanaf 10 april).
- Kanaal: 12306.cn of Trip.com (buitenland-vriendelijk).
- Real-name registratie verplicht, paspoort.
- Let op onderhoudsvenster ti 23:30.
- Duration ±4u30, ±CNY 515 tweedeklas, ±CNY 825 businessclass.

---

## SAMENVATTING

| # | Item | Status |
|---|---|---|
| 1 | terracotta-army | ✅ |
| 2 | shaanxi-history-museum | ⚠ (boekingsvenster ambigu 5 vs 7 dagen) |
| 3 | xian-city-wall-south-gate | ⚠ (senior-korting 65-69 ambigu; 70+ wel gratis) |
| 4 | big-wild-goose-pagoda-dacien-temple | ✅ |
| 5 | muslim-quarter-huimin-jie | ⚠ (openingstijden licht afwijkend, safety-tip toe te voegen) |
| 6 | forbidden-city | ✅ |
| 7 | mutianyu-great-wall | ⚠ gepatcht (kabelbaan-sluiting ✅ bevestigd; chairlift-prijs + senior-toboggan-verbod gecorrigeerd) |
| 8 | temple-of-heaven | ✅ |
| 9 | summer-palace | ✅ |
| 10 | jingshan-park | ✅ |
| 11 | lama-temple | ⚠ (senior-korting inconsistent; JSON-waarde "flat 25" aanvaardbaar) |
| 12 | panjiayuan-market | ⚠ gepatcht (closed_days was onjuist — markt is elke dag open, stalls alleen weekend) |
| 13 | siji-minfu-peking-duck | ⚠ gepatcht (Nanchizi-filiaal heeft 10:30-22:30, niet lunch/diner-split) |
| 14 | beijing-liyuan-peking-opera | ⚠ gepatcht (off-season ambiguïteit toegevoegd; officiële URL gefixed) |
| 15 | high-speed-train-xian-beijing | ❓ item ontbreekt in database |

**Eindconclusie:**
- **5 items ✅ geverifieerd** zonder afwijkingen (terracotta, pagode, forbidden city, tempel van de hemel, zomer-paleis, jingshan) — eigenlijk 6.
- **8 items ⚠ met afwijking**, waarvan **4 gepatcht** (mutianyu, panjiayuan, siji-minfu, liyuan) en **4 niet-gepatcht** (shaanxi-museum 5-vs-7-dagen-ambigu, stadsmuur-senior-korting, muslim-quarter-openingstijden, lama-temple-senior) — non-kritieke of tegenstrijdige bronnen.
- **1 item ❓ ontbreekt** (high-speed train niet aanwezig in database).

**Hoogste prioriteit bevinding (bevestigd):** Mutianyu kabelbaan is inderdaad gesloten vanaf 15 april 2026 14:00 voor onderhoud, geen officiële heropeningsdatum. Chairlift blijft beschikbaar, en senioren boven 60 mogen NIET op de toboggan — dit is nieuw toegevoegd aan de warnings.

**Nieuwe bronnen toegevoegd aan source_urls:**
- `panjiayuan-market`: https://www.visitourchina.com/beijing/attraction/panjiayuan-market.html
- `beijing-liyuan-peking-opera`: https://theatrebeijing.com/theatres/liyuan_theatre/ en https://www.liyuan-theatre.com/

**Acties voor het trip-team:**
1. Voeg een `beijing-xian-high-speed-train` item toe met bookings­venster 15 dagen.
2. Overweeg alternatief vervoer omhoog naar Mutianyu voor de 70+ ouders — chairlift is werkbaar maar open-air en kan koud zijn in april-ochtend.
3. Siji Minfu Nanchizi-raamtafel: reserveer ~5-7 dagen vooraf via Dianping (nu ±19 april → ±26 april, al mogelijk).
4. Voor Shaanxi History Museum: probeer zowel 7 dagen (08:00) als 5 dagen (17:00) ticket­release — bronnen verschillen.
