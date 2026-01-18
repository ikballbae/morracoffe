<div align="center">

  <img src="assets/images/morrasecondary.png" alt="Morra Coffee Logo" width="120">

  # ☕ Morra Coffee Shop Website

  <p>
    Website Coffee Shop modern yang responsif, cepat, dan terintegrasi dengan Payment Gateway.
    <br>
    Dibangun dengan teknologi ringan tanpa build-tools yang rumit.
  </p>

  <p>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Alpine.js-8BC0D0?style=for-the-badge&logo=alpinedotjs&logoColor=white" alt="Alpine.js" />
    <img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP" />
    <img src="https://img.shields.io/badge/Midtrans-Payment-00519C?style=for-the-badge&logo=contactlesspayment&logoColor=white" alt="Midtrans" />
  </p>

  [Demo](#) • [Fitur](#fitur-unggulan) • [Instalasi](#panduan-instalasi) • [Konfigurasi](#konfigurasi-pembayaran)

</div>

---

## 📸 Tampilan (Screenshots)

| Halaman Utama | Menu & Keranjang |
|:---:|:---:|
| <img src="assets/images/background.png" alt="Hero Section" width="400"> | *Ganti dengan screenshot menu/cart anda* |

> *Ganti gambar di atas dengan screenshot asli website Anda agar lebih menarik!*

---

## ✨ Fitur Unggulan

* **⚡ Reactive UI:** Menggunakan **Alpine.js** untuk interaksi keranjang belanja yang cepat tanpa reload halaman.
* **🎨 Modern Design:** Styling menggunakan **Tailwind CSS** yang responsif (Mobile Friendly).
* **🛒 Smart Cart:**
    * Tambah/Kurang item dengan perhitungan otomatis.
    * Hapus item otomatis jika quantity 0.
    * Catatan khusus per item (misal: *less sugar*).
* **🔍 Search & Filter:** Pencarian menu realtime dan filter berdasarkan kategori (Kopi, Makanan, Dessert).
* **💳 Midtrans Payment:** Integrasi pembayaran otomatis (QRIS, GoPay, Transfer Bank) menggunakan Snap Popup.
* **🔒 Secure Backend:** Logika pembayaran ditangani di sisi server (PHP) untuk keamanan transaksi.

---

## 📂 Struktur Folder

```text
morra-coffee/
├── assets/
│   └── images/          # Aset gambar produk & logo
├── php/
│   ├── midtrans-php/    # Library Midtrans
│   ├── placeOrder.php   # Logika Backend Transaksi
│   └── config.php       # (Di-ignore git) Konfigurasi Server Key
├── src/
│   └── app.js           # Logika Frontend (Alpine.js)
├── index.html           # Halaman Utama
└── README.md            # Dokumentasi
