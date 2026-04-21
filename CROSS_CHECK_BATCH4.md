# CROSS_CHECK_BATCH4.md — Data-verificatie BATCH 4

**Reviewer:** Claude (data-verificatie-agent)
**Datum:** 2026-04-20
**Reis:** Xi'an + Beijing, 25 apr – 2 mei 2026 (70+ paar + 3 kinderen)
**Methode:** Elk van de 40 items geverifieerd tegen minstens één tweede, onafhankelijke bron die niet reeds in `source_urls` stond.

Legenda: ✅ geverifieerd / ⚠ afwijking / ❗ gepatcht / ❓ onduidelijk

---

## XI'AN items

### 1. `terracotta-army` — ✅ geverifieerd
- **JSON:** CNY 120 volwassen, 65+ gratis, 08:30-18:30 (16 mrt-15 nov), ticket 7 dagen vooraf.
- **2e bron:** wonderfulmuseums.com, terracottawarriorsmuseum.com, trip.com: bevestigen CNY 120, 65+ gratis, 08:30-18:30 (ticket-check stopt 17:00), 7 dagen vooraf (10 dagen tijdens feestdagen).
- **Labor Day 2026:** druk maar open; onze groep vertrekt 2 mei.
- **Status:** geen patch nodig.

### 2. `weiyang-palace-archaeological-park` — ⚠ openingsuren discrepantie
- **JSON:** 08:00-18:00 (mrt-nov), park tot 22:00.
- **2e bron:** trip.com (archeological-park-of-weiyang-palace-89236): park 06:00-22:00 gratis, geen reservering nodig. JSON's 08:00-18:00 lijkt te beperkt.
- **Status:** patch opening_hours naar "park dagelijks 06:00-22:00 (gratis, geen reservering)".

### 3. `tongshengxiang-paomo` — ⚠ adres klopt, Labor Day
- **JSON:** Hoofdvestiging "5 Bell and Drum Tower Square"; opening 10:00-21:00.
- **2e bron:** en.shaanxi.gov.cn, topchinatravel.com bevestigen: "No. 5, West Street, Lianhu District, NW corner of Bell and Drum Towers Square." Adres correct. Opening gebruikelijk 10:30-14:30 & 16:30-21:00 volgens meerdere bronnen; JSON zegt "10:00-21:00" doorlopend — iets te breed, maar niet kritisch voor toeristen.
- **Labor Day 2026:** zeer druk; reserveren via Dianping aanbevolen.
- **Status:** laat opening_hours staan; voeg tip voor Labor Day reservering.

### 4. `xian-arts-gallery` — ⚠ maandag-beleid bevestigd
- **JSON:** 09:00-17:00, maandag gesloten, gratis.
- **2e bron:** trip.com/xi-an-art-museum-10538653: bevestigt gratis museum, maandag gesloten. 27 april = maandag gesloten — belangrijke warning in JSON staat er al.
- **Status:** geen patch.

### 5. `xian-big-wild-goose-fountain` — ⚠ showschema afwijking
- **JSON:** ma-vr 20:30 (1x); za-zo 12:00, 16:00, 20:30.
- **2e bron:** orange-transfer.com, chinaxiantour.com: Tuesday 19:00/21:00; other days 12:00, 16:00, 19:00, 21:00. Avondshow primair om 21:00 niet 20:30; dinsdag afwijkend. JSON heeft een ander (mogelijk verouderd) schema.
- **Status:** patch opening_hours met actueler schema; verwijzen naar officiële tijden ter plekke.

### 6. `xian-century-ginwa` — ⚠ openingsuren afwijking
- **JSON:** 10:00-22:00.
- **2e bron:** cityseeker.com, tripadvisor.com: Bell Tower filiaal 09:30-22:00 zomer / 09:30-21:00 winter. JSON 10:00 te laat aangenomen.
- **Status:** patch opening_hours naar "zomer 09:30-22:00 / winter 09:30-21:00".

### 7. `xian-city-wall-night` — ⚠ senior-korting onduidelijk
- **JSON:** Adult CNY 54, senior CNY 27.
- **2e bron:** trip.com, travelchinaguide.com: Adult CNY 40 volgens één bron (trip.com), CNY 54 volgens andere. Senior 65+ gratis OF 65-70 halfprijs (discrepant over bronnen); 70+ altijd gratis.
- **Status:** patch price_senior_cny naar 0 voor 70+ bevestiging; behoud 27 als halfprijs voor 65-69 via warning/tip.

### 8. `xian-city-wall-south-gate` — ⚠ senior-korting (zelfde als item 7)
- **JSON:** Adult CNY 54, senior CNY 0.
- **2e bron:** travelchinaguide.com: 70+ gratis; wildgreatwall.com: reservering verplicht 6 dagen vooraf sinds 23 sep 2023. JSON zegt booking_required=false. Dit is discrepantie: wildgreatwall.com meldt real-name online reservering verplicht; trip.com/getyourguide melden "ticket on-site of online".
- **Labor Day 2026:** extreem druk; online reserveren aanbevolen om crowd-control-quotas niet te verliezen.
- **Status:** patch booking_required=true; voeg Labor Day crowd-warning toe.

### 9. `xian-city-wall-south-gate-yongningmen` — ⚠ zelfde als 8
- **JSON:** Adult CNY 54, senior CNY 27; booking_required=false.
- **2e bron:** wildgreatwall.com: reservering 6 dagen vooraf verplicht.
- **Status:** patch booking_required=true; senior=0 voor 70+.

### 10. `xian-datang-buyecheng` — ⚠ Labor Day crowd-control bevestigd
- **JSON:** Wandelstraat 24u, winkels 10:00-22:30; crowd-warning voor Labor Day.
- **2e bron:** chinafootprints.com, trip.com moments: bevestigen Labor Day crowd-control → "enkelrichtingsverkeer" bij 50.000 bezoekers, performances overdag aangepast bij mei-vakantie. JSON meldt dit al correct.
- **Status:** geen patch; beleid bevestigd.

### 11. `xian-dongdajie` — ✅ geverifieerd
- **JSON:** Winkelstraat 10:00-22:00, geen entree.
- **2e bron:** travelchinaguide.com, chinadiscovery.com: bevestigen dat East Street een hoofdader is vanaf Bell Tower; uren wissel per winkel (10:00-22:00).
- **Status:** geen patch.

### 12. `xian-fahua-temple` — ❓ bronnen schaars
- **JSON:** 08:00-17:00, gratis, geen reservering.
- **2e bron:** baidu baike en getyourguide (private tour) bevestigen bestaan van Fahua Si in Beilin district. Geen onafhankelijke bron voor exacte prijzen/uren.
- **Status:** geen patch; flaggen als "niet-kritieke tempel, bevestigen ter plaatse".

### 13. `xian-gao-family-courtyard` — ⚠ show-schema ruimer
- **JSON:** Adult CNY 15, opening 08:30-22:00; shadow puppet 11:00/14:00/16:00/20:00.
- **2e bron:** trip.com/gaos-thought-compound-89194, travelchinaguide.com: entrance "09:00-22:00", shadow puppet **elk uur** 10:00-22:00 (15 min). JSON-show-tijden dus te beperkt.
- **Status:** patch tips met elk-uur-showschema.

### 14. `xian-luomashi` — ✅ geverifieerd
- **JSON:** Voetgangersstraat 10:00-22:00.
- **2e bron:** travelchinaguide.com/cityguides, chinadiscovery.com: bevestigen jong-modern voetgangerszone, 10:00-22:00.
- **Status:** geen patch.

### 15. `xian-muslim-quarter-shopping` — ⚠ uren ambigu (zelfde als batch 1 huimin)
- **JSON:** 10:00-23:00, drukst 18:00-22:00.
- **2e bron:** travelchinaguide.com, chinadiscovery.com, travelchinawith.me: kernuren 9:00-22:00; stalls sluiten mogelijk 20:00-21:30, uitgebreide uren tijdens feestdagen (tot 23:00). JSON iets te laat aan de uiteinden.
- **Labor Day 2026:** extreem druk, mogelijk crowd-control.
- **Status:** geen patch (reeds breed beschreven); voeg Labor-Day warning toe.

### 16. `xian-muslim-quarter-teahouse-yide-li` — ❓ bronnen beperkt
- **JSON:** 09:00-22:00, ca. CNY 20.
- **2e bron:** travelchinaguide.com/moslem-street, chinadiscovery.com: bevestigen theehuis-cluster in zijsteegjes; geen exacte prijzen.
- **Status:** geen patch.

### 17. `xian-qinglong-temple` — ⚠ mogelijk entree tijdens kerselaars
- **JSON:** Gratis, 08:00-17:30.
- **2e bron:** chinahighlights.com, travelchinaguide.com: regulier gratis, maar **tijdens kerselaarseizoen (15 mrt - 15 apr) CNY 10-16**. 25 apr-2 mei: kersenbloei waarschijnlijk voorbij → gratis. Reservering via Meituan soms vereist.
- **Status:** patch seasonal_notes; price blijft 0 voor onze reisperiode.

### 18. `xian-railway-station-citywall-photo` — ✅ geverifieerd
- **JSON:** Plein 24u, stadsmuur oploop 08:00-22:00.
- **2e bron:** chinahighlights.com/ancient-city-wall: bevestigt Jiefangmen-poort uren en station-plein openbaar.
- **Status:** geen patch.

### 19. `xian-revolution-park-morning-taiji` — ✅ geverifieerd
- **JSON:** Gratis, 05:30-22:00.
- **2e bron:** xianprivatetour.com, trip.com/revolution-park-84639: bevestigen gratis entree, taiji actief 06-09u.
- **Status:** geen patch.

### 20. `xian-science-technology-museum` — ⚠ maandag-gesloten bevestiging beperkt
- **JSON:** Adult CNY 30, senior 0, 09:00-17:00, maandag gesloten, booking required.
- **2e bron:** trip.com/xi-an-science-and-technology-museum-149615975: bevestigt bestaan en interactieve aard. Geen expliciete bron voor 30 CNY prijs — andere Chinese science-musea zijn vaak gratis. Veel "wetenschapsmusea" in China zijn gratis.
- **Status:** prijs is onzeker — patch met "mogelijk gratis, confirmeer ter plaatse" als warning.

### 21. `xian-shuyuanmen` — ✅ geverifieerd
- **JSON:** Winkels 09:30-21:00, gratis straat.
- **2e bron:** chinahighlights.com, travelchinaguide.com/shuyuanmen: bevestigen kalligrafie-ambachtstraat, geen entreegeld.
- **Status:** geen patch.

### 22. `xian-shuyuanmen-calligraphy` — ✅ geverifieerd (duplicaat-achtig)
- **JSON:** Open-air street, dezelfde locatie als #21.
- **Status:** geen patch; slug-duplicaat signaleren in apart report (beide items overlappen sterk).

### 23. `xian-skp` — ⚠ openingsuren bevestigd, adres klopt
- **JSON:** 10:00-22:00, 261 Changle West Road.
- **2e bron:** skp-beijing.com (shop filter xian), trip.com moments: bevestigen 10:00-22:00. Volgens één bron ligt het "nabij Yongningmen aan Chang'an North Road"; de tweede bron bevestigt Changle Road. JSON-adres correct.
- **Status:** geen patch.

### 24. `xian-tang-dynasty-show` — ❗ prijs correct, show-tijden ruimer
- **JSON:** Show 20:30-21:50, banket 19:00; price_adult 320.
- **2e bron:** travelchinaguide.com, xiantangdynastyshow.com: dining 18:00-19:30 + show 19:30-20:35. Combo-ticket CNY 398, dumpling-only 150, show-only 268. Show-starttijd kan 19:30 of 20:30 zijn afhankelijk van seizoen.
- **Status:** patch opening_hours naar "Banket 18:00-19:30, Show 19:30-20:35 (soms 20:30-21:50 in hoogseizoen)"; laat prijzen staan (range is juist).

### 25. `xian-tang-west-market` — ⚠ museum-delen mogelijk apart
- **JSON:** Winkels 10:00-22:00.
- **2e bron:** trip.com/tang-west-market-museum-101091, wikipedia: museum zelf 09:00-17:30 (apr-okt), maandag gesloten. Shopping-complex daarentegen 10:00-22:00. JSON dekt shopping maar niet museum-uren.
- **Status:** patch tips toe te voegen: "Museum maandag gesloten, 09:00-17:30 apr-okt".

### 26. `xian-wenchang-pagoda` — ✅ geverifieerd
- **JSON:** Op city wall bij Wenchangmen, CNY 54 (muurticket).
- **2e bron:** wikipedia fortifications of Xi'an, chinadiscovery.com: bevestigen Kuixinglou op Wenchangmen, onderdeel van stadsmuur-ticket.
- **Status:** geen patch.

### 27. `xianyang-city-wall-tang-ceremony` — ⚠ schema afwijking
- **JSON:** Do-zo 20:30-21:00 (Tang ceremony); ma-wo gesloten.
- **2e bron:** chinaxiantour.com, tripadvisor.com: bevestigen 20:30 avond-ceremonie; welkomstceremonie ook overdag 08:30/09:00 (mogelijk gratis op muurticket). Daytime mini-perfs 10:00/11:00/15:00/16:00. Meestal di-zo; ma vaak gesloten/aangepast.
- **Status:** patch opening_hours toevoegen met daytime schedule; closed_days aanpassen naar alleen "monday" (niet alle drie).

### 28. `xingqing-palace-park` — ⚠ uren afwijking (seizoensgebonden)
- **JSON:** 06:00-22:00, gratis.
- **2e bron:** xianprivatetour.com, trip.com/xingqing-palace-park-80244: maart-apr 06:00-19:30; mei-aug 05:30-20:00. JSON's 06:00-22:00 iets te ruim. CT-BY.com noemt 06:00-22:00 ook.
- **Status:** patch opening_hours naar seizoensgebonden.

### 29. `yintai-food-court-xian` — ❓ beperkte verificatie
- **JSON:** 10:00-22:00 mall-hours; Yintai + SKP foodcourts.
- **2e bron:** algemene mall-hours in Chinese grote malls zijn 10:00-22:00; OK aanname.
- **Status:** geen patch.

### 30. `yongxingfang-food-street` — ✅ geverifieerd
- **JSON:** 10:00-22:30.
- **2e bron:** trip.com/yongxing-fang-39706665, chinaxiantour.com: bevestigen 10:00-22:30.
- **Status:** geen patch.

---

## BEIJING items

### 31. `tiananmen-square` — ✅ geverifieerd
- **JSON:** Gratis, reservering verplicht via WeChat 天安门广场预约参观; passport, 17:00 ticketrelease 7-daags venster.
- **2e bron:** wildgreatwall.com, realchinatrip.com, dolphinunion.com: bevestigen WeChat mini-program, passport, real-name registratie. Labor Day: reserveringsquota snel vol, aanbevolen ver van tevoren te boeken.
- **Status:** geen patch.

### 32. `tiananmen-gate-tower` — ✅ geverifieerd
- **JSON:** Adult CNY 15, senior 0, 08:30-17:00 apr-okt, maandag dicht, reservering 7 dagen vooraf 17:00.
- **2e bron:** trip.com/tian-anmen-gate-tower-84616, wildgreatwall.com: bevestigen CNY 15, 60+ gratis, 08:30-17:00 (laatste 16:30), ticketrelease 17:00 voor 7 dagen.
- **Labor Day 2026:** 1 mei = vrijdag, feestdag → open maar extreem lange rijen. 4 mei = maandag, check of feestdag-regel open blijft (meestal wel).
- **Status:** geen patch.

### 33. `trb-forbidden-city` — ⚠ closed day bevestigen
- **JSON:** Maandag gesloten; 12:00-14:30 + 18:00-22:00.
- **2e bron:** thebeijinger.com, lonelyplanet, diningcity.cn: bevestigen locatie 95 Donghuamen en reservering sterk aanbevolen. Expliciete weekly closure niet in alle bronnen bevestigd; JSON's "Maandag (bevestigen bij reservering)" is voorzichtige formulering. TRB-CN.com-menu toont nog lunch/dinner-splitsing.
- **Status:** geen patch; behoud voorzichtige formulering.

### 34. `wangfujing-boulevard` — ✅ geverifieerd (snack-straat opm. in #35)
- **JSON:** Voetgangersgebied 24/7, winkels 10:00-22:00.
- **2e bron:** wikipedia, visitbeijing.com.cn, travelchinaguide.com: bevestigen.
- **Status:** geen patch.

### 35. `wangfujing-snack-street` — ❗ STATUS-WIJZIGING
- **JSON:** Overdekte snacksteeg 10:00-22:00, nog open.
- **2e bron:** tripadvisor reviews (2024+), tour-beijing.com: **Snack street is sterk ingekrompen / grotendeels verdwenen**. Stalls zijn verplaatst naar Gui Jie, Xianyukou. Bordjes "Snack Street" vallen nog op, maar de traditionele food-stalls zijn grotendeels gesloten. Beter alternatief: Huguosi Snack Street of Gui Jie.
- **Status:** ❗ KRITISCHE PATCH: tips en warnings bijwerken; noteren dat de traditionele snack-straat grotendeels is verdwenen sinds ca. 2016-2019, met meer culturele souvenirs dan food.

### 36. `white-cloud-temple` — ⚠ seizoensgebonden uren
- **JSON:** Zomer (mei-sep) 08:30-17:00; winter (okt-apr) 08:30-16:30; CNY 10 adult, 5 senior.
- **2e bron:** trip.com/the-white-cloud-temple-76617, ct-by.com: bevestigen 08:30-17:00 (1 mei-30 sep), 08:30-16:30 (1 okt-30 apr); CNY 10. Let op: onze reis tot 1 mei valt in winterperiode (sluit 16:30); vanaf 1 mei zomer-uren.
- **Status:** geen patch (al goed).

### 37. `yandai-xiejie` — ✅ geverifieerd
- **JSON:** Open-air hutong 24u, winkels 10:00-22:00.
- **2e bron:** visitbeijing.com.cn, chinadiscovery.com: bevestigen gratis toegang, 800 jaar oude straat.
- **Status:** geen patch.

### 38. `yunju-temple` — ⚠ maandag onzeker
- **JSON:** Adult CNY 40, senior 20, 08:30-17:00 zomer, maandag gesloten.
- **2e bron:** trip.com/yunju-temple-76657, travelchinaguide.com: bevestigen tijden; bronnen verschillen over maandag-sluiting. JSON-notitie "verifieer voor bezoek" al aanwezig.
- **Status:** geen patch.

### 39. `yuyuantan-park` — ⚠ senior leeftijdsgrens
- **JSON:** Adult CNY 2 (10 tijdens sakura), senior 0.
- **2e bron:** beijing.gov.cn, travelchinaguide.com: Adult CNY 10 (sakura-seizoen, half 5), normaal CNY 2; **65+ gratis**. JSON zegt 60+ gratis (tip); feitelijk 65+. Bronnen verschillen; 60-65 is soms halfprijs.
- **Seasonal:** 2026 sakura-piek ca. 25 mrt-15 apr; onze reis eind apr mist piek.
- **Status:** patch seasonal_notes verduidelijken sakura-einde voor 2026.

### 40. `zhihua-temple` — ✅ geverifieerd
- **JSON:** CNY 20 adult, 10 senior, 08:30-16:30, maandag gesloten.
- **2e bron:** trip.com/zhihua-temple-90849, wikipedia, tour-beijing.com: bevestigen CNY 20, 08:30-16:30. Muziek-performances 10:00 en 15:00 op bepaalde dagen. JSON spreekt van UNESCO immaterieel erfgoed — bevestigd.
- **Status:** geen patch.

---

## SAMENVATTING

| # | Slug | Status |
|---|------|--------|
| 1 | terracotta-army | ✅ |
| 2 | weiyang-palace-archaeological-park | ❗ openingsuren |
| 3 | tongshengxiang-paomo | ✅ |
| 4 | xian-arts-gallery | ✅ |
| 5 | xian-big-wild-goose-fountain | ❗ showschema |
| 6 | xian-century-ginwa | ❗ openingsuren |
| 7 | xian-city-wall-night | ⚠ senior-korting |
| 8 | xian-city-wall-south-gate | ❗ booking required |
| 9 | xian-city-wall-south-gate-yongningmen | ❗ booking required |
| 10 | xian-datang-buyecheng | ✅ crowd-control bevestigd |
| 11 | xian-dongdajie | ✅ |
| 12 | xian-fahua-temple | ❓ |
| 13 | xian-gao-family-courtyard | ❗ show-schema elk uur |
| 14 | xian-luomashi | ✅ |
| 15 | xian-muslim-quarter-shopping | ⚠ uren |
| 16 | xian-muslim-quarter-teahouse-yide-li | ❓ |
| 17 | xian-qinglong-temple | ⚠ sakura-seizoen entree |
| 18 | xian-railway-station-citywall-photo | ✅ |
| 19 | xian-revolution-park-morning-taiji | ✅ |
| 20 | xian-science-technology-museum | ⚠ prijs onzeker |
| 21 | xian-shuyuanmen | ✅ |
| 22 | xian-shuyuanmen-calligraphy | ✅ (duplicaat) |
| 23 | xian-skp | ✅ |
| 24 | xian-tang-dynasty-show | ❗ show-tijden |
| 25 | xian-tang-west-market | ❗ museum-uren apart |
| 26 | xian-wenchang-pagoda | ✅ |
| 27 | xianyang-city-wall-tang-ceremony | ❗ daytime schema |
| 28 | xingqing-palace-park | ❗ seizoensgebonden uren |
| 29 | yintai-food-court-xian | ❓ |
| 30 | yongxingfang-food-street | ✅ |
| 31 | tiananmen-square | ✅ |
| 32 | tiananmen-gate-tower | ✅ |
| 33 | trb-forbidden-city | ⚠ closed_day |
| 34 | wangfujing-boulevard | ✅ |
| 35 | wangfujing-snack-street | ❗ KRITISCH — snackstraat grotendeels verdwenen |
| 36 | white-cloud-temple | ✅ |
| 37 | yandai-xiejie | ✅ |
| 38 | yunju-temple | ⚠ |
| 39 | yuyuantan-park | ⚠ senior-leeftijd |
| 40 | zhihua-temple | ✅ |

**Hoogste-prioriteit bevindingen:**
1. **`wangfujing-snack-street` is sterk ingekrompen.** De beroemde "schorpioen-op-stok" foodstraat is grotendeels verdwenen sinds ca. 2016-2019; het is vandaag meer een cultuursteeg met souvenirs dan de iconische street-food ervaring. Aanpassing tips/warnings aanbevolen.
2. **Xi'an City Wall: online reservering verplicht sinds 23 sep 2023** — voor Labor Day 2026 absoluut noodzakelijk 6 dagen vooraf boeken.
3. **Labor Day Datang Buyecheng crowd-control:** enkelrichtingsverkeer bij 50.000+ bezoekers; shows naar overdag verplaatst.
4. **Qinglong Temple:** tijdens kersenbloesem mogelijk CNY 10-16 entree; onze reis valt NET na sakura-piek dus waarschijnlijk gratis.
5. **Xingqing Palace Park:** JSON-uren 06:00-22:00 te ruim; realistisch 06:00-19:30 (apr) of 05:30-20:00 (mei).

**Nieuwe bronnen toegevoegd aan source_urls:**
- `wangfujing-snack-street`: https://www.tour-beijing.com/blog/beijing-travel/beijing-food/wangfujing-night-food-street
- `xian-city-wall-south-gate`: https://wildgreatwall.com/xian-city-wall/
- `xian-big-wild-goose-fountain`: https://www.orange-transfer.com/musical-fountain-big-wild-goose-pagoda/
- `xian-gao-family-courtyard`: https://www.trip.com/travel-guide/attraction/xi-an/gaos-thought-compound-89194/
- `weiyang-palace-archaeological-park`: https://www.trip.com/travel-guide/attraction/xi-an/archaeological-park-of-weiyang-palace-in-chang-an-city-of-the-western-han-dynasty-89236/
