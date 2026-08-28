import { aboutId } from "./data/aboutData.ts";
import { experienceId } from "./data/experienceData.ts";
import { projectsId } from "./data/projectsData.ts";
import { skills } from "./data/skillsData.ts";

export const id = {
  profileSidebar: {
    status: "Tersedia",
  },
  systemOverview: {
    tag: "// SYSTEM OVERVIEW",

    badge: "Backend & System Engineering",

    title: "Mengubah proses bisnis menjadi sistem digital yang andal.",

    description:
      "Saya merancang aplikasi bisnis dengan fokus pada arsitektur backend, integritas data, dan integrasi sistem—mulai dari sistem operasional dan POS hingga tools internal perusahaan.",

    highlights: [
      {
        value: "10+",
        label: "Project & Client",
      },
      {
        value: "Multi-Role",
        label: "RBAC & Auth",
      },
      {
        value: "End-to-End",
        label: "Build to Deployment",
      },
    ],

    focusAreas: ["Laravel", "Node.js", "MySQL", "REST API", "Integrasi Sistem"],
  },
  confirmationModal: {
    title: "Buka Link eksternal?",
    description:
      "Anda akan meninggalkan portfolio ini dan membuka alamat berikut di tab baru.",
    destination: "Tujuan",
    noButton: "Tidak",
    yesButton: "Ya, Lanjutkan",
  },
  projectsModal: projectsId,
  experienceModal: experienceId,
  skillsModal: skills,
  aboutModal: aboutId,
};
