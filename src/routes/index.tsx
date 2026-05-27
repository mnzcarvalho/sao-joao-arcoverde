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
  { to: "/programacao", label: "Programação", icon: Calendar, color: "var(--magenta)" },
  { to: "/polos", label: "Polos", icon: MapPin, color: "var(--bonfire)" },
  { to: "/gastronomia", label: "Onde Comer", icon: Utensils, color: "var(--gold)" },
  { to: "/hospedagem", label: "Onde Ficar", icon: BedDouble, color: "var(--magenta)" },
  { to: "/turismo", label: "Turismo", icon: Camera, color: "var(--bonfire)" },
  { to: "/sobre", label: "Sobre", icon: Info, color: "var(--gold)" },
] as const;

function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col pb-24">
      <div className="bunting-elegant stars-bg" aria-hidden />

      {/* Hero com ilustrações SVG detalhadas */}
      <section className="purple-gradient-hero relative px-6 pt-6">
        {/* Fogos de artifício sutis no fundo */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden>
          {/* Fogo 1 - canto superior esquerdo */}
          <svg className="firework-burst absolute top-6 left-8 h-12 w-12 text-yellow-300" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="2" fill="currentColor" />
            <line x1="20" y1="20" x2="20" y2="8" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
            <line x1="20" y1="20" x2="20" y2="32" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
            <line x1="20" y1="20" x2="8" y2="20" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
            <line x1="20" y1="20" x2="32" y2="20" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
            <line x1="20" y1="20" x2="12" y2="12" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
            <line x1="20" y1="20" x2="28" y2="28" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
            <line x1="20" y1="20" x2="28" y2="12" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
            <line x1="20" y1="20" x2="12" y2="28" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
          </svg>
          
          {/* Fogo 2 - canto superior direito */}
          <svg className="firework-burst-delayed absolute top-8 right-10 h-10 w-10 text-orange-300" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="1.5" fill="currentColor" />
            <line x1="20" y1="20" x2="20" y2="6" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
            <line x1="20" y1="20" x2="20" y2="34" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
            <line x1="20" y1="20" x2="6" y2="20" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
            <line x1="20" y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
            <line x1="20" y1="20" x2="10" y2="10" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
            <line x1="20" y1="20" x2="30" y2="30" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
          </svg>
        </div>

        {/* Fogueira detalhada central */}
        <div className="relative mx-auto mb-4 flex justify-center" aria-hidden>
          <svg className="fire-detailed animate-fire-flame h-16 w-16 sm:h-20 sm:w-20" viewBox="0 0 64 64" fill="none">
            {/* Madeiras cruzadas */}
            <line x1="12" y1="56" x2="48" y2="36" stroke="#8B4513" strokeWidth="5" strokeLinecap="round" />
            <line x1="48" y1="56" x2="12" y2="36" stroke="#8B4513" strokeWidth="5" strokeLinecap="round" />
            <line x1="18" y1="54" x2="42" y2="40" stroke="#A0522D" strokeWidth="3" strokeLinecap="round" />
            
            {/* Brasa brilhante */}
            <ellipse cx="32" cy="52" rx="10" ry="4" fill="#FF4500" opacity="0.85" />
            <ellipse cx="32" cy="51" rx="6" ry="2.5" fill="#FF6347" opacity="0.6" />
            
            {/* Chamas internas (vermelho) */}
            <path d="M26 50 Q32 36 38 50 Q32 54 26 50" fill="#DC143C" opacity="0.9">
              <animate attributeName="d" dur="2s" repeatCount="indefinite"
                values="M26 50 Q32 36 38 50 Q32 54 26 50;
                        M26 49 Q32 34 38 49 Q32 53 26 49;
                        M26 50 Q32 36 38 50 Q32 54 26 50" />
            </path>
            
            {/* Chamas médias (laranja) */}
            <path d="M24 48 Q32 32 40 48 Q32 52 24 48" fill="#FF6347">
              <animate attributeName="d" dur="2s" repeatCount="indefinite"
                values="M24 48 Q32 32 40 48 Q32 52 24 48;
                        M24 47 Q32 30 40 47 Q32 51 24 47;
                        M24 48 Q32 32 40 48 Q32 52 24 48" />
            </path>
            
            {/* Chamas externas (laranja vivo) */}
            <path d="M22 46 Q32 28 42 46 Q32 50 22 46" fill="#FF4500">
              <animate attributeName="d" dur="2s" repeatCount="indefinite"
                values="M22 46 Q32 28 42 46 Q32 50 22 46;
                        M22 45 Q32 26 42 45 Q32 49 22 45;
                        M22 46 Q32 28 42 46 Q32 50 22 46" />
            </path>
            
            {/* Chamas externas (amarelo) */}
            <path d="M20 44 Q32 24 44 44 Q32 48 20 44" fill="#FFA500">
              <animate attributeName="d" dur="2s" repeatCount="indefinite"
                values="M20 44 Q32 24 44 44 Q32 48 20 44;
                        M20 43 Q32 22 44 43 Q32 47 20 43;
                        M20 44 Q32 24 44 44 Q32 48 20 44" />
            </path>
            
            {/* Chamas externas (amarelo brilhante) */}
            <path d="M18 42 Q32 20 46 42 Q32 46 18 42" fill="#FFD700" opacity="0.8">
              <animate attributeName="d" dur="2s" repeatCount="indefinite"
                values="M18 42 Q32 20 46 42 Q32 46 18 42;
                        M18 41 Q32 18 46 41 Q32 45 18 41;
                        M18 42 Q32 20 46 42 Q32 46 18 42" />
            </path>
            
            {/* Faíscas subindo */}
            <circle cx="30" cy="32" r="1.2" fill="#FFD700" className="animate-ember" style={{ animationDelay: '0s' }} />
            <circle cx="34" cy="30" r="1" fill="#FFA500" className="animate-ember" style={{ animationDelay: '0.5s' }} />
            <circle cx="28" cy="34" r="0.8" fill="#FF6347" className="animate-ember" style={{ animationDelay: '1s' }} />
            <circle cx="36" cy="28" r="1" fill="#FFD700" className="animate-ember" style={{ animationDelay: '0.7s' }} />
            <circle cx="32" cy="26" r="0.8" fill="#FFA500" className="animate-ember" style={{ animationDelay: '1.2s' }} />
            <circle cx="31" cy="33" r="0.6" fill="#FFD700" className="animate-ember" style={{ animationDelay: '0.3s' }} />
            <circle cx="35" cy="31" r="0.7" fill="#FF6347" className="animate-ember" style={{ animationDelay: '0.9s' }} />
          </svg>
        </div>

        {/* Cactos do sertão */}
        <div className="absolute top-36 left-3 sm:left-5" aria-hidden>
          <svg className="cactus-sertao h-12 w-12 text-green-700" viewBox="0 0 40 60" fill="currentColor">
            {/* Tronco principal */}
            <rect x="12" y="18" width="14" height="38" rx="7" />
            {/* Braço esquerdo */}
            <path d="M12 32 Q2 32 2 24 Q2 18 8 18" strokeWidth="9" stroke="currentColor" fill="none" strokeLinecap="round" />
            {/* Braço direito */}
            <path d="M28 28 Q38 28 38 20 Q38 16 34 16" strokeWidth="9" stroke="currentColor" fill="none" strokeLinecap="round" />
            {/* Espinhos (pontos sutis) */}
            <circle cx="16" cy="24" r="0.5" fill="white" opacity="0.3" />
            <circle cx="20" cy="28" r="0.5" fill="white" opacity="0.3" />
            <circle cx="18" cy="34" r="0.5" fill="white" opacity="0.3" />
            <circle cx="24" cy="26" r="0.5" fill="white" opacity="0.3" />
            <circle cx="22" cy="32" r="0.5" fill="white" opacity="0.3" />
            <circle cx="17" cy="38" r="0.5" fill="white" opacity="0.3" />
            <circle cx="25" cy="30" r="0.5" fill="white" opacity="0.3" />
            <circle cx="21" cy="36" r="0.5" fill="white" opacity="0.3" />
          </svg>
        </div>
        
        <div className="absolute top-40 right-3 sm:right-5" aria-hidden>
          <svg className="cactus-sertao h-10 w-10 text-green-700" viewBox="0 0 40 60" fill="currentColor">
            {/* Tronco principal */}
            <rect x="12" y="20" width="13" height="35" rx="6.5" />
            {/* Braço esquerdo */}
            <path d="M12 30 Q4 30 4 24 Q4 20 7 20" strokeWidth="8" stroke="currentColor" fill="none" strokeLinecap="round" />
            {/* Braço direito */}
            <path d="M27 27 Q36 27 36 21 Q36 18 33 18" strokeWidth="8" stroke="currentColor" fill="none" strokeLinecap="round" />
            {/* Espinhos */}
            <circle cx="15" cy="25" r="0.4" fill="white" opacity="0.3" />
            <circle cx="19" cy="29" r="0.4" fill="white" opacity="0.3" />
            <circle cx="17" cy="35" r="0.4" fill="white" opacity="0.3" />
            <circle cx="23" cy="27" r="0.4" fill="white" opacity="0.3" />
            <circle cx="21" cy="33" r="0.4" fill="white" opacity="0.3" />
          </svg>
        </div>

        {/* Badge de data moderno */}
        <div className="relative mx-auto mb-3 flex justify-center">
          <div className="date-badge inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-semibold text-yellow-300 shadow-lg">
            <Sparkles className="h-4 w-4 animate-sparkle" />
            13 a 28 de junho · 2026
          </div>
        </div>

        {/* Título */}
        <p className="relative mb-1 text-center text-xs font-bold uppercase tracking-[0.35em] text-[color:var(--gold)]">São João de</p>
        <h1 className="title-glow-festa relative mb-3 text-center text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">
          ARCOVERDE
        </h1>

        {/* Slogan em chip gradiente */}
        <div className="relative mb-4 flex justify-center">
          <div className="slogan-chip rounded-full px-6 py-2.5 text-sm font-extrabold uppercase shadow-lg">
            O melhor do Brasil!
          </div>
        </div>

        {/* Igreja colonial detalhada */}
        <div className="relative mx-auto church-silhouette" aria-hidden>
          <svg className="h-16 w-16 sm:h-20 sm:w-20 text-purple-200" viewBox="0 0 80 80" fill="currentColor">
            {/* Torre esquerda */}
            <rect x="12" y="32" width="14" height="32" rx="1" />
            <rect x="15" y="42" width="3" height="6" rx="1.5" fill="#14063D" />
            <circle cx="19" cy="30" r="2.5" fill="#14063D" opacity="0.7" />
            <rect x="13" y="26" width="12" height="4" rx="1" fill="#14063D" opacity="0.5" />
            
            {/* Torre direita */}
            <rect x="54" y="32" width="14" height="32" rx="1" />
            <rect x="62" y="42" width="3" height="6" rx="1.5" fill="#14063D" />
            <circle cx="61" cy="30" r="2.5" fill="#14063D" opacity="0.7" />
            <rect x="55" y="26" width="12" height="4" rx="1" fill="#14063D" opacity="0.5" />
            
            {/* Corpo central */}
            <rect x="26" y="36" width="28" height="28" />
            
            {/* Porta arqueada */}
            <path d="M34 64 V50 Q34 45 40 45 Q46 45 46 50 V64" fill="#14063D" />
            
            {/* Janela central circular */}
            <circle cx="40" cy="33" r="4" fill="#14063D" />
            <circle cx="40" cy="33" r="2" fill="currentColor" opacity="0.3" />
            
            {/* Telhado central */}
            <path d="M23 36 L40 22 L57 36" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.7" />
            
            {/* Cruz no topo */}
            <line x1="40" y1="14" x2="40" y2="22" stroke="currentColor" strokeWidth="2" />
            <line x1="37" y1="17" x2="43" y2="17" stroke="currentColor" strokeWidth="2" />
            
            {/* Detalhes arquitetônicos - janelas laterais */}
            <rect x="29" y="48" width="4" height="6" rx="2" fill="#14063D" opacity="0.6" />
            <rect x="47" y="48" width="4" height="6" rx="2" fill="#14063D" opacity="0.6" />
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
