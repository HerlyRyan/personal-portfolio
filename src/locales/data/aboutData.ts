export interface AboutContent {
  title: string;
  role: string;
  location: string;
  availability: string;
  introduction: string;
  backgroundTitle: string;
  biography: string[];
  principles: Array<{
    title: string;
    description: string;
  }>;
}

export const aboutId: AboutContent = {
  title: "Tentang Saya",
  role: "Backend & Mobile Developer",
  location: "Indonesia",
  availability: "Terbuka untuk Kolaborasi / Kerja",
  introduction: "Membangun sistem enterprise yang skalabel, efisien, dan berfokus pada ketepatan logika bisnis serta pengalaman pengguna.",
  backgroundTitle: "Latar Belakang",
  biography: [
    "Saya adalah seorang Software Engineer yang berfokus pada pengembangan aplikasi web berskala enterprise menggunakan Laravel (PHP) serta aplikasi mobile lintas platform dengan Flutter (Dart). Memiliki ketertarikan mendalam pada penulisan kode yang bersih, terstruktur, serta arsitektur yang mudah dirawat.",
    "Dalam setiap project, saya selalu mengutamakan performa backend yang optimal, manajemen database yang aman, serta antarmuka yang intuitif dan responsif bagi pengguna."
  ],
  principles: [
    {
      title: "Clean & Maintainable Code",
      description: "Menulis kode yang terstruktur, mudah dibaca, dan dikembangkan jangka panjang oleh tim."
    },
    {
      title: "Performance & Scalability",
      description: "Memastikan sistem dan aplikasi berjalan cepat, efisien, serta siap menghadapi pertumbuhan data."
    },
    {
      title: "User-Centric Design",
      description: "Menghadirkan antarmuka bersih dan fungsional yang memberikan pengalaman interaksi terbaik."
    }
  ]
};

export const aboutEn = {
  title: "About Me",
  role: "Backend & Mobile Developer",
  location: "Indonesia",
  availability: "Available for Work",
  introduction: "Building scalable, efficient enterprise systems focused on robust business logic and seamless user experience.",
  backgroundTitle: "Background Story",
  biography: [
    "I am a Software Engineer specializing in enterprise web development with Laravel (PHP) and cross-platform mobile applications using Flutter (Dart). I have a deep passion for writing clean, structured code and maintainable software architecture.",
    "In every project, I prioritize optimized backend performance, secure database management, and building intuitive, responsive interfaces for users."
  ],
  principles: [
    {
      title: "Clean & Maintainable Code",
      description: "Writing structured, readable code that is easy for teams to maintain and scale over time."
    },
    {
      title: "Performance & Scalability",
      description: "Ensuring systems and apps run fast, efficiently, and are ready for data growth."
    },
    {
      title: "User-Centric Design",
      description: "Delivering clean, functional interfaces that provide the best possible interaction experience."
    }
  ]
};