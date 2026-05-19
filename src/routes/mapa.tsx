import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, PageShell } from "@/components/PageShell";
import { usePolos } from "@/features/polos/hooks/usePolos";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { MapView } from "@/features/mapa/components/MapView";
import { MapOfflineFallback } from "@/features/mapa/components/MapOfflineFallback";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/mapa")({
  component: Mapa,
  head: () => ({
    meta: [
      { title: "Mapa dos Polos — São João de Arcoverde" },
      { name: "description", content: "Localização de todos os polos da festa no mapa." },
    ],
  }),
});

function Mapa() {
  const polos = usePolos();
  const online = useOnlineStatus();
  const [sel, setSel] = useState<string | undefined>();

  const selectedId = sel ?? polos[0]?.id;
  const selPolo = polos.find((p) => p.id === selectedId);

  return (
    <PageShell>
      <PageHeader
        title="Mapa dos Polos"
        subtitle={online ? "Google Maps" : "Modo offline"}
      />
      {polos.length === 0 ? (
        <p className="px-4 text-sm text-muted-foreground">Carregando polos...</p>
      ) : online ? (
        <MapView polos={polos} onSelect={setSel} selectedId={selectedId} />
      ) : (
        <MapOfflineFallback polos={polos} onSelect={setSel} selectedId={selectedId} />
      )}

      {selPolo && online && (
        <div className="card-tile mx-4 mt-4 p-4">
          <h3 className="font-display text-lg font-semibold">{selPolo.nome}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{selPolo.descricao}</p>
          <p className="mt-2 flex items-center gap-1 text-xs text-accent">
            <MapPin className="h-3 w-3" /> {selPolo.endereco}
          </p>
          <a
            href={`https://www.google.com/maps?q=${selPolo.lat},${selPolo.lng}`}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
          >
            Abrir no Google Maps
          </a>
        </div>
      )}
    </PageShell>
  );
}
