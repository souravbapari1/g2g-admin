import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ViewList from "./viewList";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { cn } from "@/lib/utils";
import { IoCloseOutline } from "react-icons/io5";
import { setPlantingData } from "@/redux/Slices/plantingSlice";
import { useState } from "react";
import FilterOptions from "./FilterOptions";
import FilterdListView from "./filterView/FilterdListView";
import PreviewList from "./preview/PreviewList";
import { useQuery } from "react-query";
import { client, genPbFiles } from "@/request/actions";
import { SDGITEM } from "@/interfaces/sdg";
import Image from "next/image";

function PlantingOption() {
  const platingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();
  const [filterType, setFilterType] = useState<string | null>(null);
  const status = useQuery({
    queryKey: ["status"],
    queryFn: async () =>
      await client.get("/impact/status").send<
        (SDGITEM & {
          count: {
            id: string;
            name: string;
            unit: string;
            value: string;
          }[];
        })[]
      >(),
  });
  return (
    <div
      className={cn(
        "h-screen w-80 overflow-auto z-20 bg-gray-100 p-3 fixed top-0 left-0  duration-300",
        platingSlice.openTreesPanel ? "translate-x-0 " : "-translate-x-full "
      )}
    >
      <div className="relative">
        <div
          onClick={() => dispatch(setPlantingData({ openTreesPanel: false }))}
          className="w-5 h-5 bg-red-600 rounded-full shadow-md flex justify-center items-center cursor-pointer text-white absolute top-0 right-0"
        >
          <IoCloseOutline />
        </div>
        <div>
          <Label>Display By</Label>
          <Select value={filterType || ""} onValueChange={setFilterType}>
            <SelectTrigger className="w-full mt-1 rounded-none bg-black-50/60 backdrop-blur-3xl border-white">
              <SelectValue placeholder="No Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="reset">No Filter</SelectItem>
              <SelectItem value="tree-type">Tree Type</SelectItem>
              <SelectItem value="conditions">Conditions</SelectItem>
              <SelectItem value="tree-age">Tree Age</SelectItem>
              <SelectItem value="area-type">Area Type</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <FilterOptions type={filterType || ""} />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-b-0">
            <AccordionTrigger>Statics and Impacts :</AccordionTrigger>
            <AccordionContent>
              <div className="">
                <div className="flex flex-col gap-2">
                  {status.data?.map((e, i) => {
                    const v = e.count[0];
                    return (
                      <div className="border bg-white">
                        <div
                          className={cn(
                            "flex justify-start items-center gap-4  cursor-pointer p-1"
                          )}
                          key={e.id}
                        >
                          <Image
                            src={genPbFiles(e, e.image)}
                            alt=""
                            width={200}
                            height={200}
                            className="w-7 h-7"
                          />
                          <p className="font-bold text-xs">{e.name}</p>
                        </div>
                        <div
                          className={cn(
                            " p-4 py-2 flex justify-between items-center",
                            i % 2 == 0 && "bg-gray-100",
                            i != 0 && "border-t-0"
                          )}
                          key={i}
                        >
                          <div className="flex justify-start items-center gap-4">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{
                                background: `linear-gradient(to right, ${e.main_color}, ${e.sub_color})`,
                              }}
                            />
                            <p className="font-semibold text-xs">{v.name}</p>
                          </div>
                          <p className="text-xs">
                            <span className="font-semibold text-xs">
                              {v.value}
                            </span>{" "}
                            {v.unit}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {platingSlice.filterOptions.length == 0 ? (
          platingSlice.startPlanting ? (
            <ViewList />
          ) : (
            <PreviewList />
          )
        ) : (
          <FilterdListView />
        )}
      </div>
    </div>
  );
}

export default PlantingOption;
