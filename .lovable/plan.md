## Plano de refatoração para alinhar à SKILL

### 1. Persistência: Dexie/IndexedDB (`src/db/`)
- `bun add dexie dexie-react-hooks zod`
- `src/db/database.ts`: classe `SJArcoverdeDB extends Dexie` com tabelas `polos`, `programacao`, `gastronomia`, `hospedagem`, `turismo`, `favoritos`, `meta` + versionamento (v1) e migration helper.
- `src/db/seed.ts`: lê JSONs de `/data/*.json` e popula DB se `meta.seeded !== true`.
- `src/db/repositories/`: `polosRepo.ts`, `programacaoRepo.ts`, `placesRepo.ts`, `favoritosRepo.ts`, `metaRepo.ts` — única porta de entrada ao DB.
- Remove `src/lib/store.ts` (localStorage). Mantém apenas `prefs` (tema/etc) em localStorage simples.

### 2. Dados em `/data/*.json`
- Mover `src/lib/data.ts` → `src/data/polos.json`, `programacao.json`, `gastronomia.json`, `hospedagem.json`, `turismo.json`, `historia.json`.
- Schemas Zod em `src/features/*/types.ts` para validar no seed.

### 3. Arquitetura por features (`src/features/`)
```
src/features/
  programacao/  { components, hooks, services, types, utils }
  polos/
  gastronomia/
  hospedagem/
  turismo/
  favoritos/
  mapa/
  historia/
```
- Hooks usam `useLiveQuery` do `dexie-react-hooks` (reativo ao IndexedDB).
- Rotas em `src/routes/` ficam finas: só compõem features.

### 4. PWA com vite-plugin-pwa
- `bun add -D vite-plugin-pwa`
- Adicionar plugin em `vite.config.ts` (via `vite: { plugins: [...] }` do `defineConfig` do `@lovable.dev/vite-tanstack-config`).
- Config: `registerType: "autoUpdate"`, `devOptions: { enabled: false }`, `navigateFallbackDenylist`, runtime caching `NetworkFirst` para HTML, `CacheFirst` para assets/fontes.
- Remover `public/sw.js` manual.
- `src/pwa/registerSW.ts` com guard de iframe/preview (mantém comportamento atual de desregistrar no preview).
- `src/pwa/UpdatePrompt.tsx` (banner "nova versão disponível").
- `src/pwa/InstallPrompt.tsx` (captura `beforeinstallprompt`).

### 5. Google Maps JS API com fallback offline
- Connector `google_maps` (chave browser via `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY`).
- `src/features/mapa/services/loadMaps.ts`: lazy load via `<script async>` + callback global, só quando `navigator.onLine`.
- `src/features/mapa/components/MapView.tsx`: renderiza Google Maps com markers dos polos.
- `src/features/mapa/components/MapOfflineFallback.tsx`: lista de polos com endereço, coordenadas, link `geo:` e mensagem amigável.
- `src/routes/mapa.tsx`: escolhe componente baseado em `useOnlineStatus()` hook.

### 6. Hooks utilitários (`src/hooks/`)
- `useOnlineStatus.ts`
- `useFavoritos.ts` (wraps repo + useLiveQuery)
- `usePolos.ts`, `useProgramacao.ts`, etc.

### 7. Limpeza
- Deletar `src/lib/data.ts`, `src/lib/store.ts`, `public/sw.js`.
- Atualizar imports em todas as rotas.

### Observações técnicas
- **Router**: mantém TanStack Router (template Lovable). Documentado como desvio justificado da SKILL.
- **Google Maps no preview**: o connector tem allowlist `*.lovable.app`/`*.lovableproject.com`, então funciona no preview também.
- **PWA no preview**: `vite-plugin-pwa` desabilitado em dev + guard de iframe garantem que SW só ativa no app publicado.
- **Migração de favoritos**: como o usuário ainda não tem dados em produção, não precisa migrar do localStorage; primeira execução popula Dexie do zero.

### Ordem de execução
1. Instalar deps (dexie, dexie-react-hooks, zod, vite-plugin-pwa)
2. Conectar Google Maps connector
3. Criar `/data/*.json` + schemas Zod
4. Criar `/db` (database, repos, seed)
5. Criar `/features/*` (hooks + components + services)
6. Refatorar rotas para usar features
7. Configurar vite-plugin-pwa + remover SW manual
8. Implementar mapa Google + fallback
9. Deletar arquivos legados
10. Smoke test (build + preview)
