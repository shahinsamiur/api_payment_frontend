import { IoClose } from "react-icons/io5";
import IconButton from "../libs/IconButton";
import Typography from "../libs/Typography";

export default function ChatHeader({ setShowChat }) {
  return (
    <div className="bg-primary-dark text-center py-3 relative">
      <Typography variant="h5" color="white" align="center">
        Live Chat
      </Typography>

      <IconButton
        onClick={() => setShowChat(false)}
        className="absolute top-2 right-2"
        size="sm"
      >
        <IoClose size={18} />
      </IconButton>
    </div>
  );
}
