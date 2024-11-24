import { Button } from "@/components/ui/button";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import Link from "next/link";
import BlogsList from "./BlogsList";

export default function Page() {
  return (
    <WorkSpace>
      <WorkHeader title="Blogs">
        <Link href="/dashboard/blogs/new">
          <Button size="sm" variant="outline">
            Add New Post
          </Button>
        </Link>
      </WorkHeader>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-5">
        <BlogsList />
      </div>
    </WorkSpace>
  );
}
