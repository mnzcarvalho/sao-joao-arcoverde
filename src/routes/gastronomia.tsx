import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/PageShell";
import { PlaceList } from "@/components/PlaceList";
import { useLugares } from "@/features/lugares/hooks/useLugares";

const imagensGastronomia: Record<string, string> = {
  g4: "src/assets/gastronomia/Araponga-Restaurante-e-Self-service-.jpg",
  g1: "src/assets/gastronomia/centro-de-gastronomia.jpg",
  g3: "src/assets/gastronomia/a-oca-do-buda.jpg",
  g2: "src/assets/gastronomia/budega-da-poesia.jpg",
};

export const Route = createFileRoute("/gastronomia")({
  component: Gastronomia,
  head: () => ({ meta: [{ title: "Onde comer — São João de Arcoverde" }] }),
});

function Gastronomia() {
  const items = useLugares("comida");
  return (
    <PageShell>
      <PageHeader title="Onde Comer" subtitle="Sabores do sertão" />
      <PlaceList items={items} imagensMap={imagensGastronomia} />
    </PageShell>
  );
}