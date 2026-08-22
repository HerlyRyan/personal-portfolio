export interface Project {
  id: string;
  title: string;
  category: string;
  role?: string; // Peran spesifik (misal: Full-Stack Developer)
  metrics?: string; // Dampak/metrik bisnis (misal: Menghemat waktu rekap 40%)
  description: string;
  longDescription: string;
  keyFeatures?: string[]; // Daftar fitur utama untuk quick scanning recruiter
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string; // Tombol demo langsung
  coverImage?: string;
  screenshots?: string[];
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "inventory-system",
    title: "Enterprise Inventory Management System",
    category: "Full-Stack System",
    role: "Lead Full-Stack Developer",
    metrics: "Mengurangi waktu rekapitulasi stok manual hingga 45%",
    description: "Sistem manajemen stok bahan mentah, barang setengah jadi, dan produk jadi dengan pelacakan real-time.",
    longDescription: "Aplikasi web enterprise yang dirancang untuk mengelola rantai pasok internal perusahaan secara terpusat. Dilengkapi dengan kontrol akses berbasis peran (RBAC) untuk admin dan staf gudang, pencatatan audit log yang ketat, serta modul laporan otomatis.",
    keyFeatures: [
      "Pelacakan stok bahan mentah & produk jadi secara real-time",
      "Role-Based Access Control (RBAC) untuk Admin & Staff Gudang",
      "Sistem Audit Log otomatis untuk pelacakan perubahan data",
      "Modul ekspor laporan terstruktur"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    githubUrl: "https://github.com/USERNAME/inventory-system",
    liveUrl: "https://inventory-system-demo.vercel.app",
    coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "travel-app",
    title: "Travel Schedule & Charter Platform",
    category: "Web Application",
    role: "Frontend Developer",
    metrics: "Meningkatkan efisiensi penjadwalan armada dan supir hingga 30%",
    description: "Platform manajemen jadwal perjalanan, penyewaan kendaraan, dan layanan carter wisata.",
    longDescription: "Solusi digital untuk manajemen operasional travel harian, mencakup penjadwalan armada kendaraan, pengelolaan data supir, rute perjalanan, serta pembuatan laporan data travel yang bersih dan terstruktur.",
    keyFeatures: [
      "Manajemen jadwal armada & rute travel secara terpusat",
      "Sistem pencatatan data supir dan ketersediaan unit kendaraan",
      "Tampilan antarmuka responsif berbasis Card & Grid modern",
      "Modul laporan data travel khusus tanpa tombol modifikasi (Read-Only)"
    ],
    techStack: ["React", "Vite", "Tailwind CSS", "TypeScript"],
    githubUrl: "https://github.com/USERNAME/travel-app",
    liveUrl: "https://travel-app-demo.vercel.app",
    // screenshots dibiarkan kosong untuk menguji tampilan fallback preview
  },
];