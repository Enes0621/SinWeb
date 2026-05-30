import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Film, FolderTree, MessageSquare, Trash2, Plus } from "lucide-react";
import { useSineWeb } from "@/lib/sineweb-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Yönetim Paneli — SineWeb" }] }),
  component: AdminPage,
});

function AdminPage() {
  const db = useSineWeb();
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(2024);
  const [desc, setDesc] = useState("");
  const [catId, setCatId] = useState(db.categories[0]?.CategoryID ?? 1);
  const [newCat, setNewCat] = useState("");

  const stats = [
    { icon: FolderTree, label: "Kategori", value: db.categories.length },
    { icon: Film, label: "Film", value: db.movies.length },
    { icon: MessageSquare, label: "Yorum", value: db.comments.length },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Yönetim Paneli</h1>
      <p className="mb-8 text-sm text-muted-foreground">Genel durum ve içerik yönetimi.</p>

      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Toplam {s.label}</p>
                <p className="mt-1 text-4xl font-bold">{s.value}</p>
              </div>
              <s.icon className="h-10 w-10 text-primary/60" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-bold">Film Yönetimi</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!title.trim()) return;
              db.addMovie({ Title: title.trim(), CategoryID: Number(catId), ReleaseYear: Number(year), Description: desc.trim() });
              setTitle(""); setDesc("");
            }}
            className="mb-6 space-y-2"
          >
            <Input placeholder="Film adı" value={title} onChange={(e) => setTitle(e.target.value)} />
            <div className="grid grid-cols-2 gap-2">
              <Input type="number" placeholder="Yıl" value={year} onChange={(e) => setYear(Number(e.target.value))} />
              <select
                value={catId}
                onChange={(e) => setCatId(Number(e.target.value))}
                className="rounded-md border border-input bg-background px-3 text-sm"
              >
                {db.categories.map((c) => <option key={c.CategoryID} value={c.CategoryID}>{c.Name}</option>)}
              </select>
            </div>
            <Textarea placeholder="Açıklama" value={desc} onChange={(e) => setDesc(e.target.value)} rows={2} />
            <Button type="submit" className="w-full"><Plus className="mr-1 h-4 w-4" /> Film Ekle</Button>
          </form>

          <div className="max-h-96 space-y-1 overflow-y-auto">
            {db.movies.map((m) => (
              <div key={m.MovieID} className="flex items-center justify-between gap-2 rounded border border-border px-3 py-2 text-sm">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{m.Title}</p>
                  <p className="text-xs text-muted-foreground">
                    {db.categories.find((c) => c.CategoryID === m.CategoryID)?.Name} · {m.ReleaseYear}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const t = prompt("Yeni başlık", m.Title);
                    if (t) db.updateMovie(m.MovieID, { Title: t });
                  }}
                >Düzenle</Button>
                <Button size="sm" variant="destructive" onClick={() => db.deleteMovie(m.MovieID)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-bold">Kategori Yönetimi</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!newCat.trim()) return;
              db.addCategory(newCat.trim());
              setNewCat("");
            }}
            className="mb-6 flex gap-2"
          >
            <Input placeholder="Yeni kategori adı" value={newCat} onChange={(e) => setNewCat(e.target.value)} />
            <Button type="submit"><Plus className="h-4 w-4" /></Button>
          </form>

          <div className="space-y-1">
            {db.categories.map((c) => {
              const count = db.movies.filter((m) => m.CategoryID === c.CategoryID).length;
              return (
                <div key={c.CategoryID} className="flex items-center justify-between gap-2 rounded border border-border px-3 py-2 text-sm">
                  <div>
                    <span className="font-medium">{c.Name}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{count} film</span>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={count > 0}
                    onClick={() => db.deleteCategory(c.CategoryID)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}