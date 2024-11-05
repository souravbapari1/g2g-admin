import { LiveAndPopcastItem } from "@/interfaces/liveandpodcast";
import { Trash2 } from "lucide-react";

function LiveVideoView({
  video,
  onDelete,
}: {
  video: LiveAndPopcastItem;
  onDelete: (video: LiveAndPopcastItem) => void;
}) {
  return (
    <div className="w-full">
      <div className="h-48 w-full relative">
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
