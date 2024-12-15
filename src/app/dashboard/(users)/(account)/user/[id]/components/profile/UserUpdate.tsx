import { UserItem } from "@/interfaces/user";
import CompanyProfile from "./CompanyProfile";
import ManagePorfile from "./ManagePorfile";

function UpdateUser({ profile }: { profile: UserItem }) {
  return (
    <div className="mt-5">
      {profile.user_type != "partner" && <ManagePorfile user={profile} />}
      {profile.user_type == "partner" && <CompanyProfile user={profile} />}
    </div>
  );
}

export default UpdateUser;
