import { Collection } from "@/interfaces/collection";
import { ReportingItem } from "@/interfaces/reporting";
import { client } from "@/request/actions";
import { getAccessToken } from "../auth";

export const getReports = async (page: number = 1) => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/reporting/records", {
      sort: "-created",
      perPage: 20,
      page: page,
    })
    .send<Collection<ReportingItem>>(token);
  return req;
};

export const getReport = async (id: string) => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/reporting/records/" + id)
    .send<ReportingItem>(token);
  return req;
};

export const createReports = async ({
  desc,
  file,
  name,
}: {
  name: string;
  desc: string;
  file: File;
}) => {
  const token = await getAccessToken();
  const req = await client
    .post("/api/collections/reporting/records")
    .form({
      name,
      desc,
    })
    .append("file", file)
    .send<ReportingItem>(token);
  return req;
};

export const deleteReports = async (id: string) => {
  const token = await getAccessToken();
  const req = await client
    .delete("/api/collections/reporting/records/" + id)
    .send<ReportingItem>(token);
  return req;
};

export const updateReports = async (
  id: string,
  {
    desc,
    name,
    file,
  }: {
    name?: string;
    desc?: string;
    file?: File | null;
  }
) => {
  const token = await getAccessToken();
  if (!file) {
    const req = await client
      .patch("/api/collections/reporting/records/" + id)
      .json({
        name,
        desc,
      })
      .send<ReportingItem>(token);
    return req;
  } else {
    const req = await client
      .patch("/api/collections/reporting/records/" + id)
      .form({
        name,
        desc,
      })
      .append("file", file!)
      .send<ReportingItem>(token);
    return req;
  }
};
