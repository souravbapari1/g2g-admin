import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClubHomeView from "./ClubHomeView";
import ChallengesAndSDG from "../_challengsAndSdg/challengesAndSDG";
import ClubMembers from "../_ClubMembers/ClubMembers";
import EventsCards from "../_events/EventsCards";
import ClubSponsors from "../_sponsors/Sponsors";
import ClubGallery from "../_gallery/ClubGallery";
import ClubBlog from "../_gallery/_blogs/ClubBlog";
import ClubTracking from "../_tracking/ClubTracking";
import ClubGalleryCategory from "../_gallery/ClubGalleryCategory";

function ClubBasic() {
  return (
    <div className="p-5">
      <div className="border rounded-lg">
        <div className="p-4">
          <Tabs defaultValue="account" className="w-full">
            {/* Tabs List with Improved Styling */}
            <TabsList className="flex border-b-2 border-gray-200">
              <TabsTrigger
                className="w-full py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value="account"
              >
                Home
              </TabsTrigger>
              <TabsTrigger
                className="w-full py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value="password"
              >
                Changes & SDGS
              </TabsTrigger>
              <TabsTrigger
                className="w-full py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value="members"
              >
                Members
              </TabsTrigger>
              <TabsTrigger
                className="w-full py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value="events"
              >
                Events & Activity
              </TabsTrigger>
              <TabsTrigger
                className="w-full py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value="sponsors"
              >
                Sponsors
              </TabsTrigger>
              <TabsTrigger
                className="w-full py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value="gallery"
              >
                Gallery
              </TabsTrigger>
              <TabsTrigger
                className="w-full py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value="blogs"
              >
                Blogs
              </TabsTrigger>
              <TabsTrigger
                className="w-full py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value="projects"
              >
                Projects
              </TabsTrigger>
              <TabsTrigger
                className="w-full py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value="tracking"
              >
                Tracking
              </TabsTrigger>
            </TabsList>

            {/* Tabs Content */}
            <TabsContent value="account">
              <ClubHomeView />
            </TabsContent>
            <TabsContent value="password">
              <ChallengesAndSDG />
            </TabsContent>
            <TabsContent value="members">
              <ClubMembers />
            </TabsContent>
            <TabsContent value="events">
              <EventsCards />
            </TabsContent>
            <TabsContent value="sponsors">
              <ClubSponsors />
            </TabsContent>
            <TabsContent value="gallery">
              <ClubGalleryCategory />
            </TabsContent>
            <TabsContent value="blogs">
              <ClubBlog />
            </TabsContent>
            <TabsContent value="projects">
              {/* Replace with your Projects component */}
              <div>Projects Component Coming Soon</div>
            </TabsContent>
            <TabsContent value="tracking">
              <ClubTracking />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ClubBasic;
