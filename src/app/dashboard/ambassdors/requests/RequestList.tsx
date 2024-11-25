"use client";
import React, { useState } from "react";
import RequestItem from "./RequestItem";
import { client } from "@/request/actions";
import { UserItem } from "@/interfaces/user";
import { Collection } from "@/interfaces/collection";
import { useQuery } from "react-query";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";

type AmbReqDataType = {
  status: string;
  id: string;
  user: string;
  expand: {
    user: UserItem;
  };
};

function RequestList() {
  const [page, setpage] = useState(1);

  const getRequests = async () => {
    return await client
      .get("/api/collections/ambassador_requests/records", {
        filter: `(status='pending')`,
        expand: "user",
        page: page,
      })
      .send<Collection<AmbReqDataType>>();
  };

  const data = useQuery(["ambRequests", page], {
    queryFn: getRequests,
    onError(err) {
      console.log(err);
    },
  });

  return (
    <div className="p-8">
      <h1 className="font-bold text-lg underline">Requests</h1>

      {data.isLoading && (
        <div className="w-full flex justify-center items-center h-[70vh]">
          <LoadingSpinner />
        </div>
      )}
      {data.data?.items.length === 0 && (
        <div className="w-full flex justify-start items-center h-20">
          <p className="text-red-500">No Requests Found</p>
        </div>
      )}
      {!data.isLoading && (
        <div className="grid 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 col-span-1 gap-8 mt-6">
          {data.data?.items.map((e, index) => (
            <RequestItem
              key={e.id}
              user={e.expand.user}
              id={e.id}
              onUpdate={data.refetch}
            />
          ))}
        </div>
      )}

      {data.data?.page != data.data?.totalPages &&
        data.data?.totalPages != 0 && (
          <div className="">
            <Button
              variant="outline"
              onClick={() => setpage(page + 1)}
              disabled={data.isLoading}
            >
              Load More
            </Button>
          </div>
        )}
    </div>
  );
}

export default RequestList;
