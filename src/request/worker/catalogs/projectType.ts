import { ProjectType } from "@/interfaces/projectType";
import { client } from "@/request/actions";
import { Collection } from "@/interfaces/collection";
import { getAccessToken } from "../auth";

export const getProjectType = async (page: number = 1, filter?: string) => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/project_type/records", {
      sort: "-created",
      perPage: 20,
      page: page,
      filter: filter || "",
    })
    .send<Collection<ProjectType>>(token);
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
  const token = await getAccessToken();
  const req = await client
    .post("/api/collections/project_type/records")
    .json({
      name: name,
      parameters: parameters,
      unit_measurement: unit_measurement,
    })
    .send<ProjectType>(token);
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
  const token = await getAccessToken();
  console.log(token);

  const req = await client
    .patch("/api/collections/project_type/records/" + id)
    .json({
      name,
      parameters,
      unit_measurement,
    })
    .send<ProjectType>(token);
  return req;
};

export const deleteProjectType = async (id: string) => {
  const token = await getAccessToken();
  const req = await client
    .delete("/api/collections/project_type/records/" + id)
    .send<ProjectType>(token);
  return req;
};
