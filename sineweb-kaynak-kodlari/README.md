# SineWeb - Film Bilgi Sistemi 🎬

Bandırma Onyedi Eylül University - Bilgisayar Mühendisliği Bölümü  
**BLM2225 İnternet Tabanlı Programlama Dersi Dönem Projesi**

SineWeb; sinemaseverlerin filmleri keşfetmesi, detaylı bilgilerini incelemesi ve kişisel izleme listelerini oluşturması için PHP ve MySQL mimarisiyle geliştirilmiş dinamik bir web platformudur.

---

## 📌 Proje Özellikleri

* **Dinamik Film Kataloğu:** Veritabanından çekilen filmlerin türe göre filtrelenmesi ve aranması.
* **Detay ve Bilgi Sayfası:** Filmlerin IMDb puanı, süresi, türü ve yönetmen gibi temel bilgilerinin listelenmesi.
* **Haftanın Filmi & Öneriler (Aside):** Ana sayfada rastgele veya algoritma tabanlı film öneri alanları.
* **Kullanıcı Kimlik Doğrulama:** Üyeler için Giriş Yap / Kayıt Ol panelleri.
* **İnteraktif Yorum Sistemi:** Sadece giriş yapmış kullanıcıların filmlere yorum ve puan bırakabilmesi.
* **İzleme Listesi (Watchlist):** Kullanıcıların favori filmlerini listelerine ekleyip yönetebilmesi.
* **Gelişmiş Yönetici (Admin) Paneli:** * Film ve kategori yönetimi (Ekle, Sil, Güncelle).
    * Sitenin genel durumunu (toplam film, yorum, kategori sayısı) gösteren İstatistik Paneli (Dashboard).

---

## 💻 Kullanılan Teknolojiler

* **Frontend:** HTML5, CSS3, JavaScript (Responsive Tasarım)
* **Backend:** PHP
* **Veritabanı:** MySQL

---

## 🗄️ Veritabanı Şeması (Database Schema)

Sistem üzerinde kullanılan ilişkisel veritabanı tabloları ve kolon yapıları şu şekildedir:

* **User** -> `UserID (PK)`, `FirstName`, `LastName`, `Email`, `Password`, `TotalNumberOfReviews`
* **Movie** -> `MovieID (PK)`, `Title`, `CategoryID (FK)`, `ReleaseYear`, `Description`, `DateAdded`
* **Category** -> `CategoryID (PK)`, `Name`
* **Comment** -> `CommentID (PK)`, `MovieID (FK)`, `UserID (FK)`, `Text`, `Rating`, `Date`
* **Watchlist** -> `WatchlistID (PK)`, `UserID (FK)`, `Date`
* **WatchlistDetails** -> `WatchlistDetailID (PK)`, `WatchlistID (FK)`, `MovieID (FK)`

---

## 👥 Takım Üyeleri ve Görev Dağılımı

* **Takım Lideri & Backend Developer:** İlayda Modoğlu
* **Backend Developer:** Ahmet Kışkır
* **Frontend Developer:** Ahmet Emre Yelis, Edanur Deniz
* **Database Administrator & Test Engineer:** Enes İnan, Emre Düzenli

---

## 🚀 Yerel Ortamda Kurulum (Local Setup)

Projeyi kendi bilgisayarınızda çalıştırmak için şu adımları izleyin:

1.  **Projeyi Klonlayın:**
    ```bash
    git clone [https://github.com/KULLANICI_ADINIZ/SineWeb.git](https://github.com/KULLANICI_ADINIZ/SineWeb.git)
    ```
2.  **XAMPP / Wampp Kurulumu:**
    * İndirdiğiniz proje klasörünü XAMPP kullanıyorsanız `htdocs` klasörünün içine taşıyın.
3.  **Veritabanını İçe Aktarın:**
    * `localhost/phpmyadmin` adresine gidin.
    * `sineweb` adında yeni bir veritabanı oluşturun.
    * Proje içindeki `.sql` dosyasını bu veritabanına aktarın (import edin).
4.  **Projeyi Çalıştırın:**
    * Tarayıcınızdan `http://localhost/SineWeb` adresine giderek projeyi test edebilirsiniz.