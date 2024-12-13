import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import { UsersList } from "./UsersList";

export default function Page() {
  return (
    <WorkSpace>
      <WorkHeader title="Ambassadors" />
      <div className="flex flex-1 flex-col gap-4 ">
        <UsersList />
      </div>
    </WorkSpace>
  );
}
