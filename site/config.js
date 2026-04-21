// config.js — Reisgenoot China 2026
// Supabase is OPTIONAL. If URL/key are empty the app falls back to
// localStorage-only mode and nothing is synced between devices.
// Fill these in after running the Supabase setup (mcp__supabase__create_project).
window.APP_CONFIG = {
  // Trip metadata
  TRIP_CODE: "china2026",
  TRIP_START: "2026-04-25",
  TRIP_END: "2026-05-02",

  // Supabase (project: china-trip-2026, eu-west-1)
  SUPABASE_URL: "https://yjqyycnweeqtzxyyuulv.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqcXl5Y253ZWVxdHp4eXl1dWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MTc2MzksImV4cCI6MjA5MjI5MzYzOX0.D9Mkw_Vf6HFU_ZR9DgRX6Mmv4fzkW-_NAaevVGo7NUk",

  // Open-Meteo weather (no key needed)
  WEATHER_API: "https://api.open-meteo.com/v1/forecast",

  // Default city center
  DEFAULT_CITY: "beijing",

  // Hotel coordinates — update after booking
  HOTELS: {
    xian:    { name: "Xi'an hotel (nog in te vullen)", lat: 34.2503, lng: 108.9421 },
    beijing: { name: "Beijing hotel (nog in te vullen)", lat: 39.9042, lng: 116.4074 },
  },

  // Per-day city mapping
  DAYS: [
    { date: "2026-04-25", city: "xian",    label_nl: "Aankomst Xi'an",            label_es: "Llegada a Xi'an" },
    { date: "2026-04-26", city: "xian",    label_nl: "Terracotta Leger",         label_es: "Ejército de Terracota" },
    { date: "2026-04-27", city: "both",    label_nl: "Trein Xi'an → Beijing",    label_es: "Tren Xi'an → Pekín" },
    { date: "2026-04-28", city: "beijing", label_nl: "Verboden Stad",            label_es: "Ciudad Prohibida" },
    { date: "2026-04-29", city: "beijing", label_nl: "Chinese Muur (Mutianyu)",  label_es: "Gran Muralla" },
    { date: "2026-04-30", city: "beijing", label_nl: "Hutongs + Tempel v/d Hemel", label_es: "Hutongs + Templo del Cielo" },
    { date: "2026-05-01", city: "beijing", label_nl: "Zomerpaleis (⚠ 1 mei druk!)", label_es: "Palacio de Verano (⚠ 1 mayo)" },
    { date: "2026-05-02", city: "beijing", label_nl: "Wangfujing + vertrek",     label_es: "Wangfujing + salida" },
  ],
};
