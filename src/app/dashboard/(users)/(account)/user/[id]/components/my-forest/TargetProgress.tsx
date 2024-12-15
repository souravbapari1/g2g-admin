import { Progress } from "@/components/ui/progress";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdOutlineCo2 } from "react-icons/md";
import { PiPlant } from "react-icons/pi";
import ContributeCard from "./ContributeCard";
import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { client } from "@/request/actions";
import { OrderPayItem } from "@/interfaces/PaymentItem";
import { useMyDonation } from "../orders/state/useMyDonations";
import { Collection } from "@/interfaces/collection";
import { UserItem } from "@/interfaces/user";

function TargetProgress({ user }: { user: UserItem }) {
  const { mydonation, status } = useMyDonation();
  const [loading, setloading] = useState(true);
  const [community, setCommunity] = useState<OrderPayItem[]>([]);
  const [sort, setSort] = useState("created");
  const lodeCommunity = async () => {
    setloading(true);
    try {
      const data = await client
        .get(`/api/collections/payments/records`, {
          perPage: 20,
          expand: "user",
          filter: `(status='paid' && orderPlaced=true)`,
          sort: `-${sort}`,
        })
        .send<Collection<OrderPayItem>>();
      setCommunity(data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    lodeCommunity();
  }, [sort]);

  return (
    <>
      <div className="w-full  bg-white shadow-md p-3 rounded-3xl mt-10">
        {user.targetTrees ? (
          <div className="w-full h-full py-4 -10 bg-primary/5 rounded-3xl flex gap-5 justify-start items-center px-5">
            <div className="w-10 h-10 ">
              <div className="bg-primary w-10 h-10 text-xl flex justify-center items-center text-white rounded-xl">
                <PiPlant />
              </div>
            </div>
            <div className="flex w-full justify-center text-xs font-semibold items-start gap-1 flex-col">
              <h1>
                {status.totalTrees} of {user.targetTrees} trees planted
              </h1>
              <div className="flex justify-between w-full gap-6 items-center">
                <div className="w-full relative">
                  <Progress
                    className="w-[100%]"
                    value={(status.totalTrees / +user.targetTrees) * 100}
                  />
                </div>
                <p className="text-nowrap">
                  {((status.totalTrees / +user.targetTrees) * 100).toFixed(2)} %
                </p>
              </div>
              {user.user_type == "ambassador" && (
                <p className="text-[10px] font-normal">
                  765.8 from your community
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center text-main underline">
            Not Set Any Trees Target
          </div>
        )}
        <br />
        {user.targetPlastic ? (
          <div className="w-full h-full py-4 -10 bg-gray-400/5 rounded-3xl flex gap-5 justify-start items-center px-5">
            <div className="w-10 h-10 ">
              <div className="bg-gray-700 w-10 h-10 text-xl flex justify-center items-center text-white rounded-xl">
                <MdOutlineCo2 />
              </div>
            </div>
            <div className="flex w-full justify-center text-xs font-semibold items-start gap-1 flex-col">
              <h1>
                {status.totalPlastic} of {user.targetPlastic} tons of Plastic
              </h1>
              <div className="flex justify-between w-full gap-6 items-center">
                <div className="w-full relative">
                  <Progress
                    className="w-[100%] bg-gray-200"
                    color="gray"
                    value={(status.totalPlastic / +user.targetPlastic) * 100}
                  />
                </div>
                <p className="text-nowrap">
                  {((status.totalPlastic / +user.targetPlastic) * 100).toFixed(
                    2
                  )}{" "}
                  %
                </p>
              </div>
              {user.user_type == "ambassador" && (
                <p className="text-[10px] font-normal">
                  765.8 from your community
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            Not Set Plastic Target
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-10 mt-10 pb-20">
        <div className="w-full h-[700px] bg-white overflow-hidden relative shadow-lg p-2 rounded-3xl ">
          <div className="w-full h-[130px] bg-primary/10 overflow-hidden rounded-t-3xl flex justify-between items-center">
            <h1 className="text-xl font-bold md:pl-10 pl-5 text-primary">
              Your`s Contributions
            </h1>
            <Image
              src="/icons/plant.svg"
              width={200}
              height={200}
              alt=""
              className="object-contain bottom-0 h-28 mt-5"
            />
          </div>
          <div className="w-full h-[552px] overflow-auto p-2  rounded-b-3xl  bg-white">
            {mydonation.map((e, i) => {
              return (
                <ContributeCard key={e.id + i + "pay"} order={e} user={user} />
              );
            })}
          </div>
        </div>
        <div className="w-full h-[700px] bg-white overflow-hidden relative shadow-lg p-2 rounded-3xl ">
          <div className="w-full h-[130px] bg-orange-100 overflow-hidden rounded-t-3xl flex justify-between items-center">
            <div className="">
              <h1 className="text-xl font-bold md:pl-10 pl-5 text-primary">
                Community Contributions
              </h1>
              <div className="">
                <Tabs defaultValue={sort} className=" md:pl-10 pl-5 mt-4">
                  <TabsList className="bg-white rounded-sm">
                    <TabsTrigger
                      className="rounded-sm shadow-none"
                      value="created"
                      onClick={() => setSort("created")}
                    >
                      Most recent
                    </TabsTrigger>
                    <TabsTrigger
                      className="rounded-sm shadow-none"
                      value="quantity"
                      onClick={() => setSort("quantity")}
                    >
                      Most trees
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            <Image
              src="/icons/rank.svg"
              width={200}
              height={200}
              alt=""
              className="object-contain bottom-0 h-28 mt-5"
            />
          </div>
          <div className="w-full h-[552px] overflow-auto   rounded-b-3xl text-sm font-semibold p-5  bg-white">
            {community.map((e, i) => {
              return (
                <div
                  className="flex justify-between items-center py-4 border-b"
                  key={e.id + "commmunity"}
                >
                  <p>
                    {e.expand.user.first_name + " " + e.expand.user.last_name}
                  </p>
                  <p> {e.quantity} trees</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default TargetProgress;
