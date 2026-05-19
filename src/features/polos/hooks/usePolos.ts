import { useLiveQuery } from "dexie-react-hooks";
import { polosRepo } from "@/db/repositories/polosRepo";
import type { Polo } from "@/types/domain";

export function usePolos(): Polo[] {
  return useLiveQuery(() => polosRepo.list(), [], []) ?? [];
}

export function usePolo(id: string | undefined): Polo | undefined {
  return useLiveQuery(async () => (id ? await polosRepo.get(id) : undefined), [id]);
}
