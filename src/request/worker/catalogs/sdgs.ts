import { Collection } from "@/interfaces/collection";
import { SDGITEM } from "@/interfaces/sdg";
import { client } from "@/request/actions";
import { getAccessToken } from "../auth";

export const getSdgs = async (page: number = 1, filter?: string) => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/sdg_list/records", {
      perPage: 20,
      page: page,
      filter: filter || "",
    })
    .send<Collection<SDGITEM>>(token);
  return req;
};

export const deleteSdgs = async (id: string) => {
  const token = await getAccessToken();
  const req = await client
    .delete("/api/collections/sdg_list/records/" + id)
    .send<SDGITEM>(token);
  return req;
};

export const createSdgs = async ({
  main_color,
  name,
  parameters,

  sub_color,
  image,
}: {
  name: string;

  parameters: string[];
  image: File;
  main_color: string;
  sub_color: string;
}) => {
  const token = await getAccessToken();
  const req = await client
    .post("/api/collections/sdg_list/records")
    .form({
      main_color,
      name,
      parameters: JSON.stringify(parameters),

      sub_color,
    })
    .append("image", image)
    .send<SDGITEM>(token);
  return req;
};

export const updateSdgs = async (
  id: string,
  {
    main_color,
    name,
    parameters,
    sort_desc,
    sub_color,
    image,
  }: {
    name?: string;
    sort_desc?: string;
    parameters?: string[];
    main_color?: string;
    sub_color?: string;
    image?: File | null;
  }
) => {
  const token = await getAccessToken();
  if (image) {
    const req = await client
      .patch("/api/collections/sdg_list/records/" + id)
      .form({
        main_color,
        name,
        parameters: JSON.stringify(parameters),
        sort_desc,
        sub_color,
      })
      .append("image", image)
      .send<SDGITEM>(token);
    return req;
  } else {
    const req = await client
      .patch("/api/collections/sdg_list/records/" + id)
      .json({
        main_color,
        name,
        parameters,
        sort_desc,
        sub_color,
      })
      .send<SDGITEM>(token);
    return req;
  }
};
