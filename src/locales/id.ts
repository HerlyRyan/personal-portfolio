import { aboutId } from './data/aboutData.ts';
import { experienceId } from './data/experienceData.ts';
import { projectsId } from './data/projectsData.ts';
import { skills } from './data/skillsData.ts';

export const id = {
  profileSidebar: {
    status: 'Tersedia',
  },
  systemOverview: {
    tag: '// SYSTEM OVERVIEW',
    badge: 'Backend & Architecture',
    title: 'Membangun sistem yang skalabel dengan presisi.',
    description:
      'Berfokus pada perancangan arsitektur backend yang kokoh, manajemen database terstruktur, dan integrasi sistem berperforma tinggi untuk mendukung produktivitas enterprise secara menyeluruh.',
    secureConnection: '[Koneksi Aman]',
  },
  projectsModal: projectsId,
  experienceModal: experienceId,
  skillsModal: skills,
  aboutModal: aboutId,
};