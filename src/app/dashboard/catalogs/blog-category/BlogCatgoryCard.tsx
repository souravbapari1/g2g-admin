import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { BlogCategoryItem } from "@/interfaces/category";
import { extractErrors } from "@/request/actions";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface BlogCatgoryCardProps {
  item: BlogCategoryItem;
  index: number;
  onEdit: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
}

function BlogCatgoryCard({
  item,
  index,
  onEdit,
  onDelete,
}: BlogCatgoryCardProps) {
  const [name, setName] = useState(item.title);
  const [isEditing, setIsEditing] = useState(false); // Track editing state

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleBlurOrEnter = () => {
    if (isEditing) {
      if (name !== item.title) {
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

export default BlogCatgoryCard;
