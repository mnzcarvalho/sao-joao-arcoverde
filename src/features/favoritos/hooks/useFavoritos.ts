import { useLiveQuery } from "dexie-react-hooks";
import { favoritosRepo } from "@/db/repositories/favoritosRepo";
import { programacaoRepo } from "@/db/repositories/programacaoRepo";
import type { Favorito, Show } from "@/types/domain";

export function useFavoritos(): Favorito[] {
  return useLiveQuery(() => favoritosRepo.list(), [], []) ?? [];
}

export function useIsFavorito(id: string): boolean {
  return useLiveQuery(() => favoritosRepo.has(id), [id], false) ?? false;
}

export function useShowsFavoritos(): Show[] {
  return (
    useLiveQuery(async () => {
      const favs = await favoritosRepo.byTipo("show");
      if (!favs.length) return [];
      return programacaoRepo.byIds(favs.map((f) => f.id));
    }, [], []) ?? []
  );
}

export const toggleFavorito = (id: string, tipo: Favorito["tipo"] = "show") =>
  favoritosRepo.toggle(id, tipo);
