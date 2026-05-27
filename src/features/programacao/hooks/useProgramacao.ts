import { useEffect, useState } from "react";
import { programacaoRepo } from "@/db/repositories/programacaoRepo";
import type { Show } from "@/types/domain";

export function useProgramacao(): Show[] {
  const [data, setData] = useState<Show[]>([]);
  useEffect(() => {
    programacaoRepo.list().then(setData).catch(() => setData([]));
  }, []);
  return data;
}

export function useProgramacaoPorPolo(poloId: string | undefined): Show[] {
  const [data, setData] = useState<Show[]>([]);
  useEffect(() => {
    if (!poloId) { setData([]); return; }
    programacaoRepo.byPolo(poloId).then(setData).catch(() => setData([]));
  }, [poloId]);
  return data;
}