"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { client } from "@/request/actions";
import { getUsers } from "@/request/worker/users/manageUsers";
import { Input } from "../input";

type ComboboxItem = {
  value: string;
  label: string;
};

type ComboboxProps = {
  placeholder?: string;
  buttonWidth?: string;
  className?: string;
  defaultValue?: string;
  onSelect: (value: string) => void;
  withUsers?: boolean;
};

export function ComboboxUser({
  placeholder = "Select an user...",
  defaultValue,
  onSelect,
  className,
  withUsers = true,
}: ComboboxProps) {
  const [search, setSearch] = React.useState<string>("");
  const [items, setitems] = React.useState<ComboboxItem[]>([]);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue || "");

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue;
    setValue(newValue);
    onSelect(newValue);
    setOpen(false);
  };

  const findUser = async () => {
    const res = await getUsers(
      1,
      `(first_name~'${search}' || last_name~'${search}'${
        withUsers == false ? " && role!='USER'" : ""
      })`
    );
    setitems(
      res.items.map((item) => ({
        value: item.id,
        label: `${item.first_name} ${item.last_name}`,
      }))
    );
  };
  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        findUser();
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [search]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
          ref={ref}
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={`w-full p-0`}
        style={{ width: ref.current?.clientWidth }}
      >
        <Command>
          <div
            className="flex items-center border-b px-3"
            cmdk-input-wrapper=""
          >
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              autoComplete="off"
              placeholder="Search Users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={cn(
                "flex h-11 w-full rounded-md  border-none bg-transparent px-2 py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              )}
            />
          </div>
          <CommandList>
            <CommandEmpty>
              {search.length == 0 ? "Search Users" : "No User Found"}
            </CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
