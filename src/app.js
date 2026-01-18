document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    // --- FITUR PENCARIAN & FILTER ---
    filter: "all",
    searchQuery: "",
    searchOpen: false,
    showAll: false,

    // --- DATA PRODUK ---
    items: [
      {
        id: 1,
        name: "Espresso",
        tipe: "minuman",
        img: "1.jpg",
        price: 18000,
        description:
          "Kopi hitam pekat dengan crema tebal. Rasa kuat dan intens.",
      },
      {
        id: 2,
        name: "Cappuccino",
        tipe: "minuman",
        img: "2.jpg",
        price: 25000,
        description: "Espresso dengan susu steamed dan foam creamy.",
      },
      {
        id: 3,
        name: "Caramel Macchiato",
        tipe: "minuman",
        img: "3.jpg",
        price: 28000,
        description: "Espresso dengan vanilla dan caramel sauce.",
      },
      {
        id: 4,
        name: "Matcha Latte",
        tipe: "minuman",
        img: "4.jpg",
        price: 32000,
        description: "Teh matcha premium dari Jepang dengan susu.",
      },
      {
        id: 5,
        name: "Fried Rice",
        tipe: "makanan",
        img: "5.jpg",
        price: 35000,
        description: "Nasi goreng istimewa dengan telur dan sayuran.",
      },
      {
        id: 6,
        name: "Burger",
        tipe: "makanan",
        img: "6.jpg",
        price: 38000,
        description: "Burger premium dengan daging sapi pilihan.",
      },
      {
        id: 7,
        name: "Mix Platter",
        tipe: "makanan",
        img: "7.jpg",
        price: 42000,
        description: "Assorted menu makanan: fried chicken, tempura, dll.",
      },
      {
        id: 8,
        name: "Sushi",
        tipe: "makanan",
        img: "8.jpg",
        price: 45000,
        description: "Sushi segar dengan nasi vinegar dan salmon.",
      },
      {
        id: 9,
        name: "Pudding",
        tipe: "dessert",
        img: "9.jpg",
        price: 20000,
        description: "Pudding halus dengan tekstur lembut.",
      },
      {
        id: 10,
        name: "Croissant",
        tipe: "dessert",
        img: "10.jpg",
        price: 22000,
        description: "Croissant butter yang renyah.",
      },
      {
        id: 11,
        name: "Ice Cream",
        tipe: "dessert",
        img: "11.jpg",
        price: 24000,
        description: "Es krim premium dengan berbagai pilihan rasa.",
      },
      {
        id: 12,
        name: "Pie",
        tipe: "dessert",
        img: "12.jpg",
        price: 28000,
        description: "Pie buatan tangan dengan filling apple.",
      },
      {
        id: 13,
        name: "Waffle Chocolate",
        tipe: "dessert",
        img: "13.jpg",
        price: 32000,
        description: "Waffle crispy dengan cokelat dark premium.",
      },
      {
        id: 14,
        name: "Chocolate Cake",
        tipe: "dessert",
        img: "14.jpg",
        price: 35000,
        description: "Kue cokelat berlapis ganache cokelat.",
      },
    ],

    isInCart(id) {
      return Alpine.store("cart").items.some((item) => item.id === id);
    },

    searchResults() {
      let result = this.items;
      if (this.filter !== "all") {
        result = this.items.filter((item) => item.tipe === this.filter);
      }
      if (this.searchQuery.trim()) {
        const lowerQuery = this.searchQuery.toLowerCase();
        result = result.filter((item) =>
          item.name.toLowerCase().includes(lowerQuery),
        );
      }
      return result;
    },

    displayedItems() {
      const data = this.searchResults();
      if (!this.showAll) {
        return data.slice(0, 6);
      }
      return data;
    },

    openSearch() {
      this.searchOpen = true;
      this.$nextTick(() => {
        const input = document.getElementById("search-input");
        if (input) input.focus();
      });
    },
    closeSearch() {
      this.searchOpen = false;
      this.searchQuery = "";
    },
  }));

  Alpine.store("cart", {
    items: [],
    customer: {
      name: "",
      phone: "",
      email: "",
    },
    cartOpen: false,
    animateBadge: false,

    get total() {
      return this.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },

    get quantity() {
      return this.items.reduce((qty, item) => qty + item.quantity, 0);
    },

    add(newItem) {
      const existingItem = this.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ ...newItem, quantity: 1, note: "" });
      }
      this.animateBadge = false;
      setTimeout(() => (this.animateBadge = true), 100);
    },

    remove(index) {
      this.items.splice(index, 1);
    },

    // --- FUNGSI CHECKOUT (INTEGRASI MIDTRANS) ---
    async checkout() {
      // 1. Siapkan data pesanan
      const formValues = {
        customer: this.customer,
        items: this.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity,
          note: item.note,
        })),
        grandTotal: this.total,
      };

      console.log("Mengirim data ke PHP:", formValues);

      // 2. Minta Transaction Token ke Backend (PHP)
      try {
        const response = await fetch("php/placeOrder.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });

        const token = await response.text();
        console.log("Token diterima:", token);

        // 3. Trigger Snap Popup (Midtrans)
        if (window.snap) {
          window.snap.pay(token, {
            // --- JIKA PEMBAYARAN SUKSES ---
            onSuccess: function (result) {
              alert("Pembayaran Berhasil!");
              console.log(result);
              // Redirect ke halaman utama (index.html)
              window.location.href = "index.html";
            },
            // --- JIKA PENDING (Misal: pilih transfer bank tapi belum bayar) ---
            onPending: function (result) {
              alert("Menunggu pembayaran Anda! Silakan selesaikan pembayaran.");
              console.log(result);
              // Opsional: Redirect juga atau biarkan di halaman
              // window.location.href = "index.html";
            },
            // --- JIKA ERROR ---
            onError: function (result) {
              alert("Pembayaran gagal!");
              console.log(result);
            },
            // --- JIKA POPUP DITUTUP (CLOSE) ---
            onClose: function () {
              alert(
                "Anda menutup popup pembayaran tanpa menyelesaikan transaksi.",
              );
            },
          });
        } else {
          alert("Sistem pembayaran belum siap (Snap JS belum dimuat).");
        }
      } catch (err) {
        console.error("Error saat checkout:", err);
        alert("Gagal memproses pembayaran. Cek koneksi atau coba lagi.");
      }
    },
  });
});

// --- HELPER FUNCTIONS ---
const formatMessage = (obj) => {
  const itemsList = obj.items
    .map((item) => {
      return `- ${item.name} (x${item.quantity}) = ${rupiah(item.total)}${item.note ? `\n  _Catatan: ${item.note}_` : ""}`;
    })
    .join("\n");

  return `*DATA CUSTOMER*
Nama: ${obj.customer.name}
No. HP: ${obj.customer.phone}
Email: ${obj.customer.email}

*DATA PESANAN*
${itemsList}

*TOTAL BAYAR: ${rupiah(obj.grandTotal)}*

Terima kasih atas pesanan Anda!`;
};

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
