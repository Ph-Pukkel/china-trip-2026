// map.js — Leaflet + OpenStreetMap. Cluster-less but category colors.

const COLORS = {
  museum: "#0E5A5E", monument: "#B4451F", tempel: "#9A5A00",
  restaurant: "#D39E3A", shopping: "#6B4A0F", park: "#1E6F4A",
  "lokale-ervaring": "#0E5A5E", "hutong/buurt": "#8E3414", markt: "#B01E24",
  viewpoint: "#1E6F4A", show: "#B01E24", avond: "#6B4A0F",
  "hidden-gem": "#D39E3A", fotospot: "#0E5A5E", "kunst-cultuur": "#8E3414",
  "historisch-site": "#B4451F",
};

let map, markersLayer;
let locationsAll = [];
let hotels = null;

export function initMap(locations, cfg) {
  if (!window.L || document.getElementById("map")._leaflet_id) return;
  locationsAll = locations;
  hotels = cfg.HOTELS;

  map = L.map("map", { zoomControl: true, attributionControl: true })
    .setView([39.9042, 116.4074], 11);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  markersLayer = L.layerGroup().addTo(map);
  window.__map = map;
  window.__mapSwitchCity = switchCity;
  // default: Beijing
  switchCity(cfg.DEFAULT_CITY || "beijing");
}

function switchCity(city) {
  if (!map) return;
  markersLayer.clearLayers();

  const items = locationsAll.filter((l) => city === "all" ? true : l.city === city);
  items.forEach((l) => {
    if (typeof l.lat !== "number" || typeof l.lng !== "number") return;
    const color = COLORS[l.category] || "#B4451F";
    const icon = L.divIcon({
      className: "",
      html: `<div style="background:${color};color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:700;box-shadow:0 2px 6px rgba(0,0,0,.25);border:2px solid white;">${iconFor(l.category)}</div>`,
      iconSize: [28, 28], iconAnchor: [14, 14],
    });
    const m = L.marker([l.lat, l.lng], { icon }).addTo(markersLayer);
    m.bindPopup(`
      <div style="min-width:200px">
        <div style="font-weight:700;font-size:16px">${escapeHtml(l.name_nl || "")}</div>
        <div style="color:#6F6055;font-size:14px">${escapeHtml(l.name_zh || "")}</div>
        <button onclick="document.dispatchEvent(new CustomEvent('open-loc-from-map', { detail: '${l.slug}' }))"
                style="margin-top:8px;background:#B4451F;color:#FAF6EF;padding:6px 10px;border-radius:8px;border:none;font-weight:600;cursor:pointer">Details</button>
      </div>
    `);
  });

  // hotels
  if (hotels && city !== "all") {
    const h = hotels[city === "both" ? "beijing" : city];
    if (h) {
      const hi = L.divIcon({
        className: "",
        html: `<div style="background:#1A1613;color:white;border-radius:8px;padding:3px 6px;font-weight:700;font-size:12px;box-shadow:0 2px 6px rgba(0,0,0,.3)">🏨 Hotel</div>`,
        iconAnchor: [20, 10],
      });
      L.marker([h.lat, h.lng], { icon: hi }).addTo(markersLayer).bindPopup(escapeHtml(h.name));
    }
  }

  // fit bounds
  if (items.length) {
    const b = L.latLngBounds(items.filter((l) => l.lat && l.lng).map((l) => [l.lat, l.lng]));
    if (b.isValid()) map.fitBounds(b, { padding: [30, 30] });
  }
}

function iconFor(cat) {
  const map = { museum: "🏛", monument: "🏯", tempel: "⛩", restaurant: "🍜",
    shopping: "🛍", park: "🌳", "lokale-ervaring": "🧧", "hutong/buurt": "🏘",
    markt: "🎪", viewpoint: "⛰", show: "🎭", avond: "🌙",
    "hidden-gem": "💎", fotospot: "📸", "kunst-cultuur": "🎨", "historisch-site": "🏛",
  };
  return map[cat] || "📍";
}

document.addEventListener("open-loc-from-map", (e) => {
  // delegate to app.js via click-simulation
  const el = document.querySelector(`[data-action="open-loc"][data-slug="${e.detail}"]`);
  if (el) el.click();
  else {
    // trigger directly via custom event
    const btn = document.createElement("button");
    btn.setAttribute("data-action", "open-loc");
    btn.setAttribute("data-slug", e.detail);
    document.body.appendChild(btn);
    btn.click();
    btn.remove();
  }
});

function escapeHtml(s) { return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
