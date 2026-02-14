// Deklarasi Elemen
const navbarNav = document.querySelector(".navbar-nav");
const menuBtn = document.querySelector("#menu");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar-nav a");

// --- 1. FITUR PER HERO (SINGLE SECTION VIEW) ---

function showSection(targetId) {
  // Sembunyikan semua section
  sections.forEach((sec) => {
    sec.style.display = "none";
    sec.classList.remove("active-section");
  });

  // Tampilkan section yang dituju
  const activeSec = document.getElementById(targetId);
  if (activeSec) {
    // Jika home, gunakan flex (sesuai layout hero), selain itu block
    activeSec.style.display = targetId === "home" ? "flex" : "block";
    activeSec.classList.add("active-section");
  }

  // Selalu scroll ke atas setiap pindah menu
  window.scrollTo(0, 0);
}

// Event Listener untuk Link Navigasi
navLinks.forEach((link) => {
  link.onclick = (e) => {
    const href = link.getAttribute("href");

    // Pastikan link diawali dengan #
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      showSection(targetId);

      // Tutup menu mobile otomatis
      navbarNav.classList.remove("active");
    }
  };
});

// --- 2. FITUR NAVBAR  ---

menuBtn.onclick = (e) => {
  navbarNav.classList.toggle("active");
  searchForm.classList.remove("active");
  e.preventDefault();
};

document.addEventListener("click", function (e) {
  if (!menuBtn.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

/* --- DATA KONTEN MODUL (PDF FOCUS) --- */
const moduleData = {
  1: {
    title: "Module 1: Basic Concepts & Numerical Aperture",
    label: "Basic Level",
    desc: "Modul ini berisi panduan praktikum untuk memahami prinsip dasar perambatan cahaya dan prosedur pengukuran Numerical Aperture (NA) pada serat optik.",
    topics: [
      "Teori Dasar: Hukum Snellius & Pemantulan Internal Sempurna",
      "Prosedur Pengukuran Acceptance Angle",
      "Metode Perhitungan Numerical Aperture (NA)",
      "Lembar Kerja Hasil Pengamatan",
    ],
    pdfLink: "pdf/module1-basic-concepts.pdf", // Ganti dengan path file PDF Anda
  },
  2: {
    title: "Module 2: OTDR & OPM Measurement Techniques",
    label: "Intermediate Level",
    desc: "Panduan teknis pengoperasian alat ukur Optical Time Domain Reflectometer (OTDR) dan Optical Power Meter (OPM) untuk analisis redaman jaringan.",
    topics: [
      "Setting Parameter OTDR (Jarak & Lebar Pulsa)",
      "Interpretasi Grafik Trace OTDR",
      "Metode Pengukuran Link Loss dengan OPM",
      "Standar Atenuasi Berdasarkan ITU-T",
    ],
    pdfLink: "pdf/module2-otdr-opm.pdf",
  },
  3: {
    title: "Module 3: Splicing & Fiber Termination",
    label: "Advanced Level",
    desc: "Modul instruksi kerja untuk melakukan penyambungan serat optik menggunakan Fusion Splicer dan manajemen kabel pada Optical Termination Box (OTB).",
    topics: [
      "Langkah-langkah Stripping & Cleaving Serat",
      "Optimasi Fusion Splicing (Core Alignment)",
      "Analisis Splice Loss & Troubleshooting",
      "Prosedur Keselamatan Kerja Laboratorium",
    ],
    pdfLink: "pdf/module3-splicing-guide.pdf",
  },
};

/* --- FUNGSI MODAL MODUL --- */

function viewModule(id) {
  const modal = document.getElementById("moduleModal");
  const container = document.getElementById("module-content");
  const data = moduleData[id];

  if (!data) return;

  // Generate list topik
  const topicList = data.topics
    .map(
      (t) => `
    <li style="margin-bottom: 10px; display: flex; align-items: start; gap: 10px;">
      <i data-feather="check-circle" style="width: 16px; color: var(--primary);"></i> 
      <span>${t}</span>
    </li>
  `,
    )
    .join("");

  container.innerHTML = `
    <div class="modal-header">
      <small style="color: var(--primary); font-weight: 700; text-transform: uppercase;">${data.label}</small>
      <h3 style="margin-top: 5px; color: var(--dark); font-size: 1.4rem;">${data.title}</h3>
    </div>
    
    <div style="margin: 20px 0; text-align: left;">
      <p style="color: #666; font-size: 0.95rem; line-height: 1.6; margin-bottom: 20px;">${data.desc}</p>
      
      <h4 style="color: var(--dark); margin-bottom: 12px; font-size: 1rem;">Daftar Isi Materi:</h4>
      <ul style="list-style: none; padding: 0; color: #555; font-size: 0.9rem;">
        ${topicList}
      </ul>
    </div>

    <div style="margin-top: 30px;">
      <a href="${data.pdfLink}" target="_blank" class="cta-calc" style="display: block; text-align: center; text-decoration: none;">
        <i data-feather="download" style="width: 16px; vertical-align: middle; margin-right: 8px;"></i>
        Download PDF Module
      </a>
    </div>
  `;

  modal.style.display = "block";
  document.body.style.overflow = "hidden";

  // Refresh feather icons agar muncul di dalam modal
  feather.replace();
}

function closeModule() {
  document.getElementById("moduleModal").style.display = "none";
  document.body.style.overflow = "auto";
}

// --- 3. FITUR FILTER ASISTEN ---

function filterSelection(c) {
  const cards = document.getElementsByClassName("asisten-card");
  const btns = document.getElementsByClassName("btn-filter");

  for (let card of cards) {
    card.style.display = "none";
    if (c === "all" || card.classList.contains(c)) {
      card.style.display = "block";
    }
  }

  for (let btn of btns) {
    btn.classList.remove("active");
    const clickAttr = btn.getAttribute("onclick");
    if (clickAttr && clickAttr.includes(`'${c}'`)) {
      btn.classList.add("active");
    }
  }
}

// --- 4. INISIALISASI SAAT HALAMAN DIBUKA ---

window.addEventListener("DOMContentLoaded", () => {
  // Tampilkan Home saja saat pertama kali buka
  showSection("home");

  // Jalankan filter asisten
  filterSelection("all");

  // Jalankan Feather Icons
  if (typeof feather !== "undefined") {
    feather.replace();
  }
});

// Fungsi untuk membuka dan menutup modal
function openCalc() {
  document.getElementById("calcModal").style.display = "block";
}

function closeCalc() {
  document.getElementById("calcModal").style.display = "none";
}

// Logika Matematika NA
function runCalculation() {
  const n1 = parseFloat(document.getElementById("n1").value);
  const n2 = parseFloat(document.getElementById("n2").value);
  const resultBox = document.getElementById("na-result");

  if (!n1 || !n2) {
    alert("Mohon isi kedua nilai indeks bias.");
    return;
  }

  if (n1 <= n2) {
    alert("Error: Indeks bias Core (n1) harus lebih besar dari Cladding (n2)!");
    return;
  }

  // Rumus $NA = \sqrt{n_1^2 - n_2^2}$
  const na = Math.sqrt(Math.pow(n1, 2) - Math.pow(n2, 2));

  // Rumus Sudut Penerimaan (dalam derajat)
  const angle = Math.asin(na) * (180 / Math.PI);

  resultBox.style.display = "block";
  resultBox.innerHTML = `
        <div style="font-size: 0.8rem; color: #666;">HASIL PERHITUNGAN:</div>
        <div style="font-size: 1.4rem; font-weight: 800; margin: 5px 0;">NA: ${na.toFixed(4)}</div>
        <div style="font-size: 1rem;">Acceptance Angle: <b>${angle.toFixed(2)}°</b></div>
    `;
}

// Menutup modal jika user klik di area gelap (overlay)
window.onclick = function (event) {
  const modal = document.getElementById("calcModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
