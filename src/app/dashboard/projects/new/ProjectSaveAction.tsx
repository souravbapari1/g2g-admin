"use client";
import { Button } from "@/components/ui/button";
import { resetProjectParamsData } from "@/redux/Slices/projectParamsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { extractErrors } from "@/request/actions";
import { createNewProject } from "@/request/worker/project/manageProject";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function ProjectSaveAction() {
  const projectParams = useAppSelector((state) => state.projectParamsSlice);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const validateState = () => {
    const { project } = projectParams;
    toast.dismiss();
    if (!project?.name) {
      toast.error("Please enter project name");
      return false;
    }

    if (!project?.type) {
      toast.error("Please select project type");
      return false;
    }

    if (!project?.main_interventions?.length) {
      toast.error("Please select main interventions");
      return false;
    }

    if (!project?.unit_measurement) {
      toast.error("Please select Unit of Measurement");
      return false;
    }

    if (!project?.sdgs?.length) {
      toast.error("Please select sdgs");
      return false;
    }

    if (!project?.operated_by?.length) {
      toast.error("Please select operated by");
      return false;
    }

    if (!project?.location?.length) {
      toast.error("Please select location");
      return false;
    }

    if (!project?.start_date) {
      toast.error("Please select start date");
      return false;
    }

    if (!project?.sort_title) {
      toast.error("Please enter sort title");
      return false;
    }

    if (!project?.projectImage) {
      console.log(project?.projectImage);

      toast.error("Please enter project Image");
      return false;
    }

    if (!project?.country) {
      toast.error("Please enter country");
      return false;
    }

    if (!project?.city) {
      toast.error("Please enter city");
      return false;
    }

    if (!project?.location) {
      toast.error("Please enter location");
      return false;
    }

    if (!project?.number_of_target_unit) {
      toast.error("Please enter number of target unit");
      return false;
    }

    if (!project?.status) {
      toast.error("Please enter status");
      return false;
    }

    if (!project?.marker) {
      toast.error("Please enter marker");
      return false;
    }

    if (!project?.workareas) {
      toast.error("Please enter workareas");
      return false;
    }

    if (!project?.about_project) {
      toast.error("Please enter about project");
      return false;
    }
    return true;
  };
  const [loading, setLoading] = useState(false);

  const onSave = async () => {
    try {
      toast.dismiss();
      if (validateState()) {
        toast.loading("Saving Project MayBe Take Some Time...");
        setLoading(true);
        await createNewProject(projectParams);
        setLoading(false);
        toast.dismiss();
        toast.success("Project Saved Successfully");
        dispatch(resetProjectParamsData());
        router.replace("/dashboard/projects");
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
      Save Project
    </Button>
  );
}

export default ProjectSaveAction;
