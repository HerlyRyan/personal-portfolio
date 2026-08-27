import { aboutEn } from './data/aboutData';
import { experienceEn } from './data/experienceData';
import { projectsEn } from './data/projectsData';
import { skills } from './data/skillsData';

export const en = {
  profileSidebar: {
    status: 'Available',
  },
  systemOverview: {
    tag: '// SYSTEM OVERVIEW',
    badge: 'Backend & Architecture',
    title: 'Building scalable systems with precision.',
    description:
      'Focused on designing robust backend architecture, structured database management, and high-performance system integration to fully support enterprise productivity.',
    secureConnection: '[Secure Connection]',
  },
  confirmationModal: {
    title: 'Open external link?',
    description: 'You are about to leave this portfolio and open the following address in a new tab.',
    destination: 'Destination',
    noButton: 'No',
    yesButton: 'Yes, Proceed'
  },
  projectsModal: projectsEn,
  experienceModal: experienceEn,
  skillsModal: skills,
  aboutModal: aboutEn,
};