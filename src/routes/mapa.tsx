import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, PageShell } from "@/components/PageShell";
import { loadData } from "@/lib/store";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/mapa")({
  component: Mapa,
  head: () => ({ meta: [{ title: "Mapa dos Polos — São João de Arcoverde" }, { name: "description", content: "Localização de todos os polos da festa no mapa." }] }),
});

// Simple offline SVG map: positions points using lat/lng normalized to bbox.
function Mapa() {
  const data = useMemo(() => loadData(), []);
  const [sel, setSel] = useState(data.polos[0]?.id);

  const lats = data.polos.map(p => p.lat);
  const lngs = data.polos.map(p => p.lng);
  const pad = 0.003;
  const minLat = Math.min(...lats) - pad;
  const maxLat = Math.max(...lats) + pad;
  const minLng = Math.min(...lngs) - pad;
  const maxLng = Math.max(...lngs) + pad;

  const W = 320, H = 320;
  const proj = (lat: number, lng: number) => ({
    x: ((lng - minLng) / (maxLng - minLng)) * W,
    y: H - ((lat - minLat) / (maxLat - minLat)) * H,
  });

  const selPolo = data.polos.find(p => p.id === sel);

  return (
    <PageShell>
      <PageHeader title="Mapa dos Polos" subtitle="Funciona offline" />

      <div className="mx-4 overflow-hidden rounded-3xl border border-border bg-[var(--surface)]">
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full">
          {/* grid */}
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="oklch(0.32 0.06 285)" strokeWidth="0.5" />
            </pattern>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="oklch(0.74 0.18 55)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="oklch(0.74 0.18 55)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width={W} height={H} fill="url(#grid)" />
          {/* river/streets decorative */}
          <path d={`M 0 ${H*0.6} Q ${W*0.5} ${H*0.4} ${W} ${H*0.7}`} stroke="oklch(0.4 0.08 285)" strokeWidth="6" fill="none" opacity="0.6" />
          <path d={`M ${W*0.5} 0 L ${W*0.5} ${H}`} stroke="oklch(0.35 0.06 285)" strokeWidth="2" opacity="0.5" />
          {/* points */}
          {data.polos.map(p => {
            const { x, y } = proj(p.lat, p.lng);
            const active = p.id === sel;
            return (
              <g key={p.id} style={{ cursor: "pointer" }} onClick={() => setSel(p.id)}>
                {active && <circle cx={x} cy={y} r="28" fill="url(#glow)" />}
                <circle cx={x} cy={y} r={active ? 10 : 7} fill="oklch(0.74 0.18 55)" stroke="white" strokeWidth="2" />
                <text x={x} y={y - 14} textAnchor="middle" className="fill-white" fontSize="10" fontWeight="700">
                  {p.nome.replace("Polo ", "")}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {selPolo && (
        <div className="card-tile mx-4 mt-4 p-4">
          <h3 className="font-display text-lg font-semibold">{selPolo.nome}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{selPolo.descricao}</p>
          <p className="mt-2 flex items-center gap-1 text-xs text-accent"><MapPin className="h-3 w-3" /> {selPolo.endereco}</p>
          <a
            href={`https://www.google.com/maps?q=${selPolo.lat},${selPolo.lng}`}
            target="_blank" rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
          >
            Abrir no Google Maps
          </a>
        </div>
      )}
    </PageShell>
  );
}
