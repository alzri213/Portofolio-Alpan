"use client";

import { motion } from "framer-motion";
import BentoCard from "./BentoCard";
import { SiBento as BentoIcon } from "react-icons/si";

import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";
import { BENTO } from "@/common/constants/bento";

const BentoGrid = () => {
  const filteredBento = BENTO.filter((item) => item?.isShow);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className="space-y-5">
      <div className="space-y-3">
        <SectionHeading
          title={"My Creative Journey"}
          icon={<BentoIcon size={24} />}
        />
        <SectionSubHeading>
          {
            "A curated overview of what I build, how I think, and where I add value."
          }
        </SectionSubHeading>
      </div>

      <motion.div
        className="grid grid-cols-1 gap-3 md:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {filteredBento.map((item, index) => (
          <BentoCard key={index} {...item} index={index} />
        ))}
      </motion.div>
    </section>
  );
};

export default BentoGrid;
