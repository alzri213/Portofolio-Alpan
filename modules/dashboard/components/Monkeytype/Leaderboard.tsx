import { useTranslations } from "next-intl";
import { RiVipCrown2Fill } from "react-icons/ri";

import Card from "@/common/components/elements/Card";
import Tooltip from "@/common/components/elements/Tooltip";
import { convertToOrdinal } from "@/common/helpers";
import { MonkeytypeData } from "@/common/types/monkeytype";

interface LeaderboardProps {
  data: MonkeytypeData;
}

interface ItemProps {
  label: string;
  value: string;
  percent?: string;
}

const Leaderboard = ({ data }: LeaderboardProps) => {
  const t = useTranslations("DashboardPage.monkeytype");

  const datas = data?.allTimeLbs?.time ? Object.values(data.allTimeLbs.time) : [];

  const Item = ({ label, value, percent }: ItemProps) => {
    return (
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end gap-y-0.5">
          <span className="text-sm dark:text-neutral-500">
            {label} {t("unit_seconds")}
          </span>
          {percent ? (
            <span className="text-xs dark:text-neutral-500">
              {t("top")} {percent}%
            </span>
          ) : null}
        </div>
        <span className="text-2xl dark:text-green-600">{value}</span>
      </div>
    );
  };

  return (
    <Card className="flex flex-col items-center justify-between gap-4 p-5 sm:flex-row">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-500">
          <RiVipCrown2Fill size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
            {t("title_leaderboard")}
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Global ranking stats
          </span>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-8">
        {datas.map((data, index) => {
          const percent = (data?.english?.rank / data?.english?.count) * 100;
          return (
            <Tooltip
              key={index}
              title={`Top ${percent.toFixed(2)}% of ${data?.english?.count?.toLocaleString()} users`}
            >
              <div className="flex items-center justify-between gap-4 rounded-lg border border-neutral-100 bg-neutral-50 px-4 py-2 dark:border-neutral-800 dark:bg-neutral-900/50 sm:justify-start sm:border-0 sm:bg-transparent sm:p-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-200 text-xs font-bold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                    {index == 0 ? "15s" : "60s"}
                  </div>
                  <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    Rank
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                    #{data?.english?.rank}
                  </span>
                  <span className="text-[10px] font-medium text-neutral-500">
                    / {convertToOrdinal(data?.english?.rank)}
                  </span>
                </div>
              </div>
            </Tooltip>
          );
        })}
      </div>
    </Card>
  );
};

export default Leaderboard;
