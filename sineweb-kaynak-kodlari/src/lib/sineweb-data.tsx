import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export interface Category { CategoryID: number; Name: string }
export interface Movie {
  MovieID: number; Title: string; CategoryID: number; ReleaseYear: number;
  Description: string; DateAdded: string; Poster: string;
}
export interface User {
  UserID: number; FirstName: string; LastName: string; Email: string;
  Password: string; TotalNumberOfReviews: number;
}
export interface Comment {
  CommentID: number; MovieID: number; UserID: number;
  Text: string; Rating: number; Date: string;
}
export interface WatchlistDetail { WatchlistDetailID: number; WatchlistID: number; MovieID: number }
export interface Watchlist { WatchlistID: number; UserID: number; Date: string }

const POSTERS = [
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800",
  "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800",
  "https://images.unsplash.com/photo-1485095329183-d0797cdc5676?w=800",
  "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=800",
  "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=800",
  "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800",
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800",
  "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=800",
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800",
  "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=800",
];

const INITIAL_CATEGORIES: Category[] = [
  { CategoryID: 1, Name: "Bilim Kurgu" },
  { CategoryID: 2, Name: "Dram" },
  { CategoryID: 3, Name: "Aksiyon" },
  { CategoryID: 4, Name: "Gerilim" },
  { CategoryID: 5, Name: "Komedi" },
];

const INITIAL_MOVIES: Movie[] = [
  { MovieID: 1, Title: "Yıldızlararası", CategoryID: 1, ReleaseYear: 2014, Description: "Bir grup kâşif, insanlığın hayatta kalması için solucan deliğinden geçer.", DateAdded: "2024-02-10", Poster: POSTERS[0] },
  { MovieID: 2, Title: "Esaretin Bedeli", CategoryID: 2, ReleaseYear: 1994, Description: "Bir bankacının haksız yere mahkûm edilişi ve umudun gücü.", DateAdded: "2024-01-04", Poster: POSTERS[1] },
  { MovieID: 3, Title: "Karanlık Şövalye", CategoryID: 3, ReleaseYear: 2008, Description: "Batman, Joker'in kaos planlarıyla yüzleşir.", DateAdded: "2024-03-12", Poster: POSTERS[2] },
  { MovieID: 4, Title: "Başlangıç", CategoryID: 1, ReleaseYear: 2010, Description: "Rüyaların içine giren bir hırsızın son görevi.", DateAdded: "2024-04-01", Poster: POSTERS[3] },
  { MovieID: 5, Title: "Yedi", CategoryID: 4, ReleaseYear: 1995, Description: "İki dedektif, yedi ölümcül günahtan ilham alan bir katili kovalar.", DateAdded: "2024-02-22", Poster: POSTERS[4] },
  { MovieID: 6, Title: "Forrest Gump", CategoryID: 2, ReleaseYear: 1994, Description: "Saf bir adamın olağanüstü hayatı ve Amerika tarihiyle iç içe yolculuğu.", DateAdded: "2024-01-18", Poster: POSTERS[5] },
  { MovieID: 7, Title: "Matrix", CategoryID: 1, ReleaseYear: 1999, Description: "Bir hacker, gerçekliğin sandığından farklı olduğunu keşfeder.", DateAdded: "2024-05-09", Poster: POSTERS[6] },
  { MovieID: 8, Title: "Cesur Yürek", CategoryID: 3, ReleaseYear: 1995, Description: "İskoç savaşçı William Wallace'ın özgürlük mücadelesi.", DateAdded: "2024-03-30", Poster: POSTERS[7] },
  { MovieID: 9, Title: "Büyük Lebowski", CategoryID: 5, ReleaseYear: 1998, Description: "Yanlış kişiyle karıştırılan rahat bir adamın absürt macerası.", DateAdded: "2024-04-21", Poster: POSTERS[8] },
  { MovieID: 10, Title: "Sürgün", CategoryID: 4, ReleaseYear: 2007, Description: "Bir kargo pilotu ıssız bir adada hayatta kalmaya çalışır.", DateAdded: "2024-05-15", Poster: POSTERS[9] },
];

const INITIAL_USERS: User[] = [
  { UserID: 1, FirstName: "Ahmet", LastName: "Yılmaz", Email: "ahmet@sineweb.com", Password: "***", TotalNumberOfReviews: 3 },
  { UserID: 2, FirstName: "Ayşe", LastName: "Demir", Email: "ayse@sineweb.com", Password: "***", TotalNumberOfReviews: 1 },
  { UserID: 3, FirstName: "Mehmet", LastName: "Kaya", Email: "mehmet@sineweb.com", Password: "***", TotalNumberOfReviews: 2 },
];

const INITIAL_COMMENTS: Comment[] = [
  { CommentID: 1, MovieID: 1, UserID: 1, Text: "Görsel olarak büyüleyici, müzikleri muhteşem.", Rating: 5, Date: "2024-06-01" },
  { CommentID: 2, MovieID: 1, UserID: 2, Text: "Sonu biraz karmaşıktı ama harika bir film.", Rating: 4, Date: "2024-06-05" },
  { CommentID: 3, MovieID: 2, UserID: 3, Text: "Şimdiye kadar izlediğim en iyi film.", Rating: 5, Date: "2024-05-20" },
  { CommentID: 4, MovieID: 3, UserID: 1, Text: "Heath Ledger efsane.", Rating: 5, Date: "2024-06-10" },
  { CommentID: 5, MovieID: 7, UserID: 3, Text: "Türünün en iyilerinden.", Rating: 5, Date: "2024-06-12" },
  { CommentID: 6, MovieID: 4, UserID: 1, Text: "Birden fazla izlemek gerekiyor.", Rating: 4, Date: "2024-06-15" },
];

interface DBState {
  categories: Category[];
  movies: Movie[];
  users: User[];
  comments: Comment[];
  watchlists: Watchlist[];
  watchlistDetails: WatchlistDetail[];
  currentUserId: number | null;
  authOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (data: { FirstName: string; LastName: string; Email: string; Password: string }) => { ok: boolean; error?: string };
  logout: () => void;
  addComment: (movieId: number, text: string, rating: number) => void;
  addToWatchlist: (movieId: number) => void;
  removeFromWatchlist: (movieId: number) => void;
  addMovie: (m: Omit<Movie, "MovieID" | "DateAdded" | "Poster"> & { Poster?: string }) => void;
  deleteMovie: (id: number) => void;
  updateMovie: (id: number, patch: Partial<Movie>) => void;
  addCategory: (name: string) => void;
  deleteCategory: (id: number) => void;
}

const Ctx = createContext<DBState | null>(null);

export function SineWebProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [movies, setMovies] = useState<Movie[]>(INITIAL_MOVIES);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [watchlists, setWatchlists] = useState<Watchlist[]>([
    { WatchlistID: 1, UserID: 1, Date: "2024-05-01" },
  ]);
  const [watchlistDetails, setWatchlistDetails] = useState<WatchlistDetail[]>([
    { WatchlistDetailID: 1, WatchlistID: 1, MovieID: 2 },
    { WatchlistDetailID: 2, WatchlistID: 1, MovieID: 7 },
  ]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [authOpen, setAuthOpen] = useState(false);

  const value = useMemo<DBState>(() => {
    const ensureWatchlist = (uid: number): number => {
      const existing = watchlists.find((w) => w.UserID === uid);
      if (existing) return existing.WatchlistID;
      const newId = (watchlists.at(-1)?.WatchlistID ?? 0) + 1;
      setWatchlists((p) => [...p, { WatchlistID: newId, UserID: uid, Date: new Date().toISOString().slice(0, 10) }]);
      return newId;
    };

    return {
      categories, movies, users, comments, watchlists, watchlistDetails, currentUserId,
      authOpen,
      openAuth: () => setAuthOpen(true),
      closeAuth: () => setAuthOpen(false),
      login: (email, password) => {
        const found = users.find((u) => u.Email.toLowerCase() === email.toLowerCase());
        if (!found) return { ok: false, error: "Bu e-posta ile kayıtlı kullanıcı bulunamadı." };
        if (found.Password !== password && found.Password !== "***") {
          return { ok: false, error: "Şifre hatalı. Lütfen tekrar deneyin." };
        }
        setCurrentUserId(found.UserID);
        setAuthOpen(false);
        return { ok: true };
      },
      register: ({ FirstName, LastName, Email, Password }) => {
        if (users.some((u) => u.Email.toLowerCase() === Email.toLowerCase())) {
          return { ok: false, error: "Bu e-posta adresi zaten kayıtlı." };
        }
        const newId = (users.at(-1)?.UserID ?? 0) + 1;
        setUsers((p) => [...p, { UserID: newId, FirstName, LastName, Email, Password, TotalNumberOfReviews: 0 }]);
        setCurrentUserId(newId);
        setAuthOpen(false);
        return { ok: true };
      },
      logout: () => setCurrentUserId(null),
      addComment: (movieId, text, rating) => {
        if (!currentUserId) return;
        setComments((p) => [
          ...p,
          {
            CommentID: (p.at(-1)?.CommentID ?? 0) + 1,
            MovieID: movieId, UserID: currentUserId, Text: text, Rating: rating,
            Date: new Date().toISOString().slice(0, 10),
          },
        ]);
        setUsers((p) => p.map((u) => u.UserID === currentUserId ? { ...u, TotalNumberOfReviews: u.TotalNumberOfReviews + 1 } : u));
      },
      addToWatchlist: (movieId) => {
        if (!currentUserId) return;
        const wid = ensureWatchlist(currentUserId);
        setWatchlistDetails((p) => {
          if (p.some((d) => d.WatchlistID === wid && d.MovieID === movieId)) return p;
          return [...p, { WatchlistDetailID: (p.at(-1)?.WatchlistDetailID ?? 0) + 1, WatchlistID: wid, MovieID: movieId }];
        });
      },
      removeFromWatchlist: (movieId) => {
        if (!currentUserId) return;
        const wid = watchlists.find((w) => w.UserID === currentUserId)?.WatchlistID;
        if (!wid) return;
        setWatchlistDetails((p) => p.filter((d) => !(d.WatchlistID === wid && d.MovieID === movieId)));
      },
      addMovie: (m) => {
        setMovies((p) => [
          ...p,
          {
            MovieID: (p.at(-1)?.MovieID ?? 0) + 1,
            Title: m.Title, CategoryID: m.CategoryID, ReleaseYear: m.ReleaseYear,
            Description: m.Description, DateAdded: new Date().toISOString().slice(0, 10),
            Poster: m.Poster || POSTERS[Math.floor(Math.random() * POSTERS.length)],
          },
        ]);
      },
      deleteMovie: (id) => setMovies((p) => p.filter((m) => m.MovieID !== id)),
      updateMovie: (id, patch) => setMovies((p) => p.map((m) => m.MovieID === id ? { ...m, ...patch } : m)),
      addCategory: (name) => setCategories((p) => [...p, { CategoryID: (p.at(-1)?.CategoryID ?? 0) + 1, Name: name }]),
      deleteCategory: (id) => setCategories((p) => p.filter((c) => c.CategoryID !== id)),
    };
  }, [categories, movies, users, comments, watchlists, watchlistDetails, currentUserId, authOpen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSineWeb() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSineWeb must be used inside SineWebProvider");
  return v;
}

export function useCurrentUser() {
  const { users, currentUserId } = useSineWeb();
  return currentUserId ? users.find((u) => u.UserID === currentUserId) ?? null : null;
}