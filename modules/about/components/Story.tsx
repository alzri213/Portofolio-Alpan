"use client";

import { motion } from "framer-motion";
import Image from "@/common/components/elements/Image";
import { useTranslations } from "next-intl";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Story = () => {
  const t = useTranslations("AboutPage");

  const paragrafData = [{ index: 1 }, { index: 2 }, { index: 3 }, { index: 4 }];

  return (
    <motion.section
      className="space-y-4 leading-loose text-neutral-800 dark:text-neutral-300"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {paragrafData.map((paragraph) => (
        <motion.div key={paragraph.index} variants={itemVariants}>
          {t(`resume.paragraf_${paragraph.index}`)}
        </motion.div>
      ))}
      <motion.div variants={itemVariants} className="overflow-hidden rounded-xl">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/profile/fikri-about2.jpg"
            alt="Fikri Alifa Alfan R."
            width={500}
            height={500}
            className="rounded-xl border-2 border-neutral-200 transition-all duration-500 dark:border-neutral-800"
          />
        </motion.div>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Image
          src="/images/signature.png"
          alt="signature"
          width={100}
          height={100}
        />
      </motion.div>
    </motion.section>
  );
};

export default Story;
