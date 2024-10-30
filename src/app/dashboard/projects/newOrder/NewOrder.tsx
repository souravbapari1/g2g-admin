import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
import { Combobox } from "@/components/ui/comb-box";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { client } from "@/request/actions";

function NewOrder({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [treesNumber, setTreesNumber] = useState<number | undefined>(undefined);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const { usersListGlobal } = useGlobalDataSetContext();

  const createNewOrder = async () => {
    toast.dismiss();
    if (!selectedUser || !treesNumber || !amount) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      toast.loading("Creating Order...");
      const req = await client
        .post("/api/collections/tree_planting_orders/records")
        .json({
          user: selectedUser,
          project: projectId,
          tree_count: treesNumber,
          amount: amount,
        })
        .send();
      toast.dismiss();
      toast.success("Order created successfully");
      console.log(req);
      setSelectedUser("");
      setTreesNumber(undefined);
      setAmount(undefined);
      setOpen(false);
      setLoading(false);
    } catch (error) {
      toast.dismiss();
      setLoading(false);
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Plus size={18} className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create New Order</SheetTitle>
        </SheetHeader>
        <div className="mt-5">
          <Label>Select User</Label>
          <Select
            value={selectedUser}
            onValueChange={(value) => setSelectedUser(value)}
          >
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {usersListGlobal?.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.first_name + " " + user.last_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mt-3">
          <Label>Number Of Trees</Label>
          <Input
            type="number"
            value={treesNumber}
            onChange={(e) => setTreesNumber(Number(e.target.value))}
            className="mt-2"
          />
        </div>
        <div className="mt-3">
          <Label>Amount</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-2"
          />
        </div>
        <Button
          className="w-full mt-5"
          disabled={loading}
          onClick={createNewOrder}
        >
          Create New Order
        </Button>
      </SheetContent>
    </Sheet>
  );
}

export default NewOrder;
