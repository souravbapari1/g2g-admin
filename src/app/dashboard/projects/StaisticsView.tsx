import React, { useEffect, useState } from "react";
import { StatusData } from "./types/status";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { client } from "@/request/actions";

function StatisticsView() {
  const [data, setData] = useState<StatusData>();
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      const response = await client.get("/project/status").send<StatusData>();
      setData(response);
    } catch (error) {
      console.error("Error fetching status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  if (loading) {
    return <></>;
  }

  if (!data) {
    return <p className="text-center text-gray-500">No data available</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-10">
      {data.status.map((item) => (
        <Card className="rounded-lg shadow-sm border" key={item.id}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold capitalize">
              {item.status} Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-800">{item.total}</p>
          </CardContent>
        </Card>
      ))}
      <CardDetails title="Total Country" value={data.country.length} />
      <CardDetails title="Total City" value={data.city.length} />
      <CardDetails title="Total Project Type" value={data.type.length} />
      <CardDetails
        title="Total Interventions"
        value={data.interventions.length}
      />
    </div>
  );
}

const CardDetails = ({ title, value }: { title: string; value: number }) => (
  <Card className="rounded-lg shadow-sm border">
    <CardHeader>
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </CardContent>
  </Card>
);

export default StatisticsView;
