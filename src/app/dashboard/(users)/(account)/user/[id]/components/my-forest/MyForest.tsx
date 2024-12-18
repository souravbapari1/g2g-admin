"use client";

import TargetProgress from "./TargetProgress";

import { useEffect } from "react";

import { UserItem } from "@/interfaces/user";
import { useMyDonation } from "../orders/state/useMyDonations";
function MyForest({
  user,
  preview = false,
}: {
  user: UserItem;
  preview?: boolean;
}) {
  const { loading, loadMyDonation, mydonation, status } = useMyDonation();

  useEffect(() => {
    if (mydonation.length == 0) {
      loadMyDonation(user.id);
    }
  }, []);

  return <div>{!loading && <TargetProgress user={user} />}</div>;
}

export default MyForest;
