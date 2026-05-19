import type { Lugar } from "@/types/domain";
import { MapPin, Phone } from "lucide-react";

interface Props {
  items: Lugar[];
  emptyLabel?: string;
}

export function PlaceList({ items, emptyLabel }: Props) {
  if (!items.length)
    return <p className="px-4 text-sm text-muted-foreground">{emptyLabel ?? "Nada por aqui ainda."}</p>;
  return (
    <ul className="space-y-3 px-4">
      {items.map((it) => (
        <li key={it.id} className="card-tile p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-semibold">{it.nome}</h3>
            {it.preco && (
              <span className="rounded-full bg-[var(--surface-2)] px-2 py-0.5 text-xs font-bold text-accent">
                {it.preco}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{it.descricao}</p>
          <div className="mt-3 space-y-1 text-xs">
            <p className="flex items-start gap-1 text-accent">
              <MapPin className="mt-0.5 h-3 w-3" /> {it.endereco}
            </p>
            {it.contato && (
              <p className="flex items-center gap-1 text-muted-foreground">
                <Phone className="h-3 w-3" /> {it.contato}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
