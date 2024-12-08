import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "react-query";
import { PodCastCategory, updatePodcastCategory } from "./actions";
import toast from "react-hot-toast";
import { extractErrors } from "@/request/actions";

function UpdateCategory({
  children,
  data,
  onComplete,
}: {
  children: React.ReactNode;
  data: PodCastCategory;
  onComplete: Function;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(data.name);
  const update = useMutation({
    mutationKey: ["updateCategory"],
    mutationFn: async () => {
      return await updatePodcastCategory(data.id, {
        name,
      });
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Category added successfully");
      onComplete();
      setOpen(false);
    },
    onError: (error: any) => {
      const errors = extractErrors(error?.response);
      toast.dismiss();
      toast.error(errors?.[0]);
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
        </DialogHeader>
        <div>
          <Label>Category Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <Button
          disabled={update.isLoading}
          onClick={() => {
            if (name.length > 0) {
              update.mutate();
            }
          }}
        >
          Save Category
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateCategory;
