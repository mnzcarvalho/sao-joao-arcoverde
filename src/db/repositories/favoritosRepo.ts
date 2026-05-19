import { db } from "../database";
import type { Favorito } from "@/types/domain";

export const favoritosRepo = {
  list: () => db.favoritos.orderBy("createdAt").reverse().toArray() as Promise<Favorito[]>,
  has: async (id: string) => (await db.favoritos.get(id)) != null,
  toggle: async (id: string, tipo: Favorito["tipo"]) => {
    const existing = await db.favoritos.get(id);
    if (existing) {
      await db.favoritos.delete(id);
      return false;
    }
    await db.favoritos.put({ id, tipo, createdAt: Date.now() });
    return true;
  },
  byTipo: (tipo: Favorito["tipo"]) =>
    db.favoritos.where("tipo").equals(tipo).toArray() as Promise<Favorito[]>,
};
