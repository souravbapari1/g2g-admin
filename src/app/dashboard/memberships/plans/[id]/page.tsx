import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import { getMembershipById } from "@/request/worker/membership/membership";
import UpdateMembership from "./UpdateMembership";
import PlanSaveAction from "./PlanSaveAction";

export const revalidate = 0;
async function page({ params }: { params: { id: string } }) {
  const data = await getMembershipById(params.id);
  return (
    <WorkSpace>
      <WorkHeader title="Update Membership Plan">
        <PlanSaveAction id={params.id} />
      </WorkHeader>
      <UpdateMembership data={data} />
    </WorkSpace>
  );
}

export default page;
