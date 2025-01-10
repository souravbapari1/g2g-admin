"use client";
import React from "react";
import ClubImageGallery from "./ClubImageGallery";
import { create } from "zustand";
import { cn } from "@/lib/utils";
import ClubVideoGallery from "./ClubVideoGallery";

function ClubGallery() {
  const { activeTab, setActiveTab } = useClubGalleryTabState();
  return (
    <div className="mt-8">
      <div className="flex justify-center font-semibold mb-6 select-none items-center gap-8">
        <p
          className={cn(
            "text-2xl cursor-pointer ",
            activeTab == 0 && "text-primary underline"
          )}
          onClick={() => setActiveTab(0)}
        >
          Images
        </p>
        <p
          onClick={() => setActiveTab(1)}
          className={cn(
            "text-2xl cursor-pointer ",
            activeTab == 1 && "text-primary underline"
          )}
        >
          Videos
        </p>
      </div>
      {activeTab == 0 && <ClubImageGallery />}
      {activeTab == 1 && <ClubVideoGallery />}
    </div>
  );
}

export default ClubGallery;

const useClubGalleryTabState = create<{
  activeTab: number;
  setActiveTab: (tab: number) => void;
}>((set) => {
  return {
    activeTab: 0,
    setActiveTab: (tab: number) => {
      set(() => ({
        activeTab: tab,
      }));
    },
  };
});
