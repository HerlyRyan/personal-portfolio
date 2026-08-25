export interface SkillItem {
  name: string;
  level: "Advanced" | "Intermediate" | "Beginner";
}

export interface SkillCategory {
  categoryName: string;
  skills: SkillItem[];
}

export interface SkillsLocale {
  title: string;
  description: string;
  itemsLabel: string;
  skillsData: SkillCategory[];
}

export const skills: SkillsLocale = {
  title: "Skills Stack",
  description: "// Click category below to expand core technical proficiencies, frameworks, and tools.",
  itemsLabel: "items",
  skillsData: [
    {
      categoryName: "Frontend Development",
      skills: [
        { name: "React", level: "Intermediate" },
        { name: "TypeScript", level: "Advanced" },
        { name: "JavaScript", level: "Advanced" },
        { name: "Tailwind CSS", level: "Advanced" },
        { name: "HTML5", level: "Advanced" },
        { name: "CSS3", level: "Advanced" },
        { name: "Vite", level: "Intermediate" },
      ]
    },
    {
      categoryName: "Backend & Frameworks",
      skills: [
        { name: "Node.js", level: "Intermediate" },
        { name: "PHP", level: "Advanced" },
        { name: "Laravel", level: "Advanced" },
        { name: "RESTful APIs", level: "Advanced" },
      ]
    },
    {
      categoryName: "Mobile Development",
      skills: [
        { name: "Flutter", level: "Advanced" },
        { name: "Dart", level: "Advanced" },
      ]
    },
    {
      categoryName: "Database & Tools",
      skills: [
        { name: "MySQL", level: "Advanced" },
        { name: "Git", level: "Advanced" },
        { name: "GitHub", level: "Advanced" },
        { name: "VS Code", level: "Advanced" },
        { name: "Postman", level: "Intermediate" },
      ]
    }
  ]
};