"use client";

import { motion } from "framer-motion";

interface SkillCardProps {
  name: string;
  icon: JSX.Element;
}

const SkillCard = ({ name, icon }: SkillCardProps) => {
  return (
    <div className="px-2">
      <motion.div
        className="flex w-full cursor-default items-center space-x-2 rounded-full border border-neutral-200/60 bg-neutral-50 px-4 py-2 shadow-sm transition-all duration-300 hover:border-cyan-500/30 hover:shadow-md dark:border-neutral-700/50 dark:bg-neutral-800/80 dark:hover:border-cyan-500/30 dark:hover:shadow-cyan-500/5"
        whileHover={{
          scale: 1.03,
          transition: { duration: 0.2 },
        }}
      >
        <div className="h-6 w-6">{icon}</div>
        <div className="whitespace-nowrap text-sm">{name}</div>
      </motion.div>
    </div>
  );
};

export default SkillCard;
