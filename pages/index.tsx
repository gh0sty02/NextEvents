import type { NextPage } from "next";
import React from "react";
import EventList from "../components/events/event-list";
import { getAllEvents } from "../components/helper/api-utils";
import IEvent from "../interfaces/event.interface";
import styles from "../styles/Home.module.css";

interface IEventsArray extends Array<IEvent> {}

const Home: NextPage<{ featuredEvents: IEventsArray }> = ({
  featuredEvents,
}) => {
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();

  const featuredEvents = events.filter((e) => e.isFeatured);

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
}

export default Home;
