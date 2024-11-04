"use client";
import { BlogItem } from "@/interfaces/blog";
import { Collection } from "@/interfaces/collection";
import { genPbFiles } from "@/request/actions";
import { getBlogs } from "@/request/worker/blog/manageBlog";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function BlogsList() {
  const [data, setData] = useState<Collection<BlogItem>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);

  const loadData = async (loadMore: boolean = false) => {
    setLoading(true);
    try {
      const nextPage = loadMore ? page + 1 : 1;
      const res = await getBlogs(nextPage);
      setData((prevData) => {
        if (loadMore && prevData) {
          return {
            ...res,
            items: [...prevData.items, ...res.items],
          };
        }
        return res;
      });
      if (loadMore) setPage(nextPage);
      else setPage(1);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const handleLoadMore = () => {
    if (data!.totalPages > page) {
      loadData(true);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {data?.items.map((blog) => (
        <div
          key={blog.id}
          className="flex justify-start md:flex-row flex-col items-center gap-5 border p-5"
        >
          <Image
            src={genPbFiles(blog, blog.image)}
            width={1200}
            height={60}
            alt=""
            className="md:w-28 w-full h-auto md:h-28 object-cover object-center  "
          />
          <div>
            <h1 className="text-xl font-bold line-clamp-1">{blog.title}</h1>
            <p className="line-clamp-2">{blog.description}</p>
            <div className=" flex justify-start items-center gap-4 ">
              <p className="font-bold text-sm">Date: {blog.created}</p>
            </div>
            <div className="flex justify-start items-center gap-5 mt-3">
              <Link
                href={`/dashboard/blogs/edit/${blog.id}`}
                className="text-blue-600"
              >
                Edit
              </Link>
              <Link
                href={`/dashboard/blogs/edit/${blog.id}`}
                className="text-red-600"
              >
                Delete
              </Link>
            </div>
          </div>
        </div>
      ))}
      {data && data.totalPages > page && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default BlogsList;
