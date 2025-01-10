import { Progress } from "@/components/ui/progress";
import { Leaf, Users } from "lucide-react";
import React from "react";

function ClubTracking() {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-5 gap-5">
        {Array(5)
          .fill(0)
          .map((_, index) => {
            return (
              <div className="border-primary/5 w-full h-40 bg-primary/10 rounded-md">
                <div className="flex justify-center items-center h-full w-full">
                  <div className="text-center text-gray-500 text-xl flex flex-col items-center justify-center gap-4">
                    <Users size={30} className="text-primary" />
                    <span className=" text-lg font-semibold text-primary/80">
                      500 <br />{" "}
                      <small className="font-semibold text-xl">
                        Joined Members
                      </small>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="w-full bg-primary/5 p-2   mt-5 rounded">
        <div className="w-full h-14 rounded bg-white flex gap-4 justify-start items-center px-1">
          <div className="bg-primary/5 flex justify-center  items-center rounded w-12 h-12 ">
            <Leaf size={16} className="text-primary" />
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className="text-sm font-semibold">30 Trees of 100 Trees</p>
            <Progress className="w-full h-2" value={40} max={100} />
            <p className="text-xs">120 From Community</p>
          </div>
          <p className="pr-3 font-bold text-gray-800">30%</p>
        </div>
      </div>
    </div>
  );
}

export default ClubTracking;
