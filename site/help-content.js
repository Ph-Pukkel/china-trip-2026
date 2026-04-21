// help-content.js — Helpful reference cards. Each key returns HTML.
// NL + ES parallel. Selecteert op state.lang; ZH valt terug op NL.

const pick = (lang, nl, es) => (lang === "es" ? es : nl);

export const HELP_CONTENT = {
  phrases(state, { t, phrases, escapeHtml }) {
    return phrases.map((g) => `
      <section class="mb-5">
        <h3 class="text-[22px] font-semibold mb-2">${escapeHtml(g["title_" + state.lang] || g.title_nl)}</h3>
        <ul class="space-y-2">
          ${g.items.map((it) => `
            <li class="p-3 rounded-xl border border-line bg-white">
              <div class="text-[28px] leading-snug" lang="zh-CN">${escapeHtml(it.zh)}</div>
              <div class="italic text-ink-500 text-sm">${escapeHtml(it.py)}</div>
              <div class="text-[18px] mt-1">${escapeHtml(state.lang === "es" ? (it.es || it.nl) : it.nl)}</div>
              <button class="mt-2 h-10 px-3 rounded-lg bg-trust-100 text-trust-700 font-semibold"
                      data-action="speak-zh" data-text="${escapeHtml(it.zh).replace(/"/g,'&quot;')}">
                🔊 ${pick(state.lang, "Lees voor", "Leer en voz alta")}
              </button>
            </li>
          `).join("")}
        </ul>
      </section>
    `).join("");
  },

  taxi(state) {
    const L = state.lang;
    return `
      <h3 class="text-[22px] font-semibold mb-2">${pick(L, "Taxi-kaart", "Tarjeta del taxi")}</h3>
      <p class="text-[18px] mb-3">${pick(L,
        'Kies een bestemming uit de planning of Verken, open \'m, en tik "Toon aan taxichauffeur". Je krijgt dan het Chinese adres in grote letters.',
        'Elige un destino en tu agenda o en Explorar, ábrelo y toca "Mostrar al taxista". Verás la dirección china en letra grande.')}</p>
      <div class="p-4 rounded-2xl bg-warn-100 text-warn-700 text-[18px] leading-relaxed">
        <strong>${pick(L, "Check altijd:", "Comprueba siempre:")}</strong>
        ${pick(L,
          'in Beijing moet het kenteken beginnen met',
          'en Pekín la matrícula debe empezar con')}
        <span class="tracking-wider font-mono">京B</span>.
        ${pick(L, "In Xi'an met", "En Xi'an con")} 陕A.
        ${pick(L,
          "Zonder dat ben je in een ongereguleerde taxi.",
          "Sin eso estás en un taxi no regulado.")}
      </div>
      <div class="p-4 rounded-2xl bg-trust-100 text-trust-700 text-[18px] leading-relaxed mt-3">
        <strong>${pick(L, "DiDi app (met Engels):", "App DiDi (con inglés):")}</strong>
        ${pick(L,
          "installeer voor vertrek, koppel Alipay of Visa/Mastercard. Werkt net als Uber — meestal goedkoper en veiliger dan op straat.",
          "instálala antes de salir y vincula Alipay o Visa/Mastercard. Funciona como Uber — normalmente más barato y seguro que en la calle.")}
      </div>
      <ul class="list-disc pl-5 mt-3 space-y-1 text-[18px]">
        <li>${pick(L,
          'Laat de chauffeur altijd de meter starten. "请用打表" (Qǐng yòng dǎbiǎo).',
          'Pide siempre que active el taxímetro. "请用打表" (Qǐng yòng dǎbiǎo).')}</li>
        <li>${pick(L,
          "Neem een foto van het kenteken voor je instapt.",
          "Haz una foto de la matrícula antes de subir.")}</li>
        <li>${pick(L,
          "Let op tolwegen-toeslag bij ritten naar de muur / vliegveld — dat is normaal.",
          "Ojo con el recargo de peajes en trayectos a la muralla o al aeropuerto — es normal.")}</li>
      </ul>
    `;
  },

  scams(state) {
    const L = state.lang;
    const title = pick(L, "De 5 grootste scams", "Las 5 estafas más comunes");
    const items = L === "es" ? [
      { t: "1. Ceremonia del té.", body: 'Cerca de la Ciudad Prohibida o Wangfujing te abordan "estudiantes" muy amables que quieren practicar inglés y te invitan a una casa de té. La cuenta final: 200-500 €.', todo: "rechaza amablemente y sigue andando." },
      { t: "2. Galería de arte.", body: 'Idéntico a la estafa del té, pero "un estudiante de arte quiere enseñarte su obra". No vayas con ellos.' },
      { t: "3. Taxi sin taxímetro.", body: "En estaciones y aeropuertos, sobre todo en Pekín/Xi'an. Verifica la matrícula 京B o 陕A y exige el taxímetro. O usa DiDi." },
      { t: "4. Billete cambiado.", body: "Truco del cambio en cajas: te devuelven un billete dañado o falso. Revisa los billetes antes de marcharte. Mejor paga con Alipay/WeChat Pay sin contacto." },
      { t: "5. Guía falso.", body: 'Alguien te dice "la entrada está más allá" y te lleva a su agencia de tours. Los carteles oficiales están por todas partes en inglés.' },
    ] : [
      { t: "1. Thee-ceremonie.", body: 'Bij de Verboden Stad of Wangfujing benaderen "studenten" je vriendelijk, willen hun Engels oefenen, en nodigen je uit in een theehuisje. Eindrekening: €200-500.', todo: "beleefd weigeren en doorlopen." },
      { t: "2. Kunst-galerij.", body: 'Identiek aan de thee-scam, maar dan "een kunststudent wil je zijn werk laten zien". Niet meegaan.' },
      { t: "3. Taxi zonder meter.", body: "Bij stations/vliegveld, zeker in Beijing/Xi'an. Check kenteken 京B of 陕A, eis de meter. Of neem DiDi." },
      { t: "4. Gewisseld biljet.", body: "Wissel-trucje bij kassa's: je krijgt een beschadigd of vals biljet terug. Check biljetten voor je wegloopt. Liever contactloos Alipay/WeChat Pay." },
      { t: "5. Valse gids.", body: 'Iemand zegt "de ingang is daar verderop" en leidt je naar een eigen tour-agentschap. Officiële bordjes zijn overal in Engels.' },
    ];
    const foot = pick(L,
      "Gewoon gebruik je gezond verstand: onverwacht vriendelijke benaderingen van vreemden in toeristische zones = voorzichtig zijn.",
      "Sentido común: una amabilidad inesperada de desconocidos en zonas turísticas = desconfía.");
    const todoLabel = pick(L, "Wat doen:", "Qué hacer:");
    return `
      <h3 class="text-[22px] font-semibold mb-2">${title}</h3>
      <ol class="space-y-4">
        ${items.map((it) => `
          <li class="p-4 rounded-2xl bg-warn-100 border border-warn-700/30">
            <strong>${it.t}</strong> ${it.body}
            ${it.todo ? `<br><em>${todoLabel}</em> ${it.todo}` : ""}
          </li>
        `).join("")}
      </ol>
      <p class="mt-4 text-ink-700 text-[18px]">${foot}</p>
    `;
  },

  payments(state) {
    const L = state.lang;
    return pick(L, `
      <h3 class="text-[22px] font-semibold mb-2">Betalen in China</h3>
      <p class="text-[18px] mb-3">Bijna alles gaat met telefoon. Cash is back-up voor markten en oude tantes.</p>
      <h4 class="font-semibold text-[18px] mt-4">Alipay (aanbevolen)</h4>
      <ol class="list-decimal pl-5 space-y-1 text-[18px]">
        <li>App downloaden vóór vertrek (App Store / Play).</li>
        <li>Registreer met telefoonnummer + paspoort (echt paspoort, geen ID).</li>
        <li>Voeg Visa of Mastercard toe ("International card" → bevestigen).</li>
        <li>Bij betalen: Pay → QR scannen óf je eigen QR laten scannen.</li>
      </ol>
      <h4 class="font-semibold text-[18px] mt-4">WeChat Pay</h4>
      <p class="text-[18px]">Zelfde als Alipay maar via WeChat. Handig als je al WeChat gebruikt. Vereist ook paspoort-verificatie.</p>
      <h4 class="font-semibold text-[18px] mt-4">Cash</h4>
      <p class="text-[18px]">Wissel ~€100-200 pp in China bij een grote bank (ICBC, Bank of China). Op het vliegveld is de koers slecht. ATM's accepteren buitenlandse kaarten maar beperken CNY 2500/dag.</p>
      <p class="mt-3 text-warn-700 text-[18px]">⚠ Sinds 2024 accepteert Alipay Visa/Mastercard tot $5.000 per transactie. Maar: houd altijd wat cash. Niet elke kleine stand wil buitenlandse kaart-gekoppelde Alipay.</p>
    `, `
      <h3 class="text-[22px] font-semibold mb-2">Pagar en China</h3>
      <p class="text-[18px] mb-3">Casi todo se paga con el móvil. El efectivo es reserva para mercados y señoras mayores.</p>
      <h4 class="font-semibold text-[18px] mt-4">Alipay (recomendado)</h4>
      <ol class="list-decimal pl-5 space-y-1 text-[18px]">
        <li>Descarga la app antes de salir (App Store / Play).</li>
        <li>Regístrate con tu número de teléfono y pasaporte (el de verdad, no DNI).</li>
        <li>Añade tu Visa o Mastercard ("International card" → confirmar).</li>
        <li>Al pagar: Pay → escanea el QR o deja que escaneen el tuyo.</li>
      </ol>
      <h4 class="font-semibold text-[18px] mt-4">WeChat Pay</h4>
      <p class="text-[18px]">Igual que Alipay, pero dentro de WeChat. Útil si ya usas WeChat. También pide verificación con pasaporte.</p>
      <h4 class="font-semibold text-[18px] mt-4">Efectivo</h4>
      <p class="text-[18px]">Cambia unos 100-200 € por persona en un banco grande en China (ICBC, Bank of China). En el aeropuerto el cambio es malo. Los cajeros aceptan tarjetas extranjeras pero limitan a 2500 CNY/día.</p>
      <p class="mt-3 text-warn-700 text-[18px]">⚠ Desde 2024 Alipay acepta Visa/Mastercard hasta 5.000 $ por transacción. Aun así: lleva algo de efectivo. No todo puesto pequeño acepta Alipay con tarjeta extranjera.</p>
    `);
  },

  internet(state) {
    const L = state.lang;
    return pick(L, `
      <h3 class="text-[22px] font-semibold mb-2">Internet & VPN</h3>
      <p class="text-[18px] mb-3">Google, WhatsApp, Gmail, Facebook, Instagram, X en YouTube zijn in China geblokkeerd. Zonder voorbereiding kun je geen berichten naar thuis sturen.</p>
      <h4 class="font-semibold text-[18px]">Beste oplossing: reis-eSIM</h4>
      <ul class="list-disc pl-5 space-y-1 text-[18px]">
        <li><strong>Airalo</strong> of <strong>Holafly</strong>: koop een data-pakket (~€20-35 voor 10 dagen).</li>
        <li>Deze routes het internet via Hong Kong / Japan — Google werkt automatisch.</li>
        <li>Activeer vóór vertrek, nog op eigen WiFi.</li>
      </ul>
      <h4 class="font-semibold text-[18px] mt-4">Alternatief: VPN</h4>
      <p class="text-[18px]">ExpressVPN of NordVPN. Installeer vóór vertrek — sites worden in China geblokkeerd. Werkt, maar af en toe traag.</p>
      <p class="mt-3 text-trust-700 font-semibold text-[18px]">Wat wél werkt in China zonder VPN: Baidu (zoekmachine), WeChat, Alipay, DiDi, Trip.com, Bing (beperkt).</p>
    `, `
      <h3 class="text-[22px] font-semibold mb-2">Internet y VPN</h3>
      <p class="text-[18px] mb-3">Google, WhatsApp, Gmail, Facebook, Instagram, X y YouTube están bloqueados en China. Sin preparación no podrás escribir a casa.</p>
      <h4 class="font-semibold text-[18px]">La mejor opción: eSIM de viaje</h4>
      <ul class="list-disc pl-5 space-y-1 text-[18px]">
        <li><strong>Airalo</strong> o <strong>Holafly</strong>: compra un paquete de datos (~20-35 € por 10 días).</li>
        <li>Enrutan el tráfico por Hong Kong / Japón — Google funciona automáticamente.</li>
        <li>Actívala antes de salir, con tu WiFi.</li>
      </ul>
      <h4 class="font-semibold text-[18px] mt-4">Alternativa: VPN</h4>
      <p class="text-[18px]">ExpressVPN o NordVPN. Instálala antes de salir — las webs están bloqueadas dentro de China. Funciona, aunque a veces va lento.</p>
      <p class="mt-3 text-trust-700 font-semibold text-[18px]">Lo que sí funciona sin VPN: Baidu (buscador), WeChat, Alipay, DiDi, Trip.com, Bing (limitado).</p>
    `);
  },

  checklist(state) {
    const L = state.lang;
    return pick(L, `
      <h3 class="text-[22px] font-semibold mb-2">Checklist vóór vertrek</h3>
      <ul class="space-y-2 text-[18px]">
        <li>✅ <strong>Paspoort</strong> minimaal 6 maanden geldig na terugkomst.</li>
        <li>✅ <strong>Visum:</strong> NL + ES burgers tot 31 dec 2026 visumvrij voor 30 dagen. <em>Nog een keer checken 1 week voor vertrek.</em></li>
        <li>✅ <strong>eSIM</strong> of reis-SIM met China-dekking geactiveerd.</li>
        <li>✅ <strong>VPN</strong> geïnstalleerd (als backup).</li>
        <li>✅ <strong>Alipay</strong> + paspoort-verificatie gedaan.</li>
        <li>✅ <strong>DiDi</strong> app geïnstalleerd (ENG versie via AppStore).</li>
        <li>✅ <strong>Google Maps offline</strong> van Xi'an + Beijing gedownload.</li>
        <li>✅ <strong>Reisverzekering</strong> incl. medische dekking China.</li>
        <li>✅ <strong>Hotel reserveringen</strong> uitgedraaid op papier (Chinees adres).</li>
        <li>✅ <strong>Terracotta Leger</strong> tickets geboekt (7 dagen vooraf).</li>
        <li>✅ <strong>Verboden Stad</strong> tickets geboekt (7 dagen vooraf).</li>
        <li>✅ <strong>G-trein</strong> Xi'an → Beijing geboekt via Trip.com.</li>
        <li>✅ <strong>Kopie paspoort</strong> in portemonnee (en foto op telefoon).</li>
        <li>✅ <strong>Ambassade-info</strong> opgeslagen in telefoon.</li>
      </ul>
    `, `
      <h3 class="text-[22px] font-semibold mb-2">Lista antes de salir</h3>
      <ul class="space-y-2 text-[18px]">
        <li>✅ <strong>Pasaporte</strong> con al menos 6 meses de validez después de volver.</li>
        <li>✅ <strong>Visado:</strong> ciudadanos NL y ES hasta el 31 dic 2026 sin visado durante 30 días. <em>Vuelve a comprobar una semana antes del viaje.</em></li>
        <li>✅ <strong>eSIM</strong> o SIM de viaje con cobertura en China activada.</li>
        <li>✅ <strong>VPN</strong> instalada (por si acaso).</li>
        <li>✅ <strong>Alipay</strong> verificado con pasaporte.</li>
        <li>✅ <strong>DiDi</strong> instalada (versión en inglés desde la App Store).</li>
        <li>✅ <strong>Google Maps offline</strong> de Xi'an y Pekín descargado.</li>
        <li>✅ <strong>Seguro de viaje</strong> con cobertura médica en China.</li>
        <li>✅ <strong>Reservas de hotel</strong> impresas en papel (con dirección en chino).</li>
        <li>✅ <strong>Ejército de Terracota</strong> entradas reservadas (7 días antes).</li>
        <li>✅ <strong>Ciudad Prohibida</strong> entradas reservadas (7 días antes).</li>
        <li>✅ <strong>Tren G</strong> Xi'an → Pekín reservado vía Trip.com.</li>
        <li>✅ <strong>Copia del pasaporte</strong> en la cartera (y foto en el móvil).</li>
        <li>✅ <strong>Datos de la embajada</strong> guardados en el móvil.</li>
      </ul>
    `);
  },

  emergency(state) {
    const L = state.lang;
    const lbl = {
      title:    pick(L, "Noodgeval", "Emergencia"),
      police:   pick(L, "Politie", "Policía"),
      ambulance:pick(L, "Ambulance", "Ambulancia"),
      fire:     pick(L, "Brandweer", "Bomberos"),
      sms:      "SMS",
      nl:       pick(L, "🇳🇱 Nederlandse ambassade Beijing", "🇳🇱 Embajada de Países Bajos — Pekín"),
      es:       pick(L, "🇪🇸 Spaanse ambassade Beijing",   "🇪🇸 Embajada de España — Pekín"),
      medic:    pick(L,
        "<strong>Bij medisch spoedgeval:</strong> Beijing United Family Hospital (internationale kwaliteit, Engels-sprekend) — 2 Jiangtai Lu, Chaoyang.",
        "<strong>Emergencia médica:</strong> Beijing United Family Hospital (calidad internacional, personal en inglés) — 2 Jiangtai Lu, Chaoyang."),
    };
    return `
      <h3 class="text-[22px] font-semibold mb-2 text-danger-700">${lbl.title}</h3>
      <div class="grid grid-cols-2 gap-3 text-[22px]">
        <a href="tel:110" class="p-5 rounded-2xl bg-danger-700 text-white text-center font-bold">110 ${lbl.police}</a>
        <a href="tel:120" class="p-5 rounded-2xl bg-danger-700 text-white text-center font-bold">120 ${lbl.ambulance}</a>
        <a href="tel:119" class="p-5 rounded-2xl bg-warn-700 text-white text-center font-bold">119 ${lbl.fire}</a>
        <a href="tel:12110" class="p-5 rounded-2xl bg-trust-700 text-white text-center font-bold">12110 ${lbl.sms}</a>
      </div>
      <div class="mt-5 p-4 rounded-2xl bg-bg-card border border-line">
        <h4 class="font-semibold text-[18px]">${lbl.nl}</h4>
        <p class="text-[18px]">4 Liangmahe Nanlu, Chaoyang District, Beijing 100600</p>
        <a href="tel:+861085320200" class="text-trust-700 font-semibold">+86 10 8532 0200</a>
      </div>
      <div class="mt-3 p-4 rounded-2xl bg-bg-card border border-line">
        <h4 class="font-semibold text-[18px]">${lbl.es}</h4>
        <p class="text-[18px]">Sanlitun Lu 9, Chaoyang District, Beijing 100600</p>
        <a href="tel:+861058799700" class="text-trust-700 font-semibold">+86 10 5879 9700</a>
      </div>
      <div class="mt-5 p-4 rounded-2xl bg-warn-100 text-warn-700">
        ${lbl.medic} <a href="tel:+861059277000" class="underline font-semibold">+86 10 5927 7000</a>
      </div>
    `;
  },

  brands(state, { brands, escapeHtml }) {
    const L = state.lang;
    const title = pick(L, "Chinese merken (geen toeristen-zooi)", "Marcas chinas (no para turistas)");
    const intro = pick(L,
      "Deze merken zijn populair bij Chinezen zelf — vaak goede kwaliteit voor redelijke prijzen.",
      "Estas marcas son populares entre los propios chinos — buena calidad a precio razonable.");
    return `
      <h3 class="text-[22px] font-semibold mb-2">${title}</h3>
      <p class="text-[18px] mb-3 text-ink-700">${intro}</p>
      <ul class="space-y-2">
        ${brands.map((b) => {
          const desc = (L === "es" && b.description_es) ? b.description_es : b.description_nl;
          return `
          <li class="p-4 rounded-2xl bg-bg-card border border-line">
            <div class="text-[22px] font-semibold">${escapeHtml(b.name)}</div>
            ${b.zh ? `<div class="text-ink-700 text-[18px]">${escapeHtml(b.zh)}</div>` : ""}
            <div class="text-ink-500 text-sm mt-1">${escapeHtml(b.category || "")} · ${escapeHtml(b.price || "")}</div>
            ${desc ? `<p class="mt-2 text-[16px]">${escapeHtml(desc)}</p>` : ""}
            ${b.where_to_find ? `<p class="mt-1 text-sm text-ink-500">📍 ${escapeHtml(b.where_to_find)}</p>` : ""}
          </li>`;
        }).join("")}
      </ul>
    `;
  },

  shoptips(state, { shopTips, escapeHtml }) {
    const L = state.lang;
    const title = pick(L, "Slim shoppen", "Comprar con cabeza");
    return `
      <h3 class="text-[22px] font-semibold mb-2">${title}</h3>
      <ul class="space-y-3">
        ${shopTips.map((tip) => {
          const body = (L === "es" && (tip.text_es || tip.es)) ? (tip.text_es || tip.es) : (tip.text || tip.tip || tip);
          const ttl = (L === "es" && (tip.title_es)) ? tip.title_es : tip.title;
          return `
          <li class="p-4 rounded-2xl bg-bg-card border border-line">
            ${ttl ? `<div class="font-semibold text-[18px]">${escapeHtml(ttl)}</div>` : ""}
            <div class="text-[18px] mt-1">${escapeHtml(body)}</div>
          </li>`;
        }).join("")}
      </ul>
    `;
  },
};
