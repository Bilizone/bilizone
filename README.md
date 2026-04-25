# Bilizone - Personal Video Portal

## Langkah Selanjutnya

Karena Node.js belum terinstal di komputer Anda, saya telah menyiapkan semua file kode untuk Anda. Anda bisa langsung mengunggah folder ini ke GitHub dan menghubungkannya ke Vercel!

### Langkah 1: Unggah ke GitHub (Tanpa Perlu Aplikasi Tambahan)
1. Buka [GitHub.com](https://github.com) dan login.
2. Klik tombol **"+"** di sudut kanan atas dan pilih **New repository**.
3. Beri nama: `bilizone`. Biarkan *Public* atau pilih *Private*, lalu klik **Create repository**.
4. Di halaman selanjutnya, klik tautan **"uploading an existing file"** (di bawah bagian Quick setup).
5. Tarik semua file dan folder di dalam folder `BILIZONE` di komputer Anda, lalu lepaskan (drag and drop) ke halaman GitHub tersebut.
6. Klik **Commit changes**.

### Langkah 2: Deploy ke Vercel
1. Buka [Vercel.com](https://vercel.com) dan login menggunakan akun GitHub Anda.
2. Klik **Add New...** > **Project**.
3. Di sebelah repository `bilizone` yang baru Anda buat, klik **Import**.
4. Biarkan semua pengaturan standar (Framework Preset akan otomatis menjadi Vite).
5. Klik **Deploy** dan tunggu sekitar 1-2 menit.
6. Selamat! Website Anda sudah online (misalnya `bilizone.vercel.app`).

### Langkah 3: Menghubungkan Supabase
Setelah website Anda online dan Anda sudah membuat proyek di Supabase:
1. Buka Dashboard Supabase Anda > **Project Settings** > **API**.
2. Salin **Project URL** dan **anon public key**.
3. Buka file `src/supabaseClient.js` di komputer Anda, lalu tempelkan (ganti teks `YOUR_PROJECT_ID` dan `YOUR_ANON_KEY`).
4. Unggah kembali perubahan tersebut ke GitHub (Vercel akan otomatis memperbarui website Anda).
