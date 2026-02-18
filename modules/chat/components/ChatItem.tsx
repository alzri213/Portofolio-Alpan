import Image from "next/image";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { MdAdminPanelSettings as AdminIcon } from "react-icons/md";
import { RiVipCrownFill as CrownIcon } from "react-icons/ri";
import { FiTrash2 as DeleteIcon, FiUser as UserIcon, FiUsers as UsersIcon } from "react-icons/fi";
import { BsFillReplyAllFill as ReplyIcon, BsPinAngleFill as PinIcon } from "react-icons/bs";
import { TbPinFilled, TbPin } from "react-icons/tb";

import ChatTime from "./ChatTime";

import Tooltip from "@/common/components/elements/Tooltip";
import { MessageProps } from "@/common/types/chat";

interface ChatItemProps extends MessageProps {
  isWidget?: boolean;
  onDelete: (id: string, type: "me" | "everyone") => void;
  onReply: (name: string, message: string) => void;
  onPin: (id: string, isPinned: boolean) => void;
}

const ChatItem = ({
  id,
  name,
  email,
  image,
  message,
  created_at,
  reply_to,
  reply_message,
  is_reply,
  is_pinned,
  isWidget,
  onDelete,
  onReply,
  onPin
}: ChatItemProps) => {
  const [isHover, setIsHover] = useState(false);
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);
  const { data: session } = useSession();
  const deleteMenuRef = useRef<HTMLDivElement>(null);

  const ownerEmail = "alfanalifa2008@gmail.com";
  const authorEmail = process.env.NEXT_PUBLIC_AUTHOR_EMAIL;

  const isOwner = email === ownerEmail;
  const isAuthor = email === authorEmail;
  const isMine = session?.user?.email === email;
  const iAmOwner = session?.user?.email === ownerEmail;

  const condition = (isAuthor || isOwner) && !isWidget;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (deleteMenuRef.current && !deleteMenuRef.current.contains(event.target as Node)) {
        setShowDeleteOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={clsx(
        "flex items-center gap-3 px-4 lg:px-8",
        condition && "flex-row-reverse",
      )}
    >
      {image && (
        <Image
          src={image}
          width={40}
          height={40}
          alt={name}
          className="mt-1 rounded-full border dark:border-neutral-800 shrink-0"
        />
      )}

      <div
        className={clsx("space-y-1 w-full", condition ? "flex flex-col items-end" : "flex flex-col items-start")}
      >
        <div
          className={clsx(
            "flex items-center gap-x-2",
            condition && "flex-row-reverse",
          )}
        >
          <div className={clsx(
            "text-sm font-bold",
            isOwner ? "text-amber-500 dark:text-amber-400" : "dark:text-neutral-200"
          )}>
            {name}
          </div>
          {isOwner && (
            <div className="flex items-center gap-[2px] rounded-full bg-amber-500/10 px-1.5 py-0.5 font-bold text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-500/20 shadow-sm">
              <CrownIcon size={12} className="animate-pulse" />
              <span className="text-[9px] uppercase tracking-wider">Owner</span>
            </div>
          )}
          {!isOwner && isAuthor && (
            <div className="flex items-center gap-[2px] rounded-full bg-blue-500/10 px-1.5 py-0.5 font-bold text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
              <AdminIcon size={12} />
              <span className="text-[9px] uppercase tracking-wider">Author</span>
            </div>
          )}
          {is_pinned && (
            <div className="flex items-center gap-1 text-[10px] text-amber-500 font-medium">
              <PinIcon size={10} className="rotate-[30deg]" />
              <span>Tersemat</span>
            </div>
          )}
          <div className="hidden md:flex">
            <ChatTime datetime={created_at} />
          </div>
        </div>
        <div
          className={clsx(
            "group relative flex w-fit items-center gap-3",
            condition && "flex-row-reverse ml-auto",
          )}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div
            className={clsx(
              "absolute top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 transition-colors",
              is_pinned ? "bg-amber-50 dark:bg-amber-950/20" : "bg-neutral-200 dark:bg-neutral-800",
              condition ? "-right-1" : "-left-1",
              condition && !is_pinned && "bg-blue-600"
            )}
          />

          <div
            className={clsx(
              "relative rounded-2xl px-4 py-2.5 shadow-sm transition-all overflow-hidden",
              is_pinned && "border border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/10",
              !is_pinned && (condition
                ? "bg-blue-600 text-white dark:bg-blue-600"
                : "bg-neutral-200 group-hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-50 dark:group-hover:bg-neutral-700")
            )}
          >
            {is_reply && (
              <div
                className={clsx(
                  "mb-2 border-l-4 rounded-md p-2 text-xs",
                  condition
                    ? "bg-blue-700/50 border-blue-300 text-blue-100"
                    : "bg-neutral-300/50 border-emerald-500 text-neutral-600 dark:bg-neutral-900/50 dark:text-neutral-400"
                )}
              >
                <div className="font-bold mb-1 truncate text-left">
                  {reply_to === session?.user?.name ? "Anda" : reply_to}
                </div>
                <div className="truncate opacity-80 line-clamp-1 italic text-left">
                  {reply_message}
                </div>
              </div>
            )}
            <p className={clsx(
              "text-[13px] leading-relaxed break-words max-w-[250px] sm:max-w-md",
              is_pinned && "text-neutral-800 dark:text-amber-100"
            )}>
              {message}
            </p>
          </div>

          <div className={clsx("flex items-center gap-1", condition && "flex-row-reverse")}>
            {isHover && !showDeleteOptions && (
              <div className="flex items-center gap-1">
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onReply(name, message)}
                  className="rounded-full bg-neutral-100 p-1.5 text-neutral-500 hover:bg-blue-500 hover:text-white dark:bg-neutral-800 dark:hover:bg-blue-600 shadow-sm"
                >
                  <Tooltip title="Reply">
                    <ReplyIcon size={14} className={clsx(condition && "scale-x-[-1]")} />
                  </Tooltip>
                </motion.button>

                {iAmOwner && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onPin(id, !is_pinned)}
                    className={clsx(
                      "rounded-full p-1.5 shadow-sm transition-colors",
                      is_pinned ? "bg-amber-500 text-white" : "bg-neutral-100 text-neutral-500 hover:bg-amber-500 hover:text-white dark:bg-neutral-800 dark:hover:bg-amber-600"
                    )}
                  >
                    <Tooltip title={is_pinned ? "Unpin" : "Pin"}>
                      {is_pinned ? <TbPinFilled size={14} /> : <TbPin size={14} />}
                    </Tooltip>
                  </motion.button>
                )}

                {(isMine || iAmOwner) && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowDeleteOptions(true)}
                    className="rounded-full bg-neutral-100 p-1.5 text-neutral-500 hover:bg-red-500 hover:text-white dark:bg-neutral-800 dark:hover:bg-red-600 shadow-sm"
                  >
                    <Tooltip title="Delete">
                      <DeleteIcon size={14} />
                    </Tooltip>
                  </motion.button>
                )}
              </div>
            )}

            <AnimatePresence>
              {showDeleteOptions && (
                <motion.div
                  ref={deleteMenuRef}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className={clsx(
                    "absolute top-full z-[100] mt-2 flex flex-col gap-1 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-2xl dark:border-neutral-700 dark:bg-neutral-900",
                    condition ? "right-0" : "left-0"
                  )}
                >
                  <button
                    onClick={() => {
                      onDelete(id, "me");
                      setShowDeleteOptions(false);
                    }}
                    className="flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-left text-xs font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <UserIcon size={14} className="text-neutral-500" />
                    <span>Hapus untuk saya</span>
                  </button>
                  {(isMine || iAmOwner) && (
                    <button
                      onClick={() => {
                        onDelete(id, "everyone");
                        setShowDeleteOptions(false);
                      }}
                      className="flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-left text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                      <UsersIcon size={14} />
                      <span>Hapus untuk semua</span>
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex md:hidden">
          <ChatTime datetime={created_at} />
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
