import apolloClient from "@/graphql/apolloClient";
import { gql } from "@apollo/client";
import { Printer } from "lucide-react";
import Link from "next/link";
import React from "react";

export const revalidate = 0;
async function ListView() {
  const blogs = await apolloClient.query<{
    blogPosts: { title: string; documentId: string }[];
  }>({
    query: gql`
      query BlogPosts {
        blogPosts {
          title
          documentId
        }
      }
    `,
  });

  const researches = await apolloClient.query<{
    researchPosts: { title: string; documentId: string }[];
  }>({
    query: gql`
      query ResearchPosts {
        researchPosts {
          documentId
          title
        }
      }
    `,
  });
  return (
    <div className="grid grid-cols-2">
      <div className="h-[94.2vh] w-full border-r px-0  overflow-auto relative">
        <div className="w-full border-b h-10 flex justify-center items-center absolute  bg-gray-50">
          <p>Print Blogs</p>
        </div>
        <div className="w-full h-full p-5 pt-14  overflow-auto">
          {blogs.data.blogPosts.map((e, index) => (
            <div
              className="w-full flex justify-between items-center border p-4 mb-4"
              key={e.documentId}
            >
              <p className="text-sm line-clamp-1">{e.title}</p>
              <Link
                target="_blank"
                href={`/dashboard/print-data/blog/${e.documentId}`}
                className=" cursor-pointer pl-5"
              >
                <Printer size={18} />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[94.2vh] w-full border-r px-0  overflow-auto relative">
        <div className="w-full border-b h-10 flex justify-center items-center absolute  bg-gray-50">
          <p>Print Researchers</p>
        </div>
        <div className="w-full h-full p-5 pt-14  overflow-auto">
          {researches.data.researchPosts.map((e, index) => (
            <div
              className="w-full flex justify-between items-center border p-4 mb-4"
              key={e.documentId}
            >
              <p className="text-sm line-clamp-1">{e.title}</p>
              <Link
                target="_blank"
                href={`/dashboard/print-data/research/${e.documentId}`}
                className=" cursor-pointer pl-5"
              >
                <Printer size={18} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListView;
