import PrintMe from "@/app/dashboard/academy/join-requests/view/[id]/PrintMe";
import { getUser } from "@/request/worker/users/manageUsers";
import React from "react";

export const revalidate = 0;
const UserProfilePage = async ({ params }: { params: { id: string } }) => {
  const user = await getUser(params.id);
  const {
    first_name,
    last_name,
    email,
    mobile_no,
    wallet,
    created,
    country,
    city,
    role,
  } = user;
  const company = user.expand?.company;
  return (
    <div className="user-profile">
      <PrintMe />
      <h1>User Profile</h1>

      {/* Conditionally render user details */}
      {first_name && last_name && (
        <p>
          <strong>Name:</strong> {first_name} {last_name}
        </p>
      )}

      {email && (
        <p>
          <strong>Email:</strong> {email}
        </p>
      )}

      {mobile_no && (
        <p>
          <strong>Mobile:</strong> {mobile_no}
        </p>
      )}

      {wallet !== undefined && (
        <p>
          <strong>Wallet Balance:</strong> ${wallet}
        </p>
      )}

      {created && (
        <p>
          <strong>Account Created:</strong>{" "}
          {new Date(created).toLocaleDateString()}
        </p>
      )}

      {country && (
        <p>
          <strong>Country:</strong> {country}
        </p>
      )}

      {city && (
        <p>
          <strong>City:</strong> {city}
        </p>
      )}

      {role && (
        <p>
          <strong>Role:</strong> {role}
        </p>
      )}

      {/* Conditionally render company information if available */}
      {company &&
        company.company_name &&
        company.Industry_type &&
        company.position &&
        company.about_us &&
        company.website &&
        company.size_hint &&
        company.approved_status && (
          <div className="company-info">
            <h2>Company Information</h2>
            <p>
              <strong>Company Name:</strong> {company.company_name}
            </p>
            <p>
              <strong>Industry:</strong> {company.Industry_type}
            </p>
            <p>
              <strong>Position:</strong> {company.position}
            </p>
            <p>
              <strong>About Us:</strong> {company.about_us}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a href={company.website}>{company.website}</a>
            </p>
            <p>
              <strong>Company Size:</strong> {company.size_hint}
            </p>
            <p>
              <strong>Approved Status:</strong> {company.approved_status}
            </p>
          </div>
        )}
    </div>
  );
};

export default UserProfilePage;
