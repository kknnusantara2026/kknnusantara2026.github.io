# Website KKN Desa Margawangi

Website resmi KKN Desa Margawangi — **"Merawat Ekoteologi, Menjaga Tradisi: Meneguhkan Iman, Melestarikan Alam."**

Situs statis (HTML, CSS, Vanilla JavaScript) tanpa backend, siap di-*deploy* ke GitHub Pages.

## 🚀 Cara Deploy ke GitHub Pages

1. Buat repository baru di GitHub (misalnya `kkn-margawangi`).
2. Upload seluruh isi folder ini ke repository tersebut (root repo, bukan di dalam subfolder).
3. Buka menu **Settings → Pages** di repository.
4. Pada **Source**, pilih branch `main` dan folder `/ (root)`, lalu simpan.
5. Tunggu 1–2 menit, situs akan aktif di:
   `https://<username-github-anda>.github.io/<nama-repo>/`

## 🔧 Yang Perlu Disesuaikan Sebelum/Setelah Deploy

| Item | Lokasi | Keterangan |
|---|---|---|
| **URL situs asli** | `robots.txt`, `sitemap.xml`, dan tag `<meta property="og:*">` / `<link rel="canonical">` di setiap halaman | Cari-ganti `https://username.github.io/kkn-margawangi` dengan URL GitHub Pages Anda yang sebenarnya |
| **Foto & Logo** | Folder `img/` | Lihat tabel nama file di bawah — nama & ekstensi harus persis sama |
| **Data Tim KKN** | `about.html` | Ganti `[Nama ...]` dengan nama asli 16 anggota |
| **Data Desa** | `profile-desa.html` | Angka penduduk, nama wisata/UMKM, dsb. masih ilustratif |
| **Dosen Pembimbing, Periode, Universitas** | `about.html` | Sesuaikan dengan data resmi kelompok |
| **Kontak** (alamat, email, WhatsApp, Instagram) | `kontak.html` & footer semua halaman | Ganti dengan kontak aktif tim |
| **Peta Google Maps** | `profile-desa.html` & `kontak.html` | Ganti `src` iframe dengan koordinat asli Desa Margawangi |

## 🖼️ Daftar Nama File Gambar

Semua foto ditaruh langsung di folder `img/` (sejajar dengan file HTML), dengan nama **persis** seperti berikut:

- **Logo & umum:** `logo-kkn.png`, `logo-universitas.png`, `favicon.png`, `hero-bg.jpg`
- **Profil Desa:** `sejarah-desa.jpg`, `mata-pencaharian.jpg`, `wisata-1.jpg` s.d. `wisata-3.jpg`, `umkm-1.jpg` s.d. `umkm-3.jpg`
- **Program Kerja:** `program-bimbel.jpg`, `program-pengajian.jpg`, `program-tanam-pohon.jpg`, `program-umkm.jpg`, `program-posyandu.jpg`, `program-kerja-bakti.jpg`
- **Tim KKN:** `tim-1.jpg` s.d. `tim-16.jpg` (rasio foto **1:1**)
- **Galeri:** `gal-1.jpg` s.d. `gal-12.jpg`
- **Artikel:** `artikel-1.jpg` s.d. `artikel-6.jpg`

> Jika foto belum diunggah, seluruh gambar di situs ini punya **fallback otomatis** (gradasi hijau + ikon) sehingga halaman tidak akan tampil rusak/kosong.

## 📁 Struktur Folder

```
├── index.html          Beranda
├── about.html           Tentang Kami + Tim KKN
├── profile-desa.html    Profil Desa
├── program-kerja.html   Program Kerja (timeline)
├── galeri.html          Galeri (masonry + lightbox)
├── artikel.html         Artikel
├── kontak.html          Kontak
├── 404.html             Halaman not-found custom
├── robots.txt           Instruksi crawler mesin pencari
├── sitemap.xml          Peta situs untuk SEO
├── .nojekyll            Menonaktifkan pemrosesan Jekyll di GitHub Pages
├── css/
│   ├── style.css        Gaya utama (semua komponen)
│   ├── responsive.css   Seluruh media query
│   └── animation.css    Keyframes animasi
├── js/
│   ├── script.js        Navbar, footer, back-to-top, form kontak
│   ├── gallery.js       Filter & lightbox galeri
│   └── animation.js     Scroll reveal, preloader, parallax, counter
├── img/                 Semua foto & logo
└── assets/              Cadangan untuk aset lain (ikon custom, dsb.)
```

## ✅ Fitur yang Sudah Diimplementasikan

- Hero full-screen dengan parallax & animasi masuk bertahap
- Navbar sticky, transparan → solid saat scroll, responsif dengan menu mobile
- Statistik dengan animated counter
- Timeline Program Kerja interaktif dengan filter kategori
- Grid Tim KKN (16 anggota, 4×4) dengan hover reveal sosial media
- Galeri masonry dengan filter kategori & lightbox
- Artikel dengan tampilan detail in-page & related posts
- Form kontak dummy dengan validasi & pesan sukses
- Preloader, scroll progress bar, tombol back-to-top
- Skip-link, `aria-label`, kontras fokus keyboard untuk aksesibilitas
- SEO dasar: meta description per halaman, Open Graph, Twitter Card, canonical, sitemap.xml, robots.txt
- Sepenuhnya responsif: desktop, laptop, tablet, Android, iPhone
