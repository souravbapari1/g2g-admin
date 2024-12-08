"use client";
import React, { useRef, useState } from "react";
import { AcademicRequestsItem } from "../../AcademicRequests";
import { Button } from "@/components/ui/button";
import { updateAcademicsStatus } from "../../manageRequests";
import toast from "react-hot-toast";
import { CheckCheck, Printer, Trash } from "lucide-react";

function AcademicRequestView({ data }: { data: AcademicRequestsItem }) {
  const [request, setRequest] = useState(data);
  const [loading, setLoading] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // Handle Print
  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const printWindow = window.open("", "_blank", "width=800,height=600");
      printWindow?.document.write(`
        <html>
          <head>
            <title>Print Academic Details</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1, h2, h3, h4, h5, h6 { margin: 0 0 10px; }
              .print-section { border: 1px solid #ccc; padding: 20px; border-radius: 8px; }
            </style>
          </head>
          <body>
            ${printContent}
          </body>
        </html>
      `);
      printWindow?.document.close();
      printWindow?.print();
    }
  };
  const updateStatus = async (
    status: "pending" | "approved" | "complete" | "cancel"
  ) => {
    try {
      setLoading(true);
      const response = await updateAcademicsStatus(data.id, status);
      if (response) {
        toast.success("Status updated successfully");
        setRequest(response);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const { academic, applicationData, expand, status } = request;
  return (
    <div className="">
      <div className="px-10 pt-10 flex justify-between items-center">
        <div className="">
          {status === "pending" && (
            <div className="flex justify-start gap-4">
              <Button
                disabled={loading}
                onClick={() => updateStatus("approved")}
              >
                <CheckCheck /> Accept
              </Button>
              <Button
                variant="destructive"
                disabled={loading}
                onClick={() => updateStatus("cancel")}
              >
                <Trash /> Reject
              </Button>
            </div>
          )}
          {status === "approved" && (
            <div className="flex justify-start gap-4">
              <Button
                disabled={loading}
                onClick={() => updateStatus("complete")}
              >
                Complete Academy Registration
              </Button>
            </div>
          )}
        </div>
        <Button variant="secondary" onClick={handlePrint}>
          <Printer /> Print
        </Button>
      </div>
      <div className="p-8 space-y-6" ref={printRef}>
        {/* Status */}
        <div className="bg-gray-100 p-4 rounded shadow">
          <p className="text-sm text-gray-500">Status:</p>
          <h2
            className={`text-lg font-bold ${
              status === "approved"
                ? "text-green-600"
                : status === "cancel"
                ? "text-red-600"
                : status === "complete"
                ? "text-blue-600"
                : "text-yellow-600"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </h2>
        </div>

        {/* Academic Details */}
        <div className="bg-white p-6 rounded shadow">
          <h5 className="text-lg font-bold mb-4">Academic Details</h5>
          <p>
            <strong>Name:</strong> {academic.name}
          </p>
          <p>
            <strong>Title:</strong> {academic.title}
          </p>
          <p>
            <strong>Start Date:</strong> {academic.startDate}
          </p>
          <p>
            <strong>End Date:</strong> {academic.endDate}
          </p>
          <p>
            <strong>Location:</strong> {academic.location}
          </p>
          <p>
            <strong>Language:</strong> {academic.languge}
          </p>
          <p>
            <strong>Max Participants:</strong> {academic.maxParticipents}
          </p>
          <p>
            <strong>Pricing:</strong> {academic.pricing}
          </p>
        </div>

        {/* Application Data */}
        <div className="bg-white p-6 rounded shadow">
          <h5 className="text-lg font-bold mb-4">Application Data</h5>
          <p>
            <strong>Message:</strong> {applicationData.message}
          </p>
          <p>
            <strong>Participant Question:</strong>{" "}
            {applicationData.participantQuestion}
          </p>

          {/* Participants */}
          <div className="mt-4">
            <h6 className="text-md font-semibold">Participants:</h6>
            {applicationData.participants.map((participant, index) => (
              <div
                key={index}
                className="border p-4 rounded mb-2 bg-gray-50 shadow-sm"
              >
                <p>
                  <strong>First Name:</strong> {participant.firstName}
                </p>
                <p>
                  <strong>Last Name:</strong> {participant.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {participant.email}
                </p>
                <p>
                  <strong>School:</strong> {participant.school}
                </p>
                <p>
                  <strong>Grade:</strong> {participant.grade}
                </p>
                <p>
                  <strong>T-Shirt Size:</strong> {participant.tshirtSize}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Parent Details */}
        <div className="bg-white p-6 rounded shadow">
          <h5 className="text-lg font-bold mb-4">Parent Details</h5>
          <p>
            <strong>First Name:</strong> {applicationData.parent.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {applicationData.parent.lastName}
          </p>
          <p>
            <strong>Email:</strong> {applicationData.parent.email}
          </p>
          <p>
            <strong>Phone:</strong> {applicationData.parent.phone}
          </p>
          <p>
            <strong>Address:</strong> {applicationData.parent.address}
          </p>
        </div>

        {/* Expand Data */}
        {expand && expand.updateBy && (
          <div className="bg-white p-6 rounded shadow">
            <h5 className="text-lg font-bold mb-4">Updated By</h5>
            <p>
              <strong>Name:</strong> {expand.updateBy.first_name}{" "}
              {expand.updateBy.last_name}
            </p>
            <p>
              <strong>Email:</strong> {expand.updateBy.email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AcademicRequestView;
