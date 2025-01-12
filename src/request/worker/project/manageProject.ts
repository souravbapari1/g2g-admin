import { Collection } from "@/interfaces/collection";
import { ProjectItem } from "@/interfaces/project";
import { IProjectParams } from "@/redux/Slices/projectParamsSlice";
import { client } from "@/request/actions";

import { getAccessToken } from "../auth";
import { UserItem } from "@/interfaces/user";

export const getProjects = async (
  page: number = 1,
  filter?: string,
  fields?: string,
  hideFields?: string,
  expand?: string,
  signal?: AbortSignal
) => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/projects/records", {
      sort: "-created",
      perPage: 20,
      page: page,
      expand: expand || "operated_by,reports,sdgs,unit_types,type",
      filter: filter || "",
      fields: fields || "*",
      hideFields: hideFields || "",
    })
    .send<Collection<ProjectItem>>(token, { signal });
  return req;
};

export const deleteProject = async (id: string) => {
  const token = await getAccessToken();
  const req = await client
    .delete("/api/collections/projects/records/" + id)
    .send<ProjectItem>(token);
  return req;
};

export const getProject = async (
  id: string,
  fields?: string,
  filter?: string,
  hideFields?: string
) => {
  const token = await getAccessToken();
  const project = await client
    .get("/api/collections/projects/records/" + id, {
      expand: "operated_by,reports,sdgs,sdgs.sdg,unit_types,type",
      fields: fields || "*",
      filter: filter || "",
      hideFields: hideFields || "",
    })
    .send<ProjectItem>(token);
  return project;
};

export const createNewProject = async (
  data: IProjectParams
): Promise<{ id: string }> => {
  const user: UserItem = JSON.parse(localStorage.getItem("user") as string);
  const { project } = data;
  let req = client.post("/api/collections/projects/records").form({
    // The name of the project
    name: project.name,
    // The sort title of the project
    sort_title: project.sort_title,
    // The type of the project
    type: project.type,
    // The main interventions of the project
    main_interventions: JSON.stringify(project.main_interventions),
    // The Unit of Measurement of the project
    unit_measurement: project.unit_measurement,
    // The number of target unit of the project
    number_of_target_unit: project.number_of_target_unit,
    // The omr unit of the project
    omr_unit: project.omr_unit,
    // The start date of the project
    start_date: project.start_date,
    end_date: project.end_date,
    // The status of the project
    accredation_standars: project.accredation_standars,
    // The status of the project
    status: project.status,
    // The country of the project
    country: project.country,
    // The city of the project
    city: project.city,
    // The location of the project
    location: project.location,
    // The marker of the project
    marker: JSON.stringify(project.marker),
    // The work areas of the project
    workareas: JSON.stringify(project.workareas),
    // The about project text
    about_project: project.about_project,
    // The challenges and impact details text
    challenges_and_impact_details: project.challenges_and_impact_details,
    // The website of the project
    website: project.website,
    // The email of the project
    email: project.email,
    // The phone of the project
    phone: project.phone,
    // The address of the project
    address: project.address,
    linkedin: project.linkedin,
    profilePdf: project.profilePdf,
    telegram: project.telegram,
    x: project.x,
    facebook: project.facebook,

    // Is the project top project
    top_project: project.top_project,
    // Is the project allowed
    allow: project.allow,
    // The unit types of the project
    project_prefix: project.project_prefix,

    // The reports of the project
    assigned_by: project.assigned_by,
    operated_by: project.operated_by,
    created_by: user.id,

    comment: project.comment,
    impactPerUnit: project.impactPerUnit,
  });

  // If the project has a preview image, append it to the request
  if (project.projectImage) {
    req.append("preview_image", project.projectImage);
  }

  if (project.report) {
    req.append("report", project.report);
  }

  // If the project has project content images, append them to the request
  if (project.projectContentImages) {
    project.projectContentImages.map((e) => {
      req.append("project_images", e as File);
    });
  }

  // If the project has project content videos, append them to the request
  if (project.projectContentVideos) {
    project.projectContentVideos.map((e) => {
      req.append("project_videos", e as File);
    });
  }

  // If the project has challenges and impact details images, append them to the request
  if (project.challengesAndImpactDetailsImages) {
    project.challengesAndImpactDetailsImages.map((e) => {
      req.append("challenges_and_impact_details_images", e as File);
    });
  }

  // If the project has challenges and impact details videos, append them to the request
  if (project.challengesAndImpactDetailsVideos) {
    project.challengesAndImpactDetailsVideos.map((e) => {
      req.append("challenges_and_impact_details_videos", e as File);
    });
  }
  const token = await getAccessToken();
  //   all form data push on req
  const res = await req.send<{ id: string }>(token);
  // Update the project with the unit types, sdgs, reports and operated by

  const saveAllSdgs = async () => {
    const list = data.project.sdgs.map(async (sdg) => {
      return await client
        .post("/api/collections/project_sdg/records")
        .json({
          name: sdg.name,
          description: sdg.description,
          sdg: sdg.sdg,
          data: sdg.data,
        })
        .send<{ id: string }>(token);
    });

    const ids = await Promise.all(list);
    return ids.map((id) => id.id);
  };

  const sdgIds = await saveAllSdgs();

  await client
    .patch("/api/collections/projects/records/" + res?.id)
    .json({
      "unit_types+": project.unit_types,
      "sdgs+": sdgIds,
      "reports+": project.reports,
      "operated_by+": project.operated_by,
    })
    .send(token);

  return res;
};

export const updateProject = async (id: string, data: IProjectParams) => {
  const { project } = data;
  const token = await getAccessToken();
  const projectData = await client
    .get("/api/collections/projects/records/" + id)
    .send<ProjectItem>(token);

  let req = client.patch("/api/collections/projects/records/" + id).form({
    name: project.name,
    sort_title: project.sort_title,
    type: project.type,
    main_interventions: JSON.stringify(project.main_interventions),
    unit_measurement: project.unit_measurement,
    number_of_target_unit: project.number_of_target_unit,
    omr_unit: project.omr_unit,
    start_date: project.start_date,
    end_date: project.end_date,
    country: project.country,
    comment: project.comment,
    city: project.city,
    accredation_standars: project.accredation_standars,
    status: project.status,
    location: project.location,
    marker: JSON.stringify(project.marker),
    workareas: JSON.stringify(project.workareas),
    about_project: project.about_project,
    challenges_and_impact_details: project.challenges_and_impact_details,
    website: project.website,
    email: project.email,
    phone: project.phone,
    address: project.address,
    linkedin: project.linkedin,
    profilePdf: project.profilePdf,
    telegram: project.telegram,
    x: project.x,
    facebook: project.facebook,
    top_project: project.top_project,
    project_prefix: project.project_prefix,
    allow: project.allow,
    impactPerUnit: project.impactPerUnit,
  });

  if (project.report) {
    req.append("report", project.report);
  }

  if (project.projectContentVideos) {
    project.projectContentVideos?.map((e) => {
      req.append("project_videos", e);
    });
  }

  if (project.challengesAndImpactDetailsImages) {
    project.challengesAndImpactDetailsImages?.map((e) => {
      req.append("challenges_and_impact_details_images", e);
    });
  }

  if (project.challengesAndImpactDetailsVideos) {
    project.challengesAndImpactDetailsVideos?.map((e) => {
      req.append("challenges_and_impact_details_videos", e);
    });
  }

  if (project.projectImage) {
    req.append("preview_image", project.projectImage);
  }
  if (project.projectContentImages) {
    project.projectContentImages?.map((e) => {
      req.append("project_images", e);
    });
  }

  const deleteOldSgds = async () => {
    const token = await getAccessToken();
    const list = projectData.sdgs.map(async (id) => {
      return await client
        .delete("/api/collections/project_sdg/records/" + id)
        .send<{ id: string }>(token);
    });
    return await Promise.all(list);
  };

  const saveAllSdgs = async () => {
    const list = data.project.sdgs.map(async (sdg) => {
      return await client
        .post("/api/collections/project_sdg/records")
        .json({
          name: sdg.name,
          description: sdg.description,
          sdg: sdg.sdg,
          data: sdg.data,
        })
        .send<{ id: string }>(token);
    });

    const ids = await Promise.all(list);
    return ids.map((id) => id.id);
  };

  const sdgIds = await saveAllSdgs();

  try {
    // here delete old sdgs
    await deleteOldSgds();
    console.log("deleted old sdgs");
  } catch (error) {
    console.log(error);
  }

  const res = await req.send<{ id: string }>(token);
  await client
    .patch("/api/collections/projects/records/" + res?.id)
    .json({
      unit_types: project.unit_types,
      sdgs: sdgIds,
      reports: project.reports,
      operated_by: project.operated_by,
      assigned_by: project.assigned_by,
      "project_videos-": projectData.project_videos.filter(
        (e) => !project.projectContentVideosLinks.map((a) => a.name).includes(e)
      ),
      "project_images-": projectData.project_images.filter(
        (e) => !project.projectContentImagesLinks.map((a) => a.name).includes(e)
      ),
      "challenges_and_impact_details_videos-":
        projectData.challenges_and_impact_details_videos.filter(
          (e) =>
            !project.challengesAndImpactDetailsVideosLinks
              .map((a) => a.name)
              .includes(e)
        ),
      "challenges_and_impact_details_images-":
        projectData.challenges_and_impact_details_images.filter(
          (e) =>
            !project.challengesAndImpactDetailsImagesLinks
              .map((a) => a.name)
              .includes(e)
        ),
    })
    .send(token);
  return res;
};

const getAllProjects = async (page: number = 1) => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/projects/records", {
      sort: "-created",
      perPage: 100,
      page: page,
      expand: "operated_by,reports,sdgs,unit_types,type",
    })
    .send<Collection<ProjectItem>>(token);
  return req;
};

export const loadAllProjects = async (
  page: number = 1,
  tmData: ProjectItem[] = []
): Promise<ProjectItem[]> => {
  const data = await getAllProjects(page);
  const updatedTmData = tmData.concat(data.items);
  if (page < data.totalPages) {
    return await loadAllProjects(page + 1, updatedTmData);
  }
  return updatedTmData;
};
