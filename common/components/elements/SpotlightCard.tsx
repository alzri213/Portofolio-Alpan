"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(59, 130, 246, 0.12)",
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseEnter = () => {
    if (!divRef.current) return;
    divRef.current.style.setProperty("--spotlight-opacity", "1");
  };

  const handleMouseLeave = () => {
    if (!divRef.current) return;
    divRef.current.style.setProperty("--spotlight-opacity", "0");
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-500 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:border-blue-500/30 dark:hover:shadow-2xl dark:hover:shadow-blue-500/10 ${className}`}
      style={
        {
          "--mouse-x": "0px",
          "--mouse-y": "0px",
          "--spotlight-opacity": "0",
        } as React.CSSProperties
      }
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* Primary spotlight effect - Blue Accent */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity: "var(--spotlight-opacity)",
          background: `radial-gradient(circle 250px at var(--mouse-x) var(--mouse-y), ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Border glow effect - Blue Accent */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          opacity: "var(--spotlight-opacity)",
          background: `radial-gradient(circle 350px at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.1), transparent 60%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1.5px",
        }}
      />

      {/* Shine sweep on hover */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full opacity-0 transition-all duration-1000 ease-out group-hover:translate-x-full group-hover:opacity-100">
        <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-blue-400/[0.03] to-transparent" />
      </div>

      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

export default SpotlightCard;
