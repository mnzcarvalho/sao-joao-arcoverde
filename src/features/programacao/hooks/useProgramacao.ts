import { useLiveQuery } from "dexie-react-hooks";
import { programacaoRepo } from "@/db/repositories/programacaoRepo";
import type { Show } from "@/types/domain";

export function useProgramacao(): Show[] {
  return useLiveQuery(() => programacaoRepo.list(), [], []) ?? [];
}

export function useProgramacaoPorPolo(poloId: string | undefined): Show[] {
  return useLiveQuery(
    () => (poloId ? programacaoRepo.byPolo(poloId) : Promise.resolve([])),
    [poloId],
    []
  ) ?? [];
}
