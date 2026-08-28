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
      id: "galam-sani-pos",
      title:
        "PERANCANGAN DAN PENGEMBANGAN APLIKASI POINT OF SALES BERBASIS WEB DI GALAM SANI",
      category: "Full-Stack System",
      role: "Full-Stack Developer",
      metrics:
        "Mengurangi ketergantungan pada pencatatan manual, meminimalkan human error dalam transaksi dan inventori, serta meningkatkan visibilitas data operasional melalui pelaporan terstruktur.",
      description:
        "Mengembangkan aplikasi Point of Sales (POS) berbasis web untuk mendigitalisasi proses penjualan, pengelolaan inventori, pencatatan keuangan, dan pemrosesan pesanan di Galam Sani.",
      longDescription:
        "Membangun sistem Point of Sales berbasis web untuk mentransformasi proses pencatatan dan penjualan manual menjadi sistem digital yang terstruktur. Aplikasi mencakup pengelolaan transaksi penjualan, monitoring stok, pencatatan keuangan, pemrosesan pesanan, serta pelaporan terstruktur untuk membantu operasional bisnis. Sistem dirancang untuk mengurangi human error dalam pencatatan, mempercepat proses transaksi, dan menyediakan data yang lebih terorganisir untuk mendukung monitoring serta pengambilan keputusan bisnis.",
      keyFeatures: [
        "Pencatatan dan pengelolaan transaksi penjualan secara digital",
        "Monitoring stok barang secara terpusat",
        "Pengelolaan dan pemrosesan pesanan pelanggan",
        "Pencatatan transaksi dan data keuangan secara terstruktur",
        "Pelaporan data penjualan dan operasional untuk mendukung analisis bisnis",
      ],
      techStack: [
        "PHP",
        "Laravel",
        "JavaScript",
        "Alpine.js",
        "HTML",
        "TailwindCSS",
        "Blade",
        "MySQL",
      ],
      githubUrl: "https://github.com/HerlyRyan/POS-Thesis-App",
      liveUrl: "https://inventory-system-demo.vercel.app",
      coverImage: "/images/projects/test.png",
      screenshots: ["/images/projects/galam-sani/ss-login-page.jpeg"],
    },
    {
      id: "travel-app",
      title: "Travel Schedule & Charter Platform",
      category: "Web Application",
      role: "Frontend Developer",
      metrics: "Meningkatkan efisiensi penjadwalan armada dan supir hingga 30%",
      description:
        "Platform manajemen jadwal perjalanan, penyewaan kendaraan, dan layanan carter wisata.",
      longDescription:
        "Solusi digital untuk manajemen operasional travel harian, mencakup penjadwalan armada kendaraan, pengelolaan data supir, rute perjalanan, serta pembuatan laporan data travel yang bersih dan terstruktur.",
      keyFeatures: [
        "Manajemen jadwal armada & rute travel secara terpusat",
        "Sistem pencatatan data supir dan ketersediaan unit kendaraan",
        "Tampilan antarmuka responsif berbasis Card & Grid modern",
        "Modul laporan data travel khusus tanpa tombol modifikasi (Read-Only)",
      ],
      techStack: ["React", "Vite", "Tailwind CSS", "TypeScript"],
      githubUrl: "https://github.com/USERNAME/travel-app",
      liveUrl: "https://travel-app-demo.vercel.app",
      coverImage:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      ],
    },
  ],
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
      id: "galam-sani-pos",
      title:
        "DESIGN AND DEVELOPMENT OF A POINT OF SALES WEB APPLICATION AT GALAM SANI",
      category: "Full-Stack System",
      role: "Full-Stack Developer",
      metrics:
        "Reduced reliance on manual record-keeping, minimized human error across sales and inventory processes, and improved operational data visibility through structured reporting.",
      description:
        "Developed a web-based Point of Sales (POS) application to digitalize sales transactions, inventory management, and operational record-keeping at Galam Sani.",
      longDescription:
        "Built a POS web application to transform manual bookkeeping and sales processes at Galam Sani into a fully digital system. Implemented features for sales tracking, inventory management, financial recording, and order processing, significantly reducing human error, accelerating transactions, and improving business insights through structured reporting.",
      keyFeatures: [
        "Digital sales transaction management",
        "Centralized inventory and stock monitoring",
        "Customer order management and processing",
        "Structured financial transaction record-keeping",
        "Sales and operational reporting for business analysis",
      ],
      techStack: [
        "PHP",
        "Laravel",
        "JavaScript",
        "Alpine.js",
        "HTML",
        "TailwindCSS",
        "Blade",
        "MySQL",
      ],
      githubUrl: "https://github.com/HerlyRyan/POS-Thesis-App",
      liveUrl: "https://inventory-system-demo.vercel.app",
      coverImage: "/images/projects/galam-sani/cover.webp",
      screenshots: ["/images/projects/galam-sani/ss-login-page.jpeg"],
    },
    {
      id: "travel-app",
      title: "Travel Schedule & Charter Platform",
      category: "Web Application",
      role: "Frontend Developer",
      metrics: "Increased fleet and driver scheduling efficiency by up to 30%",
      description:
        "Travel schedule management platform, vehicle rental, and tour charter services.",
      longDescription:
        "Digital solution for daily travel operational management, covering vehicle fleet scheduling, driver data management, travel routes, and clean, structured travel data reporting.",
      keyFeatures: [
        "Centralized fleet schedule & travel route management",
        "Driver data and vehicle unit availability tracking system",
        "Modern Card & Grid responsive user interface",
        "Read-only dedicated travel data reporting module",
      ],
      techStack: ["React", "Vite", "Tailwind CSS", "TypeScript"],
      githubUrl: "https://github.com/USERNAME/travel-app",
      liveUrl: "https://travel-app-demo.vercel.app",
      coverImage:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      ],
    },
  ],
};
