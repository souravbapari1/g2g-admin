import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";
import ClubAchievements from "./ClubAchievements";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoClose } from "react-icons/io5";
import ContactInfo from "./ContactInfo";

function ClubHomeView() {
  return (
    <div className="mt-5 relative">
      <Badge variant="secondary" className="absolute top-5 right-5">
        Active
      </Badge>
      <Image
        src="https://cdn.pixabay.com/photo/2019/03/02/19/50/casino-boat-4030557_1280.jpg"
        alt="Club Home View"
        width={500}
        height={500}
        className="w-full h-60 object-cover rounded"
      />
      <div className="flex justify-start items-center mt-5 gap-5 h-full ">
        <div className="w-20 h-20 bg-white rounded  border-4 z-30 relative "></div>
        <div className="flex flex-col justify-start items-start gap-2 h-full ">
          <h1 className="text-2xl font-bold">
            The Power Of Achieve More Together
            <Badge className="ml-2">Popular</Badge>
          </h1>
          <p className="text-gray-900">Oman,Muscat</p>
        </div>
      </div>
      <div className="w-full p-5 bg-gray-100 mt-8">
        <h1 className="text-xl font-bold mb-2">About Club</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
      <div className="mt-5 bg-gray-100 p-5">
        <h1 className="text-lg font-bold">Club's Objectives</h1>
        <div className="">
          {Array(5)
            .fill(0)
            .map((item, index) => {
              return (
                <div className="bg-white px-4 p-3 mt-2">
                  <p className="text-gray-900 ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Pariatur, magnam.
                  </p>
                </div>
              );
            })}
        </div>
      </div>
      <ClubAchievements />
      <div className="grid grid-cols-2 gap-5">
        <div className="p-5 bg-gray-100 mt-5">
          <h1 className="text-xl font-bold mb-5">Assigned to Employees</h1>
          <div className="flex flex-wrap gap-4">
            {Array(5)
              .fill(0)
              .map((item, index) => {
                return (
                  <div className="flex gap-4 items-center bg-gray-50 p-3 px-5 rounded-md border relative">
                    <div className="w-4 h-4 bg-red-500 rounded-full absolute -top-2 -right-2 flex justify-center items-center">
                      <IoClose color="#fff" />
                    </div>
                    <Avatar className="w-9 h-9">
                      <AvatarImage src="https://api.multiavatar.com/sourav.svg" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="font-bold">Adarsh Arya</p>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="mt-5">
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}

export default ClubHomeView;
