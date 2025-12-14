import { useDashboardPopup } from "@/hooks/dashboardHeader/useDashboardPopup";
import { useGetNotificationCountQuery } from "@/store/features/notification";
import clsx from "clsx";
import { IoIosNotifications } from "react-icons/io";
import NotificationPopover from "./notificationPopover/NotificationPopover";

const HeaderNotification = () => {
  const { data } = useGetNotificationCountQuery();
  const { showNotification, toggleNotification, notificationRef } =
    useDashboardPopup();
  const count = data?.data?.unread_count ?? 0;

  const notificationBadge = clsx(
    "flex justify-center items-center",
    "absolute -top-2 -right-2 rounded-full size-6",
    "bg-primary-dark text-white font-semibold"
  );

  return (
    <div ref={notificationRef}>
      <button onClick={toggleNotification} className="relative">
        {count > 0 && <span className={notificationBadge}>{count}</span>}
        <IoIosNotifications className="size-8 text-primary-darker dark:text-white" />
      </button>
      {showNotification && <NotificationPopover />}
    </div>
  );
};

export default HeaderNotification;
