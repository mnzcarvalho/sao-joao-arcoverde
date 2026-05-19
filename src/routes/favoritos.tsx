import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader, PageShell } from "@/components/PageShell";
import { getFavs, loadData, toggleFav } from "@/lib/store";
import { Heart, X } from "lucide-react";

export const Route = createFileRoute("/favoritos")({
  component: Favoritos,
  head: () => ({ meta: [{ title: "Favoritos — São João de Arcoverde" }] }),
});

function Favoritos() {
  const data = loadData();
  const [favs, setFavs] = useState<string[]>([]);
  useEffect(() => { setFavs(getFavs()); }, []);

  const shows = data.programacao.filter(s => favs.includes(s.id));
  const poloName = (id: string) => data.polos.find(p => p.id === id)?.nome ?? id;

  return (
    <PageShell>
      <PageHeader title="Favoritos" subtitle="Suas atrações marcadas" />
      {shows.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-sm text-muted-foreground">
            Você ainda não favoritou nenhuma atração.
          </p>
          <Link to="/programacao" className="mt-4 inline-block rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground">
            Ver programação
          </Link>
        </div>
      ) : (
        <ul className="space-y-3 px-4">
          {shows.map(s => (
            <li key={s.id} className="card-tile flex items-center gap-3 p-4">
              <div className="flex-1">
                <p className="font-display text-base font-semibold">{s.artista}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(s.data + "T12:00:00").toLocaleDateString("pt-BR")} · {s.hora} · {poloName(s.polo)}
                </p>
              </div>
              <button
                onClick={() => setFavs(toggleFav(s.id))}
                className="grid h-9 w-9 place-items-center rounded-full bg-[var(--surface-2)]"
                aria-label="Remover favorito"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
