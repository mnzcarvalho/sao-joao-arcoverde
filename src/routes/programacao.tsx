import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { PageHeader, PageShell } from "@/components/PageShell";
import { useProgramacao } from "@/features/programacao/hooks/useProgramacao";
import { usePolos } from "@/features/polos/hooks/usePolos";
import { useIsFavorito, toggleFavorito } from "@/features/favoritos/hooks/useFavoritos";
import { Clock, Heart, Music } from "lucide-react";
import type { Show } from "@/types/domain";

export const Route = createFileRoute("/programacao")({
  component: Programacao,
  head: () => ({
    meta: [
      { title: "Programação — São João de Arcoverde" },
      { name: "description", content: "Programação completa por polo, com bandas, cantores, dias e horários." },
    ],
  }),
});

function Programacao() {
  const programacao = useProgramacao();
  const polos = usePolos();

  const [activePolo, setActivePolo] = useState<string | undefined>();
  useEffect(() => {
    if (!activePolo && polos.length) setActivePolo(polos[0].id);
  }, [polos, activePolo]);

  const shows = useMemo(
    () => programacao.filter((s) => s.polo === activePolo),
    [programacao, activePolo]
  );

  const porDia = useMemo(() => {
    const map = new Map<string, Show[]>();
    for (const s of shows) {
      if (!map.has(s.data)) map.set(s.data, []);
      map.get(s.data)!.push(s);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [shows]);

  const fmtDia = (iso: string) => {
    const d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" });
  };

  return (
    <PageShell>
      <PageHeader title="Programação" subtitle="Filtre por polo" />

      {/* Filtro de polos */}
      <div className="px-4">
        <div className="flex gap-2 overflow-x-auto pb-3">
          {polos.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePolo(p.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition ${
                activePolo === p.id
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                  : "bg-[var(--surface-2)] text-muted-foreground"
              }`}
            >
              {p.nome}
            </button>
          ))}
        </div>
      </div>

      {porDia.length === 0 ? (
        <p className="px-4 text-sm text-muted-foreground">Programação em breve.</p>
      ) : (
        <div className="space-y-5 px-4">
          {porDia.map(([dia, list]) => (
            <section key={dia}>
              <h2 className="mb-2 font-display text-base capitalize text-accent">{fmtDia(dia)}</h2>
              <ul className="space-y-2">
                {list
                  .sort((a, b) => (a.hora ?? "").localeCompare(b.hora ?? ""))
                  .map((s) => (
                    <ShowItem key={s.id} show={s} />
                  ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </PageShell>
  );
}

function ShowItem({ show }: { show: Show }) {
  const isFav = useIsFavorito(show.id);
  return (
    <li className="card-tile flex items-center gap-4 p-3">
      <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-bonfire text-primary-foreground">
        {show.hora ? (
          <>
            <Clock className="h-3.5 w-3.5" />
            <span className="text-xs font-bold">{show.hora}</span>
          </>
        ) : (
          <Music className="h-5 w-5" />
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-display text-base font-semibold leading-tight">{show.artista}</h3>
        {show.genero && <p className="text-xs text-muted-foreground">{show.genero}</p>}
      </div>
      <button
        onClick={() => toggleFavorito(show.id, "show")}
        aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        className="grid h-9 w-9 place-items-center rounded-full bg-[var(--surface-2)]"
      >
        <Heart className={`h-4 w-4 ${isFav ? "fill-[var(--flag-red)] text-[var(--flag-red)]" : "text-muted-foreground"}`} />
      </button>
    </li>
  );
}
