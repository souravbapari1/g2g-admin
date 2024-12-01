"use client";

import MapBoxPickArea from "@/components/mapbox/mapBoxPickArea";
import MapBoxPickMarker from "@/components/mapbox/mapBoxPickMarker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const TextEditor = dynamic(() => import("@/components/text-editor"), {
  ssr: false,
});

import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
import {
  resetProjectParamsData,
  setProjectDataValue,
} from "@/redux/Slices/projectParamsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import ChallengesAndImpactImagesPicker from "./ChallengesAndImpactImagesPicker";
import ChallengesAndImpactVideosPicker from "./ChallengesAndImpactVideosPicker";
import ProjectImagesPicker from "./ProjectImagesPicker";
import ProjectVideosPicker from "./ProjectVideosPicker";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PorjectReports from "./ProjectReports";
import SdgManage from "./SdgManage";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

function BasicInfo() {
  const {
    countryCityListGlobal,
    projectTypeListGlobal,
    unitTypeListGlobal,
    usersListGlobal,
    accStandardsListGlobal,
    measurementListGlobal,
  } = useGlobalDataSetContext();

  const state = useAppSelector((e) => e.projectParamsSlice);
  const dispatch = useAppDispatch();

  return (
    <div className="">
      <Card className="mb-8 rounded-none shadow-none bg-gray-100">
        <CardHeader>
          <CardTitle className=" text-md text-gray-950">Project Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-start items-center mb-6 gap-10">
            <div className="flex justify-start items-center gap-4">
              <Switch
                checked={state.project.allow}
                onClick={() => {
                  dispatch(
                    setProjectDataValue({
                      key: "allow",
                      data: !state.project.allow,
                    })
                  );
                }}
              />
              <p>Public</p>
            </div>
            <div className="flex justify-start items-center gap-4">
              <Switch
                checked={state.project.top_project}
                onClick={() => {
                  dispatch(
                    setProjectDataValue({
                      key: "top_project",
                      data: !state.project.top_project,
                    })
                  );
                }}
              />
              <p>Mark Top Project</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2  gap-4 w-full">
            <div className="w-full">
              <Label>Project Name</Label>
              <Input
                className="mt-1 rounded-none"
                value={state.project.name}
                onChange={(e) =>
                  dispatch(
                    setProjectDataValue({ key: "name", data: e.target.value })
                  )
                }
              />
            </div>
            <div className="w-full">
              <Label>Sort Title</Label>
              <Input
                className="mt-1 rounded-none"
                value={state.project.sort_title}
                onChange={(e) =>
                  dispatch(
                    setProjectDataValue({
                      key: "sort_title",
                      data: e.target.value,
                    })
                  )
                }
              />
            </div>
          </div>
          <div className="grid md:grid-cols-5 gap-5 mt-4">
            <div className="">
              <Label>
                Project Prefix{" "}
                <small className="text-blue-700">(internal use)</small>
              </Label>
              <Select
                value={state.project.project_prefix}
                defaultValue={state.project.project_prefix}
                onValueChange={(e) =>
                  dispatch(
                    setProjectDataValue({ key: "project_prefix", data: e })
                  )
                }
              >
                <SelectTrigger className="w-full mt-1 rounded-none">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tree">Tree Project</SelectItem>
                  <SelectItem value="others">Others Project</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="">
              <Label>Project Image</Label>
              <Input
                className="mt-1 block rounded-none"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    dispatch(
                      setProjectDataValue({
                        key: "projectImage",
                        data: e.target.files[0],
                      })
                    );
                  }
                }}
              />
            </div>
            <div className="">
              <Label>Project Type</Label>

              <Select
                value={state.project.type}
                onValueChange={(e) => {
                  dispatch(setProjectDataValue({ key: "type", data: e }));
                  dispatch(
                    setProjectDataValue({
                      key: "unit_measurement",
                      data: projectTypeListGlobal.find((i) => i.id === e)
                        ?.unit_measurement,
                    })
                  );
                  dispatch(
                    setProjectDataValue({
                      key: "main_interventions",
                      data: [],
                    })
                  );
                  dispatch(
                    setProjectDataValue({
                      key: "unit_types",
                      data: [],
                    })
                  );
                }}
              >
                <SelectTrigger className="mt-1 rounded-none">
                  <SelectValue placeholder={state.project.type} />
                </SelectTrigger>
                <SelectContent>
                  {projectTypeListGlobal.map((e) => {
                    return <SelectItem value={e.id}>{e.name}</SelectItem>;
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="">
              <Label>Accredation Standards</Label>

              <Select
                value={state.project.accredation_standars}
                onValueChange={(e) => {
                  dispatch(
                    setProjectDataValue({
                      key: "accredation_standars",
                      data: e,
                    })
                  );
                }}
              >
                <SelectTrigger className="mt-1 rounded-none">
                  <SelectValue
                    placeholder={state.project.accredation_standars}
                  />
                </SelectTrigger>
                <SelectContent>
                  {accStandardsListGlobal.map((e) => {
                    return <SelectItem value={e.id}>{e.title}</SelectItem>;
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="">
              <Label>Project Status</Label>
              <Select
                value={state.project.status}
                onValueChange={(e) => {
                  dispatch(setProjectDataValue({ key: "status", data: e }));
                }}
              >
                <SelectTrigger className="mt-1 rounded-none">
                  <SelectValue placeholder={state.project.status} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="complete">Complete</SelectItem>
                  <SelectItem value="cancel">Cancel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div
            className="grid lg:grid-cols-3 mt-4 md:grid-cols-2 gap-5"
            id="interventions"
            key="interventions"
          >
            <div className="">
              <Label>Main Interventions</Label>
              <MultiSelect
                className="mt-1 bg-white rounded-none"
                disabled={!state.project.type}
                value={state.project.main_interventions}
                defaultValue={state.project.main_interventions}
                options={
                  projectTypeListGlobal
                    .find((e) => e.id === state.project.type)
                    ?.parameters.map((e) => {
                      return { label: e, value: e };
                    }) || []
                }
                onValueChange={(e) => {
                  dispatch(
                    setProjectDataValue({ key: "main_interventions", data: e })
                  );
                }}
              />
            </div>
            <div className="">
              <Label>Report</Label>
              <Input
                type="file"
                className="rounded-none"
                onChange={(e) => {
                  if (e.target.files) {
                    dispatch(
                      setProjectDataValue({
                        key: "report",
                        data: e.target.files[0],
                      })
                    );
                  }
                }}
              />
            </div>
            <div className="">
              <Label>Type Of Unit</Label>
              <MultiSelect
                className="mt-1 bg-white rounded-none"
                defaultValue={state.project.unit_types}
                disabled={!state.project.type}
                options={unitTypeListGlobal
                  .filter((e) => e.project_type.includes(state.project.type))
                  .filter((e) => e.prefix === state.project.project_prefix)
                  .map((e) => {
                    return { value: e.id, label: e.name };
                  })}
                value={state.project.unit_types}
                onValueChange={(e) => {
                  dispatch(setProjectDataValue({ key: "unit_types", data: e }));
                }}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-5 mt-4">
            <div className="">
              <Label>Number Of Target Unit</Label>
              <Input
                className="mt-1 block rounded-none"
                type="text"
                value={state.project.number_of_target_unit}
                onChange={(e) =>
                  dispatch(
                    setProjectDataValue({
                      key: "number_of_target_unit",
                      data: e.target.value,
                    })
                  )
                }
              />
            </div>

            <div className="">
              <Label>Impact Per Unit</Label>
              <Input
                className="mt-1 block rounded-none"
                type="text"
                value={state.project.number_of_target_unit}
                onChange={(e) =>
                  dispatch(
                    setProjectDataValue({
                      key: "number_of_target_unit",
                      data: e.target.value,
                    })
                  )
                }
              />
            </div>

            <div className="">
              <Label>Unit Of Measurement</Label>
              <Select
                value={state.project.unit_measurement}
                onValueChange={(e) =>
                  dispatch(
                    setProjectDataValue({
                      key: "unit_measurement",
                      data: e,
                    })
                  )
                }
              >
                <SelectTrigger className="w-full rounded-none mt-1">
                  <SelectValue placeholder={state.project.unit_measurement} />
                </SelectTrigger>
                <SelectContent>
                  {measurementListGlobal.map((e) => (
                    <SelectItem key={e.id} value={e.name}>
                      {e.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="">
              <Label>ORM/Unit</Label>
              <Input
                className="mt-1 block rounded-none"
                type="text"
                value={state.project.omr_unit}
                onChange={(e) =>
                  dispatch(
                    setProjectDataValue({
                      key: "omr_unit",
                      data: e.target.value,
                    })
                  )
                }
              />
            </div>
          </div>

          <div className="grid md:col-span-4 mt-4">
            <Label>Comment</Label>
            <Textarea className="mt-1 bg-white rounded-none" />
          </div>
        </CardContent>
      </Card>
      <SdgManage />
      <PorjectReports />
      <h1 className="font-bold text-2xl text-gray-950 mt-10 ml-5">
        Location and Area
      </h1>
      <Card className="mt-4 rounded-none bg-gray-100 shadow-none">
        <CardContent>
          <div className="grid lg:grid-cols-2  gap-2">
            <MapBoxPickMarker
              markerData={state.project.marker}
              onPick={(e) => {
                dispatch(
                  setProjectDataValue({
                    key: "location",
                    data: e.position.lng + "," + e.position.lat,
                  })
                );
                dispatch(setProjectDataValue({ key: "marker", data: e }));
              }}
            />
            <div className="mt-7  flex flex-col gap-4">
              <div className="">
                <Label>Country</Label>
                <Select
                  value={state.project.country}
                  onValueChange={(e) => {
                    dispatch(setProjectDataValue({ key: "country", data: e }));
                  }}
                >
                  <SelectTrigger className="rounded-none">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCityListGlobal.map((e) => {
                      return (
                        <SelectItem key={e.country} value={e.country}>
                          {e.country}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="">
                <Label>City</Label>
                <Select
                  value={state.project.city}
                  onValueChange={(e) => {
                    dispatch(setProjectDataValue({ key: "city", data: e }));
                  }}
                >
                  <SelectTrigger className="bg-white rounded-none">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCityListGlobal
                      .find((e) => e.country === state.project.country)
                      ?.cities.map((e) => {
                        return (
                          <SelectItem value={e} key={e}>
                            {e}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
              </div>

              <div className="">
                <Label>Operated By</Label>
                <MultiSelect
                  className="mt-1 bg-white rounded-none"
                  value={state.project.operated_by}
                  defaultValue={state.project.operated_by}
                  options={usersListGlobal.map((e) => {
                    return {
                      value: e.id,
                      label: e.first_name + " " + e.last_name,
                    };
                  })}
                  onValueChange={(e) => {
                    dispatch(
                      setProjectDataValue({ key: "operated_by", data: e })
                    );
                  }}
                />
              </div>

              <div className="">
                <Label>Assigned By</Label>
                <MultiSelect
                  className="mt-1 bg-white rounded-none"
                  value={state.project.assigned_by}
                  defaultValue={state.project.assigned_by}
                  options={usersListGlobal.map((e) => {
                    return {
                      value: e.id,
                      label: e.first_name + " " + e.last_name,
                    };
                  })}
                  onValueChange={(e) => {
                    dispatch(
                      setProjectDataValue({ key: "assigned_by", data: e })
                    );
                  }}
                />
              </div>

              <div className="">
                <Label>Project Start Date</Label>
                <Input
                  className="mt-1 block rounded-none"
                  type="date"
                  value={state.project.start_date}
                  onChange={(e) =>
                    dispatch(
                      setProjectDataValue({
                        key: "start_date",
                        data: e.target.value,
                      })
                    )
                  }
                />
              </div>

              <div className="">
                <Label>Project End Date</Label>
                <Input
                  className="mt-1 block rounded-none"
                  type="date"
                  value={state.project.end_date}
                  onChange={(e) =>
                    dispatch(
                      setProjectDataValue({
                        key: "end_date",
                        data: e.target.value,
                      })
                    )
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="">
        <MapBoxPickArea
          flyTo={state.project.marker?.position}
          defaultAreaData={state.project.workareas}
          onDataChange={(e) => {
            dispatch(setProjectDataValue({ key: "workareas", data: e }));
          }}
        />
      </div>

      <CardTitle className="font-bold text-2xl text-gray-950 mt-10 ml-5">
        Project Details
      </CardTitle>
      <Card className="mt-5 rounded-none bg-gray-100 ">
        <CardContent>
          <div className="mt-5">
            <Label>Project About Info</Label>
            <TextEditor
              className="mt-2"
              defaultContent={state.project.about_project}
              onChange={(w) => {
                dispatch(
                  setProjectDataValue({ key: "about_project", data: w })
                );
              }}
            />
          </div>
          <ProjectImagesPicker />
          <ProjectVideosPicker />

          <div className="mt-10">
            <Label>Challenges And Impact Details</Label>
            <TextEditor
              className="mt-3"
              defaultContent={state.project.challenges_and_impact_details}
              onChange={(w) => {
                dispatch(
                  setProjectDataValue({
                    key: "challenges_and_impact_details",
                    data: w,
                  })
                );
              }}
            />
          </div>
          <ChallengesAndImpactImagesPicker />
          <ChallengesAndImpactVideosPicker />
        </CardContent>
      </Card>

      <CardTitle className="font-bold text-2xl text-gray-950 mt-10">
        Contact Details
      </CardTitle>
      <Card className=" mt-5 shadow-none rounded-none bg-gray-100">
        <CardContent>
          <div className="pt-6 ">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
              <div className="">
                <Label>Website</Label>
                <Input
                  className="mt-1 block rounded-none"
                  type="text"
                  value={state.project.website}
                  onChange={(e) =>
                    dispatch(
                      setProjectDataValue({
                        key: "website",
                        data: e.target.value,
                      })
                    )
                  }
                />
              </div>
              <div className="">
                <Label>Address</Label>
                <Input
                  className="mt-1 block rounded-none"
                  type="text"
                  value={state.project.address}
                  onChange={(e) =>
                    dispatch(
                      setProjectDataValue({
                        key: "address",
                        data: e.target.value,
                      })
                    )
                  }
                />
              </div>
              <div className="">
                <Label>Email ID</Label>
                <Input
                  className="mt-1 block rounded-none"
                  type="text"
                  value={state.project.email}
                  onChange={(e) =>
                    dispatch(
                      setProjectDataValue({
                        key: "email",
                        data: e.target.value,
                      })
                    )
                  }
                />
              </div>
              <div className="">
                <Label>Phone NO</Label>
                <Input
                  className="mt-1 block rounded-none"
                  type="text"
                  value={state.project.phone}
                  onChange={(e) =>
                    dispatch(
                      setProjectDataValue({
                        key: "phone",
                        data: e.target.value,
                      })
                    )
                  }
                />
              </div>
              <div className="">
                <Label>Linkedin</Label>
                <Input
                  className="mt-1 block rounded-none"
                  type="text"
                  value={state.project.linkedin}
                  onChange={(e) =>
                    dispatch(
                      setProjectDataValue({
                        key: "linkedin",
                        data: e.target.value,
                      })
                    )
                  }
                />
              </div>
              <div className="">
                <Label>Telegram</Label>
                <Input
                  className="mt-1 block rounded-none"
                  type="text"
                  value={state.project.telegram}
                  onChange={(e) =>
                    dispatch(
                      setProjectDataValue({
                        key: "telegram",
                        data: e.target.value,
                      })
                    )
                  }
                />
              </div>
              <div className="">
                <Label>X (Twitter)</Label>
                <Input
                  className="mt-1 block rounded-none"
                  type="text"
                  value={state.project.x}
                  onChange={(e) =>
                    dispatch(
                      setProjectDataValue({ key: "x", data: e.target.value })
                    )
                  }
                />
              </div>
              <div className="">
                <Label>Facebook</Label>
                <Input
                  className="mt-1 block rounded-none"
                  type="text"
                  value={state.project.facebook}
                  onChange={(e) =>
                    dispatch(
                      setProjectDataValue({
                        key: "facebook",
                        data: e.target.value,
                      })
                    )
                  }
                />
              </div>
              <div className="md:col-span-4">
                <Label>Profile (PDF)</Label>
                <Input
                  className="mt-1 block rounded-none"
                  type="text"
                  value={state.project.profilePdf}
                  onChange={(e) =>
                    dispatch(
                      setProjectDataValue({
                        key: "profilePdf",
                        data: e.target.value,
                      })
                    )
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="h-20"></div>
    </div>
  );
}

export default BasicInfo;
