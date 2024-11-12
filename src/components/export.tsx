"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { Switch } from "./ui/switch";
import { validateEmail } from "@/helper/validate";
import { useState } from "react";
import { LoadingSpinner } from "./ui/loading-spinner";
import { exportClient } from "@/request/actions";
import toast from "react-hot-toast";

function ExportDataView({
  children,
  base,
}: {
  children: React.ReactNode;
  base: string;
}) {
  const [email, setEmail] = useState<string>("");
  const [pdf, setpdf] = useState(false);
  const [Excel, setExcel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const emails = email.split(",").map((email) => email.trim());
      const invalidEmails = emails.filter((email) => !validateEmail(email));
      if (invalidEmails.length > 0) {
        toast.error(`Invalid Emails: ${invalidEmails.join(",")}`);
        setIsLoading(false);
        return false;
      }
      if (!Excel && !pdf) {
        toast.error("Please select at least one option");
        setIsLoading(false);
        return false;
      }
      if (Excel) {
        await exportClient
          .post("/gen/excel")
          .json({
            email: emails.join(","),
            base,
          })
          .send();
      }
      if (pdf) {
        await exportClient
          .post("/gen/pdf")
          .json({
            email: emails.join(","),
            base,
          })
          .send();
      }
      toast.success("Email Request Sent Successfully");
      setIsLoading(false);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export as Pdf or Excel File</DialogTitle>
          <DialogDescription>
            This task make maybe some time to complete, enter your email id to
            we are generate on server and send to your email
          </DialogDescription>
          <br />
          <div className="flex justify-start items-center gap-5  mb-3">
            <div className="flex justify-start items-center gap-2">
              <Switch checked={pdf} onClick={() => setpdf(!pdf)} />
              <p>PDF FILE</p>
            </div>
            <div className="flex justify-start items-center gap-2">
              <Switch checked={Excel} onClick={() => setExcel(!Excel)} />
              <p>EXCEL FILE</p>
            </div>
          </div>
          <br />
        </DialogHeader>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Button onClick={onSubmit} disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <LoadingSpinner className="w-5 h-5 " />
            </div>
          ) : (
            "Send On Email"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default ExportDataView;
