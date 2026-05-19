/// <reference types="google.maps" />
import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "../services/loadMaps";
import type { Polo } from "@/types/domain";

interface Props {
  polos: Polo[];
  onSelect?: (id: string) => void;
  selectedId?: string;
}

/** Google Maps view — renders only when online. */
export function MapView({ polos, onSelect, selectedId }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadGoogleMaps()
      .then((g) => {
        if (cancelled || !containerRef.current || !polos.length) return;
        const center = {
          lat: polos.reduce((s, p) => s + p.lat, 0) / polos.length,
          lng: polos.reduce((s, p) => s + p.lng, 0) / polos.length,
        };
        mapRef.current = new g.maps.Map(containerRef.current, {
          center,
          zoom: 15,
          disableDefaultUI: false,
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
        });
        setReady(true);
      })
      .catch((e: Error) => !cancelled && setError(e.message));
    return () => {
      cancelled = true;
    };
  }, [polos]);

  useEffect(() => {
    if (!ready || !mapRef.current || !window.google) return;
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = polos.map((p) => {
      const marker = new google.maps.Marker({
        position: { lat: p.lat, lng: p.lng },
        map: mapRef.current!,
        title: p.nome,
        animation: p.id === selectedId ? google.maps.Animation.BOUNCE : undefined,
      });
      marker.addListener("click", () => onSelect?.(p.id));
      return marker;
    });
  }, [ready, polos, selectedId, onSelect]);

  if (error) {
    return (
      <div className="card-tile mx-4 p-4 text-sm text-muted-foreground">
        Não foi possível carregar o mapa: {error}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="mx-4 h-80 overflow-hidden rounded-3xl border border-border bg-[var(--surface)]"
      aria-label="Mapa dos polos"
    />
  );
}
