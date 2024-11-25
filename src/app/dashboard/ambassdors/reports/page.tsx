import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import { getAmbassadorsList } from "./function";
import ReportList from "./ReportList";

export const revalidate = 0;
async function page() {
  const ambassador = await getAmbassadorsList();
  return (
    <WorkSpace>
      <WorkHeader title="Ambassadors Reports" />
      <ReportList data={ambassador} />
    </WorkSpace>
  );
}

export default page;
