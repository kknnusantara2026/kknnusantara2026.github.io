/* =========================================================
   KKN DESA MARGAWANGI — SCRIPT.JS (JAVASCRIPT UTAMA)
   Menangani: injeksi navbar & footer, perilaku navbar saat
   discroll, menu mobile, scroll progress bar, tombol back to
   top, dan inisialisasi umum lain di luar galeri & animasi
   (yang punya file terpisah: gallery.js & animation.js).

   Fungsi-fungsi di bawah ini sengaja dibuat sebagai kerangka
   kosong (stub) pada tahap "Struktur Folder" ini dan akan
   diisi bertahap sesuai urutan pengerjaan (Navbar, Footer,
   Kontak, Responsif, Animasi, dst).
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initBackToTop();
  initFooterYear();
  initProgramFilter();
  initArticleReader();
  initContactForm();
});

/**
 * initProgramFilter
 * Menangani filter kategori pada timeline Program Kerja: klik
 * tombol filter akan menyembunyikan/menampilkan item timeline
 * sesuai kategori, dan menampilkan pesan jika tidak ada program
 * pada kategori yang dipilih. Aman dijalankan di semua halaman
 * karena diawali guard clause.
 */
function initProgramFilter() {
  const filterContainer = document.querySelector('.program-filters');
  const timeline = document.getElementById('programTimeline');
  if (!filterContainer || !timeline) return; // bukan halaman Program Kerja

  const buttons = filterContainer.querySelectorAll('.filter-btn');
  const items = timeline.querySelectorAll('.timeline-item');
  const emptyMsg = document.getElementById('timelineEmpty');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.filter;
      let visibleCount = 0;

      items.forEach((item) => {
        const isMatch = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('is-hidden', !isMatch);
        if (isMatch) visibleCount += 1;
      });

      if (emptyMsg) {
        emptyMsg.hidden = visibleCount !== 0;
      }
    });
  });
}

/**
 * initArticleReader
 * Menangani perpindahan antara daftar artikel dan tampilan detail
 * artikel tanpa reload halaman: klik "Baca Selengkapnya" (di kartu
 * atau di kartu "Artikel Terkait") akan menyembunyikan daftar dan
 * menampilkan artikel yang sesuai berdasarkan atribut
 * data-article-target, lalu tombol "Kembali ke Artikel"
 * mengembalikan tampilan ke daftar semula.
 */
function initArticleReader() {
  const listSection = document.getElementById('articleListSection');
  const detailSection = document.getElementById('articleDetailSection');
  if (!listSection || !detailSection) return; // bukan halaman Artikel

  const backBtn = document.getElementById('backToList');
  const allDetails = detailSection.querySelectorAll('.article-detail');

  function showArticle(articleId) {
    const target = document.getElementById(`detail-${articleId}`);
    if (!target) return;

    allDetails.forEach((el) => { el.hidden = true; });
    target.hidden = false;

    listSection.hidden = true;
    detailSection.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showList() {
    detailSection.hidden = true;
    listSection.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Tombol "Baca Selengkapnya" pada kartu daftar, sekaligus link
  // "Artikel Terkait" di dalam halaman detail (delegasi event agar
  // menjangkau kedua konteks sekaligus)
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-article-target]');
    if (!trigger) return;
    e.preventDefault();
    showArticle(trigger.dataset.articleTarget);
  });

  if (backBtn) {
    backBtn.addEventListener('click', showList);
  }
}

/**
 * initFooterYear
 * Mengisi tahun berjalan secara otomatis pada elemen
 * #currentYear di footer, supaya copyright selalu up to date
 * tanpa perlu diedit manual tiap tahun.
 */
function initFooterYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * initNavbar
 * Menangani: efek transparan -> solid saat scroll (hanya relevan
 * di halaman yang punya Hero), toggle menu mobile, dan highlight
 * menu yang sesuai dengan halaman aktif.
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const hasHero = document.querySelector('.hero') !== null;
  const toggle = document.getElementById('navbarToggle');
  const nav = document.getElementById('navbarNav');
  const navLinks = nav ? nav.querySelectorAll('.nav-link') : [];

  // --- Highlight menu aktif berdasarkan nama file halaman saat ini ---
  const currentPage = (window.location.pathname.split('/').pop() || 'index.html')
    .replace('.html', '') || 'index';

  navLinks.forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add('is-active');
    }
  });

  // --- Transparan di atas Hero, solid setelah discroll ---
  const SCROLL_THRESHOLD = 60;

  function updateNavbarState() {
    const isScrolled = window.scrollY > SCROLL_THRESHOLD;

    if (hasHero && !isScrolled) {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.toggle('navbar-scrolled', isScrolled);
    }
  }

  updateNavbarState();
  window.addEventListener('scroll', updateNavbarState, { passive: true });

  // --- Toggle menu mobile ---
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Tutup menu otomatis saat salah satu link diklik (mobile)
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }
}

/**
 * initBackToTop
 * Menampilkan tombol #backToTop setelah pengunjung scroll
 * melewati satu tinggi layar, dan smooth scroll ke atas saat
 * tombol diklik.
 */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  function toggleVisibility() {
    const shouldShow = window.scrollY > window.innerHeight * 0.6;
    btn.classList.toggle('show', shouldShow);
  }

  toggleVisibility();
  window.addEventListener('scroll', toggleVisibility, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * initContactForm
 * Menangani submit form kontak (dummy, tanpa backend): mencegah
 * reload halaman, memanfaatkan validasi bawaan browser (atribut
 * required/type email pada tiap input), lalu menampilkan pesan
 * sukses dan mengosongkan form seolah pesan berhasil terkirim.
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return; // bukan halaman Kontak

  const successMsg = document.getElementById('formSuccess');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (successMsg) {
      successMsg.hidden = false;
    }

    form.reset();

    if (successMsg) {
      setTimeout(() => {
        successMsg.hidden = true;
      }, 5000);
    }
  });
}
