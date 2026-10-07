/* =========================================================
   WAFAS PHOTO — DATA PORTFOLIO

   File ini digunakan untuk mengatur project/foto portfolio.

   Untuk menambah project:
   1. Buat folder di images/projects/
   2. Masukkan cover.jpg dan foto gallery
   3. Tambahkan object project di bawah

   Struktur folder:
   images/projects/nama-project/
   ├── cover.jpg
   ├── 01.jpg
   ├── 02.jpg
   └── dst.

   Kamu tidak perlu mengubah HTML atau CSS.
   ========================================================= */


const projects = [
        {
        id: 'event-documentation',
        category: 'Event',
        title: 'Tita with Our Hands',
        location: 'Samarinda',
        year: '2026',

        // Cover project
        cover: 'images/projects/event-documentation/cover.jpg',

        // Gallery project
        photos: [
            '1.jpg',
            '2.jpg',
            '3.jpg',
            '4.jpg',
            '5.jpg',
            '6.jpg',
            '7.jpg',
            '8.jpg',
            '9.jpg',
            '10.jpg',
            '11.jpg'
        ].map(x => 'images/projects/event-documentation/' + x)
    },

        {
        id: 'portrait-miko', // ID unik project
        category: 'Portrait', // Kategori untuk filter
        title: 'Portrait of Mikolas', // Judul yang tampil
        location: 'Samarinda', // Lokasi pemotretan
        year: '2026', // Tahun project

        // Foto cover yang tampil di halaman portfolio
        cover: 'images/projects/portrait-miko/cover.jpg',

        // Foto yang tampil ketika project dibuka
        photos: [
            '1.jpg',
            '2.jpg',
            '3.jpg',
            '4.jpg',
            '5.jpg',
        ].map(x => 'images/projects/portrait-miko/' + x)
    },

    {
        id: 'event-documentation',
        category: 'Event',
        title: 'Bride to be',
        location: 'Samarinda',
        year: '2026',

        // Cover project
        cover: 'images/projects/bried-party/cover.jpg',

        // Gallery project
        photos: [
            '1.jpg',
            '2.jpg',
            '3.jpg',
            '4.jpg',
            '5.jpg',
            '6.jpg',
            '7.jpg',
            '8.jpg',
            '9.jpg',
            '10.jpg',
            '11.jpg'
        ].map(x => 'images/projects/bried-party/' + x)
    },

    {
        id: 'portrait-raisya',
        category: 'Portrait',
        title: 'Portrait of Raisya',
        location: 'Samarinda',
        year: '2026',

        // Cover project
        cover: 'images/projects/portrait-raisya/cover.jpg',

        // Gallery project
        photos: [
            '1.jpg',
            '2.jpg',
            '3.jpg',
            '4.jpg',
            '6.jpg',
            '7.jpg'
        ].map(x => 'images/projects/portrait-raisya/' + x)
    },

        {
        id: 'portrait-akmal', // ID unik project
        category: 'Portrait', // Kategori untuk filter
        title: 'Portrait of Masyarbiya', // Judul yang tampil
        location: 'Samarinda', // Lokasi pemotretan
        year: '2026', // Tahun project

        // Foto cover yang tampil di halaman portfolio
        cover: 'images/projects/portrait-akmal/cover.jpg',

        // Foto yang tampil ketika project dibuka
        photos: [
            '1.jpg',
            '2.jpg',
            '3.jpg',
            '4.jpg',
            '5.jpg',
        ].map(x => 'images/projects/portrait-akmal/' + x)
    },


    {
        id: 'couple-session',
        category: 'Couple',
        title: 'Couple Session',
        location: 'Samarinda',
        year: '2026',

        // Cover project
        cover: 'images/projects/couple/cover.jpg',

        // Gallery project
        photos: [
            '1.jpg',
            '2.jpg',
            '3.jpg',
            '4.jpg',
            '5.jpg',
            '6.jpg'
        ].map(x => 'images/projects/couple/' + x)
    },

];