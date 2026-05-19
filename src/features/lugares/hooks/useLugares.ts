import { useLiveQuery } from "dexie-react-hooks";
import { placesRepo } from "@/db/repositories/placesRepo";
import type { Lugar } from "@/types/domain";

export function useLugares(tipo: "comida" | "hospedagem" | "turismo"): Lugar[] {
  return useLiveQuery(() => placesRepo.list(tipo), [tipo], []) ?? [];
}
