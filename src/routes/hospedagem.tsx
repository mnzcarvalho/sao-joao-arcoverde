import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/PageShell";
import { PlaceList } from "@/components/PlaceList";
import { useLugares } from "@/features/lugares/hooks/useLugares";

export const Route = createFileRoute("/hospedagem")({
  component: Hospedagem,
  head: () => ({ meta: [{ title: "Onde ficar — São João de Arcoverde" }] }),
});

function Hospedagem() {
  const items = useLugares("hospedagem");
  return (
    <PageShell>
      <PageHeader title="Onde Ficar" subtitle="Hotéis e pousadas" />
      <PlaceList items={items} />
    </PageShell>
  );
}
