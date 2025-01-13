import React from "react";

function BlogCategory() {
  return (
    <div className="flex justify-center items-center gap-5 mt-10 flex-wrap">
      <p className="text-lg underline text-primary cursor-pointer select-none font-medium">
        All
      </p>
      <p className="text-lg text-gray-800 hover:text-primary cursor-pointer select-none font-medium">
        Blogs
      </p>
      <p className="text-lg text-gray-800 hover:text-primary cursor-pointer select-none font-medium">
        Planting
      </p>
      <p className="text-lg text-gray-800 hover:text-primary cursor-pointer select-none font-medium">
        Events
      </p>
      <p className="text-lg text-gray-800 hover:text-primary cursor-pointer select-none font-medium">
        Sustainability
      </p>
      <p className="text-lg text-gray-800 hover:text-primary cursor-pointer select-none font-medium">
        Environment
      </p>
      <p className="text-lg text-gray-800 hover:text-primary cursor-pointer select-none font-medium">
        Green
      </p>
    </div>
  );
}

export default BlogCategory;
