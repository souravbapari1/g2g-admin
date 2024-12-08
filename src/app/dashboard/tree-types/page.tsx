import ExportDataView from "@/components/export";
import { Button } from "@/components/ui/button";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import { FaFileExcel } from "react-icons/fa";
import { UnitTypesList } from "../catalogs/unit-types/UnitTypesList";

export default function Page() {
  return (
    <WorkSpace>
      <WorkHeader title="Tree Types">
        <ExportDataView base="unit_types">
          <Button size="sm" variant="outline" className="mr-2">
            <FaFileExcel /> Export Files
          </Button>
        </ExportDataView>
      </WorkHeader>

      <div className="flex flex-1 flex-col gap-4 p-4 ">
        <UnitTypesList allowEdit={false} defaultUnitType="tree" />
      </div>
    </WorkSpace>
  );
}
