import Typography from "../libs/Typography";

export default function MessageText({ text, senderType }) {
  return (
    <Typography
      variant="body2"
      className={`bg-card px-3 py-2 rounded-xl ${
        senderType === "user" ? "rounded-br-none" : "rounded-bl-none"
      }`}
    >
      {text}
    </Typography>
  );
}
