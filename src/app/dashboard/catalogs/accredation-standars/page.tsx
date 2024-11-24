import ExportDataView from "@/components/export";
import { Button } from "@/components/ui/button";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import { FaFileExcel } from "react-icons/fa";
import AccStandersList from "./AccStandersList";

export default function Page() {
  return (
    <WorkSpace>
      <WorkHeader title="Accredation Standars">
        <ExportDataView base="accredation_standars">
          <Button size="sm" variant="secondary">
            <FaFileExcel /> Export Files
          </Button>
        </ExportDataView>
      </WorkHeader>
      <div className="flex flex-1 flex-col gap-4 p-4 ">
        <AccStandersList />
      </div>
      \
    </WorkSpace>
  );
}
