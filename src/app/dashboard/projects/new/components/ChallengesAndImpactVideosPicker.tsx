import { Label } from "@/components/ui/label";
import { setProjectDataValue } from "@/redux/Slices/projectParamsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ImagePlus, Play, Video, X } from "lucide-react";
import React, { memo } from "react";

function ChallengesAndImpactVideosPicker() {
  const state = useAppSelector((state) => state.projectParamsSlice);
  const dispatch = useAppDispatch();
  return (
    <div className="mt-5">
      <Label>Challenges And Impact Videos</Label>
      <div className="flex justify-start items-start gap-5 mt-2">
        {state.project.challengesAndImpactDetailsVideosLinks?.map(
          (e, index) => (
            <div
              key={index}
              className="w-24  h-24 bg-green-50 rounded-lg shadow-md relative flex justify-center items-center"
            >
              <Play size={40} />
              <div
                onClick={() => {
                  dispatch(
                    setProjectDataValue({
                      key: "challengesAndImpactDetailsVideosLinks",
                      data: state.project.challengesAndImpactDetailsVideosLinks?.filter(
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

        {state.project.challengesAndImpactDetailsVideos?.map((e, index) => (
          <div
            key={index}
            className="w-24  h-24 bg-green-50 rounded-lg shadow-md relative flex justify-center items-center"
          >
            <Play size={40} />
            <div
              onClick={() => {
                dispatch(
                  setProjectDataValue({
                    key: "challengesAndImpactDetailsVideos",
                    data: state.project.challengesAndImpactDetailsVideos?.filter(
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
        <label className="w-24 h-24 bg-gray-50/60 rounded-lg cursor-pointer shadow-md relative flex justify-center items-center text-2xl">
          <Video size={40} />
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                const filesArray = Array.from(files).filter((file) => {
                  return state.project.challengesAndImpactDetailsVideos?.every(
                    (video) => video.name !== file?.name
                  );
                });

                // @ts-ignore
                dispatch(
                  setProjectDataValue({
                    key: "challengesAndImpactDetailsVideos",
                    data: [
                      ...(state.project.challengesAndImpactDetailsVideos || []),
                      ...filesArray,
                    ],
                  })
                );
                e.target.value = "";
                e.target.files = null;
              }
            }}
          />
        </label>
      </div>
    </div>
  );
}

export default memo(ChallengesAndImpactVideosPicker);
