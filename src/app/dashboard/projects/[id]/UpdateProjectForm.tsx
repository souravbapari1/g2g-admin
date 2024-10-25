"use client";
import {
  IProjectParams,
  projectDataType,
  setProjectParamsData,
} from "@/redux/Slices/projectParamsSlice";

import React, { useEffect, useState } from "react";
import BasicInfo from "../new/components/BasicInfo";
import { useAppDispatch } from "@/redux/store";
import { getProject } from "@/request/worker/project/manageProject";
import { genPbFiles } from "@/request/actions";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

function UpdateProjectForm({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const loadData = async () => {
    const project = await getProject(id);
    // set project data
    const formattedProjectData: IProjectParams["project"] = {
      name: project.name,
      sort_title: project.sort_title,
      about_project: project.about_project,
      address: project.address,
      allow: project.allow,
      challenges_and_impact_details: project.challenges_and_impact_details,
      city: project.city,
      country: project.country,
      email: project.email,
      main_interventions: project.main_interventions,
      marker: project.marker,
      number_of_target_unit: project.number_of_target_unit,
      omr_unit: project.omr_unit,
      phone: project.phone,
      start_date: project.start_date,
      top_project: project.top_project,
      unit_measurement: project.unit_measurement,
      status: project.status,
      reports: project.expand?.reports?.map((report) => report.id) || [],

      unit_types:
        project.expand?.unit_types?.map((unitType) => unitType.id) || [],
      website: project.website,
      workareas: project.workareas,
      challengesAndImpactDetailsImagesLinks:
        project.challenges_and_impact_details_images.map((image) => {
          return {
            name: image,
            url: genPbFiles(project, image),
          };
        }),
      challengesAndImpactDetailsVideosLinks:
        project.challenges_and_impact_details_videos.map((video) => {
          return {
            name: video,
            url: genPbFiles(project, video),
          };
        }),
      projectContentImagesLinks: project.project_images.map((image) => {
        return {
          name: image,
          url: genPbFiles(project, image),
        };
      }),
      projectContentVideosLinks: project.project_videos.map((video) => {
        return {
          name: video,
          url: genPbFiles(project, video),
        };
      }),
      location: project.location,
      operated_by:
        project.expand?.operated_by?.map((operator) => operator.id) || [],
      sdgs:
        project.expand?.sdgs?.map((sdg) => {
          return {
            name: sdg.name,
            description: sdg.description,
            data: sdg.data,
            sdg: sdg.sdg,
          };
        }) || [],
      type: project.type,
    };
    dispatch(
      setProjectParamsData({
        project: formattedProjectData,
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <BasicInfo />
      )}
    </>
  );
}

export default UpdateProjectForm;
