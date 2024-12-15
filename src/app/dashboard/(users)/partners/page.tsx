import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import PartnersListTabs from "./PartnersListTabs";

export default function Page() {
  return (
    <WorkSpace>
      <WorkHeader title="Partners" />
      {/* <PartnersList /> */}
      <PartnersListTabs />
    </WorkSpace>
  );
}
