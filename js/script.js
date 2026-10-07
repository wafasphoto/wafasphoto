/* =========================================================
   WAFAS PHOTO — MAIN JAVASCRIPT
   File ini mengatur:
   - Animasi
   - Navbar
   - Portfolio
   - Filter portfolio
   - Project modal
   - Fullscreen photo viewer
   - Booking Google Sheets
   - WhatsApp

   ==================== YANG MUDAH DIUBAH ====================
   1. Nomor WhatsApp        → wafasWhatsApp
   2. URL Google Apps Script → GOOGLE_SCRIPT_URL
   3. API Key               → GOOGLE_SHEET_API_KEY
   4. Project + foto        → js/projects.js
   5. Warna + layout        → css/style.css bagian :root
   ========================================================= */


// =========================================================
// 1. KONFIGURASI BOOKING
// =========================================================

// Nomor WhatsApp Wafas Photo.
// Format: 628xxxx — tanpa tanda + dan tanpa 0 di depan.
const wafasWhatsApp='6281331744080';

// URL Web App Google Apps Script.
// Tempel URL yang berakhiran /exec di sini.
const GOOGLE_SCRIPT_URL='https://script.google.com/macros/s/AKfycbz1Lbe_nEUdr7rSUW0VahlFdRYpwJ5-eeO7S1zAwvECprQ82lWhpla2ieT4xfMi_kYE/exec';

// API Key harus sama dengan API_KEY di google-apps-script.gs.
const GOOGLE_SHEET_API_KEY='wafasphoto';


// =========================================================
// 2. HELPER DOM
// Digunakan untuk memilih elemen HTML dengan lebih singkat.
//
// $   → mengambil 1 elemen
// $$  → mengambil banyak elemen
// =========================================================

const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];


// =========================================================
// 3. LOADER + NAVBAR
// =========================================================

// Setelah seluruh halaman selesai dimuat,
// class "loaded" ditambahkan ke body.
// CSS dapat menggunakan class ini untuk menghilangkan loader.
window.addEventListener('load',()=>document.body.classList.add('loaded'));


// Mengambil elemen navbar dengan ID #nav.
const nav=$('#nav');


// Navbar berubah ketika halaman di-scroll lebih dari 40px.
// Class "scrolled" kemudian diatur oleh CSS.
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',window.scrollY>40);
},{passive:true});


// =========================================================
// 4. REVEAL ANIMATION
// Elemen dengan class .reveal akan muncul ketika masuk layar.
//
// Cara pakai di HTML:
// <section class="reveal">...</section>
//
// IntersectionObserver digunakan agar animasi hanya dijalankan
// ketika elemen benar-benar terlihat di layar.
// =========================================================

const obs=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');

      // Setelah muncul, observer dihentikan untuk elemen tersebut.
      obs.unobserve(entry.target);
    }
  });
},{threshold:.12});


// Cari semua elemen dengan class .reveal lalu amati.
$$('.reveal').forEach(el=>obs.observe(el));


// =========================================================
// 5. HERO PHOTO — TRUE CROSSFADE SLIDESHOW
// =========================================================
// Foto hero menggunakan 2 layer yang saling crossfade.
//
// Tidak menggunakan:
// - zoom
// - transform
// - parallax
//
// HTML TETAP:
//
// <img class="hero-photo" src="images/hero/1.jpeg" alt="Wafas Photo">
//
// =========================================================

const heroImage = $('.hero-photo');

if(heroImage){

  // -------------------------------------------------------
  // DAFTAR FOTO HERO
  // -------------------------------------------------------
  //
  // Sesuaikan nama file dengan isi folder:
  // images/hero/
  //
  // Saat ini mengikuti file yang ada di script kamu:
  // 1.jpeg
  // 2.jpg
  //
  // Tambahkan foto berikutnya jika memang ada.
  // -------------------------------------------------------

  const heroImages = [
    'images/hero/1.jpeg',
    'images/hero/2.jpg',
    'images/hero/3.jpg',
    'images/hero/4.jpg',
    'images/hero/5.jpg',
    'images/hero/6.jpg'
  ];


  // -------------------------------------------------------
  // PENGATURAN
  // -------------------------------------------------------

  const heroDuration = 6000;
  const heroFadeDuration = 1800;

  let heroIndex = 0;


  // -------------------------------------------------------
  // FUNGSI STYLE LAYER
  // -------------------------------------------------------
  // Memastikan kedua foto benar-benar memenuhi area hero.
  // -------------------------------------------------------

  function setupHeroLayer(img){

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

    img.style.transition =
      `opacity ${heroFadeDuration}ms ease-in-out`;

    img.style.willChange = 'opacity';

  }


  // -------------------------------------------------------
  // LAYER PERTAMA
  // -------------------------------------------------------

  setupHeroLayer(heroImage);

  heroImage.style.zIndex = '0';
  heroImage.style.opacity = '1';


  // -------------------------------------------------------
  // BUAT LAYER KEDUA
  // -------------------------------------------------------

  const heroNext = document.createElement('img');

  heroNext.className = 'hero-photo hero-photo-next';

  heroNext.alt = 'Wafas Photo';

  heroNext.src = heroImages[1];

  setupHeroLayer(heroNext);

  heroNext.style.zIndex = '1';
  heroNext.style.opacity = '0';

  // Masukkan tepat setelah foto pertama
  heroImage.insertAdjacentElement(
    'afterend',
    heroNext
  );


  // -------------------------------------------------------
  // PRELOAD SEMUA FOTO
  // -------------------------------------------------------

  heroImages.forEach(src => {

    const img = new Image();

    img.src = src;

  });


  // -------------------------------------------------------
  // GANTI FOTO
  // -------------------------------------------------------

  function changeHeroPhoto(){

    const nextIndex =
      (heroIndex + 1) % heroImages.length;


    // Foto yang sedang berada di depan
    // menentukan layer mana yang digunakan.

    const currentLayer =
      heroIndex % 2 === 0
      ? heroImage
      : heroNext;

    const nextLayer =
      heroIndex % 2 === 0
      ? heroNext
      : heroImage;


    // -----------------------------------------------------
    // Siapkan foto berikutnya
    // -----------------------------------------------------

    nextLayer.src =
      heroImages[nextIndex];


    // Pastikan foto berikutnya sudah dimuat
    // sebelum crossfade dimulai.

    nextLayer.onload = () => {

      // Foto berikutnya muncul
      nextLayer.style.opacity = '1';

      // Foto lama menghilang secara bersamaan
      currentLayer.style.opacity = '0';


      // Simpan index baru
      heroIndex = nextIndex;

    };


    // Jika foto gagal dimuat,
    // jangan biarkan slideshow berhenti.

    nextLayer.onerror = () => {

      console.warn(
        'Hero photo gagal dimuat:',
        heroImages[nextIndex]
      );

      heroIndex = nextIndex;

    };

  }


  // -------------------------------------------------------
  // SLIDESHOW
  // -------------------------------------------------------

  setInterval(
    changeHeroPhoto,
    heroDuration
  );

}


// =========================================================
// 6. PROJECT / PORTFOLIO
//
// Data portfolio berasal dari:
// js/projects.js
//
// Jangan mengubah HTML/CSS hanya untuk menambah project.
// Tambahkan project dan foto melalui projects.js.
// =========================================================

// Semua project ditampilkan pertama kali.
let filtered=[...projects];

// Menyimpan index project yang sedang dibuka.
let currentIndex=0;

// Menyimpan index foto yang sedang dibuka.
let galleryIndex=0;


// ---------------------------------------------------------
// RENDER PROJECT
// Membuat kartu portfolio secara otomatis dari projects.js.
// ---------------------------------------------------------

function renderProjects(){
  const grid=$('#projectGrid');

  // Membuat HTML setiap project.
  grid.innerHTML=filtered.map((p,i)=>`
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

      <b>${String(i+1).padStart(2,'0')}</b>
    </article>
  `).join('');


  // -------------------------------------------------------
  // EVENT SETIAP KARTU PROJECT
  // -------------------------------------------------------

  $$('.project-card').forEach(card=>{

    // Klik mouse → buka project.
    card.addEventListener('click',()=>{
      openProject(Number(card.dataset.i));
    });


    // Keyboard:
    // Enter / Space → buka project.
    card.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){
        e.preventDefault();
        openProject(Number(card.dataset.i));
      }
    });

  });
}


// =========================================================
// FILTER PORTFOLIO
//
// Contoh tombol HTML:
// data-filter="all"
// data-filter="Graduation"
// data-filter="Engagement"
// =========================================================

$$('#filters button').forEach(btn=>{

  btn.addEventListener('click',()=>{

    // Hapus status active dari semua tombol.
    $$('#filters button').forEach(b=>b.classList.remove('active'));

    // Beri active pada tombol yang diklik.
    btn.classList.add('active');

    // Ambil kategori dari data-filter.
    const filter=btn.dataset.filter;

    // Jika "all", tampilkan semua project.
    // Jika bukan, tampilkan project sesuai kategori.
    filtered=
      filter==='all'
      ? [...projects]
      : projects.filter(p=>p.category===filter);

    // Render ulang portfolio.
    renderProjects();

  });

});


// =========================================================
// 6A. OPEN PROJECT
// Membuka project dan menampilkan seluruh foto gallery.
// =========================================================

function openProject(index){

  // Simpan posisi project.
  currentIndex=index;

  // Ambil project berdasarkan index.
  const p=filtered[index];

  // Jika project tidak ditemukan, hentikan fungsi.
  if(!p)return;


  // -------------------------------------------------------
  // ISI INFORMASI MODAL
  // -------------------------------------------------------

  $('#modalCategory').textContent=p.category;
  $('#modalTitle').textContent=p.title;
  $('#modalMeta').textContent=`${p.location} · ${p.year}`;
  $('#modalCount').textContent=`${p.photos.length} PHOTOS`;


  // -------------------------------------------------------
  // BUAT GALLERY
  // -------------------------------------------------------

  $('#galleryGrid').innerHTML=p.photos.map((src,i)=>`
    <button
      class="gallery-item"
      data-i="${i}"
      aria-label="Open photo ${i+1}"
    >
      <img
        src="${src}"
        alt="${p.title} ${i+1}"
        loading="lazy"
      >
    </button>
  `).join('');


  // -------------------------------------------------------
  // EVENT SETIAP FOTO GALLERY
  // Klik foto → buka fullscreen viewer.
  // -------------------------------------------------------

  $$('#galleryGrid .gallery-item').forEach(item=>{

    item.addEventListener('click',()=>{
      openViewer(Number(item.dataset.i));
    });

  });


  // Tampilkan modal project.
  $('#projectModal').classList.add('open');

  // Kunci scroll halaman utama.
  document.body.classList.add('no-scroll');
}


// =========================================================
// 6B. CLOSE PROJECT
// Menutup modal project.
// =========================================================

function closeProject(){

  // Hilangkan modal.
  $('#projectModal').classList.remove('open');

  // Jika fullscreen viewer tidak sedang terbuka,
  // scroll halaman boleh dikembalikan.
  if(!$('#viewer').classList.contains('open')){
    document.body.classList.remove('no-scroll');
  }
}


// Tombol close modal.
$('#modalClose').addEventListener('click',closeProject);


// Project sebelumnya.
$('#prevProject').addEventListener('click',()=>{
  openProject(
    (currentIndex-1+filtered.length)%filtered.length
  );
});


// Project berikutnya.
$('#nextProject').addEventListener('click',()=>{
  openProject(
    (currentIndex+1)%filtered.length
  );
});


// =========================================================
// 7. FULLSCREEN PHOTO VIEWER
// Digunakan untuk membuka foto satu per satu secara fullscreen.
// =========================================================


// ---------------------------------------------------------
// OPEN VIEWER
// ---------------------------------------------------------

function openViewer(index){

  // Simpan posisi foto.
  galleryIndex=index;

  // Ambil project yang sedang aktif.
  const p=filtered[currentIndex];

  // Masukkan foto ke viewer.
  $('#viewerImg').src=p.photos[index];

  // Alt text untuk aksesibilitas.
  $('#viewerImg').alt=`${p.title} — photo ${index+1}`;

  // Tampilkan fullscreen viewer.
  $('#viewer').classList.add('open');

  // Pastikan halaman belakang tidak bisa di-scroll.
  document.body.classList.add('no-scroll');
}


// ---------------------------------------------------------
// CLOSE VIEWER
// ---------------------------------------------------------

function closeViewer(){

  // Sembunyikan viewer.
  $('#viewer').classList.remove('open');

  // Tetap kunci scroll karena modal project
  // masih bisa berada di belakang viewer.
  document.body.classList.add('no-scroll');
}


// ---------------------------------------------------------
// NEXT / PREVIOUS PHOTO
// ---------------------------------------------------------

function moveViewer(step){

  // Ambil project aktif.
  const p=filtered[currentIndex];

  // Hitung foto berikut/sebelumnya.
  //
  // Rumus modulo (%) membuat navigasi berputar:
  // foto terakhir → kembali ke foto pertama.
  galleryIndex=
    (galleryIndex+step+p.photos.length)%p.photos.length;

  // Tampilkan foto baru.
  $('#viewerImg').src=p.photos[galleryIndex];

  // Update alt text.
  $('#viewerImg').alt=`${p.title} — photo ${galleryIndex+1}`;
}


// Tombol close viewer.
$('#viewerClose').addEventListener('click',closeViewer);


// Foto sebelumnya.
$('#viewerPrev').addEventListener('click',()=>{
  moveViewer(-1);
});


// Foto berikutnya.
$('#viewerNext').addEventListener('click',()=>{
  moveViewer(1);
});


// =========================================================
// 7A. KEYBOARD NAVIGATION
//
// ESC          → tutup viewer / modal
// Arrow Left   → foto sebelumnya
// Arrow Right  → foto berikutnya
// =========================================================

window.addEventListener('keydown',e=>{

  // ESC.
  if(e.key==='Escape'){

    // Jika viewer terbuka, tutup viewer terlebih dahulu.
    if($('#viewer').classList.contains('open')){
      closeViewer();

    // Jika viewer tidak terbuka tetapi modal terbuka,
    // tutup modal.
    }else if($('#projectModal').classList.contains('open')){
      closeProject();
    }
  }


  // Navigasi foto hanya ketika viewer terbuka.
  if($('#viewer').classList.contains('open')){

    // Foto sebelumnya.
    if(e.key==='ArrowLeft'){
      moveViewer(-1);
    }

    // Foto berikutnya.
    if(e.key==='ArrowRight'){
      moveViewer(1);
    }
  }

});


// =========================================================
// 7B. KLIK AREA GELAP VIEWER
// Klik area background → tutup viewer.
// Klik foto → tidak menutup.
// =========================================================

$('#viewer').addEventListener('click',e=>{

  if(e.target.id==='viewer'){
    closeViewer();
  }

});


// =========================================================
// 8. BOOKING → GOOGLE SHEETS + WHATSAPP
//
// Alurnya:
//
// Form
//   ↓
// Google Apps Script
//   ↓
// Google Sheets
//   ↓
// WhatsApp
//
// Jika Google Sheets belum dikonfigurasi,
// WhatsApp tetap dapat dibuka.
// =========================================================

$('#bookingForm').addEventListener('submit',async e=>{

  // Mencegah form melakukan reload halaman.
  e.preventDefault();

  // Ambil form yang dikirim.
  const form=e.currentTarget;


  // -------------------------------------------------------
  // HONEYPOT ANTI-SPAM
  //
  // Field "website" seharusnya kosong.
  // Jika terisi, kemungkinan bot → hentikan proses.
  // -------------------------------------------------------

  if(form.website.value)return;


  // -------------------------------------------------------
  // AMBIL DATA FORM
  // -------------------------------------------------------

  const data=Object.fromEntries(
    new FormData(form).entries()
  );


  // Status yang ditampilkan di bawah form.
  const status=$('#formStatus');


  // -------------------------------------------------------
  // BUAT PESAN WHATSAPP
  // -------------------------------------------------------

  const message=`Halo Wafas Photo, saya ingin booking.

Nama: ${data.name}
WhatsApp: ${data.whatsapp}
Email: ${data.email||'-'}
Keperluan: ${data.service}
Tanggal: ${data.date}
Waktu: ${data.time||'-'}
Jumlah orang: ${data.people||'-'}
Lokasi: ${data.location||'-'}
Request: ${data.request||'-'}`;


  // Beri informasi kepada user.
  status.textContent='Memproses booking...';


  // =======================================================
  // GOOGLE SHEETS
  // =======================================================

  // Jika URL Apps Script sudah diisi,
  // kirim data booking ke Google Sheets.
  if(GOOGLE_SCRIPT_URL){

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

  }else{

    // Jika URL Apps Script masih kosong.
    status.textContent=
      'WhatsApp akan dibuka. Google Sheets belum dikonfigurasi.';
  }


  // =======================================================
  // WHATSAPP
  // =======================================================

  // Bersihkan nomor dari karakter selain angka.
  const wa=wafasWhatsApp.replace(/\D/g,'');


  // Cek apakah nomor sudah benar-benar diisi.
  if(wa && !wa.includes('XXXXXXXX')){

    // Beri jeda sedikit agar status form sempat terlihat.
    setTimeout(()=>{
      window.open(
        `https://wa.me/${wa}?text=${encodeURIComponent(message)}`,
        '_blank'
      );
    },350);

  }else{

    // Jika nomor masih menggunakan placeholder.
    status.textContent+=
      ' Ganti nomor WhatsApp di js/script.js terlebih dahulu.';
  }


  // Kosongkan form setelah proses selesai.
  form.reset();

});


// =========================================================
// 9. INIT
// Menjalankan portfolio pertama kali ketika website dibuka.
// =========================================================

renderProjects();