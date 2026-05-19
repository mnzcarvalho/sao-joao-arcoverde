import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader, PageShell } from "@/components/PageShell";
import { loadData } from "@/lib/store";
import { Music, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/atracoes")({
  component: Atracoes,
  head: () => ({ meta: [{ title: "Atrações — São João de Arcoverde" }] }),
});

function Atracoes() {
  const data = useMemo(() => loadData(), []);
  const sorted = [...data.programacao].sort((a, b) => (a.data + a.hora).localeCompare(b.data + b.hora));
  const poloName = (id: string) => data.polos.find(p => p.id === id)?.nome ?? id;

  return (
    <PageShell>
      <PageHeader title="Atrações" subtitle="Todas as bandas e cantores" />
      <ul className="space-y-3 px-4">
        {sorted.map(s => (
          <li key={s.id} className="card-tile flex items-center gap-3 p-4">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-bonfire text-primary-foreground">
              <Music className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-base font-semibold leading-tight">{s.artista}</h3>
              <p className="text-xs text-muted-foreground">{s.genero}</p>
              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(s.data + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })} · {s.hora}</span>
                <span className="inline-flex items-center gap-1 text-accent"><MapPin className="h-3 w-3" />{poloName(s.polo)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
