import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  addNewSdg,
  projectDataType,
  removeSdgByIndex,
  updateSgdByIndex,
} from "@/redux/Slices/projectParamsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { genPbFiles } from "@/request/actions";
import { Pencil, Trash2 } from "lucide-react";

function SdgManage() {
  const state = useAppSelector((e) => e.projectParamsSlice);
  const dispatch = useAppDispatch();

  const { sdgListGlobal } = useGlobalDataSetContext();
  return (
    <Card className="mb-10 rounded-none bg-gray-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Manage Project SDG</CardTitle>
          <SdgManageAdd />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">S NO.</TableHead>
              <TableHead>SDB</TableHead>
              <TableHead>Parameters</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {state.project.sdgs.map((item, index) => {
              const sdg = sdgListGlobal.find((i) => i.id === item.sdg);
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex justify-start gap-3 items-center">
                      <Image
                        src={genPbFiles(sdg, sdg?.image)}
                        alt=""
                        width={120}
                        height={120}
                        className="w-14 h-14 object-cover  shadow-md "
                      />
                      <div className="">
                        <p className="font-bold">{item.name}</p>
                        <p className="text-sm">{item.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item?.data?.map((e, i) => {
                      return (
                        <div
                          className="flex justify-between items-center  p-1 "
                          key={i}
                        >
                          <div className="flex justify-start items-center gap-3">
                            <div
                              className="w-3 h-3"
                              style={{
                                background: sdg?.main_color
                                  ? `linear-gradient(90deg, ${
                                      sdg.main_color
                                    }, ${sdg.sub_color || "gray"})`
                                  : "linear-gradient(90deg, gray, lightgray)",
                              }}
                            ></div>
                            <p>{e.name}</p>
                          </div>
                          <p>{e.value}</p>
                        </div>
                      );
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-5 items-center">
                      <SdgManageUpdate index={index} data={item} />
                      <Trash2
                        size={18}
                        color="red"
                        className="cursor-pointer "
                        onClick={() => dispatch(removeSdgByIndex(index))}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default SdgManage;

function SdgManageAdd() {
  const [open, setOpen] = useState(false);
  const [selectedSdg, setSelectedSdg] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [parameters, setParameters] = useState<
    { name: string; value: string }[]
  >([]);

  const { sdgListGlobal } = useGlobalDataSetContext();
  const state = useAppSelector((e) => e.projectParamsSlice);
  const dispatch = useAppDispatch();

  const handleAddParameter = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    setParameters((prev) => [...prev, { name, value }]);
  };

  const handleDeleteParameter = (index: number) => {
    setParameters((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const data = sdgListGlobal.find((item) => item.id === selectedSdg);
    const lists = data?.parameters.map((item) => {
      return {
        name: item,
        value: "",
      };
    });
    if (lists) {
      setParameters(lists);
    }
  }, [selectedSdg]);

  const handleSave = () => {
    toast.dismiss();
    if (!validateFields()) {
      return false;
    }
    console.log("Work");

    dispatch(
      addNewSdg({
        name: sdgListGlobal.find((item) => item.id === selectedSdg)?.name || "",
        sdg: selectedSdg,
        description,
        data: parameters,
      })
    );

    setDescription("");
    setSelectedSdg("");
    setParameters([]);
    setOpen(false);
    toast.success("Sdg added successfully");
  };

  const validateFields = () => {
    if (!selectedSdg) {
      toast.error("Please select SDG");
      return false;
    }
    if (!description) {
      toast.error("Please enter description");
      return false;
    }
    if (parameters.some((p) => !p.name || !p.value)) {
      toast.error("Please enter parameter name and value");
      return false;
    }

    return true;
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button size="sm" variant="outline" className="rounded-none">
          Add New Sdg
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New SDG</SheetTitle>
        </SheetHeader>
        <br />
        <div className="">
          <Label>Select SGD</Label>
          <Select
            value={selectedSdg}
            onValueChange={(value) => setSelectedSdg(value)}
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {sdgListGlobal?.map((sdg) => (
                <SelectItem key={sdg.id} value={sdg.id}>
                  {sdg.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mt-3">
          <Label>Description</Label>
          <Textarea
            className="w-full mt-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <p className="font-semibold mt-4">Parameters</p>
        {parameters.map((parameter, index) => (
          <div className="mt-2" key={index}>
            <Label className="capitalize">{parameter.name}</Label>
            <div className="flex mt-1 justify-between items-center">
              <Input
                className="w-full  rounded-r-none"
                value={parameter.value}
                onChange={(e) => {
                  setParameters((prev) =>
                    prev.map((p, i) =>
                      i === index ? { ...p, value: e.target.value } : p
                    )
                  );
                }}
              />
              <Button
                className="rounded-l-none"
                variant="destructive"
                onClick={() => {
                  handleDeleteParameter(index);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
        <SdgManageAddParameter
          onAddNew={(name, value) =>
            handleAddParameter({ name: name, value: value })
          }
        />

        <br />
        <Button className="mt-5 w-full" onClick={handleSave}>
          Save This SDG
        </Button>
      </SheetContent>
    </Sheet>
  );
}

function SdgManageUpdate({
  data,
  index,
}: {
  index: number;
  data: projectDataType["sdgs"][0];
}) {
  const [selectedSdg, setSelectedSdg] = useState<string>(data.sdg || "");
  const [description, setDescription] = useState<string>(
    data.description || ""
  );
  const [parameters, setParameters] = useState<
    { name: string; value: string }[]
  >(data.data || []);
  const [open, setOpen] = useState(false);
  const { sdgListGlobal } = useGlobalDataSetContext();
  const state = useAppSelector((e) => e.projectParamsSlice);
  const dispatch = useAppDispatch();

  const handleAddParameter = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    setParameters((prev) => [...prev, { name, value }]);
  };

  const handleDeleteParameter = (index: number) => {
    setParameters((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    toast.dismiss();
    if (!validateFields()) {
      return false;
    }
    console.log("Work");

    dispatch(
      updateSgdByIndex({
        index: index,
        data: {
          name:
            sdgListGlobal.find((item) => item.id === selectedSdg)?.name || "",
          sdg: selectedSdg,
          description,
          data: parameters,
        },
      })
    );
    setOpen(false);
    toast.success("Sdg Update successfully");
  };

  const validateFields = () => {
    if (!selectedSdg) {
      toast.error("Please select SDG");
      return false;
    }
    if (!description) {
      toast.error("Please enter description");
      return false;
    }
    if (parameters.some((p) => !p.name || !p.value)) {
      toast.error("Please enter parameter name and value");
      return false;
    }

    return true;
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Pencil size={18} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update This SDG</SheetTitle>
        </SheetHeader>
        <br />
        <div className="">
          <Label>Select SGD</Label>
          <Select
            value={selectedSdg}
            onValueChange={(value) => {
              setSelectedSdg(value);
              const data = sdgListGlobal.find((item) => item.id === value);
              const lists = data?.parameters.map((item) => {
                return {
                  name: item,
                  value: "",
                };
              });
              if (lists) {
                setParameters(lists);
              }
            }}
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {sdgListGlobal?.map((sdg) => (
                <SelectItem key={sdg.id} value={sdg.id}>
                  {sdg.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mt-3">
          <Label>Description</Label>
          <Textarea
            className="w-full mt-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <p className="font-semibold mt-4">Parameters</p>
        {parameters.map((parameter, index) => (
          <div className="mt-2" key={index}>
            <Label className="capitalize">{parameter.name}</Label>
            <div className="flex mt-1 justify-between items-center">
              <Input
                className="w-full  rounded-r-none"
                value={parameter.value}
                onChange={(e) => {
                  setParameters((prev) =>
                    prev.map((p, i) =>
                      i === index ? { ...p, value: e.target.value } : p
                    )
                  );
                }}
              />
              <Button
                className="rounded-l-none"
                variant="destructive"
                onClick={() => {
                  handleDeleteParameter(index);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
        <SdgManageAddParameter
          onAddNew={(name, value) =>
            handleAddParameter({ name: name, value: value })
          }
        />

        <br />
        <Button className="mt-5 w-full" onClick={handleSave}>
          Update This SDG
        </Button>
      </SheetContent>
    </Sheet>
  );
}

function SdgManageAddParameter({
  onAddNew,
}: {
  onAddNew: (name: string, value: string) => void;
}) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  function handleAdd() {
    if (!validateAdd()) {
      return false;
    }
    onAddNew(name, value);
    setName("");
    setValue("");
    setOpen(false);
  }

  const validateAdd = () => {
    toast.dismiss();
    if (!name || !value) {
      toast.error("Please enter parameter name and value");
      return false;
    }
    return true;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size="sm" variant="secondary" className="mt-3">
          Add Parameters
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Parameter</DialogTitle>
          <DialogDescription>
            Please enter parameter name and value
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <Label>Parameter Name</Label>
          <Input
            className="w-full mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="">
          <Label>Parameter Value</Label>
          <Input
            className="w-full mt-1"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <Button className="mt-2 w-full" onClick={handleAdd}>
          Add Parameter
        </Button>
      </DialogContent>
    </Dialog>
  );
}
