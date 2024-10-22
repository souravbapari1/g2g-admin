"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

// Sample data
const treeData = [
  {
    type: "Oak",
    price: 40,
    hectareRestored: 2.5,
    co2Removal: 10,
    co2Storage: 500,
    airQuality: 120,
    rainObserved: 3000,
    energySaved: 150,
    state: "Active",
  },
  {
    type: "Pine",
    price: 50,
    hectareRestored: 3.0,
    co2Removal: 15,
    co2Storage: 700,
    airQuality: 140,
    rainObserved: 3500,
    energySaved: 200,
    state: "Inactive",
  },
];

export function TreesManagement() {
  const [trees, setTrees] = useState(treeData);

  const handleEdit = (index: any) => {
    // Add edit functionality here
    console.log(`Edit tree at index ${index}`);
  };

  const handleChangeState = (index: any) => {
    const updatedTrees = [...trees];
    updatedTrees[index].state =
      updatedTrees[index].state === "Active" ? "Inactive" : "Active";
    setTrees(updatedTrees);
  };

  const handleDelete = (index: any) => {
    const updatedTrees = trees.filter((_, i) => i !== index);
    setTrees(updatedTrees);
  };

  return (
    <Table className="overflow-auto">
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead>Tree Type</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Hectare Restored </TableHead>
          <TableHead>CO2 Removal </TableHead>
          <TableHead>CO2 Storage </TableHead>
          <TableHead>Air Quality</TableHead>
          <TableHead>Rain Observed </TableHead>
          <TableHead>Energy Saved </TableHead>
          <TableHead>State</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trees.map((tree, index) => (
          <TableRow key={index}>
            <TableCell>{tree.type}</TableCell>
            <TableCell>{tree.price} OMR</TableCell>
            <TableCell>{tree.hectareRestored} Kha</TableCell>
            <TableCell>{tree.co2Removal} ton/year</TableCell>
            <TableCell>{tree.co2Storage} kg/year</TableCell>
            <TableCell>{tree.airQuality} kg/year</TableCell>
            <TableCell>{tree.rainObserved}Liter/year</TableCell>
            <TableCell>{tree.energySaved} Kwatt/Hr</TableCell>
            <TableCell>{tree.state}</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
