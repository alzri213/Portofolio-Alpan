import clsx from "clsx";
import Link from "next/link";
import { MdVerified as VerifiedIcon } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

import useIsMobile from "@/hooks/useIsMobile";
import { useMenu } from "@/common/stores/menu";

import MobileMenuButton from "./sidebar/MobileMenuButton";
import ThemeToggle from "../elements/ThemeToggle";
import MobileMenu from "./sidebar/MobileMenu";
import Tooltip from "../elements/Tooltip";
import Image from "../elements/Image";

const MobileHeader = () => {
  const isMobile = useIsMobile();
  const { isOpen, toggleMenu } = useMenu();
  const imageSize = isMobile ? 40 : 100;

  return (
    <div className="sticky top-0 z-50 flex flex-col border-b border-neutral-200 bg-white/80 px-4 py-3 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/80 lg:hidden">
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-3 overflow-hidden">
          <div className="relative z-10 flex-shrink-0 rounded-full border-2 border-white shadow-lg dark:border-neutral-800">
            <Image
              src={"/images/profile/fikri-main.jpg"}
              alt="profile"
              width={60}
              height={60}
              className="aspect-square rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0 justify-center">
            <div className="flex items-center gap-1.5">
              <Link href="/" passHref className="truncate">
                <h2 className="truncate text-base font-bold text-neutral-800 dark:text-neutral-100">
                  Fikri Alifa Alfan R.
                </h2>
              </Link>
              <Tooltip title="Verified">
                <VerifiedIcon size={16} className="text-blue-500 flex-shrink-0" />
              </Tooltip>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 truncate">
              <span>Software Engineer</span>
              <span className="h-0.5 w-0.5 rounded-full bg-neutral-400" />
              <span>@Alpan</span>
            </div>
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center gap-3">
          <ThemeToggle />
          <MobileMenuButton expandMenu={isOpen} setExpandMenu={toggleMenu} />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <MobileMenu />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileHeader;
