// app.js — Reisgenoot China 2026
// Single-file SPA: i18n, router, state, planner, map, help content.
// Works fully offline (bundled data); syncs via Supabase if configured.

import { SyncClient } from "./supabase-client.js";
import { initPlanner } from "./planner.js";
import { initMap } from "./map.js";
import { HELP_CONTENT } from "./help-content.js";
import { PHRASES } from "./phrases.js";

const CFG = window.APP_CONFIG;
const state = {
  lang: localStorage.getItem("lang") || "nl",
  user: localStorage.getItem("user") || "",
  loggedIn: localStorage.getItem("trip_code") === CFG.TRIP_CODE,
  locations: [],
  brands: [],
  shoppingTips: [],
  items: [],            // trip_items
  favorites: [],
  diary: [],
  currentScreen: "home",
  selectedDay: null,    // yyyy-mm-dd
  exploreFilters: { city: null, category: null, tags: new Set(), search: "" },
  i18n: {},
  sync: null,
  online: navigator.onLine,
};
window.__state = state; // for debug

// ------------------------- i18n helpers -------------------------
async function loadLocale(code) {
  try {
    const r = await fetch(`./locales/${code}.json`);
    return await r.json();
  } catch { return {}; }
}
function t(key, vars = {}) {
  const raw = state.i18n[key] || key;
  return raw.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? "");
}
function applyI18n() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const k = el.getAttribute("data-i18n");
    if (state.i18n[k]) el.textContent = state.i18n[k];
  });
}

// ------------------------- Data loading -------------------------
async function loadLocations() {
  const r = await fetch("./locations.json");
  const d = await r.json();
  state.locations = d.items;
  state.brands = d.chinese_brands || [];
  state.shoppingTips = d.shopping_tips_nl || [];
}

// ------------------------- Router -------------------------
const SCREENS = ["home", "today", "explore", "map", "help"];
function go(name, sub) {
  if (!SCREENS.includes(name)) name = "home";
  state.currentScreen = name;
  SCREENS.forEach((s) => {
    document.getElementById(`screen-${s}`)?.classList.toggle("active", s === name);
  });
  document.querySelectorAll(".nav-tab").forEach((b) => {
    const active = b.getAttribute("data-nav") === name;
    b.classList.toggle("tab-active", active);
  });
  if (name === "map") requestAnimationFrame(() => window.__map?.invalidateSize());
  if (name === "help" && sub) renderHelpDetail(sub);
  if (name === "today") renderToday();
  if (name === "home") renderHome();
  if (name === "explore") renderExplore();
  history.replaceState({ screen: name, sub }, "", `#${name}${sub ? ":" + sub : ""}`);
  window.scrollTo({ top: 0, behavior: "instant" });
}

// ------------------------- Dates -------------------------
const TODAY = () => new Date().toISOString().slice(0, 10);
function dayIndex(iso) { return CFG.DAYS.findIndex((d) => d.date === iso); }
function addDays(iso, n) {
  const d = new Date(iso); d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}
function dateFmt(iso, lang = state.lang) {
  try {
    return new Date(iso).toLocaleDateString(lang === "zh" ? "zh-CN" : (lang === "es" ? "es-ES" : "nl-NL"),
      { weekday: "long", day: "numeric", month: "long" });
  } catch { return iso; }
}
function currentTripDay() {
  const t = TODAY();
  if (t < CFG.TRIP_START) return { phase: "before", index: -1, iso: CFG.TRIP_START };
  if (t > CFG.TRIP_END)   return { phase: "after",  index: -1, iso: CFG.TRIP_END };
  const i = dayIndex(t);
  return { phase: "during", index: i, iso: CFG.DAYS[i].date };
}

// ------------------------- HOME -------------------------
function renderHome() {
  const h = new Date().getHours();
  const greetKey = h < 12 ? "home_greeting_morning" : (h < 18 ? "home_greeting_afternoon" : "home_greeting_evening");
  document.getElementById("home-greeting").textContent = t(greetKey);

  const td = currentTripDay();
  const titleEl = document.getElementById("home-day-title");
  const dcEl    = document.getElementById("home-date-city");
  const cdEl    = document.getElementById("home-countdown");
  if (td.phase === "before") {
    const daysLeft = Math.ceil((new Date(CFG.TRIP_START) - new Date()) / 86400000);
    titleEl.textContent = t("home_before_trip", { n: daysLeft });
    dcEl.textContent = `${dateFmt(CFG.TRIP_START)} — Xi'an`;
    cdEl.textContent = "";
  } else if (td.phase === "after") {
    titleEl.textContent = t("home_after_trip");
    dcEl.textContent = `${dateFmt(CFG.TRIP_START)} – ${dateFmt(CFG.TRIP_END)}`;
    cdEl.textContent = "";
  } else {
    const day = CFG.DAYS[td.index];
    titleEl.textContent = t("home_day_of", { d: td.index + 1, total: CFG.DAYS.length });
    dcEl.textContent = `${dateFmt(day.date)} — ${day.city === "both" ? "Xi'an → Beijing" : (day.city === "xian" ? "Xi'an" : "Beijing")}`;
    const remaining = CFG.DAYS.length - (td.index + 1);
    cdEl.textContent = `${t("home_day_of", { d: td.index + 1, total: CFG.DAYS.length })} · nog ${remaining} ${remaining === 1 ? "dag" : "dagen"} te gaan`;
  }

  renderNextActivity();
  renderWeather();
}

function renderNextActivity() {
  const box = document.getElementById("home-next-content");
  const td  = currentTripDay();
  const now = new Date();
  const ymd = td.phase === "during" ? td.iso : CFG.TRIP_START;
  const itemsToday = state.items.filter((i) => i.day === ymd).sort(sortItems);
  let next = null;
  for (const it of itemsToday) {
    if (!it.start_time) { next = it; break; }
    const [hh, mm] = it.start_time.split(":").map(Number);
    const when = new Date(now); when.setHours(hh, mm || 0, 0, 0);
    if (td.phase !== "during" || when >= now) { next = it; break; }
  }
  if (!next) {
    // fallback: first upcoming item on any day
    next = state.items.find((i) => i.day >= ymd && i.status !== "done");
  }
  if (!next) {
    box.innerHTML = `<p class="text-ink-500">${t("home_nothing_planned")}</p>`;
    return;
  }
  const loc = state.locations.find((l) => l.slug === next.location_slug);
  box.innerHTML = `
    <div class="space-y-2">
      <div class="text-[22px] font-semibold">${escapeHtml(titleOf(next, loc))}</div>
      <div class="text-ink-700">${fmtTime(next.start_time)} · ${escapeHtml(dateFmt(next.day))}</div>
      ${loc ? `<div class="text-ink-500 text-sm">${escapeHtml(loc.address_nl || "")}</div>` : ""}
      <div class="flex gap-2 mt-2">
        ${loc ? `<button class="h-12 px-4 rounded-xl bg-trust-100 text-trust-700 font-semibold" data-action="show-chinese" data-slug="${loc.slug}">🚕 ${t("loc_show_chinese")}</button>` : ""}
        <button class="h-12 px-4 rounded-xl btn-primary font-semibold" data-nav="today">${t("home_view_day")}</button>
      </div>
    </div>`;
}

async function renderWeather() {
  if (!state.online) {
    document.getElementById("home-weather").textContent = t("home_weather_offline");
    return;
  }
  const td = currentTripDay();
  const city = td.phase === "during" ? CFG.DAYS[td.index].city : "beijing";
  const coords = CFG.HOTELS[city === "both" ? "beijing" : city];
  try {
    const u = `${CFG.WEATHER_API}?latitude=${coords.lat}&longitude=${coords.lng}&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`;
    const r = await fetch(u);
    const d = await r.json();
    const cur = d.current;
    const today = d.daily;
    const code = cur.weather_code;
    const emoji = weatherEmoji(code);
    document.getElementById("home-weather").innerHTML =
      `<div class="flex items-center gap-3"><span class="text-4xl" aria-hidden="true">${emoji}</span>
        <div>
          <div class="font-semibold">${Math.round(cur.temperature_2m)}°C nu · ${city === "xian" ? "Xi'an" : "Beijing"}</div>
          <div class="text-ink-500 text-sm">Vandaag ${Math.round(today.temperature_2m_min[0])}° – ${Math.round(today.temperature_2m_max[0])}° · wind ${Math.round(cur.wind_speed_10m)} km/u</div>
        </div>
      </div>`;
  } catch (e) {
    document.getElementById("home-weather").textContent = "—";
  }
}

function weatherEmoji(code) {
  if (code === 0) return "☀️"; if (code <= 2) return "🌤️"; if (code === 3) return "☁️";
  if (code <= 48) return "🌫️"; if (code <= 67) return "🌧️"; if (code <= 77) return "❄️";
  if (code <= 82) return "🌦️"; if (code <= 86) return "🌨️"; if (code <= 99) return "⛈️"; return "🌤️";
}

// ------------------------- TODAY / PLANNER -------------------------
function renderToday() {
  const tabsEl = document.getElementById("day-tabs");
  tabsEl.innerHTML = "";
  CFG.DAYS.forEach((d, i) => {
    const b = document.createElement("button");
    b.className = "shrink-0 h-11 px-4 rounded-full border border-line bg-bg-card font-semibold focus-ring";
    if (state.selectedDay === d.date) b.classList.add("chip-on");
    b.textContent = `${i + 1}. ${short(d.date)}`;
    b.setAttribute("data-day", d.date);
    b.onclick = () => { state.selectedDay = d.date; renderToday(); };
    tabsEl.appendChild(b);
  });
  const dayCfg = CFG.DAYS.find((d) => d.date === state.selectedDay);
  document.getElementById("day-subtitle").textContent =
    dayCfg ? `${dateFmt(dayCfg.date)} — ${dayCfg["label_" + state.lang] || dayCfg.label_nl}` : "";
  initPlanner({
    listEl: document.getElementById("planner-list"),
    items: state.items.filter((it) => it.day === state.selectedDay).sort(sortItems),
    locations: state.locations,
    t, lang: state.lang,
    onReorder: async (newOrder) => {
      // apply optimistic order via "start_time" heuristic: spread from 09:00
      const base = 9 * 60;
      newOrder.forEach(async (id, i) => {
        const it = state.items.find((x) => x.id === id);
        if (!it) return;
        const t = new Date(0, 0, 0, 9 + Math.floor(i * 1.5), (i % 2) * 30);
        const hh = String(t.getHours()).padStart(2, "0");
        const mm = String(t.getMinutes()).padStart(2, "0");
        it.start_time = `${hh}:${mm}`;
        await state.sync.update(it);
      });
      save();
    },
    onRemove: async (id) => {
      state.items = state.items.filter((x) => x.id !== id);
      await state.sync.remove(id);
      save();
      toast(t("removed_toast"));
      renderToday();
    },
    onToggleStatus: async (id) => {
      const it = state.items.find((x) => x.id === id);
      if (!it) return;
      it.status = it.status === "done" ? "planned" : "done";
      await state.sync.update(it);
      save();
      renderToday();
    },
    onOpenLoc: (slug) => openLocModal(slug),
  });

  // diary
  const d = state.diary.find((x) => x.day === state.selectedDay);
  document.getElementById("diary-text").value = d?.text || "";
}

function sortItems(a, b) {
  if (a.start_time && b.start_time) return a.start_time.localeCompare(b.start_time);
  if (a.start_time) return -1; if (b.start_time) return 1;
  return (a.created_at || "").localeCompare(b.created_at || "");
}
function short(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(state.lang === "zh" ? "zh-CN" : (state.lang === "es" ? "es-ES" : "nl-NL"),
    { weekday: "short", day: "numeric", month: "short" });
}
function fmtTime(t) { return t ? t.slice(0, 5) : "—"; }
function titleOf(it, loc) {
  return it.custom_title || loc?.[`name_${state.lang}`] || loc?.name_nl || "—";
}

// ------------------------- EXPLORE -------------------------
const CITIES = ["xian", "beijing"];
const CATS = ["museum", "monument", "tempel", "restaurant", "shopping", "park", "lokale-ervaring", "hutong/buurt", "markt", "viewpoint", "show", "avond", "hidden-gem", "fotospot", "kunst-cultuur", "historisch-site"];
const TAGS = ["unesco", "must-see", "senior-vriendelijk", "gratis", "kindvriendelijk", "regenbestendig"];

function renderExplore() {
  const chipsEl = document.getElementById("filter-chips");
  chipsEl.innerHTML = "";

  const mkSection = (label, items, kind) => {
    const h = document.createElement("div");
    h.className = "w-full text-sm text-ink-500 mt-2";
    h.textContent = label;
    chipsEl.appendChild(h);
    items.forEach((v) => {
      const c = document.createElement("button");
      c.className = "h-11 px-4 rounded-full border border-line bg-bg-card text-base focus-ring";
      const active = (kind === "city" && state.exploreFilters.city === v)
                   || (kind === "category" && state.exploreFilters.category === v)
                   || (kind === "tag" && state.exploreFilters.tags.has(v));
      if (active) c.classList.add("chip-on");
      c.textContent = labelFor(v, kind);
      c.setAttribute("aria-pressed", active ? "true" : "false");
      c.onclick = () => toggleFilter(kind, v);
      chipsEl.appendChild(c);
    });
  };
  mkSection(t("explore_filter_city"), CITIES, "city");
  mkSection(t("explore_filter_category"), CATS, "category");
  mkSection(t("explore_filter_tags"), TAGS, "tag");

  const list = document.getElementById("explore-list");
  const q = state.exploreFilters.search.trim().toLowerCase();
  const matches = state.locations.filter((l) => {
    if (state.exploreFilters.city && l.city !== state.exploreFilters.city) return false;
    if (state.exploreFilters.category && l.category !== state.exploreFilters.category) return false;
    for (const tg of state.exploreFilters.tags) {
      if (!(l.tags || []).includes(tg) && !(tg === "gratis" && (l.price_adult_cny === 0))) return false;
    }
    if (q) {
      const hay = [l.name_nl, l.name_es, l.name_zh, l.pinyin, l.description_nl, (l.tags || []).join(" ")].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  document.getElementById("explore-count").textContent = t("explore_count", { n: matches.length });
  list.innerHTML = matches.length ? matches.map(cardHtml).join("") : `<li class="text-ink-500 py-10 text-center">${t("explore_no_results")}</li>`;
}

function toggleFilter(kind, v) {
  const f = state.exploreFilters;
  if (kind === "tag") {
    f.tags.has(v) ? f.tags.delete(v) : f.tags.add(v);
  } else {
    f[kind] = f[kind] === v ? null : v;
  }
  renderExplore();
}

function labelFor(v, kind) {
  const catLabels = { museum: "🏛️ Musea", monument: "🏯 Monumenten", tempel: "⛩️ Tempels",
    restaurant: "🍜 Eten", shopping: "🛍️ Shoppen", park: "🌳 Parken", "lokale-ervaring": "🧧 Lokale ervaring",
    "hutong/buurt": "🏘️ Hutong", markt: "🎪 Markt", viewpoint: "🏞️ Uitzicht", show: "🎭 Show",
    avond: "🌃 Avond", "hidden-gem": "💎 Pareltje", fotospot: "📸 Foto", "kunst-cultuur": "🎨 Kunst",
    "historisch-site": "🏛️ Historisch" };
  const tagLabels = { unesco: "UNESCO", "must-see": "Must-see", "senior-vriendelijk": "Senior 70+",
    gratis: "Gratis", kindvriendelijk: "Kindvriendelijk", regenbestendig: "Regenbestendig" };
  const cityLabels = { xian: "Xi'an", beijing: "Beijing" };
  if (kind === "category") return catLabels[v] || v;
  if (kind === "tag") return tagLabels[v] || v;
  if (kind === "city") return cityLabels[v] || v;
  return v;
}

function cardHtml(l) {
  const inPlan = state.items.some((i) => i.location_slug === l.slug);
  const closedToday = closedToday_(l);
  const priceAdult = l.price_adult_cny === 0 ? t("loc_free") : `¥${l.price_adult_cny ?? "?"}`;
  const priceSenior = l.price_senior_cny === 0 ? t("loc_free") : (l.price_senior_cny != null ? `¥${l.price_senior_cny}` : "—");
  const tags = (l.tags || []).slice(0, 3).map((x) => `<span class="inline-block px-2 py-0.5 rounded-full bg-line/50 text-sm">${escapeHtml(x)}</span>`).join(" ");
  return `
  <li class="bg-bg-card rounded-2xl border ${inPlan ? "border-success-700 border-2" : "border-line"} p-4 focus-ring"
      data-slug="${l.slug}">
    <button class="w-full text-left" data-action="open-loc" data-slug="${l.slug}">
      <div class="flex items-start justify-between gap-3">
        <div>
          <div class="text-[22px] font-semibold leading-tight">${escapeHtml(l[`name_${state.lang}`] || l.name_nl)}</div>
          <div class="text-ink-500 text-base">${escapeHtml(l.name_zh || "")} · <i>${escapeHtml(l.pinyin || "")}</i></div>
          <div class="mt-1 text-sm">${escapeHtml(cityLabel(l.city))} · ${escapeHtml(catLabelShort(l.category))}</div>
        </div>
        ${inPlan ? `<span class="text-success-700 font-semibold text-sm whitespace-nowrap">✓ ${t("loc_in_plan")}</span>` : ""}
      </div>
      ${closedToday ? `<div class="mt-2 inline-block px-2 py-1 rounded bg-warn-100 text-warn-700 text-sm">${t("loc_closed_today")}</div>` : ""}
      <div class="mt-2 text-[16px] text-ink-700">
        💴 ${priceAdult} · 60+ ${priceSenior} · ⏱️ ${t("loc_duration", { n: l.duration_min || "?" })}
      </div>
      ${tags ? `<div class="mt-2 flex gap-1 flex-wrap">${tags}</div>` : ""}
    </button>
  </li>`;
}

function cityLabel(c) { return c === "xian" ? "Xi'an" : c === "beijing" ? "Beijing" : c; }
function catLabelShort(c) { return labelFor(c, "category"); }

function closedToday_(l) {
  if (!l.closed_days || !l.closed_days.length) return false;
  const day = new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
  return l.closed_days.includes(day);
}

// ------------------------- Location modal -------------------------
function openLocModal(slug) {
  const l = state.locations.find((x) => x.slug === slug);
  if (!l) return;
  const body = document.getElementById("loc-modal-body");
  const tips = (l.tips_nl || []).map((x) => `<li class="text-[16px] text-ink-700 leading-relaxed">${escapeHtml(x)}</li>`).join("");
  const warn = (l.warnings_nl || []).map((x) => `<li class="text-[16px] text-warn-700 leading-relaxed">${escapeHtml(x)}</li>`).join("");
  const sources = (l.source_urls || []).slice(0, 3).map((u) => `<a class="text-trust-700 underline break-all text-sm" href="${u}" target="_blank" rel="noreferrer">${escapeHtml(shortUrl(u))}</a>`).join(" · ");
  const inPlan = state.items.some((i) => i.location_slug === l.slug);
  const priceAdult = l.price_adult_cny === 0 ? t("loc_free") : `¥${l.price_adult_cny ?? "?"}`;
  const priceSenior = l.price_senior_cny === 0 ? t("loc_free") : (l.price_senior_cny != null ? `¥${l.price_senior_cny}` : "—");
  body.innerHTML = `
    <h2 id="loc-modal-title" class="text-[28px] font-bold leading-tight">${escapeHtml(l[`name_${state.lang}`] || l.name_nl)}</h2>
    <div class="text-[22px] font-semibold text-ink-700">${escapeHtml(l.name_zh || "")}</div>
    <div class="text-[16px] italic text-ink-500">${escapeHtml(l.pinyin || "")}</div>
    <div class="mt-3 flex gap-2 flex-wrap">
      ${(l.tags || []).map((x) => `<span class="px-2 py-1 rounded-full bg-line/50 text-sm">${escapeHtml(x)}</span>`).join("")}
    </div>
    ${closedToday_(l) ? `<div class="mt-3 p-3 rounded-xl bg-warn-100 text-warn-700 font-semibold">${t("loc_closed_today")}</div>` : ""}
    ${l.seasonal_notes ? `<div class="mt-3 p-3 rounded-xl bg-accent-500/20 text-accent-800 text-[16px]">⚠ ${escapeHtml(l.seasonal_notes)}</div>` : ""}

    <div class="mt-4 grid grid-cols-2 gap-3 text-[16px]">
      <div><div class="text-ink-500 text-sm">${t("loc_price_adult")}</div><div class="font-semibold">${priceAdult}</div></div>
      <div><div class="text-ink-500 text-sm">${t("loc_price_senior")}</div><div class="font-semibold">${priceSenior}</div></div>
      <div><div class="text-ink-500 text-sm">⏱️</div><div class="font-semibold">${t("loc_duration", { n: l.duration_min || "?" })}</div></div>
      <div><div class="text-ink-500 text-sm">⏰</div><div class="font-semibold text-sm">${escapeHtml(typeof l.opening_hours === "string" ? l.opening_hours : JSON.stringify(l.opening_hours || "?"))}</div></div>
    </div>

    <div class="mt-4">
      <div class="text-ink-500 text-sm">${t("loc_address")}</div>
      <div class="mt-1 p-4 rounded-2xl bg-white border-2 border-brand-600 text-[28px] font-semibold leading-snug text-center" lang="zh-CN">${escapeHtml(l.address_zh || l.address_nl || "—")}</div>
      <div class="text-ink-500 text-sm mt-1">${escapeHtml(l.address_nl || "")}</div>
      <button class="mt-2 h-11 px-4 rounded-xl bg-trust-100 text-trust-700 font-semibold focus-ring" data-action="speak-zh" data-text="${escapeAttr(l.address_zh || "")}">🔊 ${t("loc_show_chinese")}</button>
    </div>

    ${l.description_nl ? `<p class="mt-4 text-[18px] leading-relaxed">${escapeHtml(state.lang === "es" && l.description_es ? l.description_es : l.description_nl)}</p>` : ""}

    ${tips ? `<h3 class="mt-4 font-semibold text-[18px]">${t("loc_tips")}</h3><ul class="list-disc pl-5 space-y-1">${tips}</ul>` : ""}
    ${warn ? `<h3 class="mt-4 font-semibold text-[18px] text-warn-700">${t("loc_warnings")}</h3><ul class="list-disc pl-5 space-y-1">${warn}</ul>` : ""}

    <div class="mt-5 flex gap-2">
      <button class="flex-1 h-14 rounded-2xl btn-primary font-semibold text-xl focus-ring active:scale-[0.98]" data-action="add-to-plan" data-slug="${l.slug}" ${inPlan ? "disabled" : ""}>
        ${inPlan ? `✓ ${t("loc_in_plan")}` : `+ ${t("loc_add_to_plan")}`}
      </button>
      <a class="h-14 flex items-center justify-center px-5 rounded-2xl bg-trust-100 text-trust-700 font-semibold focus-ring"
         href="https://www.openstreetmap.org/?mlat=${l.lat}&mlon=${l.lng}#map=17/${l.lat}/${l.lng}"
         target="_blank" rel="noreferrer">🗺️</a>
    </div>

    ${sources ? `<div class="mt-3 text-sm">${t("loc_source")}: ${sources}</div>` : ""}
  `;
  document.getElementById("loc-modal").classList.remove("hidden");
}
function closeLocModal() { document.getElementById("loc-modal").classList.add("hidden"); }
function shortUrl(u) { try { return new URL(u).host; } catch { return u; } }

// ------------------------- Add-to-plan modal -------------------------
function openAddModal(slug) {
  const l = state.locations.find((x) => x.slug === slug);
  if (!l) return;
  const body = document.getElementById("add-modal-body");
  body.innerHTML = `
    <div class="text-[22px] font-semibold mb-2">${escapeHtml(l[`name_${state.lang}`] || l.name_nl)}</div>
    <label class="block text-sm text-ink-500 mb-1">${t("add_modal_choose_day")}</label>
    <select id="add-day" class="w-full h-12 rounded-xl border border-line bg-white text-[18px] focus-ring mb-3">
      ${CFG.DAYS.map((d) => `<option value="${d.date}" ${d.date === state.selectedDay ? "selected" : ""}>${short(d.date)} — ${escapeHtml(d.label_nl)}</option>`).join("")}
    </select>
    <label class="block text-sm text-ink-500 mb-1">${t("add_modal_time")}</label>
    <input id="add-time" type="time" class="w-full h-12 rounded-xl border border-line bg-white text-[18px] focus-ring mb-3" />
    <label class="block text-sm text-ink-500 mb-1">${t("add_modal_notes")}</label>
    <input id="add-notes" type="text" class="w-full h-12 rounded-xl border border-line bg-white text-[18px] focus-ring mb-3" />
    <label class="block text-sm text-ink-500 mb-1">${t("add_modal_who")}</label>
    <input id="add-who" type="text" value="${escapeAttr(state.user || "")}" class="w-full h-12 rounded-xl border border-line bg-white text-[18px] focus-ring" />
  `;
  document.getElementById("add-modal").classList.remove("hidden");
  document.getElementById("add-modal-confirm").onclick = async () => {
    const day = document.getElementById("add-day").value;
    const time = document.getElementById("add-time").value;
    const notes = document.getElementById("add-notes").value;
    const who = document.getElementById("add-who").value.trim();
    if (who) { state.user = who; localStorage.setItem("user", who); }
    const item = {
      id: crypto.randomUUID(),
      trip_code: CFG.TRIP_CODE,
      day, start_time: time || null, end_time: null,
      location_slug: slug, custom_title: null,
      notes: notes || null, status: "planned",
      added_by: who || "Onbekend", created_at: new Date().toISOString(),
    };
    state.items.push(item);
    await state.sync.add(item);
    save();
    closeAddModal();
    closeLocModal();
    toast(t("added_toast", { day: short(day) }));
    if (state.currentScreen === "today") renderToday();
    if (state.currentScreen === "home") renderHome();
    renderExplore();
  };
  document.getElementById("add-modal-cancel").onclick = closeAddModal;
}
function closeAddModal() { document.getElementById("add-modal").classList.add("hidden"); }

// ------------------------- HELP -------------------------
function renderHelpDetail(sub) {
  const el = document.getElementById("help-detail");
  const h = HELP_CONTENT[sub];
  if (!h) { el.innerHTML = ""; return; }
  el.innerHTML = `<div class="mt-4 p-5 bg-bg-card rounded-2xl border border-line">${h(state, { t, phrases: PHRASES, brands: state.brands, shopTips: state.shoppingTips, escapeHtml })}</div>`;
}

// ------------------------- Persistence -------------------------
function save() {
  localStorage.setItem("items", JSON.stringify(state.items));
  localStorage.setItem("favorites", JSON.stringify(state.favorites));
  localStorage.setItem("diary", JSON.stringify(state.diary));
}
function load() {
  try { state.items = JSON.parse(localStorage.getItem("items") || "[]"); } catch { }
  try { state.favorites = JSON.parse(localStorage.getItem("favorites") || "[]"); } catch { }
  try { state.diary = JSON.parse(localStorage.getItem("diary") || "[]"); } catch { }
}

// ------------------------- Toast -------------------------
function toast(msg) {
  const c = document.getElementById("toast-container");
  const el = document.createElement("div");
  el.className = "toast bg-ink-900/90 text-white px-5 py-3 rounded-full font-semibold pointer-events-none";
  el.textContent = msg;
  c.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}

// ------------------------- Escape / speech -------------------------
function escapeHtml(s) { return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
function escapeAttr(s) { return escapeHtml(s); }
function speakZh(text) {
  if (!text) return;
  if (!("speechSynthesis" in window)) { alert("Stem niet beschikbaar op dit apparaat."); return; }
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-CN"; u.rate = 0.9;
  const vs = speechSynthesis.getVoices().filter((v) => v.lang.startsWith("zh"));
  if (vs.length) u.voice = vs[0];
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

// ------------------------- Offline banner -------------------------
function setOnline(v) {
  state.online = v;
  document.getElementById("offline-banner").classList.toggle("hidden", v);
}
window.addEventListener("online", () => { setOnline(true); state.sync?.flushQueue(); });
window.addEventListener("offline", () => setOnline(false));

// ------------------------- Wire up UI events -------------------------
document.addEventListener("click", (e) => {
  const nav = e.target.closest("[data-nav]");
  if (nav) {
    const v = nav.getAttribute("data-nav");
    const [screen, sub] = v.split(":");
    go(screen, sub);
    return;
  }
  const sub = e.target.closest("[data-help-sub]");
  if (sub) { go("help", sub.getAttribute("data-help-sub")); return; }
  const act = e.target.closest("[data-action]");
  if (act) {
    const a = act.getAttribute("data-action");
    const slug = act.getAttribute("data-slug");
    if (a === "open-loc") openLocModal(slug);
    if (a === "add-to-plan") openAddModal(slug);
    if (a === "show-chinese") openLocModal(slug);
    if (a === "speak-zh") speakZh(act.getAttribute("data-text"));
  }
  const mapBtn = e.target.closest(".map-city-btn");
  if (mapBtn) {
    document.querySelectorAll(".map-city-btn").forEach((b) => b.classList.remove("chip-on"));
    mapBtn.classList.add("chip-on");
    window.__mapSwitchCity?.(mapBtn.getAttribute("data-city"));
  }
});
document.getElementById("loc-modal-close").onclick = closeLocModal;
document.getElementById("btn-home-logo").onclick = () => go("home");
document.getElementById("explore-search").addEventListener("input", (e) => {
  state.exploreFilters.search = e.target.value;
  renderExplore();
});
document.getElementById("btn-add-item").onclick = () => go("explore");
document.getElementById("lang-select").onchange = async (e) => {
  state.lang = e.target.value;
  localStorage.setItem("lang", state.lang);
  state.i18n = await loadLocale(state.lang);
  applyI18n();
  // re-render current screen so dynamic labels update
  go(state.currentScreen);
};
document.getElementById("diary-save").onclick = async () => {
  const txt = document.getElementById("diary-text").value.trim();
  const ex = state.diary.find((x) => x.day === state.selectedDay);
  if (ex) ex.text = txt; else state.diary.push({ id: crypto.randomUUID(), trip_code: CFG.TRIP_CODE, day: state.selectedDay, author: state.user || "", text: txt, created_at: new Date().toISOString() });
  save();
  await state.sync.upsertDiary(state.diary.find((x) => x.day === state.selectedDay));
  toast(t("today_diary_saved"));
};
document.getElementById("login-btn").onclick = () => {
  const v = document.getElementById("trip-code-input").value.trim().toLowerCase();
  if (v === CFG.TRIP_CODE) {
    localStorage.setItem("trip_code", CFG.TRIP_CODE);
    state.loggedIn = true;
    document.getElementById("login-gate").classList.add("hidden");
    go("home");
  } else {
    toast(t("login_wrong"));
  }
};
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeLocModal(); closeAddModal(); }
});

// ------------------------- Boot -------------------------
(async function boot() {
  state.i18n = await loadLocale(state.lang);
  document.getElementById("lang-select").value = state.lang;
  applyI18n();
  await loadLocations();
  load();

  const td = currentTripDay();
  state.selectedDay = td.phase === "during" ? td.iso : CFG.TRIP_START;

  // sync client
  state.sync = new SyncClient(CFG, state);
  await state.sync.init();

  // login gate
  if (!state.loggedIn) {
    document.getElementById("login-gate").classList.remove("hidden");
    document.querySelector("main").querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
    document.querySelector("nav[role='tablist']").classList.add("opacity-40", "pointer-events-none");
  } else {
    document.querySelector("nav[role='tablist']").classList.remove("opacity-40", "pointer-events-none");
  }

  // init map once, lazily
  document.addEventListener("DOMContentLoaded", () => {});
  setTimeout(() => initMap(state.locations, CFG), 200);

  // initial route from hash
  const hash = location.hash.replace("#", "").split(":");
  go(hash[0] || "home", hash[1]);

  // register SW
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  }
  setOnline(navigator.onLine);
})();
