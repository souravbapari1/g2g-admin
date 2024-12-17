import OtherOrdersList from "@/app/dashboard/orders/others-orders/OtherOrdersList";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";

function page() {
  return (
    <WorkSpace>
      <WorkHeader title="Tree Orders" />
      <OtherOrdersList />
    </WorkSpace>
  );
}

export default page;
