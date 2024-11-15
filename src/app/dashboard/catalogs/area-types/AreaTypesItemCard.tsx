import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { MeasurementItem } from "@/interfaces/measurement";
import { extractErrors } from "@/request/actions";
import { deleteAreaType } from "@/request/worker/catalogs/areaType";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface AreaTypeItemRowProps {
  item: MeasurementItem & { color?: string };
  index: number;
  onEdit: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
}

function AreaTypeItemRow({
  item,
  index,
  onEdit,
  onDelete,
}: AreaTypeItemRowProps) {
  const [name, setName] = useState(item.name);
  const [isEditing, setIsEditing] = useState(false); // Track editing state

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleBlurOrEnter = () => {
    if (isEditing) {
      if (name !== item.name) {
        onEdit(item.id, name); // Update only if there's a change
      }
      setIsEditing(false); // Exit editing mode
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlurOrEnter(); // Call onEdit if Enter is pressed
      e.currentTarget.blur(); // Remove focus to indicate save
    }
  };

  return (
    <TableRow>
      <TableCell className="text-center border w-20">{index}</TableCell>
      <TableCell
        className="border cursor-pointer"
        onDoubleClick={() => setIsEditing(true)} // Enable editing on double click
      >
        <div className="flex justify-start items-center gap-5">
          <div
            className="w-4 h-4 rounded-full border"
            style={{ background: item.color }}
          />
          {isEditing ? (
            <Input
              className="rounded-none"
              value={name}
              onChange={handleNameChange}
              onBlur={handleBlurOrEnter} // Trigger edit on blur
              onKeyDown={handleKeyDown} // Trigger edit on Enter
            />
          ) : (
            name // Show name when not editing
          )}
        </div>
      </TableCell>
      <TableCell className="border text-center w-32">
        <Button
          onClick={async () => {
            try {
              if (confirm("Are you sure you want to delete this area type?")) {
                onDelete(item.id);
              }
            } catch (e: any) {
              console.log(e);
              const errors = extractErrors(e?.response);
              toast.error(errors[0]);
            }
          }}
          variant="destructive"
          size="sm"
        >
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default AreaTypeItemRow;
