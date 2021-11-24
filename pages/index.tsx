import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import EventList from "../components/events/event-list";
import { getAllEvents } from "../components/helper/api-utils";
import IEvent from "../interfaces/event.interface";
import styles from "../styles/Home.module.css";
import NewsLetterRegistration from "../components/input/newsletter-registration";

interface IEventsArray extends Array<IEvent> {}

const Home: NextPage<{ featuredEvents: IEventsArray }> = ({
  featuredEvents,
}) => {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="find exciting events" />
      </Head>
      <NewsLetterRegistration />
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
