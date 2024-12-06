import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateTimeFromString } from "@/helper/dateTime";
import { MembershipItem } from "@/interfaces/membership";
import { extractErrors, genPbFiles } from "@/request/actions";
import { deleteMembership } from "@/request/worker/membership/membership";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

function MemberShipItemBox({
  membership,
  onDelete,
}: {
  membership: MembershipItem;
  onDelete: Function;
}) {
  const deleteMutate = useMutation({
    mutationKey: ["deleteMembership", "membership", membership.id],
    mutationFn: async (id: string) => {
      return await deleteMembership(id);
    },
    onSuccess(data, variables, context) {
      toast.dismiss();
      toast.success("New Membership Delete successfully");
      onDelete();
    },
    onError(error: any, variables, context) {
      toast.dismiss();
      const errors = extractErrors(error?.response);
      toast.error("Error! " + errors[0]);
    },
  });
  return (
    <div
      key={membership.id}
      style={{
        opacity: membership.active ? 1 : 0.5,
      }}
      className="w-full bg-main/10 rounded-3xl relative overflow-hidden"
    >
      {membership.popular && (
        <div className="absolute top-2 right-4 uppercase ">
          <Badge>Popular</Badge>
        </div>
      )}
      <div className="w-full h-48 bg-green-300/20 border-b-[8px] border-white flex justify-center items-center">
        <Image
          src={genPbFiles(membership, membership.image)}
          alt={membership.name}
          width={1200}
          height={1200}
          className="h-20 w-auto"
        />
      </div>
      <div
        className={`text-center p-3 pt-10 pb-3 flex justify-between flex-col bg-gray-50 items-center`}
      >
        <div>
          <h1 className="font-bold text-xl mb-3">{membership.name}</h1>

          <p className="line-through text-xs text-gray-400">
            {membership.compare_amount.toFixed(2)} OMR
          </p>
          <p className="font-semibold">{membership.amount} OMR</p>
          <p>Stocks: {membership.stocks}</p>
          <p className="text-xs mt-3">
            {formatDateTimeFromString(membership.created)}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <Link href={`/dashboard/memberships/plans/${membership.id}`}>
            <Button className="rounded-full py-3 mt-8 mb-7 md:px-6 px-8">
              EDIT
            </Button>
          </Link>
          <Button
            variant="destructive"
            className="rounded-full py-3 mt-8 mb-7 md:px-6 px-8"
            onClick={() => {
              const confirm = window.confirm(
                "Are you sure you want to delete this membership?"
              );
              if (confirm) {
                deleteMutate.mutate(membership.id);
              }
            }}
            disabled={deleteMutate.isLoading}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MemberShipItemBox;
