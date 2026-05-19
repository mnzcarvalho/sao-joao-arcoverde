import Dexie, { type Table } from "dexie";
import type { Favorito, Lugar, MetaEntry, Polo, Show } from "@/types/domain";

/**
 * SJArcoverde IndexedDB — Dexie schema v1.
 * All persistent app data lives here (offline-first, no localStorage for data).
 */
export class SJArcoverdeDB extends Dexie {
  polos!: Table<Polo, string>;
  programacao!: Table<Show, string>;
  gastronomia!: Table<Lugar, string>;
  hospedagem!: Table<Lugar, string>;
  turismo!: Table<Lugar, string>;
  favoritos!: Table<Favorito, string>;
  meta!: Table<MetaEntry, string>;

  constructor() {
    super("sjarcoverde");
    this.version(1).stores({
      polos: "id, nome",
      programacao: "id, data, polo, artista",
      gastronomia: "id, nome",
      hospedagem: "id, nome",
      turismo: "id, nome",
      favoritos: "id, tipo, createdAt",
      meta: "key",
    });
  }
}

export const db = new SJArcoverdeDB();
