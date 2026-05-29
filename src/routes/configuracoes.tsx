import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader, PageShell } from "@/components/PageShell";
import { clearAll, reseed } from "@/db/seed";
import { useSeededAt } from "@/features/historia/hooks/useHistoria";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { Download, Trash2, Wifi, WifiOff } from "lucide-react";

export const Route = createFileRoute("/configuracoes")({
  component: Configs,
  head: () => ({ meta: [{ title: "Configurações — São João de Arcoverde" }] }),
});

function Configs() {
  const seededAt = useSeededAt();
  const online = useOnlineStatus();
  const [busy, setBusy] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const onRefresh = async () => {
    setBusy(true);
    try {
      await reseed();
    } finally {
      setBusy(false);
    }
  };
  const onClear = async () => {
    setBusy(true);
    try {
      await clearAll();
      await reseed();
    } finally {
      setBusy(false);
    }
  };

  return (
    <PageShell>
      <PageHeader title="Configurações" />
      <div className="space-y-4 px-4">
        <div className="card-tile flex items-center gap-3 p-4">
          {mounted && online ? (
            <Wifi className="h-5 w-5 text-[var(--flag-green)]" />
          ) : (
            <WifiOff className="h-5 w-5 text-muted-foreground" />
          )}
          <div className="flex-1">
            <p className="font-semibold">{mounted && online ? "Online" : "Offline"}</p>
            <p className="text-xs text-muted-foreground">
              O app funciona normalmente nos dois modos.
            </p>
          </div>
        </div>

        <div className="card-tile p-4">
          <p className="font-semibold">Dados em cache (IndexedDB)</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Última atualização: {seededAt ? new Date(seededAt).toLocaleString("pt-BR") : "—"}
          </p>
          <div className="mt-3 flex gap-2">
            <button
              disabled={busy}
              onClick={onRefresh}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground disabled:opacity-50"
            >
              <Download className="h-4 w-4" /> Atualizar dados
            </button>
            <button
              disabled={busy}
              onClick={onClear}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-bold disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" /> Limpar e re-baixar
            </button>
          </div>
        </div>

        <div className="card-tile p-4 text-xs text-muted-foreground">
          <p>São João de Arcoverde · v1.0.0</p>
          <p className="mt-1">
            App offline-first (Dexie/IndexedDB). Os dados ficam no seu dispositivo.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
