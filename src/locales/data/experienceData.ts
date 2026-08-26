export type ExperienceType =
  | "full-time"
  | "internship"
  | "bootcamp"
  | "part-time"
  | "freelance";

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: ExperienceType; // <-- Penanda jenis pengalaman
  description: string;
  highlights: string[];
  techStack: string[];
}

export interface ExperienceLocale {
  title: string;
  filterTag: string;
  filterTypeTag: string; // <-- Label filter kategori
  resetFilter: string;
  resetTypeFilter: string;
  typeLabels: Record<ExperienceType, string>;
  experienceItems: ExperienceItem[];
}

export const experienceId: ExperienceLocale = {
  title: "Experience",
  filterTag: "// Filter by Technology",
  filterTypeTag: "// Filter by Category",
  resetFilter: "Reset Filter ✕",
  resetTypeFilter: "Reset Kategori ✕",
  typeLabels: {
    "full-time": "Full-time",
    internship: "Internship",
    bootcamp: "Bootcamp & Course",
    "part-time": "Part-time",
    freelance: "Freelance",
  },
  experienceItems: [
    {
      id: "exp-1",
      role: "Admin",
      company: "PT Sinar Kencana Inti Perkasa",
      period: "Jan - Mar 2020",
      location: "Kotabaru, Indonesia",
      type: "internship",
      description:
        "Bertanggung jawab dalam pengelolaan dan validasi data operasional produksi serta tenaga kerja, termasuk monitoring kehadiran karyawan dan penyusunan laporan menggunakan Excel. Berkolaborasi dengan berbagai divisi untuk memastikan kebutuhan data dan pelaporan terpenuhi secara akurat, konsisten, dan tepat waktu.",
      highlights: [
        "Mengelola dan memvalidasi 100+ data operasional produksi dan tenaga kerja setiap hari untuk memastikan akurasi dan kelengkapan data.",
        "Menyusun 5 laporan rutin dan terpersonalisasi menggunakan Excel sesuai kebutuhan masing-masing divisi untuk mendukung proses monitoring dan pengambilan keputusan.",
        "Memantau data kehadiran karyawan serta menjaga konsistensi data operasional untuk mendukung pelaporan kinerja harian dan bulanan.",
      ],
      techStack: ["Excel", "Word", "SAP"],
    },
    {
      id: "exp-2",
      role: "Cloud Computing Cohort",
      company: "Bangkit led by Google, Goto, and Traveloka",
      period: "Aug 2023 — Feb 2024",
      location: "Remote, Indonesia",
      type: "bootcamp",
      description:
        "Mengikuti program Bangkit Academy pada jalur Cloud Computing dengan berperan sebagai Back-end Developer dan Cloud Engineer. Berfokus pada pengembangan layanan back-end, integrasi dengan infrastruktur cloud, deployment aplikasi, serta penerapan testing dan optimasi untuk membangun aplikasi yang reliable dan siap berjalan di lingkungan cloud.",
      highlights: [
        "Berperan sebagai Back-end Developer dan Cloud Engineer dalam mengembangkan aplikasi back-end serta mengelola kebutuhan infrastruktur cloud.",
        "Mengembangkan dan mengintegrasikan layanan back-end dengan cloud infrastructure, termasuk konfigurasi deployment dan environment aplikasi.",
        "Melakukan integration testing dan performance optimization untuk meningkatkan reliability, keamanan, dan kesiapan aplikasi dalam lingkungan cloud.",
      ],
      techStack: [
        "JavaScript",
        "Node.js",
        "Express.js",
        "MySQL",
        "Google Cloud",
      ],
    },
    {
      id: "exp-3",
      role: "Student Back End Engineering",
      company: "Ruangguru",
      period: "Feb - Jun 2024",
      location: "Remote, Indonesia",
      type: "bootcamp",
      description:
        "Mengikuti program Backend Engineer dengan Golang yang berfokus pada pengembangan kemampuan software engineering dan backend development secara end-to-end. Mempelajari fundamental hingga konsep lanjutan Golang, RESTful API, testing, concurrency, design patterns, Clean Architecture, authentication & authorization, database SQL/NoSQL, serta deployment aplikasi backend. Program juga mencakup pengenalan implementasi model AI/ML menggunakan Golang.",
      highlights: [
        "Membangun fondasi software engineering dan problem-solving, mencakup Git, terminal, networking dasar, algoritma, komunikasi teknis, dan dasar project management.",
        "Mengembangkan kemampuan backend engineering menggunakan Golang, mencakup RESTful API, error handling, unit testing, concurrency, data structures, dan design patterns.",
        "Membangun aplikasi backend dengan pendekatan Clean Architecture, authentication & authorization, database SQL/NoSQL, deployment, serta implementasi dasar model AI/ML menggunakan Golang.",
      ],
      techStack: ["Golang", "Gin", "PostgresSQL", "RESTful API"],
    },
    {
      id: "exp-4",
      role: "Full-stack Developer",
      company: "PT.Winnicode Garuda Indonesia",
      period: "Aug - Nov 2024",
      location: "Remote, Indonesia",
      type: "internship",
      description:
        "Berperan sebagai Full-stack Developer Intern dalam pengembangan sistem rekrutmen berbasis web menggunakan Laravel. Bertanggung jawab pada pengembangan fitur untuk kandidat dan admin, pengelolaan data melalui dashboard, serta penerapan validasi dan keamanan dalam proses upload dokumen. Pengalaman ini memberikan exposure terhadap pengembangan aplikasi web dari sisi user experience, business workflow, hingga data management.",
      highlights: [
        "Mengembangkan sistem rekrutmen berbasis web menggunakan Laravel yang memungkinkan kandidat mengirim lamaran, mengunggah resume, dan mengelola profil melalui antarmuka yang mudah digunakan.",
        "Merancang dan mengimplementasikan admin management dashboard untuk menyederhanakan pengelolaan data dan meningkatkan efisiensi proses operasional hingga sekitar 50%.",
        "Mengimplementasikan secure file upload dan validation untuk melindungi serta memastikan validitas dokumen kandidat yang diunggah ke sistem.",
      ],
      techStack: ["PHP", "Laravel", "MySQL", "HTML", "CSS", "JavaScript"],
    },
    {
      id: "exp-5",
      role: "Staff Warehouse & Web Developer",
      company: "PT Dua Samudera Perkasa",
      period: "Sep - Nov 2024",
      location: "Tanah Bumbu, Indonesia",
      type: "internship",
      description:
        "Berperan sebagai Staff Warehouse sekaligus Web Developer Intern dengan mengembangkan sistem manajemen inventaris untuk mendukung digitalisasi proses operasional warehouse. Mengubah alur kerja inventaris yang sebelumnya dilakukan secara manual menjadi proses berbasis sistem, mencakup tracking tabung oksigen, pengelolaan data inventaris, reporting, dan monitoring operasional.",
      highlights: [
        "Merancang dan mengembangkan sistem manajemen inventaris berbasis web yang responsif untuk mendukung tracking dan monitoring tabung oksigen.",
        "Mengembangkan backend dan pengelolaan data inventaris, mencakup proses penyimpanan, pengambilan, CRUD, serta fitur reporting untuk mendukung kebutuhan operasional warehouse.",
        "Mendigitalisasi alur kerja inventaris manual menjadi proses sistem yang lebih terstruktur, sehingga meningkatkan efisiensi monitoring hingga 80%.",
      ],
      techStack: ["PHP", "MySQL", "HTML", "Bootstrap", "JavaScript"],
    },
    {
      id: "exp-6",
      role: "Artificial Intelligence Engineer Cohort",
      company: "Laskar AI",
      period: "Feb - Aug 2025",
      location: "Remote, Indonesia",
      type: "bootcamp",
      description:
        "Mengikuti program Laskar AI sebagai AI Engineer Cohort dengan fokus pada fundamental programming, data analysis, dan machine learning menggunakan Python. Menerapkan proses end-to-end dalam pengembangan solusi machine learning, mulai dari pengolahan data, eksplorasi dan visualisasi, pembangunan serta evaluasi model, hingga implementasi berdasarkan studi kasus industri. Program juga mencakup collaborative development menggunakan Git/GitHub dan pengembangan capstone project sebagai portfolio.",
      highlights: [
        "Membangun fondasi programming dan computational thinking menggunakan HTML, CSS, dan JavaScript, serta menerapkan Git dan GitHub untuk version control dan kolaborasi tim.",
        "Mengembangkan kemampuan data analysis dan machine learning menggunakan Python, mencakup data processing, visualization, serta pembangunan model classification, regression, dan clustering.",
        "Mengerjakan end-to-end machine learning projects, mulai dari perancangan solusi, pengolahan data, training dan evaluasi model, hingga implementasi berdasarkan studi kasus industri.",
      ],
      techStack: ["HTML", "CSS", "JavaScript", "Python", "Google Colab"],
    },
    {
      id: "exp-7",
      role: "Facilitator - Full Stack Web Developer",
      company: "Coding Camp powered by DBS Foundation",
      period: "Feb - Aug 2026",
      location: "Remote, Indonesia",
      type: "part-time",
      description:
        "Berperan sebagai Facilitator Full Stack Web Developer dengan tanggung jawab mendampingi dan mengelola sekitar 25 student selama program pembelajaran. Selain memberikan dukungan teknis, bertanggung jawab dalam monitoring progres, kehadiran, konsultasi, serta membantu menyelesaikan berbagai kendala manajemen dan pembelajaran student. Dari sisi teknis, memperdalam praktik backend development menggunakan Express.js melalui pengembangan Forum API serta mempelajari penerapan Redis, RabbitMQ, dan Docker dalam arsitektur aplikasi.",
      highlights: [
        "Mengelola dan mendampingi ±25 student selama program Full Stack Web Developer, termasuk monitoring progres, kehadiran, konsultasi mingguan, serta menangani berbagai kendala dalam manajemen dan pembelajaran student.",
        "Memperkuat kemampuan Full Stack & Backend Engineering melalui pengembangan Forum API menggunakan Express.js serta penerapan Redis, RabbitMQ, dan Docker dalam membangun dan menjalankan aplikasi.",
        "Berkontribusi pada keberhasilan program dengan graduation rate 76%, rata-rata kehadiran weekly consultation 80,2%, serta memperoleh rata-rata rating 4,64/5 pada biweekly feedback dan 4,79/5 pada ILT feedback.",
      ],
      techStack: [
        "HTML",
        "CSS",
        "TailwindCSS",
        "JavaScript",
        "React",
        "Express.js",
        "PostgresSQL",
        "Redis",
        "RabbitMQ",
        "Docker",
      ],
    },
    {
      id: "exp-8",
      role: "Freelance Web Developer",
      company: "Clarvea",
      period: "Aug 2024 - Now",
      location: "Remote, Indonesia",
      type: "freelance",
      description:
        "Bekerja sebagai Freelance Web Developer dengan menangani pengembangan dan implementasi aplikasi web untuk ±10 client dengan kebutuhan bisnis dan fitur yang beragam. Bertanggung jawab dalam memahami requirement, merancang solusi, mengembangkan fitur backend dan frontend, serta mengintegrasikan layanan pihak ketiga seperti payment gateway dan WhatsApp. Pengalaman ini mencakup penerapan authentication, Role-Based Access Control (RBAC), dan pengembangan solusi yang disesuaikan dengan kebutuhan operasional masing-masing client.",
      highlights: [
        "Menangani pengembangan aplikasi web untuk ±10 client dengan kebutuhan dan karakteristik fitur yang beragam, mulai dari requirement analysis hingga implementasi.",
        "Mengembangkan dan mengintegrasikan berbagai fitur backend dan third-party services, termasuk payment gateway, integrasi WhatsApp melalui Fonnte, serta authentication dan Role-Based Access Control (RBAC).",
        "Menerjemahkan kebutuhan bisnis client menjadi solusi web yang praktis dan terukur, dengan fokus pada reliability, keamanan, kemudahan penggunaan, dan kebutuhan operasional pengguna.",
      ],
      techStack: [
        "HTML",
        "CSS",
        "TailwindCSS",
        "Bootstrap",
        "JavaScript",
        "PHP",
        "Laravel",
        "Flutter",
        "MySQL",
        "Firebase",
      ],
    },
    {
      id: "exp-9",
      role: "Information Technology Specialist",
      company: "RS. Marina Permata Batulicin",
      period: "Jun 2026 - Now",
      location: "Tanah Bumbu, Indonesia",
      type: "full-time",
      description:
        "Berperan sebagai Information Technology Specialist yang bertanggung jawab mendukung kebutuhan operasional IT rumah sakit, mulai dari troubleshooting perangkat dan jaringan hingga instalasi serta maintenance infrastruktur IT. Menangani jaringan komputer, perangkat komputer dan printer, CCTV, serta sistem telepon. Selain mendukung infrastruktur, turut mengembangkan aplikasi internal untuk memenuhi kebutuhan operasional dan digitalisasi proses di lingkungan rumah sakit.",
      highlights: [
        "Menangani IT troubleshooting dan technical support untuk jaringan, komputer, printer, serta perangkat IT guna memastikan operasional rumah sakit berjalan dengan baik.",
        "Melakukan instalasi dan maintenance infrastruktur IT, mencakup jaringan komputer, CCTV, sistem telepon, perangkat komputer, dan konektivitas antar perangkat.",
        "Mengembangkan dan menyiapkan aplikasi internal sesuai kebutuhan operasional rumah sakit, dengan menerjemahkan kebutuhan pengguna menjadi solusi berbasis teknologi.",
      ],
      techStack: [
        "Remote Apps",
        "Virtual Machine",
        "Ubuntu",
        "Linux",
        "Podman",
        "PHP",
        "Laravel",
        "MySQL",
      ],
    },
  ],
};

export const experienceEn: ExperienceLocale = {
  title: "Experience",
  filterTag: "// Filter by Technology",
  filterTypeTag: "// Filter by Category",
  resetFilter: "Reset Filter ✕",
  resetTypeFilter: "Reset Category ✕",
  typeLabels: {
    "full-time": "Full-time",
    internship: "Internship",
    bootcamp: "Bootcamp & Course",
    "part-time": "Part-time",
    freelance: "Freelance",
  },
  experienceItems: [
    {
      id: "exp-1",
      role: "Admin",
      company: "PT Sinar Kencana Inti Perkasa",
      period: "Jan - Mar 2020",
      location: "Kotabaru, Indonesia",
      type: "internship",
      description:
        "Responsible for managing and validating production and workforce operational data, including employee attendance monitoring and Excel-based reporting. Collaborated with multiple departments to ensure data and reporting requirements were delivered accurately, consistently, and on time.",
      highlights: [
        "Managed and validated 100+ daily production and workforce records to ensure data accuracy, consistency, and completeness.",
        "Prepared 5 tailored operational reports using Excel based on the specific requirements of each division to support monitoring and decision-making.",
        "Monitored employee attendance data and maintained operational data consistency to support accurate daily and monthly performance reporting.",
      ],
      techStack: ["Excel", "Word", "SAP"],
    },
    {
      id: "exp-2",
      role: "Cloud Computing Cohort",
      company: "Bangkit led by Google, Goto, and Traveloka",
      period: "Aug 2023 — Feb 2024",
      location: "Remote, Indonesia",
      type: "bootcamp",
      description:
        "Completed the Bangkit Academy Cloud Computing learning path as a Back-end Developer and Cloud Engineer. Focused on developing back-end services, integrating applications with cloud infrastructure, deploying applications, and applying testing and optimization practices to build reliable applications ready for cloud environments.",
      highlights: [
        "Served as a Back-end Developer and Cloud Engineer, developing back-end applications and managing cloud infrastructure requirements.",
        "Developed and integrated back-end services with cloud infrastructure, including application deployment and environment configuration.",
        "Performed integration testing and performance optimization to improve application reliability, security, and cloud readiness.",
      ],
      techStack: [
        "JavaScript",
        "Node.js",
        "Express.js",
        "MySQL",
        "Google Cloud",
      ],
    },
    {
      id: "exp-3",
      role: "Student Back End Engineering",
      company: "Ruangguru",
      period: "Feb - Jun 2024",
      location: "Remote, Indonesia",
      type: "bootcamp",
      description:
        "Completed a Backend Engineer program focused on building end-to-end software engineering and backend development skills with Golang. Covered foundational and advanced Golang concepts, RESTful APIs, testing, concurrency, design patterns, Clean Architecture, authentication & authorization, SQL/NoSQL databases, and backend deployment. The program also introduced basic AI/ML model inference using Golang.",
      highlights: [
        "Built a strong foundation in software engineering and problem-solving, covering Git, terminal usage, basic networking, algorithms, technical communication, and project management fundamentals.",
        "Developed backend engineering skills using Golang, covering RESTful APIs, error handling, unit testing, concurrency, data structures, and design patterns.",
        "Built backend applications using Clean Architecture, authentication & authorization, SQL/NoSQL databases, deployment practices, and basic AI/ML model inference with Golang.",
      ],
      techStack: ["Golang", "Gin", "PostgresSQL", "RESTful API"],
    },
    {
      id: "exp-4",
      role: "Full-stack Developer",
      company: "PT.Winnicode Garuda Indonesia",
      period: "Aug - Nov 2024",
      location: "Remote, Indonesia",
      type: "internship",
      description:
        "Worked as a Full-stack Developer Intern developing a web-based recruitment system using Laravel. Contributed to both candidate-facing and admin features, data management through the dashboard, and secure document upload and validation. Gained hands-on experience in developing web applications across user experience, business workflows, and data management.",
      highlights: [
        "Developed a web-based recruitment system using Laravel, enabling candidates to submit applications, upload resumes, and manage their profiles through a user-friendly interface.",
        "Designed and implemented an admin management dashboard to streamline data management and improve operational efficiency by approximately 50%.",
        "Implemented secure file upload and validation mechanisms to protect and ensure the integrity of candidate documents uploaded to the system.",
      ],
      techStack: ["PHP", "Laravel", "MySQL", "HTML", "CSS", "JavaScript"],
    },
    {
      id: "exp-5",
      role: "Staff Warehouse & Web Developer",
      company: "PT Dua Samudera Perkasa",
      period: "Sep - Nov 2024",
      location: "Tanah Bumbu, Indonesia",
      type: "internship",
      description:
        "Worked as a Warehouse Staff and Web Developer Intern, developing an inventory management system to support the digitalization of warehouse operations. Transformed manual inventory workflows into system-based processes covering oxygen cylinder tracking, inventory data management, reporting, and operational monitoring.",
      highlights: [
        "Designed and developed a responsive web-based inventory management system to support oxygen cylinder tracking and monitoring.",
        "Developed backend functionality and inventory data management, including data storage, retrieval, CRUD operations, and reporting features to support warehouse operations.",
        "Digitized manual inventory workflows into structured system processes, improving monitoring efficiency by up to 80%.",
      ],
      techStack: ["PHP", "MySQL", "HTML", "Bootstrap", "JavaScript"],
    },
    {
      id: "exp-6",
      role: "Artificial Intelligence Engineer Cohort",
      company: "Laskar AI",
      period: "Feb - Aug 2025",
      location: "Remote, Indonesia",
      type: "bootcamp",
      description:
        "Participated in the Laskar AI program as an AI Engineer Cohort, focusing on programming fundamentals, data analysis, and machine learning using Python. Applied an end-to-end machine learning development process, from data processing, exploration and visualization to model development, evaluation, and implementation based on real-world industry cases. The program also involved collaborative development using Git/GitHub and completing a capstone project as a professional portfolio.",
      highlights: [
        "Built a foundation in programming and computational thinking using HTML, CSS, and JavaScript, while applying Git and GitHub for version control and team collaboration.",
        "Developed data analysis and machine learning skills using Python, covering data processing, visualization, and building classification, regression, and clustering models.",
        "Delivered end-to-end machine learning projects, from solution design, data processing, model training and evaluation to implementation based on real-world industry cases.",
      ],
      techStack: ["HTML", "CSS", "JavaScript", "Python", "Google Colab"],
    },
    {
      id: "exp-7",
      role: "Facilitator - Full Stack Web Developer",
      company: "Coding Camp powered by DBS Foundation",
      period: "Feb - Aug 2026",
      location: "Remote, Indonesia",
      type: "part-time",
      description:
        "Served as a Full Stack Web Developer Facilitator, responsible for mentoring and managing approximately 25 students throughout the learning program. Beyond providing technical support, handled progress monitoring, attendance, consultations, and student management and learning challenges. On the technical side, strengthened backend development skills using Express.js through Forum API development and explored the use of Redis, RabbitMQ, and Docker in application architecture.",
      highlights: [
        "Managed and mentored approximately 25 students throughout the Full Stack Web Developer program, including progress monitoring, attendance tracking, weekly consultations, and addressing student management and learning challenges.",
        "Strengthened Full Stack & Backend Engineering skills by developing a Forum API with Express.js and applying Redis, RabbitMQ, and Docker to build and run application services.",
        "Contributed to program outcomes with a 76% graduation rate, 80.2% average weekly consultation attendance, and average feedback ratings of 4.64/5 for biweekly feedback and 4.79/5 for ILT feedback.",
      ],
      techStack: [
        "HTML",
        "CSS",
        "TailwindCSS",
        "JavaScript",
        "React",
        "Express.js",
        "PostgresSQL",
        "Redis",
        "RabbitMQ",
        "Docker",
      ],
    },
    {
      id: "exp-8",
      role: "Freelance Web Developer",
      company: "Clarvea",
      period: "Aug 2024 - Now",
      location: "Remote, Indonesia",
      type: "freelance",
      description:
        "Worked as a Freelance Web Developer, delivering web applications for approximately 10 clients with diverse business requirements and feature needs. Responsible for understanding requirements, designing solutions, developing backend and frontend features, and integrating third-party services such as payment gateways and WhatsApp. Experience includes implementing authentication, Role-Based Access Control (RBAC), and building solutions tailored to each client's operational needs.",
      highlights: [
        "Delivered web application development for approximately 10 clients, handling diverse feature requirements from requirement analysis through implementation.",
        "Developed and integrated various backend features and third-party services, including payment gateways, WhatsApp integration through Fonnte, authentication, and Role-Based Access Control (RBAC).",
        "Translated client business requirements into practical and scalable web solutions, focusing on reliability, security, usability, and operational needs.",
      ],
      techStack: [
        "HTML",
        "CSS",
        "TailwindCSS",
        "Bootstrap",
        "JavaScript",
        "PHP",
        "Laravel",
        "Flutter",
        "MySQL",
        "Firebase",
      ],
    },
    {
      id: "exp-9",
      role: "Information Technology Specialist",
      company: "RS. Marina Permata Batulicin",
      period: "Jun 2026 - Now",
      location: "Tanah Bumbu, Indonesia",
      type: "full-time",
      description:
        "Worked as an Information Technology Specialist supporting the hospital's IT operations, from troubleshooting devices and networks to installing and maintaining IT infrastructure. Managed computer networks, computers and printers, CCTV systems, and telephone systems. Also contributed to developing internal applications to support operational needs and process digitalization within the hospital.",
      highlights: [
        "Provided IT troubleshooting and technical support for networks, computers, printers, and IT devices to ensure smooth hospital operations.",
        "Performed IT infrastructure installation and maintenance, including computer networks, CCTV systems, telephone systems, computer equipment, and device connectivity.",
        "Developed and prepared internal applications based on hospital operational needs, translating user requirements into technology-driven solutions.",
      ],
      techStack: [
        "Remote Apps",
        "Virtual Machine",
        "Ubuntu",
        "Linux",
        "Podman",
        "PHP",
        "Laravel",
        "MySQL",
      ],
    },
  ],
};
