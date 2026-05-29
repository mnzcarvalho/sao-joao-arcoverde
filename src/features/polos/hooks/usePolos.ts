import { useEffect, useState } from "react";
import { polosRepo } from "@/db/repositories/polosRepo";
import type { Polo } from "@/types/domain";

export function usePolos(): Polo[] {
  const [data, setData] = useState<Polo[]>([]);
  useEffect(() => {
    polosRepo
      .list()
      .then(setData)
      .catch(() => setData([]));
  }, []);
  return data;
}

export function usePolo(id: string | undefined): Polo | undefined {
  const [data, setData] = useState<Polo | undefined>(undefined);
  useEffect(() => {
    if (!id) {
      setData(undefined);
      return;
    }
    polosRepo
      .get(id)
      .then(setData)
      .catch(() => setData(undefined));
  }, [id]);
  return data;
}
