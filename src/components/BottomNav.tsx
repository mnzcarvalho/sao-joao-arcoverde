import { Link, useLocation } from "@tanstack/react-router";
import { Home, Calendar, MapPin, Heart, Menu } from "lucide-react";

const items = [
  { to: "/", label: "Início", icon: Home },
  { to: "/programacao", label: "Programação", icon: Calendar },
  { to: "/polos", label: "Polos", icon: MapPin },
  { to: "/favoritos", label: "Favoritos", icon: Heart },
  { to: "/mais", label: "Mais", icon: Menu },
] as const;

export function BottomNav() {
  const loc = useLocation();
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[color-mix(in_oklab,var(--border)_40%,transparent)] bg-[var(--surface)]/98 backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-xl items-stretch justify-around">
        {items.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? loc.pathname === "/" : loc.pathname.startsWith(to);
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className={`flex flex-col items-center gap-1.5 py-3 text-xs transition-all ${
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon
                  className={`h-5 w-5 transition-transform ${
                    active ? "scale-110 drop-shadow-[0_0_8px_color-mix(in_oklab,var(--primary)_50%,transparent)]" : ""
                  }`}
                />
                <span className={`font-semibold ${active ? "text-sm" : ""}`}>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
