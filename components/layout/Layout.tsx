import { Fragment, useContext } from "react";
import Notification from "../ui/notification";
import MainHeader from "./main-header";
import { NotificationContext } from "../../store/notification-context";

const Layout: React.FC = ({ children }) => {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx?.notification;
  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
};

export default Layout;
