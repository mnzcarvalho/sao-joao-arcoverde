import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/PageShell";
import { PlaceList } from "@/components/PlaceList";
import { useLugares } from "@/features/lugares/hooks/useLugares";

export const Route = createFileRoute("/turismo")({
  component: Turismo,
  head: () => ({ meta: [{ title: "Pontos turísticos — Arcoverde" }] }),
});

function Turismo() {
  const items = useLugares("turismo");
  return (
    <PageShell>
      <PageHeader title="Pontos Turísticos" subtitle="O que visitar em Arcoverde" />
      <PlaceList items={items} />
    </PageShell>
  );
}
