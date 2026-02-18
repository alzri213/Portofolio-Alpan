"use client";

import { motion } from "framer-motion";
import Codewars from "./Codewars";
import Monkeytype from "./Monkeytype";
import CodingActive from "./CodingActive";
import Contributions from "./Contributions";
import Umami from "./Umami";
import StatsOverview from "./StatsOverview";

import { GITHUB_ACCOUNTS } from "@/common/constants/github";
import { CODEWARS_ACCOUNT } from "@/common/constants/codewars";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const Dashboard = () => {
  return (
    <motion.div
      className="mt-6 flex flex-col gap-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <StatsOverview />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Umami />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Contributions endpoint={GITHUB_ACCOUNTS.endpoint} />
      </motion.div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <motion.div variants={itemVariants}>
          <CodingActive />
        </motion.div>

        <div className="flex flex-col gap-10">
          <motion.div variants={itemVariants}>
            <Codewars endpoint={CODEWARS_ACCOUNT.endpoint} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Monkeytype />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
