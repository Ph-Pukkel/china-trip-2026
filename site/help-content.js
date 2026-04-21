// help-content.js — Helpful reference cards. Each key returns HTML.

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
              <div class="text-[18px] mt-1">${escapeHtml(state.lang === "es" ? it.es : it.nl)}</div>
              <button class="mt-2 h-10 px-3 rounded-lg bg-trust-100 text-trust-700 font-semibold"
                      data-action="speak-zh" data-text="${escapeHtml(it.zh).replace(/"/g,'&quot;')}">
                🔊 Lees voor
              </button>
            </li>
          `).join("")}
        </ul>
      </section>
    `).join("");
  },

  taxi(state, { t }) {
    return `
      <h3 class="text-[22px] font-semibold mb-2">Taxi-kaart</h3>
      <p class="text-[18px] mb-3">Kies een bestemming uit de planning of Verken, open 'm, en tik "Toon aan taxichauffeur". Je krijgt dan het Chinese adres in grote letters.</p>
      <div class="p-4 rounded-2xl bg-warn-100 text-warn-700 text-[18px] leading-relaxed">
        <strong>Check altijd:</strong> in Beijing moet het kenteken beginnen met <span class="tracking-wider font-mono">京B</span>. In Xi'an met 陕A. Zonder dat ben je in een ongereguleerde taxi.
      </div>
      <div class="p-4 rounded-2xl bg-trust-100 text-trust-700 text-[18px] leading-relaxed mt-3">
        <strong>DiDi app (met Engels):</strong> installeer voor vertrek, koppel Alipay of Visa/Mastercard. Werkt net als Uber — meestal goedkoper en veiliger dan op straat.
      </div>
      <ul class="list-disc pl-5 mt-3 space-y-1">
        <li>Laat de chauffeur altijd de meter starten. "请用打表" (Qǐng yòng dǎbiǎo).</li>
        <li>Neem een foto van het kenteken voor je instapt.</li>
        <li>Let op tolwegen-toeslag bij ritten naar de muur / vliegveld — dat is normaal.</li>
      </ul>
    `;
  },

  scams(state) {
    return `
      <h3 class="text-[22px] font-semibold mb-2">De 5 grootste scams</h3>
      <ol class="space-y-4">
        <li class="p-4 rounded-2xl bg-warn-100 border border-warn-700/30">
          <strong>1. Thee-ceremonie.</strong> Bij de Verboden Stad of Wangfujing benaderen "studenten" je vriendelijk, willen hun Engels oefenen, en nodigen je uit in een theehuisje. Eindrekening: €200-500. <br><em>Wat doen:</em> beleefd weigeren en doorlopen.
        </li>
        <li class="p-4 rounded-2xl bg-warn-100 border border-warn-700/30">
          <strong>2. Kunst-galerij.</strong> Identiek aan de thee-scam, maar dan "een kunststudent wil je zijn werk laten zien". Niet meegaan.
        </li>
        <li class="p-4 rounded-2xl bg-warn-100 border border-warn-700/30">
          <strong>3. Taxi zonder meter.</strong> Bij stations/vliegveld, zeker in Beijing/Xi'an. Check kenteken <span class="tracking-wider font-mono">京B</span> of 陕A, eis de meter. Of neem DiDi.
        </li>
        <li class="p-4 rounded-2xl bg-warn-100 border border-warn-700/30">
          <strong>4. Gewisseld biljet.</strong> Wissel-trucje bij kassa's: je krijgt een beschadigd of vals biljet terug. Check biljetten voor je wegloopt. Liever contactloos Alipay/WeChat Pay.
        </li>
        <li class="p-4 rounded-2xl bg-warn-100 border border-warn-700/30">
          <strong>5. Valse gids.</strong> Iemand zegt "de ingang is daar verderop" en leidt je naar een eigen tour-agentschap. Officiële bordjes zijn overal in Engels.
        </li>
      </ol>
      <p class="mt-4 text-ink-700 text-[18px]">Gewoon gebruik je gezond verstand: onverwacht vriendelijke benaderingen van vreemden in toeristische zones = voorzichtig zijn.</p>
    `;
  },

  payments(state) {
    return `
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
    `;
  },

  internet(state) {
    return `
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
    `;
  },

  checklist(state) {
    return `
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
    `;
  },

  emergency(state) {
    return `
      <h3 class="text-[22px] font-semibold mb-2 text-danger-700">Noodgeval</h3>
      <div class="grid grid-cols-2 gap-3 text-[22px]">
        <a href="tel:110" class="p-5 rounded-2xl bg-danger-700 text-white text-center font-bold">110 Politie</a>
        <a href="tel:120" class="p-5 rounded-2xl bg-danger-700 text-white text-center font-bold">120 Ambulance</a>
        <a href="tel:119" class="p-5 rounded-2xl bg-warn-700 text-white text-center font-bold">119 Brandweer</a>
        <a href="tel:12110" class="p-5 rounded-2xl bg-trust-700 text-white text-center font-bold">12110 SMS</a>
      </div>
      <div class="mt-5 p-4 rounded-2xl bg-bg-card border border-line">
        <h4 class="font-semibold text-[18px]">🇳🇱 Nederlandse ambassade Beijing</h4>
        <p class="text-[18px]">4 Liangmahe Nanlu, Chaoyang District, Beijing 100600</p>
        <a href="tel:+861085320200" class="text-trust-700 font-semibold">+86 10 8532 0200</a>
      </div>
      <div class="mt-3 p-4 rounded-2xl bg-bg-card border border-line">
        <h4 class="font-semibold text-[18px]">🇪🇸 Spaanse ambassade Beijing</h4>
        <p class="text-[18px]">Sanlitun Lu 9, Chaoyang District, Beijing 100600</p>
        <a href="tel:+861058799700" class="text-trust-700 font-semibold">+86 10 5879 9700</a>
      </div>
      <div class="mt-5 p-4 rounded-2xl bg-warn-100 text-warn-700">
        <strong>Bij medisch spoedgeval:</strong> Beijing United Family Hospital (internationale kwaliteit, Engels-sprekend) — 2 Jiangtai Lu, Chaoyang. <a href="tel:+861059277000" class="underline font-semibold">+86 10 5927 7000</a>
      </div>
    `;
  },

  brands(state, { brands, escapeHtml }) {
    return `
      <h3 class="text-[22px] font-semibold mb-2">Chinese merken (geen toeristen-zooi)</h3>
      <p class="text-[18px] mb-3 text-ink-700">Deze merken zijn populair bij Chinezen zelf — vaak goede kwaliteit voor redelijke prijzen.</p>
      <ul class="space-y-2">
        ${brands.map((b) => `
          <li class="p-4 rounded-2xl bg-bg-card border border-line">
            <div class="text-[22px] font-semibold">${escapeHtml(b.name)}</div>
            ${b.zh ? `<div class="text-ink-700 text-[18px]">${escapeHtml(b.zh)}</div>` : ""}
            <div class="text-ink-500 text-sm mt-1">${escapeHtml(b.category || "")} · ${escapeHtml(b.price || "")}</div>
            ${b.description_nl ? `<p class="mt-2 text-[16px]">${escapeHtml(b.description_nl)}</p>` : ""}
            ${b.where_to_find ? `<p class="mt-1 text-sm text-ink-500">📍 ${escapeHtml(b.where_to_find)}</p>` : ""}
          </li>
        `).join("")}
      </ul>
    `;
  },

  shoptips(state, { shopTips, escapeHtml }) {
    return `
      <h3 class="text-[22px] font-semibold mb-2">Slim shoppen</h3>
      <ul class="space-y-3">
        ${shopTips.map((tip) => `
          <li class="p-4 rounded-2xl bg-bg-card border border-line">
            ${tip.title ? `<div class="font-semibold text-[18px]">${escapeHtml(tip.title)}</div>` : ""}
            <div class="text-[18px] mt-1">${escapeHtml(tip.text || tip.tip || tip)}</div>
          </li>
        `).join("")}
      </ul>
    `;
  },
};
