import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function BlogPostBox() {
  return (
    <div className="w-full border-2 border-primary/5 shadow hover:shadow-lg shadow-gray-200 transition-all ">
      <Image
        alt="blog"
        src="https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-waterfall-free-image.jpeg?w=600&quality=80"
        width={1000}
        height={1000}
        className="w-full h-52"
      />
      <div className="flex  justify-between px-5 mt-5">
        <h1 className="font-bold text-gray-700 uppercase text-sm">
          01 Jan 2025
        </h1>
        <div className="">
          <Badge variant="secondary" className="text-xs">
            Planting
          </Badge>
        </div>
      </div>
      <div className="flex flex-col justify-between p-5">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">
            <span className="text-gray-900">
              The Power Of Achieve More Together
            </span>
          </h2>
          <p className="text-gray-900">
            <span className="text-gray-500">
              Explore the concept of collaboration and its impact on
              productivity.
            </span>
          </p>
        </div>
      </div>
      <div className="flex px-5 pb-3 justify-between items-center gap-4">
        <Button variant="outline" size="sm">
          Edit
        </Button>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </div>
    </div>
  );
}

export default BlogPostBox;
