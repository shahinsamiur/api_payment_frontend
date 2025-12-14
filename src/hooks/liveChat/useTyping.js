import { useCallback, useRef } from "react";

export default function useTyping(ws, socketInfo, user) {
  const typingTimeoutRef = useRef(null);
  const isTypingRef = useRef(false);

  const handleSendTyping = useCallback(
    (typing) => {
      if (ws?.current?.readyState !== 1) return;
      const payload = {
        type: "typing",
        data: {
          conversation_id: socketInfo.conversationId,
          sender_type: "user",
          sender_id: user?.id,
          receiver_id: socketInfo.adminId,
          is_typing: typing,
        },
      };
      ws.current.send(JSON.stringify(payload));
    },
    [ws, socketInfo, user]
  );

  const handleTypingStart = useCallback(() => {
    if (!isTypingRef.current) {
      handleSendTyping(true);
      isTypingRef.current = true;
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      if (ws?.current?.readyState === 1) {
        handleSendTyping(false);
        isTypingRef.current = false;
      }
    }, 2000);
  }, [handleSendTyping, ws]);

  const resetTyping = useCallback(() => {
    isTypingRef.current = false;
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
  }, []);

  return { handleTypingStart, resetTyping };
}
