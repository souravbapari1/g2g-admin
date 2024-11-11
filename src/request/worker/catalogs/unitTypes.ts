import { Collection } from "@/interfaces/collection";
import { UnitItem } from "@/interfaces/units";
import { client } from "@/request/actions";
import { getAccessToken } from "../auth";

export const getUnitTypes = async (
  page: number = 1,
  filter?: string,
  signal?: AbortSignal
) => {
  const token = await getAccessToken();

  const req = await client
    .get("/api/collections/unit_types/records", {
      sort: "-created",
      perPage: 20,
      page: page,
      expand: "project_type,sdg",
      filter: filter || "",
    })
    .send<Collection<UnitItem>>(token, { signal });
  return req;
};

export const deleteUnitTypes = async (id: string) => {
  const token = await getAccessToken();
  const req = await client
    .delete("/api/collections/unit_types/records/" + id)
    .send<Collection<UnitItem>>(token);
  return req;
};

export const updateUnitTypes = async (
  id: string,
  {
    name,
    orm_unit,
    parameters,
    project_type,
    sdg,
    unit,
    prefix,
  }: {
    name?: string;
    project_type?: string[];
    unit?: string;
    orm_unit?: string;
    sdg?: string[];
    prefix?: string;
    parameters?: {
      name: string;
      value: string;
    }[];
  }
) => {
  const token = await getAccessToken();

  const req = await client
    .patch("/api/collections/unit_types/records/" + id)
    .json({
      name,
      orm_unit,
      parameters,
      project_type,
      sdg,
      unit,
      prefix,
    })
    .send<UnitItem>(token);
  return req;
};

export const createUnitTypes = async ({
  name,
  orm_unit,
  parameters,
  project_type,
  sdg,
  unit,
  prefix,
}: {
  name: string;
  project_type: string[];
  unit: string;
  orm_unit: string;
  sdg: string[];
  prefix: string;
  parameters: {
    name: string;
    value: string;
  }[];
}) => {
  const token = await getAccessToken();

  const req = await client
    .post("/api/collections/unit_types/records")
    .json({
      name,
      orm_unit,
      parameters: JSON.stringify(parameters),
      project_type,
      sdg,
      unit,
      prefix,
    })
    .send<UnitItem>(token);
  return req;
};
