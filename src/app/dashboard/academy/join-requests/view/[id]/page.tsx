import React from "react";
import { getAcademicById } from "../../manageRequests";
import Image from "next/image";
import { genPbFiles } from "@/request/actions";
import PrintMe from "./PrintMe";

export const revalidate = 0;

async function page({ params }: { params: { id: string } }) {
  const data = await getAcademicById(params.id);

  // Destructure the data from your JSON for easier access
  const { academic, applicationData, expand } = data;

  return (
    <div className="bg-emerald-50 w-full p-8">
      <PrintMe />
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-emerald-200">
        <Image
          src="/logo/main-logo.png"
          alt="Main Logo"
          width={100}
          height={100}
        />
        <h1 className="text-3xl font-bold text-emerald-600">Academic Event</h1>
      </div>

      {/* Academic Details */}
      <section className="bg-white  rounded-lg p-6 ">
        <h2 className="text-xl font-semibold text-emerald-700 mb-4">
          Academic Details
        </h2>
        <p>
          <strong>Title:</strong> {academic.title}
        </p>
        <p>
          <strong>Location:</strong> {academic.location}
        </p>
        <p>
          <strong>Start Date:</strong> {academic.startDate}
        </p>
        <p>
          <strong>End Date:</strong> {academic.endDate}
        </p>
        <p>
          <strong>Time:</strong> {academic.time}
        </p>
        <p>
          <strong>Max Participants:</strong> {academic.maxParticipents}
        </p>
        <p>
          <strong>Language:</strong> {academic.languge}
        </p>
        <p>
          <strong>Pricing:</strong> {academic.pricing}
        </p>
        <p>
          <strong>Registration Ends:</strong> {academic.registerationEndDate}
        </p>
      </section>

      {/* Application Details */}
      <section className="bg-white  rounded-lg p-6 ">
        <h2 className="text-xl font-semibold text-emerald-700 mb-4">
          Application Data
        </h2>
        <p>
          <strong>Name:</strong> {applicationData.name}
        </p>
        <p>
          <strong>Age:</strong> {applicationData.age}
        </p>
        <p>
          <strong>Gender:</strong> {applicationData.gender}
        </p>
        <p>
          <strong>Email:</strong> {applicationData.email}
        </p>
        <p>
          <strong>Phone:</strong> {applicationData.phone}
        </p>
        <p>
          <strong>Country:</strong> {applicationData.country}
        </p>
        <p>
          <strong>City:</strong> {applicationData.city}
        </p>
        <p>
          <strong>Note:</strong> {applicationData.note}
        </p>
        <p>
          <strong>Size:</strong> {applicationData.size}
        </p>
      </section>

      {/* Expanded User Details */}
      {expand.updateBy && (
        <section className="bg-white  rounded-lg p-6 ">
          <h2 className="text-xl font-semibold text-emerald-700 mb-4">
            Updated By
          </h2>
          <Image
            src={genPbFiles(expand.updateBy, expand.updateBy.avatar)}
            alt="Avatar"
            width={100}
            height={100}
            className="rounded-full w-11 h-11 border border-emerald-200 mb-3"
          />
          <p>
            <strong>Name:</strong> {expand.updateBy.first_name}{" "}
            {expand.updateBy.last_name}
          </p>
          <p>
            <strong>Email:</strong> {expand.updateBy.email}
          </p>
          <p>
            <strong>Company:</strong> {expand.updateBy.company}
          </p>
          <p>
            <strong>City:</strong> {expand.updateBy.city}
          </p>
          <p>
            <strong>Country:</strong> {expand.updateBy.country}
          </p>
        </section>
      )}
    </div>
  );
}

export default page;
