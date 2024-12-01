import { Button } from "@/components/ui/button";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import Link from "next/link";
import MembershipList from "./MembershipList";

function page() {
  return (
    <WorkSpace>
      <WorkHeader title="Membership Plans">
        <Link href="/dashboard/memberships/plans/add">
          <Button size="sm" variant="outline">
            Add New
          </Button>
        </Link>
      </WorkHeader>
      <MembershipList />
    </WorkSpace>
  );
}

export default page;
