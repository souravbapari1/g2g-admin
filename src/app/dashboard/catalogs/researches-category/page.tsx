import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import ResearchCategoryList from "./ResearchesCategoryList";

export default function Page() {
  return (
    <WorkSpace>
      <WorkHeader title="Researches Category" />

      <div className="flex flex-1 flex-col gap-4 p-4 ">
        <ResearchCategoryList />
      </div>
    </WorkSpace>
  );
}
