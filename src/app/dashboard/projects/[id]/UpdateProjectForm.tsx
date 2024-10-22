"use client";
import {
  projectDataType,
  setProjectParamsData,
} from "@/redux/Slices/projectParamsSlice";

import React, { useEffect } from "react";
import BasicInfo from "../new/components/BasicInfo";
import { useAppDispatch } from "@/redux/store";

function UpdateProjectForm({
  formattedProjectData,
}: {
  formattedProjectData: projectDataType;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setProjectParamsData({
        project: formattedProjectData,
      })
    );
  }, [formattedProjectData]);

  return <BasicInfo />;
}

export default UpdateProjectForm;
