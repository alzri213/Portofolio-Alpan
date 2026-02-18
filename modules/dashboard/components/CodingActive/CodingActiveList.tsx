"use client";

import { useTranslations } from "next-intl";
import Card from "@/common/components/elements/Card";
import Progress from "./Progress";

interface ItemProps {
  name: string;
  hours: number;
  minutes: number;
  percent?: number;
}

interface CodingActiveListProps {
  data?: {
    languages?: ItemProps[];
    categories?: ItemProps[];
  };
}

const CodingActiveList = ({ data }: CodingActiveListProps) => {
  const t = useTranslations("DashboardPage.wakatime");

  if (!data) return null;

  return (
    <Card className="flex flex-col gap-y-6 px-6 py-5">
      <div className="space-y-1">
        <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          {t("languages")}
        </p>
        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />
      </div>

      <ul className="grid grid-cols-1 gap-x-12 gap-y-2 sm:grid-cols-2">
        {data?.languages?.map((subItem) => (
          <li key={subItem?.name}>
            <Progress
              data={subItem}
              className="bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.2)] dark:from-blue-500 dark:to-blue-300"
            />
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default CodingActiveList;
