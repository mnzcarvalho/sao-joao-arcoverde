// Offline-first store: seed from bundled data on first run, then read from localStorage.
import * as seed from "./data";

const KEY = "sjarcoverde:data:v1";

export type AppData = {
  polos: typeof seed.polos;
  programacao: typeof seed.programacao;
  gastronomia: typeof seed.gastronomia;
  hospedagem: typeof seed.hospedagem;
  turismo: typeof seed.turismo;
  sobreCidade: string;
  sobreSaoJoao: string;
  cachedAt: string;
};

function bundled(): AppData {
  return {
    polos: seed.polos,
    programacao: seed.programacao,
    gastronomia: seed.gastronomia,
    hospedagem: seed.hospedagem,
    turismo: seed.turismo,
    sobreCidade: seed.sobreCidade,
    sobreSaoJoao: seed.sobreSaoJoao,
    cachedAt: new Date().toISOString(),
  };
}

export function loadData(): AppData {
  if (typeof window === "undefined") return bundled();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as AppData;
  } catch {}
  const data = bundled();
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
  return data;
}

export function refreshData(): AppData {
  const data = bundled();
  if (typeof window !== "undefined") {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {}
  }
  return data;
}

export function clearData() {
  if (typeof window !== "undefined") {
    try { localStorage.removeItem(KEY); } catch {}
  }
}

// Favorites
const FAV_KEY = "sjarcoverde:favs:v1";
export function getFavs(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(FAV_KEY) || "[]"); } catch { return []; }
}
export function toggleFav(id: string): string[] {
  const cur = getFavs();
  const next = cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id];
  try { localStorage.setItem(FAV_KEY, JSON.stringify(next)); } catch {}
  return next;
}
