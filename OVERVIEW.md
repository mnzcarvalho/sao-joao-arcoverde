# São João Arcoverde — Project Overview

Site PWA mobile-first sobre a festa de São João de Arcoverde (PE).
Público-alvo: pessoas no celular, durante ou antes do evento.
Idioma: português (PT-BR).
Desenvolvedor: solo.

**Protótipo de referência:** https://sao-joao-arcoverde.lovable.app/
**Repositório:** https://github.com/mnzcarvalho/sao-joao-arcoverde

---

## Identidade

- **Nome:** São João de Arcoverde
- **Slogan:** "O melhor do Brasil!"
- **Datas do evento:** 13 a 28 de junho de 2026
- **Theme color:** `#1a1340` (azul escuro noturno)
- **Paleta temática:** âmbar, laranja, vermelho, amarelo (tons de festa junina)

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | TanStack Start (TanStack Router + Vite 7) |
| UI | React 19 + TypeScript |
| Estilo | Tailwind CSS v4 + shadcn/ui (estilo `new-york`, base `slate`) |
| Ícones | lucide-react |
| Forms | react-hook-form + zod |
| Dados local | Dexie (IndexedDB) + dexie-react-hooks |
| Dados server | TanStack Query (React Query v5) |
| PWA | vite-plugin-pwa |
| Deploy | Cloudflare Workers (wrangler) |
| Runtime | Bun |
| Formatação | ESLint + Prettier |

---

## Estrutura de pastas

```
src/
  routes/           ← páginas (file-based routing automático)
    __root.tsx      ← layout raiz: header, bottom nav, outlet
    index.tsx       ← página inicial
    programacao.tsx
    polos.tsx
    favoritos.tsx
    mais.tsx
    gastronomia.tsx
    hospedagem.tsx
    turismo.tsx
    sobre.tsx
    desenvolvedores.tsx
    configuracoes.tsx
  components/
    ui/             ← componentes shadcn (NÃO editar manualmente)
    *.tsx           ← componentes próprios do projeto
  lib/
    utils.ts        ← utilitários (cn, etc.)
    data/           ← dados estáticos do evento em arquivos .ts
      polos.ts
      programacao.ts
      gastronomia.ts
      hospedagem.ts
      turismo.ts
  hooks/            ← hooks customizados
  styles.css        ← estilos globais + variáveis Tailwind v4
  server.ts         ← entry point Cloudflare Workers
public/
  icons/            ← ícones PWA (mínimo: 192x192 e 512x512)
```

---

## Navegação

### Bottom nav (sempre visível no mobile)
| Rota | Label |
|---|---|
| `/` | Início |
| `/programacao` | Programação |
| `/polos` | Polos |
| `/favoritos` | Favoritos |
| `/mais` | Mais |

### Páginas secundárias (acessadas via /mais)
| Rota | Label |
|---|---|
| `/gastronomia` | Onde Comer |
| `/hospedagem` | Onde Ficar |
| `/turismo` | Pontos Turísticos |
| `/sobre` | Sobre Arcoverde |
| `/desenvolvedores` | Desenvolvedores |
| `/configuracoes` | Configurações |

---

## Convenções

### Rotas
Cada arquivo em `src/routes/` deve ter `createFileRoute` no topo:

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/nome-da-rota')({
  component: NomeDaPaginaPage,
})
```

### Dados
Conteúdo estático (shows, polos, restaurantes) fica em `src/lib/data/*.ts`.
Nunca hardcodar dados dentro de componentes ou páginas.

```ts
// src/lib/data/polos.ts
export const polos = [
  {
    id: 'central',
    nome: 'Polo Central',
    endereco: 'Praça Cel. Jaime Sleutjes, Arcoverde - PE',
    descricao: '...',
  },
]
```

### Endereços — Google Maps clicável
O projeto usa links diretos para o app Google Maps (sem embed de mapa).

```tsx
const url = `https://maps.google.com/?q=${encodeURIComponent(endereco)}`

<a href={url} target="_blank" rel="noopener noreferrer">
  {endereco}
</a>
```

### Componentes shadcn
- Importar de `@/components/ui/nome`
- Para adicionar novo: `bunx shadcn add nome-do-componente`
- Nunca editar arquivos dentro de `src/components/ui/` manualmente

### Aliases de import
```ts
@/components  → src/components
@/lib         → src/lib
@/hooks       → src/hooks
```

---

## Comandos

```bash
bun dev           # desenvolvimento local
bun build         # build de produção
bun preview       # preview da build
bun lint          # verificar erros
bun format        # formatar código

bunx wrangler dev     # testar com runtime Cloudflare
bunx wrangler deploy  # deploy para produção
```

---

## PWA — requisitos mínimos

- [ ] `vite-plugin-pwa` configurado no `vite.config.ts`
- [ ] `manifest.json` com `name`, `short_name`, `icons`, `theme_color: #1a1340`
- [ ] Ícones em `public/icons/` (192x192 e 512x512)
- [ ] Service worker habilitado para uso offline

---

## Escopo do MVP

**Incluído:**
- Todas as rotas listadas acima
- Dados estáticos (sem CMS ou backend próprio)
- Endereços clicáveis para Google Maps
- Favoritos com persistência local (Dexie)
- Instalável como PWA no Android e iOS

**Fora do MVP:**
- Autenticação de usuários
- Painel de administração
- Pagamentos ou ingressos
- Mapa interativo embed
- Notificações push
- Backend/API própria
