import { Tree, TreeOrderItem } from "@/interfaces/treeOrders";
import { getProject } from "../../project/manageProject";
import { loadAllTreeOrders } from "./manageTreeOrders";
import { UserItem } from "@/interfaces/user";
import { Area } from "recharts";
import { ProjectItem } from "@/interfaces/project";
import { AreaInfo } from "@/components/mapbox/mapBoxPickArea";

export const requestOrdersWithProjects = async (
  onProgress: (progress: number) => void
) => {
  try {
    // Stage 1: Load all tree orders with progress
    const orders = await loadAllTreeOrders(1, [], (pageProgress) => {
      // Adjust page progress to fit within the first 80% of total progress
      onProgress(Math.floor(pageProgress * 0.8));
    });

    const uniqueProjectIds = Array.from(
      new Set(orders.map((order) => order.project))
    );
    const totalProjects = uniqueProjectIds.length;

    // Stage 2: Load project details with progress tracking
    const projectsList = await loadProjects(
      uniqueProjectIds,
      totalProjects,
      onProgress
    );

    // Stage 3: Populate orders and categorize trees by planting status and area type
    return populateProjectsWithOrders(projectsList, orders);
  } catch (error) {
    console.error("Failed to load orders and projects:", error);
    throw error; // Rethrow to let the caller handle it
  }
};

// Load project details for a list of project IDs and update progress
const loadProjects = async (
  projectIds: string[],
  totalProjects: number,
  onProgress: (progress: number) => void
) => {
  const projectProgressOffset = 80; // Starting point for project loading progress
  const projectsList = await Promise.all(
    projectIds.map(async (id, index) => {
      const project = await getProject(
        id,
        "*,id,collectionName,collectionId,name,type,main_interventions,unit_measurement,number_of_target_unit,omr_unit,start_date,marker,workareas,operated_by,status,country,city,sort_title,preview_image,",
        "",
        "about_project,challenges_and_impact_details"
      );

      // Update progress for each project loaded, spread across remaining 20% progress
      const progress =
        projectProgressOffset + Math.floor(((index + 1) / totalProjects) * 20);
      onProgress(progress);

      return project;
    })
  );
  return projectsList;
};

// Populate projects with related orders, and categorize trees by planting status and area
const populateProjectsWithOrders = (
  projectsList: ProjectItem[],
  orders: TreeOrderItem[]
) => {
  projectsList.forEach((project) => {
    const projectOrders = orders.filter(
      (order) => order.project === project.id
    );
    project.orders = [];
    let totalNotPlantedTrees = 0;

    projectOrders.forEach((order) => {
      order.not_planted_trees = [];
      order.planted_trees = [];

      // Categorize trees as planted or not planted
      order.expand.trees.forEach((tree: Tree) => {
        if (tree.status === "pending") {
          order?.not_planted_trees?.push(tree);
          totalNotPlantedTrees++;
        } else {
          order?.planted_trees?.push(tree);
        }
      });

      // Append order to the project’s orders
      project?.orders?.push(order);
    });

    // Sort and categorize trees by area type
    if (project.workareas?.areaInfo) {
      project.byArea = categorizeTreesByArea(
        project.orders,
        project.workareas.areaInfo
      );
    }

    // Update total not planted trees count for the project
    project.total_trees = totalNotPlantedTrees;
  });

  return projectsList;
};

// Categorize trees by area type within a project's orders
const categorizeTreesByArea = (
  orders: TreeOrderItem[],
  areaInfo: AreaInfo[]
) => {
  const byArea: { [key: string]: Tree[] } = {};
  areaInfo.forEach((area) => {
    const areaType = area.areaName;
    byArea[areaType] = [];
    orders.forEach((order) => {
      order.expand.trees.forEach((tree) => {
        if (tree.area?.areaName === areaType) {
          byArea[areaType].push(tree);
        }
      });
    });
  });

  return byArea;
};
