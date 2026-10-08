const wafasWhatsApp = '6281331744080';
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz1Lbe_nEUdr7rSUW0VahlFdRYpwJ5-eeO7S1zAwvECprQ82lWhpla2ieT4xfMi_kYE/exec';
const GOOGLE_SHEET_API_KEY = 'wafasphoto';

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

window.addEventListener('load', () => document.body.classList.add('loaded'));

const nav = $('#nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

$$('.reveal').forEach(el => obs.observe(el));

const heroImage = $('.hero-photo');

if (heroImage) {
  const heroImages = [
    'images/hero/1.jpeg',
    'images/hero/2.jpg',
    'images/hero/3.jpg',
    'images/hero/4.jpg',
    'images/hero/5.jpg',
    'images/hero/6.jpg'
  ];

  const heroDuration = 6000;
  const heroFadeDuration = 1800;
  let heroIndex = 0;

  function setupHeroLayer(img) {
    img.style.position = 'absolute';
    img.style.inset = '0';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center center';
    img.style.display = 'block';
    img.style.margin = '0';
    img.style.padding = '0';
    img.style.border = '0';
    img.style.transition = `opacity ${heroFadeDuration}ms ease-in-out`;
    img.style.willChange = 'opacity';
  }

  setupHeroLayer(heroImage);
  heroImage.style.zIndex = '0';
  heroImage.style.opacity = '1';

  const heroNext = document.createElement('img');
  heroNext.className = 'hero-photo hero-photo-next';
  heroNext.alt = 'Wafas Photo';
  heroNext.src = heroImages[1];

  setupHeroLayer(heroNext);
  heroNext.style.zIndex = '1';
  heroNext.style.opacity = '0';

  heroImage.insertAdjacentElement('afterend', heroNext);

  heroImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  function changeHeroPhoto() {
    const nextIndex = (heroIndex + 1) % heroImages.length;

    const currentLayer = heroIndex % 2 === 0 ? heroImage : heroNext;
    const nextLayer = heroIndex % 2 === 0 ? heroNext : heroImage;

    nextLayer.src = heroImages[nextIndex];

    nextLayer.onload = () => {
      nextLayer.style.opacity = '1';
      currentLayer.style.opacity = '0';
      heroIndex = nextIndex;
    };

    nextLayer.onerror = () => {
      console.warn('Hero photo gagal dimuat:', heroImages[nextIndex]);
      heroIndex = nextIndex;
    };
  }

  setInterval(changeHeroPhoto, heroDuration);
}

let filtered = [...projects];
let currentIndex = 0;
let galleryIndex = 0;

function renderProjects() {
  const grid = $('#projectGrid');

  grid.innerHTML = filtered.map((p, i) => `
    <article
      class="project-card reveal visible"
      data-i="${i}"
      tabindex="0"
      aria-label="Open ${p.title}"
    >
      <img
        src="${p.cover}"
        alt="${p.title}"
        loading="lazy"
      >
      <div class="project-shade"></div>
      <div class="project-info">
        <span>${p.category}</span>
        <h3>${p.title}</h3>
        <small>${p.location} · ${p.year}</small>
      </div>
      <b>${String(i + 1).padStart(2, '0')}</b>
    </article>
  `).join('');

  $$('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      openProject(Number(card.dataset.i));
    });

    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProject(Number(card.dataset.i));
      }
    });
  });
}

$$('#filters button').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('#filters button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    filtered = filter === 'all'
      ? [...projects]
      : projects.filter(p => p.category === filter);

    renderProjects();
  });
});

function openProject(index) {
  currentIndex = index;

  const p = filtered[index];

  if (!p) return;

  $('#modalCategory').textContent = p.category;
  $('#modalTitle').textContent = p.title;
  $('#modalMeta').textContent = `${p.location} · ${p.year}`;
  $('#modalCount').textContent = `${p.photos.length} PHOTOS`;

  $('#galleryGrid').innerHTML = p.photos.map((src, i) => `
    <button
      class="gallery-item"
      data-i="${i}"
      aria-label="Open photo ${i + 1}"
    >
      <img
        src="${src}"
        alt="${p.title} ${i + 1}"
        loading="lazy"
      >
    </button>
  `).join('');

  $$('#galleryGrid .gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      openViewer(Number(item.dataset.i));
    });
  });

  $('#projectModal').classList.add('open');
  document.body.classList.add('no-scroll');
}

function closeProject() {
  $('#projectModal').classList.remove('open');

  if (!$('#viewer').classList.contains('open')) {
    document.body.classList.remove('no-scroll');
  }
}

$('#modalClose').addEventListener('click', closeProject);

$('#prevProject').addEventListener('click', () => {
  openProject(
    (currentIndex - 1 + filtered.length) % filtered.length
  );
});

$('#nextProject').addEventListener('click', () => {
  openProject(
    (currentIndex + 1) % filtered.length
  );
});

function openViewer(index) {
  galleryIndex = index;

  const p = filtered[currentIndex];

  $('#viewerImg').src = p.photos[index];
  $('#viewerImg').alt = `${p.title} — photo ${index + 1}`;

  $('#viewer').classList.add('open');
  document.body.classList.add('no-scroll');
}

function closeViewer() {
  $('#viewer').classList.remove('open');
  document.body.classList.add('no-scroll');
}

function moveViewer(step) {
  const p = filtered[currentIndex];

  galleryIndex =
    (galleryIndex + step + p.photos.length) % p.photos.length;

  $('#viewerImg').src = p.photos[galleryIndex];
  $('#viewerImg').alt = `${p.title} — photo ${galleryIndex + 1}`;
}

$('#viewerClose').addEventListener('click', closeViewer);

$('#viewerPrev').addEventListener('click', () => {
  moveViewer(-1);
});

$('#viewerNext').addEventListener('click', () => {
  moveViewer(1);
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if ($('#viewer').classList.contains('open')) {
      closeViewer();
    } else if ($('#projectModal').classList.contains('open')) {
      closeProject();
    }
  }

  if ($('#viewer').classList.contains('open')) {
    if (e.key === 'ArrowLeft') {
      moveViewer(-1);
    }

    if (e.key === 'ArrowRight') {
      moveViewer(1);
    }
  }
});

$('#viewer').addEventListener('click', e => {
  if (e.target.id === 'viewer') {
    closeViewer();
  }
});

$('#bookingForm').addEventListener('submit', async e => {
  e.preventDefault();

  const form = e.currentTarget;

  if (form.website.value) return;

  const data = Object.fromEntries(
    new FormData(form).entries()
  );

  const status = $('#formStatus');

  const message = `Halo Wafas Photo, saya ingin booking.

Nama: ${data.name}
WhatsApp: ${data.whatsapp}
Email: ${data.email || '-'}
Keperluan: ${data.service}
Tanggal: ${data.date}
Waktu: ${data.time || '-'}
Jumlah orang: ${data.people || '-'}
Lokasi: ${data.location || '-'}
Request: ${data.request || '-'}`;

  status.textContent = 'Memproses booking...';

  if (GOOGLE_SCRIPT_URL) {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify({
          ...data,
          apiKey: GOOGLE_SHEET_API_KEY,
          source: 'Wafas Photo Website'
        })
      });

      console.log('Booking dikirim ke Google Sheets:', data);

      status.textContent =
        'Booking dikirim. WhatsApp akan dibuka...';

    } catch (error) {
      console.error('Google Sheets error:', error);

      status.textContent =
        'Gagal mengirim booking ke Google Sheets.';
    }
  } else {
    status.textContent =
      'WhatsApp akan dibuka. Google Sheets belum dikonfigurasi.';
  }

  const wa = wafasWhatsApp.replace(/\D/g, '');

  if (wa && !wa.includes('XXXXXXXX')) {
    setTimeout(() => {
      window.open(
        `https://wa.me/${wa}?text=${encodeURIComponent(message)}`,
        '_blank'
      );
    }, 350);
  } else {
    status.textContent +=
      ' Ganti nomor WhatsApp di js/script.js terlebih dahulu.';
  }

  form.reset();
});

renderProjects();