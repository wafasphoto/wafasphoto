WAFAS PHOTO — SUPER FINAL PRO
==============================
Tema: Dark Editorial x Photography x Modern Luxury
Brand: Wafas Photo
Photographer: Fikri Wafa
Location: Samarinda, Indonesia

RATING TARGET
-------------
Konsep/layout: 10/10
Animasi: 10/10 (smooth, subtle, tidak berlebihan)
Portfolio UX: 10/10
Mobile responsive: 10/10 target
Booking flow: 10/10 target

STRUKTUR
--------
WAFAS-PHOTO/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── projects.js
│   └── script.js
├── images/
│   ├── hero/
│   │   └── wafa.jpeg
│   ├── photographer/
│   │   └── fikri-wafa.jpg
│   └── projects/
│       ├── graduation-fikri/
│       ├── engagement-story/
│       ├── portrait-study/
│       ├── event-documentation/
│       └── featured/
├── google-apps-script.gs
├── SETUP-GOOGLE-SHEETS.txt
└── README.txt

CARA GANTI FOTO
---------------
1. Hero: images/hero/wafa.jpeg
2. Foto diri: images/photographer/fikri-wafa.jpg
3. Featured: images/projects/featured/01.jpg
4. Portfolio: images/projects/NAMA-PROJECT/
   - cover.jpg = foto cover kartu
   - 01.jpg, 02.jpg, dst = gallery

CARA TAMBAH PROJECT
-------------------
Edit js/projects.js.
Tidak perlu mengubah HTML/CSS.

Contoh:
{
  id:'prewedding-andi',
  category:'Engagement',
  title:'A Quiet Beginning',
  location:'Samarinda',
  year:'2026',
  cover:'images/projects/prewedding-andi/cover.jpg',
  photos:['01.jpg','02.jpg','03.jpg'].map(x=>'images/projects/prewedding-andi/'+x)
}

ANIMASI
-------
- Loader opening
- Hero zoom-in
- Grain texture
- Scroll reveal
- Hero parallax ringan
- Navbar berubah saat scroll
- Hover zoom project
- Hover lift/shadow project
- Smooth project modal
- Fullscreen viewer
- Keyboard arrows + ESC
- Reduced-motion support

BOOKING
-------
Form booking sudah disiapkan untuk:
Form -> Google Apps Script -> Google Sheets
Form -> WhatsApp

Konfigurasi utama ada di js/script.js:
- wafasWhatsApp
- GOOGLE_SCRIPT_URL
- GOOGLE_SHEET_API_KEY

PENTING
-------
Foto di paket ini adalah file placeholder untuk struktur folder. Ganti dengan foto asli kamu.
Target ukuran web yang disarankan: sekitar 300–600 KB/foto, JPG/WebP, sRGB.
Jangan memasukkan NIK, password, atau data sensitif ke form.
API key di frontend bukan secret sungguhan; hanya filter sederhana. Jangan gunakan untuk keamanan tingkat tinggi.
