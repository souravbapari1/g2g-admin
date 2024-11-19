import {
  getProjectReportDocs,
  getProjectReportDocsDelete,
  getProjectReportDocsUpdate,
} from "@/request/worker/project/manageProjectReports";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";

export const useProjectReportsQuery = () => {
  return useMutation({
    mutationFn: (id: string) => getProjectReportDocs(id),

    onError(err) {
      console.log(err);
      toast.error("Something went wrong! Load failed ");
    },
  });
};

export const useUpdateProjectReportsQuery = () => {
  return useMutation({
    mutationFn: (data: {
      id: string;
      files: File[];
      key: string;
      onComplete: Function;
    }) => getProjectReportDocsUpdate(data.id, data.key, data.files),

    onSuccess(data, variables, context) {
      variables.onComplete();
    },
    onError(err) {
      console.log(err);
      toast.error("Something went wrong! Load failed ");
    },
  });
};

export const useDeleteProjectReportsQuery = () => {
  return useMutation({
    mutationFn: (data: {
      id: string;
      files: string[];
      key: string;
      onComplete: Function;
    }) => getProjectReportDocsDelete(data.id, data.key, data.files),

    onMutate(variables) {
      toast.loading("Deleting...");
    },

    onSuccess(data, variables, context) {
      toast.dismiss();
      toast.success("Deleted Successfully");
      variables.onComplete();
    },
    onError(err) {
      console.log(err);
      toast.error("Something went wrong! Load failed ");
    },
  });
};
