"use client";

import { motion } from "framer-motion";

const Status = () => {
  return (
    <motion.div
      className="flex items-center gap-2.5 rounded-full border border-neutral-200 bg-white px-4 py-1.5 shadow-sm backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/40"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{
        scale: 1.02,
        borderColor: "rgba(59, 130, 246, 0.4)",
        boxShadow: "0 4px 12px rgba(59, 130, 246, 0.08)",
        transition: { duration: 0.2 },
      }}
    >
      <div className="relative flex h-2.5 w-2.5 items-center justify-center">
        <motion.div
          className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute inset-0 animate-ping rounded-full bg-blue-500/30" style={{ animationDuration: '3s' }} />
      </div>
      <span className="text-[13px] font-medium text-neutral-600 dark:text-neutral-400">
        Available for Hire.
      </span>
    </motion.div>
  );
};

export default Status;
