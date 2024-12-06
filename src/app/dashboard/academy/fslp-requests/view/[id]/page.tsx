import React from "react";
import Image from "next/image";
import { getFslpById } from "../../fslpFunctions";
import { genPbFiles } from "@/request/actions";
import PrintMe from "../../../join-requests/view/[id]/PrintMe";

export const revalidate = 0;

async function fslpPage({ params }: { params: { id: string } }) {
  // Example function to simulate fetching the JSON data.
  const data = await getFslpById(params.id); // Replace with your API call or data fetching logic.

  const { application, expand, status, pic } = data;

  return (
    <div className="bg-emerald-50 w-full p-6">
      <PrintMe />
      {/* Header */}
      <header className="flex items-center justify-between pb-4 border-b border-emerald-200">
        <Image
          src="/logo/main-logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="rounded-lg"
        />
        <h1 className="text-3xl font-bold text-emerald-600">
          FSLP Application
        </h1>
      </header>

      {/* Application Details */}
      <section className="bg-white  rounded-lg p-6">
        <h2 className="text-xl font-semibold text-emerald-700 mb-4">
          Application Details
        </h2>
        <p>
          <strong>First Name:</strong> {application.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {application.lastName}
        </p>
        <p>
          <strong>Email:</strong> {application.emailID}
        </p>
        <p>
          <strong>Mobile No:</strong> {application.mobileNo}
        </p>
        <p>
          <strong>Address:</strong> {application.address}
        </p>
        <p>
          <strong>City:</strong> {application.city}
        </p>
        <p>
          <strong>Country:</strong> {application.country}
        </p>
        <p>
          <strong>Education State:</strong> {application.eduState}
        </p>
        <p>
          <strong>University Name:</strong> {application.universityName}
        </p>
        <p>
          <strong>DOB:</strong> {application.dob}
        </p>
        <p>
          <strong>Nationality:</strong> {application.nationality}
        </p>
      </section>

      {/* Application Status */}
      <section className="bg-white  rounded-lg p-6">
        <h2 className="text-xl font-semibold text-emerald-700 mb-4">
          Application Status
        </h2>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded ${
              status === "approved"
                ? "bg-emerald-200 text-emerald-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {status}
          </span>
        </p>
        <div className="mt-4">
          <Image
            src={genPbFiles(data, pic)}
            alt="Application Image"
            width={200}
            height={200}
            className="rounded-lg border border-emerald-200"
          />
        </div>
      </section>

      {/* User Details */}
      <section className="bg-white  rounded-lg p-6">
        <h2 className="text-xl font-semibold text-emerald-700 mb-4">User</h2>
        <Image
          src={genPbFiles(expand?.user, expand?.user?.avatar)}
          alt="User Avatar"
          width={100}
          height={100}
          className="rounded-full w-10 h-10 border border-emerald-200"
        />
        <p>
          <strong>First Name:</strong> {expand?.user?.first_name}
        </p>
        <p>
          <strong>Last Name:</strong> {expand?.user?.last_name}
        </p>
        <p>
          <strong>Email:</strong> {expand?.user?.email}
        </p>
        <p>
          <strong>City:</strong> {expand?.user?.city}
        </p>
        <p>
          <strong>Country:</strong> {expand?.user?.country}
        </p>
        <p>
          <strong>Role:</strong> {expand?.user?.role}
        </p>
      </section>

      {/* Updated By */}
      <section className="bg-white  rounded-lg p-6">
        <h2 className="text-xl font-semibold text-emerald-700 mb-4">
          Updated By
        </h2>
        <Image
          src={genPbFiles(expand?.updateBy, expand?.updateBy?.avatar)}
          alt="Updater Avatar"
          width={100}
          height={100}
          className="rounded-full w-12 h-12 border border-emerald-200"
        />
        <p>
          <strong>First Name:</strong> {expand?.updateBy?.first_name}
        </p>
        <p>
          <strong>Last Name:</strong> {expand?.updateBy?.last_name}
        </p>
        <p>
          <strong>Email:</strong> {expand?.updateBy?.email}
        </p>
        <p>
          <strong>City:</strong> {expand?.updateBy?.city}
        </p>
        <p>
          <strong>Country:</strong> {expand?.updateBy?.country}
        </p>
      </section>
    </div>
  );
}

export default fslpPage;
