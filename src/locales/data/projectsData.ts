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
      screenshots: [
        "/images/projects/galam-sani/ss-login-page.webp",
        "/images/projects/galam-sani/ss-dashboard.webp",
        "/images/projects/galam-sani/ss-keranjang.webp",
        "/images/projects/galam-sani/ss-invoice.webp",
      ],
    },
    {
      id: "web-monitoring-oxygen",
      shortTitle: "Web App Monitoring Oxygen",
      title:
        "APLIKASI PERMINTAAN DAN PEMANTAUAN STOK TABUNG OKSIGEN DAN ACETYLENE PADA GUDANG PT. DUA SAMUDERA PERKASA POWER PLANT",
      category: "Full-Stack System",
      role: "Staf Warehouse & web Developer",
      metrics:
        "Mendigitalisasi workflow inventori berbasis spreadsheet menjadi sistem terpusat, meningkatkan akurasi pencatatan stok, mempercepat monitoring ketersediaan tabung, dan meningkatkan keterlacakan proses permintaan.",
      description:
        "Mengembangkan aplikasi manajemen gudang berbasis web untuk mendigitalisasi proses permintaan dan monitoring stok tabung oksigen dan asetilen yang sebelumnya dikelola secara manual menggunakan spreadsheet.",
      longDescription:
        "Membangun sistem manajemen gudang untuk mentransformasi proses pencatatan stok dan permintaan tabung oksigen serta asetilen dari workflow berbasis spreadsheet menjadi sistem digital yang terpusat dan terstruktur. Aplikasi menyediakan monitoring ketersediaan stok secara real-time, pencatatan dan pelacakan permintaan tabung, serta pelaporan inventori untuk membantu aktivitas operasional gudang. Sistem dirancang untuk meningkatkan akurasi pencatatan, mempermudah penelusuran pergerakan stok, mengurangi ketergantungan pada proses manual, dan memberikan visibilitas inventori yang lebih baik bagi pengelola gudang.",
      keyFeatures: [
        "Monitoring stok tabung oksigen dan asetilen secara real-time",
        "Manajemen permintaan dan distribusi tabung secara terstruktur",
        "Pelacakan status dan riwayat permintaan tabung",
        "Pencatatan pergerakan dan ketersediaan stok secara terpusat",
        "Pelaporan inventori untuk mendukung monitoring operasional gudang",
      ],
      techStack: ["PHP", "JavaScript", "HTML", "Bootstrap", "MySQL"],
      githubUrl: "https://github.com/HerlyRyan/pkl-oxygen-apps",
      liveUrl: "https://inventory-system-demo.vercel.app",
      coverImage: "/images/projects/oxygen-acetylene-monitoring/cover.webp",
      screenshots: [
        "/images/projects/oxygen-acetylene-monitoring/ss-login.webp",
        "/images/projects/oxygen-acetylene-monitoring/ss-dashboard.webp",
        "/images/projects/oxygen-acetylene-monitoring/ss-create.webp",
        "/images/projects/oxygen-acetylene-monitoring/ss-report.webp",
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
      screenshots: [
        "/images/projects/galam-sani/ss-login-page.webp",
        "/images/projects/galam-sani/ss-dashboard.webp",
        "/images/projects/galam-sani/ss-keranjang.webp",
        "/images/projects/galam-sani/ss-invoice.webp",
      ],
    },
    {
      id: "web-monitoring-oxygen",
      shortTitle: "Web App Monitoring Oxygen",
      title:
        "APPLICATION FOR REQUESTING AND MONITORING OXYGEN AND ACETYLENE CYLINDER STOCKS AT THE WAREHOUSE OF PT. DUA SAMUDERA PERKASA POWER PLANT",
      category: "Full-Stack System",
      role: "Staf Warehouse & web Developer",
      metrics:
        "Digitalized spreadsheet-based inventory workflows into a centralized system, improving stock record accuracy, accelerating inventory monitoring, and increasing request traceability.",
      description:
        "Developed a web-based warehouse management system to digitalize oxygen and acetylene cylinder requests and inventory monitoring, replacing manual spreadsheet-based workflows with a centralized system.",
      longDescription:
        "Developed a warehouse management system to digitize inventory and request handling processes for industrial gas cylinders. Replaced manual spreadsheet workflows with a structured system featuring real-time stock monitoring, request tracking, and reporting, resulting in improved operational efficiency, data accuracy, and system reliability.",
      keyFeatures: [
        "Real-time oxygen and acetylene cylinder stock monitoring",
        "Structured cylinder request and distribution management",
        "Request status and historical tracking",
        "Centralized inventory movement and availability records",
        "Inventory reporting for warehouse operational monitoring",
      ],
      techStack: ["PHP", "JavaScript", "HTML", "Bootstrap", "MySQL"],
      githubUrl: "https://github.com/HerlyRyan/pkl-oxygen-apps",
      liveUrl: "https://inventory-system-demo.vercel.app",
      coverImage: "/images/projects/oxygen-acetylene-monitoring/cover.webp",
      screenshots: [
        "/images/projects/oxygen-acetylene-monitoring/ss-login.webp",
        "/images/projects/oxygen-acetylene-monitoring/ss-dashboard.webp",
        "/images/projects/oxygen-acetylene-monitoring/ss-create.webp",
        "/images/projects/oxygen-acetylene-monitoring/ss-report.webp",
      ],
    },
  ],
};
