import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/PageShell";
import { Code2, ExternalLink, GraduationCap, Heart, User } from "lucide-react";

export const Route = createFileRoute("/desenvolvedores")({
  component: Devs,
  head: () => ({ meta: [{ title: "Desenvolvedores — São João de Arcoverde" }] }),
});

function Devs() {
  return (
    <PageShell>
      <PageHeader title="Desenvolvedores" subtitle="Quem fez este app" />
      <div className="space-y-4 px-4">
        <div className="card-tile p-5">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-bonfire text-primary-foreground">
            <Code2 className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-center font-display text-xl">Desenvolvedores</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            App oficial do São João de Arcoverde
          </p>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex items-center gap-3 rounded-lg bg-[var(--surface-2)] p-3">
              <User className="h-5 w-5 shrink-0 text-accent" />
              <div className="flex-1">
                <p className="font-semibold">Eduardo Menezes Carvalho</p>
                <a
                  href="https://github.com/mnzcarvalho"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground underline-offset-2 hover:text-accent hover:underline"
                >
                  @mnzcarvalho
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-[var(--surface-2)] p-3">
              <User className="h-5 w-5 shrink-0 text-accent" />
              <p className="font-semibold">Iuan Delvito de Siqueira Mendonça</p>
            </div>
          </div>
        </div>

        <div className="card-tile p-5">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[var(--surface-2)] text-accent">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="mt-4 space-y-2 text-center text-sm">
            <p className="font-semibold">Orientador</p>
            <p className="text-muted-foreground">Willams de Jesus</p>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Projeto desenvolvido na AESA — 3º Período de Análise e Desenvolvimento de Sistemas (ADS), maio/junho de 2026.
            </p>
          </div>
        </div>

        <p className="pb-2 text-center text-xs text-muted-foreground">v1.0.0 · 2026</p>
      </div>
    </PageShell>
  );
}
