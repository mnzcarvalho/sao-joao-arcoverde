# CLAUDE.md

Instruções para agentes de IA trabalhando neste repositório.

## Leitura obrigatória no início de cada sessão

Antes de qualquer tarefa, leia estes arquivos na ordem:

1. `OVERVIEW.md` — contexto completo do projeto, stack e convenções
2. `TODO.md` — backlog de tarefas em ordem de prioridade

Confirme que leu os dois antes de começar qualquer coisa.

---

## O projeto

PWA mobile-first sobre a festa de São João de Arcoverde (PE).
Veja `OVERVIEW.md` para contexto completo, stack e convenções.

---

## Regras obrigatórias

### Geral
- Sempre escrever em **português (PT-BR)**: comentários, mensagens de commit, strings de UI.
- Nunca remover funcionalidades existentes sem autorização explícita.
- Nunca instalar dependências novas sem perguntar primeiro.
- Sempre perguntar antes de refatorar arquivos que não foram mencionados na tarefa.

### Código
- Usar **TypeScript** em todos os arquivos — nunca `.js` ou `.jsx`.
- Usar **Tailwind v4** para estilos — sem CSS inline, sem módulos CSS separados.
- Usar **shadcn/ui** para componentes de interface — importar de `@/components/ui/`.
- Nunca editar arquivos dentro de `src/components/ui/` — são gerados pelo shadcn.
- Usar os aliases `@/components`, `@/lib`, `@/hooks` nos imports.

### Rotas
- Toda nova rota em `src/routes/` deve ter `createFileRoute` correto no topo.
- Seguir o padrão de arquivo existente antes de criar um novo.

### Dados
- Dados estáticos ficam em `src/lib/data/*.ts` — nunca hardcoded dentro de componentes.
- Exportar sempre como array tipado com interface TypeScript definida no mesmo arquivo.

### Mobile-first
- Projetar para 375px de largura mínima.
- Testar mentalmente o layout em tela pequena antes de sugerir qualquer componente.
- Evitar tabelas, layouts complexos ou elementos que quebram em mobile.

---

## O que NÃO fazer

- ❌ Usar Google Maps embed — usar link clicável `maps.google.com/?q=` no lugar.
- ❌ Criar backend ou API routes no MVP.
- ❌ Adicionar autenticação.
- ❌ Usar `localStorage` diretamente — usar Dexie para persistência local.
- ❌ Usar `console.log` em código de produção.
- ❌ Criar arquivos fora da estrutura definida no `OVERVIEW.md`.

---

## Fluxo esperado para cada tarefa

1. Ler a tarefa e identificar quais arquivos serão criados ou modificados.
2. Checar se já existe algo relacionado no projeto antes de criar do zero.
3. Criar dados em `src/lib/data/` se a página precisar de conteúdo.
4. Criar componentes reutilizáveis em `src/components/` se necessário.
5. Criar ou editar a rota em `src/routes/`.
6. Informar quais arquivos foram criados/modificados ao final.

---

## Contexto de desenvolvimento

- Desenvolvedor solo, iniciante em programação.
- Prefere explicações simples junto com o código.
- Foco em MVP — evitar over-engineering.
- Agente de terminal: OpenCode.
