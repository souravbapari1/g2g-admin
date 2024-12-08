import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { LiveAndPopcastItem } from "@/interfaces/liveandpodcast";
import { extractErrors } from "@/request/actions";
import { createPodcast } from "@/request/worker/live-and-podcasts/managePodcast";
import { Plus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { PodCastCategory } from "../category/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function NewPodCast({
  onAddNew,
  category,
}: {
  onAddNew: (data: LiveAndPopcastItem) => void;
  category: PodCastCategory[];
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [locationUrl, setLocationUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [categoryName, setCategory] = useState("");

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!location.trim()) {
      toast.error("Location is required");
      return;
    }

    if (!videoId.trim()) {
      toast.error("Video Id is required");
      return;
    }

    if (!categoryName.trim()) {
      toast.error("Category is required");
      return;
    }

    try {
      const newVideoReq = await createPodcast({
        location,
        location_url: locationUrl,
        title,
        videoId,
        category: categoryName,
      });
      onAddNew(newVideoReq);
      toast.success("PodCast Created Successfully");

      setTitle("");
      setLocation("");
      setLocationUrl("");
      setVideoId("");
      setCategory("");

      setOpen(false);
    } catch (error: any) {
      console.log(error);
      const errors = extractErrors(error?.response);
      toast.error(errors[0]);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button className="w-12 h-12 rounded-full fixed bottom-6 shadow-md right-6 bg-indigo-500 hover:bg-indigo-600">
          <Plus />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New PodCast</SheetTitle>
        </SheetHeader>
        <div className="mt-3">
          <Label htmlFor="title">Title</Label>
          <Textarea
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        {/* <div className="mt-3">
          <Label htmlFor="location_url">Location Url</Label>
          <Input
            id="location_url"
            value={locationUrl}
            onChange={(e) => setLocationUrl(e.target.value)}
          />
        </div> */}
        <div className="mt-3">
          <Label htmlFor="video_id">Video ID</Label>
          <Input
            id="video_id"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <Label>Video Category</Label>
          <Select value={categoryName} onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {category.map((item) => (
                <SelectItem value={item.id} key={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full mt-6" onClick={handleSave}>
          Save New PodCast
        </Button>
      </SheetContent>
    </Sheet>
  );
}

export default NewPodCast;
