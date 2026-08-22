export interface SkillCategory {
  categoryName: string;
  skills: string[];
}

export const SKILLS_DATA: SkillCategory[] = [
  {
    categoryName: "Frontend Development",
    skills: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5", "CSS3", "Vite"]
  },
  {
    categoryName: "Backend & Frameworks",
    skills: ["Node.js", "PHP", "Laravel", "RESTful APIs"]
  },
  {
    categoryName: "Mobile Development",
    skills: ["Flutter", "Dart"]
  },
  {
    categoryName: "Database & Tools",
    skills: ["MySQL", "Git", "GitHub", "VS Code", "Postman"]
  }
];