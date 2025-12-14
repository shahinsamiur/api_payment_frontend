import { useMemo } from "react";
import { FaRobot } from "react-icons/fa";
import LoadingIndicator from "../common/LoadingIndicator";
import Typography from "../libs/Typography";
import MessageItem from "./MessageItem";

export default function MessagesList({
  chatHistory,
  isAdminTyping,
  isLoading,
  lastElement,
}) {
  const lastUserMessageIndex = useMemo(() => {
    if (!chatHistory || chatHistory.length === 0) return -1;
    const reversed = [...chatHistory].reverse();
    const idxFromEnd = reversed.findIndex((msg) => msg.sender_type === "user");
    if (idxFromEnd === -1) return -1;
    return chatHistory.length - 1 - idxFromEnd;
  }, [chatHistory]);

  return (
    <div className="flex-1 px-4 py-3 space-y-3 overflow-y-auto">
      {/* Initial bot message */}
      <div className="flex space-x-2 items-center">
        <FaRobot className="text-primary-main dark:text-white mt-1 size-6" />
        <Typography
          variant="body2"
          className="bg-card px-3 py-2 rounded-xl rounded-bl-none"
        >
          Hello, how can I help you today?
        </Typography>
      </div>
      {chatHistory && chatHistory.length > 0 ? (
        chatHistory.map((message, index) => (
          <MessageItem
            key={index}
            message={message}
            index={index}
            lastUserMessageIndex={lastUserMessageIndex}
          />
        ))
      ) : isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Typography variant="body2">Loading...</Typography>
        </div>
      ) : null}
      {isAdminTyping && (
        <div className="flex justify-start">
          <LoadingIndicator />
        </div>
      )}
      <div ref={lastElement}></div>
    </div>
  );
}
