"use client";

import React from "react";
import { motion } from "framer-motion";

export interface GlassIconItem {
  icon: React.ReactElement;
  color: string;
  label: string;
  customClass?: string;
}

export interface GlassIconProps {
  items: GlassIconItem[];
}

const GlassIcon: React.FC<GlassIconProps> = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <motion.button
          key={index}
          type="button"
          aria-label={item.label}
          className={`group relative h-[2.6em] w-[2.6em] bg-transparent outline-none [-webkit-tap-highlight-color:transparent] [perspective:24em] [transform-style:preserve-3d] md:h-[3em] md:w-[3em] ${item.customClass || ""
            }`}
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: index * 0.03,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span
            className={`absolute left-0 top-0 block h-full w-full origin-[100%_100%] rotate-[15deg] rounded-[1.25em] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)] ${item.color}`}
          ></span>

          <span
            className="absolute left-0 top-0 flex h-full w-full origin-[80%_50%] transform rounded-[1.25em] bg-[hsla(0,0%,100%,0.15)] backdrop-blur-[0.75em] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] [-webkit-backdrop-filter:blur(0.75em)] group-hover:[transform:translateZ(2em)]"
            style={{
              boxShadow: "0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset",
            }}
          >
            <span
              className="m-auto flex h-[1.5em] w-[1.5em] items-center justify-center"
              aria-hidden="true"
            >
              {item.icon}
            </span>
          </span>

          <span className="absolute left-0 right-0 top-full translate-y-0 whitespace-nowrap text-center text-sm leading-[2] opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:opacity-100 group-hover:[transform:translateY(20%)]">
            {item.label}
          </span>
        </motion.button>
      ))}
    </>
  );
};

export default GlassIcon;
