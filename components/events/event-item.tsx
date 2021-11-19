import Link from "next/link";
import Image from "next/image";
import classes from "./event-item.module.css";
import DateIcon from "../../components/icons/date-icon";
import AddressIcon from "../../components/icons/address-icon";
import ArrowRightIcon from "../../components/icons/arrow-right-icon";

import IEvent from "../../interfaces/event.interface";
import Button from "../ui/button";

const EventItem: React.FC<IEvent> = (props) => {
  const { title, image, date, location, id } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(", ", "\n");

  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      {/*  eslint-disable-next-line @next/next/no-img-element  */}
      <img src={"/" + image} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
