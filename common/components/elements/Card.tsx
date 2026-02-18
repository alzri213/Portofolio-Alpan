"use client";

import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  [propName: string]: unknown;
}

const Card = ({ children, className = "", ...others }: CardProps) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl w-full border border-neutral-200 p-1 shadow-sm transition-all duration-500 hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-500/5 dark:border-neutral-800 dark:bg-[#111] dark:hover:border-blue-500/20 dark:hover:shadow-2xl dark:hover:shadow-blue-500/5"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -3,
        transition: { duration: 0.3 },
      }}
    >
      <div
        className={`relative h-full w-full rounded-lg bg-white dark:bg-[#111] transition-all duration-500 ${className}`}
        {...others}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default Card;
