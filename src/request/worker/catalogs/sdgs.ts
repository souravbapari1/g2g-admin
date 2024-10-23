import { Collection } from "@/interfaces/collection";
import { SDGITEM } from "@/interfaces/sdg";
import { client } from "@/request/actions";

export const getSdgs = async (page: number = 1) => {
  const req = await client
    .get("/api/collections/sdg_list/records", {
      sort: "-created",
      perPage: 20,
      page: page,
    })
    .send<Collection<SDGITEM>>();
  return req;
};

export const deleteSdgs = async (id: string) => {
  const req = await client
    .delete("/api/collections/sdg_list/records/" + id)
    .send<SDGITEM>();
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
  const req = await client
    .post("/api/collections/sdg_list/records")
    .form({
      main_color,
      name,
      parameters: JSON.stringify(parameters),

      sub_color,
    })
    .append("image", image)
    .send<SDGITEM>();
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
  if (image) {
    const req = await client
      .patch("/api/collections/sdg_list/records/" + id)
      .form({
        main_color,
        name,
        parameters,
        sort_desc,
        sub_color,
      })
      .append("image", image)
      .send<SDGITEM>();
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
      .send<SDGITEM>();
    return req;
  }
};
