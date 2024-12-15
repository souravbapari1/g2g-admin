"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatTimestampCustom } from "@/helper/dateTime";

import { useEffect, useState } from "react";
import { MdFileDownload } from "react-icons/md";
import { useMyDonation } from "./state/useMyDonations";

function OrdersListView() {
  const { loading, loadMyDonation, mydonation } = useMyDonation();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (mydonation.length == 0) {
      loadMyDonation();
    }
  }, []);

  const filterData = () => {
    if (filter == "all") {
      return mydonation;
    } else if (filter == "tree") {
      return mydonation.filter((data) => {
        return data.donate == "tree";
      });
    } else {
      return mydonation.filter((data) => {
        return data.donate != "tree";
      });
    }
  };

  return (
    <div>
      <br />
      <Tabs defaultValue="all" onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="tree">Tree Orders</TabsTrigger>
          <TabsTrigger value="others">Other Orders</TabsTrigger>
        </TabsList>
      </Tabs>

      <br />
      {loading && (
        <div className="flex justify-center items-center h-80">
          <p>Loading...</p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-10 mt-6 mb-10">
        {filterData().length == 0 && (
          <div className="lg:col-span-2 flex justify-center items-center text-center h-80">
            <p>No Orders Found</p>
          </div>
        )}
        {filterData()?.map((data) => {
          return (
            <Card key={data.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="">
                    <h3 className="font-semibold">
                      Support {data?.expand.project.name}
                    </h3>
                    <p>{formatTimestampCustom(data.created)}</p>
                  </div>
                  <div className="">
                    <h3 className="font-semibold">{data.amount} OMR</h3>
                    <p className="text-primary">Successful</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 border-t pt-5">
                  <div className="flex flex-col gap-5">
                    <div className="">
                      <h3 className="font-semibold">Status</h3>
                      <p>Successful</p>
                    </div>
                    <div className="">
                      <h3 className="font-semibold">Paid Amount</h3>
                      <p>{data.amount} OMR</p>
                    </div>
                    <div className="">
                      <h3 className="font-semibold">Reference</h3>
                      <p className="uppercase">{data.id}</p>
                    </div>
                    <div className="">
                      <h3 className="font-semibold">Downloads</h3>
                      <p className="font-semibold text-primary flex justify-normal items-center  gap-3">
                        <MdFileDownload />
                        Certificate
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    <div className="">
                      <h3 className="font-semibold">Date Created</h3>
                      <p>{formatTimestampCustom(data.created)}</p>
                    </div>
                    <div className="">
                      <h3 className="font-semibold">Payment Method</h3>
                      <p>Credit/Debit Card</p>
                    </div>
                    <div className="">
                      <h3 className="font-semibold">Quantity</h3>
                      <p className="uppercase">
                        {data.quantity} {data.donate}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className="">
                      <h3 className="font-semibold">Last Updated</h3>
                      <p>{formatTimestampCustom(data.updated)}</p>
                    </div>
                    <div className="">
                      <h3 className="font-semibold">Project Name</h3>
                      <p>Support {data?.expand.project.name}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Price</h3>
                      <p className="uppercase">
                        {data?.quantity} {data.donate} x{" "}
                        {(data.amount / data.quantity).toFixed(2)} OMR ={" "}
                        {data.amount}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default OrdersListView;
