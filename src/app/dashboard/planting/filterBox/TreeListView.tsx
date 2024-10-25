import { Plus, TreePalm } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tree } from "@/interfaces/treeOrders";

function TreeListView({ tree }: { tree: Tree }) {
  return (
    <div className="py-2 px-3 border-t bg-white border-gray-100 flex justify-between items-center">
      <div className="flex gap-1 text-xs justify-start items-center ml-2">
        <TreePalm size={14} color="green" />
        <p>ID : {tree.treeId}</p>
      </div>
      <ProjectLIstViewAdd />
    </div>
  );
}

export default TreeListView;

function ProjectLIstViewAdd() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-3 rounded-full h-3 bg-green-600 cursor-pointer text-center flex justify-center items-center  text-white">
          <Plus size={8} />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tree Profile</DialogTitle>
        </DialogHeader>
        <div className="text-sm">
          <div className=" py-2 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <p>Tree ID:</p>
              <p>2112 </p>
            </div>
          </div>
          <div className=" py-2 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <p>Tree Name:</p>
              <p>XYZ NAme</p>
            </div>
          </div>

          <div className=" py-2 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <p>Tree Type:</p>
              <Select>
                <SelectTrigger className="w-[120px]  h-7">
                  <SelectValue placeholder="Mango" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Mango</SelectItem>
                  <SelectItem value="dark">Apple</SelectItem>
                  <SelectItem value="system">Orange</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className=" py-2 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <p>Assigned Project :</p>
              <p>Project ABCD</p>
            </div>
          </div>

          <div className=" py-2 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <p>Planted Area :</p>
              <p>Area 1</p>
            </div>
          </div>

          <div className=" py-2 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <p>Map Location :</p>
              <p>23.333,56.9844</p>
            </div>
          </div>
        </div>
        <DialogTrigger>
          <Button variant="outline" className="px-8">
            Confirm Tree
          </Button>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
  );
}
