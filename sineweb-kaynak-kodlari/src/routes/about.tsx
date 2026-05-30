import { createFileRoute } from "@tanstack/react-router";
import { Film, Users, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "Hakkımızda — SineWeb" }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-4xl font-bold">Hakkımızda</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        SineWeb, sinemaseverlerin filmleri keşfetmesi, yorumlaması ve kişisel
        izleme listelerini oluşturması için tasarlanmış modern bir platformdur.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Film, title: "Geniş Koleksiyon", text: "Her türden binlerce film." },
          { icon: MessageSquare, title: "Topluluk", text: "Gerçek izleyici yorumları." },
          { icon: Users, title: "Kişisel", text: "Sana özel izleme listesi." },
        ].map((f) => (
          <div key={f.title} className="rounded-lg border border-border bg-card p-4">
            <f.icon className="mb-2 h-6 w-6 text-primary" />
            <h3 className="font-semibold">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </div>
    </main>
  );
}