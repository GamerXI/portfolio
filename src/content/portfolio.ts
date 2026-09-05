/**
 * Portfolio Content Configuration
 * 
 * Edit this file to customize all portfolio content.
 * All sections, text, and data are centralized here for easy updates.
 */

export interface Skill {
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'databases' | 'devops' | 'workflow' | 'ai' | 'tools';
  level: number; // 1-100
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  link?: string;
  github?: string;
  npm?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Social {
  platform: string;
  url: string;
  icon: string;
  handle?: string;
}

export interface PortfolioContent {
  personal: {
    name: string;
    role: string;
    tagline: string;
    bio: string;
    location: string;
    phone: string;
    email: string;
    resumeUrl: string | null;
  };
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  socials: Social[];
}

export const portfolioContent: PortfolioContent = {
  personal: {
    name: "Suhail Saifi",
    role: "Software Engineer — Full Stack Developer",
    tagline: "Building scalable systems and AI-driven solutions",
    bio: `Software Engineer with 4+ years of experience building scalable backend 
and full-stack applications with Node.js, React, Angular, and Python. 

I design REST APIs and microservices for internal business platforms, build 
automation pipelines and AI-driven analytics systems. I leverage modern AI tools 
like Cursor, Claude, and ChatGPT to accelerate engineering and debugging workflows.

Currently at Justdial, I've improved system performance by 40% and reduced 
maintenance costs by 25% through optimized architecture and automation.`,
    location: "Bengaluru, India",
    phone: "(+91) 9205604979",
    email: "suhailsaifi2020@gmail.com",
    resumeUrl: null,
  },

  skills: [
    // Languages
    { name: "JavaScript", category: "languages", level: 92 },
    { name: "Python", category: "languages", level: 85 },
    { name: "PHP", category: "languages", level: 70 },
    
    // Frontend
    { name: "React.js", category: "frontend", level: 90 },
    { name: "Angular", category: "frontend", level: 85 },
    { name: "HTML5/CSS3", category: "frontend", level: 92 },
    { name: "Material UI", category: "frontend", level: 82 },
    { name: "Bootstrap", category: "frontend", level: 85 },
    
    // Backend
    { name: "Node.js", category: "backend", level: 92 },
    { name: "Express.js", category: "backend", level: 90 },
    { name: "REST APIs", category: "backend", level: 95 },
    { name: "Microservices", category: "backend", level: 85 },
    
    // Databases
    { name: "MySQL", category: "databases", level: 88 },
    { name: "MongoDB", category: "databases", level: 80 },
    
    // DevOps
    { name: "Docker", category: "devops", level: 82 },
    { name: "Linux", category: "devops", level: 80 },
    { name: "Git", category: "devops", level: 92 },
    { name: "GitLab CI/CD", category: "devops", level: 78 },
    
    // Workflow / Messaging
    { name: "Apache Airflow", category: "workflow", level: 80 },
    { name: "RabbitMQ", category: "workflow", level: 75 },
    
    // AI / LLM
    { name: "Ollama", category: "ai", level: 78 },
    { name: "AI Pipelines", category: "ai", level: 82 },
    
    // Tools
    { name: "Cursor", category: "tools", level: 88 },
    { name: "Claude", category: "tools", level: 85 },
    { name: "VS Code", category: "tools", level: 92 },
  ],

  projects: [
    {
      id: "project-1",
      title: "AI-Based Call Analysis System",
      description: "AI platform analyzing customer support recordings with self-hosted LLMs",
      longDescription: `Internal AI platform that analyzes customer support recordings using 
Python pipelines and self-hosted LLMs. Features include automatic transcription, 
sentiment analysis, and agent scoring. Built with microservice architecture 
(transcription/analysis/reporting services) and Airflow-style pipelines. 
Processes thousands of calls monthly and eliminated 100%+ manual QA work.`,
      technologies: ["Python", "Ollama", "Apache Airflow", "Microservices", "Docker"],
      image: "/projects/call-analysis.jpg",
      featured: true,
    },
    {
      id: "project-2",
      title: "JDLeads",
      description: "Lead management platform with 40% conversion improvement",
      longDescription: `Lead automation and management platform that improved conversion 
rates by 40%. Features real-time dashboards supporting 20+ concurrent leads, 
automated workflow pipelines with Apache Airflow, and containerized deployment 
with Docker for scalability.`,
      technologies: ["Node.js", "React", "MySQL", "Apache Airflow", "Docker"],
      image: "/projects/jdleads.jpg",
      featured: true,
    },
    {
      id: "project-3",
      title: "DevKickstart",
      description: "Project scaffolding CLI tool published on npm",
      longDescription: `Node.js CLI tool that generates project templates for Node.js, 
React, and Python applications. Features interactive Inquirer.js prompts 
and modular template architecture for easy customization and extension.`,
      technologies: ["Node.js", "Inquirer.js", "npm", "CLI"],
      image: "/projects/devkickstart.jpg",
      npm: "https://www.npmjs.com/package/devkickstart",
      github: "https://github.com/GamerXI",
      featured: true,
    },
  ],

  experience: [
    {
      id: "exp-1",
      role: "Software Engineer",
      company: "Justdial Pvt. Ltd",
      period: "Dec 2021 - Present",
      description: "Building internal business platforms and automation systems",
      highlights: [
        "Build internal business platforms with Node.js, React, Angular, MySQL",
        "Design and maintain REST APIs for dashboards and automation services",
        "Deploy containerized microservices with Docker; cut deployment time ~30%",
        "Work in team of 10; improved system performance ~40%, reduced maintenance cost ~25%",
        "Automate operations with Python + Apache Airflow; cut manual processing ~50%",
        "Manage backend services and CI/CD for internal automation platforms",
        "Improve reliability; reduce downtime ~25% via monitoring and tuning",
        "Follow Agile methodology with JIRA for project management",
      ],
    },
  ],

  socials: [
    {
      platform: "GitHub",
      url: "https://github.com/GamerXI",
      icon: "github",
      handle: "@GamerXI",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/suhail-saifi",
      icon: "linkedin",
      handle: "/in/suhail-saifi",
    },
    {
      platform: "npm",
      url: "https://www.npmjs.com/~itsgamerx",
      icon: "npm",
      handle: "~itsgamerx",
    },
  ],
};

export default portfolioContent;
