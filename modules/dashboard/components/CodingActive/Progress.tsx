"use client";

import clsx from "clsx";
import { motion, Variants } from "framer-motion";

interface ProgressProps {
  data: { name: string; percent?: number };
  className?: string;
}

const Progress = ({ data, className }: ProgressProps) => {
  const { name, percent = 0 } = data;

  const progressVariants: Variants = {
    initial: { width: 0 },
    animate: {
      width: `${percent}%`,
      transition: { duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <div className="w-28 text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {name}
      </div>
      <div className="relative h-2 flex-1 rounded-full bg-neutral-200 dark:bg-neutral-800">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={progressVariants}
          className={clsx(
            className || "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.3)]",
            "absolute left-0 top-0 h-full rounded-full",
          )}
        />
      </div>
      <div className="w-10 text-right text-xs font-semibold text-neutral-500 dark:text-neutral-400">
        {percent.toFixed(0)}%
      </div>
    </div>
  );
};

export default Progress;
