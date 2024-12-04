"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function MicroActionList() {
  return (
    <div className="grid lg:grid-cols-3 gap-5">
      <Card>
        <CardHeader>
          <CardTitle>Micro Action</CardTitle>
          <p>Kg Per Unit: 5 </p>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

export default MicroActionList;
