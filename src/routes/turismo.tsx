import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/PageShell";
import { PlaceList } from "@/components/PlaceList";
import { useLugares } from "@/features/lugares/hooks/useLugares";

const imagensTurismo: Record<string, string> = {
  t1: "src/assets/turismo/CECORA.jpg",
  t2: "src/assets/turismo/estacao-ferroviaria.jpg",
  t3: "src/assets/turismo/mirante-do-cruzeiro-novo-morro-da-santa-cruz.jpg",
  t4: "src/assets/turismo/mirante-do-alto-do-cruzeiro.jpg",
  t5: "src/assets/turismo/atelie-mestre-assis-calixto.jpg",
};

export const Route = createFileRoute("/turismo")({
  component: Turismo,
  head: () => ({ meta: [{ title: "Pontos turísticos — Arcoverde" }] }),
});

function Turismo() {
  const items = useLugares("turismo");
  return (
    <PageShell>
      <PageHeader title="Pontos Turísticos" subtitle="O que visitar em Arcoverde" />
      <PlaceList items={items} imagensMap={imagensTurismo} />
    </PageShell>
  );
}