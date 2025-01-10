import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import React from "react";
import CreateNewClub from "./_elements/CreateNewClub";
import AboutClub from "./_elements/AboutClub";
import ClubAchievements from "./_elements/ClubAchievements";
import ClubObjects from "./_elements/ClubObjects";
import ClubSocialLinks from "./_elements/ClubSocialLinks";
import ClubChallenges from "./_elements/ClubChallengs";
import ClubSdg from "./_elements/ClubSdgs";

function page() {
  return (
    <WorkSpace>
      <WorkHeader title="Create Club" />
      <div className="p-5">
        <CreateNewClub />
        <AboutClub />
        <ClubChallenges />
        <ClubSdg />
        <ClubAchievements />
        <ClubObjects />
        <ClubSocialLinks />
      </div>
    </WorkSpace>
  );
}

export default page;
