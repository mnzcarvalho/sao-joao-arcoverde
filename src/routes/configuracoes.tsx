import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader, PageShell } from "@/components/PageShell";
import { clearData, loadData, refreshData } from "@/lib/store";
import { Download, Trash2, Wifi, WifiOff } from "lucide-react";

export const Route = createFileRoute("/configuracoes")({
  component: Configs,
  head: () => ({ meta: [{ title: "Configurações — São João de Arcoverde" }] }),
});

function Configs() {
  const [cachedAt, setCachedAt] = useState<string | null>(null);
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setCachedAt(loadData().cachedAt);
    setOnline(navigator.onLine);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);

  return (
    <PageShell>
      <PageHeader title="Configurações" />
      <div className="space-y-4 px-4">
        <div className="card-tile flex items-center gap-3 p-4">
          {online ? <Wifi className="h-5 w-5 text-[var(--flag-green)]" /> : <WifiOff className="h-5 w-5 text-muted-foreground" />}
          <div className="flex-1">
            <p className="font-semibold">{online ? "Online" : "Offline"}</p>
            <p className="text-xs text-muted-foreground">O app funciona normalmente nos dois modos.</p>
          </div>
        </div>

        <div className="card-tile p-4">
          <p className="font-semibold">Dados em cache</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Última atualização: {cachedAt ? new Date(cachedAt).toLocaleString("pt-BR") : "—"}
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setCachedAt(refreshData().cachedAt)}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
            >
              <Download className="h-4 w-4" /> Atualizar dados
            </button>
            <button
              onClick={() => { clearData(); setCachedAt(loadData().cachedAt); }}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-bold"
            >
              <Trash2 className="h-4 w-4" /> Limpar cache
            </button>
          </div>
        </div>

        <div className="card-tile p-4 text-xs text-muted-foreground">
          <p>São João de Arcoverde · v1.0.0</p>
          <p className="mt-1">Aplicativo offline-first. Os dados ficam armazenados no seu dispositivo.</p>
        </div>
      </div>
    </PageShell>
  );
}
