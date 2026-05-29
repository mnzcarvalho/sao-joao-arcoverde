import { useEffect, useState, useCallback } from "react";
import { favoritosRepo } from "@/db/repositories/favoritosRepo";
import { programacaoRepo } from "@/db/repositories/programacaoRepo";
import type { Favorito, Show } from "@/types/domain";

const listeners: Set<() => void> = new Set();

const notify = () => listeners.forEach((l) => l());

export function useFavoritos(): Favorito[] {
  const [data, setData] = useState<Favorito[]>([]);
  const refresh = useCallback(() => {
    favoritosRepo
      .list()
      .then(setData)
      .catch(() => setData([]));
  }, []);
  useEffect(() => {
    refresh();
    const sub = () => refresh();
    listeners.add(sub);
    return () => {
      listeners.delete(sub);
    };
  }, [refresh]);
  return data;
}

export function useIsFavorito(id: string): boolean {
  const [data, setData] = useState(false);
  const check = useCallback(() => {
    favoritosRepo
      .has(id)
      .then(setData)
      .catch(() => setData(false));
  }, [id]);
  useEffect(() => {
    check();
    const sub = () => check();
    listeners.add(sub);
    return () => {
      listeners.delete(sub);
    };
  }, [check]);
  return data;
}

export function useShowsFavoritos(): Show[] {
  const [data, setData] = useState<Show[]>([]);
  const load = useCallback(async () => {
    try {
      const favs = await favoritosRepo.byTipo("show");
      if (!favs.length) {
        setData([]);
        return;
      }
      const shows = await programacaoRepo.byIds(favs.map((f) => f.id));
      setData(shows);
    } catch {
      setData([]);
    }
  }, []);
  useEffect(() => {
    load();
    const sub = () => load();
    listeners.add(sub);
    return () => {
      listeners.delete(sub);
    };
  }, [load]);
  return data;
}

export const toggleFavorito = async (id: string, tipo: Favorito["tipo"] = "show") => {
  await favoritosRepo.toggle(id, tipo);
  notify();
};
