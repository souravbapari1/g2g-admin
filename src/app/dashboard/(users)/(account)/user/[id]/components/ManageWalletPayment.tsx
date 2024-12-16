"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { UserItem } from "@/interfaces/user";
import { addTransition, updateUser } from "@/request/worker/users/manageUsers";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

function ManageWalletPayment({
  children,
  user,
  onUpdate,
}: {
  children: React.ReactNode;
  user: UserItem;
  onUpdate?: Function;
}) {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const [amount, setAmount] = useState<number>();
  const [reason, setReason] = useState<string>("");
  const [state, setState] = useState<"CREDIT" | "DEBIT">("CREDIT");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  };

  const handelPayment = useMutation({
    mutationFn: async (id: string) => {
      const payment =
        state === "CREDIT" ? user.wallet + amount! : user.wallet - amount!;

      await updateUser(id, {
        wallet: payment,
      });
      await addTransition({
        reason: reason,
        amount: amount!,
        type: state,
        user: id,
        actionBy: session.data?.user.id || "",
      });
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success(" Transaction successfully");
      setAmount(0);
      setReason("");
      onUpdate && onUpdate();
      setOpen(false);
    },
    onError: (error) => {
      console.log(error);

      toast.dismiss();
      toast.error("Something went wrong! Transaction failed");
    },
  });

  const handleProceed = () => {
    if (state === "DEBIT") {
      if ((amount || 0) > user.wallet) {
        toast.error("Insufficient Balance");
        return false;
      }
    }
    if (amount && reason) {
      const confirm = window.confirm("Are you sure you want to proceed?");
      if (confirm) {
        handelPayment.mutate(user.id);
      }
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Transitions</DialogTitle>
        </DialogHeader>
        <Tabs
          defaultValue={state}
          value={state}
          onValueChange={(e) => setState(e as any)}
          className="w-full"
        >
          <TabsList className="w-full">
            <TabsTrigger value="CREDIT" className="w-full">
              Credit Amount
            </TabsTrigger>
            <TabsTrigger value="DEBIT" className="w-full">
              Debit Amount
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="">
          <div className="">
            <Label>Amount</Label>
            <Input type="number" value={amount} onChange={handleAmountChange} />
          </div>
          <div className="mt-2">
            <Label>Reason</Label>
            <Textarea value={reason} onChange={handleReasonChange} />
          </div>
          <div className="mt-5">
            <Button
              className="w-full"
              disabled={handelPayment.isLoading}
              onClick={handleProceed}
            >
              Proceed Transitions
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ManageWalletPayment;
