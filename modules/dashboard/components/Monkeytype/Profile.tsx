import Image from "next/image";
import { differenceInDays, format } from "date-fns";
import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";

import Tooltip from "@/common/components/elements/Tooltip";
import Card from "@/common/components/elements/Card";
import { MonkeytypeData } from "@/common/types/monkeytype";
import { METADATA } from "@/common/constants/metadata";

interface ProfileProps {
  data: MonkeytypeData;
}

interface ItemProps {
  label?: string;
  value?: number | string;
}

const Item = ({ label, value }: ItemProps) => (
  <div className="flex flex-col items-center">
    <span className="text-xs dark:text-neutral-500">{label}</span>
    <span className="text-2xl font-bold dark:text-green-600 tracking-tighter">{value}</span>
  </div>
);

const Profile = ({ data }: ProfileProps) => {
  const t = useTranslations("DashboardPage.monkeytype");

  const date = new Date(data?.addedAt);
  const endDate = new Date();
  const durationDays = differenceInDays(endDate, date);

  const timeTyping = data?.typingStats.timeTyping;
  const minutes = Math.floor(timeTyping / 60);
  const seconds = Math.round(timeTyping % 60);

  let xp = data?.xp;
  let level = 1;
  let xpNeeded = 100;

  while (xp >= xpNeeded) {
    xp -= xpNeeded;
    xpNeeded += 49;
    level++;
  }

  const xpToNextLevel = level * 49 + 100;
  const difference = (xp / xpToNextLevel) * 100;
  const remainder = xpToNextLevel - xp;

  const progressVariants: Variants = {
    initial: { width: 0 },
    animate: {
      width: `${Math.round(difference)}%`,
      transition: { delay: 0.8, duration: 1, ease: "circOut" },
    },
  };

  const XpProgress = () => (
    <div className="flex w-full flex-col gap-2 mt-2">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-bold text-neutral-500">
        <Tooltip title={`${data?.xp} ${t("total_xp")}`}>
          <span className="text-green-600">Level {level}</span>
        </Tooltip>
        <Tooltip title={`${remainder} xp until next level`}>
          <span>{xp} / {Math.floor(xpToNextLevel)} XP</span>
        </Tooltip>
      </div>

      <div className="relative h-2.5 w-full rounded-full bg-neutral-200 dark:bg-neutral-800 p-0.5 shadow-inner">
        <motion.span
          initial="initial"
          animate="animate"
          variants={progressVariants}
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
        />
      </div>
    </div>
  );

  return (
    <Card className="flex flex-col gap-6 p-5 lg:flex-row lg:items-center">
      <div className="flex flex-col gap-4 w-full lg:min-w-[300px] lg:w-auto">
        <div className="flex items-center gap-4">
          <div className="relative group flex-shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <Image
              src={METADATA.profile}
              width={80}
              height={80}
              alt={METADATA.creator}
              className="relative aspect-square rounded-full border-2 border-white dark:border-neutral-800 object-cover transition-all duration-300 lg:hover:scale-105"
            />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-2xl font-bold text-green-600 tracking-tight truncate">
              {data?.name}
            </span>
            <div className="flex flex-col gap-0.5">
              <Tooltip title={`${durationDays} ${t("days_ago")}`}>
                <span className="text-[11px] font-medium text-neutral-500 truncate">
                  {t("joined")} {format(date, "dd MMM yyyy")}
                </span>
              </Tooltip>
              <Tooltip
                title={`${t("current_streak")}: ${data?.maxStreak} ${t("unit_days")}`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse flex-shrink-0" />
                  <span className="text-[11px] font-bold text-orange-600 dark:text-orange-500 uppercase tracking-tighter truncate">
                    {t("current_streak")}: {data?.streak} {t("unit_days")}
                  </span>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>

        <XpProgress />
      </div>

      <div className="hidden h-24 w-[1px] bg-neutral-200 dark:bg-neutral-800 lg:block mx-2 xl:mx-4 flex-shrink-0" />

      <div className="grid grid-cols-1 gap-4 flex-grow sm:grid-cols-3">
        <Item
          label={t("title_test_started")}
          value={data?.typingStats.startedTests || "0"}
        />
        <Item
          label={t("title_test_completed")}
          value={data?.typingStats.completedTests || "0"}
        />
        <Item
          label={t("title_time_typing")}
          value={
            format(new Date(0, 0, 0, 0, minutes, seconds), "HH:mm:ss") || "00:00:00"
          }
        />
      </div>
    </Card>
  );
};

export default Profile;
