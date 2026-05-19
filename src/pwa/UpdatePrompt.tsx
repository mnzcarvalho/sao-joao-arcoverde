import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

/** Banner shown when a new SW version is available. */
export function UpdatePrompt() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handler = () => setShow(true);
    window.addEventListener("sjarcoverde:update-available", handler);
    return () => window.removeEventListener("sjarcoverde:update-available", handler);
  }, []);

  if (!show) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-0 bottom-20 z-50 mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-border bg-[var(--surface-2)] px-4 py-3 shadow-[var(--shadow-glow)]"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <RefreshCw className="h-4 w-4 text-accent" aria-hidden />
      <p className="flex-1 text-xs">Nova versão disponível.</p>
      <button
        onClick={() => window.location.reload()}
        className="rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground"
      >
        Atualizar
      </button>
    </div>
  );
}
