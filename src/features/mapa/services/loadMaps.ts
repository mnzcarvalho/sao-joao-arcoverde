/**
 * Lazy loader for Google Maps JS API.
 * Loads only on demand (when component mounts AND user is online).
 * Uses the Lovable connector browser key + tracking channel.
 */
let loadingPromise: Promise<typeof google> | null = null;

declare global {
  interface Window {
    __sjarcoverdeMapsInit?: () => void;
    google: typeof google;
  }
}

export function loadGoogleMaps(): Promise<typeof google> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps requires browser environment"));
  }
  if (window.google?.maps) return Promise.resolve(window.google);
  if (loadingPromise) return loadingPromise;

  const key = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY as string | undefined;
  const channel = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID as string | undefined;
  if (!key) return Promise.reject(new Error("Google Maps browser key not configured"));

  loadingPromise = new Promise((resolve, reject) => {
    window.__sjarcoverdeMapsInit = () => resolve(window.google);
    const params = new URLSearchParams({
      key,
      loading: "async",
      callback: "__sjarcoverdeMapsInit",
      v: "weekly",
    });
    if (channel) params.set("channel", channel);

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      loadingPromise = null;
      reject(new Error("Failed to load Google Maps script"));
    };
    document.head.appendChild(script);
  });

  return loadingPromise;
}
