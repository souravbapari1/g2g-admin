"use client";
import { Label } from "@/components/ui/label";
import { setProjectDataValue } from "@/redux/Slices/projectParamsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import React, { memo } from "react";

function ChallengesAndImpactImagesPicker() {
  const state = useAppSelector((state) => state.projectParamsSlice);
  const dispatch = useAppDispatch();
  return (
    <div className="mt-5">
      <Label>Challenges And Impact Images</Label>
      <div className="flex justify-start items-start gap-5 mt-2 flex-wrap select-none">
        {state.project.challengesAndImpactDetailsImagesLinks?.map(
          (e, index) => (
            <div className="relative">
              <Image
                alt="image"
                src={e.url}
                width={100}
                height={100}
                key={index}
                className="w-24 h-24 bg-gray-300 object-cover rounded-lg shadow-md relative"
              />
              <div
                onClick={() => {
                  dispatch(
                    setProjectDataValue({
                      key: "challengesAndImpactDetailsImagesLinks",
                      data: state.project.challengesAndImpactDetailsImagesLinks?.filter(
                        (i) => i !== e
                      ),
                    })
                  );
                }}
                className="absolute top-1 right-1 cursor-pointer shadow-sm border border-white bg-red-600 rounded-full flex justify-center items-center p-[2px]"
              >
                <X size={8} color="white" />
              </div>
            </div>
          )
        )}
        {state.project.challengesAndImpactDetailsImages?.map((e, index) => (
          <div className="relative">
            <Image
              alt="image"
              src={URL.createObjectURL(e)}
              width={100}
              height={100}
              key={index}
              className="w-24 h-24 bg-gray-300 object-cover rounded-lg shadow-md relative"
            />
            <div
              onClick={() => {
                dispatch(
                  setProjectDataValue({
                    key: "challengesAndImpactDetailsImages",
                    data: state.project.challengesAndImpactDetailsImages?.filter(
                      (i) => i !== e
                    ),
                  })
                );
              }}
              className="absolute top-1 right-1 cursor-pointer shadow-sm border border-white bg-red-600 rounded-full flex justify-center items-center p-[2px]"
            >
              <X size={8} color="white" />
            </div>
          </div>
        ))}
        <label className="w-24 h-24 bg-gray-50 rounded-lg cursor-pointer shadow-md relative flex justify-center items-center text-2xl">
          <ImagePlus size={40} />
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                const filesArray = Array.from(files).filter((file) => {
                  return state.project.challengesAndImpactDetailsImages?.every(
                    (image) => image.name !== file.name
                  );
                });
                dispatch(
                  setProjectDataValue({
                    key: "challengesAndImpactDetailsImages",
                    data: [
                      ...(state.project.challengesAndImpactDetailsImages || []),
                      ...filesArray,
                    ],
                  })
                );
                e.target.files = null;
                e.target.value = "";
              }
            }}
            disabled={false}
          />
        </label>
      </div>
    </div>
  );
}

export default memo(ChallengesAndImpactImagesPicker);
