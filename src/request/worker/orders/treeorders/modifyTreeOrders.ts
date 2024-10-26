import { Tree } from "@/interfaces/treeOrders";
import { getProject } from "../../project/manageProject";
import { loadAllTreeOrders } from "./manageTreeOrders";

export const requestOrdersWithProjects = async (
  onProgress: (progress: number) => void
) => {
  const orders = await loadAllTreeOrders();
  const projectIds = orders.map((order) => order.project);
  const uniqueProjectIds = Array.from(new Set(projectIds));

  const totalProjects = uniqueProjectIds.length;
  const projectsListPromise = uniqueProjectIds.map(async (id, index) => {
    const project = await getProject(
      id,
      "id,collectionName,collectionId,name,type,main_interventions,unit_measurement,number_of_target_unit,omr_unit,start_date,marker,workareas,operated_by,status,country,city,sort_title,preview_image"
    );

    // Calculate and call the progress percentage
    const progressPercentage = Math.floor(((index + 1) / totalProjects) * 100);
    onProgress(progressPercentage);

    return project;
  });

  const projectsList = await Promise.all(projectsListPromise);

  projectsList.forEach((project) => {
    let totalNotPlantedTrees = 0;
    project.orders = [];

    orders.forEach((order) => {
      if (project.id === order.project) {
        order.not_planted_trees = [];
        order.planted_trees = [];

        order.expand.trees.forEach((tree: Tree) => {
          if (tree.status === "not planted") {
            order.not_planted_trees?.push(tree);
            totalNotPlantedTrees++;
          } else {
            order.planted_trees?.push(tree);
          }
        });

        project.orders?.push(order);
      }
    });

    project.total_trees = totalNotPlantedTrees;
  });

  return projectsList;
};
