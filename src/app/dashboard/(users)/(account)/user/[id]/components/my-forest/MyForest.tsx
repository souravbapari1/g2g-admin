"use client";

import TargetProgress from "./TargetProgress";

import { useEffect } from "react";

import { UserItem } from "@/interfaces/user";
import { genPbFiles, localClient } from "@/request/actions";
import Image from "next/image";
import { FaUsers } from "react-icons/fa";
import { MdOutlineFlag } from "react-icons/md";
import { useMyDonation } from "../orders/state/useMyDonations";
import UserMap from "./UserMap/UserMap";
function MyForest({
  user,
  preview = false,
}: {
  user: UserItem;
  preview?: boolean;
}) {
  const { loading, loadMyDonation, mydonation, status } = useMyDonation();

  useEffect(() => {
    if (mydonation.length == 0) {
      loadMyDonation(user.id);
    }
  }, []);

  return (
    <div>
      <div className="grid lg:grid-cols-3 gap-10 mb-10">
        <div className="bg-green-50 rounded-2xl border-2 relative shadow-sm border-white h-96 overflow-hidden">
          <Image
            src={localClient.baseUrl + "/assets/auth-bg.jpg"}
            width={1000}
            height={800}
            alt=""
            className="h-52 object-cover "
          />
          <div className="">
            <Image
              src={
                user.avatar != ""
                  ? genPbFiles(user, user.avatar)
                  : localClient.baseUrl + "/icons/unknown.webp"
              }
              width={1000}
              height={800}
              alt=""
              className="h-20 object-cover w-20 bg-white p-0 rounded-full  absolute m-auto left-0 right-0 -mt-10 shadow border-[3px] border-white"
            />
          </div>
          <h1 className="text-center mt-14 font-bold capitalize text-2xl text-gray-800">
            {user.first_name} {user.last_name}
          </h1>
        </div>
        <div className="h-96 rounded-2xl lg:col-span-2 overflow-hidden shadow-sm object-cover w-full bg-white">
          <div className="h-80 relative">
            <UserMap />
          </div>
          <div className="h-16 text-start text-green-950 text-sm flex justify-center items-center gap-8 w-full bg-primary/5">
            <div className="flex justify-center items-center gap-3">
              <div className="w-5 h-5 flex justify-center items-center text-white rounded-3xl bg-primary">
                <MdOutlineFlag />
              </div>
              <p>{status.country} Countries</p>
            </div>
            <div className="flex justify-center items-center gap-3">
              <div className="w-5 h-5 flex justify-center items-center text-white rounded-3xl bg-primary">
                <FaUsers />
              </div>
              <p>{status.projects} Project</p>
            </div>
          </div>
        </div>
      </div>
      {!loading && <TargetProgress user={user} />}
    </div>
  );
}

export default MyForest;
