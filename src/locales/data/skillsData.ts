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
        { name: "HTML5", level: "Intermediate" },
        { name: "CSS3", level: "Intermediate" },
        { name: "Bootstrap", level: "Intermediate" },
        { name: "Tailwind CSS", level: "Beginner" },
        { name: "JavaScript", level: "Intermediate" },
        { name: "TypeScript", level: "Intermediate" },
        { name: "React", level: "Beginner" },
      ]
    },
    {
      categoryName: "Backend Development",
      skills: [
        { name: "Node.js", level: "Intermediate" },
        { name: "PHP", level: "Intermediate" },
        { name: "Laravel", level: "Intermediate" },
        { name: "RESTful API", level: "Intermediate" },
      ]
    },
    {
      categoryName: "Mobile Development",
      skills: [
        { name: "Flutter", level: "Beginner" },
        { name: "Dart", level: "Beginner" },
      ]
    },
    {
      categoryName: "Database & Tools",
      skills: [
        { name: "MySQL", level: "Intermediate" },
        { name: "PostgreSQL", level: "Intermediate" },
        { name: "Git", level: "Intermediate" },
        { name: "GitHub", level: "Intermediate" },
        { name: "VS Code", level: "Intermediate" },
        { name: "Postman", level: "Intermediate" },
      ]
    }
  ]
};