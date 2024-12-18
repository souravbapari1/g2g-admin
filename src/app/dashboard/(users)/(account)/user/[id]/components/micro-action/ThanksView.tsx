import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useMicroActionState } from "./microActioonState";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function ThanksView({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const data = useMicroActionState();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-auto max-h-[90vh] hide-scroll">
        <div className="flex gap-5">
          <Image
            src="/assets/badge.png"
            alt="Thanks"
            width={500}
            height={500}
            className="md:w-28 w-16 h-auto"
          />
          <div className="md:mt-10 mt-3">
            <h1 className="md:text-2xl font-bold">You have made an impact!</h1>
            <p>Thank you for your contribution</p>
          </div>
        </div>
        <h2 className={cn("text-md text-center font-bold mt-0 text-primary")}>
          {data.data.impact} {data?.selected?.title}
        </h2>
        <div className="flex justify-center items-center">
          <Badge
            variant="secondary"
            className={cn(
              "text-sm text-center  mt-0 px-6 py-2 rounded-full mx-auto text-gray-900"
            )}
          >
            {(data?.data?.impact || 0) * (data?.selected?.kgPerUnit || 0)} Kg of
            Carbon Offset
          </Badge>
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: data?.selected?.description || "",
          }}
        />
        <Button
          className="w-full py-5 shadow-none"
          onClick={() => setOpen(false)}
        >
          Take More Impact
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default ThanksView;
