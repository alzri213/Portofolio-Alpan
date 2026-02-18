"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MdArrowOutward as ArrowIcon } from "react-icons/md";
import { useLocale, useTranslations } from "next-intl";

import { SocialMediaProps } from "@/common/types/socialMedia";

const ContactCard = ({
  title,
  name,
  href,
  icon,
  backgroundIcon,
  colSpan,
}: SocialMediaProps) => {
  const t = useTranslations("ContactPage");
  const locale = useLocale();

  return (
    <motion.div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-500 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:border-blue-500/30 ${colSpan}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -6,
        transition: { duration: 0.4 },
      }}
    >
      <div className="absolute -right-8 -top-8 rotate-12 text-neutral-500/5 transition-transform duration-1000 group-hover:rotate-[24deg] group-hover:scale-110">
        {backgroundIcon}
      </div>

      <div className="z-10 flex flex-col gap-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
          {icon}
        </div>

        <div className="space-y-1">
          <h4 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            {t(`social_media.${name}.title`)}
          </h4>
          <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
            {t(`social_media.${name}.description`)}
          </p>
        </div>
      </div>

      <div className="z-10 mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
        <Link
          href={href}
          target="_blank"
          className="group/btn flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 transition-all hover:gap-3"
        >
          <span>{locale == "en" ? "Let's connect" : "Ayo terhubung"}</span>
          <ArrowIcon
            size={18}
            className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
          />
        </Link>
      </div>
    </motion.div>
  );
};

export default ContactCard;
