import { LiveAndPopcastItem } from "@/interfaces/liveandpodcast";
import { cn } from "@/lib/utils";
import { updateLive } from "@/request/worker/live-and-podcasts/manageLive";
import { Trash2 } from "lucide-react";
import { MdLiveTv } from "react-icons/md";

function LiveVideoView({
  video,
  onDelete,
  onLiveEnd,
}: {
  video: LiveAndPopcastItem;
  onDelete: (video: LiveAndPopcastItem) => void;
  onLiveEnd: (video: LiveAndPopcastItem) => void;
}) {
  return (
    <div className="w-full">
      <div className="h-48 w-full relative">
        <div
          onClick={() => onLiveEnd(video)}
          className={cn(
            " h-8 absolute bottom-3 left-3 cursor-pointer rounded-md text-xs flex justify-between items-center font-bold px-3 text-white",
            video.liveNow ? "bg-red-600" : "bg-gray-900"
          )}
        >
          <p className="flex justify-center items-center gap-2">
            <MdLiveTv /> Live {video.liveNow ? "Now" : "End"}
          </p>
        </div>
        <div
          onClick={() => onDelete(video)}
          className="absolute bottom-0 cursor-pointer right-0 w-10 h-10 bg-transparent flex justify-center items-center"
        >
          <Trash2 color="red" />
        </div>
        <iframe
          width="560"
          height="315"
          src={"https://www.youtube.com/embed/" + video.videoId}
          title={video.title}
          frameBorder={"0"}
          className="w-full rounded-lg h-full border-2 bg-gray-100 shadow-md"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div className="py-3 p-3">
        <p className="mb-2 font-bold text-lg text-green-800">
          {video.location}
        </p>
        <p className="text-sm ">{video.title}</p>
      </div>
    </div>
  );
}

export default LiveVideoView;
