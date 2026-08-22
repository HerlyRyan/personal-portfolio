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

export const EXPERIENCE_DATA: ExperienceItem[] = [
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
];