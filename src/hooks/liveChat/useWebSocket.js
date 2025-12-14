import { config } from "@/config";
import { useEffect, useRef } from "react";

export default function useWebSocket({
  user,
  socketUrl,
  siteFavicon,
  setChatHistory,
  setSocketInfo,
  setIsAdminTyping,
}) {
  const ws = useRef(null);

  useEffect(() => {
    if (!user?.id || !socketUrl) return;

    (() => {
      try {
        ws.current = new WebSocket(socketUrl);

        ws.current.onopen = () => {
          console.log("WebSocket connection established");
          ws.current.send(
            JSON.stringify({
              type: "init",
              data: {
                userId: user?.id,
                isAdmin: false,
              },
            })
          );
        };

        ws.current.onmessage = (event) => {
          const message = JSON.parse(event.data);

          switch (message.type) {
            case "message-update":
              const conversationId = message.data?.conversation_id;
              if (conversationId) {
                setSocketInfo((prev) => ({ ...prev, conversationId }));
              }
              setChatHistory((prev) => {
                return prev.map((item) => {
                  if (item.message_id === message.data?.message_id) {
                    return { ...item, status: message.data.status };
                  }
                  return item;
                });
              });
              break;
            case "message":
              setIsAdminTyping(false);
              setChatHistory((prev) => [...prev, message.data]);

              if ("Notification" in window) {
                new Notification("Workdear", {
                  body: message.data.message,
                  icon: config.fileBaseUrl + siteFavicon,
                });
              }
              break;
            case "read_messages":
              setChatHistory((prev) => {
                return prev.map((item) => {
                  if (
                    message.data?.unreadmessagesId?.includes(item.message_id)
                  ) {
                    return { ...item, status: "seen" };
                  }
                  return item;
                });
              });
              break;
            case "typing":
              setIsAdminTyping(message.data?.is_typing);
              break;
            default:
              break;
          }
        };

        ws.current.onclose = () => {
          console.log("WebSocket connection closed");
        };
      } catch (error) {
        console.error("WebSocket error:", error);
      }
    })();

    return () => {
      ws.current?.close();
    };
  }, [
    user,
    socketUrl,
    siteFavicon,
    setChatHistory,
    setSocketInfo,
    setIsAdminTyping,
  ]);

  return ws;
}
