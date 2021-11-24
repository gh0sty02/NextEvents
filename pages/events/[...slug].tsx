import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import ErrorAlert from "../../components/events/error-alert";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import { getFilteredEvents } from "../../components/helper/api-utils";
import Button from "../../components/ui/button";
import IEvent from "../../interfaces/event.interface";

interface IProps {
  hasError: boolean;
  filteredEvents?: IEvent[];
  date?: {
    year: number;
    month: number;
  };
}

const FilteredEvents: React.FC<IProps> = ({
  hasError,
  filteredEvents,
  date,
}) => {
  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`Events for ${date?.month}/${date?.year}`}
      />
    </Head>
  );

  if (hasError) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter, Please adjust the values</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  let eventDate;
  if (date) {
    eventDate = new Date(date?.year, date?.month - 1);
  }

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={eventDate} />
      {!FilteredEvents ||
        (filteredEvents?.length == 0 && (
          <Fragment>
            <ErrorAlert>
              <p>No Events Found</p>
            </ErrorAlert>
          </Fragment>
        ))}
      <div className="center">
        <Button link="/events">Show all events</Button>
      </div>
      {filteredEvents && <EventList items={filteredEvents} />}
    </Fragment>
  );
};
let filteredData: string[];

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;

  if (params?.slug && Array.isArray(params?.slug)) {
    filteredData = params?.slug;
  }

  const [year, month] = filteredData;

  const numYear = +year;
  const numMonth = +month;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2020 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        hasErrors: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents({ numYear, numMonth });

  return {
    props: {
      filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}

export default FilteredEvents;
