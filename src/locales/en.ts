import { aboutEn } from "./data/aboutData";
import { experienceEn } from "./data/experienceData";
import { projectsEn } from "./data/projectsData";
import { skills } from "./data/skillsData";

export const en = {
  profileSidebar: {
    status: "Available",
  },
  systemOverview: {
    tag: "// SYSTEM OVERVIEW",

    badge: "Backend & System Engineering",

    title: "Turning business workflows into reliable digital systems.",

    description:
      "I design business applications with a focus on backend architecture, data integrity, and system integration—from operational systems and POS platforms to internal enterprise tools.",

    highlights: [
      {
        value: "10+",
        label: "Projects & Clients",
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

    focusAreas: [
      "Laravel",
      "Node.js",
      "MySQL",
      "REST API",
      "System Integration",
    ],
  },
  confirmationModal: {
    title: "Open external link?",
    description:
      "You are about to leave this portfolio and open the following address in a new tab.",
    destination: "Destination",
    noButton: "No",
    yesButton: "Yes, Proceed",
  },
  projectsModal: projectsEn,
  experienceModal: experienceEn,
  skillsModal: skills,
  aboutModal: aboutEn,
};
