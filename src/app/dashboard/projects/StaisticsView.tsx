import React, { useEffect, useState } from "react";
import { StatusData } from "./types/status";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { client } from "@/request/actions";

function StatisticsView() {
  const [data, setData] = useState<StatusData>();

  const fetchStatus = async () => {
    try {
      const data = await client.get("/project/status").send<StatusData>();
      setData(data);
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  if (!data) {
    return <></>;
  }

  return (
    <div className="grid grid-cols-5 gap-5 mb-10">
      {data?.status.map((item) => (
        <Card className="rounded-none shadow-none" key={item.id}>
          <CardHeader className="">
            <CardTitle className="text-md capitalize">
              {item.status} Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{item.total}</p>
          </CardContent>
        </Card>
      ))}
      <Card className="rounded-none shadow-none">
        <CardHeader className="">
          <CardTitle className="text-md">Total Country</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{data.country.length}</p>
        </CardContent>
      </Card>
      <Card className="rounded-none shadow-none">
        <CardHeader className="">
          <CardTitle className="text-md">Total City</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{data.city.length}</p>
        </CardContent>
      </Card>
      <Card className="rounded-none shadow-none">
        <CardHeader className="">
          <CardTitle className="text-md">Total Project Type</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{data.type.length}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default StatisticsView;
