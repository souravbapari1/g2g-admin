"use client";
import { Input } from "@/components/ui/input";
import { formatTimestampCustom } from "@/helper/dateTime";
import { Collection } from "@/interfaces/collection";
import { ResearchItem } from "@/interfaces/researches";
import { genPbFiles } from "@/request/actions";
import {
  deleteResearches,
  getResearches,
} from "@/request/worker/researches/manageResearches";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function ResearchesList() {
  const [data, setData] = useState<Collection<ResearchItem>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [state, setState] = useState<string>();
  const [search, setSearch] = useState<string>();

  const abortController = new AbortController();

  const filterData = () => {
    let filter = [];
    if (state) {
      filter.push(`status='${state}'`);
    }
    if (search) {
      filter.push(`title~'${search}'`);
    }
    return filter.length > 0 ? `(${filter.join(" && ")})` : "";
  };

  const loadData = async (loadMore: boolean = false) => {
    setLoading(true);
    try {
      const nextPage = loadMore ? page + 1 : 1;
      const res = await getResearches(
        nextPage,
        filterData(),
        abortController.signal
      );
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
    return () => {
      if (data) {
        abortController.abort();
      }
    };
  }, [search, state]);

  const handleLoadMore = () => {
    if (data!.totalPages > page) {
      loadData(true);
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center px-5">
        <Input
          type="search"
          placeholder="Search..."
          className="w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={state} onValueChange={setState}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="restoration">Restoration</SelectItem>
            <SelectItem value="planting">Planting</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 ">
        {data?.items.map((blog) => (
          <div
            key={blog.id}
            className="flex flex-col items-start gap-3 bg-gray-100 p-6  transition-shadow duration-200"
          >
            <Image
              src={genPbFiles(blog, blog.image)}
              width={400}
              height={200}
              alt={blog.title}
              className="w-full h-56 object-cover "
            />
            <h1 className="text-2xl font-semibold text-gray-800 line-clamp-1">
              {blog.title}
            </h1>
            <p className="text-gray-600 line-clamp-2">{blog.description}</p>
            <p className="font-medium text-gray-500 text-sm">
              Date: {formatTimestampCustom(blog.created)} - Status:{" "}
              {blog.status}
            </p>
            <hr className="bg-gray-500 h-[1px] w-full" />
            <div className="flex justify-between w-full ">
              <Link
                href={`/dashboard/researches/${blog.id}`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={async () => {
                  if (confirm("Are you sure you want to delete this blog?")) {
                    try {
                      await deleteResearches(blog.id);
                      loadData();
                    } catch (error) {
                      console.log(error);
                    }
                  }
                }}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {data && data.totalPages > page && (
          <button
            className="col-span-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
}

export default ResearchesList;
