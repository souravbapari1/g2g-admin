import WorkSpace from "@/components/ui/custom/WorkSpace";
import { getUserPaymentInfo } from "./actions/getUserPaymentData";
import UserViewItem from "./UserViewItem";

async function page({ params }: { params: { id: string } }) {
  const balance = await getUserPaymentInfo();

  return (
    <WorkSpace>
      <UserViewItem balance={balance} id={params.id} />
    </WorkSpace>
  );
}

export default page;
