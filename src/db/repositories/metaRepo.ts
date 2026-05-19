import { db } from "../database";

export const metaRepo = {
  async get<T = unknown>(key: string): Promise<T | undefined> {
    const row = await db.meta.get(key);
    return row?.value as T | undefined;
  },
  async set<T = unknown>(key: string, value: T): Promise<void> {
    await db.meta.put({ key, value });
  },
};
