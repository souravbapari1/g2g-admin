"use client";
import PrintMe from "@/app/dashboard/academy/join-requests/view/[id]/PrintMe";
import { usePrintElement } from "@/hooks/usePrintElement";
import { UserItem } from "@/interfaces/user";
import React, { useEffect, useRef } from "react";

interface PrintUserProps {
  userData: UserItem;
}

const PrintUser: React.FC<PrintUserProps> = ({ userData }) => {
  const { expand } = userData;
  const company = expand?.company;

  return (
    <div className="w-full">
      <PrintMe />
      {/* Content to Print */}
      <div className="bg-white  rounded w-full">
        {company ? (
          <div className="w-full">
            <table className="w-full border border-gray-300 text-left">
              <tbody>
                <tr className="border-b">
                  <th className="px-4 py-2 bg-gray-100 font-medium">
                    Company Name
                  </th>
                  <td className="px-4 py-2">{company.company_name}</td>
                </tr>
                <tr className="border-b">
                  <th className="px-4 py-2 bg-gray-100 font-medium">
                    Industry Type
                  </th>
                  <td className="px-4 py-2">{company.Industry_type}</td>
                </tr>
                <tr className="border-b">
                  <th className="px-4 py-2 bg-gray-100 font-medium">Website</th>
                  <td className="px-4 py-2">{company.website}</td>
                </tr>
                <tr className="border-b">
                  <th className="px-4 py-2 bg-gray-100 font-medium">City</th>
                  <td className="px-4 py-2">{company.city}</td>
                </tr>
                <tr className="border-b">
                  <th className="px-4 py-2 bg-gray-100 font-medium">Country</th>
                  <td className="px-4 py-2">{company.country}</td>
                </tr>
                <tr className="border-b">
                  <th className="px-4 py-2 bg-gray-100 font-medium">Address</th>
                  <td className="px-4 py-2">{company.address}</td>
                </tr>
                <tr className="border-b">
                  <th className="px-4 py-2 bg-gray-100 font-medium">
                    Position
                  </th>
                  <td className="px-4 py-2">{company.position}</td>
                </tr>
                <tr className="border-b">
                  <th className="px-4 py-2 bg-gray-100 font-medium">
                    Approved Status
                  </th>
                  <td className="px-4 py-2">{company.approved_status}</td>
                </tr>
                <tr className="border-b">
                  <th className="px-4 py-2 bg-gray-100 font-medium">
                    Reject Reason
                  </th>
                  <td className="px-4 py-2">{company.rejectReason || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No company information available.</p>
        )}
      </div>
    </div>
  );
};

export default PrintUser;
