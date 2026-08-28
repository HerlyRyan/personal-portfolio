export interface Project {
  id: string;
  shortTitle: string;
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
  navigatorLable: string;
  navigatorHint: string;
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
  navigatorLable: "Navigasi Project",
  navigatorHint: "Pilih project yang ingin ditinjau",
  projectsList: [
    {
      id: "galam-sani-pos",
      shortTitle: "POS System Galam Sani",
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
  navigatorLable: "Project Navigator",
  navigatorHint: "Quickly select a project to review",
  projectsList: [
    {
      id: "galam-sani-pos",
      shortTitle: "POS System Galam Sani",
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
  ],
};
