"use client";
import React from "react";

import { getMyPrograms } from "./actions";
import { MyProgramsList } from "./MyProgramsList";
import { useQuery } from "react-query";

function MyProgramsListView({ id }: { id: string }) {
  const data = useQuery({
    queryKey: ["myPrograms"],
    queryFn: async () => await getMyPrograms(id),
  });

  return (
    <div className="">
      <h1 className="mb-10">Track and manage your Programs here.</h1>
      <MyProgramsList data={data.data} />
    </div>
  );
}

export default MyProgramsListView;
