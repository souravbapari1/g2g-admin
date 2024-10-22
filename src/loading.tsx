import React from "react";
import { LoadingSpinner } from "./components/ui/loading-spinner";

function loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <LoadingSpinner />
    </div>
  );
}

export default loading;
