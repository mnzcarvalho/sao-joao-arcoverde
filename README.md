<div align="center">
  <br/>
  <img src="public/icons/icon-512.png" alt="São João de Arcoverde" width="120" height="120"/>
  <h1 align="center">São João de Arcoverde</h1>
  <p align="center">
    <strong>Guia offline-first do maior São João do Sertão de Pernambuco</strong>
    <br/>
    <sub>Programação completa, polos temáticos, gastronomia, hospedagem e turismo — tudo na palma da mão.</sub>
  </p>
  <br/>
</div>

---

## Sobre

Aplicativo PWA (Progressive Web App) que centraliza a programação oficial do São João de Arcoverde. Feito para funcionar **offline-first**: depois do primeiro carregamento, os dados ficam salvos no IndexedDB e o app continua funcionando mesmo sem internet.

### Funcionalidades

- **Programação completa** — todos os shows, dias, horários e polos
- **12 polos temáticos** — Raízes do Coco, Multicultural, Pé de Serra, Corredor Cultural e mais
- **Favoritos** — salve seus shows e polos preferidos (persistido offline)
- **Mapas** — localização dos polos com link direto para o Google Maps
- **Gastronomia, Hospedagem e Turismo** — guia completo da cidade
- **PWA instalável** — funciona como app nativo no celular
- **Modo escuro** — tema junino noturno com design festivo

---

## Tecnologias

### Core

| Tecnologia | Versão | Para quê |
|---|---|---|
| [React 19](https://react.dev/) | 19.2.0 | Interface declarativa e reativa |
| [TypeScript](https://www.typescriptlang.org/) | 5.8.3 | Tipagem segura e DX |
| [Vite 7](https://vite.dev/) | 7.3.1 | Bundler ultrarrápido com HMR |

### Roteamento & Data Fetching

| Tecnologia | Para quê |
|---|---|
| [TanStack Router](https://tanstack.com/router/latest) | Roteamento type-safe com SSR, lazy loading e scroll restoration |
| [TanStack React Query](https://tanstack.com/query/latest) | Cache e sincronização de dados do servidor |
| [TanStack Start](https://tanstack.com/start/latest) | Meta-framework full-stack (SSR + SSG + API) |

### Estilo & Design

| Tecnologia | Para quê |
|---|---|
| [Tailwind CSS v4](https://tailwindcss.com/) | Estilidade utilitária com CSS-first config |
| [Radix UI](https://www.radix-ui.com/) | Componentes acessíveis e headless (acordeão, diálogo, select, tabs, etc.) |
| [Lucide React](https://lucide.dev/) | Ícones leves e consistentes |
| [shadcn/ui](https://ui.shadcn.com/) | Componentes estilizados sobre Radix |
| [tw-animate-css](https://github.com/noogeex/tw-animate-css) | Animações CSS com classes Tailwind |
| [Embla Carousel](https://www.embla-carousel.com/) | Carrossel performático e touch-friendly |
| [Sonner](https://sonner.emilkowal.ski/) | Toasts elegantes e leves |

### Persistência & Offline

| Tecnologia | Para quê |
|---|---|
| [Dexie.js](https://dexie.org/) | Wrapper IndexedDB para persistência local offline |
| [Dexie React Hooks](https://dexie.org/docs/dexie-react-hooks) | Hooks React para consultas reativas no Dexie |
| [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) | Service Worker, manifesto, cache de assets |
| [Workbox](https://developer.chrome.com/docs/workbox) | Estratégias de cache runtime (NetworkFirst, CacheFirst, StaleWhileRevalidate) |

### Formulários & Validação

| Tecnologia | Para quê |
|---|---|
| [React Hook Form](https://react-hook-form.com/) | Formulários performáticos |
| [Zod](https://zod.dev/) | Schemas de validação type-safe |
| [@hookform/resolvers](https://github.com/react-hook-form/resolvers) | Integração RHF + Zod |

### Outras

| Tecnologia | Para quê |
|---|---|
| [date-fns](https://date-fns.org/) | Manipulação de datas (tree-shakeable) |
| [class-variance-authority](https://cva.style/) | Variantes de componentes tipadas |
| [clsx](https://github.com/lukeed/clsx) | Junção condicional de classes |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Merge inteligente de classes Tailwind |

### Dev & Build

| Tecnologia | Para quê |
|---|---|
| [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) | Linting e formatação |
| [Cloudflare](https://cloudflare.com/) | Deploy serverless via Wrangler |
| [Bun](https://bun.sh/) | Runtime alternativo (opcional) |

---

## Como usar localmente

### Pré-requisitos

- **Node.js** 18+ (recomendado 20 LTS)
- **npm** 9+ (ou **bun** se preferir)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/sao-joao-arcoverde.git
cd sao-joao-arcoverde

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

O app estará disponível em `http://localhost:5173`.

### Build de produção

```bash
npm run build
npm run preview   # Servir localmente o build
```

### Outros comandos

| Comando | Descrição |
|---|---|
| `npm run lint` | Verificar código com ESLint |
| `npm run format` | Formatar código com Prettier |
| `npm run build:dev` | Build em modo desenvolvimento |

---

## Estrutura do projeto

```
src/
├── assets/          # Imagens, SVGs (cartazes, logotipos, placeholders)
├── components/      # Componentes reutilizáveis (BottomNav, PageShell, etc.)
│   └── ui/          # Componentes shadcn/ui
├── data/            # Dados estáticos em JSON (programação, polos, lugares)
├── db/              # Dexie (IndexedDB) — schema, seed, repositórios
│   └── repositories/
├── features/        # Lógica de domínio (favoritos, programação, polos)
├── hooks/           # Hooks customizados
├── lib/             # Utilitários genéricos
├── pwa/             # Service Worker, registro, prompts de instalação
├── routes/          # Páginas (TanStack Router file-based)
├── types/           # Schemas Zod e tipos TypeScript
├── router.tsx       # Configuração do roteador
├── server.ts        # Entrypoint SSR
├── start.ts         # Entrypoint TanStack Start
└── styles.css       # Estilos globais e tema Tailwind
```

---

## Licença

Este é um projeto independente e sem fins comerciais. Dados da programação e artistas são de propriedade da Prefeitura Municipal de Arcoverde.

---

<div align="center">
  <sub>Feito com 💚 no Sertão de Pernambuco — Viva o São João de Arcoverde!</sub>
</div>