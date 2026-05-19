import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "sjarcoverde:install-dismissed";

/** Captures beforeinstallprompt and surfaces an install banner. */
export function InstallPrompt() {
  const [evt, setEvt] = useState<BIPEvent | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(DISMISS_KEY)) return;

    const onBIP = (e: Event) => {
      e.preventDefault();
      setEvt(e as BIPEvent);
    };
    window.addEventListener("beforeinstallprompt", onBIP);
    return () => window.removeEventListener("beforeinstallprompt", onBIP);
  }, []);

  if (!evt) return null;

  const install = async () => {
    await evt.prompt();
    await evt.userChoice;
    setEvt(null);
  };
  const dismiss = () => {
    try { localStorage.setItem(DISMISS_KEY, "1"); } catch {}
    setEvt(null);
  };

  return (
    <div
      role="dialog"
      className="fixed inset-x-0 bottom-20 z-40 mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-border bg-[var(--surface-2)] px-4 py-3 shadow-[var(--shadow-glow)]"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
        <Download className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold">Instalar o app</p>
        <p className="text-xs text-muted-foreground">Acesso rápido e offline.</p>
      </div>
      <button onClick={install} className="rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">
        Instalar
      </button>
      <button onClick={dismiss} aria-label="Dispensar" className="grid h-7 w-7 place-items-center rounded-full bg-[var(--surface)]">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
