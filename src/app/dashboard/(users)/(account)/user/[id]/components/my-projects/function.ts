import { Collection } from "@/interfaces/collection";
import { ProjectItem } from "@/interfaces/project";
import { client } from "@/request/actions";

export const getMyProjects = async (page: number, filter?: string) => {
  const request = await client
    .get(`/api/collections/projects/records`, {
      expand: "docs,type,unit_types",
      perPage: 6,
      page,
      filter: filter || "",
    })
    .send<Collection<ProjectItem>>();
  return request;
};
