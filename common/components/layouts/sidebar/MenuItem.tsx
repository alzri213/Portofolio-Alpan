"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";

import { MenuItemProps } from "@/common/types/menu";

const MenuItem = ({ title, href, icon, onClick, className }: MenuItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const [isHovered, setIsHovered] = useState(false);

  // Smooth hover physics
  const mouseX = useSpring(0, { stiffness: 300, damping: 30 });
  const scale = useTransform(mouseX, [-100, 0, 100], [0.95, 1, 1.05]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    mouseX.set(x);
  };

  const itemClass = clsx(
    "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden h-11",
    isActive
      ? "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 font-semibold"
      : "text-neutral-500 hover:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/50",
    className,
  );

  return (
    <Link href={href} passHref>
      <motion.div
        className={itemClass}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          mouseX.set(0);
        }}
        whileHover={{
          x: 4,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.98 }}
      >
        <AnimatePresence>
          {isActive && (
            <motion.div
              layoutId="active-nav-indicator"
              className="absolute left-0 top-0 h-full w-[3px] rounded-full bg-blue-600 dark:bg-blue-400"
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        <motion.div
          style={{ rotate: isHovered ? (isActive ? 0 : -8) : 0 }}
          className={clsx(
            "transition-colors duration-300",
            isActive ? "text-blue-600 dark:text-blue-400" : "group-hover:text-blue-600 dark:group-hover:text-blue-400",
          )}
        >
          {icon}
        </motion.div>

        <span className="text-sm tracking-tight">{title}</span>

        {/* Subtle glow on hover */}
        <div className="absolute inset-0 z-[-1] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="h-full w-full bg-gradient-to-r from-blue-500/[0.03] to-transparent" />
        </div>
      </motion.div>
    </Link>
  );
};

export default MenuItem;
