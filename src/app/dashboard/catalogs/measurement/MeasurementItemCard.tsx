import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MeasurementItem } from "@/interfaces/measurement";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
interface MeasurementItemRowProps {
  item: MeasurementItem;
  index: number;
  onEdit: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
}

function MeasurementItemRow({
  item,
  index,
  onEdit,
  onDelete,
}: MeasurementItemRowProps) {
  const [name, setName] = useState(item.name);
  const [editing, setEditing] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleSaveEdit = () => {
    if (name !== item.name) onEdit(item.id, name);
    setEditing(false);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this measurement?")) {
      onDelete(item.id);
    }
  };

  return (
    <TableRow>
      <TableCell className="text-center border-r w-20">{index}</TableCell>
      <TableCell
        className="text-left border-r select-none"
        onDoubleClick={() => setEditing(true)}
      >
        {editing ? (
          <Input
            value={name}
            className="border-none ring-0"
            onChange={handleNameChange}
            onBlur={handleSaveEdit}
            onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
            autoFocus
          />
        ) : (
          <p className="cursor-pointer w-full ">{name}</p>
        )}
      </TableCell>
      <TableCell className="text-center w-32">
        <Button onClick={handleDelete} size="sm" variant="destructive">
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default MeasurementItemRow;
