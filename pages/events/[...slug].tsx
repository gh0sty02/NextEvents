import { useRouter } from "next/router";
import { Fragment } from "react";
import ErrorAlert from "../../components/events/error-alert";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import { getFilteredEvents } from "../../dummyData";

const FilteredEvents = () => {
  const router = useRouter();

  const filteredData: string[] = router.query?.slug;

  if (!filteredData) {
    return <p className="center">Loading...</p>;
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
    console.log(numYear, numMonth);
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter, Please adjust the values</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents(numYear, numMonth);

  console.log(filteredEvents);

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      {!FilteredEvents ||
        (filteredEvents.length == 0 && (
          <Fragment>
            <ErrorAlert>
              <p>No Events Found</p>
            </ErrorAlert>
            <div className="center">
              <Button link="/events">Show all events</Button>
            </div>
          </Fragment>
        ))}
      {filteredEvents && <EventList items={filteredEvents} />}
    </Fragment>
  );
};

export default FilteredEvents;
