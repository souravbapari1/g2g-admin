"use client ";

import Image from "next/image";

function page() {
  return (
    <div className="flex justify-center items-center w-full">
      <Image
        src="https://media.tenor.com/SGWIVq_K5tEAAAAi/cute-after-effects.gif"
        width={2000}
        alt=""
        height={2000}
        className="w-48"
      />
    </div>
  );
}

export default page;
