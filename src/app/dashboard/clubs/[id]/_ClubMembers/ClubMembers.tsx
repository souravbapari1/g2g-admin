import React from "react";
import ClubMember from "./ClubMember";

function ClubMembers() {
  return (
    <div className="grid grid-cols-6 gap-5 mt-10">
      <ClubMember />
      <ClubMember />
      <ClubMember />
      <ClubMember />
      <ClubMember />
      <ClubMember />
    </div>
  );
}

export default ClubMembers;
