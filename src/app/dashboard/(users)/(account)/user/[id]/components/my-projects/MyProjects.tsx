"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { getMyProjects } from "./function";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { genPbFiles } from "@/request/actions";
import { useQuery } from "react-query";

function MyProjectsList({ id }: { id: string }) {
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const filterQuery = () => {
    const conditions: string[] = [];
    if (filter === "all") {
      // No condition needed for "all"
    } else if (filter === "tree") {
      conditions.push("project_prefix='tree'");
    } else if (filter === "others") {
      conditions.push("project_prefix!='tree'");
    }
    conditions.push(`operated_by~'${id}'`);
    return conditions.length > 0 ? `(${conditions.join(" && ")})` : "";
  };
  const { data, isLoading } = useQuery({
    queryKey: ["MY_PROPJECTS", page, filter],
    queryFn: () => getMyProjects(page, filterQuery()),
  });

  return (
    <div>
      <Tabs
        defaultValue={filter}
        onValueChange={setFilter}
        className="w-full mt-10"
      >
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="tree">Tree Projects</TabsTrigger>
          <TabsTrigger value="others">Others Projects</TabsTrigger>
        </TabsList>
      </Tabs>
      <br />

      <>
        <Table className="border text-nowrap">
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead className="border-r text-center text-nowrap p-4 ">
                ID
              </TableHead>
              <TableHead className="border-r text-center text-nowrap p-4 ">
                Project Name
              </TableHead>
              <TableHead className="border-r text-center text-nowrap p-4 ">
                Project Type
              </TableHead>
              <TableHead className="border-r text-center text-nowrap p-4 ">
                Interventions
              </TableHead>
              <TableHead className="border-r text-center text-nowrap p-4 ">
                Country/City
              </TableHead>
              <TableHead className="border-r text-center text-nowrap p-4 ">
                Start Date
              </TableHead>
              <TableHead className="border-r text-center text-nowrap p-4 ">
                Last Update Date
              </TableHead>
              <TableHead className="border-r text-center text-nowrap p-4 ">
                Status
              </TableHead>
              <TableHead className="border-r text-center text-nowrap p-4 ">
                Amount
              </TableHead>
              <TableHead className="border-r text-center text-nowrap p-4 ">
                Unit Type
              </TableHead>
              <TableHead className="border-r text-center text-nowrap p-4 ">
                Registration Doc
              </TableHead>
              <TableHead className="text-center">
                Auditing and Reviewing Reports
              </TableHead>
              <TableHead className="text-center">
                Verification and Validation Reports
              </TableHead>
              <TableHead className="text-center">Other Doc</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.items.map((e, i) => {
              return (
                <TableRow key={e.id}>
                  <TableCell className="border-r text-center text-nowrap p-4 ">
                    {i + 1}
                  </TableCell>
                  <TableCell className="border-r text-left text-nowrap p-4 ">
                    {e.name}
                  </TableCell>
                  <TableCell className="border-r text-center text-nowrap p-4 ">
                    {e.expand?.type?.name}
                  </TableCell>
                  <TableCell className="border-r text-left text-nowrap p-4 ">
                    {e.main_interventions.map((e) => e).join(", ")}
                  </TableCell>
                  <TableCell className="border-r text-center text-nowrap p-4 ">
                    {e.country}/ {e.city}
                  </TableCell>
                  <TableCell className="border-r text-center text-nowrap p-4 ">
                    {e.start_date}
                  </TableCell>
                  <TableCell className="border-r text-center text-nowrap p-4 ">
                    {e.end_date}
                  </TableCell>
                  <TableCell className="border-r text-center text-nowrap p-4  uppercase">
                    {e.status}
                  </TableCell>
                  <TableCell className="border-r text-center text-nowrap p-4 ">
                    {e.omr_unit} OMR
                  </TableCell>
                  <TableCell className="border-r text-center text-nowrap p-4 ">
                    {e.expand?.unit_types?.map((e) => e.name).join(", ")}
                  </TableCell>
                  <TableCell className="border-r text-center text-nowrap p-4 ">
                    {e.expand?.docs?.registration_doc.map((doc) => {
                      return (
                        <Link
                          className="text-xs text-primary"
                          href={genPbFiles(e.expand?.docs, doc)}
                          target="_blank"
                          key={doc}
                        >
                          <p>{doc}</p>{" "}
                        </Link>
                      );
                    })}
                  </TableCell>

                  <TableCell className="text-center border-r">
                    {e.expand?.docs?.auditing_and_reviewing_reports.map(
                      (doc) => {
                        return (
                          <Link
                            className="text-xs text-primary"
                            href={genPbFiles(e.expand?.docs, doc)}
                            target="_blank"
                            key={doc}
                          >
                            <p>{doc}</p>
                          </Link>
                        );
                      }
                    )}
                  </TableCell>
                  <TableCell className="border-r text-center text-nowrap p-4 ">
                    {e.expand?.docs?.verification_and_validation_reports.map(
                      (doc) => {
                        return (
                          <Link
                            className="text-xs text-primary"
                            href={genPbFiles(e.expand?.docs, doc)}
                            target="_blank"
                            key={doc}
                          >
                            <p className="">{doc}</p>
                          </Link>
                        );
                      }
                    )}
                  </TableCell>

                  <TableCell className="text-center">
                    {e.expand?.docs?.other_doc.map((doc) => {
                      return (
                        <Link
                          className="text-xs text-primary"
                          href={genPbFiles(e.expand?.docs, doc)}
                          target="_blank"
                          key={doc}
                        >
                          <p>{doc}</p>
                        </Link>
                      );
                    })}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <br />
        {data?.totalPages != 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant="secondary"
                  onClick={() => setPage(page - 1)}
                  disabled={data?.page == 1 || isLoading}
                >
                  Previous
                </Button>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>{data?.page}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant="secondary"
                  onClick={() => setPage(page + 1)}
                  disabled={isLoading || data?.page == data?.totalPages}
                >
                  Next
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </>
    </div>
  );
}

export default MyProjectsList;
