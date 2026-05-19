import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader, PageShell } from "@/components/PageShell";
import { PlaceList } from "@/components/PlaceList";
import { loadData } from "@/lib/store";

export const Route = createFileRoute("/hospedagem")({
  component: () => {
    const data = useMemo(() => loadData(), []);
    return (
      <PageShell>
        <PageHeader title="Onde Ficar" subtitle="Hotéis e pousadas" />
        <PlaceList items={data.hospedagem} />
      </PageShell>
    );
  },
  head: () => ({ meta: [{ title: "Onde ficar — São João de Arcoverde" }] }),
});
