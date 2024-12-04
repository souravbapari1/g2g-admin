import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import NewMCForm from "./NewMCForm";
import SaveAction from "./SaveAction";

export const revalidate = 60;
async function page() {
  return (
    <WorkSpace>
      <WorkHeader title="New Micro Action">
        <SaveAction />
      </WorkHeader>
      <NewMCForm />
    </WorkSpace>
  );
}

export default page;
