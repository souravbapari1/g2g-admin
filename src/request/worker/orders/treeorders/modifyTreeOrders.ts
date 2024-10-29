import { Tree } from "@/interfaces/treeOrders";
import { getProject } from "../../project/manageProject";
import { loadAllTreeOrders } from "./manageTreeOrders";
import { UserItem } from "@/interfaces/user";

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

    project.total_trees = totalNotPlantedTrees;
  });

  return projectsList;
};
