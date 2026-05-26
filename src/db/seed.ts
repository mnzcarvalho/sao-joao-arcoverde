import polosJson from "@/data/polos.json";
import programacaoJson from "@/data/programacao.json";
import gastronomiaJson from "@/data/gastronomia.json";
import hospedagemJson from "@/data/hospedagem.json";
import turismoJson from "@/data/turismo.json";
import historiaJson from "@/data/historia.json";

import { db } from "./database";
import { metaRepo } from "./repositories/metaRepo";
import { HistoriaSchema, LugarSchema, PoloSchema, ShowSchema } from "@/types/domain";

const SEED_VERSION = 3;
const SEED_KEY = "seedVersion";

/**
 * Seeds bundled JSON into IndexedDB on first run (or when SEED_VERSION bumps).
 * Validates each record with Zod before insertion.
 */
export async function seedIfNeeded(): Promise<void> {
  const current = await metaRepo.get<number>(SEED_KEY);
  if (current === SEED_VERSION) return;

  const polos = polosJson.map((p) => PoloSchema.parse(p));
  const programacao = programacaoJson.map((s) => ShowSchema.parse(s));
  const gastronomia = gastronomiaJson.map((l) => LugarSchema.parse(l));
  const hospedagem = hospedagemJson.map((l) => LugarSchema.parse(l));
  const turismo = turismoJson.map((l) => LugarSchema.parse(l));
  const historia = HistoriaSchema.parse(historiaJson);

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
    }
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
    }
  );
}
