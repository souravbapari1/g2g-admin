import { CalendarCheck, Clock, LeafyGreen, MapPinCheck } from "lucide-react";
import Image from "next/image";
import React, { ReactNode } from "react";

function EventCard() {
  return (
    <div className="w-full h-80 bg-white rounded-xl overflow-hidden shadow">
      <Image
        src="https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8="
        width={1000}
        height={1000}
        alt="image"
        className="w-full h-36 object-cover"
      />
      <div className="p-4 px-5">
        <h1>Event Name</h1>
        <div className="flex flex-col gap-2 mt-5">
          <TextList
            icon={<CalendarCheck size={16} />}
            text="20 May 2023 - 24 May 2023"
          />
          <TextList icon={<MapPinCheck size={16} />} text="Oman, Muscat" />
          <TextList icon={<Clock size={15} />} text="09:40 AM - 08:20 PM" />
          <TextList
            icon={<LeafyGreen size={15} />}
            text="Male / Female (+14 years old)"
          />
        </div>
      </div>
    </div>
  );
}

export default EventCard;

function TextList({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className=" flex justify-start items-center gap-3">
      {icon}
      <p className="text-xs">{text}</p>
    </div>
  );
}
