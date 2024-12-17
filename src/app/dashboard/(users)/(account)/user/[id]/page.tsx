import WorkSpace from "@/components/ui/custom/WorkSpace";
import { getUserPaymentInfo } from "./actions/getUserPaymentData";
import UserViewItem from "./UserViewItem";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

async function page({ params }: { params: { id: string } }) {
  const balance = await getUserPaymentInfo();

  return (
    <WorkSpace>
      <UserViewItem balance={balance} id={params.id} />
    </WorkSpace>
  );
}

export default page;
