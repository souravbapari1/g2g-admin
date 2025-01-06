import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ProjectItem, ProjectReportItem } from "@/interfaces/project";
import { genPbFiles } from "@/request/actions";
import { FileCheck, FilePlus2 } from "lucide-react";
import { useEffect } from "react";
import {
  useDeleteProjectReportsQuery,
  useProjectReportsQuery,
  useUpdateProjectReportsQuery,
} from "./projectReportsQuery";

function ManageProjectReport({
  open,
  project,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  project: ProjectItem;
}) {
  const getDocs = useProjectReportsQuery();
  useEffect(() => {
    if (project.docs && open) {
      getDocs.mutate(project.docs);
    }
  }, [project.docs, open]);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Manage Reports</SheetTitle>
          <SheetDescription>
            Manage reports for project {project.name}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          <ViewProjectReport
            onUpdate={() => getDocs.mutate(project.docs!)}
            title="Registration Doc"
            data={getDocs.data}
            reports={getDocs.data?.registration_doc}
            keyName="registration_doc"
          />
          <ViewProjectReport
            title="Auditing and Reviewing Reports"
            data={getDocs.data}
            reports={getDocs.data?.auditing_and_reviewing_reports}
            keyName="auditing_and_reviewing_reports"
            onUpdate={() => getDocs.mutate(project.docs!)}
          />
          <ViewProjectReport
            title="Verification and Validation Reports"
            data={getDocs.data}
            reports={getDocs.data?.verification_and_validation_reports}
            keyName="verification_and_validation_reports"
            onUpdate={() => getDocs.mutate(project.docs!)}
          />
          <ViewProjectReport
            title="SDGs vS Oman Vsion 2040"
            data={getDocs.data}
            reports={getDocs.data?.sdgs_vs_oman_vsion}
            keyName="sdgs_vs_oman_vsion"
            onUpdate={() => getDocs.mutate(project.docs!)}
          />
          <ViewProjectReport
            title="ESG"
            data={getDocs.data}
            reports={getDocs.data?.ESG}
            keyName="ESG"
            onUpdate={() => getDocs.mutate(project.docs!)}
          />
          <ViewProjectReport
            title="Retirement/Cancellation  Report"
            data={getDocs.data}
            reports={getDocs.data?.ESG}
            keyName="retirement_cancellation_report"
            onUpdate={() => getDocs.mutate(project.docs!)}
          />
          <ViewProjectReport
            title="Financial  Report"
            data={getDocs.data}
            reports={getDocs.data?.ESG}
            keyName="financial_report"
            onUpdate={() => getDocs.mutate(project.docs!)}
          />
          <ViewProjectReport
            title="Other Doc"
            data={getDocs.data}
            reports={getDocs.data?.other_doc}
            keyName="other_doc"
            onUpdate={() => getDocs.mutate(project.docs!)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default ManageProjectReport;

function ViewProjectReport({
  reports,
  data,
  title,
  keyName,
  onUpdate,
}: {
  reports?: string[];
  data?: ProjectReportItem;
  title: string;
  keyName: keyof ProjectReportItem;
  onUpdate: Function;
}) {
  const query = useUpdateProjectReportsQuery();
  const deleteReq = useDeleteProjectReportsQuery();

  return (
    <div className="mt-">
      <div className="flex justify-between items-center">
        <label className="text-sm">{title}</label>
        {data && (
          <small className="font-bold text-green-500">
            {reports?.length} Doc
          </small>
        )}
      </div>
      <div className="flex mt-2 mb-4 flex-wrap flex-col gap-2">
        {reports &&
          data &&
          reports?.map((doc) => (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex justify-start items-center gap-3">
                  <FileCheck
                    size={24}
                    className="cursor-pointer hover:text-red-400 text-green-600"
                  />
                  <div className="w-64 text-ellipsis overflow-hidden">
                    <p className="text-ellipsis overflow-hidden">{doc}</p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    window.open(genPbFiles(data, doc), "_blank");
                  }}
                >
                  View File
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    const confirm = window.confirm(
                      "Are you sure you want to delete this file?"
                    );
                    if (confirm) {
                      deleteReq.mutate({
                        id: data?.id,
                        key: keyName,
                        files: [doc],
                        onComplete: () => {
                          onUpdate();
                        },
                      });
                    }
                  }}
                >
                  Delete File
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        <label htmlFor={keyName}>
          {query.isLoading ? (
            "Uploading..."
          ) : (
            <FilePlus2
              size={24}
              color="white"
              className="cursor-pointer bg-blue-700 rounded-full p-1"
            />
          )}
        </label>
      </div>
      <Input
        type="file"
        className="mt-1  rounded-none hidden"
        id={keyName}
        multiple
        onChange={(e) => {
          if (e.target.files) {
            query.mutate({
              id: data!.id,
              key: `${keyName}`,
              files: Array.from(e.target.files),
              onComplete: () => {
                onUpdate();
              },
            });
          }
        }}
      />
    </div>
  );
}
