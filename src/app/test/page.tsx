"use client";
import { Button } from "@/components/ui/button";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import { monthsAgo } from "@/helper/dateTime";
import useApplyFilters from "@/hooks/useApplyFilter";
import { SDGITEM } from "@/interfaces/sdg";
import { cn } from "@/lib/utils";
import { client, genPbFiles } from "@/request/actions";
import { requestOrdersWithProjects } from "@/request/worker/orders/treeorders/modifyTreeOrders";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "react-query";

function Page() {
  const status = useQuery({
    queryKey: ["status"],
    queryFn: async () =>
      await client.get("/impact/status").send<
        (SDGITEM & {
          count: {
            id: string;
            name: string;
            unit: string;
            value: string;
          }[];
        })[]
      >(),
  });

  const index = 1;
  return <WorkSpace></WorkSpace>;
}

export default Page;
