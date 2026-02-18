import { useTranslations } from "next-intl";

import OverviewItem from "./OverviewItem";

interface OverviewProps {
  data: any;
}

const Overview = ({ data }: OverviewProps) => {
  const t = useTranslations("DashboardPage.monkeytype");
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-widest">{t("unit_time")} Stats</h3>
        <OverviewItem data={data.personalBests.time} type={t("unit_time")} />
      </div>
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-widest">{t("unit_words")} Stats</h3>
        <OverviewItem data={data.personalBests.words} type={t("unit_words")} />
      </div>
    </div>
  );
};

export default Overview;
