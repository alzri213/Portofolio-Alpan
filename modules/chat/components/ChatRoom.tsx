"use client";

import useSWR from "swr";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

import ChatAuth from "./ChatAuth";
import ChatInput from "./ChatInput";
import ChatList from "./ChatList";
import ChatItemSkeleton from "./ChatItemSkeleton";

import { MessageProps } from "@/common/types/chat";
import { fetcher } from "@/services/fetcher";
import { createClient } from "@/common/utils/client";
import useNotif from "@/hooks/useNotif";

export const ChatRoom = ({ isWidget = false }: { isWidget?: boolean }) => {
  const { data, isLoading, mutate } = useSWR("/api/chat", fetcher);

  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [isReply, setIsReply] = useState({ is_reply: false, name: "", message: "" });
  const [hiddenMessageIds, setHiddenMessageIds] = useState<string[]>([]);

  const { data: session } = useSession();

  const supabase = useMemo(() => createClient(), []);

  const notif = useNotif();

  useEffect(() => {
    const savedHidden = localStorage.getItem("hidden_chats");
    if (savedHidden) {
      setHiddenMessageIds(JSON.parse(savedHidden));
    }
  }, []);

  const handleClickReply = (name: string, message: string) => {
    if (!session?.user) return notif("Please sign in to reply");
    setIsReply({ is_reply: true, name, message });
  };

  const handleCancelReply = () => {
    setIsReply({ is_reply: false, name: "", message: "" });
  };

  const handleSendMessage = async (message: string) => {
    const messageId = uuidv4();
    const newMessageData = {
      id: messageId,
      name: session?.user?.name || "Anonymous",
      email: session?.user?.email || "anonymous@example.com",
      image: session?.user?.image || "",
      message,
      is_reply: isReply.is_reply,
      reply_to: isReply.name,
      reply_message: isReply.message,
      is_show: true,
      created_at: new Date().toISOString(),
    };
    try {
      await axios.post("/api/chat", newMessageData);
      mutate();
      notif("Successfully to send message");
      setIsReply({ is_reply: false, name: "", message: "" });
    } catch (error: any) {
      console.error("Error sending message:", error);
      const errorMessage = error?.response?.data?.message || "Failed to send message";
      notif(errorMessage);
    }
  };

  const handleDeleteMessage = async (id: string, type: "me" | "everyone") => {
    if (type === "me") {
      const updatedHidden = [...hiddenMessageIds, id];
      setHiddenMessageIds(updatedHidden);
      localStorage.setItem("hidden_chats", JSON.stringify(updatedHidden));
      notif("Chat dihapus untuk Anda");
    } else {
      try {
        await axios.delete(`/api/chat/${id}`);
        notif("Chat dihapus untuk semua");
      } catch (error) {
        notif("Gagal menghapus pesan");
      }
    }
  };

  const handlePinMessage = async (id: string, isPinned: boolean) => {
    try {
      await axios.patch(`/api/chat/${id}`, { is_pinned: isPinned });
      mutate();
      notif(isPinned ? "Berhasil menyematkan pesan" : "Berhasil melepas sematan");
    } catch (error) {
      notif("Gagal memperbarui status sematan");
    }
  };

  useEffect(() => {
    if (data) {
      const filtered = data.filter((msg: MessageProps) => !hiddenMessageIds.includes(msg.id));
      setMessages(filtered);
    }
  }, [data, hiddenMessageIds]);

  useEffect(() => {
    const channel = supabase
      .channel("realtime chat")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const newMessage = payload.new as MessageProps;
          if (!hiddenMessageIds.includes(newMessage.id)) {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          }
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "messages",
        },
        () => {
          mutate();
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          setMessages((prevMessages) =>
            prevMessages.filter((msg) => msg.id !== payload.old.id),
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, hiddenMessageIds, mutate]);

  return (
    <>
      {isLoading ? (
        <ChatItemSkeleton />
      ) : (
        <ChatList
          messages={messages}
          onDeleteMessage={handleDeleteMessage}
          onClickReply={handleClickReply}
          onPinMessage={handlePinMessage}
          isWidget={isWidget}
        />
      )}
      {session ? (
        <ChatInput
          onSendMessage={handleSendMessage}
          onCancelReply={handleCancelReply}
          replyName={isReply.name === session?.user?.name ? "Anda" : isReply.name}
          replyMessage={isReply.message}
          isWidget={isWidget}
        />
      ) : (
        <ChatAuth isWidget={isWidget} />
      )}
    </>
  );
};
