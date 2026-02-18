"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { GiExtraTime as CTAIcon } from "react-icons/gi";
import { GiTimeTrap as ServiceIcon } from "react-icons/gi";

import Card from "@/common/components/elements/Card";
import Button from "@/common/components/elements/Button";
import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";

const Services = () => {
  const t = useTranslations("HomePage.services");

  const router = useRouter();

  return (
    <section className="space-y-5">
      <div className="space-y-3">
        <SectionHeading title={t("title")} icon={<ServiceIcon size={24} />} />
        <SectionSubHeading>{t("sub_title")}</SectionSubHeading>
      </div>
      <Card className="space-y-4 p-8">
        <div className="flex items-center gap-4">
          <motion.div
            className="rounded-2xl bg-blue-500/10 p-3 dark:bg-blue-500/20 shadow-inner"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <CTAIcon size={32} className="text-blue-600 dark:text-blue-400" />
          </motion.div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              {t("cta.title")}
            </h3>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Transforming ideas into reality.
            </p>
          </div>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
          {t("cta.sub_title")}
        </p>
        <div className="pt-2">
          <Button
            className="group relative overflow-hidden bg-blue-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/25"
            onClick={() => router.push("/contact")}
          >
            <span className="relative z-10">{t("cta.button")}</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-400 to-transparent transition-transform duration-500 group-hover:translate-x-0" />
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default Services;
