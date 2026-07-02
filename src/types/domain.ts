import { z } from "zod";

export const PoloSchema = z.object({
  id: z.string(),
  nome: z.string(),
  nomeCurto: z.string().optional(),
  descricao: z.string(),
  endereco: z.string(),
  horario: z.string(),
});
export type Polo = z.infer<typeof PoloSchema>;

export const ShowSchema = z.object({
  id: z.string(),
  data: z.string(), // YYYY-MM-DD
  hora: z.string().optional().default(""),
  artista: z.string(),
  polo: z.string(),
  genero: z.string().optional().default(""),
  imagem: z.string().optional().default(""),
});
export type Show = z.infer<typeof ShowSchema>;

export const LugarSchema = z.object({
  id: z.string(),
  nome: z.string(),
  tipo: z.enum(["comida", "hospedagem", "turismo"]),
  descricao: z.string(),
  endereco: z.string(),
  contato: z.string().optional(),
  linkMaps: z.string().optional(),
  imagem: z.string().optional(),
});
export type Lugar = z.infer<typeof LugarSchema>;

export const HistoriaSchema = z.object({
  sobreCidade: z.string(),
  sobreSaoJoao: z.string(),
  curiosidades: z.array(z.string()).optional().default([]),
});
export type Historia = z.infer<typeof HistoriaSchema>;

export type Favorito = { id: string; tipo: "show" | "polo" | "lugar"; createdAt: number };
export type MetaEntry = { key: string; value: unknown };
