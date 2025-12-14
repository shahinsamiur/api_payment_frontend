"use client";

import { useEffect } from "react";

const NotificationProvider = ({ children }) => {
  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications.");
      return;
    }

    Notification.requestPermission();
  }, []);

  return children;
};

export default NotificationProvider;
