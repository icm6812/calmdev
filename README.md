# CalmDev

CalmDev adalah landing page statis untuk komunitas programmer pemula di Indonesia. Website ini dibuat dengan HTML, CSS, dan JavaScript vanilla, lalu bisa dipasang ke GitHub dan di-deploy ke Vercel tanpa build tool.

## Jalankan lokal

1. Buka terminal di folder proyek.
2. Jalankan:

```bash
python3 -m http.server 8000
```

3. Buka browser dan masuk ke:

```text
http://localhost:8000
```

Catatan penting: `fetch()` untuk `data/content.json` tidak akan bekerja kalau file dibuka langsung lewat `file://`. Gunakan server lokal seperti di atas agar halaman bisa memuat data JSON dengan benar.

## Cara edit aturan dan FAQ

Semua copy yang tampil di halaman, termasuk aturan dan FAQ, diambil dari file `data/content.json`.

- Untuk mengubah aturan, edit bagian `rules`.
- Untuk mengubah FAQ, edit bagian `faq`.
- Untuk mengubah tagline atau catatan penting, edit bagian `tagline` dan `note`.

Contoh:

```json
"rules": [
  "Dilarang rasis dan diskriminasi.",
  "Dilarang konten sensitif (pornografi, pedofilia, dan sejenisnya)."
]
```

## Cara tambah atau hapus ikon marquee

Ikon marquee didefinisikan di `data/content.json` di bagian `marquee.languages` dan `marquee.tools`.

Contoh:

```json
"marquee": {
  "languages": [
    { "name": "HTML5", "icon": "devicon-html5-plain" }
  ]
}
```

- `name` = teks yang muncul sebagai label.
- `icon` = nama class Devicon yang sesuai.
- Jika ingin menambah ikon, tambahkan objek baru ke array.
- Jika ingin menghapus ikon, hapus objek dari array.

## Cara ganti logo

Logo CalmDev sudah ada di folder `assets/logo/` dan dipakai di navbar serta footer.

Jika ingin mengganti logo:

1. Simpan file baru dengan nama `calmdev-logo.png` di folder `assets/logo/`.
2. Pastikan ukuran dan rasio tetap bagus agar tampil rapi di navbar dan footer.
3. Jika nanti mau pakai versi SVG, ubah di `index.html` dan `favicon` ke path yang sesuai.

## Cara deploy ke GitHub dan Vercel

1. Inisialisasi repo lokal:

```bash
git init
git add .
git commit -m "Initial commit"
```

2. Hubungkan ke GitHub:

```bash
git branch -M main
git remote add origin https://github.com/NAMA_USER/NAMA_REPO.git
git push -u origin main
```

3. Buka Vercel.
4. Klik `Add New Project`.
5. Pilih repo GitHub yang baru saja di-push.
6. Pastikan konfigurasi berikut:
   - Framework Preset: `Other`
   - Build Command: kosong / jangan isi
   - Output Directory: kosong / jangan isi
7. Klik `Deploy`.
8. Setelah selesai, Vercel akan memberi link publik yang bisa dibagikan.

## Checklist akhir

- [ ] Halaman statis tanpa framework.
- [ ] Menggunakan HTML, CSS, dan JavaScript vanilla.
- [ ] Mengikuti bahasa utama Indonesia di halaman.
- [ ] Menggunakan logo CalmDev dari `assets/logo/calmdev-logo.png`.
- [ ] Tidak ada data sensitif atau kode backend.
- [ ] Sudah bisa diakses secara lokal lewat `python3 -m http.server`.
- [ ] Siap dipush ke GitHub dan di-deploy ke Vercel.
