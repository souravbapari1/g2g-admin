"use client";

import { Button } from "@/components/ui/button";
import { monthsAgo } from "@/helper/dateTime";
import useApplyFilters from "@/hooks/useApplyFilter";
import { requestOrdersWithProjects } from "@/request/worker/orders/treeorders/modifyTreeOrders";
import { useState } from "react";

function Page() {
  const { applyFilters, data, filterResults } = useApplyFilters();

  console.log({ data, filterResults });

  const applyFilterss = async () => {
    const res = await requestOrdersWithProjects((progress: number) => {
      console.log(progress);
    });

    // Initialize sets to collect unique values
    const uniqueTreeTypes = new Set<string>();
    const uniqueStatuses = new Set<string>();
    const uniqueAreaTypes = new Set<string>();

    res.forEach((project) => {
      project.orders?.forEach((order) => {
        // Initialize filter_by_status, filter_by_tree_type, and filter_by_area_type once per order
        order.filter_by_status = {};
        order.filter_by_tree_type = {};
        order.filter_by_area_type = {};
        order.filter_by_date = {
          // Initialize filter_by_date
          lessThan6Months: [],
          sixToTwelveMonths: [],
          oneToTwoYears: [],
          moreThanThreeYears: [],
        };

        order.expand?.trees
          ?.filter((tree) => tree.status !== "pending")
          .forEach((tree) => {
            // Group trees by status
            order.filter_by_status![tree.status] = [
              ...(order.filter_by_status![tree.status] || []),
              tree,
            ];

            // Collect unique tree types
            if (tree.treeType) {
              uniqueTreeTypes.add(tree.treeType);
              order.filter_by_tree_type![tree.treeType] = [
                ...(order.filter_by_tree_type![tree.treeType] || []),
                tree,
              ];
            }

            // Collect unique statuses
            uniqueStatuses.add(tree.status);

            // Group trees by areaType
            if (tree.area?.areaType) {
              uniqueAreaTypes.add(tree.area.areaType);
              order.filter_by_area_type![tree.area.areaType] = [
                ...(order.filter_by_area_type![tree.area.areaType] || []),
                tree,
              ];
            }

            // Categorize trees based on planting date
            if (tree.plant_date) {
              const date = monthsAgo(tree.plant_date);
              console.log(date);

              if (date < 6) {
                order.filter_by_date?.lessThan6Months?.push(tree);
              } else if (date < 12) {
                order.filter_by_date?.sixToTwelveMonths?.push(tree);
              } else if (date < 24) {
                order.filter_by_date?.oneToTwoYears?.push(tree);
              } else {
                order.filter_by_date?.moreThanThreeYears?.push(tree);
              }
            }
          });
      });
    });

    // Convert sets to arrays
    return {
      data: res,
      tree_types: Array.from(uniqueTreeTypes),
      status: Array.from(uniqueStatuses),
      area_type: Array.from(uniqueAreaTypes),
    };
  };

  return (
    <div>
      <Button
        onClick={async () => {
          const res = await requestOrdersWithProjects((progress: number) => {
            console.log(progress);
          });
          const data = applyFilters(res);
          console.log(data);
        }}
      >
        Click
      </Button>

      <br />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Page;
