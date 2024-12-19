import { loadPaginatedData } from "@/components/context/dataLoaders";
import { Collection } from "@/interfaces/collection";
import { MonthlyReportItem } from "@/interfaces/monthlyReportItem";
import { UserItem } from "@/interfaces/user";
import { client } from "@/request/actions";
import { getAllPartners } from "@/request/worker/partnors/managePartners";

export const getAmbassadors = async (page: number = 1) => {
  const req = await client
    .get("/api/collections/users/records", {
      sort: "-created",
      perPage: 20,
      page: page,
      filter: "(user_type='ambassador')",
    })
    .send<Collection<UserItem>>();
  return req;
};

export const getAmbassadorsList = async () => {
  const data = await loadPaginatedData(getAmbassadors);
  return data;
};

export const getWeeklyReport = async (
  user: string,
  year: string,
  month: string
) => {
  const data = await client
    .get("/api/collections/weekly_reports/records", {
      filter: `(user='${user}' && year='${year}' && month='${month}')`,
    })
    .send<Collection<MonthlyReportItem>>();
  return data;
};

export const pushNotification = async (req: {
  title: string;
  description: string;
  actionLink: string;
  reportID: string;
  user: string;
}) => {
  const data = await client
    .post("/api/collections/user_alerts/records")
    .json(req)
    .send();
  return data;
};

export const isThisNotificationSend = async (
  reportID: string,
  user: string
) => {
  const data = await client
    .get("/api/collections/user_alerts/records", {
      filter: `(reportID='${reportID}' && user='${user}')`,
    })
    .send<Collection<MonthlyReportItem>>();
  return data.items.length != 0;
};
