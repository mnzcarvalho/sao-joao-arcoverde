import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader, PageShell } from "@/components/PageShell";
import { PlaceList } from "@/components/PlaceList";
import { loadData } from "@/lib/store";

export const Route = createFileRoute("/turismo")({
  component: () => {
    const data = useMemo(() => loadData(), []);
    return (
      <PageShell>
        <PageHeader title="Pontos Turísticos" subtitle="O que visitar em Arcoverde" />
        <PlaceList items={data.turismo} />
      </PageShell>
    );
  },
  head: () => ({ meta: [{ title: "Pontos turísticos — Arcoverde" }] }),
});
