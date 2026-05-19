import { db } from "../database";
import type { Polo } from "@/types/domain";

export const polosRepo = {
  list: () => db.polos.orderBy("nome").toArray() as Promise<Polo[]>,
  get: (id: string) => db.polos.get(id),
};
