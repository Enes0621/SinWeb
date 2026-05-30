import { Link } from "@tanstack/react-router";
import { Film, LogIn, LogOut, ListVideo, Shield } from "lucide-react";
import { useSineWeb, useCurrentUser } from "@/lib/sineweb-data";
import { Button } from "@/components/ui/button";

const linkCls =
  "text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-primary data-[status=active]:font-semibold";

export function Navbar() {
  const { openAuth, logout } = useSineWeb();
  const user = useCurrentUser();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <Film className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">
            Sine<span className="text-primary">Web</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/" className={linkCls} activeOptions={{ exact: true }}>Anasayfa</Link>
          <Link to="/movies" className={linkCls}>Filmler</Link>
          <Link to="/categories" className={linkCls}>Kategoriler</Link>
          <Link to="/about" className={linkCls}>Hakkımızda</Link>
          {user && (
            <Link to="/watchlist" className={linkCls}>
              <span className="inline-flex items-center gap-1"><ListVideo className="h-4 w-4" /> İzleme Listem</span>
            </Link>
          )}
          <Link to="/admin" className={linkCls}>
            <span className="inline-flex items-center gap-1"><Shield className="h-4 w-4" /> Yönetim</span>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden text-sm text-muted-foreground sm:inline">
                Merhaba, <span className="font-medium text-foreground">{user.FirstName}</span>
              </span>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="mr-1 h-4 w-4" /> Çıkış
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={openAuth}>
              <LogIn className="mr-1 h-4 w-4" /> Giriş / Kayıt
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}