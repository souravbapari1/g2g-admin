"use client";
import Icons, { PickIcon } from "@/components/icons/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Trash } from "lucide-react";
import { usePlanState } from "./planState";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function NewMembership() {
  const state = usePlanState();
  useEffect(() => {
    state.resetState();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-20 p-10">
      <div className="">
        <div className="grid grid-cols-2 gap-5">
          <div className="">
            <Label>Plan Name</Label>
            <Input
              value={state.planName}
              onChange={(e) => state.updatePlanData("planName", e.target.value)}
            />
          </div>
          <div className="">
            <Label>Plan Icon</Label>
            <Input
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  state.updatePlanData("planIcon", e.target.files[0]);
                }
              }}
            />
          </div>

          <div className="">
            <Label>
              Original Price <small>(set 0 if free)</small>{" "}
            </Label>
            <Input
              type="number"
              min={0}
              value={state.originalPrice}
              onChange={(e) =>
                state.updatePlanData("originalPrice", e.target.value)
              }
            />
          </div>
          <div className="">
            <Label>Compare Price</Label>
            <Input
              type="number"
              value={state.comparePrice}
              onChange={(e) =>
                state.updatePlanData("comparePrice", e.target.value)
              }
            />
          </div>
          <div className="">
            <Label>Stocks</Label>
            <Input
              type="number"
              value={state.stocks}
              onChange={(e) => state.updatePlanData("stocks", e.target.value)}
            />
          </div>
          <div className=" flex justify-start items-center gap-5">
            <Label>Available Plan</Label>
            <Switch
              checked={state.isAvailable}
              onClick={() => {
                state.updatePlanData("isAvailable", !state.isAvailable);
              }}
            />
          </div>
          <div className=" flex justify-start flex-col items-start gap-3">
            <Label>Mark as Feature Plan</Label>

            <Switch
              checked={state.popular}
              onClick={() => {
                state.updatePlanData("popular", !state.popular);
              }}
            />
          </div>

          <div className="col-span-2 mt-10">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">Plan Details</p>
              <Button
                onClick={() =>
                  state.addPlanDetail({
                    icon: "info",
                    title: "",
                  })
                }
                size="sm"
                variant="outline"
              >
                Add New
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-5">
              {state?.planDetails?.map((item, index) => {
                return (
                  <Card key={index + "-card"}>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <PickIcon
                          onClick={(e) =>
                            state.updatePlanDetail(index, { icon: e })
                          }
                        >
                          <Button
                            variant="outline"
                            className="w-full mt-5 text-gray-600"
                          >
                            <Icons name={item.icon} />
                          </Button>
                        </PickIcon>
                        <Trash
                          color="red"
                          className="cursor-pointer"
                          onClick={() => state.deletePlanDetail(index)}
                        />
                      </div>
                      <div className="mt-3">
                        <Textarea
                          placeholder="Enter Plan Details"
                          value={item.title}
                          onChange={(e) =>
                            state.updatePlanDetail(index, {
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex justify-between items-center pb-5">
          <h3 className="text-lg font-semibold underline ">Manage Questions</h3>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button size="sm" variant="outline">
                Add New
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>No Of Answers</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  state.addQnA({
                    question: "",
                    answers: ["", ""],
                  });
                }}
              >
                2 Answers
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  state.addQnA({
                    question: "",
                    answers: ["", "", "", ""],
                  });
                }}
              >
                4 Answers
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex justify-center items-center gap-5 flex-col w-full">
          {state?.qna?.map((item, index) => {
            return (
              <Card key={index + "-qna"} className="w-full">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg text-gray-700">
                      Question {index + 1}
                    </CardTitle>
                    <Trash color="red" onClick={() => state.deleteQnA(index)} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="">
                      <Label>Question</Label>
                      <Input
                        placeholder="Enter Question"
                        className="mt-1"
                        value={item.question}
                        onChange={(e) =>
                          state.updateQnA(index, { question: e.target.value })
                        }
                      />
                    </div>
                    {item.answers?.map((ans, i) => {
                      return (
                        <div className="mt-4" key={i + "ams" + i + index}>
                          <Label>Answer {i + 1}</Label>
                          <Textarea
                            placeholder="Enter Answer"
                            className="mt-1"
                            value={ans}
                            onChange={(e) => {
                              state.updateQnA(index, {
                                answers: [
                                  ...item.answers.slice(0, i),
                                  e.target.value,
                                  ...item.answers.slice(i + 1),
                                ],
                              });
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NewMembership;
