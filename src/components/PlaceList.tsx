import type { Lugar } from "@/types/domain";
import { MapPin, Phone } from "lucide-react";

interface Props {
  items: Lugar[];
  emptyLabel?: string;
  imagensMap?: Record<string, string>;
}

export function PlaceList({ items, emptyLabel, imagensMap }: Props) {
  if (!items.length)
    return (
      <p className="px-4 text-sm text-muted-foreground">{emptyLabel ?? "Nada por aqui ainda."}</p>
    );
  return (
    <ul className="space-y-3 px-4">
      {items.map((it) => {
        const imgSrc = imagensMap?.[it.id];
        return (
          <li key={it.id} className="card-tile flex gap-3 p-4">
            {imgSrc ? (
              <img
                src={imgSrc}
                alt={it.nome}
                className="h-24 w-24 shrink-0 rounded-xl object-cover md:h-32 md:w-32"
              />
            ) : null}
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-lg font-semibold">{it.nome}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{it.descricao}</p>
              <div className="mt-3 space-y-1.5 text-xs">
                <a
                  href={it.linkMaps}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-1 text-accent underline-offset-2 hover:underline"
                >
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {it.endereco}
                </a>
                {it.contato && (
                  <a
                    href={`tel:${it.contato.replace(/\D/g, "")}`}
                    className="flex items-center gap-1 text-muted-foreground"
                  >
                    <Phone className="h-3 w-3" /> {it.contato}
                  </a>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
