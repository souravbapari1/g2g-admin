"use client";

import { Button } from "@/components/ui/button";
import { requestOrdersWithProjects } from "@/request/worker/orders/treeorders/modifyTreeOrders";

function page() {
  return (
    <div>
      <Button onClick={requestOrdersWithProjects}>Click</Button>
    </div>
  );
}

export default page;
