import { useRouter } from "next/router";
import React, { Fragment } from "react";
import useSWR from "swr";

import EventSummary from "../../components/event-details/event-summary";
import EventLogistics from "../../components/event-details/event-logistics";
import EventContent from "../../components/event-details/event-content";
import image from "next/image";
import ErrorAlert from "../../components/events/error-alert";
import Button from "../../components/ui/button";
import { GetStaticPathsContext, GetStaticPropsContext } from "next";
import {
  getEventById,
  getFeaturedEvents,
} from "../../components/helper/api-utils";
import Head from "next/head";

import Comments from "../../components/input/comments";

interface IEvent {
  date: string;
  description: string;
  image: string;
  isFeatured: boolean;
  location: string;
  title: string;
  id: string;
}

const EventDetailPage: React.FC<{ event: IEvent }> = ({ event }) => {
  const router = useRouter();

  const id = router.query.eventId;

  if (!event) {
    return (
      <Fragment>
        <div className="center">
          <p>Loading..</p>
        </div>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.id}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      {<Comments eventId={id} />}
    </Fragment>
  );
};

export async function getStaticPaths(context: GetStaticPathsContext) {
  // const paramsArray = await getEventIds();

  const events = await getFeaturedEvents();

  const paths = events.map((e) => ({ params: { eventId: e.id } }));

  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;
  let event;
  if (params?.eventId) {
    event = await getEventById(params.eventId);
  }

  return {
    props: { event },
    revalidate: 30,
  };
}

export default EventDetailPage;
