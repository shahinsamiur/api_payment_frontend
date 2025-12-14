import { IoChatbox } from "react-icons/io5";
import IconButton from "../libs/IconButton";

const ChatButton = ({ setShowChat, unreadMessageCount }) => {
  return (
    <div className="relative">
      {/* Ping animation */}
      <div className="absolute inset-0 bg-primary-light rounded-full animate-ping" />
      <div className="absolute inset-0 bg-primary-dark rounded-full animate-ping" />

      {/* Main button */}
      <IconButton
        className="!bg-primary-light relative"
        size="md"
        onClick={() => setShowChat((prev) => !prev)}
      >
        <IoChatbox className="text-white size-5" />
      </IconButton>

      {/* Unread badge */}
      {unreadMessageCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full size-5 flex items-center justify-center">
          {unreadMessageCount}
        </span>
      )}
    </div>
  );
};

export default ChatButton;
