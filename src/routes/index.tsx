import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, MapPin, Music, Utensils, BedDouble, Camera, Info, Settings, Sparkles } from "lucide-react";

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
  { to: "/atracoes", label: "Atrações", icon: Music, color: "var(--flag-yellow)" },
  { to: "/gastronomia", label: "Gastronomia", icon: Utensils, color: "var(--flag-green)" },
  { to: "/hospedagem", label: "Hospedagem", icon: BedDouble, color: "var(--bonfire)" },
  { to: "/turismo", label: "Turismo", icon: Camera, color: "var(--flag-red)" },
  { to: "/sobre", label: "Sobre", icon: Info, color: "var(--flag-blue)" },
  { to: "/configuracoes", label: "Ajustes", icon: Settings, color: "var(--flag-yellow)" },
] as const;

function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-xl pb-28">
      <div className="bunting" aria-hidden />

      {/* Hero */}
      <section className="relative px-6 pt-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
          <Sparkles className="h-3.5 w-3.5" /> Junho 2026
        </div>
        <p className="mt-5 font-display text-lg text-accent">São João de</p>
        <h1 className="font-display text-5xl font-bold leading-none text-foreground text-glow">
          ARCOVERDE
        </h1>
        <div className="mt-3">
          <span className="ribbon text-sm">O melhor do Brasil!</span>
        </div>

        {/* Decorative scene */}
        <div className="mt-8 grid place-items-center">
          <div className="relative h-40 w-full overflow-hidden rounded-3xl bg-[var(--surface)] border border-border">
            {/* Stars */}
            <div className="absolute inset-0 opacity-70"
                 style={{ backgroundImage: "radial-gradient(2px 2px at 20% 30%, white, transparent), radial-gradient(1.5px 1.5px at 70% 20%, white, transparent), radial-gradient(2px 2px at 50% 70%, white, transparent), radial-gradient(1px 1px at 85% 60%, white, transparent)" }} />
            {/* Bonfire */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-5xl animate-flicker">🔥</div>
            <div className="absolute bottom-6 left-1/4 text-3xl">🌵</div>
            <div className="absolute bottom-6 right-1/4 text-3xl">⛪</div>
            <div className="absolute top-3 left-6 text-2xl">🎆</div>
            <div className="absolute top-5 right-6 text-2xl">🎇</div>
          </div>
        </div>
      </section>

      {/* Tile grid */}
      <section className="mt-8 grid grid-cols-3 gap-3 px-4">
        {tiles.map(({ to, label, icon: Icon, color }) => (
          <Link
            key={to}
            to={to}
            className="card-tile group flex aspect-square flex-col items-center justify-center gap-2 p-3 transition active:scale-95"
          >
            <div
              className="grid h-12 w-12 place-items-center rounded-full"
              style={{ background: `color-mix(in oklab, ${color} 25%, transparent)`, color }}
            >
              <Icon className="h-6 w-6" />
            </div>
            <span className="text-center text-xs font-semibold uppercase tracking-wide text-foreground">
              {label}
            </span>
          </Link>
        ))}
      </section>

      <p className="mt-8 px-6 text-center text-xs text-muted-foreground">
        💾 Todos os dados disponíveis offline
      </p>
    </main>
  );
}
