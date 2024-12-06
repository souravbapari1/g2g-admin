import { Collection } from "@/interfaces/collection";
import { AdminAuthToken, client, getUserLocalData } from "@/request/actions";
import { AcademicRequestsItem } from "./AcademicRequests";
import graphqlClient from "@/request/fetch/graphqlClient";
import { gql } from "@apollo/client";

export const getRequests = async (page: number = 1, filter?: string) => {
  return await client
    .get("/api/collections/academics_requests/records", {
      filter: filter || "",
      expand: "updateBy",
      page: page,
    })
    .send<Collection<AcademicRequestsItem>>();
};

export const getAcademicById = async (id: string) => {
  return await client
    .get(`/api/collections/academics_requests/records/${id}`, {
      expand: "updateBy",
    })
    .send<AcademicRequestsItem>();
};

export const updateAcademicsStatus = async (
  id: string,
  status: "pending" | "approved" | "complete" | "cancel"
) => {
  const user = getUserLocalData();
  console.log(user);

  return await client
    .patch(`/api/collections/academics_requests/records/${id}`, {
      expand: "updateBy",
    })
    .json({ status, updateBy: user?.id })
    .send<AcademicRequestsItem>(AdminAuthToken());
};

export const getUpcomingAcademies = async () => {
  return await graphqlClient.query<AcademicNameData>({
    query: gql`
      query UpcomingAcademies {
        upcomingAcademies {
          name
        }
      }
    `,
  });
};

export interface AcademicNameData {
  upcomingAcademies: UpcomingAcademy[];
}

export interface UpcomingAcademy {
  name: string;
}
