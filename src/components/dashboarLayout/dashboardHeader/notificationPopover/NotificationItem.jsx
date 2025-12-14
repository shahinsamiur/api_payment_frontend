import IconButton from "@/components/libs/IconButton";
import Typography from "@/components/libs/Typography";
import { MdDeleteOutline } from "react-icons/md";

export default function NotificationItem({ item, onRead, isReading }) {
  return (
    <div
      key={item?.id}
      className="space-y-2 border-b border-b-border hover:bg-border/20 py-3 px-4"
    >
      <Typography variant="body2">{item.type}</Typography>
      <div className="flex items-end gap-2 justify-between">
        <Typography variant="caption" className="grow">
          {item.message}
        </Typography>

        <div>
          <IconButton
            onClick={() => onRead(item.id)}
            loading={isReading === item.id}
            className="rounded-md"
            variant="error"
            size="sm"
          >
            <MdDeleteOutline />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
