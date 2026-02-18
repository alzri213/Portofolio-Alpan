"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import Container from "@/common/components/elements/Container";

const NotFound = () => {
  const t = useTranslations("NotFoundPage");

  return (
    <Container
      data-aos="fade-up"
      className="flex h-full flex-col items-center justify-center gap-y-6 transition-all duration-300"
    >
      <div className="relative">
        <h1 className="gradient-text-animated text-8xl font-bold tracking-tight">
          404
        </h1>
        <div className="absolute inset-0 text-8xl font-bold tracking-tight text-neutral-200 blur-2xl dark:text-neutral-700">
          404
        </div>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        {t("title")}
      </p>
      <Link
        href="/"
        className="group relative overflow-hidden rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 dark:border-neutral-700 dark:hover:border-cyan-500/50"
      >
        <span className="relative z-10">{t("button")}</span>
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan-500/10 to-violet-500/10 transition-transform duration-500 group-hover:translate-x-0" />
      </Link>
    </Container>
  );
};

export default NotFound;
