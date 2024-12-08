"use client";
import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDateTimeFromString } from "@/helper/dateTime";
import { Collection } from "@/interfaces/collection";
import { useEffect, useRef, useState } from "react";
import { getMcSubmits } from "./actions";
import { ImpactDataItem } from "./impact";
import { IoClose } from "react-icons/io5";

function ImpactList() {
  const { partnerListGlobal, ambassadorListGlobal } = useGlobalDataSetContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Collection<ImpactDataItem>>();
  const [page, setPage] = useState(1);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sponsor, setSponsor] = useState("");
  const [userType, setUserType] = useState("");
  const [ambassador, setAmbassador] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const getFilteredData = () => {
    const filters = [];

    if (searchTerm) {
      filters.push(
        `user.id~'${searchTerm}' || id~'${searchTerm}' || userData.name~'${searchTerm}' || user.first_name~'${searchTerm}' || user.last_name~'${searchTerm}' || user.email~'${searchTerm}' || user.mobile_no~'${searchTerm}'`
      );
    }

    if (sponsor) {
      filters.push(`micro_action.partners~'${sponsor}'`);
    }
    if (ambassador) {
      filters.push(`refer='${ambassador}'`);
    }
    if (userType) {
      filters.push(`user.user_type='${userType}'`);
    }
    if (from && to) {
      if (from === to) {
        // For the same day, filter from 00:00:00 to 23:59:59
        filters.push(
          `created>='${from} 00:00:00' && created<='${to} 23:59:59'`
        );
      } else {
        // For a date range
        filters.push(`created>='${from}' && created<='${to}'`);
      }
    } else if (from) {
      // Only start date specified
      filters.push(`created>='${from}'`);
    } else if (to) {
      // Only end date specified
      filters.push(`created<='${to}'`);
    }

    // Join filters using '&&' if any filters exist
    return filters.length > 0 ? `(${filters.join(" && ")})` : "";
  };

  const loadData = async (loadMore: boolean = false) => {
    setLoading(true);
    if (loadMore) {
      const orders = await getMcSubmits(page + 1, getFilteredData());
      setData((prevData) => ({
        ...orders,
        items: [...(prevData?.items || []), ...orders?.items],
      }));
      setPage(page + 1);
    } else {
      const orders = await getMcSubmits(1, getFilteredData());
      setPage(1);
      setData(orders);
    }
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, sponsor, userType, from, to, ambassador]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loading &&
          (data?.totalPages || 0) > page
        ) {
          loadData(true);
        }
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [loading, page, data]);

  return (
    <div className="">
      <div className="w-full bg-gray-100 flex justify-between items-center">
        <Input
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="Search by Name Or User ID"
          className="bg-gray-100 border-none "
        />
        <div className="flex justify-end items-center">
          <Select value={sponsor} onValueChange={setSponsor}>
            <SelectTrigger className="w-[130px] border-none bg-gray-100">
              <SelectValue placeholder="Sponsors" />
            </SelectTrigger>
            <SelectContent>
              {partnerListGlobal.map((partner) => (
                <SelectItem key={partner.id} value={partner.id}>
                  {partner.first_name} {partner.last_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={ambassador} onValueChange={setAmbassador}>
            <SelectTrigger className="w-[130px] border-none bg-gray-100">
              <SelectValue placeholder="Refer" />
            </SelectTrigger>
            <SelectContent>
              {ambassadorListGlobal.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.first_name} {user.last_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={userType} onValueChange={setUserType}>
            <SelectTrigger className="w-[130px] border-none bg-gray-100">
              <SelectValue placeholder="User Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="ambassador">Ambassador</SelectItem>
              <SelectItem value="partner">Partner</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex justify-center items-center">
            <p className="text-sm">From:</p>
            <Input
              onChange={(e) => setFrom(e.target.value)}
              value={from}
              type="date"
              className="bg-gray-100 border-none block w-36"
            />
          </div>
          <div className="flex justify-center items-center">
            <p className="text-sm">To:</p>
            <Input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              type="date"
              className="bg-gray-100 border-none block w-36"
            />
          </div>
          {getFilteredData() && (
            <div
              onClick={() => {
                setFrom("");
                setTo("");
                setSearchTerm("");
                setSponsor("");
                setUserType("");
                setAmbassador("");
              }}
              className="w-6 rounded-full mx-5 flex justify-center cursor-pointer items-center h-4 bg-red-500"
            >
              <IoClose color="white" size={14} />
            </div>
          )}
        </div>
      </div>
      <div className="tableWrapper  max-h-[70vh]">
        <table className="tblView max-h-auto h-auto ">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>EMail</th>
              <th>Mobile</th>
              <th>Country</th>
              <th>City</th>
              <th>User Type</th>
              <th># of Submitted Units</th>
              <th>Total Kg of CO₂ Saved</th>
              <th>Submitted Date - Time</th>
              <th>Refer to</th>
            </tr>
          </thead>
          <tbody>
            {data?.items?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.userData.name}</td>
                <td>{item.userData.email}</td>
                <td>{item.userData.mobile_no}</td>
                <td>{item.userData.country || "N/A"}</td>
                <td>{item.userData.city || "N/A"}</td>
                <td className="capitalize">
                  {item.user ? item.expand.user?.user_type : "N/A"}
                </td>
                <td className="text-center">{item.submit}</td>
                <td className="text-center">{item.impact}</td>
                <td>{formatDateTimeFromString(item.created)}</td>
                <td>
                  {item.refer
                    ? item.expand.refer?.first_name +
                      " " +
                      item.expand.refer?.last_name
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          ref={observerRef}
          className="flex bg-white w-full justify-center items-center mt-10"
        >
          {loading && <LoadingSpinner />}
        </div>
      </div>
    </div>
  );
}

export default ImpactList;
