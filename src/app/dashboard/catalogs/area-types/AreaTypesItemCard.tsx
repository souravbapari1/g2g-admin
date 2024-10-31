import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MeasurementItem } from "@/interfaces/measurement";
import { extractErrors } from "@/request/actions";
import { deleteAreaType } from "@/request/worker/catalogs/areaType";
import { deleteMeasurement } from "@/request/worker/measurement/measurement";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface AreaTypeItemCardProps {
  item: MeasurementItem;
  onEdit: (id: string, newName: string) => void;
}

function AreaTypeItemCard({ item, onEdit }: AreaTypeItemCardProps) {
  const [name, setName] = React.useState(item.name);
  const [isDelete, setDelete] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleBlurOrEnter = () => {
    if (name !== item.name) {
      onEdit(item.id, name); // Update only if there's a change
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlurOrEnter(); // Call onEdit if Enter is pressed
      e.currentTarget.blur(); // Optionally remove focus to indicate save
    }
  };

  if (isDelete) {
    return <></>;
  }

  return (
    <div className="flex justify-start items-center">
      <Input
        className="rounded-none"
        placeholder="Enter Measurement"
        value={name}
        onChange={handleNameChange}
        onBlur={handleBlurOrEnter} // Trigger edit on blur
        onKeyDown={handleKeyDown} // Trigger edit on Enter
      />
      <Button
        onClick={async () => {
          try {
            if (confirm("Are you sure you want to delete this area type?")) {
              await deleteAreaType(item.id);
              setDelete(true);
            }
          } catch (e: any) {
            console.log(e);
            const errors = extractErrors(e?.response);
            toast.error(errors[0]);
          }
        }}
        variant="destructive"
        className="rounded-none border-l-0"
      >
        Remove
      </Button>
    </div>
  );
}

export default AreaTypeItemCard;
