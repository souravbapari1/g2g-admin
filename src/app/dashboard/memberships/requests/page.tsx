import { Button } from "@/components/ui/button";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <WorkSpace>
      <WorkHeader title="Membership Requests" />
      <div className="tableWrapper">
        <table className="tblView table-fixed">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Plan</th>
              <th>Amount</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>Gold</td>
              <td>$100</td>
              <td>
                <div className="flex justify-center items-center gap-4">
                  <Button size="sm" variant="secondary">
                    Over View
                  </Button>
                  <Button size="sm" variant="outline">
                    Approve
                  </Button>
                  <Button size="sm" variant="destructive">
                    Reject
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </WorkSpace>
  );
}

export default page;
``;
