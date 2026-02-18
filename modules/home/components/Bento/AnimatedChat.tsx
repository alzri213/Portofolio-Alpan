"use client";

import { motion } from "framer-motion";
import TextType from "@/common/components/elements/TextType";

const AnimatedChat = () => {
  const bubbleLeft = ["Hi!", "Is this your site?", "Looks great!"];
  const bubbleRight = ["Hey!", "Yes, it is", "Thanks a lot!"];

  return (
    <div className="grid w-full grid-cols-2 gap-2 px-2 py-2">
      <motion.div
        className="col-start-1 row-start-1 flex w-full justify-start"
        initial={{ opacity: 0, x: -16, filter: "blur(4px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-full rounded-2xl rounded-tl-none bg-neutral-100 px-4 py-3 shadow-sm dark:bg-neutral-800/80 dark:text-neutral-50 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50">
          <TextType
            typingSpeed={50}
            deletingSpeed={35}
            pauseDuration={2000}
            text={bubbleLeft}
            className="text-[13px] font-medium"
          />
        </div>
      </motion.div>

      <div className="col-start-2 row-start-1" />

      <div className="col-start-1 row-start-2" />

      <motion.div
        className="col-start-2 row-start-2 flex w-full justify-end"
        initial={{ opacity: 0, x: 16, filter: "blur(4px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-full rounded-2xl rounded-tr-none bg-gradient-to-br from-blue-600 to-blue-500 px-4 py-3 text-white shadow-xl shadow-blue-500/20 border border-blue-400/20">
          <TextType
            typingSpeed={50}
            deletingSpeed={35}
            pauseDuration={2000}
            text={bubbleRight}
            className="text-[13px] font-medium"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedChat;
