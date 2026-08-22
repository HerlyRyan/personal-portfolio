export interface AboutPrinciple {
  title: string;
  description: string;
}

export interface AboutData {
  name: string;
  role: string;
  location: string;
  availability: string;
  avatarUrl?: string; // Slot foto diri Anda
  introduction: string;
  biography: string[];
  principles: AboutPrinciple[];
}

export const ABOUT_DATA: AboutData = {
  name: "Herly Riyanto Hidayat",
  role: "Backend & Mobile Developer",
  location: "Indonesia",
  availability: "Available for work",
  avatarUrl: "images/profile-bw-no-bg.webp", // Masukkan path/link foto Anda nanti (misal: "/profile.jpg")
  introduction: "Membangun sistem enterprise yang skalabel, efisien, dan berfokus pada ketepatan logika bisnis serta pengalaman pengguna.",
  biography: [
    "Saya adalah seorang Software Engineer yang berfokus pada pengembangan aplikasi web (Laravel) dan sistem seluler (Flutter). Memiliki ketertarikan mendalam pada penulisan kode yang bersih, terstruktur, serta mudah dirawat.",
    "Dalam setiap project, saya selalu mengutamakan performa aplikasi, manajemen database yang terstruktur, serta antarmuka yang intuitif dan responsif."
  ],
  principles: [
    {
      title: "Clean & Maintainable Code",
      description: "Menulis kode yang mudah dibaca, dipelihara, dan dikembangkan oleh tim di masa depan."
    },
    {
      title: "Performance First",
      description: "Memastikan aplikasi berjalan cepat, efisien, dan optimal di berbagai perangkat."
    },
    {
      title: "User-Centric Design",
      description: "Menghadirkan antarmuka yang bersih, fungsional, dan nyaman digunakan."
    }
  ]
};