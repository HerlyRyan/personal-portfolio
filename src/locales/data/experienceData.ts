export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  techStack: string[];
}

export interface ExperienceLocale {
  title: string;
  filterTag: string;
  resetFilter: string;
  experienceItems: ExperienceItem[];
}

export const experienceId: ExperienceLocale = {
  title: "Experience",
  filterTag: "// Filter by Technology",
  resetFilter: "Reset Filter ✕",
  experienceItems: [
    {
      id: "exp-1",
      role: "Software Engineer",
      company: "Tech Solutions & Enterprise Systems",
      period: "2024 — Present",
      location: "Indonesia",
      description: "Bertanggung jawab dalam merancang dan mengembangkan sistem aplikasi web skala enterprise, manajemen inventaris, serta optimasi performa backend.",
      highlights: [
        "Mengembangkan modul inventaris yang menangani pelacakan bahan mentah hingga produk jadi.",
        "Membangun sistem pelaporan penjualan dengan kontrol akses berbasis peran (RBAC).",
        "Mengimplementasikan arsitektur kode yang bersih dan terstandarisasi."
      ],
      techStack: ["React", "TypeScript", "Laravel", "Tailwind CSS", "MySQL"]
    },
    {
      id: "exp-2",
      role: "Frontend & Mobile Developer",
      company: "Digital Product Studio",
      period: "2022 — 2024",
      location: "Indonesia",
      description: "Membangun antarmuka pengguna yang responsif untuk berbagai platform web dan aplikasi seluler.",
      highlights: [
        "Merancang antarmuka berbasis komponen menggunakan pendekatan modern dan desain responsif.",
        "Mengintegrasikan RESTful API untuk manajemen data real-time.",
        "Mengoptimalkan performa rendering komponen untuk pengalaman pengguna yang mulus."
      ],
      techStack: ["React", "Flutter", "Dart", "Tailwind CSS", "JavaScript"]
    }
  ]
};

export const experienceEn: ExperienceLocale = {
  title: "Experience",
  filterTag: "// Filter by Technology",
  resetFilter: "Reset Filter ✕",
  experienceItems: [
    {
      id: "exp-1",
      role: "Software Engineer",
      company: "Tech Solutions & Enterprise Systems",
      period: "2024 — Present",
      location: "Indonesia",
      description: "Responsible for designing and developing enterprise-scale web applications, inventory management systems, and optimizing backend performance.",
      highlights: [
        "Developed an inventory module handling raw material to finished product tracking.",
        "Built a sales reporting system with Role-Based Access Control (RBAC).",
        "Implemented clean and standardized code architecture."
      ],
      techStack: ["React", "TypeScript", "Laravel", "Tailwind CSS", "MySQL"]
    },
    {
      id: "exp-2",
      role: "Frontend & Mobile Developer",
      company: "Digital Product Studio",
      period: "2022 — 2024",
      location: "Indonesia",
      description: "Built responsive user interfaces for various web platforms and mobile applications.",
      highlights: [
        "Designed component-based user interfaces using modern approaches and responsive design.",
        "Integrated RESTful APIs for real-time data management.",
        "Optimized component rendering performance for a smooth user experience."
      ],
      techStack: ["React", "Flutter", "Dart", "Tailwind CSS", "JavaScript"]
    }
  ]
};