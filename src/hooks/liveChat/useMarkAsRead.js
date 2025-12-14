import { useEffect } from "react";

export default function useMarkAsRead({ chatHistory, ws, socketInfo, user }) {
  useEffect(() => {
    if (chatHistory && chatHistory.length > 0) {
      const unreadmessagesId = chatHistory.reduce((ids, message) => {
        if (
          message.status === "send" &&
          message.message_id != null &&
          message.sender_type === "admin"
        ) {
          ids.push(message.message_id);
        }
        return ids;
      }, []);

      if (unreadmessagesId.length && ws?.current?.readyState === 1) {
        const adminId = chatHistory
          ? [...chatHistory]
              .reverse()
              .find((msg) => msg.sender_type === "admin")?.sender_id
          : null;
        ws.current.send(
          JSON.stringify({
            type: "unread_messages",
            data: {
              conversation_id: socketInfo.conversationId,
              unreadmessagesId,
              user_id: adminId,
              sender_id: user?.id,
            },
          })
        );
      }
    }
  }, [chatHistory, ws, socketInfo, user]);
}
