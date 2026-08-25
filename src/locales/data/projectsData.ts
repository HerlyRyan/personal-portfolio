export interface Project {
  id: string;
  title: string;
  category: string;
  role?: string;
  metrics?: string;
  description: string;
  longDescription: string;
  keyFeatures?: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  coverImage?: string;
  screenshots?: string[];
}

export interface ProjectsLocale {
  title: string;
  roleLabel: string;
  impactLabel: string;
  coverImageLabel: string;
  screenshotLabel: string;
  keyFeaturesLabel: string;
  techStackLabel: string;
  prevLabel: string;
  nextLabel: string;
  startLabel: string;
  endLabel: string;
  repoButton: string;
  projectsList: Project[];
}

export const projectsId: ProjectsLocale = {
  title: "Projects",
  roleLabel: "Role",
  impactLabel: "Impact",
  coverImageLabel: "// Cover Image",
  screenshotLabel: "// Screenshot",
  keyFeaturesLabel: "// Key Features",
  techStackLabel: "// Tech Stack Utilized",
  prevLabel: "Prev",
  nextLabel: "Next",
  startLabel: "Start",
  endLabel: "End",
  repoButton: "Repository Code ↗",
  projectsList: [
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
      coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      ]
    },
  ]
};

export const projectsEn: ProjectsLocale = {
  title: "Projects",
  roleLabel: "Role",
  impactLabel: "Impact",
  coverImageLabel: "// Cover Image",
  screenshotLabel: "// Screenshot",
  keyFeaturesLabel: "// Key Features",
  techStackLabel: "// Tech Stack Utilized",
  prevLabel: "Prev",
  nextLabel: "Next",
  startLabel: "Start",
  endLabel: "End",
  repoButton: "Repository Code ↗",
  projectsList: [
    {
      id: "inventory-system",
      title: "Enterprise Inventory Management System",
      category: "Full-Stack System",
      role: "Lead Full-Stack Developer",
      metrics: "Reduced manual stock recap time by up to 45%",
      description: "Raw material, semi-finished, and finished goods stock management system with real-time tracking.",
      longDescription: "Enterprise web application designed to centrally manage internal supply chains. Equipped with Role-Based Access Control (RBAC) for admins and warehouse staff, strict audit logging, and automated reporting modules.",
      keyFeatures: [
        "Real-time raw material & finished goods stock tracking",
        "Role-Based Access Control (RBAC) for Admin & Warehouse Staff",
        "Automated Audit Log system for data tracking",
        "Structured report export module"
      ],
      techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
      githubUrl: "https://github.com/USERNAME/inventory-system",
      liveUrl: "https://inventory-system-demo.vercel.app",
      coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: "travel-app",
      title: "Travel Schedule & Charter Platform",
      category: "Web Application",
      role: "Frontend Developer",
      metrics: "Increased fleet and driver scheduling efficiency by up to 30%",
      description: "Travel schedule management platform, vehicle rental, and tour charter services.",
      longDescription: "Digital solution for daily travel operational management, covering vehicle fleet scheduling, driver data management, travel routes, and clean, structured travel data reporting.",
      keyFeatures: [
        "Centralized fleet schedule & travel route management",
        "Driver data and vehicle unit availability tracking system",
        "Modern Card & Grid responsive user interface",
        "Read-only dedicated travel data reporting module"
      ],
      techStack: ["React", "Vite", "Tailwind CSS", "TypeScript"],
      githubUrl: "https://github.com/USERNAME/travel-app",
      liveUrl: "https://travel-app-demo.vercel.app",
      coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      ]
    },
  ]
};