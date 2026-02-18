"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
}

const SectionHeading = ({
  title,
  icon,
  className = "",
}: SectionHeadingProps) => {
  return (
    <motion.div
      className={`flex items-center gap-2 text-xl font-medium text-neutral-800 dark:text-neutral-200 ${className}`}
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {icon ? (
        <motion.i
          className="text-blue-500 dark:text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]"
          whileHover={{
            rotate: -8,
            scale: 1.1,
            transition: { type: "spring", stiffness: 400 },
          }}
        >
          {icon}
        </motion.i>
      ) : null}
      <h2 className="relative tracking-tight">
        {title}
        <motion.span
          className="absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-gradient-to-r from-blue-500 to-transparent"
          initial={{ width: 0 }}
          whileInView={{ width: "60px" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </h2>
    </motion.div>
  );
};

export default SectionHeading;
