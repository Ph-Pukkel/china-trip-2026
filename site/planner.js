// planner.js — drag-to-reorder itinerary list

export function initPlanner({ listEl, items, locations, t, lang, onReorder, onRemove, onToggleStatus, onOpenLoc }) {
  listEl.innerHTML = items.length
    ? items.map((it) => itemHtml(it, locations, t, lang)).join("")
    : `<li class="text-ink-500 text-center py-10">${t("today_empty")}</li>`;

  // drag-and-drop
  if (items.length && window.Sortable) {
    window.Sortable.create(listEl, {
      animation: 160,
      handle: ".drag-handle",
      ghostClass: "ghost-item",
      chosenClass: "chosen",
      onEnd: (evt) => {
        const ids = [...listEl.children].map((li) => li.getAttribute("data-id")).filter(Boolean);
        onReorder(ids);
      },
    });
  }

  // click handlers
  listEl.addEventListener("click", (e) => {
    const rm = e.target.closest("[data-rm]");
    if (rm) {
      if (confirm(t("confirm_delete"))) onRemove(rm.getAttribute("data-rm"));
      return;
    }
    const done = e.target.closest("[data-done]");
    if (done) { onToggleStatus(done.getAttribute("data-done")); return; }
    const loc = e.target.closest("[data-loc]");
    if (loc) { onOpenLoc(loc.getAttribute("data-loc")); return; }
  }, { once: false });
}

function itemHtml(it, locations, t, lang) {
  const loc = locations.find((l) => l.slug === it.location_slug);
  const title = it.custom_title || loc?.[`name_${lang}`] || loc?.name_nl || "—";
  const addr = loc?.address_nl || "";
  const tm = it.start_time ? it.start_time.slice(0, 5) : "—";
  const done = it.status === "done";
  return `
  <li class="bg-bg-card rounded-2xl border ${done ? "border-success-700" : "border-line"} p-3 flex gap-3 items-stretch" data-id="${it.id}">
    <button class="drag-handle w-10 flex items-center justify-center text-ink-500 text-xl" aria-label="Verslepen">⋮⋮</button>
    <div class="flex-1 min-w-0">
      <div class="flex items-start justify-between gap-2">
        <div>
          <div class="text-lg font-semibold ${done ? "line-through text-ink-500" : ""}">
            ${loc ? `<button data-loc="${loc.slug}" class="underline-offset-2 hover:underline">${escape(title)}</button>` : escape(title)}
          </div>
          <div class="text-ink-700">${tm} · ${escape(addr)}</div>
          ${it.notes ? `<div class="text-sm text-ink-500 italic mt-1">📝 ${escape(it.notes)}</div>` : ""}
          ${it.added_by ? `<div class="text-sm text-ink-500 mt-1">${t("today_added_by", { name: escape(it.added_by) })}</div>` : ""}
        </div>
        <div class="flex flex-col gap-1">
          <button data-done="${it.id}" class="h-9 w-9 rounded-full ${done ? "bg-success-100 text-success-700" : "bg-line/40"} font-bold focus-ring" aria-label="Markeer als gedaan">✓</button>
          <button data-rm="${it.id}" class="h-9 w-9 rounded-full bg-danger-100 text-danger-700 font-bold focus-ring" aria-label="Verwijder">✕</button>
        </div>
      </div>
    </div>
  </li>`;
}

function escape(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
