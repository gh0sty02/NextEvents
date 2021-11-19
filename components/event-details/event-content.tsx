import React, { PropsWithChildren, ReactChildren, ReactNode } from "react";
import classes from "./event-content.module.css";

interface IProps {
  content: string;
}

const EventContent: React.FC = ({ children }) => {
  return <section className={classes.content}>{children}</section>;
};

export default EventContent;
