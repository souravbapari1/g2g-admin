"use client";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import React, { lazy, memo, Suspense } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const fallback = (
  <div style={{ background: "#ddd", width: 24, height: 24, borderRadius: 4 }} />
);

interface IconProps extends Omit<LucideProps, "ref"> {
  name: string;
}
export const iconsList = Object.keys(
  dynamicIconImports
) as (keyof typeof dynamicIconImports)[];

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = lazy(
    dynamicIconImports[name as keyof typeof dynamicIconImports]
  );

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} />
    </Suspense>
  );
};

export default memo(Icon);

const ITEMS_PER_BATCH = 84; // Number of icons to load in each batch

const IconPicker = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: (e: string) => void;
}) => {
  const [filteredIcons, setFilteredIcons] = useState(iconsList); // Filtered icons based on the search
  const [visibleIcons, setVisibleIcons] = useState(
    filteredIcons.slice(0, ITEMS_PER_BATCH)
  ); // Icons to display
  const [hasMore, setHasMore] = useState(true); // Whether more icons are available to load

  // Handle search logic

  // Load more icons when "Load More" is clicked
  const loadMoreIcons = () => {
    const nextBatchStart = visibleIcons.length;
    const nextBatchEnd = nextBatchStart + ITEMS_PER_BATCH;

    if (nextBatchStart >= filteredIcons.length) {
      setHasMore(false);
      return;
    }

    setVisibleIcons((prevIcons) => [
      ...prevIcons,
      ...filteredIcons.slice(nextBatchStart, nextBatchEnd),
    ]);
  };

  // Update visible icons when `filteredIcons` changes
  useEffect(() => {
    setVisibleIcons(filteredIcons.slice(0, ITEMS_PER_BATCH));
    setHasMore(filteredIcons.length > ITEMS_PER_BATCH);
  }, [filteredIcons]);
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="overflow-auto sheet-content p-4">
        <SheetHeader>
          <SheetTitle>Select An Icon</SheetTitle>
        </SheetHeader>

        {/* Icons Grid */}
        <div className="mt-5 grid grid-cols-5 gap-8">
          {visibleIcons.map((icon, index) => (
            <div
              key={index}
              className="flex justify-center items-center w-full  rounded-md hover:bg-gray-100"
              onClick={() => {
                onClick?.(icon);
                setOpen(false);
              }}
            >
              <Icon name={icon} />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-4">
            <Button
              onClick={loadMoreIcons}
              variant="secondary"
              className="w-full mb-10"
            >
              Load More
            </Button>
          </div>
        )}

        {/* No Results Message */}
        {!hasMore && visibleIcons.length === 0 && (
          <div className="mt-4 text-center text-gray-500">No icons found.</div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export const PickIcon = memo(IconPicker);
