import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/PageShell";
import { BedDouble, Camera, ChevronRight, Code2, Info, Settings, Utensils } from "lucide-react";

export const Route = createFileRoute("/mais")({
  component: Mais,
  head: () => ({ meta: [{ title: "Mais — São João de Arcoverde" }] }),
});

const items = [
  { to: "/gastronomia", label: "Onde Comer", icon: Utensils },
  { to: "/hospedagem", label: "Onde Ficar", icon: BedDouble },
  { to: "/turismo", label: "Pontos Turísticos", icon: Camera },
  { to: "/sobre", label: "Sobre Arcoverde", icon: Info },
  { to: "/desenvolvedores", label: "Desenvolvedores", icon: Code2 },
  { to: "/configuracoes", label: "Configurações", icon: Settings },
] as const;

function Mais() {
  return (
    <PageShell>
      <PageHeader title="Mais" subtitle="Tudo sobre o São João" back={false} />
      <ul className="space-y-2 px-4">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <Link
              to={to}
              className="card-tile flex items-center gap-4 p-4 transition active:scale-[0.99]"
            >
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--surface-2)] text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <span className="flex-1 font-semibold">{label}</span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
