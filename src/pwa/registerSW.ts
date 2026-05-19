/**
 * PWA service worker registration with strict preview/iframe guard.
 * - Disabled inside Lovable preview iframes (would cause stale-cache hell).
 * - Uses vite-plugin-pwa's virtual SW (/sw.js generated at build time).
 */
export type SWRegistration = {
  needRefresh: boolean;
  update: () => Promise<void>;
};

const PREVIEW_HOSTS = ["lovableproject.com", "lovable.app", "id-preview--", "preview--"];

function isPreviewOrIframe(): boolean {
  if (typeof window === "undefined") return true;
  try {
    if (window.self !== window.top) return true;
  } catch {
    return true;
  }
  const host = window.location.hostname;
  return PREVIEW_HOSTS.some((h) => host.includes(h));
}

export async function registerServiceWorker(
  onUpdateAvailable?: () => void
): Promise<void> {
  if (typeof window === "undefined") return;

  if (isPreviewOrIframe()) {
    // Cleanup any stale registration in preview environments.
    const regs = await navigator.serviceWorker?.getRegistrations();
    regs?.forEach((r) => r.unregister());
    return;
  }

  if (!("serviceWorker" in navigator)) return;

  try {
    const { registerSW } = await import("virtual:pwa-register");
    registerSW({
      immediate: true,
      onNeedRefresh() {
        window.dispatchEvent(new Event("sjarcoverde:update-available"));
        onUpdateAvailable?.();
      },
      onOfflineReady() {
        // Optional: surface "ready offline" toast if desired.
      },
    });
  } catch (err) {
    // virtual:pwa-register is only available in builds where vite-plugin-pwa ran.
    console.warn("[pwa] registration skipped:", err);
  }
}
