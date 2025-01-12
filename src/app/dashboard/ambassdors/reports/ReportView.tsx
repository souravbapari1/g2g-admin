import { MonthlyReportItem, Week } from "@/interfaces/monthlyReportItem";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import NoReport from "./NoReport";

function ReportView({
  data,
  week,
  name,
}: {
  data: MonthlyReportItem;
  week: Week | null;
  name: string;
}) {
  if (!week) {
    return (
      <NoReport
        month={data.month}
        week={name}
        year={data.year}
        user={data.user}
      />
    );
  }

  const genPageTitle = () => {
    switch (name.toUpperCase()) {
      case "WEEK1":
        return `Week 1 ( 1st - 7th of ${data.month}, ${data.year}) Reporting`;
      case "WEEK2":
        return `Week 2 ( 8th - 14th of ${data.month}, ${data.year}) Reporting`;
      case "WEEK3":
        return `Week 3 ( 15th - 21st of ${data.month}, ${data.year}) Reporting`;
      case "WEEK4":
        return `Week 4 ( 22nd - 28th of ${data.month}, ${data.year}) Reporting`;
      default:
        return "Unknown Report";
    }
  };

  return (
    <div className="px-8">
      <h1 className="text-2xl text-left font-bold mb-10 mt-10">
        {genPageTitle()}
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <p className="font-bold mb-2">Summary Of This Week</p>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: week?.summery || "" }}
        />
      </div>

      <h1 className="font-bold text-xl mt-10 mb-2">Events List</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 overflow-hidden">
        {week?.events.map((e, i) => (
          <div
            key={i}
            className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-lg transition duration-300"
          >
            <p
              className="font-bold text-lg"
              dangerouslySetInnerHTML={{ __html: `${i + 1}. ${e.title}` }}
            />
            <div className="mt-2">
              <strong>Activates:</strong>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: e.activates || "" }}
              />
            </div>
            <div className="mt-2">
              <strong>Outcomes:</strong>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: e.outcomes || "" }}
              />
            </div>
            <div className="mt-3">
              <strong>Media:</strong>
              <div className="flex flex-col gap-2">
                {e.file?.map((file) => (
                  <Link
                    className="text-main underline text-ellipsis"
                    href={file.url}
                    key={file.id}
                    target="_blank"
                  >
                    {file.file.filename}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <h1 className="font-bold text-xl mt-10 mb-3">
        Challenges You Faced and How You Solved It
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {week?.challenges.map((e, i) => (
          <div
            key={i}
            className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-lg transition duration-300"
          >
            <p
              className="font-bold text-lg"
              dangerouslySetInnerHTML={{ __html: `${i + 1}. ${e.title}` }}
            />
            <div className="mt-2">
              <strong>What You Did:</strong>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: e.whatYouDid || "" }}
              />
            </div>
            <div className="mt-3">
              <strong>Media:</strong>
              <div className="flex flex-col gap-2">
                {e.file?.map((file) => (
                  <Link
                    className="text-main underline text-ellipsis"
                    href={file.url}
                    key={file.id}
                    target="_blank"
                  >
                    {file.file.filename}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-10">
        <p className="font-bold mb-2">Plan For Next Week</p>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: week?.nextStep || "" }}
        />
      </div>
    </div>
  );
}

export default ReportView;
