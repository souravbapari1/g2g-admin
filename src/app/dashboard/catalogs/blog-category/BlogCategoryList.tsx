"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BlogCategoryItem } from "@/interfaces/category";
import { extractErrors } from "@/request/actions";
import {
  createBlogCategory,
  deleteBlogCategory,
  getBlogCategorys,
  updateBlogCategory,
} from "@/request/worker/blog/manageCategory";
import {
  createAreaType,
  deleteAreaType,
  updateAreaType,
} from "@/request/worker/catalogs/areaType";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import BlogCatgoryCard from "./BlogCatgoryCard";

function BlogCategoryList() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<BlogCategoryItem[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  const loadData = async () => {
    const data = await getBlogCategorys();
    setData(data.items);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Filtered data based on search term
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between ">
        <Input
          placeholder="Search Area Types..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          className="w-64 rounded-none border-b-0"
        />
        <div className="flex justify-end gap-5 items-center">
          <p>Total Category: {data.length}</p>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
              <Button variant="secondary" className="rounded-none">
                Add New Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
              </DialogHeader>
              <Input
                placeholder="Enter Category"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                className="rounded-none"
                onClick={async () => {
                  if (!name) {
                    toast.error("Name is required");
                    return;
                  }
                  try {
                    const create = await createBlogCategory(name);
                    if (create) {
                      setName("");
                      setOpen(false);
                      loadData();
                    }
                  } catch (e: any) {
                    const errors = extractErrors(e?.response);
                    toast.error(errors[0]);
                    console.log(e);
                  }
                }}
              >
                Save
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Table className="border">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center border">S No.</TableHead>
            <TableHead className="text-left border">Category Name</TableHead>
            <TableHead className="text-center border">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item, index) => (
            <BlogCatgoryCard
              key={item.id}
              item={item}
              index={index + 1}
              onEdit={async (id, newName) => {
                try {
                  const update = await updateBlogCategory(id, newName);
                  if (update) loadData();
                } catch (e) {
                  console.error(e);
                  toast.error("Something went wrong");
                }
              }}
              onDelete={async (id) => {
                try {
                  await deleteBlogCategory(id);
                  loadData();
                } catch (e) {
                  console.error(e);
                  toast.error("Could not delete area type");
                }
              }}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default BlogCategoryList;
