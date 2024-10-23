import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { IProjectParams } from "@/redux/Slices/projectParamsSlice";
import { genPbFiles } from "@/request/actions";
import { getProject } from "@/request/worker/project/manageProject";
import UpdateProjectForm from "./UpdateProjectForm";
import ProjectUpdateAction from "./ProjectUpdateAction";

export const revalidate = 0;
export default async function Page({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);
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

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 justify-between">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Update Project</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <ProjectUpdateAction id={params.id} />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 ">
          <UpdateProjectForm formattedProjectData={formattedProjectData} />
        </div>
      </SidebarInset>
    </>
  );
}
