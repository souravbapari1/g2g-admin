"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Collection } from "@/interfaces/collection";
import { Tree } from "@/interfaces/treeOrders";
import { getTrees } from "@/request/worker/orders/treeorders/manageTree";
import { useEffect, useRef, useState } from "react";

function TreeActivtyList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Collection<Tree>>();
  const [page, setPage] = useState(1);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadData = async (loadMore: boolean = false) => {
    setLoading(true);
    if (loadMore) {
      const orders = await getTrees(page + 1);
      setData((prevData) => ({
        ...orders,
        items: [...(prevData?.items || []), ...orders?.items],
      }));
      setPage(page + 1);
    } else {
      const orders = await getTrees(page);
      setData(orders);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && data!.totalPages > page) {
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
    <div className="relative">
      <div className="flex relative justify-between items-center mb-3">
        <div>
          <Input
            className="h-7 py-0 rounded-none"
            placeholder="Order Id,Name,Email"
          />
        </div>
        <div className="flex justify-end items-center gap-3">
          <Select>
            <SelectTrigger className="w-[150px] py-0 h-7 rounded-none">
              <SelectValue placeholder="Area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Area 1</SelectItem>
              <SelectItem value="dark">Area 2</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[150px] py-0 h-7 rounded-none">
              <SelectValue placeholder="Tree Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Name 1</SelectItem>
              <SelectItem value="dark">Name 2</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[150px] py-0 h-7 rounded-none">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Active</SelectItem>
              <SelectItem value="dark">Pending</SelectItem>
              <SelectItem value="dark">Cancel</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[150px] py-0 h-7 rounded-none">
              <SelectValue placeholder="Mapper" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">User 1</SelectItem>
              <SelectItem value="dark">User 2</SelectItem>
              <SelectItem value="dark">User 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table className="overflow-auto relative">
        <TableHeader className="sticky top-0">
          <TableRow className="bg-gray-100">
            <TableHead>Tree Id</TableHead>
            <TableHead>Tree Type</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Planted Date</TableHead>
            <TableHead>Mapped By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items.map((tree) => (
            <TableRow key={tree.treeId}>
              <TableCell>{tree.treeId}</TableCell>
              <TableCell className="capitalize">
                {tree?.treeType || "N/A"}
              </TableCell>
              <TableCell className="capitalize">
                {tree?.area?.areaName || "N/A"}
              </TableCell>
              <TableCell className="capitalize">
                {tree.status || "N/A"}
              </TableCell>
              <TableCell>{tree?.plant_date || "N/A"}</TableCell>
              <TableCell className="capitalize">
                {tree?.update_by
                  ? tree.expand?.update_by?.first_name +
                    " " +
                    tree.expand?.update_by?.last_name
                  : "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div ref={observerRef} className="flex justify-center items-center mt-10">
        {loading && <LoadingSpinner />}
      </div>
    </div>
  );
}

export default TreeActivtyList;
