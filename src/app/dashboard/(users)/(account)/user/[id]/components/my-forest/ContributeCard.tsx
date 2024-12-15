import { auth } from "@/auth";
import { formatTimestampCustom } from "@/helper/dateTime";
import { Collection } from "@/interfaces/collection";
import { OrderPayItem } from "@/interfaces/PaymentItem";
import { UserItem } from "@/interfaces/user";

import { client, genPbFiles } from "@/request/actions";

import Link from "next/link";
import React, { useEffect } from "react";
import { PiPlantFill } from "react-icons/pi";
import { useQuery } from "react-query";

function ContributeCard({
  order,
  user,
}: {
  order: OrderPayItem;
  user: UserItem;
}) {
  const moreOrders = async (): Promise<Collection<OrderPayItem>> => {
    const data = await client
      .get(`/api/collections/payments/records`, {
        perPage: 2,
        filter: `(project='${order.expand.project.id}' && status='paid' && orderPlaced=true && user!='${user.id}')`,
      })
      .send<Collection<OrderPayItem>>();
    return data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["moreOrders-" + order.id],
    queryFn: moreOrders,
  });
  return (
    <div className="w-full bg-primary/5 h-auto mt-2 mb-5 rounded-xl flex justify-start flex-col items-start relative p-2">
      <div className="md:flex justify-start w-full items-start relative">
        <div className="md:w-auto w-full">
          <div
            style={{
              backgroundImage: `url(${genPbFiles(
                order.expand.project,
                order.expand.project.preview_image
              )})`,
            }}
            className={`md:w-40 w-full h-40 rounded-xl bg-white bg-cover bg-center`}
          ></div>
        </div>
        <div className="p-4 w-full flex-col h-full justify-between">
          <div className="flex flex-col  h-full w-full">
            <p className="flex justify-start items-center gap-2 text-xs text-primary font-semibold">
              <PiPlantFill size={16} />
              {order.expand.project.sort_title}
            </p>
            <h1 className="text-lg mt-2 font-semibold">
              {order.expand.project.name}
            </h1>
            <p className="text-xs mt-1">
              {order.expand.project.country} • By Gray To Green
            </p>
          </div>
          <div className="flex justify-between pt-8 items-center ">
            <h1 className="font-bold  text-lg">{order.quantity} Trees</h1>
            <Link
              className="donateBtn text-sm py-2 rounded-xl text-white shadow-none"
              href={`/donate?by=project&id=${order.expand.project.id}&donate=${order.donate}`}
            >
              Donate
            </Link>
          </div>
        </div>
      </div>
      {!isLoading && !isError && (
        <div className="w-full grid md:grid-cols-3 gap-3">
          {data?.items?.map((order) => (
            <div
              className="w-full h-8 rounded-lg bg-white flex justify-between items-center px-4"
              key={order.id}
            >
              <p className="flex justify-start items-center gap-2 text-xs text-green-900 font-semibold">
                <PiPlantFill size={16} />
                {order.quantity} Tree
              </p>
              <p className="text-[9px]">
                {formatTimestampCustom(order.created)}
              </p>
            </div>
          ))}

          {(data?.totalItems || 0) > 2 && (
            <div className="w-full h-8 rounded-lg bg-primary/10 text-xs font-bold text-primary flex justify-center items-center">
              +{(data?.totalItems || 0) - 2} contributions
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ContributeCard;
