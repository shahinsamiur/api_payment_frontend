"use client";
import { config } from "@/config";
import useChatHistory from "@/hooks/liveChat/useChatHistory";
import useWebSocket from "@/hooks/liveChat/useWebSocket";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useSelector } from "react-redux";
import ChatButton from "./ChatButton";
import LiveChatModal from "./LiveChatModal";

function ChatService({ showChat, setShowChat }) {
  const { user } = useSelector((state) => state.user);
  const {
    generalData: { site_favicon },
  } = useSelector((state) => state.settings);

  const chatRef = useOutsideClick(() => {
    setShowChat(false);
  });

  const {
    chatHistory,
    unreadMessageCount,
    socketInfo,
    isAdminTyping,
    isLoading,
    setChatHistory,
    setIsAdminTyping,
    setIsLoading,
    setSocketInfo,
  } = useChatHistory(user?.id);

  const ws = useWebSocket({
    user,
    socketUrl: config.socketUrl,
    siteFavicon: site_favicon,
    setChatHistory: setChatHistory,
    setIsAdminTyping: setIsAdminTyping,
    setSocketInfo: setSocketInfo,
    setIsLoading: setIsLoading,
  });

  return (
    <div className="fixed bottom-14 right-2 md:right-14">
      {showChat && (
        <LiveChatModal
          ref={chatRef}
          setShowChat={setShowChat}
          socketInfo={socketInfo}
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
          ws={ws}
          isLoading={isLoading}
          isAdminTyping={isAdminTyping}
        />
      )}
      {!showChat && (
        <ChatButton
          setShowChat={setShowChat}
          unreadMessageCount={unreadMessageCount}
        />
      )}
    </div>
  );
}

export default ChatService;
