import LoadingIndicator from "@/components/common/LoadingIndicator";
import Typography from "@/components/libs/Typography";
import React from "react";
import NotificationItem from "./NotificationItem";

const NotificationList = ({
  notifications,
  isLoadingNotification,
  onNotificationRead,
  isReading,
}) => {
  if (isLoadingNotification) {
    return <LoadingIndicator className="mt-3" />;
  }

  if (!notifications?.length) {
    return (
      <Typography align="center" variant="caption" className="mt-5 mb-3">
        No notification
      </Typography>
    );
  }

  return notifications.map((item) => (
    <NotificationItem
      key={item?.id}
      item={item}
      onRead={onNotificationRead}
      isReading={isReading}
    />
  ));
};

export default NotificationList;
