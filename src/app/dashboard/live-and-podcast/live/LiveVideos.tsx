"use client";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Collection } from "@/interfaces/collection";
import { LiveAndPopcastItem } from "@/interfaces/liveandpodcast";
import {
  deleteLive,
  getLives,
  updateLive,
} from "@/request/worker/live-and-podcasts/manageLive";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LiveVideoView from "./LiveVideoView";
import NewLive from "./NewLive";

function LiveVideos() {
  const [videos, setVideos] = useState<Collection<LiveAndPopcastItem>>();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const loadLiveVideos = async () => {
    try {
      setLoading(true);
      const res = await getLives({ page: page || 1 });
      setVideos({
        ...res,
        items: [...(videos?.items || []), ...res.items],
      });
      setLoading(false);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLiveVideos();
  }, [page]);

  return (
    <div className="">
      <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
        {videos?.items.map((video) => (
          <LiveVideoView
            onUpdate={(v) => {
              setVideos((prev) => {
                if (prev) {
                  return {
                    ...prev,
                    items: prev.items.map((item) =>
                      item.id === v.id ? v : item
                    ),
                  };
                }
                return prev;
              });
            }}
            onLiveEnd={async (v) => {
              if (!video.liveNow) {
                return false;
              }
              const isLive = confirm(
                "Are you sure you want to end this live video?"
              );
              if (!isLive) return;
              setVideos((prev) => {
                if (prev) {
                  return {
                    ...prev,
                    items: prev.items.map((item) =>
                      item.id === v.id ? { ...item, liveNow: false } : item
                    ),
                  };
                }
                return prev;
              });
              await updateLive(video.id, { liveNow: false });
            }}
            key={video.id}
            video={video}
            onDelete={async (v) => {
              const isDelete = confirm(
                "Are you sure you want to delete this video?"
              );
              if (!isDelete) return;
              try {
                setVideos((prev) => {
                  if (prev) {
                    return {
                      ...prev,
                      items: prev.items.filter((item) => item.id !== v.id),
                    };
                  }
                  return prev;
                });
                await deleteLive(v.id);
              } catch (error) {
                console.error("Failed to delete video:", error);
                toast.error("Failed to delete video");
              }
            }}
          />
        ))}
        <NewLive
          onAddNew={(v) =>
            setVideos((videos) => {
              if (videos) {
                return {
                  ...videos,
                  items: [v, ...videos.items],
                };
              }
              return videos;
            })
          }
        />
      </div>
      {loading && (
        <div className="w-full h-96 flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
      <div className="flex justify-center items-center">
        {videos && videos?.totalPages > videos?.page && (
          <Button className="mx-auto mt-10" onClick={() => setPage(page + 1)}>
            Load More
          </Button>
        )}
      </div>
    </div>
  );
}

export default LiveVideos;
