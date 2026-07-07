/* =========================================================
   KKN DESA MARGAWANGI — ANIMATION.JS
   Menangani animasi berbasis scroll menggunakan
   IntersectionObserver: elemen dengan class "anim-*" (lihat
   css/animation.css) akan mendapat class "is-visible" saat
   masuk viewport, memicu animasi CSS terkait.

   Juga akan menangani: scroll progress bar, parallax pada
   Hero, dan animated counter (statistik).

   Diimplementasikan penuh pada tahap "Animasi", meskipun
   observer dasarnya sudah disiapkan di sini agar setiap
   tahap berikutnya tinggal menambahkan class "anim-*" pada
   markup baru tanpa perlu mengubah file ini lagi.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initPreloader();
  initScrollProgress();
  initParallax();
  initCounters();
});

/**
 * initScrollReveal
 * Mengamati semua elemen dengan class diawali "anim-" dan
 * menambahkan "is-visible" ketika elemen tersebut memasuki
 * viewport, memicu keyframes yang sesuai di animation.css.
 */
function initScrollReveal() {
  const animatedEls = document.querySelectorAll(
    '[class*="anim-fade-in"], [class*="anim-slide-up"], [class*="anim-slide-left"], [class*="anim-slide-right"], [class*="anim-zoom"]'
  );

  if (!animatedEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
  });

  animatedEls.forEach((el) => observer.observe(el));
}

/**
 * initPreloader
 * Menyembunyikan preloader (#preloader) setelah seluruh resource
 * halaman (gambar, font, dsb.) selesai dimuat, dengan fade-out
 * halus. Memakai event "load" (bukan DOMContentLoaded) supaya
 * benar-benar menunggu gambar Hero selesai tampil.
 */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  function hidePreloader() {
    preloader.classList.add('is-hidden');
  }

  if (document.readyState === 'complete') {
    hidePreloader();
  } else {
    window.addEventListener('load', hidePreloader);
    // Jaring pengaman: kalau ada resource yang lambat/gagal
    // dimuat, preloader tetap disembunyikan maksimal 3 detik
    // supaya tidak mengganjal pengunjung selamanya.
    setTimeout(hidePreloader, 3000);
  }
}

/**
 * initScrollProgress
 * Mengisi lebar #scrollProgress sesuai persentase posisi scroll
 * halaman saat ini, memberi indikator visual seberapa jauh
 * pengunjung sudah membaca halaman.
 */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
  }

  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
}

/**
 * initParallax
 * Memberi efek parallax halus pada latar Hero (.hero-bg): saat
 * discroll, latar bergerak sedikit lebih lambat dari konten,
 * menciptakan kesan kedalaman. Hanya berjalan di halaman yang
 * memiliki Hero (Beranda).
 */
function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  // Hormati preferensi pengguna yang mengurangi animasi/gerakan
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  function updateParallax() {
    const offset = window.scrollY;
    // Batasi pergeseran maksimal supaya latar tidak "lepas" dari area Hero
    const translateY = Math.min(offset * 0.35, 160);
    heroBg.style.transform = `translateY(${translateY}px) scale(1.05)`;
  }

  updateParallax();
  window.addEventListener('scroll', updateParallax, { passive: true });
}

/**
 * initCounters
 * Menganimasikan angka pada elemen ber-atribut [data-count-to]
 * (dipakai di section Statistik Beranda) dari 0 hingga nilai
 * targetnya, dipicu saat elemen memasuki viewport, memakai
 * requestAnimationFrame supaya mulus di berbagai perangkat.
 */
function initCounters() {
  const counters = document.querySelectorAll('[data-count-to]');
  if (!counters.length) return;

  const DURATION = 1800; // ms

  function animateCounter(el) {
    const target = parseInt(el.dataset.countTo, 10) || 0;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      // easeOutCubic supaya melambat halus mendekati angka akhir
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach((el) => observer.observe(el));
}
