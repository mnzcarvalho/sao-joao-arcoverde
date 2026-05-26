# TODO — São João Arcoverde MVP

Tarefas em ordem de prioridade. Marque com [x] ao concluir.

---

## 🏗️ Base (fazer primeiro — tudo depende disso)

- [ ] Configurar layout raiz (`src/routes/__root.tsx`) com bottom nav fixo (Início, Programação, Polos, Favoritos, Mais)
- [ ] Criar estilos globais com paleta temática em `src/styles.css` (theme color `#1a1340`, tons âmbar/laranja)
- [ ] Configurar PWA no `vite.config.ts` (manifest, service worker, ícones)
- [ ] Adicionar ícones PWA em `public/icons/` (192x192 e 512x512)

---

## 🏠 Página inicial `/`

- [ ] Hero com nome do evento, slogan "O melhor do Brasil!" e datas "13 a 28 de junho · 2026"
- [ ] Links de acesso rápido para as seções principais
- [ ] Visual festivo mobile-first

---

## 🎵 Programação `/programacao`

- [ ] Criar dados em `src/lib/data/programacao.ts` (artista, polo, dia, horário)
- [ ] Página com filtro por polo no topo
- [ ] Card por show: nome do artista, polo, dia da semana, horário
- [ ] Estado de "programação em breve" quando lista vazia

---

## 📍 Polos `/polos`

- [ ] Criar dados em `src/lib/data/polos.ts` (nome, endereço, descrição)
- [ ] Card por polo com nome, descrição e endereço
- [ ] Endereço clicável abrindo Google Maps app (`maps.google.com/?q=`)

---

## ⭐ Favoritos `/favoritos`

- [ ] Configurar Dexie para persistência local dos favoritos
- [ ] Botão de favoritar em cada card de show
- [ ] Página listando shows favoritados
- [ ] Estado vazio quando não há favoritos

---

## ➕ Mais `/mais`

- [ ] Lista de links para páginas secundárias
- [ ] Ícone e label para cada link

---

## 🍖 Gastronomia `/gastronomia`

- [ ] Criar dados em `src/lib/data/gastronomia.ts` (nome, tipo, endereço)
- [ ] Lista de restaurantes/barracas com endereço clicável

---

## 🏨 Hospedagem `/hospedagem`

- [ ] Criar dados em `src/lib/data/hospedagem.ts` (nome, endereço, contato)
- [ ] Lista de hotéis e pousadas com endereço clicável

---

## 🗺️ Turismo `/turismo`

- [ ] Criar dados em `src/lib/data/turismo.ts` (nome, descrição, endereço)
- [ ] Lista de pontos turísticos com endereço clicável

---

## ℹ️ Sobre `/sobre`

- [ ] Texto sobre o evento e a cidade de Arcoverde
- [ ] Informações básicas (localização, história, como chegar)

---

## 👨‍💻 Páginas simples

- [ ] `/desenvolvedores` — créditos
- [ ] `/configuracoes` — configurações básicas do app (ex: tema)

---

## 🚀 Deploy

- [ ] Configurar `wrangler.jsonc` com nome e domínio final
- [ ] Testar build de produção: `bun build`
- [ ] Testar com runtime Cloudflare: `bunx wrangler dev`
- [ ] Deploy: `bunx wrangler deploy`
- [ ] Testar instalação como PWA no Android
- [ ] Testar instalação como PWA no iOS (Safari)

---

## 🔮 Pós-MVP (não fazer agora)

- [ ] Painel de administração para editar programação
- [ ] Notificações push de shows favoritos
- [ ] Compartilhamento de programação via WhatsApp
- [ ] Mapa interativo dos polos
- [ ] Múltiplos anos de edição
