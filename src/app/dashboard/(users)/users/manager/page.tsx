import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import { ManagersList } from "./ManagersList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <WorkSpace>
      <WorkHeader title="Manage Managers">
        <Link href="/dashboard/users/manager/new">
          <Button size="sm" variant="outline">
            Add Manager
          </Button>
        </Link>
      </WorkHeader>
      <div className="flex flex-1 flex-col gap-4">
        <ManagersList />
      </div>
    </WorkSpace>
  );
}
