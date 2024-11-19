import { client } from "@/request/actions";
import { getAccessToken } from "../auth";
import { ProjectReportItem } from "@/interfaces/project";

export const getProjectReportDocs = async (id: string) => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/project_docs/records/" + id)
    .send<ProjectReportItem>(token);
  return req;
};

export const getProjectReportDocsUpdate = async (
  id: string,
  key: string,
  files: File[]
) => {
  const token = await getAccessToken();
  const req = client
    .patch("/api/collections/project_docs/records/" + id)
    .form({});

  files.forEach((element) => {
    req.append(key, element);
  });

  return await req.send(token);
};

export const getProjectReportDocsDelete = async (
  id: string,
  key: string,
  files: string[]
) => {
  const token = await getAccessToken();
  const req = client.patch("/api/collections/project_docs/records/" + id).json({
    [`${key}-`]: files,
  });

  return await req.send(token);
};
