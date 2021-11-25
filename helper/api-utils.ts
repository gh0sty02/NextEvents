export async function getAllEvents() {
  const response = await fetch(
    "https://nextjs-course-af035-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}

export async function getEventById(eventId: string | string[] | undefined) {
  const response = await fetch(
    "https://nextjs-course-af035-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  let event;
  if (eventId && !Array.isArray(eventId)) {
    event = data[eventId];
  }

  return event;
}

export async function getFeaturedEvents() {
  const events = await getAllEvents();

  const featuredEvents = events.filter((e) => e.isFeatured);

  return featuredEvents;
}
export async function getFilteredEvents(dateFilter: {
  numYear: number;
  numMonth: number;
}) {
  const { numYear, numMonth } = dateFilter;
  const events = await getAllEvents();

  let filteredEvents = events.filter((e) => {
    const eventDate = new Date(e.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() == numMonth - 1
    );
  });

  return filteredEvents;
}
