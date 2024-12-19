"use client";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import { getAmbassadorsList } from "./function";
import ReportList from "./ReportList";
import { useQuery } from "react-query";
import { user } from "@nextui-org/theme";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

function AmbassadorsReports() {
  const users = useQuery({
    queryKey: ["ambassadorsReports"],
    queryFn: async () => {
      return await getAmbassadorsList();
    },
  });

  if (users.isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="">
      <ReportList users={users.data || []} />
    </div>
  );
}

export default AmbassadorsReports;
