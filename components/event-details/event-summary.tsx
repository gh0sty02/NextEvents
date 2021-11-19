import React from "react";
import classes from "./event-summary.module.css";

function EventSummary(props: React.PropsWithChildren<{ title: string }>) {
  const { title } = props;

  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
}

export default EventSummary;
