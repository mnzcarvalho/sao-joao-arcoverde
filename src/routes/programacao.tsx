import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, PageShell } from "@/components/PageShell";
import { loadData } from "@/lib/store";
import { Clock, MapPin } from "lucide-react";

export const Route = createFileRoute("/programacao")({
  component: Programacao,
  head: () => ({ meta: [{ title: "Programação — São João de Arcoverde" }, { name: "description", content: "Programação completa com dias, horários, bandas e cantores." }] }),
});

function Programacao() {
  const data = useMemo(() => loadData(), []);
  const dias = useMemo(() => {
    const map = new Map<string, typeof data.programacao>();
    for (const s of data.programacao) {
      if (!map.has(s.data)) map.set(s.data, []);
      map.get(s.data)!.push(s);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [data.programacao]);
  const [active, setActive] = useState(dias[0]?.[0]);

  const fmtDia = (iso: string) => {
    const d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" });
  };

  const poloName = (id: string) => data.polos.find(p => p.id === id)?.nome ?? id;

  return (
    <PageShell>
      <PageHeader title="Programação" subtitle="Bandas, cantores e horários" />
      <div className="px-4">
        <div className="flex gap-2 overflow-x-auto pb-3">
          {dias.map(([d]) => (
            <button
              key={d}
              onClick={() => setActive(d)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase transition ${
                active === d ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)]" : "bg-[var(--surface-2)] text-muted-foreground"
              }`}
            >
              {fmtDia(d)}
            </button>
          ))}
        </div>

        <ul className="mt-2 space-y-3">
          {dias.find(([d]) => d === active)?.[1].sort((a,b) => a.hora.localeCompare(b.hora)).map(s => (
            <li key={s.id} className="card-tile flex items-center gap-4 p-4">
              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-bonfire text-primary-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-bold">{s.hora}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg font-semibold leading-tight">{s.artista}</h3>
                <p className="text-xs text-muted-foreground">{s.genero}</p>
                <p className="mt-1 inline-flex items-center gap-1 text-xs text-accent">
                  <MapPin className="h-3 w-3" /> {poloName(s.polo)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
