"use client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Progress } from "@/components/ui/progress";
import { setPlantingData } from "@/redux/Slices/plantingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { extractErrors } from "@/request/actions";
import { requestOrdersWithProjects } from "@/request/worker/orders/treeorders/modifyTreeOrders";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MapView from "./MapView";

type ErrorType = string | null;

const Page: React.FC = () => {
  const [percent, setPercent] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType>(null);
  const plantingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error state on retry
      const projects = await requestOrdersWithProjects((progress: number) => {
        setPercent(progress);
      });
      dispatch(setPlantingData({ ordersList: projects }));
      setLoading(false);
    } catch (error: any) {
      const errors = extractErrors(error?.response);
      setError(errors[0] || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center flex-col gap-10 transition-opacity duration-700 ease-out">
        <Image
          src="/logo/main-logo.png"
          alt="logo"
          className="w-40 h-32 object-contain"
          width={400}
          height={200}
        />
        <LoadingSpinner style={{ width: "20px", height: "20px" }} />
        <div className="w-60 h-3">
          <Progress
            value={percent}
            className="h-2 transition-all duration-[800ms] ease-[cubic-bezier(0.4, 0.0, 0.2, 1)]"
            style={{ transitionProperty: "width" }}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center gap-6 bg-red-50">
        <Image
          src="/logo/error-logo.png"
          alt="Error icon"
          className="w-20 h-20 object-contain"
          width={80}
          height={80}
        />
        <h1 className="text-xl font-semibold text-red-600">
          Oops! Something went wrong.
        </h1>
        <p className="text-gray-700">{error}</p>
        <button
          onClick={loadProjects}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full bg-gray-50 flex justify-normal items-start opacity-0 transition-opacity duration-1000 ease-in-out"
      style={{ opacity: loading ? 0 : 1 }}
    >
      <MapView />
    </div>
  );
};

export default Page;
