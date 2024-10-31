"use client";

import { Button } from "@/components/ui/button";
import { monthsAgo } from "@/helper/dateTime";
import useApplyFilters from "@/hooks/useApplyFilter";
import { requestOrdersWithProjects } from "@/request/worker/orders/treeorders/modifyTreeOrders";
import { useState } from "react";

function Page() {
  return (
    <div>
      <Button
        onClick={async () => {
          let res = await requestOrdersWithProjects((progress: number) => {
            console.log(progress);
          });

          console.log(res);
        }}
      >
        Click
      </Button>

      <br />
    </div>
  );
}

export default Page;
