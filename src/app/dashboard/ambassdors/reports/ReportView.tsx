import { MonthlyReportItem, Week } from "@/interfaces/monthlyReportItem";
import Link from "next/link";
import React from "react";

function ReportView({
  data,
  week,
  name,
}: {
  data: MonthlyReportItem;
  week: Week | null;
  name: string;
}) {
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
    <div>
      <h1 className="text-2xl text-left font-bold mb-10 mt-10">
        {genPageTitle()}
      </h1>
      <div className="">
        <p className="font-bold mb-2">Summary Of This Week</p>
        <p>{week?.summery}</p>
      </div>

      <h1 className="font-bold text-xl mt-10 mb-2">Events List</h1>
      <div className="w-full overflow-auto border max-h-[80vh] ">
        <table className="tblView table-fixed">
          <thead>
            <tr>
              <th>Sno</th>
              <th>Event Title</th>
              <th>Activates</th>
              <th>Outcomes</th>
              <th>Media (Image, Vid , Doc)</th>
            </tr>
          </thead>
          <tbody>
            {week?.events.map((e, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{e.title}</td>
                  <td>{e.activates}</td>
                  <td>{e.outcomes}</td>
                  <td>
                    <Link
                      className="text-main"
                      href={e.file.url}
                      target="_blank"
                    >
                      {e.file.file.filename}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h1 className="font-bold text-xl mt-10 mb-3">
        Challenges you Faced How How You solved it
      </h1>
      <div className="w-full overflow-auto border max-h-[80vh] ">
        <table className="tblView table-fixed">
          <thead>
            <tr>
              <th>Sno</th>
              <th>Challenges</th>
              <th>What You Did?</th>
              <th>Media (Image, Vid , Doc)</th>
            </tr>
          </thead>
          <tbody>
            {week?.challenges.map((e, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{e.title}</td>
                  <td>{e.whatYouDid}</td>
                  <td>
                    <Link
                      className="text-main"
                      href={e.file.url}
                      target="_blank"
                    >
                      {e.file.file.filename}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="">
        <p className="font-bold mb-2 mt-10">Plan For Next Week</p>
        <p>{week?.nextStep}</p>
      </div>
    </div>
  );
}

export default ReportView;
