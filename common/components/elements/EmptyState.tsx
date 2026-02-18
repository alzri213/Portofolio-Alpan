"use client";

import { motion } from "framer-motion";
import { TbMoodSadSquint as MoodIcon } from "react-icons/tb";

interface EmptyStateProps {
  message: string;
}

const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center space-y-4 rounded-2xl border border-dashed border-neutral-200 py-12 text-center dark:border-neutral-800"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <MoodIcon size={48} className="text-neutral-300 dark:text-neutral-700" />
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      <div className="max-w-[200px] space-y-1">
        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          Data Unavailable
        </p>
        <p className="text-xs text-neutral-400 dark:text-neutral-500">
          {message}
        </p>
      </div>
    </motion.div>
  );
};

export default EmptyState;
