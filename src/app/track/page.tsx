"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect } from "react";

function page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const projectId = searchParams.get("projectId");
  const orderId = searchParams.get("orderId");
  const treeId = searchParams.get("treeId");

  if (!projectId || !orderId || !treeId) {
    return (
      <div className="flex justify-center items-center w-full flex-col gap-10">
        <Image
          src="https://static.vecteezy.com/system/resources/thumbnails/009/380/432/small_2x/tree-stump-clipart-design-illustration-free-png.png"
          width={2000}
          alt=""
          height={2000}
          className="w-48"
        />
        <p className="text-xl font-bold">Invalid Tracking URL</p>
      </div>
    );
  }

  useEffect(() => {
    setTimeout(() => {
      const role = localStorage.getItem("role");
      if (role === "ADMIN") {
        router.replace(
          `/dashboard/planting/?projectId=${projectId}&orderId=${orderId}&treeId=${treeId}`
        );
      } else {
        router.replace(
          `/employee/planting/?projectId=${projectId}&orderId=${orderId}&treeId=${treeId}`
        );
      }
    }, 2000);
  }, []);

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
