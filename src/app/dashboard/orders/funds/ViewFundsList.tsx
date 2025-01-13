"use client";
import { Collection } from "@/interfaces/collection";
import { client } from "@/request/actions";
import React from "react";
import { useQuery } from "react-query";
import { FundItem } from "./funds";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

function ViewFundsList() {
  const genFilter = () => {
    return `(complete=true)`;
  };
  const data = useQuery({
    queryKey: ["funds", genFilter()],
    queryFn: async () => {
      const response = await loadFunds(1, genFilter());
      const data = response;
      return data;
    },
  });
  if (data.isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="w-full ">
      <div className="tableWrapper">
        <table className="tblView table-fixed">
          <thead>
            <tr>
              <th className="w-5 ">Sno</th>
              <th>Funds Name</th>
              <th>Amount</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Country</th>
              <th>City</th>
              <th>Date</th>

              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {data.data?.items.map((item: FundItem, index: number) => {
              return (
                <tr key={index}>
                  <td className="w-5 ">{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.amount}</td>
                  <td>
                    {item.expand.user.first_name +
                      " " +
                      item.expand.user.last_name}
                  </td>
                  <td>{item.expand.user.email}</td>
                  <td>{item.expand.user.mobile_no}</td>
                  <td>{item.expand.user.country}</td>
                  <td>{item.expand.user.city}</td>
                  <td>{item.created}</td>
                  {/* <td>
                        <button className="btn btn-primary">
                          <i className="fa fa-eye"></i>
                        </button>
                      </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewFundsList;

const loadFunds = async (page: number, filter: string) => {
  const response = await client
    .get("/api/collections/support_donations/records", {
      page,
      filter,
      expand: "user",
    })
    .send<Collection<FundItem>>();
  return response;
};
