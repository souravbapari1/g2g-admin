import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import TreeActivtyList from "./TreeActivtyList";
import ExportDataView from "@/components/export";
import { Button } from "@/components/ui/button";
import { FaFileExcel } from "react-icons/fa";

export default function Page() {
  return (
    <WorkSpace>
      <WorkHeader title="Trees Activity">
        <ExportDataView base="trees" allowPdf={true}>
          <Button size="sm" variant="secondary" className="mr-5">
            <FaFileExcel /> Export Files
          </Button>
        </ExportDataView>
      </WorkHeader>
      <div className="flex flex-1 flex-col gap-4 ">
        <TreeActivtyList />
      </div>
    </WorkSpace>
  );
}
