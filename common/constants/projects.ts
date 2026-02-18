import { ProjectItem } from "../types/projects";

export const PROJECTS_DUMMY: ProjectItem[] = [
    {
        id: 1,
        title: "Personal Portfolio Website",
        slug: "personal-portfolio",
        description: "Website portofolio modern yang dibangun dengan Next.js 14, Tailwind CSS, dan Supabase.",
        image: "/images/projects/portfolio.png",
        link_demo: "https://fikrialifa.site",
        link_github: "https://github.com/alzri213",
        stacks: ["Next.js", "TypeScript", "Tailwind CSS"],
        is_show: true,
        is_featured: true,
    },
    {
        id: 2,
        title: "E-Commerce App",
        slug: "ecommerce-app",
        description: "Aplikasi belanja online dengan fitur lengkap.",
        image: "/images/projects/inventory-smart.png",
        link_demo: null,
        link_github: "https://github.com/fikrialifa/ecommerce",
        stacks: ["React Native", "Firebase"],
        is_show: true,
        is_featured: false,
    }
];
