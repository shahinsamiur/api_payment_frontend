import Typography from "../libs/Typography";
import AdminAvatar from "./AdminAvatar";
import ImageDisplay from "./ImageDisplay";
import MessageText from "./MessageText";
import VoiceDisplay from "./VoiceDisplay";

export default function MessageItem({ message, index, lastUserMessageIndex }) {
  return (
    <div
      className={`flex gap-2 ${
        message.sender_type === "user" ? "justify-end" : "items-start"
      }`}
    >
      {message.sender_type === "admin" ? (
        <AdminAvatar message={message} />
      ) : null}
      <div className="max-w-[85%]">
        {message.image_url && (
          <ImageDisplay
            url={message.image_url}
            senderType={message.sender_type}
          />
        )}
        {message.voice_url && <VoiceDisplay url={message.voice_url} />}
        {message.message && (
          <MessageText
            text={message.message}
            senderType={message.sender_type}
          />
        )}
        {message.sender_type === "user" && index === lastUserMessageIndex && (
          <Typography variant="caption" align="right">
            {message.status}
          </Typography>
        )}
      </div>
    </div>
  );
}
