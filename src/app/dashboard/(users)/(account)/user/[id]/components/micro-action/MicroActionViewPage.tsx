import { getMicroActions } from "./actions";
import MicroActionsList from "./MicroActionsList";
import MicroActionView from "./MicroActionView";
import MicroAbout from "./MicroAbout";
import { useQuery } from "react-query";

function MicroActionViewPage() {
  const data = useQuery({
    queryKey: ["micro-actions"],
    queryFn: async () => {
      return await getMicroActions();
    },
  });

  return (
    <>
      <MicroActionView />
      <MicroActionsList data={data?.data?.items} />
      <MicroAbout />
    </>
  );
}

export default MicroActionViewPage;
