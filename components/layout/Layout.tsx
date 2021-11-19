import { Fragment } from "react";
import MainHeader from "./main-header";

const Layout: React.FC = ({ children }) => {
  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;
