import { useCallback } from "react";
import { toast } from "react-toastify";

export default function useSendMessage({
  ws,
  socketInfo,
  setChatHistory,
  user,
  chatHistory,
  handleSaveFile,
  resetTyping,
}) {
  const sendMessage = useCallback(
    async (inputValue, image, audioBlob) => {
      try {
        if (inputValue.trim() === "" && !image && !audioBlob) return;

        const adminId = chatHistory
          ? [...chatHistory]
              .reverse()
              .find((msg) => msg.sender_type === "admin")?.sender_id
          : null;

        const payload = {
          message_id: Date.now(),
          conversation_id: socketInfo.conversationId,
          sender_type: "user",
          sender_id: user?.id,
          admin_id: adminId,
          message_type: "text",
          message: inputValue,
          status: "sending",
          user_name: user?.name,
          user_profile: user?.profile_image || null,
        };

        if (image) {
          payload.image_url = await handleSaveFile(image);
        }

        if (audioBlob) {
          payload.voice_url = await handleSaveFile(
            audioBlob,
            `recording-${Date.now()}.wav`
          );
        }

        const message = {
          type: "message",
          data: payload,
        };

        if (ws?.current?.readyState !== 1) {
          throw new Error("WebSocket connection not ready");
        }

        ws.current.send(JSON.stringify(message));
        setChatHistory((prev) => {
          if (prev) return [...prev, payload];
          else return [payload];
        });
        resetTyping();
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message || "Internal server error");
      }
    },
    [
      ws,
      socketInfo.conversationId,
      setChatHistory,
      user?.id,
      user?.name,
      user?.profile_image,
      chatHistory,
      handleSaveFile,
      resetTyping,
    ]
  );

  return sendMessage;
}
