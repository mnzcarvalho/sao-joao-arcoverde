import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/PageShell";
import { Code2, Heart } from "lucide-react";

export const Route = createFileRoute("/desenvolvedores")({
  component: Devs,
  head: () => ({ meta: [{ title: "Desenvolvedores — São João de Arcoverde" }] }),
});

function Devs() {
  return (
    <PageShell>
      <PageHeader title="Desenvolvedores" subtitle="Quem fez este app" />
      <div className="px-4">
        <div className="card-tile p-6 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-bonfire text-primary-foreground">
            <Code2 className="h-7 w-7" />
          </div>
          <h2 className="mt-4 font-display text-xl">Time de Desenvolvimento</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            App oficial do São João de Arcoverde — feito com{" "}
            <Heart className="inline h-4 w-4 text-[var(--flag-red)]" /> para a cultura nordestina.
          </p>
          <div className="mt-6 space-y-2 text-sm">
            <p className="font-semibold">Equipe</p>
            <p className="text-muted-foreground">Desenvolvimento, design e curadoria de conteúdo</p>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">v1.0.0 · 2026</p>
        </div>
      </div>
    </PageShell>
  );
}
