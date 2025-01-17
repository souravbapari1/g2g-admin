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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { LiveAndPopcastItem } from "@/interfaces/liveandpodcast";
import { extractErrors } from "@/request/actions";

import { updatePodcast } from "@/request/worker/live-and-podcasts/managePodcast";
import { Edit } from "lucide-react";
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

function UpdatePodcast({
  data,
  onUpdate,
  category,
}: {
  data: LiveAndPopcastItem;
  onUpdate: (data: LiveAndPopcastItem) => void;
  category: PodCastCategory[];
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [location, setLocation] = useState(data.location);
  const [locationUrl, setLocationUrl] = useState(data.location_url);
  const [videoId, setVideoId] = useState(data.videoId);
  const [categoryName, setCategory] = useState(data.category);

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!location.trim()) {
      toast.error("Location is required");
      return;
    }

    // if (!locationUrl.trim()) {
    //   toast.error("Location Url is required");
    //   return;
    // }

    if (!videoId.trim()) {
      toast.error("Video Id is required");
      return;
    }

    if (!categoryName.trim()) {
      toast.error("Category is required");
      return;
    }

    try {
      const updateVideoReq = await updatePodcast(data.id, {
        location,
        location_url: locationUrl,
        title,
        videoId,
        category: categoryName,
      });
      onUpdate(updateVideoReq);
      toast.success("Podcast Update Successfully");
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
        <p className=" rounded-full ">
          <Edit size={18} color="green" />
        </p>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Live</SheetTitle>
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
          Update Live
        </Button>
      </SheetContent>
    </Sheet>
  );
}

export default UpdatePodcast;
