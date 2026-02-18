import Link from "next/link";
import { MdVerified as VerifiedIcon } from "react-icons/md";
import clsx from "clsx";

import Tooltip from "../../elements/Tooltip";
import Image from "../../elements/Image";
import Status from "../../elements/Status";
import ThemeToggle from "../../elements/ThemeToggle";
import LocaleSwitcher from "./LocaleSwitcher";

interface ProfileHeaderProps {
  expandMenu: boolean;
  imageSize: number;
}

const ProfileHeader = ({ expandMenu, imageSize }: ProfileHeaderProps) => {
  return (
    <div
      className={clsx(
        "flex w-full flex-grow items-center gap-4 lg:flex-col lg:items-start lg:gap-0.5",
        expandMenu && "flex-col !items-start",
      )}
    >
      {/* Profile image with animated border */}
      <div className="relative group/avatar">
        <div className="absolute -inset-[3px] rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 opacity-0 blur-[2px] transition-opacity duration-500 group-hover/avatar:opacity-70 lg:opacity-40" />
        <Image
          src={"/images/profile/fikri-main.jpg"}
          width={expandMenu ? 80 : imageSize * 0.9}
          height={expandMenu ? 80 : imageSize * 0.9}
          alt="Fikri Alifa Alfan R."
          className="relative aspect-square border-2 border-neutral-300 object-cover transition-all duration-500 dark:border-neutral-700 lg:hover:scale-105"
          rounded="rounded-full"
        />
      </div>

      <div className="mt-1 flex items-center gap-2 lg:mt-4">
        <Link href="/" passHref>
          <h2 className="flex-grow text-lg font-medium transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400 lg:text-xl">
            Fikri Alifa Alfan R.
          </h2>
        </Link>

        <Tooltip title="Verified">
          <div className="relative">
            <VerifiedIcon size={18} className="text-blue-400 transition-transform duration-300 hover:scale-110" />
            <div className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-20" style={{ animationDuration: '3s' }} />
          </div>
        </Tooltip>
      </div>

      <div className="hidden text-sm text-neutral-500 transition-all duration-300 hover:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-400 lg:flex">
        @Alpan
      </div>

      <div className="hidden w-full items-center justify-between lg:mt-2 lg:flex">
        <Status />
        <div className="flex gap-4">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
