import { SDGITEM } from "@/interfaces/sdg";
import { cn } from "@/lib/utils";
import { client, genPbFiles } from "@/request/actions";
import Image from "next/image";
import React, { useState } from "react";
import { useQuery } from "react-query";

function ClimateChengeImpact() {
  const data = useQuery({
    queryKey: ["cc-impact"],
    queryFn: async () => {
      const data = await client.get("/impact/status").send<
        (SDGITEM & {
          count: {
            id: string;
            name: string;
            unit: string;
            value: string;
          }[];
        })[]
      >();

      return data;
    },
  });
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="grid grid-cols-4 gap-8 mt-10">
        <div className="flex flex-col gap-5">
          {data.data?.map((e, i) => {
            return (
              <div
                className={cn(
                  "flex justify-start items-center gap-4 border-2 cursor-pointer p-2",
                  index == i && "border-main bg-green-600 text-white"
                )}
                key={e.id}
                onClick={() => setIndex(i)}
              >
                <Image
                  src={genPbFiles(e, e.image)}
                  alt=""
                  width={200}
                  height={200}
                  className="w-20 h-20"
                />
                <p className="font-bold">{e.name}</p>
              </div>
            );
          })}
        </div>
        <div className="col-span-3">
          <h1 className="text-2xl font-bold underline mb-7">Impact Reports</h1>
          {data.data &&
            data?.data[index].count.map((v, i) => {
              return (
                <div
                  className={cn(
                    "border p-4 flex justify-between items-center",
                    i % 2 == 0 && "bg-gray-100",
                    i != 0 && "border-t-0"
                  )}
                  key={i}
                >
                  <div className="flex justify-start items-center gap-4">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        background: `linear-gradient(to right, ${data.data[index].main_color}, ${data.data[index].sub_color})`,
                      }}
                    />
                    <p className="font-semibold">{v.name}</p>
                  </div>
                  <p>
                    <span className="font-semibold">{v.value}</span> {v.unit}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ClimateChengeImpact;
