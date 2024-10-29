import { useMapContext } from "@/components/context/mapContext";
import { TreeOrderItem } from "@/interfaces/treeOrders";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useCallback, useState } from "react";
import { filterTypes } from "../FilterOptions";
import TreeListItem from "./TreeListItem";
const treeAgeMapping = {
  "Less Than 6 Months": "lessThan6Months",
  "6-12 Months": "sixToTwelveMonths",
  "1-2 Years": "oneToTwoYears",
  "More Than 3 Years": "moreThanThreeYears",
} as const;

type TreeAgeOption = keyof typeof treeAgeMapping;

function FilterTreeView({
  option,
  order,
}: {
  option: string;
  order: TreeOrderItem;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  const { map } = useMapContext();
  const plantingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();

  const countOrderTree = useCallback(() => {
    let count = 0;

    if (
      plantingSlice.filterType === filterTypes.treeType &&
      order.filter_by_tree_type?.[option]
    ) {
      count = order.filter_by_tree_type[option].length;
    }

    if (
      plantingSlice.filterType === filterTypes.conditions &&
      order.filter_by_status?.[option]
    ) {
      count = order.filter_by_status[option].length;
    }

    if (
      plantingSlice.filterType === filterTypes.areaType &&
      order.filter_by_area_type?.[option]
    ) {
      count = order.filter_by_area_type[option].length;
    }

    if (plantingSlice.filterType === filterTypes.treeAge) {
      const dateKey = treeAgeMapping[option as TreeAgeOption];
      if (dateKey && order.filter_by_date?.[dateKey]) {
        count = order.filter_by_date[dateKey].length;
      }
    }

    return count;
  }, [order, option, plantingSlice.filterType]);

  if (countOrderTree() === 0) {
    return <></>;
  }

  return (
    <div className="w-full">
      <div
        onClick={() => setOpen(!open)}
        className="bg-blue-50 px-2 pl-4 border-b border-white cursor-pointer py-2 w-full flex justify-between items-center"
      >
        <p className="font-bold capitalize">
          {option} <small>({countOrderTree()} Trees)</small>
        </p>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </div>

      {open && (
        <div className="">
          {plantingSlice.filterType === filterTypes.treeType &&
            order.filter_by_tree_type?.[option]?.map((item) => (
              <TreeListItem key={item.id} tree={item} />
            ))}

          {plantingSlice.filterType === filterTypes.conditions &&
            order.filter_by_status?.[option]?.map((item) => (
              <TreeListItem key={item.id} tree={item} />
            ))}

          {plantingSlice.filterType === filterTypes.areaType &&
            order.filter_by_area_type?.[option]?.map((item) => (
              <TreeListItem key={item.id} tree={item} />
            ))}

          {plantingSlice.filterType === filterTypes.treeAge &&
            order.filter_by_date?.[
              treeAgeMapping[option as TreeAgeOption]
            ]?.map((item) => <TreeListItem key={item.id} tree={item} />)}
        </div>
      )}
    </div>
  );
}

export default FilterTreeView;
