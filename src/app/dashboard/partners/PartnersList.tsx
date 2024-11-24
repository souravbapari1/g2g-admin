"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { genPbFiles } from "@/request/actions";
import {
  getAllPartners,
  setStatusPartner,
} from "@/request/worker/partnors/managePartners";
import Link from "next/link";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";

export function PartnersList() {
  const data = useQuery("partners", {
    queryFn: getAllPartners,
  });

  const updatePartnerStatus = useMutation({
    mutationKey: ["updatePartnerStatus", "partners"],
    mutationFn: (data: { id: string; status: "approved" | "rejected" }) =>
      setStatusPartner(data.id, data.status),

    onError: () => {
      toast.error("Something went wrong! Status not updated");
    },

    onSuccess: () => {
      data.refetch();
      toast.success("Status updated successfully");
    },
  });

  const filterByStatus = () => {
    const pending = data.data?.filter(
      (item) => item.expand?.company?.approved_status == "pending"
    );
    const approved = data.data?.filter(
      (item) => item.expand?.company?.approved_status == "approved"
    );
    const rejected = data.data?.filter(
      (item) => item.expand?.company?.approved_status == "rejected"
    );
    return {
      pending,
      approved,
      rejected,
    };
  };

  const { pending, approved, rejected } = filterByStatus();

  if (data.isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="text-nowrap">
      {/* New Requests Table */}
      <h1 className="text-3xl font-bold mb-5">Pending Requests</h1>
      <div className="tableWrapper">
        <table className="tblView">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Company Name</th>
              <th>Position</th>
              <th>Industry Type</th>
              <th>Size Hint</th>
              <th>Country</th>
              <th>City</th>
              <th>Responses</th>
              <th>Address</th>
              <th>Map Location</th>
              <th className="action">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pending?.map((item, index) => (
              <tr key={index}>
                <td>
                  <Avatar>
                    <AvatarImage src={genPbFiles(item, item.avatar)} />
                    <AvatarFallback>
                      {item.first_name.split("")[0]}
                    </AvatarFallback>
                  </Avatar>
                </td>
                <td>{item.expand?.company?.company_name}</td>
                <td>{item.email}</td>
                <td>{item.expand?.company?.company_name}</td>
                <td>{item.expand?.company?.position}</td>
                <td>{item.expand?.company?.Industry_type}</td>
                <td>{item.expand?.company?.size_hint}</td>
                <td>{item.expand?.company?.country}</td>
                <td>{item.expand?.company?.city}</td>
                <td>{item.expand?.company?.resonses}</td>
                <td>{item.expand?.company?.address}</td>
                <td>
                  <Link
                    href={item.expand?.company?.map_location || ""}
                    target="_blank"
                    className="text-blue-700"
                  >
                    View On Map
                  </Link>
                </td>
                <td className="action">
                  <div className="flex justify-center items-center gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        updatePartnerStatus.mutate({
                          id: item.expand?.company?.id || "",
                          status: "approved",
                        });
                      }}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        updatePartnerStatus.mutate({
                          id: item.expand?.company?.id || "",
                          status: "rejected",
                        });
                      }}
                    >
                      Reject
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <br />
      <br />
      <h1 className="text-3xl font-bold mb-5">Approved Partners</h1>
      <div className="tableWrapper">
        <table className="tblView">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Company Name</th>
              <th>Position</th>
              <th>Industry Type</th>
              <th>Size Hint</th>
              <th>Country</th>
              <th>City</th>
              <th>Responses</th>
              <th>Address</th>
              <th>Map Location</th>
              <th className="action">Actions</th>
            </tr>
          </thead>
          <tbody>
            {approved?.map((item, index) => (
              <tr key={index}>
                <td>
                  <Avatar>
                    <AvatarImage src={genPbFiles(item, item.avatar)} />
                    <AvatarFallback>
                      {item.first_name.split("")[0]}
                    </AvatarFallback>
                  </Avatar>
                </td>
                <td>{item.expand?.company?.company_name}</td>
                <td>{item.email}</td>
                <td>{item.expand?.company?.company_name}</td>
                <td>{item.expand?.company?.position}</td>
                <td>{item.expand?.company?.Industry_type}</td>
                <td>{item.expand?.company?.size_hint}</td>
                <td>{item.expand?.company?.country}</td>
                <td>{item.expand?.company?.city}</td>
                <td>{item.expand?.company?.resonses}</td>
                <td>{item.expand?.company?.address}</td>
                <td>
                  <Link
                    href={item.expand?.company?.map_location || ""}
                    target="_blank"
                    className="text-blue-700"
                  >
                    View On Map
                  </Link>
                </td>
                <td className="action">
                  <div className="flex justify-center items-center gap-3">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        updatePartnerStatus.mutate({
                          id: item.expand?.company?.id || "",
                          status: "rejected",
                        });
                      }}
                    >
                      Reject
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <br />
      <br />
      <h1 className="text-3xl font-bold mb-5">Rejected Partners</h1>
      <div className="tableWrapper">
        <table className="tblView">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Company Name</th>
              <th>Position</th>
              <th>Industry Type</th>
              <th>Size Hint</th>
              <th>Country</th>
              <th>City</th>
              <th>Responses</th>
              <th>Address</th>
              <th>Map Location</th>
              <th className="action">Action</th>
            </tr>
          </thead>
          <tbody>
            {rejected?.map((item, index) => (
              <tr key={index}>
                <td>
                  <Avatar>
                    <AvatarImage src={genPbFiles(item, item.avatar)} />
                    <AvatarFallback>
                      {item.first_name.split("")[0]}
                    </AvatarFallback>
                  </Avatar>
                </td>
                <td>{item.expand?.company?.company_name}</td>
                <td>{item.email}</td>
                <td>{item.expand?.company?.company_name}</td>
                <td>{item.expand?.company?.position}</td>
                <td>{item.expand?.company?.Industry_type}</td>
                <td>{item.expand?.company?.size_hint}</td>
                <td>{item.expand?.company?.country}</td>
                <td>{item.expand?.company?.city}</td>
                <td>{item.expand?.company?.resonses}</td>
                <td>{item.expand?.company?.address}</td>
                <td>
                  <Link
                    href={item.expand?.company?.map_location || ""}
                    target="_blank"
                    className="text-blue-700"
                  >
                    View On Map
                  </Link>
                </td>
                <td className="action">
                  <div className="flex justify-center items-center gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        updatePartnerStatus.mutate({
                          id: item.expand?.company?.id || "",
                          status: "approved",
                        });
                      }}
                    >
                      ReApprove
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
