import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader, PageShell } from "@/components/PageShell";
import { PlaceList } from "@/components/PlaceList";
import { loadData } from "@/lib/store";

export const Route = createFileRoute("/gastronomia")({
  component: () => {
    const data = useMemo(() => loadData(), []);
    return (
      <PageShell>
        <PageHeader title="Onde Comer" subtitle="Sabores do sertão" />
        <PlaceList items={data.gastronomia} />
      </PageShell>
    );
  },
  head: () => ({ meta: [{ title: "Onde comer — São João de Arcoverde" }] }),
});
