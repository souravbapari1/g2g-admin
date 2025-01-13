import React from "react";
import BlogCategory from "./BlogCategory";
import BlogPostBox from "./BlogPostBox";
import { Plus } from "lucide-react";
import Link from "next/link";

function ClubBlog() {
  return (
    <div className="mt-10">
      <div className=" mb-5 block">
        <BlogCategory />
      </div>
      <div className="grid grid-cols-4 gap-5">
        <BlogPostBox />
        <BlogPostBox />
        <BlogPostBox />
        <BlogPostBox />
        <BlogPostBox />
        <BlogPostBox />
      </div>
      <Link
        href="/dashboard/clubs/1/blog/new"
        className="fixed bottom-5 right-5 w-16 h-16 bg-primary rounded-full flex text-white justify-center items-center"
      >
        <Plus />
      </Link>
    </div>
  );
}

export default ClubBlog;
