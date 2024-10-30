import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tree } from "@/interfaces/treeOrders";
import { Eye } from "lucide-react";

import React from "react";
import TreeReport from "../planting/TreeReport/TreeReport";
import ReportsListTree from "../planting/TreeReport/ReportsListTree";

function ViewReport({ tree }: { tree: Tree }) {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="mx-auto w-full flex justify-center items-center">
          <Eye />
        </div>
      </SheetTrigger>
      <SheetContent>
        <ReportsListTree tree={tree} />
      </SheetContent>
    </Sheet>
  );
}

export default ViewReport;
