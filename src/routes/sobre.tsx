import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/PageShell";
import { useHistoria } from "@/features/historia/hooks/useHistoria";
import { Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import arcoverdeImg from "@/assets/sobre/arcoverde1.jpg";
import sjArcoImg from "@/assets/sobre/sj-arco.webp";
import cocoImg from "@/assets/sobre/coco.jpeg";

export const Route = createFileRoute("/sobre")({
  component: Sobre,
  head: () => ({ meta: [{ title: "Sobre — São João de Arcoverde" }] }),
});

function Sobre() {
  const historia = useHistoria();

  return (
    <PageShell>
      <PageHeader title="Sobre" subtitle="Arcoverde e o São João" />

      <div className="px-4 pt-4">
        <Carousel
          opts={{ align: "start", loop: false }}
          className="w-full"
        >
          <CarouselContent>
            <CarouselItem>
              <article className="card-tile p-5 space-y-4">
                <h2 className="font-display text-xl text-accent">
                  Sobre Arcoverde
                </h2>
                <img
                  src={arcoverdeImg}
                  alt="Arcoverde"
                  className="w-full rounded-lg object-cover"
                  loading="lazy"
                />
                <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">
                  {historia?.sobreCidade ?? "Carregando..."}
                </p>
              </article>
            </CarouselItem>

            <CarouselItem>
              <article className="card-tile p-5 space-y-4">
                <h2 className="font-display text-xl text-accent">
                  São João de Arcoverde
                </h2>
                <img
                  src={sjArcoImg}
                  alt="São João de Arcoverde"
                  className="w-full rounded-lg object-cover"
                  loading="lazy"
                />
                <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">
                  {historia?.sobreSaoJoao ?? "Carregando..."}
                </p>
              </article>
            </CarouselItem>

            <CarouselItem>
              <article className="card-tile p-5 space-y-4">
                <h2 className="flex items-center gap-2 font-display text-xl text-accent">
                  <Sparkles className="h-4 w-4" /> Curiosidades
                </h2>
                <img
                  src={cocoImg}
                  alt="Curiosidades de Arcoverde"
                  className="w-full rounded-lg object-cover"
                  loading="lazy"
                />
                {historia?.curiosidades && historia.curiosidades.length > 0 && (
                  <ul className="space-y-2 text-sm leading-relaxed text-foreground/90">
                    {historia.curiosidades.map((c, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--flag-yellow)]" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious className="-left-3 top-1/2" />
          <CarouselNext className="-right-3 top-1/2" />
        </Carousel>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Arraste para o lado para ver mais
        </p>
      </div>
    </PageShell>
  );
}
