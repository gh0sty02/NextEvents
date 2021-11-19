import type { NextPage } from "next";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../dummyData";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const featuredEvent = getFeaturedEvents();
  return (
    <div>
      <EventList items={featuredEvent} />
    </div>
  );
};

export default Home;
