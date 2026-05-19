import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader, PageShell } from "@/components/PageShell";
import { loadData } from "@/lib/store";

export const Route = createFileRoute("/sobre")({
  component: Sobre,
  head: () => ({ meta: [{ title: "Sobre — São João de Arcoverde" }] }),
});

function Sobre() {
  const data = useMemo(() => loadData(), []);
  return (
    <PageShell>
      <PageHeader title="Sobre" subtitle="Arcoverde e o São João" />
      <div className="space-y-4 px-4">
        <article className="card-tile p-5">
          <h2 className="font-display text-xl">Arcoverde</h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">{data.sobreCidade}</p>
        </article>
        <article className="card-tile p-5">
          <h2 className="font-display text-xl">História do São João</h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">{data.sobreSaoJoao}</p>
        </article>
      </div>
    </PageShell>
  );
}
