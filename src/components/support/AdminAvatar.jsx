import { config } from "@/config";
import Image from "next/image";
import Typography from "../libs/Typography";

export default function AdminAvatar({ message }) {
  return (
    <div className="relative">
      {message.admin_profile ? (
        <Image
          src={config.fileBaseUrl + message.admin_profile}
          width={40}
          height={40}
          alt="admin"
          className="rounded-full size-8"
        />
      ) : (
        <div className="dark:text-white size-8 flex items-center justify-center p-1 bg-card font-bold rounded-full uppercase">
          <Typography variant="body2">
            {message.admin_name?.charAt(0)}
          </Typography>
        </div>
      )}
      <div
        className={`absolute top-0 right-0 size-2 rounded-full ${
          message.user_online ? "bg-success" : "bg-gray-500"
        }`}
      />
    </div>
  );
}
