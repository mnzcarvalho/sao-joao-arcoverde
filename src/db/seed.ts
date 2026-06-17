import polosJson from "@/data/polos.json";
import programacaoJson from "@/data/programacao.json";
import gastronomiaJson from "@/data/gastronomia.json";
import hospedagemJson from "@/data/hospedagem.json";
import turismoJson from "@/data/turismo.json";
import historiaJson from "@/data/historia.json";

import { db } from "./database";
import { metaRepo } from "./repositories/metaRepo";
import { z } from "zod";
import { HistoriaSchema, LugarSchema, PoloSchema, ShowSchema } from "@/types/domain";

function safeParse<T>(schema: z.ZodSchema<T>, items: unknown[], label: string): T[] {
  return items
    .map((item, i) => {
      const result = schema.safeParse(item);
      if (!result.success) {
        console.warn(`[seed] ${label}[${i}] invalid, skipping:`, result.error.issues);
        return null;
      }
      return result.data;
    })
    .filter(Boolean) as T[];
}

const SEED_VERSION = 9;
const SEED_KEY = "seedVersion";

/**
 * Seeds bundled JSON into IndexedDB on first run (or when SEED_VERSION bumps).
 * Validates each record with Zod before insertion. Invalid records are skipped.
 */
export async function seedIfNeeded(): Promise<void> {
  const current = await metaRepo.get<number>(SEED_KEY);
  if (current === SEED_VERSION) return;

  const polos = safeParse(PoloSchema, polosJson, "polos");
  const programacao = safeParse(ShowSchema, programacaoJson, "programacao");
  const gastronomia = safeParse(LugarSchema, gastronomiaJson, "gastronomia");
  const hospedagem = safeParse(LugarSchema, hospedagemJson, "hospedagem");
  const turismo = safeParse(LugarSchema, turismoJson, "turismo");

  let historia: z.infer<typeof HistoriaSchema> = {
    sobreCidade: "",
    sobreSaoJoao: "",
    curiosidades: [],
  };
  try {
    historia = HistoriaSchema.parse(historiaJson);
  } catch (e) {
    console.warn("[seed] historia invalid, using defaults:", e);
  }

  await db.transaction(
    "rw",
    [db.polos, db.programacao, db.gastronomia, db.hospedagem, db.turismo, db.meta],
    async () => {
      await Promise.all([
        db.polos.clear(),
        db.programacao.clear(),
        db.gastronomia.clear(),
        db.hospedagem.clear(),
        db.turismo.clear(),
      ]);
      await db.polos.bulkPut(polos);
      await db.programacao.bulkPut(programacao);
      await db.gastronomia.bulkPut(gastronomia);
      await db.hospedagem.bulkPut(hospedagem);
      await db.turismo.bulkPut(turismo);
      await metaRepo.set("historia", historia);
      await metaRepo.set("seededAt", new Date().toISOString());
      await metaRepo.set(SEED_KEY, SEED_VERSION);
    },
  );
}

/** Force re-seed (used by "Atualizar dados" button). */
export async function reseed(): Promise<void> {
  await metaRepo.set(SEED_KEY, 0);
  await seedIfNeeded();
}

/** Wipe everything except meta. */
export async function clearAll(): Promise<void> {
  await db.transaction(
    "rw",
    [db.polos, db.programacao, db.gastronomia, db.hospedagem, db.turismo, db.favoritos, db.meta],
    async () => {
      await Promise.all([
        db.polos.clear(),
        db.programacao.clear(),
        db.gastronomia.clear(),
        db.hospedagem.clear(),
        db.turismo.clear(),
        db.favoritos.clear(),
        db.meta.clear(),
      ]);
    },
  );
}
