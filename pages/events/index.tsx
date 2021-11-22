import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from "next/router";
import IEvent from "../../interfaces/event.interface";
import { getAllEvents } from "../../components/helper/api-utils";

const EventsPage: React.FC<{ events: IEvent[] }> = ({ events }) => {
  const router = useRouter();

  function findEventsHandler(year: string | null, month: string | null) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}

export default EventsPage;
