// src/hooks/useApplyFilters.ts

import { useState } from "react";
import { monthsAgo } from "@/helper/dateTime";
import { ProjectItem } from "@/interfaces/project"; // Assuming you have a Tree interface defined
import { Tree } from "@/interfaces/treeOrders";

// Define the types for filter results
interface FilterByType {
  [key: string]: Tree[]; // This allows dynamic keys with Tree arrays as values
}
const useApplyFilters = () => {
  const [data, setData] = useState<ProjectItem[]>([]);
  const [filterResults, setFilterResults] = useState<{
    tree_types: { name: string; total: number }[];
    status: { name: string; total: number }[];
    area_type: { name: string; total: number }[];
    planting_date: { name: string; total: number }[];
  }>({
    tree_types: [],
    status: [],
    area_type: [],
    planting_date: [],
  });

  const applyFilters = (input: ProjectItem[]) => {
    const res: ProjectItem[] = JSON.parse(JSON.stringify(input));

    const uniqueTreeTypes = new Map<string, number>();
    const uniqueStatuses = new Map<string, number>();
    const uniqueAreaTypes = new Map<string, number>();
    const dateRangeCounts = {
      lessThan6Months: 0,
      sixToTwelveMonths: 0,
      oneToTwoYears: 0,
      moreThanThreeYears: 0,
    };

    res.forEach((project) => {
      project.orders?.forEach((order) => {
        const filter_by_status: FilterByType = {};
        const filter_by_tree_type: FilterByType = {};
        const filter_by_area_type: FilterByType = {};
        const filter_by_date = {
          lessThan6Months: [] as Tree[],
          sixToTwelveMonths: [] as Tree[],
          oneToTwoYears: [] as Tree[],
          moreThanThreeYears: [] as Tree[],
        };

        order.expand?.trees
          ?.filter((tree) => tree.status !== "pending")
          .forEach((tree: Tree) => {
            filter_by_status[tree.status] = [
              ...(filter_by_status[tree.status] || []),
              tree,
            ];

            if (tree.treeType) {
              uniqueTreeTypes.set(
                tree.treeType,
                (uniqueTreeTypes.get(tree.treeType) || 0) + 1
              );
              filter_by_tree_type[tree.treeType] = [
                ...(filter_by_tree_type[tree.treeType] || []),
                tree,
              ];
            }

            uniqueStatuses.set(
              tree.status,
              (uniqueStatuses.get(tree.status) || 0) + 1
            );

            if (tree.area?.areaType) {
              uniqueAreaTypes.set(
                tree.area.areaType,
                (uniqueAreaTypes.get(tree.area.areaType) || 0) + 1
              );
              filter_by_area_type[tree.area.areaType] = [
                ...(filter_by_area_type[tree.area.areaType] || []),
                tree,
              ];
            }

            if (tree.plant_date) {
              const date = monthsAgo(tree.plant_date);

              if (date < 6) {
                filter_by_date.lessThan6Months.push(tree);
                dateRangeCounts.lessThan6Months += 1;
              } else if (date < 12) {
                filter_by_date.sixToTwelveMonths.push(tree);
                dateRangeCounts.sixToTwelveMonths += 1;
              } else if (date < 24) {
                filter_by_date.oneToTwoYears.push(tree);
                dateRangeCounts.oneToTwoYears += 1;
              } else {
                filter_by_date.moreThanThreeYears.push(tree);
                dateRangeCounts.moreThanThreeYears += 1;
              }
            }
          });

        order.filter_by_status = filter_by_status;
        order.filter_by_tree_type = filter_by_tree_type;
        order.filter_by_area_type = filter_by_area_type;
        order.filter_by_date = filter_by_date;
      });
    });

    const tree_types = Array.from(uniqueTreeTypes.entries()).map(
      ([name, total]) => ({
        name,
        total,
      })
    );

    const status = Array.from(uniqueStatuses.entries()).map(
      ([name, total]) => ({
        name,
        total,
      })
    );

    const area_type = Array.from(uniqueAreaTypes.entries()).map(
      ([name, total]) => ({
        name,
        total,
      })
    );

    const planting_date = [
      { name: "Less Than 6 Months", total: dateRangeCounts.lessThan6Months },
      { name: "6-12 Months", total: dateRangeCounts.sixToTwelveMonths },
      { name: "1-2 Years", total: dateRangeCounts.oneToTwoYears },
      { name: "More Than 3 Years", total: dateRangeCounts.moreThanThreeYears },
    ];

    setData(res);
    setFilterResults({
      tree_types,
      status,
      area_type,
      planting_date,
    });
  };

  return {
    data,
    filterResults,
    applyFilters,
  };
};

export default useApplyFilters;
