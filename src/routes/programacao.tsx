import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect, useRef } from "react";
import { PageHeader, PageShell } from "@/components/PageShell";
import { useProgramacao } from "@/features/programacao/hooks/useProgramacao";
import { usePolos } from "@/features/polos/hooks/usePolos";
import { useIsFavorito, toggleFavorito } from "@/features/favoritos/hooks/useFavoritos";
import { Heart, Search, User, Clock, Filter, X, Calendar } from "lucide-react";
import type { Show } from "@/types/domain";

const sortByHora = (a: Show, b: Show) => {
  const paraMinutos = (h: string | undefined) => {
    if (!h || !h.trim()) return 9999;
    const [hr, min] = h.split(":").map(Number);
    let total = hr * 60 + min;
    if (hr >= 0 && hr < 7) total += 24 * 60;
    return total;
  };
  return paraMinutos(a.hora) - paraMinutos(b.hora);
};

export const Route = createFileRoute("/programacao")({
  component: Programacao,
  head: () => ({
    meta: [
      { title: "Programação — São João de Arcoverde" },
      {
        name: "description",
        content: "Programação completa por polo, com bandas, cantores, dias e horários.",
      },
    ],
  }),
});

function Programacao() {
  const programacao = useProgramacao();
  const allPolos = usePolos();

  const POLO_ORDER = [
    "multicultural",
    "raizes-coco",
    "pe-de-serra",
    "polo-artes",
    "cga",
    "polo-poesia",
    "multimusical",
    "polo-cruz",
  ];
  const HIDDEN_POLOS = ["estacao-cultura"];

  const polos = useMemo(() => {
    const visible = allPolos.filter((p) => !HIDDEN_POLOS.includes(p.id));
    const inOrder: typeof visible = [];
    const rest: typeof visible = [];
    for (const p of visible) {
      if (POLO_ORDER.includes(p.id)) inOrder.push(p);
      else rest.push(p);
    }
    inOrder.sort((a, b) => POLO_ORDER.indexOf(a.id) - POLO_ORDER.indexOf(b.id));
    return [...inOrder, ...rest];
  }, [allPolos]);

  const [activePolo, setActivePolo] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | undefined>();
  const [showAllPolos, setShowAllPolos] = useState(false);

  const poloMap = useMemo(() => {
    const m = new Map<string, typeof polos[0]>();
    polos.forEach((p) => m.set(p.id, p));
    return m;
  }, [polos]);

  const activePoloNome = activePolo ? poloMap.get(activePolo)?.nome ?? "" : "";

  const diasComProgramacao = useMemo(() => {
    const dias = new Set<string>();
    programacao.forEach((s) => dias.add(s.data));
    return Array.from(dias).sort();
  }, [programacao]);

  const filterRef = useRef<HTMLDivElement>(null);
  const polosRef = useRef<HTMLDivElement>(null);
  
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    if (filterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filterOpen]);

  useEffect(() => {
    if (!activePolo && polos.length) setActivePolo(polos[0].id);
  }, [polos, activePolo]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const slider = polosRef.current;
    if (!slider) return;
    
    isDragging.current = false;
    startX.current = e.pageX - slider.offsetLeft;
    scrollLeft.current = slider.scrollLeft;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const x = moveEvent.pageX - slider.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      
      if (Math.abs(walk) > 5) {
        isDragging.current = true;
        slider.scrollLeft = scrollLeft.current - walk;
      }
    };

    const handleMouseUpOrLeave = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUpOrLeave);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUpOrLeave);
  };

  const handlePoloClick = (poloId: string) => {
    if (!isDragging.current) {
      setActivePolo(poloId);
    }
  };

  const shows = useMemo(() => {
    return programacao.filter((s) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query || 
        s.artista.toLowerCase().includes(query) || 
        (s.genero && s.genero.toLowerCase().includes(query));

      let matchesDay = true;
      if (selectedDay) {
        matchesDay = s.data === selectedDay;
      }

      let matchesPolo = true;
      if (!showAllPolos && activePolo && !query) {
        matchesPolo = s.polo === activePolo;
      }

      return matchesDay && matchesPolo && matchesSearch;
    });
  }, [programacao, activePolo, searchQuery, selectedDay, showAllPolos]);

  const porDiaEPolo = useMemo(() => {
    if (!showAllPolos && !selectedDay) return null;
    const map = new Map<string, Map<string, Show[]>>();
    for (const s of shows) {
      if (!map.has(s.data)) map.set(s.data, new Map());
      const dia = map.get(s.data)!;
      if (!dia.has(s.polo)) dia.set(s.polo, []);
      dia.get(s.polo)!.push(s);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [shows, showAllPolos, selectedDay]);

  const porDia = useMemo(() => {
    const map = new Map<string, Show[]>();
    for (const s of shows) {
      if (!map.has(s.data)) map.set(s.data, []);
      map.get(s.data)!.push(s);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [shows]);

  const fmtDia = (iso: string) => {
    const d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" });
  };

  const selectedDayLabel = selectedDay ? fmtDia(selectedDay) : "";

  return (
    <PageShell>
      <PageHeader
        title="Programação"
        subtitle={selectedDay ? `Filtrado por ${selectedDayLabel}` : showAllPolos ? "Todos os polos" : "Filtre por polo"}
        action={
          showAllPolos ? (
            <span className="text-right text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Todos os polos
            </span>
          ) : activePoloNome ? (
            <span className="text-right text-xs font-bold uppercase tracking-wide text-muted-foreground">
              {activePoloNome}
            </span>
          ) : undefined
        }
      />

      {/* Input de Busca + Filtro */}
      <div className="px-4 mb-4">
        <div className="relative flex items-center" ref={filterRef}>
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar artista ou gênero..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-[var(--surface-2)] pl-10 pr-12 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
          />
          <button
            type="button"
            onClick={() => setFilterOpen(!filterOpen)}
            className={`absolute right-3 h-8 w-8 flex items-center justify-center rounded-lg transition ${
              filterOpen
                ? "bg-primary text-primary-foreground"
                : "bg-[var(--surface-2)] text-muted-foreground hover:bg-[var(--surface-3)]"
            }`}
            aria-label="Filtros"
            aria-expanded={filterOpen}
          >
            <Filter className="h-4 w-4" />
          </button>

          {/* Dropdown de Filtros */}
          {filterOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] shadow-lg p-2 z-10 transition-opacity duration-150 ease-out" style={{ opacity: filterOpen ? 1 : 0 }}>
              {/* Lista de dias com programação */}
              <div className="max-h-60 overflow-y-auto">
                {diasComProgramacao.map((dia) => (
                  <button
                    key={dia}
                    type="button"
                    onClick={() => {
                      setSelectedDay(dia);
                      setFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium rounded transition ${
                      selectedDay === dia
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-[var(--surface-3)]"
                    }`}
                  >
                    {fmtDia(dia)}
                  </button>
                ))}
              </div>

              {/* Botão limpar filtro de dia */}
              {selectedDay && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDay(undefined);
                    setFilterOpen(false);
                  }}
                  className="w-full mt-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground hover:text-foreground flex items-center justify-center gap-1"
                >
                  <X className="h-3 w-3" />
                  Limpar filtro
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Filtro de polos */}
      <div className="px-4">
        <div 
          ref={polosRef}
          onMouseDown={handleMouseDown}
          className="flex gap-2 items-center overflow-x-auto py-1 cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <button
            type="button"
            onClick={() => {
              setShowAllPolos(true);
              setActivePolo(undefined);
            }}
            className={`shrink-0 h-full rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition ${
              showAllPolos
                ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                : "bg-[var(--surface-2)] text-muted-foreground"
            }`}
          >
            Todos os polos
          </button>
          {polos.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                handlePoloClick(p.id);
                setShowAllPolos(false);
              }}
              className={`shrink-0 h-full rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition ${
                activePolo === p.id && !showAllPolos
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                  : "bg-[var(--surface-2)] text-muted-foreground"
              }`}
            >
              {p.nomeCurto || p.nome}
            </button>
          ))}
        </div>
      </div>

      {selectedDay && (
        <div className="px-4 mb-2">
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-[var(--gold)] text-[var(--accent-foreground)] text-xs font-bold uppercase tracking-wide">
            <span>Filtrando por {selectedDayLabel}</span>
            <button
              type="button"
              onClick={() => setSelectedDay(undefined)}
              className="p-0.5 rounded-full hover:bg-white/30 transition"
              aria-label="Remover filtro de dia"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {!polos.length && !programacao.length ? (
        <p className="px-4 text-sm text-muted-foreground">Carregando programação…</p>
      ) : shows.length === 0 ? (
        <p className="px-4 text-sm text-muted-foreground">
          {searchQuery ? "Nenhum show encontrado para essa busca." : "Programação em breve."}
        </p>
      ) : porDiaEPolo ? (
        <div className="space-y-5 px-4">
          {porDiaEPolo.map(([dia, polosMap]) => (
            <section key={dia}>
              <h2 className="mb-3 font-display text-base capitalize text-accent">{fmtDia(dia)}</h2>
              {Array.from(polosMap.entries()).map(([poloId, showsList]) => {
                const poloData = poloMap.get(poloId);
                const nomePolo = poloData?.nomeCurto || poloData?.nome || poloId;
                return (
                  <div key={poloId} className="mb-3">
                    <h3 className="mb-1 px-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{nomePolo}</h3>
                    <ul className="space-y-2">
                      {[...showsList].sort(sortByHora).map((s) => (
                        <ShowItem key={s.id} show={s} />
                      ))}
                    </ul>
                  </div>
                );
              })}
            </section>
          ))}
        </div>
      ) : (
        <div className="space-y-5 px-4">
          {porDia.map(([dia, list]) => (
            <section key={dia}>
              <h2 className="mb-2 font-display text-base capitalize text-accent">{fmtDia(dia)}</h2>
              <ul className="space-y-2">
                {[...list].sort(sortByHora).map((s) => (
                  <ShowItem key={s.id} show={s} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </PageShell>
  );
}

// Componente estruturado com base precisa no comportamento do banco de dados
function ShowItem({ show }: { show: Show }) {
  const isFav = useIsFavorito(show.id);

  const fotoArtista = show.imagem;

  const temHorarioValido = show.hora && show.hora.trim() !== "";

  return (
    <li className="card-tile flex items-center gap-3 p-3 rounded-2xl bg-[var(--surface-1)]">
      
      {/* Espaço para foto do artista (Mobile-first, redondo perfeito) */}
      <div className="relative h-14 w-14 shrink-0 rounded-full border-2 border-primary/20 shadow-sm bg-[var(--surface-3)] flex items-center justify-center overflow-hidden">
        {fotoArtista ? (
          <img
            src={fotoArtista}
            alt={show.artista}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          /* Fallback elegante com gradiente enquanto as fotos não são inseridas no JSON */
          <div className="h-full w-full bg-gradient-to-br from-primary/10 to-bonfire/20 flex items-center justify-center">
            <User className="h-5 w-5 text-muted-foreground/60" />
          </div>
        )}
      </div>

      {/* Detalhes textuais alinhados */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="font-display text-base font-bold leading-tight truncate text-foreground">
          {show.artista}
        </h3>
        
        <div className="flex items-center gap-2 mt-1">
          {/* Badge de Horário condicional ultra precisa */}
          {temHorarioValido ? (
            <span className="shrink-0 inline-flex items-center gap-1 bg-bonfire/10 text-bonfire text-[11px] font-black px-2 py-0.5 rounded-md border border-bonfire/20 tracking-wide">
              <Clock className="h-3 w-3" />
              {show.hora}
            </span>
          ) : (
            /* Layout Mobile responsivo: Se for string vazia (ex: Palco Principal), mostra uma tag neutra indicando que é noturno ou sequência */
            <span className="shrink-0 inline-block bg-muted/20 text-muted-foreground/70 text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-muted/30 uppercase tracking-wider">
              Noite
            </span>
          )}
          
          {show.genero && (
            <span className="text-xs text-muted-foreground truncate font-medium">
              {show.genero}
            </span>
          )}
        </div>
      </div>

      {/* Botão de Favorito */}
      <button
        onClick={() => toggleFavorito(show.id, "show")}
        aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--surface-2)] active:scale-95 transition"
      >
        <Heart
          className={`h-4 w-4 transition-colors ${
            isFav ? "fill-[var(--flag-red)] text-[var(--flag-red)]" : "text-muted-foreground"
          }`}
        />
      </button>
    </li>
  );
}