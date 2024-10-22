"use client";

import MapBoxPickArea, {
  MapBoxPickAreaProps,
} from "@/components/mapbox/mapBoxPickArea";
import MapBoxPickMarker from "@/components/mapbox/mapBoxPickMarker";
const TextEditor = dynamic(() => import("@/components/text-editor"), {
  ssr: false,
});
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

import ProjectImagesPicker from "./ProjectImagesPicker";
import ProjectVideosPicker from "./ProjectVideosPicker";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  resetProjectParamsData,
  setProjectDataValue,
} from "@/redux/Slices/projectParamsSlice";
import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
import ChallengesAndImpactImagesPicker from "./ChallengesAndImpactImagesPicker";
import ChallengesAndImpactVideosPicker from "./ChallengesAndImpactVideosPicker";
import { useEffect, useState } from "react";
import { setTimeout } from "timers/promises";

function BasicInfo() {
  const {
    countryCityListGlobal,
    projectTypeListGlobal,
    sdgListGlobal,
    unitTypeListGlobal,
    usersListGlobal,
    reportsListGlobal,
  } = useGlobalDataSetContext();
  const [load, setload] = useState(false);
  const state = useAppSelector((e) => e.projectParamsSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetProjectParamsData());
  }, []);

  return (
    <div className="">
      <div className="grid md:grid-cols-2 gap-4 w-full">
        <div className="w-full">
          <Label>Project Name</Label>
          <Input
            className="mt-1"
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
            className="mt-1"
            value={state.project.sort_title}
            onChange={(e) =>
              dispatch(
                setProjectDataValue({ key: "sort_title", data: e.target.value })
              )
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-4">
        <div className="">
          <Label>Project Image</Label>
          <Input
            className="mt-1 block"
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
            }}
          >
            <SelectTrigger className="mt-1">
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
          <Label>Project Status</Label>
          <Select
            value={state.project.status}
            onValueChange={(e) => {
              dispatch(setProjectDataValue({ key: "status", data: e }));
            }}
          >
            <SelectTrigger className="mt-1">
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
            className="mt-1"
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
          <Label>SDG Objects</Label>
          <MultiSelect
            className="mt-1"
            value={state.project.sdgs}
            defaultValue={state.project.sdgs}
            options={sdgListGlobal.map((e) => {
              return { value: e.id, label: e.name };
            })}
            onValueChange={(e) => {
              dispatch(setProjectDataValue({ key: "sdgs", data: e }));
            }}
          />
        </div>
        <div className="">
          <Label>Type Of Unit</Label>
          <MultiSelect
            className="mt-1"
            defaultValue={state.project.unit_types}
            options={unitTypeListGlobal.map((e) => {
              return { value: e.id, label: e.name };
            })}
            value={state.project.unit_types}
            onValueChange={(e) => {
              dispatch(setProjectDataValue({ key: "unit_types", data: e }));
            }}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 mt-8 gap-2">
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
              <SelectTrigger>
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
              <SelectTrigger>
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
            <Label>Reporting</Label>
            <MultiSelect
              className="mt-1"
              value={state.project.reports}
              defaultValue={state.project.reports}
              options={reportsListGlobal.map((e) => {
                return { value: e.id, label: e.name };
              })}
              onValueChange={(e) => {
                dispatch(setProjectDataValue({ key: "reports", data: e }));
              }}
            />
          </div>
          <div className="">
            <Label>Operated By</Label>
            <MultiSelect
              className="mt-1"
              value={state.project.operated_by}
              defaultValue={state.project.operated_by}
              options={usersListGlobal.map((e) => {
                return { value: e.id, label: e.first_name + " " + e.last_name };
              })}
              onValueChange={(e) => {
                dispatch(setProjectDataValue({ key: "operated_by", data: e }));
              }}
            />
          </div>
          <div className="">
            <Label>Project Start Date</Label>
            <Input
              className="mt-1 block"
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
            <Label>Unit Measurement</Label>
            <Input
              className="mt-1 block"
              type="text"
              value={state.project.unit_measurement}
              onChange={(e) =>
                dispatch(
                  setProjectDataValue({
                    key: "unit_measurement",
                    data: e.target.value,
                  })
                )
              }
            />
          </div>
          <div className="">
            <Label>Number Of Target Unit</Label>
            <Input
              className="mt-1 block"
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
            <Label>ORM/Unit</Label>
            <Input
              className="mt-1 block"
              type="text"
              value={state.project.omr_unit}
              onChange={(e) =>
                dispatch(
                  setProjectDataValue({ key: "omr_unit", data: e.target.value })
                )
              }
            />
          </div>
        </div>
      </div>
      <div className=" mt-10">
        <MapBoxPickArea
          flyTo={state.project.marker?.position}
          defaultAreaData={state.project.workareas}
          onDataChange={(e) => {
            dispatch(setProjectDataValue({ key: "workareas", data: e }));
          }}
        />
      </div>

      <div className="mt-10">
        <Label>Project About Info</Label>
        <TextEditor
          className="mt-2"
          defaultContent={state.project.about_project}
          onChange={(w) => {
            dispatch(setProjectDataValue({ key: "about_project", data: w }));
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
      <div className="mt-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
          <div className="">
            <Label>Website</Label>
            <Input
              className="mt-1 block"
              type="text"
              value={state.project.website}
              onChange={(e) =>
                dispatch(
                  setProjectDataValue({ key: "website", data: e.target.value })
                )
              }
            />
          </div>
          <div className="">
            <Label>Address</Label>
            <Input
              className="mt-1 block"
              type="text"
              value={state.project.address}
              onChange={(e) =>
                dispatch(
                  setProjectDataValue({ key: "address", data: e.target.value })
                )
              }
            />
          </div>
          <div className="">
            <Label>Email ID</Label>
            <Input
              className="mt-1 block"
              type="text"
              value={state.project.email}
              onChange={(e) =>
                dispatch(
                  setProjectDataValue({ key: "email", data: e.target.value })
                )
              }
            />
          </div>
          <div className="">
            <Label>Phone NO</Label>
            <Input
              className="mt-1 block"
              type="text"
              value={state.project.phone}
              onChange={(e) =>
                dispatch(
                  setProjectDataValue({ key: "phone", data: e.target.value })
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicInfo;
