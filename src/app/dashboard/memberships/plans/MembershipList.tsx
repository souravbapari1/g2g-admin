"use client";

import { Button } from "@/components/ui/button";
import { MembershipItem } from "@/interfaces/membership";
import { genPbFiles } from "@/request/actions";
import { getMembership } from "@/request/worker/membership/membership";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import MemberShipItemBox from "./MemberShipItemBox";

function MembershipList() {
  const [page, setPage] = useState(1);
  const [membershipData, setMembershipData] = useState<MembershipItem[]>([]);

  // Fetch membership data
  const { refetch } = useQuery(
    ["membership", page], // Include page in the query key
    () => getMembership(page), // Fetch function
    {
      keepPreviousData: true, // Maintain previous data while fetching new data
      onSuccess: (fetchedData) => {
        // Append fetched data to membershipData
        setMembershipData((prevData) => [
          ...prevData,
          ...fetchedData.items.filter(
            (item) => !prevData.some((existing) => existing.id === item.id)
          ),
        ]);
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  return (
    <div>
      <div className="grid lg:grid-cols-4 p-10 xl:gap-5 gap-3">
        {membershipData?.map((membership, i) => (
          <MemberShipItemBox
            membership={membership}
            key={membership.id + i}
            onDelete={() => {
              setMembershipData([]);
              refetch();
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default MembershipList;
