# UX Copy — Reisgenoot China 2026

> Final microcopy voor de companion-webapp. Tone: warme nicht/neef die Oma & Opa op reis begeleidt. Nederlands primair, Spaans parallel. Korte zinnen, actieve stem, "je/jullie" informeel. Waarschuwingen zijn informatief, nooit angstaanjagend ("goed om te weten" in plaats van "pas op!").
>
> Leesniveau: Nederlands B1. Alle strings getest tegen `UI_STRING_LENGTH_MAX = 40 tekens` voor knoplabels, `90 tekens` voor koppen.

---

## 1. App naam + tagline

| Taal | Naam | Tagline |
|---|---|---|
| NL | **Reisgenoot China** | *Altijd even een tikje weg van het antwoord.* |
| ES | **Compañero China** | *Tu mano amiga en cada paso del viaje.* |

**Alternatieve taglines (reserve):**
- NL: "Samen op reis, samen op schema."
- ES: "Juntos de viaje, juntos al día."

---

## 2. Navigatielabels (5 tabs)

| Icoon | NL | ES | ZH (中文) | Korte omschrijving |
|---|---|---|---|---|
| 🏠 | Thuis | Inicio | 首页 | Welkomstscherm + vandaag |
| 📅 | Vandaag | Hoy | 今天 | Dagplanning |
| 🧭 | Verken | Explorar | 探索 | Bibliotheek van plekken |
| 🗺️ | Kaart | Mapa | 地图 | Interactieve kaart |
| 💡 | Hulp | Ayuda | 帮助 | Zinnen, taxi, scams, noodgeval |

**Schermlezer-labels (ARIA):** "Tab: Thuis, 1 van 5, actief" / "Tab: Vandaag, 2 van 5".

---

## 3. Home screen copy

### 3.1 Begroeting (rouleert per dagdeel)

| Dagdeel | NL | ES |
|---|---|---|
| Ochtend (05:00–11:59) | Goedemorgen 👋 | Buenos días 👋 |
| Middag (12:00–17:59) | Goedemiddag 👋 | Buenas tardes 👋 |
| Avond (18:00–22:59) | Goedenavond 👋 | Buenas noches 👋 |
| Nacht (23:00–04:59) | Slaap lekker 🌙 | Buenas noches 🌙 |

### 3.2 Dag-teller (boven de groet)

- Vóór vertrek: **"Nog {n} nachtjes slapen."** / ES: *"Faltan {n} noches."*
- Op reisdag 1: **"Dag 1 van 8 — de reis begint!"** / ES: *"Día 1 de 8: ¡empieza el viaje!"*
- Onderweg: **"Dag {x} van 8 · nog {y} dagen in {stad}."** / ES: *"Día {x} de 8 · quedan {y} días en {ciudad}."*
- Laatste dag: **"Dag 8 — laatste dag. Geniet nog even!"** / ES: *"Día 8: último día. ¡Disfrutad hasta el final!"*

### 3.3 Vandaag-kaart (primaire CTA)

- **Kop:** "Vandaag staat gepland:" / ES: "Hoy tenéis previsto:"
- **Subtekst (als er iets staat):** "{item}, om {tijd}. Ongeveer {duur} minuten." / ES: "{item}, a las {hora}. Unos {duración} minutos."
- **Primaire CTA:** **Start je rondleiding** → `Begin` / ES: **Empezar la ruta**
- **Secundair:** "Bekijk hele dag" / ES: "Ver el día completo"

### 3.4 Snelkoppelingen (drie rode knoppen)

| NL | ES |
|---|---|
| Taxi-kaart | Tarjeta de taxi |
| Chinese zinnen | Frases en chino |
| Noodgeval | Emergencia |

### 3.5 "Loop de vakantie eens door" knop (voorpret)

- NL: **Loop de vakantie alvast door** → "Elke dag kort: wat gaan we zien?"
- ES: **Echad un vistazo al viaje** → "Cada día en breve: ¿qué vamos a ver?"

---

## 4. Empty states

### 4.1 Nog geen favorieten

**NL**
> **Nog geen favorieten opgeslagen.**
> Zie je iets leuks in Verken? Tik op het hartje ❤️ en het komt hier te staan. Zo heb je al je lievelings­plekken op één plek.
> **CTA:** Open Verken

**ES**
> **Aún no hay favoritos.**
> ¿Habéis visto algo interesante en Explorar? Tocad el corazón ❤️ y aparecerá aquí. Así tenéis vuestros sitios preferidos en un solo lugar.
> **CTA:** Ir a Explorar

### 4.2 Nog geen plan voor vandaag

**NL**
> **Vandaag is nog vrij.**
> Geen zorgen — dat mag ook. Wil je iets toevoegen? Kies uit Verken of maak zelf een plan.
> **CTA's:** Kies uit Verken · Zelf toevoegen

**ES**
> **Hoy aún está libre.**
> Tranquilos, no pasa nada. ¿Queréis añadir algo? Elegid en Explorar o añadid vosotros mismos.
> **CTA's:** Elegir en Explorar · Añadir manualmente

### 4.3 Geen resultaten bij filter

**NL**
> **Niks gevonden met deze filters.**
> Probeer één filter minder, of bekijk alles.
> **CTA:** Wis filters

**ES**
> **No hay resultados con estos filtros.**
> Probad con un filtro menos, o ved todo.
> **CTA:** Quitar filtros

### 4.4 Geen internet (offline)

**NL**
> **Even geen internet.**
> Dat is oké — je planning, de kaart en de Chinese zinnen werken gewoon door. Wijzigingen worden opgeslagen en gesynct zodra je weer online bent.
> **CTA:** Opnieuw proberen

**ES**
> **Sin conexión por ahora.**
> No pasa nada: la agenda, el mapa y las frases en chino siguen funcionando. Los cambios se guardarán y se sincronizarán cuando vuelva la conexión.
> **CTA:** Reintentar

### 4.5 Geen dagboek-notities

**NL**
> **Nog geen dagboek-notitie vandaag.**
> Eén zin of één foto is genoeg — later lees je het met plezier terug.
> **CTA:** Schrijf iets op

**ES**
> **Aún no hay nota del día.**
> Con una frase o una foto ya vale: más adelante lo releeréis con cariño.
> **CTA:** Escribir algo

---

## 5. Error messages

_Format: wat gebeurde er · waarom · wat nu._

### 5.1 Sync mislukt

**NL**
> **Synchronisatie lukte niet.**
> Je wijzigingen staan veilig op deze telefoon. Zodra er weer internet is, zetten we ze over naar de anderen.
> **CTA:** Nu opnieuw proberen

**ES**
> **La sincronización falló.**
> Vuestros cambios están a salvo en este móvil. En cuanto haya conexión, los enviaremos al resto del grupo.
> **CTA:** Reintentar ahora

### 5.2 Foto niet opgeslagen

**NL**
> **Foto niet opgeslagen.**
> Misschien is de opslag vol of was de verbinding even weg. Probeer het opnieuw — de foto staat nog in je galerij.
> **CTA:** Nog een keer proberen

**ES**
> **Foto no guardada.**
> Puede que falte espacio o que se cortara la conexión. Probad otra vez: la foto sigue en vuestra galería.
> **CTA:** Reintentar

### 5.3 Kaart niet beschikbaar

**NL**
> **De kaart laadt niet.**
> Waarschijnlijk is er te weinig internet. Je eerder opgeslagen kaarten werken wel gewoon offline.
> **CTA:** Toon offline-kaart

**ES**
> **El mapa no carga.**
> Probablemente la conexión es débil. Los mapas que ya habíais guardado siguen funcionando sin internet.
> **CTA:** Ver mapa sin conexión

### 5.4 Audio niet beschikbaar

**NL**
> **Uitspraak werkt nu even niet.**
> Je telefoon kan Chinees niet afspelen of het geluid staat uit. Je kunt de pinyin wel lezen en tonen aan de chauffeur.
> **CTA:** Toon pinyin groot

**ES**
> **La voz no funciona ahora.**
> Vuestro móvil no reproduce el chino o el sonido está apagado. Podéis leer el pinyin o enseñarlo al conductor.
> **CTA:** Ver pinyin en grande

---

## 6. Confirmation dialogs

_Regel: knoppen beschrijven de actie, nooit "OK/Annuleren". Destructieve actie rechts, rood. Veilige keuze links, neutraal._

### 6.1 Item verwijderen

**NL**
> **"{naam}" uit je planning halen?**
> Dit verwijdert het alleen bij jullie — niet uit Verken. Je kunt het later altijd weer toevoegen.
> **Knoppen:** `Laat staan` · **`Verwijderen`**

**ES**
> **¿Quitar "{nombre}" de la agenda?**
> Solo se quita de vuestro plan, no de Explorar. Siempre podéis añadirlo de nuevo.
> **Botones:** `Dejar` · **`Quitar`**

### 6.2 Dag leegmaken

**NL**
> **Alles van {datum} wissen?**
> Dat is {n} activiteiten. Deze stap kun je niet terugdraaien.
> **Knoppen:** `Laat staan` · **`Dag leegmaken`**

**ES**
> **¿Vaciar todo el {fecha}?**
> Son {n} actividades. Esta acción no se puede deshacer.
> **Botones:** `Dejar` · **`Vaciar día`**

### 6.3 Uitloggen

**NL**
> **Uitloggen van reisgroep "{code}"?**
> Je planning, favorieten en dagboek blijven bewaard. Je kunt opnieuw inloggen met dezelfde code.
> **Knoppen:** `Ingelogd blijven` · **`Uitloggen`**

**ES**
> **¿Salir del grupo de viaje "{código}"?**
> La agenda, los favoritos y el diario se conservan. Podéis volver a entrar con el mismo código.
> **Botones:** `Seguir dentro` · **`Salir`**

---

## 7. Success toasts

_Kort, zichtbaar ~3 sec, met één icoon._

| Event | NL | ES |
|---|---|---|
| Toegevoegd aan vandaag | ✅ Toegevoegd aan vandaag | ✅ Añadido a hoy |
| Toegevoegd aan {dag} | ✅ Toegevoegd aan {dag} | ✅ Añadido al {día} |
| Opgeslagen in favorieten | ❤️ In favorieten | ❤️ Guardado en favoritos |
| Verwijderd uit favorieten | Favoriet verwijderd | Favorito quitado |
| Gekopieerd naar klembord | 📋 Gekopieerd | 📋 Copiado |
| Chinees adres gekopieerd | 📋 Adres gekopieerd — laat zien aan de chauffeur | 📋 Dirección copiada — enséñasela al taxista |
| Dagboek opgeslagen | 📓 Notitie bewaard | 📓 Nota guardada |
| Foto bewaard | 📷 Foto bewaard | 📷 Foto guardada |
| Sync klaar | Alles up-to-date | Todo al día |

---

## 8. Filter chip labels

_Vaste volgorde: Stad → Categorie → Bijzonder. Chips zijn toggle-baar, meerdere tegelijk actief._

### 8.1 Stad
| NL | ES |
|---|---|
| Xi'an | Xi'an |
| Beijing | Pekín |

### 8.2 Categorie
| Icoon | NL | ES |
|---|---|---|
| 🏛️ | Musea | Museos |
| ⛩️ | Tempels | Templos |
| 🏯 | Monumenten | Monumentos |
| 🍜 | Restaurants | Restaurantes |
| 🛍️ | Shoppen | Compras |
| 🌳 | Parken & tuinen | Parques y jardines |
| 🎭 | Avond & show | Noche y espectáculos |
| 💎 | Verborgen pareltjes | Joyas escondidas |
| 📸 | Fotoplekken | Sitios para fotos |
| 🎪 | Markten | Mercados |
| 🎨 | Kunst & cultuur | Arte y cultura |
| 🏞️ | Uitzichten | Miradores |
| 🧧 | Lokale ervaring | Experiencia local |

### 8.3 Bijzonder
| NL | ES |
|---|---|
| UNESCO | UNESCO |
| Senior-vriendelijk | Apto para mayores |
| Weinig lopen | Poco caminar |
| Gratis | Gratis |
| Kindvriendelijk | Apto para niños |
| Regenbestendig | A prueba de lluvia |
| Online ticket nodig | Entrada online obligatoria |
| Vroeg op z'n mooist | Mejor temprano |
| Avond op z'n mooist | Mejor al anochecer |

**Chip-knop reset:** `Wis alle filters` / ES: `Quitar todos`

---

## 9. Anti-scam tips — definitieve site-copy

_Geplaatst onder 💡 Hulp → **"Goed om te weten bij het winkelen"** (NOT "Pas op!"). Toon: neutraal-warm. Iedere tip eindigt met wat je kunt doen, niet met angst._

### 9.1 NL — Goed om te weten bij het winkelen

**Afdingen mag — en is normaal**
Op markten (Muslim Quarter, Silk Market, Hongqiao, Panjiayuan) hoort onderhandelen erbij. Vuistregel: begin rond 30% van de vraagprijs, eindig rond 40–50%. Een glimlach helpt meer dan een streng gezicht.

**Vaste prijzen in grote winkels**
In malls, luxe-winkels en traditionele "laozihao"-winkels (Ruifuxiang, Neiliansheng, Tongrentang, Daoxiangcun) staat de prijs vast. Daar niet afdingen — dat is juist raar.

**Betalen: controleer één ding**
Voordat je met Alipay of WeChat Pay bevestigt, kijk even of het bedrag klopt. Één nulletje extra komt bijna nooit voor, maar even checken kost een seconde.

**Cash blijft handig**
Houd altijd wat kleine biljetten van 10, 20 en 50 RMB bij je. Tel wisselgeld rustig na — verkopers vinden het juist netjes dat je oplet.

**"Nee, dank u" met een glimlach**
In de Silk Market en Hongqiao komen verkopers graag op je af. Zeg vriendelijk "bù yào, xièxie" (nee dank u) of "zhǐ shì kàn kan" (ik kijk alleen). Ze laten je dan door. Probeer het gerust hardop — de knop 🔊 onder "Chinese zinnen" laat je horen hoe het klinkt.

**Gratis proeverijen**
Bij nootjes- of snoepstalletjes staat "gratis proeven" vaak voor "koop je wel iets?". Voel je niet verplicht. Vraag anders vooraf de prijs per 500 gram (jin).

**"Antiek" is meestal decoratie**
Op Panjiayuan of Liulichang zien stukken er oud uit, maar écht antiek (ouder dan 1911) is zeldzaam en vraagt export­papieren met rood zegel. Geniet ervan als decoratie — niet als investering.

**Namaak-merken: alleen voor de foto**
Namaak van LV, Gucci of Rolex invoeren in de EU mag niet — de douane mag ze bij thuiskomst afnemen. Een grapfoto: prima. Koffer in: beter niet.

**Zijde en parels — zo herken je echt**
In "laozihao"-winkels krijg je een certificaat, dat is zeker. Op de markt: echte parels voelen koel aan en lichtjes ruw als je ze tegen elkaar wrijft; nep is glad. Zijde ruikt bij verbranden naar haar, synthetisch ruikt chemisch.

**Pinnen? Vraag eerst even**
Niet alle kleine winkels nemen buitenlandse creditkaarten aan. Vraag "kěyǐ shuā kǎ ma?" (kan ik pinnen?) of betaal met Alipay, WeChat Pay of cash.

### 9.2 ES — Bueno saber al ir de compras

**Regatear está bien — y es normal**
En los mercados (Muslim Quarter, Silk Market, Hongqiao, Panjiayuan) negociar forma parte del juego. Regla práctica: empezad alrededor del 30% del precio pedido y cerrad sobre el 40–50%. Una sonrisa ayuda más que una cara seria.

**Precios fijos en tiendas grandes**
En centros comerciales, tiendas de lujo y las tradicionales "laozihao" (Ruifuxiang, Neiliansheng, Tongrentang, Daoxiangcun) el precio es fijo. Ahí no se regatea: queda raro.

**Al pagar: una sola comprobación**
Antes de confirmar con Alipay o WeChat Pay, echad un vistazo al importe. Un cero de más casi nunca pasa, pero revisar cuesta un segundo.

**El efectivo sigue siendo útil**
Llevad siempre billetes pequeños de 10, 20 y 50 RMB. Contad el cambio con calma: a los vendedores les parece correcto que prestéis atención.

**"No, gracias" con una sonrisa**
En el Silk Market y Hongqiao los vendedores se acercan con ganas. Decid amablemente "bù yào, xièxie" (no, gracias) o "zhǐ shì kàn kan" (solo miro). Os dejarán pasar. Escuchad la pronunciación con el botón 🔊 en "Frases en chino".

**Las degustaciones gratis**
En los puestos de frutos secos o dulces, "prueba gratis" suele significar "¿compráis algo?". No os sintáis obligados. Si os interesa, preguntad antes el precio por 500 g (jin).

**"Antigüedades" suelen ser decoración**
En Panjiayuan o Liulichang las piezas parecen viejas, pero lo verdaderamente antiguo (anterior a 1911) es raro y requiere papeles de exportación con sello rojo. Disfrutad como decoración, no como inversión.

**Imitaciones de marca: solo para la foto**
Importar imitaciones de LV, Gucci o Rolex en la UE está prohibido; la aduana puede quitarlas al volver. Foto de broma, sí. En la maleta, mejor no.

**Seda y perlas — cómo reconocer lo auténtico**
En las tiendas "laozihao" os dan certificado: ahí vais seguros. En el mercado: las perlas auténticas están frescas y se notan algo ásperas al frotarlas entre sí; las falsas, lisas. La seda al quemarse huele a pelo; lo sintético huele a químico.

**¿Tarjeta? Preguntad primero**
No todas las tiendas pequeñas aceptan tarjetas extranjeras. Preguntad "kěyǐ shuā kǎ ma?" (¿puedo pagar con tarjeta?) o usad Alipay, WeChat Pay o efectivo.

---

## 10. Chinese zinnen module

### 10.1 Header / inleiding

**NL**
> **Chinese zinnen voor onderweg**
> Tik op 🔊 om de zin te horen. Tik op 📋 om hem te kopiëren. Zet je telefoon gerust onder de neus van de chauffeur of ober — dat mag en het werkt prima.

**ES**
> **Frases en chino para el viaje**
> Tocad 🔊 para escuchar. Tocad 📋 para copiar. Podéis enseñar el móvil al taxista o al camarero sin problema: es lo normal y funciona muy bien.

### 10.2 Instructie-strings (per zin)

| Situatie | NL | ES |
|---|---|---|
| Taxi-adres | Laat dit zien aan de taxichauffeur | Enseñad esto al taxista |
| Bestellen | Laat dit zien aan de ober | Enseñad esto al camarero |
| Winkel | Laat dit zien aan de verkoper | Enseñad esto al vendedor |
| Hulp vragen | Laat dit zien aan een voorbijganger | Enseñad esto a alguien que pase |
| Hotel | Laat dit zien bij de receptie | Enseñad esto en recepción |
| Noodgeval | **Laat dit meteen zien.** Bel 120 voor ambulance. | **Enseñad esto enseguida.** Llamad al 120 (ambulancia). |

### 10.3 Categorie-namen

| NL | ES | ZH |
|---|---|---|
| Taxi & vervoer | Taxi y transporte | 出租车和交通 |
| Eten & restaurant | Comida y restaurante | 吃饭和餐厅 |
| Winkel & prijs | Compras y precio | 购物和价格 |
| Richting vragen | Pedir direcciones | 问路 |
| Hotel & kamer | Hotel y habitación | 酒店和房间 |
| Hulp & noodgeval | Ayuda y emergencia | 求助和紧急 |

### 10.4 Knoppen binnen kaartje

| Actie | NL | ES |
|---|---|---|
| Uitspreken | 🔊 Luister | 🔊 Escuchar |
| Kopiëren | 📋 Kopieer | 📋 Copiar |
| Groot tonen | 🔍 Toon groot | 🔍 Ver grande |
| Favoriet | ❤️ Bewaren | ❤️ Guardar |

---

## 11. Onboarding walkthrough (7 slides)

_Eén concept per slide. Elke slide heeft een "Verder" en een "Sla over"-knop rechtsboven. Slide 7 sluit af._

### Slide 1 — Welkom
**NL** — **Welkom op jullie reis naar China!**
Deze app is jullie reisgenoot voor 25 april tot 2 mei. Hij past in je zak en helpt bij elke vraag die onderweg opkomt.
**ES** — **¡Bienvenidos a vuestro viaje a China!**
Esta app es vuestra compañera del 25 de abril al 2 de mayo. Cabe en el bolsillo y ayuda con cualquier pregunta del camino.

### Slide 2 — Thuis
**NL** — **Eén scherm vertelt je wat nu**
Op **Thuis** zie je altijd welke dag het is, wat er vandaag op het programma staat, en drie snelkoppelingen voor taxi, Chinees en noodgeval.
**ES** — **Una pantalla os dice qué toca ahora**
En **Inicio** siempre veis qué día es, qué hay hoy en el programa y tres accesos rápidos: taxi, chino y emergencia.

### Slide 3 — Planning delen
**NL** — **Jullie planning staat op dezelfde lijn**
Voegt één van jullie iets toe? Dan zien de anderen het binnen een paar seconden. Ook offline: wijzigingen synchroniseren zodra er weer internet is.
**ES** — **La agenda es compartida**
Si uno añade algo, los demás lo ven en pocos segundos. También sin internet: los cambios se sincronizan cuando vuelve la conexión.

### Slide 4 — Verken & Kaart
**NL** — **Niets nieuws bedenken hoeft**
In **Verken** en op de **Kaart** staan alle bezienswaardigheden, restaurants en winkels die we al voor je hebben uitgezocht. Tik op ➕ om iets aan je dag toe te voegen.
**ES** — **No hace falta inventar nada**
En **Explorar** y en el **Mapa** están todos los sitios, restaurantes y tiendas que ya hemos seleccionado. Tocad ➕ para añadir algo a vuestro día.

### Slide 5 — Chinees praten? Tonen kan ook
**NL** — **De Chinese zinnen werken als briefjes**
Onder 💡 **Hulp** staan zinnen voor de taxi, de ober en de winkel. Niet durven uitspreken? Laat de telefoon zien — dat werkt net zo goed.
**ES** — **Las frases en chino funcionan como notas**
En 💡 **Ayuda** hay frases para el taxi, el camarero y la tienda. ¿No os atrevéis a hablar? Enseñad el móvil: funciona igual de bien.

### Slide 6 — Goed om te weten
**NL** — **Een paar dingen die handig zijn**
We hebben kleine tips verzameld over afdingen, betalen en scams. Het is goed om te weten, en niks om je zorgen over te maken — de meeste mensen in China zijn heel behulpzaam.
**ES** — **Algunas cosas útiles**
Hemos reunido consejos sobre regatear, pagar y estafas. Es bueno saberlo, sin preocuparse: la mayoría de la gente en China es muy amable.

### Slide 7 — Offline klaar
**NL** — **Internet even weg? Geen paniek**
Kaart, planning en zinnen staan op je telefoon bewaard. Je kunt doorlezen, kopen en rondrijden, ook zonder verbinding. Zodra je weer online bent, synchroniseert alles zichzelf.
**ES** — **¿Sin conexión? Tranquilos**
El mapa, la agenda y las frases están guardados en el móvil. Podéis seguir leyendo, comprar y moveros sin conexión. Cuando vuelva, todo se sincroniza solo.

**Eind-CTA (op slide 7):**
- NL: **Laten we beginnen** → opens Home
- ES: **¡Empecemos!** → abre Inicio

---

## 12. Dag-groeten (25 apr – 2 mei 2026)

_Verschijnt boven de "Vandaag"-kaart op de Home. Specifiek per dag, warm, kort._

### NL

| Datum | Dag | Groet |
|---|---|---|
| Za 25 apr | 1 | **Gefeliciteerd — jullie zijn in Xi'an!** Begin rustig aan: stadsmuur en Muslim Quarter wachten op jullie. |
| Zo 26 apr | 2 | **Vandaag het Terracotta Leger.** Trek goede schoenen aan — het is indrukwekkend én veel lopen. |
| Ma 27 apr | 3 | **Reisdag: Xi'an → Beijing.** De trein gaat hard, maar de tijd vliegt. Proost op een paar mooie dagen Beijing. |
| Di 28 apr | 4 | **Goedemorgen vanuit Beijing!** Verboden Stad en Tiananmen vandaag. Neem rustig de tijd voor de Hallen van Hemelse Vrede. |
| Wo 29 apr | 5 | **Naar de Chinese Muur!** Mutianyu is minder druk en heeft een kabelbaan — jullie beleven een klassieker. |
| Do 30 apr | 6 | **Dag 6: hutongs en de Tempel van de Hemel.** Een zachtere dag — wandelen, thee, oude buurtjes. |
| Vr 1 mei | 7 | **Vandaag is Dag van de Arbeid in China — het wordt druk.** Vroeg beginnen bij het Zomerpaleis is slim. Geniet van het rustige deel bij Kunming-meer. |
| Za 2 mei | 8 | **Laatste dag — Wangfujing en inpakken.** Eén koffer ruimte laten voor souvenirs. Veilige thuiskomst! |

### ES

| Fecha | Día | Saludo |
|---|---|---|
| Sáb 25 abr | 1 | **¡Enhorabuena, ya estáis en Xi'an!** Empezad con calma: la muralla y el Barrio Musulmán os esperan. |
| Dom 26 abr | 2 | **Hoy, el Ejército de Terracota.** Poneos calzado cómodo: impresiona, y se anda bastante. |
| Lun 27 abr | 3 | **Día de viaje: Xi'an → Pekín.** El tren va rápido y el tiempo vuela. Por unos días bonitos en Pekín. |
| Mar 28 abr | 4 | **¡Buenos días desde Pekín!** Hoy Ciudad Prohibida y Tiananmén. Dedicad tiempo a los Salones de la Armonía. |
| Mié 29 abr | 5 | **¡A la Muralla China!** Mutianyu es menos concurrida y tiene teleférico — un clásico bien vivido. |
| Jue 30 abr | 6 | **Día 6: hutongs y Templo del Cielo.** Un día más suave: pasear, té, barrios antiguos. |
| Vie 1 may | 7 | **Hoy es el Día del Trabajo en China — habrá mucha gente.** Conviene empezar temprano en el Palacio de Verano. Disfrutad de la parte tranquila junto al lago Kunming. |
| Sáb 2 may | 8 | **Último día — Wangfujing y hacer maletas.** Dejad hueco para los recuerdos. ¡Buen regreso a casa! |

---

## 13. Footer / about

### 13.1 Footer (elk scherm, klein)

**NL**
> Gemaakt met liefde voor Oma, Opa en de kinderen · Reis 25 apr – 2 mei 2026 · v1.0
> [Over deze app] [Privacy] [Talen: NL · ES · 中文]

**ES**
> Hecho con cariño para los abuelos y los hijos · Viaje 25 abr – 2 may 2026 · v1.0
> [Sobre esta app] [Privacidad] [Idiomas: NL · ES · 中文]

### 13.2 "Over deze app" pagina

**NL**
> **Over Reisgenoot China**
>
> Deze app is een cadeau: gemaakt om jullie reis naar Xi'an en Beijing wat lichter te maken. Alle plekken, tips en adressen zijn zorgvuldig uitgezocht en tweemaal nagekeken. De Chinese zinnen zijn ingesproken door je telefoon — zet 'm gerust onder de neus van de taxichauffeur.
>
> **Werkt offline:** ja, na het eerste keer openen blijven kaart, planning en zinnen bruikbaar zonder internet.
>
> **Privacy:** jullie planning is alleen zichtbaar voor wie de reiscode kent. Geen reclame, geen tracking.
>
> **Laatste update:** 20 april 2026.
>
> **Vragen of iets klopt niet?** Stuur een berichtje naar {contact}. Veilige reis!

**ES**
> **Sobre Compañero China**
>
> Esta app es un regalo hecho para aligerar vuestro viaje a Xi'an y Pekín. Todos los sitios, consejos y direcciones están cuidadosamente seleccionados y verificados dos veces. Las frases en chino las pronuncia vuestro móvil: podéis enseñarlo al taxista sin problema.
>
> **Funciona sin conexión:** sí, tras la primera apertura, mapa, agenda y frases siguen disponibles sin internet.
>
> **Privacidad:** vuestra agenda solo la ve quien conoce el código del viaje. Ni publicidad ni rastreo.
>
> **Última actualización:** 20 de abril de 2026.
>
> **¿Dudas o algo no cuadra?** Escribid a {contacto}. ¡Buen viaje!

---

## Localization notes

- **NL:** gebruikt consistent "je/jullie" (nooit "u"). Consistent "wij/we" voor de app-stem. Diakrieten behouden (Xi'an, café).
- **ES:** gebruikt consistent "vosotros" (Spaans uit Spanje, past bij 70-jarige stel + kinderen). Nooit "ustedes" tenzij formeel gevraagd. Pinyin met tonen (bù yào, xièxie) — niet latiniseren.
- **ZH:** vereenvoudigde karakters (simplified). Geen Taiwan-varianten.
- **Lengte:** ES strings zijn ~20% langer dan NL — test in UI, speciaal voor knop-labels.
- **Tijdnotatie:** 24u (08:30, niet 8:30 AM).
- **Datumnotatie:** NL "ma 27 apr", ES "lun 27 abr". Nooit "04/27/2026".
- **Valuta:** CNY met symbool ¥ of "RMB". Nooit "$".

## Voice-recap (voor toekomstige copy)

- **DO:** "goed om te weten", "rustig", "vuistregel", "kost een seconde", "geniet"
- **DON'T:** "pas op!", "gevaar", "waarschuwing" (rood ja, woord nee), "niet vergeten" (klinkt als ouder), "even snel"
- Emoji mag, één per zin max, altijd naast de tekst (niet als vervanging van).
