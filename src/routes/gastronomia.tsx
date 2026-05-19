import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/PageShell";
import { PlaceList } from "@/components/PlaceList";
import { useLugares } from "@/features/lugares/hooks/useLugares";

export const Route = createFileRoute("/gastronomia")({
  component: Gastronomia,
  head: () => ({ meta: [{ title: "Onde comer — São João de Arcoverde" }] }),
});

function Gastronomia() {
  const items = useLugares("comida");
  return (
    <PageShell>
      <PageHeader title="Onde Comer" subtitle="Sabores do sertão" />
      <PlaceList items={items} />
    </PageShell>
  );
}
