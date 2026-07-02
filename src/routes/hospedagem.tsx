import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/PageShell";
import { PlaceList } from "@/components/PlaceList";
import { useLugares } from "@/features/lugares/hooks/useLugares";

const imagensHospedagem: Record<string, string> = {
  h1: "src/assets/hospedagem/hotel-cruzeiro.jpg",
  h2: "src/assets/hospedagem/hotel-monteirao.jpg",
  h3: "src/assets/hospedagem/ibis.jpg",
  h4: "src/assets/hospedagem/pousada-verdes-arcos.jpg",
};

export const Route = createFileRoute("/hospedagem")({
  component: Hospedagem,
  head: () => ({ meta: [{ title: "Onde ficar — São João de Arcoverde" }] }),
});

function Hospedagem() {
  const items = useLugares("hospedagem");
  return (
    <PageShell>
      <PageHeader title="Onde Ficar" subtitle="Hotéis e pousadas" />
      <PlaceList items={items} imagensMap={imagensHospedagem} />
    </PageShell>
  );
}