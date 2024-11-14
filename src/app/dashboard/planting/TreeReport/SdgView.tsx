import { ProjectItem } from "@/interfaces/project";
import { ProjectSDG, SDGITEM } from "@/interfaces/sdg";
import { genPbFiles } from "@/request/actions";
import Image from "next/image";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

function SdgsView({ data }: { data: ProjectSDG }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-5">
      <div className="flex justify-start items-center gap-5">
        <Image
          alt=""
          src={genPbFiles(data.expand?.sdg, data.expand?.sdg?.image)}
          width={120}
          height={120}
          className="w-12 h-12 object-cover"
        />

        <p className="text-sm font-bold mb-2">{data.name}</p>
      </div>
      <p className="text-xs  mt-3">{data.description}</p>
      <div
        className="flex justify-end items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <MdKeyboardArrowDown style={{ rotate: open ? "180deg" : "0deg" }} />
      </div>
      <div className="w-full bg-gray-50 mt-1">
        <div
          style={{
            background: `linear-gradient(to right, ${data.expand?.sdg?.main_color}, ${data?.expand?.sdg?.sub_color})`,
          }}
          className="w-full h-5 bg-main p-4 text-sm text-white flex justify-between items-center"
        >
          <p>Parameter</p>
          <p>Target</p>
        </div>

        {open &&
          data.data.map((e, i) => {
            return (
              <div
                className="w-full h-5  border-b border-white p-4 text-sm flex justify-between items-center"
                key={i}
              >
                <div className="flex justify-start items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{
                      background: `linear-gradient(to right, ${data?.expand?.sdg?.main_color}, ${data?.expand?.sdg?.sub_color})`,
                    }}
                  ></div>
                  <p>{e.name}</p>
                </div>
                <p>{e.value}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SdgsView;
