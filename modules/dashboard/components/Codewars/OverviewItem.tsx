import AnimateCounter from "@/common/components/elements/AnimateCounter";
import Card from "@/common/components/elements/Card";

interface OverviewItemProps {
  label: string;
  value: number | string;
  unit?: string;
}

const OverviewItem = ({ label, value, unit = "" }: OverviewItemProps) => (
  <Card className="flex flex-col items-center justify-center p-4 text-center">
    <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
      {label}
    </span>
    {typeof value === "string" ? (
      <span className="text-lg font-bold text-blue-600 dark:text-blue-500 truncate w-full">
        {value}
      </span>
    ) : (
      <div className="flex items-baseline gap-1">
        <AnimateCounter
          className="text-2xl font-bold text-blue-600 dark:text-blue-500 lg:text-3xl"
          total={value}
        />
        {unit && (
          <span className="text-xs font-semibold text-neutral-400">
            {unit}
          </span>
        )}
      </div>
    )}
  </Card>
);

export default OverviewItem;
