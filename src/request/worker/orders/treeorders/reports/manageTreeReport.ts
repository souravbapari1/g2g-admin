import { Collection } from "@/interfaces/collection";
import { TreeReportItem } from "@/interfaces/treeReport";
import { client } from "@/request/actions";
import { getAccessToken } from "@/request/worker/auth";

export const addNewTreeReport = async (data: {
  tree: string;
  status: string;
  ob_cm: string;
  height: string;
  updateBy: string;
  tree_image: File;
  street_image: File;
  other_comments: string;
}) => {
  const token = await getAccessToken();
  const req = await client
    .post("/api/collections/tree_reports/records")
    .form(data)
    .append("tree_image", data.tree_image)
    .append("street_image", data.street_image)
    .send(token);
  return req;
};

export const getTreeReports = async (treeId: string) => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/tree_reports/records", {
      filter: `(tree='${treeId}')`,
      sort: "-created",
      perPage: 500,
      expand: "tree,updateBy,tree.type,tree.project",
    })
    .send<Collection<TreeReportItem>>(token);
  return req;
};

export const updateTreeReport = async (
  id: string,
  data: {
    status?: string;
    ob_cm?: string;
    height?: string;
    updateBy?: string;
    tree_image?: File | null;
    street_image?: File | null;
    other_comments?: string;
  }
) => {
  const token = await getAccessToken();
  let req = client.patch("/api/collections/tree_reports/records/" + id).form({
    status: data.status,
    ob_cm: data.ob_cm,
    height: data.height,
    updateBy: data.updateBy,
  });

  if (data.tree_image) {
    req.append("tree_image", data.tree_image);
  }
  if (data.street_image) {
    req.append("street_image", data.street_image);
  }

  const res = await req.send(token);
  return res;
};
