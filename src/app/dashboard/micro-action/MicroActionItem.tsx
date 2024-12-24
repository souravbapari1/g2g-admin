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
import { client, genPbFiles } from "@/request/actions";
import { formatDateTimeFromString } from "@/helper/dateTime";
import { Edit, Trash2 } from "lucide-react";
import { useQuery } from "react-query";
function MicroActionItem({
  data,
  onDelete,
}: {
  data: MicroActionDataItem;
  onDelete?: (e: MicroActionDataItem) => void;
}) {
  const onDeleteAction = async () => {
    const res = confirm("Are you sure you want to delete tdis action");
    if (res) {
      const res = await deleteMicroAction(data.id);
      if (onDelete) {
        onDelete(res);
      }
    }
  };

  const statusData = useQuery({
    queryKey: ["mc", data.id],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      return await client.get("/soloimpact/status", { id: data.id }).send<{
        current: number;
        submits: number;
        users: number;
      }>();
    },
  });

  return (
    <tr className="text-red-700">
      <td>{data.id}</td>
      <td>{data.title}</td>
      <td className="text-center">{data.kgPerUnit}</td>
      <td className="text-center">{statusData.data?.submits || "--"}</td>
      <td className="text-center">{statusData.data?.users || "--"}</td>
      <td className="text-center">{statusData.data?.current || "--"}</td>
      <td>
        <AvatarGroup isBordered>
          {data?.expand?.partners?.map((p) => (
            <Avatar size="sm" src={genPbFiles(p, p.avatar)} key={p.id} />
          ))}
        </AvatarGroup>
      </td>
      <td>{formatDateTimeFromString(data.created)}</td>
      <td>{data.public ? "Published" : "Draft"}</td>

      <td className="action">
        <div className="flex justify-center items-center gap-4 text-sm">
          <Link href={`/dashboard/micro-action/edit/${data.id}`}>
            <Edit size={15} />
          </Link>
          <Trash2 size={15} color="red" onClick={onDeleteAction} />
        </div>
      </td>
    </tr>
  );
}

export default MicroActionItem;
