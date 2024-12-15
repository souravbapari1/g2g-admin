import { client } from "@/request/actions";

export const getUserStatus = async (id: string) => {
  const userdata = await client
    .get(`/user/status`, {
      id,
    })
    .send<{
      assignedProjects: number;
      totalAmount: number;
      totalOthersAmount: number;
      totalTreeAmount: number;
      totalTrees: number;
    }>();
  return userdata;
};
