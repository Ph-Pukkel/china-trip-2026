// supabase-client.js — Realtime sync for Reisgenoot China 2026
// Falls back to localStorage-only mode if no URL/key are configured.

const LS_QUEUE = "sync_queue_v1";

export class SyncClient {
  constructor(cfg, state) {
    this.cfg = cfg;
    this.state = state;
    this.sb = null;
    this.enabled = false;
    this.queue = JSON.parse(localStorage.getItem(LS_QUEUE) || "[]");
  }

  async init() {
    if (!this.cfg.SUPABASE_URL || !this.cfg.SUPABASE_ANON_KEY) {
      console.info("Supabase not configured — using localStorage only.");
      return;
    }
    // wait for supabase global
    if (!window.supabase) {
      await new Promise((r) => {
        const t = setInterval(() => {
          if (window.supabase) { clearInterval(t); r(); }
        }, 50);
      });
    }
    try {
      this.sb = window.supabase.createClient(this.cfg.SUPABASE_URL, this.cfg.SUPABASE_ANON_KEY);
      this.enabled = true;
      await this.pullAll();
      this.subscribe();
      this.flushQueue();
    } catch (e) {
      console.warn("Supabase init failed, running offline:", e);
    }
  }

  async pullAll() {
    if (!this.enabled) return;
    const tc = this.cfg.TRIP_CODE;
    try {
      const { data: items } = await this.sb.from("trip_items").select("*").eq("trip_code", tc);
      if (items) {
        // Merge server state with local
        const local = new Map(this.state.items.map((i) => [i.id, i]));
        items.forEach((i) => local.set(i.id, i));
        this.state.items = [...local.values()];
        localStorage.setItem("items", JSON.stringify(this.state.items));
      }
      const { data: diary } = await this.sb.from("diary_entries").select("*").eq("trip_code", tc);
      if (diary) {
        this.state.diary = diary;
        localStorage.setItem("diary", JSON.stringify(diary));
      }
    } catch (e) {
      console.warn("pullAll failed:", e);
    }
  }

  subscribe() {
    if (!this.enabled) return;
    const tc = this.cfg.TRIP_CODE;
    this.sb
      .channel(`trip-${tc}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "trip_items", filter: `trip_code=eq.${tc}` }, (p) => {
        this._handleItemEvent(p);
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "diary_entries", filter: `trip_code=eq.${tc}` }, (p) => {
        this._handleDiaryEvent(p);
      })
      .subscribe();
  }

  _handleItemEvent(p) {
    const row = p.new || p.old;
    if (p.eventType === "DELETE") {
      this.state.items = this.state.items.filter((x) => x.id !== row.id);
    } else {
      const i = this.state.items.findIndex((x) => x.id === row.id);
      if (i >= 0) this.state.items[i] = row; else this.state.items.push(row);
    }
    localStorage.setItem("items", JSON.stringify(this.state.items));
    // trigger re-render if on active screens
    document.dispatchEvent(new CustomEvent("sync:items-changed"));
    if (window.__state?.currentScreen === "today") document.getElementById("day-tabs")?.click?.();
  }
  _handleDiaryEvent(p) {
    const row = p.new || p.old;
    if (p.eventType === "DELETE") {
      this.state.diary = this.state.diary.filter((x) => x.id !== row.id);
    } else {
      const i = this.state.diary.findIndex((x) => x.id === row.id);
      if (i >= 0) this.state.diary[i] = row; else this.state.diary.push(row);
    }
    localStorage.setItem("diary", JSON.stringify(this.state.diary));
  }

  _enqueue(op) {
    this.queue.push(op);
    localStorage.setItem(LS_QUEUE, JSON.stringify(this.queue));
  }

  async flushQueue() {
    if (!this.enabled || !navigator.onLine) return;
    const q = [...this.queue];
    this.queue = [];
    localStorage.setItem(LS_QUEUE, JSON.stringify(this.queue));
    for (const op of q) {
      try { await this._exec(op); } catch (e) { this.queue.push(op); }
    }
    localStorage.setItem(LS_QUEUE, JSON.stringify(this.queue));
  }

  async _exec(op) {
    if (op.type === "add") return this.sb.from("trip_items").insert(op.row);
    if (op.type === "update") return this.sb.from("trip_items").update(op.row).eq("id", op.row.id);
    if (op.type === "delete") return this.sb.from("trip_items").delete().eq("id", op.id);
    if (op.type === "diary") return this.sb.from("diary_entries").upsert(op.row, { onConflict: "id" });
  }

  // Public API used by app.js
  async add(row) {
    if (!this.enabled) return;
    const op = { type: "add", row };
    try { await this._exec(op); } catch { this._enqueue(op); }
  }
  async update(row) {
    if (!this.enabled) return;
    const op = { type: "update", row };
    try { await this._exec(op); } catch { this._enqueue(op); }
  }
  async remove(id) {
    if (!this.enabled) return;
    const op = { type: "delete", id };
    try { await this._exec(op); } catch { this._enqueue(op); }
  }
  async upsertDiary(row) {
    if (!row) return;
    if (!this.enabled) return;
    const op = { type: "diary", row };
    try { await this._exec(op); } catch { this._enqueue(op); }
  }
}
