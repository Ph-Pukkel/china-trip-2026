// app.js — Reisgenoot China 2026
// Single-file SPA: i18n, router, state, planner, map, help content.
// Works fully offline (bundled data); syncs via Supabase if configured.

import { SyncClient } from "./supabase-client.js";
import { initPlanner } from "./planner.js";
import { initMap } from "./map.js";
import { HELP_CONTENT } from "./help-content.js";
import { PHRASES } from "./phrases.js";
import { attachSwipe } from "./swipe.js";

const CFG = window.APP_CONFIG;
// Auto-login: geen drempel voor het gezin — iedereen met de URL is binnen.
if (localStorage.getItem("trip_code") !== CFG.TRIP_CODE) {
  localStorage.setItem("trip_code", CFG.TRIP_CODE);
}
const state = {
  lang: localStorage.getItem("lang") || "nl",
  user: localStorage.getItem("user") || "",
  loggedIn: true,
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
  // Modal paging
  modalList: [],
  modalIndex: 0,
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
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const k = el.getAttribute("data-i18n-placeholder");
    if (state.i18n[k]) el.setAttribute("placeholder", state.i18n[k]);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    const k = el.getAttribute("data-i18n-aria-label");
    if (state.i18n[k]) el.setAttribute("aria-label", state.i18n[k]);
  });
}

// Per-location language fallback: try target lang, then nl, then empty.
function locText(loc, field) {
  if (!loc) return "";
  return loc[`${field}_${state.lang}`] || loc[`${field}_nl`] || "";
}
function locList(loc, field) {
  if (!loc) return [];
  return loc[`${field}_${state.lang}`] || loc[`${field}_nl`] || [];
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
    b.setAttribute("aria-selected", active ? "true" : "false");
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
function dateFmt(iso, lang = state.lang) {
  try {
    return new Date(iso).toLocaleDateString(lang === "zh" ? "zh-CN" : (lang === "es" ? "es-ES" : "nl-NL"),
      { weekday: "long", day: "numeric", month: "long" });
  } catch { return iso; }
}
function currentTripDay() {
  const today = TODAY();
  if (today < CFG.TRIP_START) return { phase: "before", index: -1, iso: CFG.TRIP_START };
  if (today > CFG.TRIP_END)   return { phase: "after",  index: -1, iso: CFG.TRIP_END };
  const i = dayIndex(today);
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
    dcEl.textContent = `${dateFmt(day.date)} — ${day.city === "both" ? "Xi'an → Beijing" : cityLabel(day.city)}`;
    const remaining = CFG.DAYS.length - (td.index + 1);
    const rKey = remaining === 1 ? "home_day_remaining_one" : "home_day_remaining_other";
    cdEl.textContent = `${t("home_day_of", { d: td.index + 1, total: CFG.DAYS.length })} · ${t(rKey, { n: remaining })}`;
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
      ${loc ? `<div class="text-ink-500 text-sm">${escapeHtml(locText(loc, "address") || loc.address_nl || "")}</div>` : ""}
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
          <div class="font-semibold">${Math.round(cur.temperature_2m)}°C · ${cityLabel(city === "both" ? "beijing" : city)}</div>
          <div class="text-ink-500 text-sm">${Math.round(today.temperature_2m_min[0])}° – ${Math.round(today.temperature_2m_max[0])}° · wind ${Math.round(cur.wind_speed_10m)} km/u</div>
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
      newOrder.forEach(async (id, i) => {
        const it = state.items.find((x) => x.id === id);
        if (!it) return;
        const tm = new Date(0, 0, 0, 9 + Math.floor(i * 1.5), (i % 2) * 30);
        const hh = String(tm.getHours()).padStart(2, "0");
        const mm = String(tm.getMinutes()).padStart(2, "0");
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

  const dy = state.diary.find((x) => x.day === state.selectedDay);
  document.getElementById("diary-text").value = dy?.text || "";
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
function fmtTime(tm) { return tm ? tm.slice(0, 5) : "—"; }
function titleOf(it, loc) {
  return it.custom_title || locText(loc, "name") || loc?.name_nl || "—";
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
      const hay = [l.name_nl, l.name_es, l.name_zh, l.pinyin, l.description_nl, l.tagline_nl, (l.tags || []).join(" ")].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  document.getElementById("explore-count").textContent = t("explore_count", { n: matches.length });
  list.innerHTML = matches.length ? matches.map(cardHtml).join("") : `<li class="text-ink-500 py-10 text-center">${t("explore_no_results")}</li>`;

  // Cache current filtered list for modal paging
  state.currentMatches = matches;
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
  if (kind === "category") return t(`cat_${v}`) || v;
  if (kind === "tag")      return t(`tag_${v}`) || v;
  if (kind === "city")     return t(`city_${v}`) || v;
  return v;
}

function cityLabel(c) { return t(`city_${c}`) || c; }

// ------------------------- Star rating -------------------------
function starRating(value, max = 5) {
  const v = Number(value) || 0;
  const stars = [];
  for (let i = 0; i < max; i++) {
    const delta = v - i;
    let fill = 0;
    if (delta >= 0.75) fill = 100;
    else if (delta >= 0.25) fill = 50;
    else fill = 0;
    stars.push(`<span class="star" style="--fill:${fill}%"></span>`);
  }
  const label = v.toFixed(1).replace(".", state.lang === "nl" || state.lang === "es" ? "," : ".");
  return `<div class="star-rating" role="img" aria-label="${t("loc_rating_label", { value: label })}">${stars.join("")}</div>`;
}

// ------------------------- Distance helper -------------------------
function distanceFromHotel(l) {
  if (!l || l.lat == null || l.lng == null) return null;
  const hotelCity = l.city === "xian" ? "xian" : "beijing";
  const hotel = CFG.HOTELS?.[hotelCity];
  if (!hotel) return null;
  const R = 6371;
  const toRad = (d) => d * Math.PI / 180;
  const dLat = toRad(l.lat - hotel.lat);
  const dLon = toRad(l.lng - hotel.lng);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(hotel.lat)) * Math.cos(toRad(l.lat)) * Math.sin(dLon/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const km = R * c;
  return km < 10 ? km.toFixed(1) : Math.round(km);
}

// ------------------------- Placeholder images per category -------------------------
function placeholderFor(category) {
  const map = {
    museum:    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=70",
    monument:  "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=70",
    tempel:    "https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=800&q=70",
    restaurant:"https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=800&q=70",
    shopping:  "https://images.unsplash.com/photo-1513708927688-890fe41c2e99?w=800&q=70",
    park:      "https://images.unsplash.com/photo-1519974719765-e6559eac2575?w=800&q=70",
    markt:     "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=70",
    viewpoint: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=70",
    show:      "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=70",
    avond:     "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=70",
    "hidden-gem":  "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=800&q=70",
    fotospot:  "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&q=70",
    "kunst-cultuur": "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=70",
    "historisch-site": "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=70",
    "lokale-ervaring": "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=70",
    "hutong/buurt": "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=70",
  };
  return map[category] || "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=70";
}

// ------------------------- EXPLORE CARDS -------------------------
function cardHtml(l) {
  const inPlan = state.items.some((i) => i.location_slug === l.slug);
  const closedToday = closedToday_(l);
  const priceAdult = l.price_adult_cny === 0 ? t("loc_free") : `¥${l.price_adult_cny ?? "?"}`;
  const rating = Number(l.rating) || 0;
  const reviews = Number(l.review_count) || 0;
  const distKm = distanceFromHotel(l);
  const tagline = locText(l, "tagline");
  const photo = l.photo_url || placeholderFor(l.category);
  const name = locText(l, "name") || l.name_nl || "";
  const cityL = cityLabel(l.city);
  const catL = labelFor(l.category, "category");

  return `
  <li class="bg-bg-card rounded-2xl overflow-hidden border ${inPlan ? "border-success-700 border-2" : "border-line"} shadow-sm focus-within:ring-2 focus-within:ring-brand-600"
      data-slug="${l.slug}">
    <button class="w-full text-left block focus:outline-none" data-action="open-loc" data-slug="${l.slug}" aria-label="${escapeAttr(name)}">
      <div class="relative aspect-[16/9] bg-line/40 skeleton-shimmer overflow-hidden">
        <img src="${escapeAttr(photo)}" alt="" loading="lazy" decoding="async"
             class="w-full h-full object-cover opacity-0 transition-opacity duration-300"
             onload="this.style.opacity=1; this.parentElement.classList.remove('skeleton-shimmer');"
             onerror="this.onerror=null; this.src='${escapeAttr(placeholderFor(l.category))}';" />
        <span class="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 text-ink-900 text-sm font-semibold shadow-sm">${escapeHtml(catL)}</span>
        ${inPlan ? `<span class="absolute top-3 right-3 h-9 w-9 rounded-full bg-success-700 text-white flex items-center justify-center font-bold shadow">✓</span>` : ""}
        ${distKm != null ? `<span class="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/70 text-white text-sm font-semibold">📍 ${t("explore_distance_from_hotel", { n: distKm })}</span>` : ""}
        ${closedToday ? `<span class="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-danger-100 text-danger-700 text-sm font-semibold shadow-sm">${t("loc_closed_today")}</span>` : ""}
      </div>
      <div class="p-4">
        <h3 class="text-[22px] font-bold leading-tight">${escapeHtml(name)}</h3>
        <div class="text-ink-500 text-[15px] mt-0.5">
          ${escapeHtml(l.name_zh || "")}${l.pinyin ? ` · <i>${escapeHtml(l.pinyin)}</i>` : ""}
        </div>
        ${tagline ? `<p class="text-[16px] text-ink-700 mt-2 leading-snug">${escapeHtml(tagline)}</p>` : ""}
        ${rating ? `
        <div class="mt-3 flex items-center gap-2 flex-wrap">
          ${starRating(rating)}
          <span class="text-[15px] font-semibold text-ink-900">${rating.toFixed(1).replace(".", state.lang === "zh" ? "." : ",")}</span>
          ${reviews ? `<span class="text-[13px] text-ink-500">${t("loc_rating_reviews", { n: reviews.toLocaleString() })}</span>` : ""}
        </div>` : ""}
        <div class="mt-3 flex flex-wrap gap-2 text-[14px]">
          <span class="px-2.5 py-1 rounded-lg bg-line/50 font-semibold">💴 ${priceAdult}</span>
          <span class="px-2.5 py-1 rounded-lg bg-line/50 font-semibold">⏱️ ${t("loc_duration", { n: l.duration_min || "?" })}</span>
          <span class="px-2.5 py-1 rounded-lg bg-line/50 font-semibold">${escapeHtml(cityL)}</span>
        </div>
      </div>
    </button>
  </li>`;
}

function closedToday_(l) {
  if (!l.closed_days || !l.closed_days.length) return false;
  const day = new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
  return l.closed_days.includes(day);
}

// ------------------------- Location modal (hero + swipe + language-aware) -------------------------
function openLocModal(slug, list) {
  // Default list: current filtered Explore matches, or all locations
  const activeList = list || state.currentMatches || state.locations;
  const idx = activeList.findIndex((x) => x.slug === slug);
  if (idx < 0) return;
  state.modalList = activeList;
  state.modalIndex = idx;
  renderModalContent();
  const modal = document.getElementById("loc-modal");
  modal.classList.remove("hidden");
  // Attach swipe once
  if (!modal.__swipeAttached) {
    const swipeEl = document.getElementById("loc-modal-swipe");
    attachSwipe(swipeEl, {
      threshold: 80,
      onMove: (dx, progress) => {
        swipeEl.style.transition = "none";
        swipeEl.style.transform = `translateX(${dx}px)`;
        swipeEl.style.opacity = String(1 - progress * 0.25);
      },
      onSwipeLeft: () => pageModal(+1),
      onSwipeRight: () => pageModal(-1),
      onCancel: () => {
        swipeEl.style.transition = "transform .22s ease-out, opacity .22s";
        swipeEl.style.transform = "translateX(0)";
        swipeEl.style.opacity = "1";
      },
    });
    modal.__swipeAttached = true;
  }
}
function closeLocModal() {
  const modal = document.getElementById("loc-modal");
  modal.classList.add("hidden");
  const swipeEl = document.getElementById("loc-modal-swipe");
  if (swipeEl) {
    swipeEl.style.transition = "none";
    swipeEl.style.transform = "translateX(0)";
    swipeEl.style.opacity = "1";
  }
}
function pageModal(delta) {
  const list = state.modalList;
  if (!list || list.length === 0) return;
  const n = (state.modalIndex + delta + list.length) % list.length;
  const swipeEl = document.getElementById("loc-modal-swipe");
  const dir = delta > 0 ? -1 : 1;
  swipeEl.style.transition = "transform .22s ease-in, opacity .22s";
  swipeEl.style.transform = `translateX(${dir * -100}%)`;
  swipeEl.style.opacity = "0";
  setTimeout(() => {
    state.modalIndex = n;
    swipeEl.style.transition = "none";
    swipeEl.style.transform = `translateX(${dir * 100}%)`;
    renderModalContent();
    requestAnimationFrame(() => {
      swipeEl.style.transition = "transform .25s ease-out, opacity .25s";
      swipeEl.style.transform = "translateX(0)";
      swipeEl.style.opacity = "1";
      // Reset scroll to top of content
      document.getElementById("loc-modal-scroll")?.scrollTo({ top: 0 });
    });
  }, 220);
}

function renderModalContent() {
  const list = state.modalList;
  const l = list[state.modalIndex];
  if (!l) return;
  const body = document.getElementById("loc-modal-body");
  const name = locText(l, "name") || l.name_nl || "";
  const tagline = locText(l, "tagline");
  const description = locText(l, "description");
  const tips = locList(l, "tips");
  const warnings = locList(l, "warnings");
  const addressNl = locText(l, "address");
  const addressZh = l.address_zh || "";
  const photo = l.photo_url || placeholderFor(l.category);
  const inPlan = state.items.some((i) => i.location_slug === l.slug);
  const priceAdult = l.price_adult_cny === 0 ? t("loc_free") : `¥${l.price_adult_cny ?? "?"}`;
  const priceSenior = l.price_senior_cny === 0 ? t("loc_free") : (l.price_senior_cny != null ? `¥${l.price_senior_cny}` : "—");
  const rating = Number(l.rating) || 0;
  const reviews = Number(l.review_count) || 0;
  const distKm = distanceFromHotel(l);
  const durStr = l.duration_min >= 120 ? t("loc_duration_hours", { h: Math.round(l.duration_min / 60) }) : t("loc_duration", { n: l.duration_min || "?" });
  const openHours = typeof l.opening_hours === "string" ? l.opening_hours : "";
  const pager = t("loc_pager", { cur: state.modalIndex + 1, total: list.length });

  const tagsHtml = (l.tags || []).map((x) => {
    const tl = labelFor(x, "tag") || x;
    return `<span class="px-2 py-1 rounded-full bg-line/50 text-sm">${escapeHtml(tl)}</span>`;
  }).join(" ");

  // Shopping-specific panels
  const shopsInside = Array.isArray(l.shops_inside) ? l.shops_inside : null;
  const floorGuide = l.floor_guide_nl; // only NL for now
  const shoppingTips = l.shopping_tips_nl;
  const bestFor = l.best_for_nl;

  const tipsHtml = tips.length ? `
    <section>
      <h3 class="text-[18px] font-bold mt-4 mb-2">${t("loc_tips")}</h3>
      <ul class="space-y-2 pl-5 list-disc text-[17px] leading-relaxed">
        ${tips.map((x) => `<li class="text-ink-700">${escapeHtml(x)}</li>`).join("")}
      </ul>
    </section>` : "";

  const warnHtml = warnings.length ? `
    <section>
      <h3 class="text-[18px] font-bold mt-4 mb-2 text-warn-700">${t("loc_warnings")}</h3>
      <ul class="space-y-2 pl-5 list-disc text-[17px] leading-relaxed">
        ${warnings.map((x) => `<li class="text-warn-700">${escapeHtml(x)}</li>`).join("")}
      </ul>
    </section>` : "";

  const shopsHtml = shopsInside ? `
    <section>
      <h3 class="text-[18px] font-bold mt-4 mb-2">🛍️ ${t("loc_shops_inside")}</h3>
      <ul class="space-y-2">
        ${shopsInside.slice(0, 20).map((s) => `
          <li class="p-3 rounded-xl bg-line/30">
            <div class="font-semibold text-[16px]">${escapeHtml(s.name || "")}</div>
            ${s.type ? `<div class="text-ink-500 text-sm">${escapeHtml(s.type)}</div>` : ""}
            ${s.note ? `<div class="text-ink-700 text-[15px] mt-1">${escapeHtml(s.note)}</div>` : ""}
          </li>`).join("")}
      </ul>
    </section>` : "";

  const floorHtml = floorGuide ? `
    <section>
      <h3 class="text-[18px] font-bold mt-4 mb-2">🗺️ ${t("loc_floor_guide")}</h3>
      <div class="p-3 rounded-xl bg-line/30 text-[15px] leading-relaxed whitespace-pre-wrap">${escapeHtml(floorGuide)}</div>
    </section>` : "";

  const shoppingTipsHtml = (Array.isArray(shoppingTips) && shoppingTips.length) ? `
    <section>
      <h3 class="text-[18px] font-bold mt-4 mb-2">💡 ${t("loc_shopping_tips")}</h3>
      <ul class="space-y-2 pl-5 list-disc text-[17px] leading-relaxed">
        ${shoppingTips.map((x) => `<li class="text-ink-700">${escapeHtml(x)}</li>`).join("")}
      </ul>
    </section>` : "";

  const bestForHtml = bestFor ? `
    <section>
      <h3 class="text-[18px] font-bold mt-4 mb-2">⭐ ${t("loc_best_for")}</h3>
      <div class="text-[17px] text-ink-700">${escapeHtml(bestFor)}</div>
    </section>` : "";

  const sources = (l.source_urls || []).slice(0, 3).map((u) => `<a class="text-trust-700 underline break-all text-sm" href="${escapeAttr(u)}" target="_blank" rel="noreferrer">${escapeHtml(shortUrl(u))}</a>`).join(" · ");

  body.innerHTML = `
    <!-- HERO -->
    <div class="relative aspect-[16/9] bg-line flex-shrink-0 skeleton-shimmer">
      <img src="${escapeAttr(photo)}" alt="" class="w-full h-full object-cover opacity-0 transition-opacity duration-300"
           onload="this.style.opacity=1; this.parentElement.classList.remove('skeleton-shimmer');"
           onerror="this.onerror=null; this.src='${escapeAttr(placeholderFor(l.category))}';" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30 pointer-events-none"></div>

      <button id="loc-modal-close-inner" class="absolute top-3 left-3 h-12 w-12 rounded-full bg-black/60 text-white text-2xl backdrop-blur focus-ring" aria-label="✕">✕</button>

      <!-- prev / next arrows -->
      ${list.length > 1 ? `
      <button data-modal-prev class="absolute top-1/2 -translate-y-1/2 left-3 h-12 w-12 rounded-full bg-black/60 text-white text-2xl backdrop-blur focus-ring flex items-center justify-center" aria-label="${t("loc_prev")}">‹</button>
      <button data-modal-next class="absolute top-1/2 -translate-y-1/2 right-3 h-12 w-12 rounded-full bg-black/60 text-white text-2xl backdrop-blur focus-ring flex items-center justify-center" aria-label="${t("loc_next")}">›</button>
      <div class="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 text-white text-sm font-semibold">${escapeHtml(pager)}</div>
      ` : ""}

      <span class="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/95 text-ink-900 text-sm font-semibold shadow-sm">${escapeHtml(labelFor(l.category, "category"))}</span>
    </div>

    <!-- SCROLLING BODY -->
    <div id="loc-modal-scroll" class="flex-1 overflow-y-auto">
      <div class="p-5 space-y-4">
        <header>
          <h1 id="loc-modal-title" class="text-[26px] font-bold leading-tight">${escapeHtml(name)}</h1>
          <p class="text-[20px] font-semibold text-ink-700" lang="zh-CN">${escapeHtml(l.name_zh || "")}</p>
          ${l.pinyin ? `<p class="text-[15px] italic text-ink-500">${escapeHtml(l.pinyin)}</p>` : ""}
          ${rating ? `
          <div class="mt-2 flex items-center gap-2 flex-wrap">
            ${starRating(rating)}
            <span class="text-[16px] font-semibold text-ink-900">${rating.toFixed(1).replace(".", state.lang === "zh" ? "." : ",")}</span>
            ${reviews ? `<span class="text-[14px] text-ink-500">${t("loc_rating_reviews", { n: reviews.toLocaleString() })}</span>` : ""}
          </div>` : ""}
          ${tagline ? `<p class="mt-3 text-[18px] text-ink-700 leading-snug">${escapeHtml(tagline)}</p>` : ""}
          ${tagsHtml ? `<div class="mt-3 flex gap-2 flex-wrap">${tagsHtml}</div>` : ""}
          ${closedToday_(l) ? `<div class="mt-3 p-3 rounded-xl bg-warn-100 text-warn-700 font-semibold">${t("loc_closed_today")}</div>` : ""}
          ${l.seasonal_notes_es && state.lang === "es" ? `<div class="mt-3 p-3 rounded-xl bg-accent-500/20 text-accent-800 text-[16px]">⚠ ${escapeHtml(l.seasonal_notes_es)}</div>` : (l.seasonal_notes ? `<div class="mt-3 p-3 rounded-xl bg-accent-500/20 text-accent-800 text-[16px]">⚠ ${escapeHtml(l.seasonal_notes)}</div>` : "")}
        </header>

        <!-- INFO GRID -->
        <dl class="grid grid-cols-2 gap-2">
          <div class="rounded-2xl bg-line/30 p-3">
            <dt class="text-xs text-ink-500 font-semibold uppercase tracking-wide">${t("loc_access")}</dt>
            <dd class="text-[18px] font-bold mt-0.5">💴 ${priceAdult}</dd>
            <dd class="text-sm text-ink-500">60+ · ${priceSenior}</dd>
          </div>
          <div class="rounded-2xl bg-line/30 p-3">
            <dt class="text-xs text-ink-500 font-semibold uppercase tracking-wide">${t("loc_duration_label")}</dt>
            <dd class="text-[18px] font-bold mt-0.5">⏱ ${durStr}</dd>
          </div>
          <div class="rounded-2xl bg-line/30 p-3">
            <dt class="text-xs text-ink-500 font-semibold uppercase tracking-wide">${t("loc_opening_label")}</dt>
            <dd class="text-[16px] font-bold mt-0.5 break-words">⏰ ${escapeHtml(openHours || "—")}</dd>
          </div>
          <div class="rounded-2xl bg-line/30 p-3">
            <dt class="text-xs text-ink-500 font-semibold uppercase tracking-wide">${t("loc_distance_label")}</dt>
            <dd class="text-[18px] font-bold mt-0.5">📍 ${distKm != null ? distKm + " km" : "—"}</dd>
            <dd class="text-sm text-ink-500">${t("loc_from_hotel")}</dd>
          </div>
        </dl>

        <!-- CHINESE ADDRESS -->
        ${addressZh || addressNl ? `
        <section>
          <h3 class="text-xs text-ink-500 font-semibold uppercase tracking-wide">${t("loc_show_chinese")}</h3>
          ${addressZh ? `<div class="mt-1 p-4 rounded-2xl bg-white border-2 border-brand-600 text-[24px] font-semibold text-center leading-snug" lang="zh-CN">${escapeHtml(addressZh)}</div>` : ""}
          ${addressNl ? `<p class="text-sm text-ink-500 mt-1">${escapeHtml(addressNl)}</p>` : ""}
          ${addressZh ? `<button class="mt-2 h-11 px-4 rounded-xl bg-trust-100 text-trust-700 font-semibold focus-ring" data-action="speak-zh" data-text="${escapeAttr(addressZh)}">🔊 ${t("loc_show_chinese")}</button>` : ""}
        </section>` : ""}

        ${description ? `<section><p class="text-[17px] leading-relaxed text-ink-900">${escapeHtml(description)}</p></section>` : ""}

        ${tipsHtml}
        ${warnHtml}
        ${bestForHtml}
        ${shopsHtml}
        ${floorHtml}
        ${shoppingTipsHtml}

        ${sources ? `<div class="mt-3 text-sm">${t("loc_source")}: ${sources}</div>` : ""}

        <!-- Hint: swipe to next -->
        ${list.length > 1 ? `<div class="text-center text-ink-500 text-sm py-3">${t("loc_swipe_hint")}</div>` : ""}

        <div class="h-6"></div>
      </div>
    </div>

    <!-- STICKY ACTION BAR -->
    <footer class="flex-shrink-0 bg-bg-card border-t border-line p-3 flex gap-2" style="padding-bottom: calc(12px + env(safe-area-inset-bottom));">
      <button class="flex-1 h-14 rounded-2xl btn-primary font-bold text-[17px] focus-ring active:scale-[0.98]"
              data-action="add-to-plan" data-slug="${l.slug}" ${inPlan ? "disabled" : ""}>
        ${inPlan ? `✓ ${t("loc_in_plan")}` : `+ ${t("loc_add_to_plan")}`}
      </button>
      <a class="h-14 w-14 rounded-2xl bg-trust-100 text-trust-700 text-2xl flex items-center justify-center focus-ring"
         href="https://www.openstreetmap.org/?mlat=${l.lat}&mlon=${l.lng}#map=17/${l.lat}/${l.lng}"
         target="_blank" rel="noreferrer" aria-label="${t("loc_open_map")}">🗺️</a>
    </footer>
  `;
  // Wire inner close + prev/next
  document.getElementById("loc-modal-close-inner")?.addEventListener("click", closeLocModal);
  body.querySelector("[data-modal-prev]")?.addEventListener("click", (e) => { e.stopPropagation(); pageModal(-1); });
  body.querySelector("[data-modal-next]")?.addEventListener("click", (e) => { e.stopPropagation(); pageModal(+1); });
}

function shortUrl(u) { try { return new URL(u).host; } catch { return u; } }

// ------------------------- Add-to-plan modal -------------------------
function openAddModal(slug) {
  const l = state.locations.find((x) => x.slug === slug);
  if (!l) return;
  const body = document.getElementById("add-modal-body");
  const name = locText(l, "name") || l.name_nl;
  body.innerHTML = `
    <div class="text-[22px] font-semibold mb-2">${escapeHtml(name)}</div>
    <label class="block text-sm text-ink-500 mb-1">${t("add_modal_choose_day")}</label>
    <select id="add-day" class="w-full h-12 rounded-xl border border-line bg-white text-[18px] focus-ring mb-3">
      ${CFG.DAYS.map((d) => `<option value="${d.date}" ${d.date === state.selectedDay ? "selected" : ""}>${short(d.date)} — ${escapeHtml(d["label_" + state.lang] || d.label_nl)}</option>`).join("")}
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
      added_by: who || "—", created_at: new Date().toISOString(),
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
  if (!("speechSynthesis" in window)) { alert("—"); return; }
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
document.getElementById("loc-modal-close")?.addEventListener("click", closeLocModal);
document.getElementById("loc-modal")?.addEventListener("click", (e) => {
  // close when clicking outside the swipe container
  if (e.target.id === "loc-modal") closeLocModal();
});
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
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeLocModal(); closeAddModal(); }
  if (e.key === "ArrowLeft" && !document.getElementById("loc-modal").classList.contains("hidden")) pageModal(-1);
  if (e.key === "ArrowRight" && !document.getElementById("loc-modal").classList.contains("hidden")) pageModal(+1);
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

  state.sync = new SyncClient(CFG, state);
  await state.sync.init();

  // login gate permanent uit
  document.getElementById("login-gate")?.classList.add("hidden");

  setTimeout(() => initMap(state.locations, CFG), 200);

  const hash = location.hash.replace("#", "").split(":");
  go(hash[0] || "home", hash[1]);

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  }
  setOnline(navigator.onLine);
})();
