"use client";

import { motion } from "framer-motion";
import { HiOutlineRocketLaunch as ProjectIcon } from "react-icons/hi2";
import { HiOutlineCodeBracket as CodeIcon } from "react-icons/hi2";
import { HiOutlineCpuChip as TechIcon } from "react-icons/hi2";

import Card from "@/common/components/elements/Card";
import AnimateCounter from "@/common/components/elements/AnimateCounter";
import { STACKS } from "@/common/constants/stacks";
import { PROJECTS_DUMMY } from "@/common/constants/projects";

const StatsOverview = () => {
    const totalProjects = PROJECTS_DUMMY.length;
    const totalSkills = STACKS.length;
    const yearsOfExperience = new Date().getFullYear() - 2021; // Assuming 2021 start

    const stats = [
        {
            label: "Total Projects",
            value: totalProjects,
            icon: <ProjectIcon size={20} />,
            color: "text-blue-600",
        },
        {
            label: "Tech Stacks",
            value: totalSkills,
            icon: <TechIcon size={20} />,
            color: "text-blue-500",
        },
        {
            label: "Years of Experience",
            value: yearsOfExperience,
            icon: <CodeIcon size={20} />,
            color: "text-blue-400",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat, index) => (
                <Card key={index} className="flex items-center gap-4 p-5 hover:border-blue-500/30 transition-all duration-300">
                    <div className={`p-3 rounded-xl bg-blue-500/10 ${stat.color}`}>
                        {stat.icon}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                            {stat.label}
                        </span>
                        <div className="flex items-baseline gap-1">
                            <AnimateCounter
                                className="text-2xl font-bold text-neutral-800 dark:text-neutral-200"
                                total={stat.value}
                            />
                            <span className="text-xs font-medium text-neutral-400">
                                {stat.label === "Years of Experience" ? "Years" : ""}
                            </span>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default StatsOverview;
