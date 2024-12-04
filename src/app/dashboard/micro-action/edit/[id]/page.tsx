import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import { getMicroAction } from "../../actions";
import UpdateMCForm from "./UpdateMCForm";
import SaveAction from "./SaveMcActions";

export const revalidate = 0;
async function page({ params }: { params: { id: string } }) {
  const data = await getMicroAction(params.id);
  return (
    <WorkSpace>
      <WorkHeader title="Edit Micro Action">
        <SaveAction id={params.id} />
      </WorkHeader>
      <UpdateMCForm data={data} />
    </WorkSpace>
  );
}

export default page;
