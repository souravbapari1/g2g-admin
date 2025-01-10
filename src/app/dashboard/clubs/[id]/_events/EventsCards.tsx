import React from "react";
import EventCard from "./EventCard";

function EventsCards() {
  return (
    <div className="grid grid-cols-5 gap-5 mt-8">
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
    </div>
  );
}

export default EventsCards;
