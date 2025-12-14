import { useNotificationManager } from "@/hooks/useNotificationManager";
import clsx from "clsx";
import NotificationHeader from "./NotificationHeader";
import NotificationList from "./NotificationList";

const NotificationPopover = () => {
  const {
    notifications,
    isLoadingNotifications,
    isLoadingMultipleUpdate,
    isLoadingSingleUpdate,
    handleMarkSingleNotificationAsRead,
    handleMarkAllNotificationAsRead,
  } = useNotificationManager();

  const containerClass = clsx(
    "flex flex-col gap-0 z-[99] absolute right-3 md:right-5 top-full",
    "bg-card dark:text-white rounded-b-md pb-4 shadow-md dark:shadow-gray-100/10",
    "h-[calc(100vh-60px)] h-auto max-h-[500px] w-[300px] md:w-[350px]"
  );

  return (
    <div className={` ${containerClass}`}>
      <div className="overflow-y-auto">
        <NotificationHeader
          onReadAllNotification={handleMarkAllNotificationAsRead}
          disabled={isLoadingMultipleUpdate || !notifications?.length}
          isLoading={isLoadingMultipleUpdate}
        />

        <NotificationList
          notifications={notifications}
          isLoadingNotification={isLoadingNotifications}
          isReading={isLoadingSingleUpdate}
          onNotificationRead={handleMarkSingleNotificationAsRead}
        />
      </div>
    </div>
  );
};

export default NotificationPopover;
