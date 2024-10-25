import { getProject } from "../../project/manageProject";
import { loadAllTreeOrders } from "./manageTreeOrders";
export const requestOrdersWithProjects = async () => {
  const orders = await loadAllTreeOrders();
  const projectIds = orders.map((order) => order.project);
  const projects = new Set(projectIds);
  const projectsListPromise = Array.from(projects).map(async (id) => {
    return await getProject(
      id,
      "id,collectionName,collectionId,name,type,main_interventions,unit_measurement,number_of_target_unit,omr_unit,start_date,marker,workareas,operated_by,status,country,city"
    );
  });

  const projectsList = await Promise.all(projectsListPromise);

  projectsList.forEach((project) => {
    let totalTrees = 0;
    orders.forEach((order) => {
      if (project.id == order.project) {
        totalTrees += order.tree_count;
        if (project.orders) {
          project.orders.push(order);
        } else {
          project.orders = [order];
        }
      }
    });

    project.total_trees = totalTrees;
    totalTrees = 0;
  });

  return projectsList;
};
