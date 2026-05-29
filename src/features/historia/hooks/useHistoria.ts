import { useEffect, useState } from "react";
import { metaRepo } from "@/db/repositories/metaRepo";
import type { Historia } from "@/types/domain";

export function useHistoria(): Historia | undefined {
  const [data, setData] = useState<Historia | undefined>(undefined);
  useEffect(() => {
    metaRepo
      .get<Historia>("historia")
      .then(setData)
      .catch(() => setData(undefined));
  }, []);
  return data;
}

export function useSeededAt(): string | undefined {
  const [data, setData] = useState<string | undefined>(undefined);
  useEffect(() => {
    metaRepo
      .get<string>("seededAt")
      .then(setData)
      .catch(() => setData(undefined));
  }, []);
  return data;
}
