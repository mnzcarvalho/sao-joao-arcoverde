import { useLiveQuery } from "dexie-react-hooks";
import { metaRepo } from "@/db/repositories/metaRepo";
import type { Historia } from "@/types/domain";

export function useHistoria(): Historia | undefined {
  return useLiveQuery(() => metaRepo.get<Historia>("historia"), []);
}

export function useSeededAt(): string | undefined {
  return useLiveQuery(() => metaRepo.get<string>("seededAt"), []);
}
