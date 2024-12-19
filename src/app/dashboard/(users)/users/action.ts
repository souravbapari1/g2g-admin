import { client } from "@/request/actions";

export const getUserStatusCount = async (
  type: "individual" | "ambassador" | "partner",
  role: "USER" | "ADMIN" | "EMPLOYEE" | "MANAGER"
) => {
  const res = await client.get("/user/status/count", { type, role }).send<{
    activeUsers: number;
    inActiveUsers: number;
    totalCity: number;
    totalCountry: number;
    totalUsers: number;
    totalWeeklyReports: number;
  }>();
  return res;
};
