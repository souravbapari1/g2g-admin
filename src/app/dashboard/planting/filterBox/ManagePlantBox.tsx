import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { setPlantingData } from "@/redux/Slices/plantingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateTree } from "@/request/worker/orders/treeorders/manageTree";
import { getTodayDate } from "@/helper/dateTime";
import { extractErrors } from "@/request/actions";
import { ProjectItem } from "@/interfaces/project";
import { Tree } from "@/interfaces/treeOrders";

export function ManagePlantBox() {
  const { treeTypeListGlobal } = useGlobalDataSetContext();
  const platingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");

  const project = platingSlice.ordersList.find(
    (proj) => proj.id === platingSlice.selectedTree?.project
  );

  useEffect(() => {
    // Function to handle keypress
    const handleKeyDown = (event: any) => {
      // Check for Ctrl + S (or Command + S on Mac)
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault(); // Prevent the default save action
        onUpdatePlanting();
      }
    };

    // Add the event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [platingSlice.selectedTree, type]);

  const onUpdatePlanting = async () => {
    toast.dismiss();
    if (!type) {
      toast.error("Please select tree type");
      return false;
    }

    try {
      setLoading(true);
      const treeType = treeTypeListGlobal.find((t) => t.id === type);
      toast.loading("Updating Tree...");

      const res = await updateTree(platingSlice.selectedTree!.id, {
        treeType: treeType?.name,
        type: type,
        plant_date: getTodayDate(),
        location: platingSlice.selectedTree?.location,
        area: platingSlice.selectedTree?.area,
        status: "not planted",
      });

      toast.dismiss();
      toast.success("Tree updated successfully");

      const updatedOrdersList: ProjectItem[] = platingSlice.ordersList.map(
        (project) => {
          if (project.id !== platingSlice.workingProject?.id) return project;

          return {
            ...project,
            total_trees: (project.total_trees || 0) - 1,
            byArea: {
              ...project.byArea,
              [platingSlice.selectedTree!.area.areaName]: [
                ...(
                  project.byArea?.[platingSlice.selectedTree!.area.areaName] ||
                  []
                ).filter((tree): tree is Tree => tree !== null),
                platingSlice.selectedTree!,
              ],
            },
            orders: project.orders?.map((order) => ({
              ...order,
              not_planted_trees: order.not_planted_trees?.filter(
                (tree) => tree.treeId !== platingSlice.selectedTree?.treeId
              ),
              expand: {
                ...order.expand,
                trees: order.expand.trees.map((tree) =>
                  tree.treeId === platingSlice.selectedTree?.treeId ? res : tree
                ),
              },
            })),
          };
        }
      );

      // Update Redux state with the new data
      dispatch(
        setPlantingData({
          workingTrees: platingSlice.workingTrees.filter(
            (t) => t.treeId !== platingSlice.selectedTree?.treeId
          ),
          workingProject: updatedOrdersList.find(
            (proj) => proj.id === platingSlice.workingProject?.id
          ),

          selectedTree: null,
          ordersList: updatedOrdersList,
        })
      );

      setLoading(false);
      return res;
    } catch (error: any) {
      toast.dismiss();
      const errors = extractErrors(error?.response);
      toast.error(errors[0]);
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Sheet
      open={platingSlice.selectedTree != null}
      onOpenChange={() => dispatch(setPlantingData({ selectedTree: null }))}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Tree ID: {platingSlice.selectedTree?.treeId}</SheetTitle>
        </SheetHeader>
        <div className="text-sm flex flex-col gap-2 mt-4 ">
          <p>Tree Name: {platingSlice.selectedTree?.treeName}</p>
          <p className="capitalize">
            Tree Status: {platingSlice.selectedTree?.status}
          </p>
          <p>Assigned Project: {project?.name}</p>
          <p>Planted Area: {platingSlice.selectedTree?.area.areaName}</p>
          <p>Order ID: {platingSlice.selectedTree?.orderIdNo}</p>
          <p>Tree Location: {platingSlice.selectedTree?.location}</p>
          <div className="mt-2">
            <Label className="font-semibold">Tree Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                {treeTypeListGlobal.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <br />
          <Button onClick={onUpdatePlanting} disabled={loading}>
            Save And Confirm Plant Tree <small>(CTRL + S)</small>
          </Button>

          <Button
            className="mt-2"
            variant="destructive"
            onClick={() => {
              dispatch(
                setPlantingData({
                  workingTrees: platingSlice.workingTrees.filter(
                    (t) => t.treeId !== platingSlice.selectedTree?.treeId
                  ),

                  selectedTree: null,
                })
              );
            }}
          >
            Remove Tree
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
