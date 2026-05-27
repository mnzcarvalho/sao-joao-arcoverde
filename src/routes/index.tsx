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
      <div className="bunting-elegant stars-bg" aria-hidden />

      {/* Hero com ilustrações SVG */}
      <section className="hero-gradient relative px-6 pt-4 text-center">
        {/* Fogueira estilizada */}
        <div className="mx-auto mb-3 flex items-center justify-center gap-1" aria-hidden>
          <svg className="h-8 w-8 animate-fire fire-glow" viewBox="0 0 24 24" fill="var(--bonfire)">
            <path d="M12 2c0 0-3 3-3 6 0 2 1.5 3.5 3 4 1.5-.5 3-2 3-4 0-3-3-6-3-6zM8 12c0 0-2 2-2 4.5 0 2 1.5 3.5 4 4 1-.5 2-1.5 2-3 0-1.5-1-2.5-2-3.5zm8 0c0 0 2 2 2 4.5 0 2-1.5 3.5-4 4-1-.5-2-1.5-2-3 0-1.5 1-2.5 2-3.5z" />
          </svg>
        </div>

        {/* Badge de data */}
        <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-[var(--surface-2)] px-4 py-2 text-xs font-semibold tracking-widest text-accent shadow-lg">
          <Sparkles className="h-4 w-4 animate-sparkle" /> 13 a 28 de junho · 2026
        </div>

        {/* Título */}
        <p className="mt-3 text-sm font-semibold text-accent">São João de</p>
        <h1 className="mt-1 text-5xl font-extrabold leading-none text-glow-intense text-foreground sm:text-6xl">
          ARCOVERDE
        </h1>

        {/* Slogan */}
        <div className="mt-3">
          <span className="ribbon-premium">O melhor do Brasil!</span>
        </div>

        {/* Igreja do sertão */}
        <div className="mx-auto mt-4 flex items-end justify-center gap-1 opacity-60" aria-hidden>
          <svg className="h-12 w-12" viewBox="0 0 48 48" fill="none">
            <path
              d="M8 48V28l8-8 8 8v20H8zm24 0V20l8-8 8 8v28h-16zM24 4v12M20 8h8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* Grid de cards premium */}
      <section className="mt-6 grid grid-cols-3 gap-3 px-4">
        {tiles.map(({ to, label, icon: Icon, color }) => (
          <Link
            key={to}
            to={to}
            className="card-premium group flex flex-col items-center justify-center gap-2 p-3"
            style={{ "--color": color } as React.CSSProperties}
          >
            <div
              className="icon-badge grid h-12 w-12 place-items-center rounded-2xl"
              style={{ "--color": color } as React.CSSProperties}
            >
              <Icon className="h-6 w-6" />
            </div>
            <span className="text-center text-xs font-bold uppercase tracking-wide text-foreground">
              {label}
            </span>
          </Link>
        ))}
      </section>

      <p className="mt-auto px-6 pt-4 text-center text-xs text-muted-foreground">
        💾 Disponível offline · 🎶 Forró pé de serra
      </p>
    </main>
  );
}
