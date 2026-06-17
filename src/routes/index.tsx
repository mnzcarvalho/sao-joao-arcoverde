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
import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import topImg from "@/assets/top.jpg";
import mapaPernambuco from "@/assets/mapa-pernambuco.png";
import { useProgramacao } from "@/features/programacao/hooks/useProgramacao";
import { usePolos } from "@/features/polos/hooks/usePolos";
import type { Show } from "@/types/domain";

// Importação dos cartazes juninos
import arraiaDoCecora from "@/assets/cartaz/arraiaDoCecora.jpg";
import estacaoCultural from "@/assets/cartaz/estacaoCultural.jpg";
import festaDeSantoAntonio from "@/assets/cartaz/festaDeSantoAntonio.jpg";
import poloCGA from "@/assets/cartaz/poloCGA.jpg";
import poloCorredorCultural from "@/assets/cartaz/poloCorredorCultural.jpg";
import poloDaCruz from "@/assets/cartaz/poloDaCruz.jpg";
import poloDaPoesia from "@/assets/cartaz/poloDaPoesia.jpg";
import poloDasArtes from "@/assets/cartaz/poloDasArtes.jpg";
import poloMulticultural from "@/assets/cartaz/poloMulticultural.jpg";
import poloMultimusical from "@/assets/cartaz/poloMultimusical.jpg";
import poloPeDeSerra from "@/assets/cartaz/poloPeDeSerra.jpg";
import poloRaizesDoCoco from "@/assets/cartaz/poloRaizesDoCoco.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "São João de Arcoverde — O melhor do Brasil" },
      {
        name: "description",
        content:
          "Tradição, cultura e alegria no maior São João do sertão pernambucano. 13 a 28 de junho de 2026.",
      },
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
  {
    icon: Flame,
    title: "Cultura e tradição",
    desc: "Raízes que encantam",
    color: "var(--bonfire)",
  },
  { icon: Sparkles, title: "Ambiente familiar", desc: "Diversão para todos", color: "var(--gold)" },
  {
    icon: Heart,
    title: "Hospitalidade",
    desc: "O melhor do Brasil!",
    color: "oklch(0.66 0.22 25)",
  },
];

const BANNERS = [
  { id: 1, img: poloMulticultural, alt: "Polo Multicultural" },
  { id: 2, img: arraiaDoCecora, alt: "Arraiá do Cecora" },
  { id: 3, img: estacaoCultural, alt: "Estação Cultural" },
  { id: 4, img: festaDeSantoAntonio, alt: "Festa de Santo Antônio" },
  { id: 5, img: poloCGA, alt: "Polo CGA" },
  { id: 6, img: poloCorredorCultural, alt: "Polo Corredor Cultural" },
  { id: 7, img: poloDaCruz, alt: "Polo da Cruz" },
  { id: 8, img: poloDaPoesia, alt: "Polo da Poesia" },
  { id: 9, img: poloDasArtes, alt: "Polo das Artes" },
  { id: 10, img: poloMultimusical, alt: "Polo Multimusical" },
  { id: 11, img: poloPeDeSerra, alt: "Polo Pé de Serra" },
  { id: 12, img: poloRaizesDoCoco, alt: "Polo Raízes do Coco" },
];

function formatDay(iso: string) {
  const [, m, d] = iso.split("-");
  const months = [
    "", "JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"
  ];
  return { dia: d, mes: months[Number(m)] ?? "" };
}

function getVizinhos(idx: number, len: number): number[] {
  const prev2 = (idx - 2 + len) % len;
  const prev1 = (idx - 1 + len) % len;
  const next1 = (idx + 1) % len;
  const next2 = (idx + 2) % len;
  return [prev2, prev1, next1, next2];
}

function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const len = BANNERS.length;

  const prevSlide = () => {
    setCurrentIndex((i) => (i === 0 ? len - 1 : i - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((i) => (i === len - 1 ? 0 : i + 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const vizinhos = getVizinhos(currentIndex, len);
    vizinhos.forEach((i) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = BANNERS[i].img;
      document.head.appendChild(link);
      setTimeout(() => link.remove(), 2000);
    });
  }, [currentIndex]);

  const ativos = [currentIndex, ...getVizinhos(currentIndex, len)];

  return (
    <div className="w-full relative group">
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
        {ativos.map((i) => (
          <img
            key={BANNERS[i].id}
            src={BANNERS[i].img}
            alt={BANNERS[i].alt}
            className={`absolute inset-0 w-full h-full object-contain rounded-2xl transition-opacity duration-500 ${
              i === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            loading={i === currentIndex ? "eager" : "lazy"}
          />
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 shadow-md text-black hover:bg-white transition"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 shadow-md text-black hover:bg-white transition"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {BANNERS.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${currentIndex === index ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
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
    return [...shows].sort((a, b) => a.data.localeCompare(b.data)).slice(0, 8);
  }, [shows]);

  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    carouselRef.current?.scrollBy({ left: dir * 220, behavior: "smooth" });
  };

  return (
    <main className="mx-auto min-h-screen max-w-xl pb-28">
      {/* ============ HERO ============ */}
      <section className="hero-night relative px-4 pt-0 sm:px-5">
        <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden>
          <div className="absolute top-10 right-6 h-2 w-2 rounded-full bg-[color:var(--gold)] animate-sparkle" />
          <div
            className="absolute top-24 right-16 h-1.5 w-1.5 rounded-full bg-[color:var(--magenta)] animate-sparkle"
            style={{ animationDelay: "0.6s" }}
          />
          <div
            className="absolute top-32 left-8 h-1.5 w-1.5 rounded-full bg-[color:var(--gold)] animate-sparkle"
            style={{ animationDelay: "1.1s" }}
          />
        </div>

        <div className="relative -mx-4 sm:-mx-5 w-[calc(100%+2rem)] sm:w-[calc(100%+2.5rem)]">
          <img
            src={topImg}
            alt="São João de Arcoverde — O melhor do Brasil"
            className="w-full block drop-shadow-[0_6px_18px_rgba(214,51,132,0.35)]"
          />

          <div className="absolute bottom-0 left-0 right-0 z-10 pl-4 pb-2 sm:pb-5 flex flex-col items-start text-left space-y-1.5 max-w-[48%]">
            <p className="text-[9px] sm:text-[12px] md:text-sm font-medium leading-relaxed text-[color:var(--foreground)]/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Tradição, cultura e alegria que <br/>
              encantam gerações. Venha viver o <br/>São João mais autêntico do país!

            </p>

            <div className="date-badge inline-flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-1 text-[8px] font-bold text-[color:var(--gold)] sm:text-[11px] bg-night/70 backdrop-blur-sm border border-white/5 shadow-md">
              <Calendar className="h-3 w-3 shrink-0" />
              <span className="whitespace-nowrap">13 a 28 de junho · 2026</span>
            </div>

            <div className="w-full">
              <Link
                to="/programacao"
                className="cta-festa inline-flex w-full items-center justify-center gap-1 rounded-full px-2.5 py-1.5 text-[8px] font-extrabold uppercase tracking-wide sm:text-xs shadow-glow border border-white/10"
              >
                <span className="truncate">Veja a programação completa</span>
                <ArrowRight className="h-3 w-3 shrink-0" />
              </Link>
            </div>
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

        {/* Grade de Botões (Mantida como você pediu) */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {tiles.map(({ to, label, desc, icon: Icon, color }) => (
            <Link key={to} to={to} className="tile-light group flex flex-col gap-2 p-3.5">
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

        {/* Título "Todos os Polos" com a cor #1D0044 aplicada diretamente na barra */}
        <div
          className="mx-4 mb-5 flex items-center justify-center rounded-xl py-3 px-6 shadow-md border-b-4 border-[color:var(--flag-yellow)]"
          style={{ backgroundColor: "#1D0044" }}
        >
          <h3 className="font-display text-xl font-bold uppercase tracking-widest text-white drop-shadow-sm">
            Polos e atrações!
          </h3>
        </div>

        {/* Banner com setas */}
        <BannerCarousel />
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
        
        {/* Listagem original sem filtros */}
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

      {/* ============ SEÇÃO TRADIÇÃO E HISTÓRIA ============ */}
      <section className="px-4 pt-6">
        <div className="card-night relative overflow-hidden p-4 sm:p-6 flex flex-row items-center justify-between gap-3 sm:gap-6">
          <div className="flex flex-col items-start text-left space-y-3 w-[65%] sm:flex-1">
            <div className="space-y-1">
              <h2 className="text-[12px] sm:text-base font-extrabold uppercase tracking-wider text-white">
                TRADIÇÃO QUE AQUECE O CORAÇÃO
              </h2>
              <p className="text-[11px] sm:text-[13px] leading-relaxed text-white/90">
                O São João de Arcoverde é feito de música, dança, comida boa e do calor de um povo que recebe com alegria!
              </p>
            </div>

            <Link
              to="/sobre"
              className="cta-festa inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-2 text-[9px] sm:text-xs font-extrabold uppercase tracking-wide shadow-glow border border-white/10 whitespace-nowrap"
            >
              <span>CONHEÇA NOSSA HISTÓRIA</span>
              <ArrowRight className="h-3 w-3 shrink-0" />
            </Link>
          </div>

          <div className="flex flex-col items-center text-center w-[35%] shrink-0 space-y-1.5">
            <img
              src={mapaPernambuco}
              alt="Mapa de Pernambuco"
              className="w-full max-w-[90px] sm:max-w-[140px] h-auto object-contain"
            />
            <div className="leading-tight">
              <p className="text-[10px] sm:text-[12px] font-black uppercase tracking-wider text-[color:var(--gold)]">
                ARCOVERDE
              </p>
              <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-white/60">
                PERNAMBUCO
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