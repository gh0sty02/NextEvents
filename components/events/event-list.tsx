import EventItem from "./event-item";
import IEvent from "../../interfaces/event.interface";

import classes from "./event-list.module.css";

const EventList: React.FC<{ items: IEvent[] }> = ({ items }) => {
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          location={event.location}
          date={event.date}
          image={event.image}
          isFeatured={event.isFeatured}
        />
      ))}
    </ul>
  );
};

export default EventList;
