/* =========================================================
   KKN DESA MARGAWANGI — GALLERY.JS
   Menangani logika khusus halaman Galeri: filter kategori
   (masonry), dan lightbox saat foto diklik.

   File ini aman dimuat di semua halaman karena setiap fungsi
   memeriksa dulu apakah elemen targetnya ada di halaman
   (guard clause), sehingga tidak menimbulkan error di halaman
   selain galeri.html.

   Diimplementasikan penuh pada tahap "Galeri".
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const galleryGrid = document.querySelector('.gallery-grid');
  if (!galleryGrid) return; // bukan halaman galeri, hentikan di sini

  initGalleryFilter();
  initLightbox();
});

/**
 * initGalleryFilter
 * Menangani klik tombol filter kategori -> menampilkan/
 * menyembunyikan item galeri sesuai kategori yang dipilih.
 */
function initGalleryFilter() {
  const filterContainer = document.querySelector('.gallery-filters');
  const grid = document.getElementById('galleryGrid');
  if (!filterContainer || !grid) return;

  const buttons = filterContainer.querySelectorAll('.filter-btn');
  const items = grid.querySelectorAll('.gallery-item');
  const emptyMsg = document.getElementById('galleryEmpty');

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
 * initLightbox
 * Menangani: klik foto -> membuka lightbox fullscreen (animasi
 * zoom lewat CSS class "is-open"), navigasi sebelumnya/berikutnya
 * (tombol maupun tombol panah keyboard), tombol/Escape untuk
 * menutup, dan klik area gelap di luar foto untuk menutup.
 * Hanya menyertakan item galeri yang sedang tampil (tidak
 * ter-filter) ke dalam urutan navigasi.
 */
function initLightbox() {
  const grid = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  if (!grid || !lightbox) return;

  const items = Array.from(grid.querySelectorAll('.gallery-item'));
  const imgEl = document.getElementById('lightboxImage');
  const captionEl = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  let currentIndex = -1;

  function getVisibleItems() {
    return items.filter((item) => !item.classList.contains('is-hidden'));
  }

  function openLightbox(item) {
    const visibleItems = getVisibleItems();
    currentIndex = visibleItems.indexOf(item);
    if (currentIndex === -1) return;
    renderCurrent(visibleItems);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function renderCurrent(visibleItems) {
    const item = visibleItems[currentIndex];
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-item-title');
    imgEl.src = img ? img.src : '';
    imgEl.alt = img ? img.alt : '';
    captionEl.textContent = title ? title.textContent : '';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showStep(step) {
    const visibleItems = getVisibleItems();
    if (!visibleItems.length) return;
    currentIndex = (currentIndex + step + visibleItems.length) % visibleItems.length;
    renderCurrent(visibleItems);
  }

  items.forEach((item) => {
    item.addEventListener('click', () => openLightbox(item));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(item);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => showStep(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => showStep(1));

  // Klik area gelap (di luar foto) untuk menutup
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Navigasi & tutup lewat keyboard
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showStep(-1);
    if (e.key === 'ArrowRight') showStep(1);
  });
}
