import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, MapPin, Utensils, BedDouble, Camera, Info, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "São João de Arcoverde — Início" },
      { name: "description", content: "Boas-vindas ao maior São João do sertão pernambucano." },
    ],
  }),
});

const tiles = [
  { to: "/programacao", label: "Programação", icon: Calendar, color: "var(--flag-red)" },
  { to: "/polos", label: "Polos", icon: MapPin, color: "var(--flag-blue)" },
  { to: "/gastronomia", label: "Onde Comer", icon: Utensils, color: "var(--flag-green)" },
  { to: "/hospedagem", label: "Onde Ficar", icon: BedDouble, color: "var(--bonfire)" },
  { to: "/turismo", label: "Turismo", icon: Camera, color: "var(--flag-yellow)" },
  { to: "/sobre", label: "Sobre", icon: Info, color: "var(--flag-red)" },
] as const;

function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col pb-24">
      <div className="bunting" aria-hidden />

      {/* Hero compacto */}
      <section className="relative px-6 pt-5 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-2)] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent">
          <Sparkles className="h-3 w-3" /> 13 a 28 de junho · 2026
        </div>
        <p className="mt-3 font-display text-base text-accent">São João de</p>
        <h1 className="font-display text-4xl font-bold leading-none text-foreground text-glow sm:text-5xl">
          ARCOVERDE
        </h1>
        <div className="mt-2">
          <span className="ribbon text-xs">O melhor do Brasil!</span>
        </div>
      </section>

      {/* Tile grid 3x2 compacto */}
      <section className="mt-6 grid grid-cols-3 gap-2.5 px-4">
        {tiles.map(({ to, label, icon: Icon, color }) => (
          <Link
            key={to}
            to={to}
            className="card-tile group flex aspect-square flex-col items-center justify-center gap-1.5 p-2 transition active:scale-95"
          >
            <div
              className="grid h-10 w-10 place-items-center rounded-full"
              style={{ background: `color-mix(in oklab, ${color} 25%, transparent)`, color }}
            >
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-center text-[10.5px] font-bold uppercase tracking-wide leading-tight text-foreground">
              {label}
            </span>
          </Link>
        ))}
      </section>

      <p className="mt-auto px-6 pt-4 text-center text-[10.5px] text-muted-foreground">
        💾 Disponível offline · 🎶 Forró pé de serra
      </p>
    </main>
  );
}
