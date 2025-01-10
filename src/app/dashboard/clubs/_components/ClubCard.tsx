import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ClubCard() {
  return (
    <Link href="/dashboard/clubs/1">
      <Card className="overflow-hidden border-none shadow-lg rounded-md">
        <CardHeader className="p-0 overflow-hidden">
          <Image
            alt="club"
            src="https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-waterfall-free-image.jpeg?w=600&quality=80"
            width={1000}
            height={1000}
          />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-between mt-5">
            <div className="flex flex-col gap-5">
              <h2 className="text-xl font-bold">
                <span className="text-gray-900">
                  The Power Of Achieve More Together
                </span>
              </h2>
              <p className="text-gray-900">
                <span className="text-gray-500">
                  Explore the concept of collaboration and its impact on
                  productivity.
                </span>
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className=" overflow-hidden w-full">
          <div className="flex text-nowrap justify-between items-center  gap-4 w-full">
            <p className="font-bold w-full">
              500+ <small className="font-light">Members</small>
            </p>
            <p className="font-semibold w-full text-right text-blue-500 border-l-2 border-r-2 pl-4 pr-5 border-primary/20">
              Masket, Oman
            </p>
            <p className="font-semibold w-full text-right ">2025</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default ClubCard;
