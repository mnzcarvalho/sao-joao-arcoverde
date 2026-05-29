import { useEffect, useState } from "react";
import { placesRepo } from "@/db/repositories/placesRepo";
import type { Lugar } from "@/types/domain";

export function useLugares(tipo: "comida" | "hospedagem" | "turismo"): Lugar[] {
  const [data, setData] = useState<Lugar[]>([]);
  useEffect(() => {
    placesRepo
      .list(tipo)
      .then(setData)
      .catch(() => setData([]));
  }, [tipo]);
  return data;
}
