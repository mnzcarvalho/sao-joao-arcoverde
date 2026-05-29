import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Calendar,
  MapPin,
  Utensils,
  BedDouble,
  Camera,
  Info,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Music,
  Flame,
  Sparkles,
  Heart,
} from "lucide-react";
import { useMemo, useRef } from "react";
import heroTitle from "@/assets/hero-title.png";
import igreja from "@/assets/igreja.png";
import sanfoneiro from "@/assets/sanfoneiro.png";
import casalDancando from "@/assets/casal-dancando.png";
import mapaPernambuco from "@/assets/mapa-pernambuco.png";
import { useProgramacao } from "@/features/programacao/hooks/useProgramacao";
import { usePolos } from "@/features/polos/hooks/usePolos";
import type { Show } from "@/types/domain";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "São João de Arcoverde — O melhor do Brasil" },
      { name: "description", content: "Tradição, cultura e alegria no maior São João do sertão pernambucano. 13 a 28 de junho de 2026." },
    ],
  }),
});

const tiles = [
  {
    to: "/programacao",
    label: "Programação",
    desc: "Confira os shows, datas e horários.",
    icon: Calendar,
    color: "var(--magenta)",
  },
  {
    to: "/polos",
    label: "Polos",
    desc: "Conheça os polos e suas atrações.",
    icon: MapPin,
    color: "var(--bonfire)",
  },
  {
    to: "/gastronomia",
    label: "Onde Comer",
    desc: "Descubra os melhores sabores do São João.",
    icon: Utensils,
    color: "var(--gold)",
  },
  {
    to: "/hospedagem",
    label: "Onde Ficar",
    desc: "Encontre hospedagens perto de você.",
    icon: BedDouble,
    color: "var(--magenta)",
  },
  {
    to: "/turismo",
    label: "Turismo",
    desc: "Explore Arcoverde e seus encantos.",
    icon: Camera,
    color: "oklch(0.65 0.17 165)",
  },
  {
    to: "/sobre",
    label: "Sobre",
    desc: "História, cultura e tradição.",
    icon: Info,
    color: "oklch(0.66 0.16 240)",
  },
] as const;

const features = [
  { icon: Music, title: "Música ao vivo", desc: "Todos os dias", color: "var(--magenta)" },
  { icon: Flame, title: "Cultura e tradição", desc: "Raízes que encantam", color: "var(--bonfire)" },
  { icon: Sparkles, title: "Ambiente familiar", desc: "Diversão para todos", color: "var(--gold)" },
  { icon: Heart, title: "Hospitalidade", desc: "O melhor do Brasil!", color: "oklch(0.66 0.22 25)" },
];

function formatDay(iso: string) {
  const [, m, d] = iso.split("-");
  const months = ["", "JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
  return { dia: d, mes: months[Number(m)] ?? "" };
}

function Home() {
  const shows = useProgramacao();
  const polos = usePolos();
  const poloNome = useMemo(() => {
    const map = new Map<string, string>();
    polos.forEach((p) => map.set(p.id, p.nome));
    return map;
  }, [polos]);

  const destaques: Show[] = useMemo(() => {
    return [...shows]
      .sort((a, b) => a.data.localeCompare(b.data))
      .slice(0, 8);
  }, [shows]);

  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    carouselRef.current?.scrollBy({ left: dir * 220, behavior: "smooth" });
  };

  return (
    <main className="mx-auto min-h-screen max-w-xl pb-28">
      {/* ============ HERO ============ */}
      <section className="hero-night relative overflow-hidden px-5 pt-3 pb-6">
        {/* bandeirinhas no topo */}
        <div className="bunting-elegant -mx-5 mb-3" aria-hidden />

        {/* fogos sutis */}
        <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden>
          <div className="absolute top-10 right-6 h-2 w-2 rounded-full bg-[color:var(--gold)] animate-sparkle" />
          <div className="absolute top-24 right-16 h-1.5 w-1.5 rounded-full bg-[color:var(--magenta)] animate-sparkle" style={{ animationDelay: "0.6s" }} />
          <div className="absolute top-32 left-8 h-1.5 w-1.5 rounded-full bg-[color:var(--gold)] animate-sparkle" style={{ animationDelay: "1.1s" }} />
        </div>

        {/* logo título + ilustrações lado a lado */}
        <div className="relative grid grid-cols-[1.05fr_0.95fr] items-end gap-2">
          <div className="pt-1">
            <img
              src={heroTitle}
              alt="São João de Arcoverde — O melhor do Brasil"
              className="w-full max-w-[240px] drop-shadow-[0_6px_18px_rgba(214,51,132,0.35)]"
            />
          </div>
          <div className="relative h-[180px]">
            <img
              src={igreja}
              alt=""
              aria-hidden
              className="absolute right-0 top-0 h-[140px] w-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.45)]"
            />
            <img
              src={sanfoneiro}
              alt=""
              aria-hidden
              className="absolute -bottom-2 left-0 h-[130px] w-auto drop-shadow-[0_8px_18px_rgba(0,0,0,0.4)]"
            />
            <img
              src={casalDancando}
              alt=""
              aria-hidden
              className="absolute -bottom-2 right-1 h-[110px] w-auto drop-shadow-[0_8px_18px_rgba(0,0,0,0.4)]"
            />
          </div>
        </div>

        {/* descrição + badge + CTA */}
        <div className="relative mt-3 space-y-3">
          <p className="text-[13px] leading-relaxed text-[color:var(--foreground)]/85">
            Tradição, cultura e alegria que encantam gerações. Venha viver o São João mais autêntico do país!
          </p>

          <div className="date-badge inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-bold text-[color:var(--gold)]">
            <Calendar className="h-4 w-4" />
            13 a 28 de junho · 2026
          </div>

          <div>
            <Link
              to="/programacao"
              className="cta-festa inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-extrabold uppercase tracking-wide"
            >
              Veja a programação completa
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ O QUE VOCÊ PROCURA ============ */}
      <section className="bg-cream px-4 pt-6 pb-7">
        <h2 className="mb-4 flex items-center justify-center gap-2 text-center text-base font-extrabold uppercase tracking-wider text-on-cream">
          <Sparkles className="h-4 w-4 text-[color:var(--bonfire)]" />
          O que você procura?
          <Sparkles className="h-4 w-4 text-[color:var(--bonfire)]" />
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {tiles.map(({ to, label, desc, icon: Icon, color }) => (
            <Link
              key={to}
              to={to}
              className="tile-light group flex flex-col gap-2 p-3.5"
            >
              <div
                className="icon-badge grid h-11 w-11 place-items-center rounded-2xl"
                style={{ "--color": color } as React.CSSProperties}
              >
                <Icon className="h-5 w-5" strokeWidth={2.4} />
              </div>
              <div>
                <h3 className="text-[13px] font-extrabold uppercase tracking-wide text-on-cream">
                  {label}
                </h3>
                <p className="mt-0.5 text-[11.5px] leading-snug muted-on-cream">{desc}</p>
              </div>
              <ArrowRight
                className="mt-auto h-4 w-4 transition-transform group-hover:translate-x-1"
                style={{ color: color as string }}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* ============ PROGRAMAÇÃO EM DESTAQUE ============ */}
      <section className="px-4 pt-6">
        <div className="card-night relative p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-white">
              <Sparkles className="h-4 w-4 text-[color:var(--gold)]" />
              Programação em destaque
            </h2>
            <Link
              to="/programacao"
              className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-white/90 hover:bg-white/10"
            >
              Ver toda <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="relative">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Anterior"
              className="absolute -left-2 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 sm:grid"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Próximo"
              className="absolute -right-2 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 sm:grid"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div
              ref={carouselRef}
              className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {destaques.length === 0 && (
                <p className="px-2 py-6 text-sm text-white/60">Programação em breve.</p>
              )}
              {destaques.map((s) => {
                const { dia, mes } = formatDay(s.data);
                return (
                  <Link
                    key={s.id}
                    to="/programacao"
                    className="group relative w-[160px] flex-none snap-start overflow-hidden rounded-2xl bg-gradient-to-b from-white/10 to-white/[0.02] ring-1 ring-white/10 hover:ring-[color:var(--magenta)]/40"
                  >
                    <div className="relative h-[88px] overflow-hidden bg-gradient-to-br from-[color:var(--magenta)]/40 via-[color:var(--bonfire)]/30 to-[color:var(--gold)]/30">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_60%)]" />
                      <div className="show-date-chip absolute left-2 top-2 flex flex-col items-center px-2 py-1.5">
                        <span className="text-[15px] leading-none">{dia}</span>
                        <span className="text-[9px] font-bold tracking-wider">{mes}</span>
                      </div>
                      <Music className="absolute bottom-2 right-2 h-5 w-5 text-white/80" />
                    </div>
                    <div className="p-2.5">
                      <p className="truncate text-[12.5px] font-bold text-white">{s.artista}</p>
                      <p className="mt-1 flex items-center gap-1 truncate text-[10.5px] text-white/70">
                        <MapPin className="h-3 w-3" />
                        {poloNome.get(s.polo) ?? s.polo}
                      </p>
                      {s.genero && (
                        <p className="mt-0.5 truncate text-[10px] text-[color:var(--gold)]/90">
                          {s.genero}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRADIÇÃO QUE AQUECE O CORAÇÃO ============ */}
      <section className="px-4 pt-4">
        <div className="card-night relative overflow-hidden p-4">
          <div className="grid grid-cols-[1fr_1.2fr] items-center gap-2">
            <img
              src={casalDancando}
              alt=""
              aria-hidden
              className="h-[130px] w-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]"
            />
            <div>
              <h2 className="text-base font-extrabold uppercase leading-tight text-white">
                Tradição que aquece o coração
              </h2>
              <p className="mt-2 text-[12px] leading-relaxed text-white/80">
                O São João de Arcoverde é feito de música, dança, comida boa e do calor de um povo que recebe com alegria!
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-end justify-between gap-3">
            <Link
              to="/sobre"
              className="cta-gold inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-extrabold uppercase tracking-wide"
            >
              Conheça nossa história
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="relative w-[110px] shrink-0">
              <img src={mapaPernambuco} alt="Localização: Arcoverde, Pernambuco" className="w-full opacity-95" />
              <p className="mt-1 text-right text-[10px] font-extrabold uppercase tracking-wider text-[color:var(--gold)]">
                Arcoverde
                <span className="block text-[8.5px] font-bold text-white/60">Pernambuco</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURE CHIPS ============ */}
      <section className="grid grid-cols-2 gap-2.5 px-4 pt-4">
        {features.map(({ icon: Icon, title, desc, color }) => (
          <div
            key={title}
            className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] p-2.5 backdrop-blur"
          >
            <div
              className="grid h-9 w-9 place-items-center rounded-xl"
              style={{
                background: `color-mix(in oklab, ${color} 22%, transparent)`,
                color: color as string,
              }}
            >
              <Icon className="h-4.5 w-4.5" strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[11.5px] font-extrabold uppercase tracking-wide text-white">
                {title}
              </p>
              <p className="truncate text-[10.5px] text-white/60">{desc}</p>
            </div>
          </div>
        ))}
      </section>

      <p className="px-6 pt-5 text-center text-[11px] text-white/55">
        💾 Disponível offline · 🎶 Forró pé de serra
      </p>
    </main>
  );
}
