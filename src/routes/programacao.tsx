import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect, useRef } from "react";
import { PageHeader, PageShell } from "@/components/PageShell";
import { useProgramacao } from "@/features/programacao/hooks/useProgramacao";
import { usePolos } from "@/features/polos/hooks/usePolos";
import { useIsFavorito, toggleFavorito } from "@/features/favoritos/hooks/useFavoritos";
import { Heart, Search, User, Clock } from "lucide-react";
import type { Show } from "@/types/domain";

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
  const polos = usePolos();

  const [activePolo, setActivePolo] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  
  const polosRef = useRef<HTMLDivElement>(null);
  
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

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
      const matchesPolo = s.polo === activePolo;
      
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query || 
        s.artista.toLowerCase().includes(query) || 
        (s.genero && s.genero.toLowerCase().includes(query));

      return matchesPolo && matchesSearch;
    });
  }, [programacao, activePolo, searchQuery]);

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

  return (
    <PageShell>
      <PageHeader title="Programação" subtitle="Filtre por polo" />

      {/* Input de Busca */}
      <div className="px-4 mb-4">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar artista ou gênero..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-[var(--surface-2)] pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
          />
        </div>
      </div>

      {/* Filtro de polos */}
      <div className="px-4">
        <div 
          ref={polosRef}
          onMouseDown={handleMouseDown}
          className="flex gap-2 items-center overflow-x-auto py-1 cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {polos.map((p) => (
            <button
              key={p.id}
              onClick={() => handlePoloClick(p.id)}
              className={`shrink-0 h-full rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition ${
                activePolo === p.id
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                  : "bg-[var(--surface-2)] text-muted-foreground"
              }`}
            >
              {p.nome}
            </button>
          ))}
        </div>
      </div>

      {!polos.length && !programacao.length ? (
        <p className="px-4 text-sm text-muted-foreground">Carregando programação…</p>
      ) : porDia.length === 0 ? (
        <p className="px-4 text-sm text-muted-foreground">
          {searchQuery ? "Nenhum show encontrado para essa busca." : "Programação em breve."}
        </p>
      ) : (
        <div className="space-y-5 px-4">
          {porDia.map(([dia, list]) => (
            <section key={dia}>
              <h2 className="mb-2 font-display text-base capitalize text-accent">{fmtDia(dia)}</h2>
              <ul className="space-y-2">
                {list
                  .sort((a, b) => (a.hora ?? "").localeCompare(b.hora ?? ""))
                  .map((s) => (
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

  // Mapeamento dinâmico para quando você decidir injetar caminhos de fotos/imagens no JSON
  const fotoArtista = (show as any).imagem || (show as any).fotoUrl || (show as any).foto;

  // Tratamento preciso: avalia se a string de fato contém conteúdo válido
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