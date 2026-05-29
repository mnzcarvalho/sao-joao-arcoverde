import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/PageShell";
import { usePolos } from "@/features/polos/hooks/usePolos";
import { MapPin, Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/polos")({
  component: Polos,
  head: () => ({
    meta: [
      { title: "Polos — São João de Arcoverde" },
      {
        name: "description",
        content: "Todos os polos do São João de Arcoverde com endereços e horários.",
      },
    ],
  }),
});

function Polos() {
  const polos = usePolos();
  return (
    <PageShell>
      <PageHeader title="Polos" subtitle="Conheça todos os polos da festa" />
      <ul className="space-y-3 px-4">
        {polos.map((p) => (
          <li key={p.id}>
            <Link
              to="/polo/$id"
              params={{ id: p.id }}
              className="card-tile block p-4 transition active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold">{p.nome}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.descricao}</p>
                  <div className="mt-3 space-y-1 text-xs">
                    <p className="inline-flex items-center gap-1 text-accent">
                      <MapPin className="h-3 w-3" /> {p.endereco}
                    </p>
                    <p className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" /> {p.horario}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-primary" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
