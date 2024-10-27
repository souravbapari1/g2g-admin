import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useState } from "react";
import { Edit } from "lucide-react";

import { TreeReportItem } from "@/interfaces/treeReport";
import toast from "react-hot-toast";
import { updateTreeReport } from "@/request/worker/orders/treeorders/reports/manageTreeReport";
import { useSession } from "next-auth/react";
import { extractErrors } from "@/request/actions";

function UpdatePlantTreeReport({
  report,
  onCompleted,
}: {
  report: TreeReportItem;
  onCompleted: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data } = useSession();
  const [status, setStatus] = React.useState(report.status);
  const [od, setOD] = React.useState(report.ob_cm.toString());
  const [highest, setHighest] = React.useState(report.height.toString());
  const [treeImage, setTreeImage] = React.useState<File | null>(null);
  const [streetImage, setStreetImage] = React.useState<File | null>(null);
  const [otherComments, setOtherComments] = React.useState(
    report?.other_comments || ""
  );

  const handleTreeImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setTreeImage(selectedFile);
  };
  const handleStreetImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setStreetImage(selectedFile);
  };

  const handleCreateReport = async () => {
    toast.dismiss();

    if (!status || !od || !highest) {
      toast.error("All fields are required");
      return false;
    }

    try {
      setLoading(true);
      toast.loading("Updating Tree Report...");
      await updateTreeReport(report.id, {
        height: highest,
        ob_cm: od,
        status: status,
        tree_image: treeImage,
        street_image: streetImage,
        updateBy: data?.user.id || "",
        other_comments: otherComments,
      });
      toast.dismiss();
      toast.success("Tree Report update successfully");
      setOpen(false);
      onCompleted();
      setLoading(false);
    } catch (error: any) {
      const errors = extractErrors(error?.response);
      toast.error(errors[0]);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Edit size={15} className="text-green-800" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Tree Report</DialogTitle>
        </DialogHeader>
        <div className="mt-3">
          <Label>Status</Label>

          <Select value={status} onValueChange={(e) => setStatus(e)}>
            <SelectTrigger className="w-full mt-1 ">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new planted">New Planted</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="poor">Poor</SelectItem>
              <SelectItem value="dead">Dead</SelectItem>
              <SelectItem value="producing">Producing</SelectItem>
              {/* <SelectItem value="not planted">Not Planted</SelectItem> */}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="">
            <Label>OD (CM)</Label>
            <Input
              value={od}
              onChange={(e) => setOD(e.target.value)}
              type="number"
            />
          </div>
          <div className="">
            <Label>Highest (CM)</Label>
            <Input
              value={highest}
              onChange={(e) => setHighest(e.target.value)}
              type="number"
            />
          </div>
        </div>
        <div className="grid gap-5 grid-cols-2">
          <div className="">
            <Label>Tree Image</Label>
            <Input
              type="file"
              onChange={handleTreeImageChange}
              accept=".jpg,.jpeg,.png"
            />
          </div>
          <div className="">
            <Label>Street Image</Label>
            <Input
              type="file"
              onChange={handleStreetImageChange}
              accept=".jpg,.jpeg,.png"
            />
          </div>
        </div>
        <div className="">
          <Label>Other Comments</Label>
          <Textarea
            value={otherComments}
            onChange={(e) => setOtherComments(e.target.value)}
          />
        </div>
        <Button
          disabled={loading}
          className="mt-2"
          onClick={handleCreateReport}
        >
          Update Report
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default UpdatePlantTreeReport;
