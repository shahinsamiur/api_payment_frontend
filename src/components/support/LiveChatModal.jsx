"use client";
import useAutoScroll from "@/hooks/liveChat/useAutoScroll";
import useMarkAsRead from "@/hooks/liveChat/useMarkAsRead";
import { useRef } from "react";
import { useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import LoginPrompt from "./LoginPrompt";
import MessagesList from "./MessagesList";

export default function LiveChatModal(props) {
  const {
    ref,
    setShowChat,
    socketInfo,
    chatHistory,
    ws,
    isLoading,
    setChatHistory,
    isAdminTyping,
  } = props;

  const { user } = useSelector((state) => state.user);
  const lastElement = useRef(null);

  useAutoScroll({
    lastElement,
    dependencies: [chatHistory, isAdminTyping],
  });

  useMarkAsRead({
    chatHistory,
    ws,
    socketInfo,
    user,
  });

  if (!user) {
    return (
      <div
        ref={ref}
        className="w-[370px] md:w-[400px] h-[500px] bg-background rounded-2xl shadow-lg flex flex-col overflow-hidden"
      >
        <ChatHeader setShowChat={setShowChat} />
        <LoginPrompt />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="w-[370px] md:w-[400px] h-[500px] bg-background rounded-2xl shadow-lg flex flex-col overflow-hidden"
    >
      <ChatHeader setShowChat={setShowChat} />
      <MessagesList
        chatHistory={chatHistory}
        isAdminTyping={isAdminTyping}
        isLoading={isLoading}
        lastElement={lastElement}
      />
      <ChatInput
        ws={ws}
        socketInfo={socketInfo}
        setChatHistory={setChatHistory}
        user={user}
        chatHistory={chatHistory}
      />
    </div>
  );
}
