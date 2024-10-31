import { Tree } from "@/interfaces/treeOrders";
import { getProject } from "../../project/manageProject";
import { loadAllTreeOrders } from "./manageTreeOrders";
import { UserItem } from "@/interfaces/user";
import { Area } from "recharts";

export const requestOrdersWithProjects = async (
  onProgress: (progress: number) => void
) => {
  // Stage 1: Loading all tree orders with progress
  const orders = await loadAllTreeOrders(1, [], (pageProgress) => {
    // Adjust page progress to fit within the first half (80%) of total progress
    onProgress(Math.floor(pageProgress * 0.8));
  });

  const projectIds = orders.map((order) => order.project);
  const uniqueProjectIds = Array.from(new Set(projectIds));
  const totalProjects = uniqueProjectIds.length;

  let projectProgressOffset = 50; // Starting point for projects' progress

  // Stage 2: Loading project details
  const projectsListPromise = uniqueProjectIds.map(async (id, index) => {
    const project = await getProject(
      id,
      "id,collectionName,collectionId,name,type,main_interventions,unit_measurement,number_of_target_unit,omr_unit,start_date,marker,workareas,operated_by,status,country,city,sort_title,preview_image"
    );

    // Calculate progress for project loading stage

    const progress =
      projectProgressOffset + Math.floor(((index + 1) / totalProjects) * 50);
    onProgress(progress);

    return project;
  });

  const projectsList = await Promise.all(projectsListPromise);

  // Populate orders for each project
  projectsList.forEach((project) => {
    let totalNotPlantedTrees = 0;
    project.orders = [];

    // This Filter Planted Nit Planted DAta
    orders.forEach((order) => {
      if (project.id === order.project) {
        order.not_planted_trees = [];
        order.planted_trees = [];

        order.expand.trees.forEach((tree: Tree) => {
          if (tree.status === "pending") {
            order?.not_planted_trees?.push(tree);
            totalNotPlantedTrees++;
          } else {
            order?.planted_trees?.push(tree);
          }
        });

        project?.orders?.push(order);
      }
    });

    // This Code Sort Of Area Type Trees
    project.workareas.areaInfo.forEach((area) => {
      const areaType = area.areaName;
      project.orders?.forEach((order) => {
        order.expand.trees.forEach((tree) => {
          if (tree.area && tree.area.areaName === areaType) {
            if (project.byArea) {
              if (project.byArea[areaType]) {
                project.byArea[areaType].push(tree);
              } else {
                project.byArea[areaType] = [tree];
              }
            } else {
              project.byArea = {
                [areaType]: [tree],
              };
            }
          }
        });
      });
    });

    project.total_trees = totalNotPlantedTrees;
  });

  return projectsList;
};
