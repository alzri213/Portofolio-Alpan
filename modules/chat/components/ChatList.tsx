import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsPinAngleFill as PinIcon } from "react-icons/bs";

import ChatItem from "./ChatItem";

import { ChatListProps, MessageProps } from "@/common/types/chat";

interface ChatListPropsNew extends ChatListProps {
  onDeleteMessage: (id: string, type: "me" | "everyone") => void;
  onClickReply: (name: string, message: string) => void;
  onPinMessage: (id: string, isPinned: boolean) => void;
  isWidget?: boolean;
}

const ChatList = ({
  messages,
  isWidget,
  onDeleteMessage,
  onClickReply,
  onPinMessage
}: ChatListPropsNew) => {
  const chatListRef = useRef<HTMLDivElement | null>(null);
  const [hasScrolledUp, setHasScrolledUp] = useState(false);
  const [chatListHeight, setChatListHeight] = useState('500px');

  const pinnedMessages = messages.filter(msg => msg.is_pinned);
  const regularMessages = messages.filter(msg => !msg.is_pinned);

  useEffect(() => {
    const handleScroll = () => {
      if (chatListRef.current) {
        const isScrolledToBottom =
          chatListRef.current.scrollHeight - chatListRef.current.clientHeight <=
          chatListRef.current.scrollTop + 5;

        if (isScrolledToBottom) {
          setHasScrolledUp(false);
        } else {
          setHasScrolledUp(true);
        }
      }
    };

    chatListRef.current?.addEventListener("scroll", handleScroll);

    const currentChatListRef = chatListRef.current;

    return () => {
      currentChatListRef?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (chatListRef.current && !hasScrolledUp) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages, hasScrolledUp]);

  useEffect(() => {
    const handleResize = () => {
      const newHeight = isWidget ? '500px' : `${window.innerHeight - 360}px`;
      setChatListHeight(newHeight);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isWidget]);

  return (
    <div className="flex flex-col gap-2">
      <AnimatePresence>
        {pinnedMessages.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sticky top-0 z-20 mx-4 lg:mx-8 mb-2 overflow-hidden"
          >
            <div className="bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/20 rounded-xl p-3 backdrop-blur-md shadow-sm">
              <div className="flex items-center gap-2 mb-2 px-1">
                <PinIcon className="text-amber-500 rotate-45" size={14} />
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase">Pesan Tersemat</span>
              </div>
              <div className="space-y-3">
                {pinnedMessages.map((chat) => (
                  <ChatItem
                    key={chat.id}
                    onDelete={onDeleteMessage}
                    onReply={onClickReply}
                    onPin={onPinMessage}
                    isWidget={isWidget}
                    {...chat}
                  />
                ))}
              </div>
            </div>
            <div className="h-4 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={chatListRef}
        style={{ height: chatListHeight }}
        className="space-y-5 overflow-y-auto py-4 scroll-smooth"
      >
        {regularMessages?.map((chat) => (
          <ChatItem
            key={chat.id}
            onDelete={onDeleteMessage}
            onReply={onClickReply}
            onPin={onPinMessage}
            isWidget={isWidget}
            {...chat}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
