import { db } from "../database";
import type { Lugar } from "@/types/domain";

type Tipo = "comida" | "hospedagem" | "turismo";

export const placesRepo = {
  list: (tipo: Tipo): Promise<Lugar[]> => {
    const table =
      tipo === "comida" ? db.gastronomia : tipo === "hospedagem" ? db.hospedagem : db.turismo;
    return table.orderBy("nome").toArray() as Promise<Lugar[]>;
  },
};
