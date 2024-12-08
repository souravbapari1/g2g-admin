"use client";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import React from "react";
import AddNewCategory from "./AddNewCategory";
import { useQuery } from "react-query";
import { deletePodcastCategory, getPodcastCategory } from "./actions";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash } from "lucide-react";
import { deleteBlogCategory } from "@/request/worker/blog/manageCategory";
import toast from "react-hot-toast";
import UpdateCategory from "./UpdateCategory";

function ManageCategory() {
  const data = useQuery(
    ["podcastCategories"],
    async () => await getPodcastCategory()
  );
  return (
    <div>
      <WorkHeader title="Podcast Category">
        <AddNewCategory
          onAddNew={() => {
            data.refetch();
          }}
        />
      </WorkHeader>
      <div className="flex flex-wrap gap-4 p-5">
        {data?.data?.items?.map((item) => {
          return (
            <Badge key={item.id} variant="secondary">
              <p>{item.name}</p>
              <div className="flex pl-5 gap-2">
                <UpdateCategory data={item} onComplete={() => data.refetch()}>
                  <Edit size={10} color="green" />
                </UpdateCategory>

                <Trash
                  size={10}
                  color="red"
                  className="cursor-pointer"
                  onClick={async () => {
                    const confirm = window.confirm(
                      "Are you sure you want to delete this category?"
                    );
                    if (confirm) {
                      try {
                        await deletePodcastCategory(item.id);
                        data.refetch();
                      } catch (error) {
                        console.log(error);
                        toast.error("Something went wrong");
                      }
                    }
                  }}
                />
              </div>
            </Badge>
          );
        })}
      </div>
    </div>
  );
}

export default ManageCategory;
