"use client";
import { Button } from "@/components/ui/button";
import { resetProjectParamsData } from "@/redux/Slices/projectParamsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { extractErrors } from "@/request/actions";
import { updateProject } from "@/request/worker/project/manageProject";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function ProjectUpdateAction({ id }: { id: string }) {
  const projectParams = useAppSelector((state) => state.projectParamsSlice);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const validateState = () => {
    const requiredFields = [
      {
        field: projectParams.project?.name,
        message: "Please enter project name",
      },
      {
        field: projectParams.project?.type,
        message: "Please select project type",
      },
      {
        field: projectParams.project?.main_interventions?.length,
        message: "Please select main interventions",
      },
      {
        field: projectParams.project?.unit_measurement,
        message: "Please select Unit of Measurement",
      },
      {
        field: projectParams.project?.sdgs?.length,
        message: "Please select sdgs",
      },
      {
        field: projectParams.project?.operated_by?.length,
        message: "Please select operated by",
      },
      {
        field: projectParams.project?.location?.length,
        message: "Please select location",
      },
      {
        field: projectParams.project?.start_date,
        message: "Please select start date",
      },
      {
        field: projectParams.project?.sort_title,
        message: "Please enter sort title",
      },
      {
        field: projectParams.project?.status,
        message: "Please enter status",
      },
      {
        field: projectParams.project?.country,
        message: "Please enter country",
      },
      { field: projectParams.project?.city, message: "Please enter city" },
      { field: projectParams.project?.marker, message: "Please enter marker" },
      {
        field: projectParams.project?.workareas,
        message: "Please enter workareas",
      },
      {
        field: projectParams.project?.about_project,
        message: "Please enter about project",
      },
    ];

    for (const { field, message } of requiredFields) {
      if (!field) {
        toast.error(message);
        return false;
      }
    }

    return true;
  };

  const [loading, setLoading] = useState(false);

  const onSave = async () => {
    try {
      toast.dismiss();
      if (validateState()) {
        toast.loading("Updating Project MayBe Take Some Time...");
        setLoading(true);
        await updateProject(id, projectParams);
        setLoading(false);
        toast.dismiss();
        toast.success("Project update Successfully");
        dispatch(resetProjectParamsData());
        router.back();
      }
    } catch (error: any) {
      setLoading(false);
      toast.dismiss();
      const errors = extractErrors(error.response);
      toast.error(errors[0]);
    }
  };

  return (
    <Button
      size="sm"
      variant="default"
      disabled={loading}
      onClick={onSave}
      className="mr-5"
    >
      Update Project
    </Button>
  );
}

export default ProjectUpdateAction;
