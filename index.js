// ==========================================
// 1. FITUR MODE GELAP
// ==========================================
const tombolTema = document.querySelector("#btn-tema");

function toggletema(){
    document.body.classList.toggle("dark-mode");
}
tombolTema.addEventListener("click", toggletema);


// ==========================================
// 2. FITUR INFO TAMBAHAN
// ==========================================
const tombolInfo = document.querySelector("#btn-info");
const kotakAside = document.querySelector("aside");

tombolInfo.addEventListener("click", () =>{
    kotakAside.classList.toggle("tersembunyi");
});


// ==========================================
// 3. FITUR RENDER ARTIKEL AWAL (ARRAY)
// ==========================================
const daftarArtikel = [
    {
        judul: "Mengenal HTML Semantik", 
        tanggal: "2026", 
        isi: "HTML Semantik membantu membangun struktur halaman web yang lebih baik."
    },
    {
        judul: "Dasar CSS Responsif", 
        tanggal: "2026", 
        isi: "CSS responsif memastikan tampilan website menyesuaikan berbagai ukuran layar."
    },
    {
        judul: "Pengenalan JavaScript", 
        tanggal: "2026", 
        isi: "JavaScript memungkinkan halaman web menjadi interaktif."
    }
];

const containerArtikel = document.querySelector(".daftar-artikel");

daftarArtikel.forEach((data) => {
    const article = document.createElement("article"); 
    const judul = document.createElement("h3");
    const waktu = document.createElement("time"); 
    const isi = document.createElement("p");
    const tombolHapus = document.createElement("button");
    const tombolLike = document.createElement("button"); // MODUL 5: Tombol Like

    judul.textContent = data.judul;
    waktu.textContent = "Tahun: " + data.tanggal; 
    isi.textContent = data.isi; 
    tombolHapus.textContent = "Hapus";
    
    // Konfigurasi Tombol Like
    let jumlahLike = 0;
    tombolLike.textContent = `Like (${jumlahLike})`;
    tombolLike.dataset.like = 0; // Menyimpan data like di elemen
    tombolLike.style.marginRight = "10px";

    article.appendChild(judul);
    article.appendChild(waktu);
    article.appendChild(isi);
    article.appendChild(tombolLike);
    article.appendChild(tombolHapus);
    
    containerArtikel.appendChild(article);
});


// ==========================================
// 4. FITUR TAMBAH ARTIKEL BARU
// ==========================================
const btnTambah = document.querySelector("#btn-tambah");
const inputJudul = document.querySelector("#input-judul");
const inputTanggal = document.querySelector("#input-tanggal");
const inputIsi = document.querySelector("#input-isi");

btnTambah.addEventListener("click", () => {
    const judulValue = inputJudul.value;
    const tanggalValue = inputTanggal.value;
    const isiValue = inputIsi.value;

    if (judulValue === "" || tanggalValue === "" || isiValue === "") {
        alert("Semua kolom (Judul, Tahun, Isi) harus diisi!");
        return; 
    }

    const article = document.createElement("article"); 
    const judul = document.createElement("h3");
    const waktu = document.createElement("time"); 
    const isi = document.createElement("p");
    const tombolHapus = document.createElement("button");
    const tombolLike = document.createElement("button"); // MODUL 5: Tombol Like

    judul.textContent = judulValue;
    waktu.textContent = "Tahun: " + tanggalValue; 
    isi.textContent = isiValue; 
    tombolHapus.textContent = "Hapus";

    // Konfigurasi Tombol Like untuk artikel baru
    tombolLike.textContent = "Like (0)";
    tombolLike.dataset.like = 0;
    tombolLike.style.marginRight = "10px";

    article.appendChild(judul);
    article.appendChild(waktu);
    article.appendChild(isi);
    article.appendChild(tombolLike);
    article.appendChild(tombolHapus);
    
    containerArtikel.prepend(article); 

    inputJudul.value = "";
    inputTanggal.value = "";
    inputIsi.value = "";
});


// ==========================================
// 5. EVENT DELEGATION: HAPUS ARTIKEL & LIKE (MODUL 5)
// ==========================================
containerArtikel.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        
        // Mengecek apakah tombol yang diklik adalah Hapus atau Like
        if (e.target.textContent === "Hapus") {
            e.target.closest("article").remove();
        } 
        else if (e.target.textContent.startsWith("Like")) {
            let jumlah = parseInt(e.target.dataset.like || 0);
            jumlah++;
            e.target.dataset.like = jumlah;
            e.target.textContent = `Like (${jumlah})`;
        }
    }
});

// ==========================================
// 6. EFEK HOVER PADA ARTIKEL (MODUL 5)
// ==========================================
containerArtikel.addEventListener("mouseover", (e) => {
    const article = e.target.closest("article");
    if (article) article.classList.add("artikel-hover");
});

containerArtikel.addEventListener("mouseout", (e) => {
    const article = e.target.closest("article");
    if (article) article.classList.remove("artikel-hover");
});


// ==========================================
// 7. FORM KOMENTAR & PREVENT DEFAULT (MODUL 5)
// ==========================================
const formKomentar = document.querySelector("#form-komentar");
const daftarKomentar = document.querySelector("#daftar-komentar");
const pesanError = document.querySelector("#pesan-error");

formKomentar.addEventListener("submit", (e) => {
    e.preventDefault(); // Mencegah reload halaman

    const nama = document.querySelector("#input-nama").value.trim();
    const pesan = document.querySelector("#input-pesan").value.trim();

    // Tugas Mandiri: Validasi komentar minimal 5 karakter dengan pesan error di halaman
    if (pesan.length < 5) {
        pesanError.textContent = "Komentar terlalu pendek, minimal 5 karakter!";
        pesanError.style.display = "block";
        return;
    }
    
    // Jika lolos validasi, sembunyikan pesan error
    pesanError.style.display = "none";

    // Merender komentar ke DOM
    const itemKomentar = document.createElement("li");
    itemKomentar.textContent = `${nama}: ${pesan}`;

    // Tugas Mandiri: Tombol hapus masing-masing komentar
    const btnHapusKomen = document.createElement("button");
    btnHapusKomen.textContent = "Hapus";
    btnHapusKomen.style.marginLeft = "10px";
    btnHapusKomen.style.backgroundColor = "#dc3545";
    btnHapusKomen.style.padding = "5px 10px";
    
    itemKomentar.appendChild(btnHapusKomen);
    daftarKomentar.appendChild(itemKomentar);
    
    formKomentar.reset(); // Mengosongkan form
});

// Event Delegation untuk menghapus komentar individual (Tugas Mandiri)
daftarKomentar.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" && e.target.textContent === "Hapus") {
        e.target.closest("li").remove();
    }
});

// Tugas Mandiri: Tombol "Hapus Semua Komentar"
const btnHapusSemua = document.querySelector("#btn-hapus-semua");
btnHapusSemua.addEventListener("click", () => {
    daftarKomentar.innerHTML = "";
});


// ==========================================
// 8. KEYBOARD SHORTCUT DARK MODE (MODUL 5)
// ==========================================
document.addEventListener("keydown", (e) => {
    // Agar saat mengetik di form, mode gelap tidak ikut berubah-ubah
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return; 
    }

    if (e.key.toLowerCase() === "d") {
        document.body.classList.toggle("dark-mode");
    }
});