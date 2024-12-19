import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { isThisNotificationSend, pushNotification } from "./function";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

function NoReport({
  month,
  week,
  year,
  user,
}: {
  year: string;
  month: string;
  week: string;
  user: string;
}) {
  const [open, setOpen] = useState(false);
  const id = `${year}-${month}-${week.toUpperCase()}`;
  const [Message, setMessage] = useState("");
  const isSendNotification = useQuery({
    queryKey: ["isSendNotification", user, id],
    queryFn: async () => {
      return await isThisNotificationSend(id, user);
    },
  });

  const requestDataMutate = useMutation({
    mutationKey: ["pushNotification", user, id],
    mutationFn: async (data: {
      title: string;
      description: string;
      actionLink: string;
      reportID: string;
      user: string;
    }) => {
      return await pushNotification(data);
    },
    onSuccess(data, variables, context) {
      toast.success("Request Sent Successfully");
      setOpen(false);
      isSendNotification.refetch();
      setMessage("");
    },
    onError(error, variables, context) {
      toast.error("Request Sent Failed");
    },
  });

  return (
    <div className="w-full rounded-md px-10 py-8 border bg-gray-100">
      <h1 className="text-2xl font-bold">No Report Found</h1>
      <p>
        Report for {week} of {month}, {year}
      </p>

      <Dialog
        open={open}
        onOpenChange={(e) => {
          if (isSendNotification.isLoading || isSendNotification.data) {
            setOpen(false);
          } else {
            setOpen(e);
          }
        }}
      >
        <DialogTrigger>
          <Button
            disabled={isSendNotification.isLoading || isSendNotification.data}
            variant={isSendNotification.data ? "outline" : "default"}
            size="sm"
            className="rounded-none mt-2"
          >
            {isSendNotification.data ? "Request Already Send" : "Send Request"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send A Request</DialogTitle>
          </DialogHeader>
          <div className="">
            <Label>Your Message</Label>
            <Textarea
              onChange={(e) => setMessage(e.target.value)}
              value={Message}
            />
          </div>
          <Button
            disabled={requestDataMutate.isLoading}
            onClick={() => {
              if (!Message) {
                toast.error("Message is required");
                return false;
              }
              requestDataMutate.mutate({
                title: `Report Request for ${week} of ${month}, ${year}`,
                description: Message,
                actionLink: "/account/reports/submit?id=" + id,
                reportID: id,
                user: user,
              });
            }}
          >
            Send Request
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NoReport;
