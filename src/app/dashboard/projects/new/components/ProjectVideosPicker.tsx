import { Label } from "@/components/ui/label";
import { setProjectDataValue } from "@/redux/Slices/projectParamsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ImagePlus, Play, Video, X } from "lucide-react";
import React, { memo } from "react";

function ProjectVideosPicker() {
  const state = useAppSelector((state) => state.projectParamsSlice);
  const dispatch = useAppDispatch();
  return (
    <div className="mt-5">
      <Label>Project Videos</Label>
      <div className="flex justify-start items-start gap-5 mt-2">
        {state.project.projectContentVideosLinks?.map((e, index) => (
          <div
            key={index}
            className="w-24  h-24 bg-green-50 rounded-lg shadow-md relative flex justify-center items-center"
          >
            <Play size={40} />
            <div
              onClick={() => {
                dispatch(
                  setProjectDataValue({
                    key: "projectContentVideosLinks",
                    data: state.project.projectContentVideosLinks?.filter(
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

        {state.project.projectContentVideos?.map((e, index) => (
          <div
            key={index}
            className="w-24  h-24 bg-green-50 rounded-lg shadow-md relative flex justify-center items-center"
          >
            <Play size={40} />
            <div
              onClick={() => {
                dispatch(
                  setProjectDataValue({
                    key: "projectContentVideos",
                    data: state.project.projectContentVideos?.filter(
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
                const existing = state.project.projectContentVideos || [];
                const filesArray = Array.from(files);

                // @ts-ignore
                dispatch(
                  setProjectDataValue({
                    key: "projectContentVideos",
                    data: [
                      ...(state.project.projectContentVideos || []),
                      ...filesArray.filter(
                        (file) =>
                          !existing.map((i) => i.name).includes(file.name)
                      ),
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

export default memo(ProjectVideosPicker);
