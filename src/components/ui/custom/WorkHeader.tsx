import React from "react";

function WorkHeader({
  children,
  title,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full p-2 min-h-14 px-10 border-b bg-gray-50 sticky top-0 left-0 z-40 flex justify-between items-center">
      <p className="font-mono flex justify-start items-center">{title}</p>
      <div className="flex justify-end items-center flex-row gap-3">
        {children}
      </div>
    </div>
  );
}

export default WorkHeader;
