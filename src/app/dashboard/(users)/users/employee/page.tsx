import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import { EmployeeList } from "./EmployeesList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <WorkSpace>
      <WorkHeader title="Manage Employees">
        <Link href="/dashboard/users/employee/new">
          <Button size="sm" variant="outline">
            Add Employee
          </Button>
        </Link>
      </WorkHeader>
      <div className="flex flex-1 flex-col gap-4  ">
        <EmployeeList />
      </div>
    </WorkSpace>
  );
}
