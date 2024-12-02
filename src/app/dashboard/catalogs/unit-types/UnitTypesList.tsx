"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTriggerContext } from "@/components/context/triggerContecxt";
import { Collection } from "@/interfaces/collection";
import { UnitItem } from "@/interfaces/units";
import { getUnitTypes } from "@/request/worker/catalogs/unitTypes";
import { Filter, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import UnitItemView from "./manage/UnitItemView";
import { Input } from "@/components/ui/input";
import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function UnitTypesList({
  allowEdit = true,
  defaultUnitType,
}: {
  allowEdit?: boolean;
  defaultUnitType?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [unitTypeData, setUnitTypeData] = useState<Collection<UnitItem>>();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProjectType, setSelectedProjectType] = useState<
    string | undefined
  >();
  const [selectedMeasurement, setSelectedMeasurement] = useState<
    string | undefined
  >();
  const [selectedSDG, setSelectedSDG] = useState<string | undefined>();
  const abortController = new AbortController();
  const { unitTypeTrigger } = useTriggerContext();
  const { measurementListGlobal, projectTypeListGlobal, sdgListGlobal } =
    useGlobalDataSetContext();

  const filterQuery = useCallback(() => {
    const query: string[] = [];
    if (searchTerm) query.push(`name~'${searchTerm}'`);
    if (selectedProjectType)
      query.push(`project_type~'${selectedProjectType}'`);
    if (selectedMeasurement) query.push(`unit='${selectedMeasurement}'`);
    if (selectedSDG) query.push(`sdg~'${selectedSDG}'`);
    if (defaultUnitType) {
      query.push(`prefix~'${defaultUnitType}'`);
    }
    return query.length > 0 ? `(${query.join(" && ")})` : "";
  }, [searchTerm, selectedProjectType, selectedMeasurement, selectedSDG]);

  const loadData = useCallback(
    async (loadMore = false) => {
      setLoading(true);
      try {
        const nextPage = loadMore ? page + 1 : 1;
        const data = await getUnitTypes(
          nextPage,
          filterQuery(),
          abortController.signal
        );

        setUnitTypeData((prevData) =>
          loadMore && prevData
            ? {
                ...data,
                items: [...prevData.items, ...data.items],
              }
            : data
        );

        if (loadMore) setPage(nextPage);
        else setPage(1);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    },
    [filterQuery, page]
  );

  useEffect(() => {
    loadData();
    return () => abortController.abort();
  }, [
    unitTypeTrigger,
    selectedProjectType,
    selectedMeasurement,
    selectedSDG,
    searchTerm,
  ]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setPage(1);
      loadData();
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedProjectType(undefined);
    setSelectedMeasurement(undefined);
    setSelectedSDG(undefined);
    setPage(1);
    setShowFilter(false);
  };

  const [showFilter, setShowFilter] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between ">
        {!showFilter && (
          <Filter
            size={20}
            className="mb-2 cursor-pointer "
            onClick={() => setShowFilter(true)}
          />
        )}
        {showFilter && (
          <div className="flex">
            <Input
              placeholder="Search Unit Type"
              className="rounded-none w-60"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyUp={handleSearch}
            />
            <Select
              value={selectedProjectType}
              onValueChange={setSelectedProjectType}
              defaultValue={selectedProjectType}
            >
              <SelectTrigger className="w-[180px] rounded-none">
                <SelectValue placeholder="Project Type" />
              </SelectTrigger>
              <SelectContent>
                {projectTypeListGlobal?.map((projectType) => (
                  <SelectItem key={projectType.id} value={projectType.id}>
                    {projectType.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedMeasurement}
              defaultValue={selectedMeasurement}
              onValueChange={setSelectedMeasurement}
            >
              <SelectTrigger className="w-[180px] rounded-none">
                <SelectValue placeholder="Unit Measurement" />
              </SelectTrigger>
              <SelectContent>
                {measurementListGlobal?.map((measurement) => (
                  <SelectItem key={measurement.id} value={measurement.name}>
                    {measurement.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedSDG}
              defaultValue={selectedSDG}
              onValueChange={setSelectedSDG}
            >
              <SelectTrigger className="w-[180px] rounded-none">
                <SelectValue placeholder="SDG" />
              </SelectTrigger>
              <SelectContent>
                {sdgListGlobal?.map((sdg) => (
                  <SelectItem key={sdg.id} value={sdg.id}>
                    {sdg.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={clearFilters}
              className="rounded-none"
              variant="secondary"
            >
              Clear All Filters
            </Button>
          </div>
        )}
        <p>Total Unit Types: {unitTypeData?.totalItems || 0}</p>
      </div>

      <Table className="overflow-auto border">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-[100px] text-center border">
              S No.
            </TableHead>
            <TableHead className="border-r text-center">Unit Type</TableHead>
            <TableHead className="border-r text-center">Project Type</TableHead>
            <TableHead className="border-r text-center">Parameters</TableHead>
            <TableHead className="text-center border-r">Unit</TableHead>
            <TableHead className="text-center border-r">ORM/Unit</TableHead>
            {allowEdit && (
              <TableHead className="text-center w-36">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {unitTypeData?.items.map((unit, i) => (
            <UnitItemView
              index={i + 1}
              unit={unit}
              key={unit.id}
              allowEdit={allowEdit}
            />
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center items-center mt-10">
        {loading && <LoadingSpinner />}
        {!loading &&
          unitTypeData &&
          unitTypeData?.totalPages > unitTypeData.page && (
            <Button variant="secondary" onClick={() => loadData(true)}>
              Load More
            </Button>
          )}
      </div>
    </div>
  );
}
