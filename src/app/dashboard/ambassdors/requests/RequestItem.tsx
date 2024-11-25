import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatTimestampCustom } from "@/helper/dateTime";
import { Button } from "@/components/ui/button";
import { UserItem } from "@/interfaces/user";
import { AdminAuthToken, client, genPbFiles } from "@/request/actions";
import { use } from "react";
import { useMutation } from "react-query";
import toast from "react-hot-toast";

function RequestItem({
  user,
  id,
  onUpdate,
}: {
  user: UserItem;
  id: string;
  onUpdate: Function;
}) {
  const mutate = useMutation({
    mutationKey: ["updateAmbassadorStatus", user.id, "ambRequests"],
    mutationFn: async (data: { status: string }) => {
      await client
        .patch(`/api/collections/ambassador_requests/records/${id}`)
        .json({
          status: data.status,
        })
        .send(AdminAuthToken());
      if (data.status === "approved") {
        await client
          .patch(`/api/collections/users/records/${user.id}`)
          .json({
            user_type: "ambassador",
          })
          .send(AdminAuthToken());
      }
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Status updated successfully");
      onUpdate();
    },
    onError: (err) => {
      console.log(err);

      toast.dismiss();
      toast.error("Something went wrong! Status not updated");
    },
  });
  return (
    <div className="  rounded-lg h-72 p-4 shadow-md border flex flex-col justify-between items-center gap-4">
      <div className="flex justify-center items-center flex-col gap-4 mt-5">
        <Avatar className="w-20 h-20">
          <AvatarImage
            src={genPbFiles(user, user.avatar)}
            className="w-20 h-20"
          />
          <AvatarFallback>
            {user.first_name.split("")[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h1 className="font-bold">
          {user.first_name} {user.last_name}
        </h1>
        <p>{formatTimestampCustom(user.created)}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 w-full">
        <Button
          size={"sm"}
          variant={"outline"}
          className="w-full"
          disabled={mutate.isLoading}
          onClick={async () => {
            mutate.mutate({ status: "approved" });
          }}
        >
          Accept
        </Button>
        <Button
          size={"sm"}
          variant={"destructive"}
          className="w-full"
          disabled={mutate.isLoading}
          onClick={async () => {
            mutate.mutate({ status: "reject" });
          }}
        >
          Reject
        </Button>
      </div>
    </div>
  );
}

export default RequestItem;
