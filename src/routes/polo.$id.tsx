import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/PageShell";
import { usePolo } from "@/features/polos/hooks/usePolos";
import { useProgramacaoPorPolo } from "@/features/programacao/hooks/useProgramacao";
import { MapPin, Clock, Calendar } from "lucide-react";

export const Route = createFileRoute("/polo/$id")({
  component: PoloDetail,
  notFoundComponent: () => (
    <div className="p-6 text-center">
      <p>Polo não encontrado.</p>
      <Link to="/polos" className="text-primary underline">Ver polos</Link>
    </div>
  ),
});

function PoloDetail() {
  const { id } = Route.useParams();
  const polo = usePolo(id);
  const shows = useProgramacaoPorPolo(id);

  if (polo === undefined) {
    return (
      <PageShell>
        <PageHeader title="Carregando..." />
      </PageShell>
    );
  }
  if (polo === null) throw notFound();

  const mapsUrl = `https://www.google.com/maps?q=${polo.lat},${polo.lng}`;

  return (
    <PageShell>
      <PageHeader title={polo.nome} />
      <div className="space-y-4 px-4">
        <div className="card-tile p-4">
          <p className="text-sm text-foreground/90">{polo.descricao}</p>
          <div className="mt-4 space-y-2 text-sm">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-accent" /> {polo.endereco}
            </p>
            <p className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 text-accent" /> {polo.horario}
            </p>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)]"
          >
            <MapPin className="h-4 w-4" /> Abrir no mapa
          </a>
        </div>

        <h2 className="px-1 pt-2 font-display text-lg">Atrações neste polo</h2>
        {shows.length === 0 ? (
          <p className="px-1 text-sm text-muted-foreground">Nenhuma atração cadastrada ainda.</p>
        ) : (
          <ul className="space-y-2">
            {shows.map((s) => (
              <li key={s.id} className="card-tile flex items-center gap-3 p-3">
                <Calendar className="h-5 w-5 text-accent" />
                <div className="flex-1">
                  <p className="font-semibold">{s.artista}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(s.data + "T12:00:00").toLocaleDateString("pt-BR")} · {s.hora} · {s.genero}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageShell>
  );
}
