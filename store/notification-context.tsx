import React, { createContext, FC, useState, useEffect } from "react";

export interface AppContextInterface {
  notification: { title: string; message: string; status: string } | undefined;
  showNotification: Function;
  hideNotification: Function;
}

export const NotificationContext = createContext<AppContextInterface | null>(
  null
);

const NotificationContextProvider: React.FC = ({ children }) => {
  const [activeNotification, setActiveNotification] = useState<{
    title: string;
    message: string;
    status: string;
  }>();

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(undefined);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  const showNotificationHandler = (notificationData: {
    title: string;
    message: string;
    status: string;
  }) => {
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(undefined);
  };

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
