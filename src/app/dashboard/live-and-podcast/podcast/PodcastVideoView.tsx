import { LiveAndPopcastItem } from "@/interfaces/liveandpodcast";
import { LocateIcon, Trash2 } from "lucide-react";
import UpdatePodcast from "./UpdatePodcast";
import Link from "next/link";
import { MdLocationPin } from "react-icons/md";
import { PodCastCategory } from "../category/actions";

function LiveVideoView({
  video,
  onDelete,
  category,
  onUpdate,
}: {
  video: LiveAndPopcastItem;
  onDelete: (video: LiveAndPopcastItem) => void;
  category: PodCastCategory[];
  onUpdate: (video: LiveAndPopcastItem) => void;
}) {
  return (
    <div className="w-full">
      <div className="h-48 w-full relative">
        <iframe
          width="560"
          height="315"
          src={"https://www.youtube.com/embed/" + video.videoId}
          title={video.title}
          frameBorder={"0"}
          className="w-full  h-full object-fill"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xs capitalize mt-1  font-semibold">
          {category.find((c) => c.id === video.category)?.name || "N/A"}
        </p>
        <div className=" bottom-0 cursor-pointer right-0 gap-3 mt-2 bg-transparent flex justify-end items-end w-full">
          <UpdatePodcast
            data={video}
            onUpdate={(e) => {
              onUpdate(e);
            }}
            category={category}
          />
          <Trash2
            color="red"
            size={19}
            onClick={() => onDelete(video)}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="py-3 p-3 mt-0">
        <Link
          href={video.location_url}
          target="_blank"
          className="mb-2 font-bold text-lg text-green-800 flex justify-start gap-2 items-center"
        >
          <MdLocationPin /> {video.location}
        </Link>
        <p className="text-sm ">{video.title}</p>
      </div>
    </div>
  );
}

export default LiveVideoView;
