import Image from "next/image";
import React from "react";

function ChallengesAndSDG() {
  return (
    <div className="p-5">
      <div className="flex justify-center items-center select-none gap-5 mt-4">
        <h1 className="text-xl font-bold text-primary underline cursor-pointer">
          Challenges
        </h1>
        <h1 className="text-xl font-bold cursor-pointer">SDGs</h1>
      </div>
      <div className="flex flex-wrap justify-start mt-5 items-center gap-5">
        {Array(13)
          .fill(0)
          .map((item, index) => {
            return (
              <div className="w-28  flex flex-col justify-center cursor-pointer items-center gap-2 p-2 bg-primary/5 rounded-md">
                <Image
                  src="https://knowsdgs.jrc.ec.europa.eu/themes/sdgs/assets/img/sdg3.png"
                  alt=""
                  width={1000}
                  height={1000}
                  className="w-full h-24 object-cover rounded"
                />
                <p className="font-bold text-xs">
                  SDG 3: Good Health and Well-being
                </p>
              </div>
            );
          })}
      </div>
      <div className="mt-5">
        <h2 className="text-lg font-bold mb-2">
          SDG 3 - Good Health and Well-being
        </h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-5">
        {Array(5)
          .fill(0)
          .map((item, index) => {
            return (
              <div className="border p-3 flex gap-3 flex-col">
                <div className="flex ">
                  <div className="w-5 h-5 bg-red-500 rounded-full"></div>
                  <p className="text-gray-900 text-medium ml-2 font-semibold">
                    P Name 1
                  </p>
                </div>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic
                  quo dolore itaque vitae facere placeat ducimus sit veniam
                  dolorum, repudiandae, cupiditate cumque exercitationem aut
                  ipsa deleniti, omnis rem totam harum!
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ChallengesAndSDG;
