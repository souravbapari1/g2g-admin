import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import { AdminList } from "./AdminsList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <WorkSpace>
      <WorkHeader title="Manage Admins">
        <Link href="/dashboard/users/admins/new">
          <Button size="sm" variant="outline">
            Add Admin
          </Button>
        </Link>
      </WorkHeader>
      <div className="flex flex-1 flex-col gap-4  ">
        <AdminList />
      </div>
    </WorkSpace>
  );
}