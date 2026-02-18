"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const Introduction = () => {
  const t = useTranslations("HomePage");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.section
      className="relative space-y-2 bg-cover bg-no-repeat"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Subtle gradient accent behind heading */}
      <motion.div
        className="absolute -left-8 -top-4 h-32 w-32 rounded-full opacity-0 blur-[60px] dark:opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
        }}
        animate={{
          opacity: [0, 0.3, 0],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        variants={itemVariants}
        className="text-3xl font-medium text-neutral-900 dark:text-neutral-50"
      >
        <h1 className="relative inline-block">
          {t("intro")}
          <motion.div
            className="absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-transparent"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 1,
              delay: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </h1>
      </motion.div>

      <motion.div className="space-y-4" variants={itemVariants}>
        <ul className="ml-5 flex list-disc flex-col gap-x-10 gap-y-2 text-neutral-700 dark:text-neutral-400 md:flex-row">
          <motion.li
            variants={itemVariants}
            whileHover={{
              x: 4,
              color: "#3b82f6",
              transition: { duration: 0.2 },
            }}
            className="cursor-default transition-colors"
          >
            {t("location")}
          </motion.li>
          <motion.li
            variants={itemVariants}
            whileHover={{
              x: 4,
              color: "#3b82f6",
              transition: { duration: 0.2 },
            }}
            className="cursor-default transition-colors"
          >
            {t("location_type")}
          </motion.li>
        </ul>
        <motion.p
          variants={itemVariants}
          className="mt-6 leading-loose text-neutral-600 dark:text-neutral-300"
        >
          {t("resume")}
        </motion.p>
      </motion.div>
    </motion.section>
  );
};

export default Introduction;
