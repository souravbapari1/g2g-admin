"use client";

import { Button } from "@/components/ui/button";
import { requestOrdersWithProjects } from "@/request/worker/orders/treeorders/modifyTreeOrders";

function page() {
  return (
    <div>
      <Button
        onClick={async () => {
          const res = await requestOrdersWithProjects((progress: number) => {
            console.log(progress);
          });
          console.log(res);
        }}
      >
        Clcik
      </Button>
    </div>
  );
}

export default page;
