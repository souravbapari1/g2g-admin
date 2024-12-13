import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserItem } from "@/interfaces/user";

function PartnersInfo({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserItem;
}) {
  return (
    <Dialog>
      <DialogTrigger className="flex justify-center items-center">
        {children}
      </DialogTrigger>
      <DialogContent>
        <div className="">
          <p className="font-bold text-gray-800 text-sm ">
            Resons to be our partener
          </p>
          <p className="text-sm">
            {user.expand?.company?.resonses.map((item) => (
              <li>{item}</li>
            ))}
          </p>
        </div>
        <div>
          <p className="font-bold text-gray-800 text-sm ">
            Your Annual Bduget to acheive your Environmental and Social Goals /
            Marketing (OMR)
          </p>
          <p className="text-sm">
            <li>{user.expand?.company?.summery?.annualBudget || "N/A"}</li>
          </p>
        </div>
        <div>
          <p className="font-bold text-gray-800 text-sm ">
            What are the most categories you are looking to consider ?
          </p>
          <p className="text-sm">
            <li>
              {user.expand?.company?.summery?.categoriesConsider || "N/A"}
            </li>
          </p>
        </div>
        <div>
          <p className="font-bold text-gray-800 text-sm ">Other Comments</p>
          <p className="text-sm">
            <li>{user.expand?.company?.summery?.othersComment || "N/A"}</li>
          </p>
        </div>
        <div>
          <p className="font-bold text-gray-800 text-sm ">
            From where you heard about u
          </p>
          <p className="text-sm">
            <li>{user.expand?.company?.about_us || "N/A"}</li>
          </p>
        </div>
        {user.expand?.company?.approved_status == "rejected" && (
          <div>
            <p className="font-bold text-gray-800 text-sm ">
              Rejecting Resons and By who
            </p>
            <p className="text-sm">
              <li>{user.expand?.company?.rejectReason || "N/A"}</li>
              <li>
                By : -{" "}
                {user.expand?.company?.expand?.updateBy?.first_name +
                  " " +
                  user.expand?.company?.expand?.updateBy?.last_name ||
                  "N/A" ||
                  "N/A"}
              </li>
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default PartnersInfo;
