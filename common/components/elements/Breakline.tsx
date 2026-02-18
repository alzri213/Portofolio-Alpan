"use client";

import clsx from "clsx";
import { motion } from "framer-motion";

interface BreaklineProps {
  className?: string;
  [propName: string]: string | undefined;
}

const Breakline = ({ className = "", ...others }: BreaklineProps) => {
  return (
    <motion.div
      className={clsx("animated-divider my-4", className)}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...others}
    />
  );
};

export default Breakline;
