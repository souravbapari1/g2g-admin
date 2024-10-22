import { Collection } from "@/interfaces/collection";
import { UnitItem } from "@/interfaces/units";
import { client } from "@/request/actions";

export const getUnitTypes = async (page: number = 1) => {
  const req = await client
    .get("/api/collections/unit_types/records", {
      sort: "-created",
      perPage: 20,
      page: page,
      expand: "project_type,sdg",
    })
    .send<Collection<UnitItem>>();
  return req;
};

export const deleteUnitTypes = async (id: string) => {
  const req = await client
    .delete("/api/collections/unit_types/records/" + id)
    .send<Collection<UnitItem>>();
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
  }: {
    name?: string;
    project_type?: string;
    unit?: string;
    orm_unit?: string;
    sdg?: string[];
    parameters?: {
      name: string;
      value: string;
    }[];
  }
) => {
  const req = await client
    .patch("/api/collections/unit_types/records/" + id)
    .json({
      name,
      orm_unit,
      parameters,
      project_type,
      sdg,
      unit,
    })
    .send<UnitItem>();
  return req;
};

export const createUnitTypes = async ({
  name,
  orm_unit,
  parameters,
  project_type,
  sdg,
  unit,
}: {
  name: string;
  project_type: string;
  unit: string;
  orm_unit: string;
  sdg: string[];
  parameters: {
    name: string;
    value: string;
  }[];
}) => {
  const req = await client
    .post("/api/collections/unit_types/records")
    .json({
      name,
      orm_unit,
      parameters: JSON.stringify(parameters),
      project_type,
      sdg,
      unit,
    })
    .send<UnitItem>();
  return req;
};
