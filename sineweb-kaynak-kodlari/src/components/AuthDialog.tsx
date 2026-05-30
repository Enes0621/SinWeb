import { useState } from "react";
import { useSineWeb } from "@/lib/sineweb-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Film, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export function AuthDialog() {
  const { authOpen, closeAuth, login, register } = useSineWeb();
  const [tab, setTab] = useState<"login" | "register">("login");

  // Login state
  const [lEmail, setLEmail] = useState("");
  const [lPassword, setLPassword] = useState("");
  const [lError, setLError] = useState<string | null>(null);

  // Register state
  const [rFirst, setRFirst] = useState("");
  const [rLast, setRLast] = useState("");
  const [rEmail, setREmail] = useState("");
  const [rPassword, setRPassword] = useState("");
  const [rError, setRError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLError(null);
    if (!lEmail.trim() || !lPassword.trim()) {
      setLError("Lütfen tüm alanları doldurun.");
      return;
    }
    const res = login(lEmail.trim(), lPassword);
    if (!res.ok) {
      setLError(res.error ?? "Giriş başarısız.");
      return;
    }
    toast.success("Giriş başarılı. Hoş geldiniz!");
    setLEmail(""); setLPassword("");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRError(null);
    if (!rFirst.trim() || !rLast.trim() || !rEmail.trim() || !rPassword.trim()) {
      setRError("Lütfen tüm alanları doldurun.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rEmail.trim())) {
      setRError("Geçerli bir e-posta adresi girin.");
      return;
    }
    if (rPassword.length < 4) {
      setRError("Şifre en az 4 karakter olmalıdır.");
      return;
    }
    const res = register({
      FirstName: rFirst.trim(),
      LastName: rLast.trim(),
      Email: rEmail.trim(),
      Password: rPassword,
    });
    if (!res.ok) {
      setRError(res.error ?? "Kayıt başarısız.");
      return;
    }
    toast.success(`Hoş geldiniz, ${rFirst}! Hesabınız oluşturuldu.`);
    setRFirst(""); setRLast(""); setREmail(""); setRPassword("");
  };

  return (
    <Dialog open={authOpen} onOpenChange={(o) => !o && closeAuth()}>
      <DialogContent className="max-w-md border-border bg-card p-0 overflow-hidden">
        <div className="bg-gradient-to-br from-primary/15 via-card to-card px-6 pt-6 pb-4 border-b border-border">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Film className="h-6 w-6 text-primary" />
              <DialogTitle className="text-2xl">
                Sine<span className="text-primary">Web</span> Hesabı
              </DialogTitle>
            </div>
            <DialogDescription>
              Yorum yapmak ve izleme listesi oluşturmak için giriş yapın veya kayıt olun.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 pb-6 pt-4">
          <Tabs value={tab} onValueChange={(v) => setTab(v as "login" | "register")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Giriş Yap</TabsTrigger>
              <TabsTrigger value="register">Kayıt Ol</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-5">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="l-email">E-posta Adresi</Label>
                  <Input id="l-email" type="email" placeholder="ornek@sineweb.com"
                    value={lEmail} onChange={(e) => setLEmail(e.target.value)} autoComplete="email" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="l-password">Şifre</Label>
                  <Input id="l-password" type="password" placeholder="••••••••"
                    value={lPassword} onChange={(e) => setLPassword(e.target.value)} autoComplete="current-password" />
                </div>
                {lError && (
                  <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{lError}</span>
                  </div>
                )}
                <Button type="submit" className="w-full" size="lg">Giriş Yap</Button>
                <p className="text-center text-xs text-muted-foreground">
                  İpucu: Mevcut hesap için herhangi bir şifre kullanabilirsiniz (örn. <span className="font-mono">ahmet@sineweb.com</span>).
                </p>
              </form>
            </TabsContent>

            <TabsContent value="register" className="mt-5">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="r-first">Adı</Label>
                    <Input id="r-first" placeholder="Adınız"
                      value={rFirst} onChange={(e) => setRFirst(e.target.value)} autoComplete="given-name" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="r-last">Soyadı</Label>
                    <Input id="r-last" placeholder="Soyadınız"
                      value={rLast} onChange={(e) => setRLast(e.target.value)} autoComplete="family-name" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="r-email">E-posta Adresi</Label>
                  <Input id="r-email" type="email" placeholder="ornek@sineweb.com"
                    value={rEmail} onChange={(e) => setREmail(e.target.value)} autoComplete="email" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="r-password">Şifre</Label>
                  <Input id="r-password" type="password" placeholder="En az 4 karakter"
                    value={rPassword} onChange={(e) => setRPassword(e.target.value)} autoComplete="new-password" />
                </div>
                {rError && (
                  <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{rError}</span>
                  </div>
                )}
                <Button type="submit" className="w-full" size="lg">Kayıt Ol</Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}