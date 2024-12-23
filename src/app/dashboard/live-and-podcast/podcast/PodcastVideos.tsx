"use client";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Collection } from "@/interfaces/collection";
import { LiveAndPopcastItem } from "@/interfaces/liveandpodcast";
import {
  deletePodcast,
  getPodcasts,
} from "@/request/worker/live-and-podcasts/managePodcast";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import NewLive from "./NewPodCast";
import LiveVideoView from "./PodcastVideoView";
import { PodCastCategory } from "../category/actions";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function PodcastVideos({ data }: { data: Collection<PodCastCategory> }) {
  const [videos, setVideos] = useState<Collection<LiveAndPopcastItem>>();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    category: "",
    search: "",
  });

  const generateFilter = () => {
    let filters = [];
    if (filter?.category) {
      filters.push(`category='${filter?.category}'`);
    }
    if (filter?.search) {
      filters.push(`title~'${filter?.search}'`);
    }
    return filters.length > 0 ? `(${filters.join(" && ")})` : "";
  };

  const loadPodcastVideos = async () => {
    try {
      setLoading(true);
      const res = await getPodcasts({ page: page || 1 });
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

  const loadPodcastVideosFilter = async () => {
    try {
      setLoading(true);
      const res = await getPodcasts({ page: 1, filter: generateFilter() });
      setVideos(res);
      setLoading(false);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPodcastVideos();
  }, [page]);

  useEffect(() => {
    loadPodcastVideosFilter();
  }, [filter]);

  return (
    <div className="">
      <div className="mb-5 flex justify-between items-center">
        <Input
          className="w-96 rounded-none"
          placeholder="Search Podcast ..."
          value={filter.search}
          onChange={(e) => {
            setFilter((prev) => ({
              ...prev,
              search: e.target.value,
            }));
          }}
        />
        <Select
          onValueChange={(v) => setFilter((prev) => ({ ...prev, category: v }))}
          value={filter.category}
        >
          <SelectTrigger className="w-[180px]  rounded-none ">
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            {data.items.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
        {videos?.items.map((video) => (
          <LiveVideoView
            key={video.id}
            video={video}
            category={data.items}
            onUpdate={(e) => {
              setVideos((prev) => {
                if (prev) {
                  return {
                    ...prev,
                    items: prev.items.map((item) =>
                      item.id === e.id ? e : item
                    ),
                  };
                }
                return prev;
              });
            }}
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
                await deletePodcast(v.id);
              } catch (error) {
                console.error("Failed to delete video:", error);
                toast.error("Failed to delete video");
              }
            }}
          />
        ))}
        <NewLive
          category={data.items}
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

export default PodcastVideos;
