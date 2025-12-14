import Typography from "@/components/libs/Typography";
import React from "react";
import { MdOutlineClearAll } from "react-icons/md";

const NotificationHeader = ({ onReadAllNotification, disabled, isLoading }) => {
  return (
    <div className="flex justify-between items-center border-b border-b-border pb-4 sticky top-0 bg-card z-30 pt-2 px-4">
      <Typography variant="h5">Notifications</Typography>

      <button
        onClick={onReadAllNotification}
        disabled={disabled}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 border border-border px-2 py-1 rounded-2xl"
      >
        {isLoading ? (
          <span className="text-base">Clearing...</span>
        ) : (
          <>
            <MdOutlineClearAll className="text-xl" />
            <span className="font-semibold text-sm">Clear All</span>
          </>
        )}
      </button>
    </div>
  );
};

export default NotificationHeader;
