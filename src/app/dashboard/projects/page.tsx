import ExportDataView from "@/components/export";
import { Button } from "@/components/ui/button";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import { FaFileExcel } from "react-icons/fa";
import { ProjectsList } from "./ProjectsList";

export const revalidate = 0;
export default function Page() {
  return (
    <WorkSpace>
      <WorkHeader title="Projects">
        <ExportDataView base="projects" allowPdf={false}>
          <Button size="sm" variant="secondary" className="mr-5">
            <FaFileExcel /> Export Files
          </Button>
        </ExportDataView>
      </WorkHeader>

      <div className=" p-5">
        <ProjectsList />
      </div>
    </WorkSpace>
  );
}
