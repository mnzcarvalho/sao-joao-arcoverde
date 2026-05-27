import { useEffect, useState, useCallback } from "react";
import { favoritosRepo } from "@/db/repositories/favoritosRepo";
import { programacaoRepo } from "@/db/repositories/programacaoRepo";
import type { Favorito, Show } from "@/types/domain";

export function useFavoritos(): Favorito[] {
  const [data, setData] = useState<Favorito[]>([]);
  const refresh = useCallback(() => {
    favoritosRepo.list().then(setData).catch(() => setData([]));
  }, []);
  useEffect(() => { refresh(); }, [refresh]);
  return data;
}

export function useIsFavorito(id: string): boolean {
  const [data, setData] = useState(false);
  useEffect(() => {
    favoritosRepo.has(id).then(setData).catch(() => setData(false));
  }, [id]);
  return data;
}

export function useShowsFavoritos(): Show[] {
  const [data, setData] = useState<Show[]>([]);
  useEffect(() => {
    (async () => {
      const favs = await favoritosRepo.byTipo("show");
      if (!favs.length) { setData([]); return; }
      const shows = await programacaoRepo.byIds(favs.map((f) => f.id));
      setData(shows);
    })().catch(() => setData([]));
  }, []);
  return data;
}

export const toggleFavorito = (id: string, tipo: Favorito["tipo"] = "show") =>
  favoritosRepo.toggle(id, tipo);