"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { addPodcastCategory } from "./actions";
import { useMutation } from "react-query";
import toast from "react-hot-toast";

export default function AddNewCategory({ onAddNew }: { onAddNew: Function }) {
  const [name, setName] = useState("");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const mutate = useMutation({
    mutationKey: ["addCategory", "podcastCategories"],
    mutationFn: async () => {
      if (!name) {
        toast.error("Category name is required");
        throw new Error("Category name is required");
      }
      await addPodcastCategory({
        name,
      });
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Category added successfully");
      onAddNew();
      setName("");
      onClose();
    },
    onError: (error: any) => {
      toast.dismiss();
      toast.error(error?.message || "Something went wrong");
    },
  });

  return (
    <>
      <Button onPress={onOpen}>New Category</Button>
      <Modal
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Enter Category Name
              </ModalHeader>
              <ModalBody>
                <div className="">
                  <Label>Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    mutate.mutate();
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
