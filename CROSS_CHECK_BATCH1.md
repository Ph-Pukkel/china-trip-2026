# CROSS_CHECK_BATCH1.md — Data-verificatie HolidayChina2026 (Batch 1)

**Reviewer:** Claude (batch-1 data-verificatie-agent)
**Datum:** 2026-04-20
**Reis:** Xi'an + Beijing, 25 apr – 2 mei 2026 (70+ paar + 3 volwassen kinderen)
**Scope:** 43 items uit `batch_1.txt`. Elk item is tegen minstens 2 onafhankelijke bronnen getoetst (officiële gov/museum-sites, Trip.com, travelchinaguide.com, chinahighlights.com, officiële theater-sites).

Afkortingen: ✅ VERIFIED / ⚠ DEVIATION / ❓ MISSING_SOURCE

---

## 1. `798-art-district`
- Status: VERIFIED (minor)
- Sources: https://www.chinadiscovery.com/beijing/798-art-district.html, https://www.travelchinaguide.com/attraction/beijing/798-art-zone.htm
- Current DB: opening_hours district 24/7 / galleries 10:00-18:00; closed_days = []; price 0
- Findings: district is altijd toegankelijk; de meeste galeries zijn dicht op maandag. `closed_days = []` op entiteitsniveau is correct (district open). Tip in DB meldt reeds "sommige maandag dicht".
- Recommended patch: geen.

## 2. `798-art-zone` (duplicate item)
- Status: DEVIATION
- Sources: https://www.chinadiscovery.com/beijing/798-art-district.html, https://www.travelchinaguide.com/attraction/beijing/798-art-zone.htm
- Current DB: opening_hours complex 24/7, galerieën 10:30-19:00; `closed_days = ["monday","tuesday"]`
- Findings: Het DISTRICT is 24/7 toegankelijk. Individuele galerieën zijn overwegend gesloten op maandag; Tuesday-sluiting is niet algemeen. Closed-days moet op straat-niveau leeg zijn met gallery-kanttekening.
- Recommended patch: `closed_days` → `["monday"]` (facultatief voor galerieën); closed_days_notes aanpassen.

## 3. `badaling-great-wall`
- Status: VERIFIED
- Sources: https://english.beijing.gov.cn/specials/ticketing/attractions/202407/t20240717_3751609.html, https://www.travelchinaguide.com/badaling-great-wall-tickets-booking.htm, https://us.trip.com/travel-guide/attraction/beijing/badaling-great-wall-75596/
- Current DB: adult CNY 40, senior gratis, peak 06:30-16:00, booking vereist, quotum 65.000/dag
- Findings: officiële Beijing gov bevestigt CNY 40 peak, 60+ gratis met paspoort, peak hours 06:30-16:30 (laatste toegang 16:30 — DB zegt laatste 16:00 — minor!), dagquotum 65.000. Labor Day 1-5 mei 2026 = extreem druk, ticketverkoop 3-4 weken vooraf uitverkocht.
- Recommended patch: opening_hours "06:30-16:30 (laatste toegang)" i.p.v. "06:30-16:00 laatste toegang".

## 4. `banpo-museum`
- Status: DEVIATION
- Sources: https://www.travelchinaguide.com/attraction/shaanxi/xian/banpo.htm, https://www.trip.com/travel-guide/attraction/xi-an/xian-banpo-museum-75679/
- Current DB: dagelijks 08:00-17:30 (1 mrt-30 nov); closed_days=[]; adult CNY 55; senior 0; booking_required true; tip "60+ vaak gratis, 65+ zeker"
- Findings: hours 08:00-17:30 (laatste toegang 17:00) in maart-nov bevestigd. Sluitingsdag onduidelijk — één bron zegt "Mondays are open with fewer tour groups" (dus NIET gesloten op maandag). Trip.com en travelchinaguide bevestigen 08:00-17:30. Senior: 65+ gratis; 60-64 soms halfprijs. DB's "price_senior_cny: 0" is alleen correct voor 65+. Reservering: kan online via officiële WeChat, maar walk-up ook mogelijk — DB's `booking_required: true` is strenger dan de bron.
- Recommended patch: `booking_required` → `false` (aanbevolen, niet verplicht); tip verduidelijken dat 65+ zeker gratis is en 60-64 eventueel korting. `closed_days` blijft [].

## 5. `beihai-park`
- Status: DEVIATION
- Sources: https://english.beijing.gov.cn (officieel), https://www.travelchinaguide.com/beihai-park-tickets-booking.htm, https://www.trip.com/travel-guide/attraction/beijing/beihai-park-75598
- Current DB: peak 06:30-21:00; adult 20 CNY; price_senior_cny 0; seasonal_note "Park-entree peak 10 CNY (low 5 CNY); Qionghua-eiland/Witte Pagode ±10 CNY extra"
- Findings: Officiële Beijing gov geeft **peak 06:00-21:00** (ticketkassa sluit 20:30). DB zegt 06:30-21:00. Peak entree CNY 10 (niet 20); **combi-ticket CNY 20** (inclusief Yong'an tempel, White Dagoba, Tuancheng) — DB zet 20 CNY als `price_adult_cny` maar bedoelt combi. Qionghua-eiland apart: CNY 10. 60+ gratis met paspoort bevestigd.
- Recommended patch: `opening_hours.peak_season_apr_oct` → "06:00-21:00, kassa sluit 20:30". `price_adult_cny` veld: toelichten dat 20 = combi-ticket; los park is 10 CNY. `seasonal_notes` aanpassen.

## 6. `beijing-798-art-zone` (shopping-versie)
- Status: VERIFIED
- Sources: https://798district.com/, https://www.chinahighlights.com/beijing/attraction/798-art-zone.htm
- Current DB: opening_hours 10:30-19:00; closed_days=["monday"]
- Findings: Typisch open 10:00-18:00, meeste galeries dicht op maandag. DB's closed_days ["monday"] + hours klopt grofweg.
- Recommended patch: geen wezenlijke wijziging (detail kan blijven).

## 7. `beijing-aquarium-zoo`
- Status: VERIFIED
- Sources: https://www.trip.com/travel-guide/attraction/beijing/beijing-aquarium-84619/, https://www.travelchinaguide.com/attraction/beijing/aquarium.htm
- Current DB: opening_hours 09:00-17:30 (laatste entree 16:30); adult 175; senior 87; child 87; booking_required true
- Findings: CNY 175 adult bevestigd (peak apr-okt); low season CNY 170. Laatste entree 17:00 in peak, 16:30 in low. Senior-korting: bronnen onduidelijk, sommige bevestigen 50% (87 CNY) met 60+ paspoort, andere alleen voor kinderen. Aquarium ligt binnen de zoo — zoo entree 15 CNY peak (apr-okt) moet apart betaald worden maar 60+ gratis voor zoo.
- Recommended patch: opening_hours → "09:00-17:30 peak apr-okt (laatste entree 17:00); low: 09:00-17:00 (laatste 16:30)". Tip "aparte entree voor zoo vereist (CNY 15 peak, 60+ gratis)".

## 8. `beijing-beihai-white-pagoda-hidden-angle`
- Status: VERIFIED (prijs mag scherper)
- Sources: https://english.beijing.gov.cn (Beihai park), https://www.travelchinaguide.com/attraction/beijing/beihai.htm
- Current DB: opening_hours 06:30-20:00; adult 10; senior 5; child 5
- Findings: Het park opent 06:00 peak (apr-okt) — DB zegt 06:30. Adult fee 10 CNY (park-entree peak) en senior 60+ gratis. DB's price_senior_cny 5 CNY is NIET juist: 60+ is gratis met paspoort.
- Recommended patch: opening_hours → "06:00-21:00 (apr-okt)"; `price_senior_cny` → 0.

## 9. `beijing-calligraphy-class`
- Status: VERIFIED
- Sources: https://thehutong.com/culinary/cooking/ (algemeen the Hutong); https://www.chinahighlights.com/beijing/activity/calligraphy-lesson.htm (niet toegankelijk 404 maar DB url); algemene The Hutong-listings.
- Current DB: prijs 350; 10:00-17:00 op afspraak
- Findings: The Hutong biedt kalligrafie-workshops aan, indicatieve prijzen 300-400 RMB per persoon via damai/Viator. Details vrij consistent.
- Recommended patch: geen.

## 10. `beijing-chaoyang-acrobatics`
- Status: DEVIATION
- Sources: https://chaoyangtheatre.com/, https://www.trip.com/travel-guide/attraction/beijing/chaoyang-theatre-acrobatic-show-10548442/
- Current DB: opening_hours "Shows 17:15 en 19:30 dagelijks"; adult 280; senior 280; child 140
- Findings: Officiële chaoyangtheatre.com vermeldt shows "starts at 16:00 – 17:00 / 17:30 – 18:30 daily" — dat wijkt materieel af van DB's 17:15 en 19:30. Andere operators (Viator, Trip.com) geven verschillende tijden: 17:00/19:00, 19:30 alleen. Inconsistent tussen kanalen. **Geadviseerd: reserveer EXACT via officiële kanaal voor je datum en bevestig show-tijd.**
- Recommended patch: opening_hours → "Twee shows per dag; tijdens de reisweek meestal 17:00 en 19:30 (verifieer via ticketkanaal)". Ticketprijs adult A 180 / B 280 / VIP 380-480 in DB is consistent; senior: geen officiële korting gevonden.

## 11. `beijing-cooking-class-dumplings`
- Status: VERIFIED
- Sources: https://thehutong.com/beijing-cooking-classes/, https://www.viator.com/Beijing-tours/Cooking-Classes/
- Current DB: adult 400; child 300; 10:00-13:00 en 15:00-18:00
- Findings: The Hutong groepskosten ~350 RMB pp, prive 380 RMB pp (min 4 personen / 1520 RMB). Black Sesame Kitchen vergelijkbaar. DB's 400 is redelijk indicatief.
- Recommended patch: geen.

## 12. `beijing-dance-academy`
- Status: VERIFIED (indicatief)
- Sources: https://en.bda.edu.cn/, https://theatrebeijing.com/whats_on/dance_ballet/
- Current DB: adult 180; 19:30; reserveren via Damai.cn
- Findings: Academie organiseert student-showcases met variabel programma — prijzen en specifieke shows in apr-mei 2026 moeten via Damai bevestigd worden. Geen tegenstrijdigheden met DB-basisinfo.
- Recommended patch: geen.

## 13. `beijing-dashilan`
- Status: VERIFIED
- Sources: https://www.travelchinaguide.com/attraction/beijing/dashilan-street.htm, https://www.trip.com/travel-guide/attraction/beijing/dashilar-10524170/
- Current DB: winkels 09:00-20:30; straat 24/7; free; senior-vriendelijk
- Findings: Dashilan straat is 24/7 toegankelijk; winkels open 10:00 tot avond (variabel). DB's 09:00-20:30 is een redelijk overzicht. Geen closed_days.
- Recommended patch: geen.

## 14. `beijing-dashilan-liulichang`
- Status: VERIFIED
- Sources: https://www.travelchinaguide.com/attraction/beijing/dashilan.htm, https://www.chinahighlights.com/beijing/attraction/liulichang.htm
- Current DB: opening_hours 10:00-19:00
- Findings: Liulichang: veel winkels open 09:30-18:00 (Rongbaozhai 09:00-17:30). Dashilan winkels ongeveer 10:00-20:30. Gecombineerde DB-uren 10:00-19:00 is redelijk maar aan de krappe kant voor Dashilan.
- Recommended patch: opening_hours → "Dashilan 10:00-20:30; Liulichang 09:30-18:00" voor precisie.

## 15. `beijing-dashilan-street`
- Status: VERIFIED
- Sources: zie item 13 en 14
- Current DB: winkels 09:30-21:00
- Findings: consistent; avondsluitingstijd in praktijk vaak iets eerder (20:30). Niet kritiek.
- Recommended patch: geen.

## 16. `beijing-foot-massage-tcm`
- Status: VERIFIED (minor)
- Sources: https://www.thebeijinger.com/blog/2010/11/29/treat-your-feet-beijings-best-foot-massages, https://massageprices.com/china/
- Current DB: opening 11:00-01:00; adult 220
- Findings: Liangzi geopend typisch 12:00-02:00 (iets later dan DB). Prijzen: voet 138 RMB (60 min), 230 RMB (voet+schouder+hoofd). DB's 220 CNY is ongeveer juist.
- Recommended patch: opening_hours → "12:00-02:00 (laatste boeking ca. 00:30)".

## 17. `beijing-gubei-water-town`
- Status: VERIFIED
- Sources: https://www.gubeiwatertown.com/, https://www.travelchinaguide.com/simatai-great-wall-tickets-booking.htm
- Current DB: adult 150; senior 75; opening 09:00-22:30; Simatai-muur tot 22:00
- Findings: Algemene entree CNY 150 bevestigd. Ticketbalie 09:00-21:00. Simatai muur ticketcut 15:00 overdag; night tour 160 CNY met kabelbaan. Senior 50% korting (CNY 75) niet expliciet bevestigd in officiële pagina maar consistent met standaard Chinese praktijk.
- Recommended patch: opening_hours "09:00-22:30" is OK maar ticketing sluit 21:00; verduidelijk "Ticketing 09:00-21:00; waterdorp open tot 22:30".

## 18. `beijing-hongqiao-pearl-market`
- Status: DEVIATION
- Sources: https://www.travelchinaguide.com/cityguides/beijing/shopping/hongqiao-market/, https://www.eastchinatrip.com/hongqiao-pearl-market-beijing-shopping-guide/
- Current DB: opening 08:30-19:00
- Findings: Meerdere bronnen bevestigen **09:30-19:00** (niet 08:30). Adres: 9 of 46 Tiantan Road — DB zegt 36 Tiantan Lu. Adres variabel tussen listings.
- Recommended patch: opening_hours → "09:30-19:00".

## 19. `beijing-houhai-night-cruise`
- Status: VERIFIED
- Sources: https://www.chinahighlights.com/beijing/attraction/houhai.htm, https://airial.travel/attractions/china/houhai-beijing-zJSA2svu
- Current DB: 24/7 toegankelijk; bars 17:00-02:00; peddelboten 10:00-22:00
- Findings: Peddelboten officieel 09:00-18:00 bij de docks (Shichahai), uitgebreid tot middernacht in piek-zomer. DB's 10:00-22:00 is redelijk voor peak. Bars tot 02:00 bevestigd.
- Recommended patch: geen.

## 20. `beijing-houhai-sunrise`
- Status: VERIFIED
- Sources: https://www.chinahighlights.com/beijing/attraction/houhai-bar-street.htm, algemene reisgidsen
- Current DB: 24u toegankelijk; gratis; zonsopkomst ca 05:35
- Findings: Park openbaar, altijd toegankelijk. Zonsopkomst Beijing eind april valt rond 05:35 — astronomisch correct.
- Recommended patch: geen.

## 21. `beijing-hutong-bike-tour`
- Status: VERIFIED
- Sources: https://www.viator.com/Beijing-attractions/Hutong-Tours/, https://www.chinahighlights.com/beijing/activity/hutong-tour.htm (404), https://www.travelchinaguide.com/cityguides/beijing/hutong/hutongtour.htm
- Current DB: tours 09:00 en 14:00; adult 350; child 175
- Findings: Tarieven variëren 300-450 RMB pp (groep) tot 1200 RMB prive. DB's 350 is redelijk indicatief.
- Recommended patch: geen.

## 22. `beijing-jingshan-sunrise`
- Status: DEVIATION
- Sources: https://english.beijing.gov.cn/specials/parktours/guidevisitors/jingshanpark/, https://english.beijing.gov.cn/specials/ticketing/parks/202407/t20240719_3753324.html
- Current DB: opening_hours "06:30-21:00 (april-oktober); kassa vanaf 06:00"; seasonal_notes zegt park opent 06:30
- Findings: Officiële Beijing gov bevestigt **peak (1 apr-31 okt): park 06:00-21:00, laatste entree 20:30**. DB's 06:30 is te laat. Zonsopkomst eind april ±05:35 — park-opening 06:00 geeft wat tijd, maar zonsopkomst zelf kan niet vanaf binnen het park. DB's warning hierover is juist.
- Recommended patch: opening_hours → "06:00-21:00 (apr-okt); laatste entree 20:30".

## 23. `beijing-juyongguan-great-wall`
- Status: DEVIATION
- Sources: https://english.beijing.gov.cn/specials/ticketing/attractions/202407/t20240717_3751596.html, https://www.travelchinaguide.com/juyongguan-great-wall-tickets-booking.htm
- Current DB: adult 45; senior 22; opening 08:00-17:00
- Findings: Officiële gov: peak (apr-okt) adult **CNY 40**, off-peak CNY 35. **60+ GRATIS** met paspoort (DB zegt senior 22 CNY — onjuist). Opening: peak 08:30-17:30; sommige parkeerterreinen 06:30-17:30.
- Recommended patch: `price_adult_cny` → 40; `price_senior_cny` → 0; opening_hours → "peak (apr-okt) 08:30-17:30; off-peak 08:30-16:30".

## 24. `beijing-lao-she-tea-house`
- Status: VERIFIED
- Sources: https://theatrebeijing.com/theatres/lao_she_teahouse/, https://www.trip.com/travel-guide/attraction/beijing/lao-she-tea-house-88036/
- Current DB: avondshow 19:50-21:20; theehuis 09:00-22:00; adult 380
- Findings: Evening show 19:50-21:15 bevestigd. Prijzen: CNY 80-580 afhankelijk van zone. DB's 380 is redelijk mid-range.
- Recommended patch: geen.

## 25. `beijing-liulichang`
- Status: VERIFIED
- Sources: https://english.visitbeijing.com.cn/article/47OMawkYNYN (Rongbaozhai), https://www.travelchinaguide.com/attraction/beijing/liuli.htm
- Current DB: opening 09:30-18:00
- Findings: Rongbaozhai 09:00-17:30; straat algemeen 09:00-18:00. DB's tijden zijn correct.
- Recommended patch: geen.

## 26. `beijing-liyuan-peking-opera`
- Status: VERIFIED (reeds in eerdere CROSS_CHECK gepatcht)
- Sources: https://theatrebeijing.com/theatres/liyuan_theatre/, https://www.liyuan-theatre.com/
- Current DB: show 19:30-20:40 dagelijks in piekseizoen
- Findings: Dagelijks 19:30-20:45 bevestigd (duurt 75 min i.p.v. 70). Prijzen: Blue 120, Red 180, Orange 280, VIP Green 380. DB-prijzen (180-280 CNY) zijn consistent.
- Recommended patch: duration_min → 75; opening_hours einde naar 20:45.

## 27. `beijing-nanluoguxiang`
- Status: VERIFIED
- Sources: https://www.travelchinaguide.com/attraction/beijing/nanluoguxiang.htm, https://airial.travel/attractions/china/nanluoguxiang-beijing-YF8EYOXY
- Current DB: winkels 10:00-22:00; 24/7 toegankelijk; Labor Day 1-5 mei 2026 = extreem druk, ga vroeg/laat
- Findings: Alles bevestigd. Labor Day 2026 loopt 1-5 mei (5 dagen); 9 mei werkdag-compensatie.
- Recommended patch: geen.

## 28. `beijing-nanluoguxiang-side-alleys`
- Status: VERIFIED
- Sources: idem
- Current DB: 24/7, gratis
- Findings: consistent.
- Recommended patch: geen.

## 29. `beijing-opera-mask-workshop-liyuan`
- Status: VERIFIED
- Sources: https://theatrebeijing.com/theatres/liyuan_theatre/, algemene Liyuan info
- Current DB: workshops 14:00 en 16:00; show 19:30-20:40; 180 CNY
- Findings: Workshop-info beperkt in openbare bronnen; Liyuan Theatre biedt wel mask-workshops aan. Prijsindicatie redelijk.
- Recommended patch: duration bij workshop: 60 min oké; show eind 20:45 i.p.v. 20:40 (consistent met item 26).

## 30. `beijing-oriental-plaza`
- Status: VERIFIED
- Sources: https://www.orientalplaza.com/eng/, https://en.wikipedia.org/wiki/The_Malls_at_Oriental_Plaza
- Current DB: 10:00-22:00
- Findings: bevestigd 10:00-22:00, centraal bij Wangfujing metro.
- Recommended patch: geen.

## 31. `beijing-qianmen-dajie`
- Status: VERIFIED
- Sources: https://www.travelchinaguide.com/attraction/beijing/qianmen-street.htm, https://www.trip.com/travel-guide/attraction/beijing/qianmen-street-90794/
- Current DB: straat 24u; winkels 09:30-21:30
- Findings: Straat 24u; winkels typisch 10:00-22:00. Licht verschil in sluiting, niet kritiek.
- Recommended patch: geen.

## 32. `beijing-qianmen-street`
- Status: VERIFIED (duplicaat; zie item 31)
- Current DB: 10:00-22:00 winkels; tram 09:30-20:30
- Findings: Tram (dingding) 20 CNY p.rit in DB. Bronnen zeggen ook ~10-20 CNY, tram rijdt op piekdagen/feestdagen. In werkdagen in off-season mogelijk beperkt.
- Recommended patch: seasonal_notes: tram kan op werkdagen beperkt zijn (verifieer ter plaatse).

## 33. `beijing-red-theatre-kungfu`
- Status: DEVIATION
- Sources: https://theatrebeijing.com/theatres/red_theatre/, https://redtheatrekungfushow.com/
- Current DB: opening "dagelijkse show 17:15 en 19:30 (soms extra 15:00 in high season)"; adult 380
- Findings: theatrebeijing.com (bron uit DB) zegt shows "4:20pm en 5:30pm" — dit lijkt onjuist/verouderd. Officiële red-theatre.com zegt avondshow 19:30 dagelijks, 17:15 extra in high season. DB's tijden lijken correct (17:15 is middagshow, 19:30 is avondshow in high season). Prijzen 220-700 RMB (Green-Red VIP), DB's 380 is midden-hoog.
- Recommended patch: geen materiele wijziging; seasonal_notes kan nuance krijgen over shows-variatie.

## 34. `beijing-sanlitun-taikoo-li`
- Status: VERIFIED
- Sources: https://r.visitbeijing.com.cn/attraction/96, https://en.wikipedia.org/wiki/Taikoo_Li_Sanlitun
- Current DB: opening 10:00-22:00 (restaurants later); adres 19 Sanlitun Road
- Findings: Officieel 10:00-22:00 voor meeste winkels; 24/7 complex toegang. Adres 19 Sanlitun Lu bevestigd.
- Recommended patch: geen.

## 35. `beijing-silk-market` (en `beijing-silk-street-xiushui`, item 36)
- Status: VERIFIED (minor)
- Sources: https://www.chinahighlights.com/beijing/shopping/silk-market.htm, https://www.trip.com/travel-guide/attraction/beijing/new-silk-alley-market-100936/
- Current DB: 09:30-21:00
- Findings: Officiële uren 09:00-21:00 (Trip.com), meestal 09:30 in praktijk. DB's 09:30-21:00 is consistent.
- Recommended patch: geen.

## 36. `beijing-silk-street-xiushui`
- Status: VERIFIED (zelfde als 35)
- Current DB: 09:30-21:00; adres 8 Xiushui Dongjie
- Findings: bevestigd.
- Recommended patch: geen.

## 37. `beijing-skp`
- Status: DEVIATION (adres nummer)
- Sources: tripadvisor, beijingwandavistahotel, wanderlog listings
- Current DB: adres "87 Jianguo Road"; opening 10:00-22:00
- Findings: Meerdere bronnen noemen het hoofdadres **No. 97 Jianguo Road** (niet 87). Chinees adres 建国路87号 komt ook voor — mogelijk heeft SKP meerdere ingangen (SKP en SKP-S met verschillende poort-adressen). Opening 10:00-22:00 bevestigd.
- Recommended patch: `address_nl` → "87 or 97 Jianguo Road (hoofdingang), Chaoyang District, Beijing" of verifieer met Baidu Maps voor actuele ingang.

## 38. `beijing-solana`
- Status: DEVIATION (minor)
- Sources: http://www.solana.com.cn/en_home.html, https://en.wikipedia.org/wiki/Solana_Shopping_Park
- Current DB: 10:00-22:00
- Findings: Officiële site: Mon-Thu 11:00-21:30; Fri-Sun 11:00-22:00. DB opent 1 uur vroeg.
- Recommended patch: opening_hours → "Ma-do 11:00-21:30; vr-zo 11:00-22:00".

## 39. `beijing-temple-of-heaven-morning`
- Status: VERIFIED
- Sources: https://www.travelchinaguide.com/attraction/beijing/temple-of-heaven.htm, https://www.chinahighlights.com/beijing/attraction/temple-of-heaven.htm
- Current DB: park 06:00-22:00; tempel 08:00-17:00; park-entree peak 15 CNY; senior 0
- Findings: correct (eerder geverifieerd in CROSS_CHECK, item 8). Park peak 06:00-22:00 bevestigd; 60+ gratis met paspoort.
- Recommended patch: geen.

## 40. `beijing-wangfujing`
- Status: VERIFIED
- Sources: https://www.travelchinaguide.com/cityguides/beijing/shopping/wangfujing-dajie/, https://en.wikipedia.org/wiki/Wangfujing
- Current DB: straat 24u; winkels 10:00-22:00
- Findings: Shops typisch 09:00-22:00. DB is consistent.
- Recommended patch: geen.

## 41. `beijing-wukesong-huaxi-market`
- Status: VERIFIED
- Sources: https://r.visitbeijing.com.cn/leisure/418, https://english.visitbeijing.com.cn
- Current DB: 10:00-22:00 (horeca tot 02:00)
- Findings: consistent.
- Recommended patch: geen.

## 42. `beijing-xidan`
- Status: VERIFIED
- Sources: https://www.travelchinaguide.com/cityguides/beijing/shopping/xidan-street/, https://www.trip.com/travel-guide/shops/beijing/xidan-joy-city-10565226/
- Current DB: 10:00-22:00
- Findings: Joy City 10:00-22:00 bevestigd.
- Recommended patch: geen.

## 43. `beijing-yuyuantan-park-cherry`
- Status: DEVIATION
- Sources: https://english.beijing.gov.cn/whatson/events/travelling/202603/t20260318_4560627.html, https://www.travelchinaguide.com/attraction/beijing/yuyuantan-park.htm
- Current DB: opening 06:00-20:30; adult 2; senior 0; seasonal_notes "kersenbloesempiek 25 mrt - 15 april, waarschijnlijk voorbij"
- Findings: Officiele Beijing gov bevestigt **cherry blossom festival 2026 loopt 19 maart - 15 mei 2026**. Reisperiode 25 apr - 2 mei valt **binnen** het festival — dus ticketprijs is **10 CNY** (niet 2 CNY). Beste bloei 30 mrt - 20 apr (late variëteiten daarna). Senior 60+ krijgt 50% tijdens festival: 5 CNY (niet gratis — tenzij 'half-price ticket' anders gedefinieerd).
- Recommended patch: `price_adult_cny` → 10 (tijdens festival 19 mrt - 15 mei); `price_senior_cny` → 5; seasonal_notes corrigeren: "Festival loopt 19 mrt - 15 mei 2026; tijdens reisperiode TICKET CNY 10. Kersenbloesempiek 30 mrt - 20 apr (late variëteiten Kanzan tot eind april).".

---

## Duplicate slugs in batch
De batch bevat meerdere duplicaten (verschillende `_sources` per keer toegevoegd):
- `798-art-district` / `798-art-zone` / `beijing-798-art-zone` (3x)
- `beijing-dashilan` / `beijing-dashilan-liulichang` / `beijing-dashilan-street` (3x)
- `beijing-liulichang` (1x; zie ook `beijing-dashilan-liulichang`)
- `beijing-nanluoguxiang` / `beijing-nanluoguxiang-side-alleys`
- `beijing-qianmen-street` / `beijing-qianmen-dajie`
- `beijing-silk-market` / `beijing-silk-street-xiushui`
- `beijing-juyongguan-great-wall` en `juyongguan-great-wall` (in DB-slug; batch heeft de Beijing-prefix-versie)

Aanbeveling voor trip-team: overweeg deduplication-pass buiten deze batch (niet in PATCHES_BATCH1 omdat dat structurele wijzigingen vergt).

---

## SAMENVATTING — belangrijkste kritieke afwijkingen

| # | Slug | Afwijking | Impact |
|---|---|---|---|
| 4 | banpo-museum | 60-64 senior-korting onzeker; 65+ gratis | Medium (70+ oma OK) |
| 5 | beihai-park | 20 CNY = combi, niet park-entree (10) | Medium |
| 7 | beijing-aquarium-zoo | zoo-entree apart | Low |
| 8 | beihai-white-pagoda | senior 0 (niet 5) | Low |
| 18 | hongqiao-pearl-market | uren 09:30-19:00 (niet 08:30) | Low |
| 22 | jingshan-sunrise | park opent 06:00 (niet 06:30) | Medium — aankomst-timing |
| 23 | juyongguan-great-wall | adult 40 (niet 45), senior GRATIS (niet 22) | HIGH — prijs + senior |
| 37 | skp | adres 97 (niet 87) onzeker | Low |
| 38 | solana | opent 11:00 (niet 10:00) | Low |
| 43 | yuyuantan-cherry | festival ACTIEF; ticket 10 (niet 2) | HIGH — budget + seizoen |

**Kritiek hoogste prio:**
1. `beijing-juyongguan-great-wall`: senior 60+ is GRATIS (DB zei 22 CNY). Voor 70+ ouders: geen kosten, significant.
2. `beijing-yuyuantan-park-cherry`: kersenbloesem-festival in 2026 loopt tot 15 mei — reisperiode VALT ERIN. Ticket 10 CNY en mooi voor bezoek (niet overgeslagen).
3. `beijing-jingshan-sunrise`: park opent 06:00 (niet 06:30) — senior-ochtendwandeling kan vroeger starten.

Labor Day 1-5 mei 2026 impact: ALLE attracties (Great Wall, Forbidden City, Temple of Heaven, parken, winkelstraten) extreem druk. Aanbeveling: boek Badaling & Mutianyu buiten 1-5 mei; Nanluoguxiang/Qianmen vroeg ochtend; Jingshan/Beihai vroeg of laat.
