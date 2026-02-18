"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineArrowSmRight as ViewIcon } from "react-icons/hi";
import { useTranslations } from "next-intl";
import { TbPinnedFilled as PinIcon } from "react-icons/tb";

import Image from "@/common/components/elements/Image";
import { ProjectItem } from "@/common/types/projects";
import { STACKSMARQUE } from "@/common/constants/stacksMarque";
import SpotlightCard from "@/common/components/elements/SpotlightCard";

const ProjectCard = ({
  title,
  slug,
  description,
  image,
  stacks,
  is_featured,
}: ProjectItem) => {
  const t = useTranslations("ProjectsPage");

  const trimmedContent =
    description.slice(0, 85) + (description.length > 85 ? "..." : "");

  return (
    <Link href={`/projects/${slug}`}>
      <SpotlightCard className="group relative cursor-pointer">
        {is_featured && (
          <motion.div
            className="absolute right-0 top-0 z-10 flex items-center gap-x-1 rounded-bl-lg rounded-tr-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-500/20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <PinIcon size={14} className="animate-wiggle" />
            <span>Featured</span>
          </motion.div>
        )}
        <div className="relative overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={450}
            height={200}
            className="h-full w-full rounded-t-xl object-cover transition-transform duration-700 group-hover:scale-105 md:w-auto"
          />
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center gap-2 rounded-t-xl bg-blue-900/40 text-sm font-semibold text-white opacity-0 backdrop-blur-[2px] transition-all duration-500 group-hover:opacity-100">
            <span>{t("view_project")}</span>
            <ViewIcon size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
        <div className="space-y-3 p-5">
          <h3 className="cursor-pointer text-lg font-bold tracking-tight text-neutral-800 transition-all duration-300 group-hover:text-blue-600 dark:text-neutral-200 dark:group-hover:text-blue-400">
            {title}
          </h3>
          <p className="text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400">
            {trimmedContent}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {stacks.map((stack: string, index: number) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.2,
                  rotate: index % 2 === 0 ? 5 : -5,
                  transition: { type: "spring", stiffness: 400 },
                }}
              >
                {STACKSMARQUE[stack]}
              </motion.div>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </Link>
  );
};

export default ProjectCard;
