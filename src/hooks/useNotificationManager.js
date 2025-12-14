import {
  useGetNotificationQuery,
  useMarkMultipleNotificationsAsReadMutation,
  useMarkSingleNotificationAsReadMutation,
} from "@/store/features/notification";
import { useState } from "react";
import { toast } from "react-toastify";

export const useNotificationManager = () => {
  const { data, isLoading } = useGetNotificationQuery({
    status: "UNREAD",
    page: 1,
  });
  const [markSingleNotificationAsRead] =
    useMarkSingleNotificationAsReadMutation();
  const [markAllNotificationAsRead, { isLoading: isLoadingMultipleUpdate }] =
    useMarkMultipleNotificationsAsReadMutation();
  const [singleUpdating, setSingleUpdating] = useState(-1);

  async function handleMarkSingleNotificationAsRead(id) {
    try {
      setSingleUpdating(id);
      await markSingleNotificationAsRead(id).unwrap();
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    } finally {
      setSingleUpdating(-1);
    }
  }

  async function handleMarkAllNotificationAsRead() {
    try {
      const notificationIds = data?.data?.data?.map(
        (notification) => notification.id
      );
      if (!notificationIds || notificationIds.length === 0) return;
      await markAllNotificationAsRead(notificationIds).unwrap();
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }

  return {
    notifications: data?.data?.data,
    isLoadingNotifications: isLoading,
    isLoadingMultipleUpdate,
    isLoadingSingleUpdate: singleUpdating,
    handleMarkSingleNotificationAsRead,
    handleMarkAllNotificationAsRead,
  };
};
