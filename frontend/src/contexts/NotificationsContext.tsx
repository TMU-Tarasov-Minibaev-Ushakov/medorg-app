import {NotificationInstance} from "antd/lib/notification/interface";
import {createContext, FC, ReactNode, useContext} from "react";
import {notification} from "antd";

type NotificationsContextType = {
  api: NotificationInstance | undefined
};

const notificationsContext = createContext<NotificationsContextType>({
  api: undefined,
});

export const NotificationsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();
  return (
    <notificationsContext.Provider value={{api}}>
      {contextHolder}
      {children}
    </notificationsContext.Provider>
  );
};

export const useNotifications = () => {
  return useContext(notificationsContext);
};