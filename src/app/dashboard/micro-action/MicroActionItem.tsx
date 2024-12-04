import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/avatar";
import Link from "next/link";
import { deleteMicroAction, MicroActionDataItem } from "./actions";
import { genPbFiles } from "@/request/actions";
function MicroActionItem({
  data,
  onDelete,
}: {
  data: MicroActionDataItem;
  onDelete?: (e: MicroActionDataItem) => void;
}) {
  const onDeleteAction = async () => {
    const res = confirm("Are you sure you want to delete this action");
    if (res) {
      const res = await deleteMicroAction(data.id);
      if (onDelete) {
        onDelete(res);
      }
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <p>Kg Per Unit: {data.kgPerUnit}</p>
      </CardHeader>
      <CardContent>
        <AvatarGroup isBordered>
          {data?.expand?.partners?.map((p) => (
            <Avatar size="sm" src={genPbFiles(p, p.avatar)} key={p.id} />
          ))}
        </AvatarGroup>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-start gap-3">
          <Link href={"/dashboard/micro-action/edit/" + data.id}>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </Link>
          <Button onClick={onDeleteAction} variant="destructive" size="sm">
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default MicroActionItem;
