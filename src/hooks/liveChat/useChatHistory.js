import { useGetMessageQuery } from "@/store/features/liveSupport";
import { useEffect, useState } from "react";

export default function useChatHistory(userId) {
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [socketInfo, setSocketInfo] = useState({
    conversationId: null,
    adminId: null,
    isAdmin: false,
  });
  const [isAdminTyping, setIsAdminTyping] = useState(false);

  const { data } = useGetMessageQuery(userId, {
    skip: !userId,
  });

  // Fetch chat history and initialize the messages
  useEffect(() => {
    if (data && data?.data?.messages?.length > 0) {
      setChatHistory(data.data.messages);
      setSocketInfo((prev) => ({
        ...prev,
        conversationId: data.data._id,
        adminId: data.data.admin_id,
      }));
      setIsLoading(false);
    }
  }, [data]);

  // calculate the unseen messages with status "send"
  useEffect(() => {
    if (!chatHistory) return;
    const unseenMessages = chatHistory?.filter(
      (message) => message.status === "send" && message.sender_type === "admin"
    );
    setUnreadMessageCount(unseenMessages.length);
  }, [chatHistory]);

  return {
    chatHistory,
    setChatHistory,
    unreadMessageCount,
    socketInfo,
    isAdminTyping,
    setIsAdminTyping,
    isLoading,
    setIsLoading,
    setSocketInfo,
  };
}
