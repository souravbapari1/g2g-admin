"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FSLPItem } from "./fslp";
import { useState } from "react";
import { formatTimestampCustom } from "@/helper/dateTime";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { genPbFiles } from "@/request/actions";
import { Badge } from "@/components/ui/badge";
import { Collection } from "@/interfaces/collection";

export const MyProgramsList = ({ data }: { data?: Collection<FSLPItem> }) => {
  const cancel = data?.items.filter((e) => e.status == "cancel");
  const pending = data?.items.filter((e) => e.status == "pending");
  const approved = data?.items.filter((e) => e.status == "approved");
  const complete = data?.items.filter((e) => e.status == "complete");

  const [selected, setSelected] = useState<FSLPItem[]>(pending || []);
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div className="grid md:grid-cols-3 gap-5">
      {/* <div className="">
      <div className="w-full h-auto max-h-[calc(100vh-130px)] bg-primary/5 md:sticky top-24 overflow-auto p-6  rounded-2xl ">
        <div className="flex flex-col gap-4">
          {["The Future Sustainability Leaders Program (FSLP)"].map(
            (e, i) => {
              return (
                <Card className="shadow-none border-none overflow-hidden ">
                  <CardHeader
                    className={cn(
                      "py-3 font-semibold text-xs  px-4",
                      i == 0 && "bg-primary  text-white"
                    )}
                  >
                    <div className="flex items-center ">
                      <div className="w-12">
                        <FaMicrophoneAlt size={25} />
                      </div>
                      <h1>{e}</h1>
                    </div>
                  </CardHeader>
                </Card>
              );
            }
          )}
        </div>
      </div>
    </div> */}
      <div className="md:col-span-3">
        <Tabs
          defaultValue="pending"
          onValueChange={(e) => {
            setActiveTab(e);
            if (e == "pending") {
              setSelected(pending || []);
            } else if (e == "approved") {
              setSelected(approved || []);
            } else if (e == "complete") {
              setSelected(complete || []);
            } else if (e == "cancel") {
              setSelected(cancel || []);
            }
          }}
          value={activeTab}
        >
          <TabsList>
            <TabsTrigger value="pending">
              Pending ({pending?.length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({approved?.length})
            </TabsTrigger>
            <TabsTrigger value="complete">
              Complete ({complete?.length})
            </TabsTrigger>
            <TabsTrigger value="cancel">Cancel ({cancel?.length})</TabsTrigger>
          </TabsList>
        </Tabs>
        <br />
        <hr />
        <br />
        {selected.length == 0 && <p>No Data Found</p>}
        <div className="grid md:grid-cols-2 gap-5">
          {selected.map((e, i) => {
            return (
              <Card className=" border-none">
                <CardHeader>
                  <CardTitle>You’re a Participant</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold mb-2">
                    Program: The Future Sustainability Leaders Program
                  </p>
                  <ul>
                    <li>
                      Name:{" "}
                      {e.application.firstName + " " + e.application.lastName}
                    </li>
                    <li>Email: {e.application.emailID}</li>
                    <li>Mobile: {e.application.mobileNo}</li>
                  </ul>
                  <p className="text-sm font-semibold mt-4">
                    Date: {formatTimestampCustom(e.created)}
                  </p>
                  <Sheet>
                    <SheetTrigger>
                      <Button className="shadow-none mt-4">View Details</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Program Details</SheetTitle>
                      </SheetHeader>
                      <p className="font-semibold mb-2 mt-7">
                        The Future Sustainability Leaders Program
                      </p>
                      <ul className="flex flex-col gap-2">
                        <li>
                          Name:{" "}
                          {e.application.firstName +
                            " " +
                            e.application.lastName}
                        </li>
                        <li>Email: {e.application.emailID}</li>
                        <li>Mobile: {e.application.mobileNo}</li>
                        <li>Address: {e.application.address}</li>
                        <li>City: {e.application.city}</li>
                        <li>Country: {e.application.country}</li>
                        <li>Post Code: {e.application.postCode}</li>
                        <li>DOB: {e.application.dob}</li>
                        <li>DOB: {e.application.dob}</li>
                        <li>Gender: {e.application.gender}</li>
                        <li>Nationality: {e.application.nationality}</li>
                        <li>University Name: {e.application.universityName}</li>
                        <li>Education State: {e.application.eduState}</li>
                        <li>Sort Brief: {e.application.sortBreif}</li>
                        <li>
                          CV:{" "}
                          <Link
                            href={genPbFiles(e, e.cv)}
                            className="text-primary"
                          >
                            View CV
                          </Link>
                        </li>
                        <li>
                          <Badge
                            variant={"outline"}
                            className="uppercase shadow-none"
                          >
                            {e.status}
                          </Badge>
                        </li>
                      </ul>
                    </SheetContent>
                  </Sheet>
                </CardContent>
              </Card>
            );
          })}
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};
