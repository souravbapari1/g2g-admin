import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import PodcastVideos from "./PodcastVideos";
import { getPodcastCategory } from "../category/actions";

export const revalidate = 0;
export default async function Page() {
  const data = await getPodcastCategory();
  return (
    <WorkSpace>
      <WorkHeader title="Podcast Videos" />
      <div className="flex mt-5 flex-1 flex-col gap-4 p-4 pt-0">
        <PodcastVideos data={data} />
      </div>
    </WorkSpace>
  );
}
