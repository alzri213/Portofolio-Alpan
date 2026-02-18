import { useState } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import Card from "@/common/components/elements/Card";
import { PersonalBestsTime } from "@/common/types/monkeytype";

interface OverviewItemProps {
  data?: {
    [time: string]: PersonalBestsTime[];
  };
  type?: string;
}

interface ItemProps {
  data: {
    time: string;
    maxWpm: PersonalBestsTime;
  };
  type?: string;
}

interface ItemHoveredProps {
  data: {
    time: string;
    maxWpm: PersonalBestsTime;
  };
  type?: string;
}

const Item = ({ data, type }: ItemProps) => (
  <div className="flex flex-col items-center gap-y-1">
    <span className="flex text-[10px] font-bold uppercase tracking-widest text-neutral-500 whitespace-nowrap">
      {`${data?.time} ${type}`}
    </span>
    <span className="text-3xl font-bold text-blue-600 dark:text-blue-500 drop-shadow-sm leading-none py-1">
      {Math.round(data?.maxWpm.wpm)}
    </span>
    <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-400">
      {`${Math.floor(data?.maxWpm.acc)}% acc`}
    </span>
  </div>
);

const ItemHovered = ({ data, type }: ItemHoveredProps) => (
  <div className="flex w-full flex-col items-center justify-center gap-y-2 p-2">
    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
      {`${data?.time} ${type}`}
    </span>
    <div className="grid w-full grid-cols-2 gap-2 text-center">
      <div className="flex flex-col items-center rounded-lg bg-blue-50/50 p-1.5 dark:bg-blue-900/10">
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
          {Math.round(data?.maxWpm.wpm)}
        </span>
        <span className="text-[9px] font-medium text-blue-400/80 uppercase tracking-wider">WPM</span>
      </div>
      <div className="flex flex-col items-center rounded-lg bg-emerald-50/50 p-1.5 dark:bg-emerald-900/10">
        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
          {Math.floor(data?.maxWpm.acc)}%
        </span>
        <span className="text-[9px] font-medium text-emerald-400/80 uppercase tracking-wider">ACC</span>
      </div>
      <div className="flex flex-col items-center rounded-lg bg-neutral-100/50 p-1.5 dark:bg-neutral-800/50">
        <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
          {Math.floor(data?.maxWpm.raw)}
        </span>
        <span className="text-[9px] font-medium text-neutral-400 uppercase tracking-wider">RAW</span>
      </div>
      <div className="flex flex-col items-center rounded-lg bg-neutral-100/50 p-1.5 dark:bg-neutral-800/50">
        <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
          {Math.floor(data?.maxWpm.consistency)}%
        </span>
        <span className="text-[9px] font-medium text-neutral-400 uppercase tracking-wider">CON</span>
      </div>
    </div>
    <span className="text-[10px] font-medium text-neutral-400">
      {format(data?.maxWpm.timestamp, "dd MMM yyyy")}
    </span>
  </div>
);

const OverviewItem = ({ data, type }: OverviewItemProps) => {
  const [isHover, setIsHover] = useState("");

  const handleHover = (item: string) => {
    setIsHover(item);
  };

  if (data && typeof data === "object") {
    const datas = Object.keys(data).map((time) => {
      const items = data[time];
      const maxWpm = items.reduce((prev, current) =>
        prev.wpm > current.wpm ? prev : current,
      );
      return { time, maxWpm };
    });

    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {datas.map((item) => (
          <Card
            key={item.time}
            className="group relative flex h-[140px] w-full cursor-default items-center justify-center overflow-hidden p-0 transition-all duration-300 hover:shadow-lg dark:hover:border-blue-500/30"
            onMouseEnter={() => handleHover(item.time)}
            onMouseLeave={() => handleHover("")}
          >
            <AnimatePresence mode="wait">
              {isHover === item.time ? (
                <motion.div
                  key="hovered"
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center p-2"
                >
                  <ItemHovered type={type} data={item} />
                </motion.div>
              ) : (
                <motion.div
                  key="normal"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Item type={type} data={item} />
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>
    );
  }
  return null;
};

export default OverviewItem;
