import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/PageShell";
import { useHistoria } from "@/features/historia/hooks/useHistoria";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/sobre")({
  component: Sobre,
  head: () => ({ meta: [{ title: "Sobre — São João de Arcoverde" }] }),
});

function Sobre() {
  const historia = useHistoria();
  return (
    <PageShell>
      <PageHeader title="Sobre" subtitle="Arcoverde e o São João" />
      <div className="space-y-4 px-4">
        <article className="card-tile p-5">
          <h2 className="font-display text-xl text-accent">A cidade de Arcoverde</h2>
          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/90">
            {historia?.sobreCidade ?? "Carregando..."}
          </p>
        </article>

        <article className="card-tile p-5">
          <h2 className="font-display text-xl text-accent">História do São João</h2>
          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/90">
            {historia?.sobreSaoJoao ?? "Carregando..."}
          </p>
        </article>

        {historia?.curiosidades && historia.curiosidades.length > 0 && (
          <article className="card-tile p-5">
            <h2 className="flex items-center gap-2 font-display text-xl text-accent">
              <Sparkles className="h-4 w-4" /> Curiosidades
            </h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/90">
              {historia.curiosidades.map((c, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--flag-yellow)]" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </article>
        )}
      </div>
    </PageShell>
  );
}
