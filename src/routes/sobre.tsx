import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/PageShell";
import { useHistoria } from "@/features/historia/hooks/useHistoria";

export const Route = createFileRoute("/sobre")({
  component: Sobre,
  head: () => ({ meta: [{ title: "Sobre — São João de Arcoverde" }] }),
});

function Sobre() {
  const historia = useHistoria();
  return (
    <PageShell>
      <PageHeader title="Sobre" subtitle="Arcoverde e o São João" />
      <div className="space-y-4 px-4">
        <article className="card-tile p-5">
          <h2 className="font-display text-xl">Arcoverde</h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
            {historia?.sobreCidade ?? "Carregando..."}
          </p>
        </article>
        <article className="card-tile p-5">
          <h2 className="font-display text-xl">História do São João</h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
            {historia?.sobreSaoJoao ?? "Carregando..."}
          </p>
        </article>
      </div>
    </PageShell>
  );
}
