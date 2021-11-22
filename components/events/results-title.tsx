import React from "react";
import Button from "../ui/button";
import classes from "./results-title.module.css";

function ResultsTitle(
  props: React.PropsWithChildren<{ date: Date | undefined }>
) {
  const { date } = props;

  let humanReadableDate;
  if (date) {
    humanReadableDate = new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
    </section>
  );
}

export default ResultsTitle;
