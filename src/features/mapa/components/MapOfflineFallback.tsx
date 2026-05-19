import { MapPin, WifiOff } from "lucide-react";
import type { Polo } from "@/types/domain";

interface Props {
  polos: Polo[];
  onSelect?: (id: string) => void;
  selectedId?: string;
}

/** Offline fallback: lista de polos com endereço + coordenadas + link geo:. */
export function MapOfflineFallback({ polos, onSelect, selectedId }: Props) {
  return (
    <div className="mx-4 space-y-3">
      <div className="flex items-center gap-2 rounded-2xl border border-border bg-[var(--surface)] px-4 py-3 text-xs text-muted-foreground">
        <WifiOff className="h-4 w-4" aria-hidden />
        <span>Você está offline. Mostrando localizações em modo lista.</span>
      </div>
      <ul className="space-y-2">
        {polos.map((p) => {
          const active = p.id === selectedId;
          return (
            <li key={p.id}>
              <button
                onClick={() => onSelect?.(p.id)}
                className={`card-tile flex w-full items-start gap-3 p-4 text-left transition ${
                  active ? "border-primary" : ""
                }`}
              >
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                <div className="flex-1">
                  <p className="font-display text-base font-semibold">{p.nome}</p>
                  <p className="text-xs text-muted-foreground">{p.endereco}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {p.lat.toFixed(5)}, {p.lng.toFixed(5)}
                  </p>
                  <a
                    href={`geo:${p.lat},${p.lng}?q=${p.lat},${p.lng}(${encodeURIComponent(p.nome)})`}
                    className="mt-2 inline-block text-xs font-bold text-primary underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Abrir no app de mapas
                  </a>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
