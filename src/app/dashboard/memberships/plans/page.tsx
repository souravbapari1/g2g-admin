import { Button } from "@/components/ui/button";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import Image from "next/image";
import React from "react";

function page() {
  return (
    <WorkSpace>
      <WorkHeader title="Membership Plans">
        <Button size="sm" variant="outline">
          Add New
        </Button>
      </WorkHeader>
      <div className=" grid lg:grid-cols-4 p-10 xl:gap-5 gap-3">
        {Array.from({ length: 3 }).map((_, i) => {
          return (
            <div className="w-full   bg-main/10 rounded-3xl overflow-hidden ">
              <div className="w-full h-48 bg-green-300/20 border-b-[8px] border-white flex justify-center items-center">
                <Image
                  src="https://www.plant-for-the-planet.org/wp-content/uploads/2022/11/seed-icon.png"
                  alt=""
                  width={1200}
                  height={1200}
                  className="h-20 w-auto"
                />
              </div>
              <div
                className={`text-center  p-3 pt-10 pb-3 flex justify-between flex-col bg-gray-50 items-center`}
              >
                <div className="">
                  <h1 className="font-bold text-xl mb-6">
                    Donor-Circle "Seed"
                  </h1>
                  <p className="font-semibold">$3</p>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <Button className="rounded-full  py-3 mt-8 mb-7 md:px-6 px-8">
                    EDIT
                  </Button>
                  <Button
                    variant="destructive"
                    className="rounded-full  py-3 mt-8 mb-7 md:px-6 px-8"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </WorkSpace>
  );
}

export default page;
