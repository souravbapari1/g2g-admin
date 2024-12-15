"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { use, useEffect, useState } from "react";
import { formatTimestampCustom } from "@/helper/dateTime";
import { Terminal } from "lucide-react";

import Link from "next/link";
import { UserItem } from "@/interfaces/user";

import {
  getUserPaymentHistory,
  MyBalanceItem,
} from "../actions/getUserPaymentData";
import { useMutation } from "react-query";
function MyBalance({
  balance,
  user,
}: {
  balance: MyBalanceItem;
  user: UserItem;
}) {
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");

  const history = useMutation({
    mutationFn: async (filter?: string | undefined) => {
      return await getUserPaymentHistory(user.id, filter);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    history.mutate("");
  }, []);

  return (
    <div>
      <div className=" mt-6 ">
        <div className="">
          <div className=" gap-5 grid lg:grid-cols-2 ">
            <Card x-chunk="dashboard-01-chunk-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex justify-between items-center w-full">
                  <p>My Donations (OMR)</p>
                  <p className="text-2xl text-gray-500">$</p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {balance.totalAmount.toFixed(2)} OMR
                </div>
                <p className="text-xs text-muted-foreground">
                  your total donatio
                </p>
              </CardContent>
            </Card>

            {user.user_type == "partner" && (
              <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium flex justify-between items-center w-full">
                    <p>My Wallet (OMR)</p>
                    <p className="text-2xl text-gray-500">$</p>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between">
                  <div className="">
                    <div className="text-2xl font-bold">00.00 OMR</div>
                    <p className="text-xs text-muted-foreground">
                      your total donatio
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="mt-10  flex lg:items-end lg:justify-end">
            <div className="w-full">
              <Label className="text-xs">Date From</Label>
              <Input
                type="date"
                className="block rounded-none border-r-0 border-b-0 "
                onChange={(e) => {
                  setStart_date(e.target.value);
                }}
                value={start_date}
              />
            </div>
            <div className="w-full">
              <Label className="text-xs">Date To</Label>
              <Input
                type="date"
                className="block rounded-none border-b-0"
                onChange={(e) => {
                  setEnd_date(e.target.value);
                }}
                value={end_date}
              />
            </div>
            <div className="flex justify-end items-end flex-col">
              <Label className="text-xs "> </Label>
              <Button
                className="rounded-none"
                onClick={() => {
                  history.mutate(
                    `created > '${start_date}' && created < '${end_date}'`
                  );
                }}
              >
                Apply
              </Button>
            </div>
          </div>
          <Table className="border text-xs">
            <TableCaption>A list of your recent Transaction.</TableCaption>
            <TableHeader className="bg-gray-100 ">
              <TableRow>
                <TableHead className="py-3 md:w-[160px] text-center">
                  Transaction ID
                </TableHead>
                <TableHead className="py-3 border-r border-l text-center">
                  Transaction Reasons
                </TableHead>
                <TableHead className="py-3 text-center border-r">
                  Date - Time
                </TableHead>
                <TableHead className="py-3 text-center">Amount (OMR)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.data?.items.map((e, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell className="py-3 text-center border-r uppercase">
                      {e.id}
                    </TableCell>
                    <TableCell className="py-3 text-center border-r">
                      {e.expand.project.name}
                    </TableCell>
                    <TableCell className="py-3 text-center border-r">
                      {formatTimestampCustom(e.created)}
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      {e.amount.toFixed(2)} OMR
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default MyBalance;
