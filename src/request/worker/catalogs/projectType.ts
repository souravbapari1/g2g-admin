import { ProjectType } from "@/interfaces/projectType";
import { client } from "@/request/actions";
import { Collection } from "@/interfaces/collection";

export const getProjectType = async (page: number = 1) => {
  if (window) {
    console.log("Run On Client");
  }
  const req = await client
    .get("/api/collections/project_type/records", {
      sort: "-created",
      perPage: 20,
      page: page,
    })
    .send<Collection<ProjectType>>();
  return req;
};

export const createProjectType = async ({
  name,
  parameters,
  unit_measurement,
}: {
  name: string;
  parameters: string[];
  unit_measurement: string;
}) => {
  const req = await client
    .post("/api/collections/project_type/records")
    .json({
      name: name,
      parameters: parameters,
      unit_measurement: unit_measurement,
    })
    .send<ProjectType>();
  return req;
};

export const updateProjectType = async (
  id: string,
  {
    name,
    parameters,
    unit_measurement,
  }: {
    name?: string;
    parameters?: string[];
    unit_measurement?: string;
  }
) => {
  const req = await client
    .patch("/api/collections/project_type/records/" + id)
    .json({
      name,
      parameters,
      unit_measurement,
    })
    .send<ProjectType>();
  return req;
};

export const deleteProjectType = async (id: string) => {
  const req = await client
    .delete("/api/collections/project_type/records/" + id)
    .send<ProjectType>();
  return req;
};
