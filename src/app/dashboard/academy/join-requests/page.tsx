import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import React from "react";

function page() {
  return (
    <WorkSpace>
      <WorkHeader title="Join Requests" />
      <div className="tableWrapper">
        <table className="tblView table-fixed">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>User Name</th>
              <th>Program Title</th>
              <th>Submission Date</th>
              <th>Status</th>
              <th>Tshart Size</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>REQ-001</td>
              <td>John Doe</td>
              <td>Daily Fitness Tracker</td>
              <td>2024-11-01</td>
              <td>In Progress</td>
              <td>xl</td>
              <td>Requested additional features</td>
            </tr>
            <tr>
              <td>REQ-002</td>
              <td>Jane Smith</td>
              <td>Mindfulness Journal</td>
              <td>2024-11-10</td>
              <td>Completed</td>
              <td>Medium</td>
              <td>Approved for rollout</td>
            </tr>
            <tr>
              <td>REQ-003</td>
              <td>Michael Brown</td>
              <td>Work Productivity Log</td>
              <td>2024-11-15</td>
              <td>Pending</td>
              <td>small</td>
              <td>Waiting for feedback</td>
            </tr>
            <tr>
              <td>REQ-004</td>
              <td>Emily Davis</td>
              <td>Creative Writing Prompts</td>
              <td>2024-11-20</td>
              <td>In Review</td>
              <td>xl</td>
              <td>Needs review by editors</td>
            </tr>
          </tbody>
        </table>
      </div>
    </WorkSpace>
  );
}

export default page;
