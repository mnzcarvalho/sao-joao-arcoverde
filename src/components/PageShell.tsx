import { Link, useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeader({ title, subtitle, back = true, action }: { title: string; subtitle?: string; back?: boolean; action?: ReactNode }) {
  const router = useRouter();
  return (
    <header className="relative">
      <div className="bunting" aria-hidden />
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        {back && (
          <button
            onClick={() => router.history.back()}
            className="grid h-10 w-10 place-items-center rounded-full bg-[var(--surface-2)] text-foreground"
            aria-label="Voltar"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-glow">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </div>
    </header>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <main className="mx-auto min-h-screen max-w-xl pb-28">{children}</main>;
}

export { Link };
