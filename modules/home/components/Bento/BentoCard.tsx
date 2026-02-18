"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import SpotlightCard from "@/common/components/elements/SpotlightCard";
import StarBorder from "@/common/components/elements/StarBorder";
import { BentoItemProps } from "@/common/types/bento";

interface BentoCardAnimatedProps extends BentoItemProps {
  index?: number;
}

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const BentoCard = ({
  title,
  description,
  label,
  icon,
  visual,
  href,
  colSpan,
  className,
  index = 0,
}: BentoCardAnimatedProps) => {
  return (
    <motion.div
      variants={itemVariants}
      className={`md:col-span-${colSpan ?? 1}`}
    >
      <SpotlightCard
        className={`!p-0 h-full ${colSpan === 2 ? "grid grid-cols-2 gap-2" : "flex flex-col"} ${className}`}
      >
        <div
          className={`flex flex-col p-6 ${colSpan === 2 ? "item-start" : "items-center text-center"}`}
        >
          {icon && href && (
            <Link href={href}>
              <motion.div
                whileHover={{
                  scale: 1.08,
                  rotate: -3,
                  transition: { type: "spring", stiffness: 400, damping: 15 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <StarBorder
                  speed="5s"
                  className="bg-neutral-100 px-[12px] py-[14px] text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100"
                >
                  {icon}
                </StarBorder>
              </motion.div>
            </Link>
          )}
          <h2 className="mb-1 mt-3 text-sm font-medium text-neutral-800 dark:text-neutral-300">
            {title}
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        </div>

        <>{visual}</>
      </SpotlightCard>
    </motion.div>
  );
};

export default BentoCard;
