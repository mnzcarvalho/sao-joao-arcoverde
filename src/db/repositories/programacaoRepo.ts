import { db } from "../database";
import type { Show } from "@/types/domain";

export const programacaoRepo = {
  list: () => db.programacao.orderBy("data").toArray() as Promise<Show[]>,
  byPolo: (poloId: string) => db.programacao.where("polo").equals(poloId).toArray() as Promise<Show[]>,
  byIds: (ids: string[]) => db.programacao.where("id").anyOf(ids).toArray() as Promise<Show[]>,
};
