---
name: sao-joao-arcoverde
description: >
  Skill para desenvolver o projeto São João Arcoverde — um PWA mobile-first em
  TanStack Start + React 19 + TypeScript + shadcn/ui + Tailwind v4, deployado
  no Cloudflare Workers. Use esta skill SEMPRE que o usuário pedir ajuda com
  novas páginas, componentes, rotas, dados ou qualquer funcionalidade deste
  projeto, mesmo que ele não cite o nome do projeto explicitamente. Se o
  contexto for sobre festa junina, São João, Arcoverde, Pernambuco ou MVP
  mobile de evento, active esta skill imediatamente.
---

# São João Arcoverde — Skill de Desenvolvimento

## Visão geral do projeto

Site PWA **mobile-first** sobre a festa de São João de Arcoverde (PE).
Público-alvo: pessoas no celular, durante ou antes do evento.
Meta: MVP simples, funcional e instalável como app.

**Repositório:** https://github.com/mnzcarvalho/sao-joao-arcoverde

---

## Stack técnico

| Camada | Tecnologia |
|---|---|
| Framework | TanStack Start (TanStack Router + Vite 7) |
| UI | React 19 + TypeScript |
| Estilo | Tailwind CSS v4 + shadcn/ui (estilo `new-york`, baseColor `slate`) |
| Ícones | lucide-react |
| Forms | react-hook-form + zod + @hookform/resolvers |
| Dados client-side | Dexie (IndexedDB) + dexie-react-hooks |
| Dados server | TanStack Query (React Query v5) |
| PWA | vite-plugin-pwa |
| Deploy | Cloudflare Workers (wrangler) |
| Runtime | Bun |
| Linting/Formato | ESLint + Prettier |

---

## Estrutura de arquivos

```
src/
  routes/         ← páginas (file-based routing do TanStack Router)
    __root.tsx    ← layout raiz (header/footer/nav global)
    index.tsx     ← página inicial
    *.tsx         ← outras rotas
  components/
    ui/           ← componentes shadcn (não editar manualmente)
    *.tsx         ← componentes próprios do projeto
  lib/
    utils.ts      ← utilitários (cn, etc.)
    data/         ← dados estáticos do evento (polos, programacao, etc.)
  hooks/          ← hooks customizados
  styles.css      ← estilos globais + variáveis Tailwind
  server.ts       ← entry point Cloudflare Workers
public/
  icons/          ← ícones PWA
```

---

## Convenções do projeto

### Rotas (páginas)
- Cada arquivo em `src/routes/` vira uma página automaticamente.
- Use `createFileRoute('/')` no topo de cada arquivo de rota.
- Exemplo mínimo de nova página:

```tsx
// src/routes/programacao.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/programacao')({
  component: ProgramacaoPage,
})

function ProgramacaoPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Programação</h1>
    </div>
  )
}
```

### Componentes
- Sempre `.tsx`, nunca `.jsx`.
- Tailwind v4 para estilo (sem `tailwind.config.js` — configuração via CSS).
- shadcn/ui: importar de `@/components/ui/nome-do-componente`.
- Nunca editar arquivos em `src/components/ui/` manualmente.

### Endereços clicáveis (Google Maps)
O projeto usa links diretos para o app Google Maps ao invés de embed de mapa.
Padrão a seguir:

```tsx
// Abre o Google Maps app no celular
const endereco = "Praça Cel. Jaime Sleutjes, Arcoverde - PE"
const url = `https://maps.google.com/?q=${encodeURIComponent(endereco)}`

<a
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  className="text-amber-600 underline"
>
  {endereco}
</a>
```

### Estilo visual (São João)
- Paleta temática sugerida: âmbar (`amber`), laranja (`orange`), vermelho (`red`), amarelo (`yellow`).
- Fundo escuro com detalhes festivos quando possível.
- Mobile-first: pensar em telas de 375px–430px primeiro.
- Componentes shadcn já estão configurados com `cssVariables: true` — use variáveis CSS para theming.

### Dados / conteúdo
- Dados estáticos (programação, atrações, locais) ficam **sempre** em `src/lib/data/*.ts` — nunca hardcoded dentro de componentes ou páginas.
- Para dados offline/persistência local, usar Dexie (IndexedDB).
- Não há backend próprio no MVP — Cloudflare Workers serve apenas o app React.

---

## Comandos úteis

```bash
bun dev          # inicia servidor de desenvolvimento
bun build        # build de produção
bun preview      # preview da build
bun lint         # verifica erros de lint
bun format       # formata o código com prettier
```

---

## PWA — checklist MVP

Para funcionar como PWA instalável no Android/iOS:
- [ ] `vite-plugin-pwa` configurado no `vite.config.ts`
- [ ] `manifest.json` com `name`, `short_name`, `icons`, `theme_color`, `background_color`
- [ ] Ícones em `public/icons/` (mínimo: 192x192 e 512x512)
- [ ] HTTPS no deploy (Cloudflare Workers já garante isso)

---

## Deploy (Cloudflare Workers)

```bash
bunx wrangler deploy   # deploy para produção
bunx wrangler dev      # testa localmente com runtime Cloudflare
```

O `wrangler.jsonc` já está configurado com `nodejs_compat` e aponta para `src/server.ts`.

---

## Estrutura de páginas (baseada no protótipo lovable.app)

Site de referência: https://sao-joao-arcoverde.lovable.app/

### Navegação principal (bottom nav mobile)
| Rota | Descrição |
|---|---|
| `/` | Início — hero com nome, slogan e datas do evento |
| `/programacao` | Programação — filtro por polo, shows por dia/horário |
| `/polos` | Polos — lista de palcos com endereço clicável (Google Maps) |
| `/favoritos` | Favoritos — shows/atrações salvos pelo usuário (Dexie) |
| `/mais` | Mais — menu secundário com links para outras seções |

### Páginas secundárias (acessadas via /mais)
| Rota | Descrição |
|---|---|
| `/gastronomia` | Onde Comer — restaurantes e comidas típicas |
| `/hospedagem` | Onde Ficar — hotéis e pousadas |
| `/turismo` | Pontos Turísticos — atrações de Arcoverde |
| `/sobre` | Sobre Arcoverde — informações da cidade e do evento |
| `/desenvolvedores` | Créditos dos desenvolvedores |
| `/configuracoes` | Configurações do app |

### Identidade visual (extraída do protótipo)
- **Slogan:** "O melhor do Brasil!"
- **Datas:** 13 a 28 de junho · 2026
- **Theme color:** `#1a1340` (azul escuro noturno)
- **Destaques:** disponível offline, forró pé de serra
- **og:image** disponível em: `https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/c745a4e1-3a7e-407a-80c5-5c2570a4ed03`

---

## Foco do MVP

Priorizar na seguinte ordem:
1. **`/`** — hero com identidade visual, datas, links de navegação
2. **`/programacao`** — filtro por polo, cards de shows com horário
3. **`/polos`** — cards de palcos com endereço clicável (Google Maps)
4. **`/mais`** + páginas secundárias — conteúdo simples em lista

Evitar no MVP: autenticação, pagamentos, CMS, backend próprio, mapas embed.
