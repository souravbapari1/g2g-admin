"use client";

import { ChevronDown, Search } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useMutation } from "react-query";
import Image from "next/image";

export function CountryDropdown({
  onChange,
  value,
  className,
}: {
  value: string;
  onChange: (e: string) => void;
  className?: string;
}) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const host = "https://country-city.grey-to-green.com";
  const [open, setOpen] = React.useState(false);

  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState<
    {
      id: number;
      name: string;
      alpha2: string;
      alpha3: string;
      icon: string;
    }[]
  >();

  const searchCountry = useMutation({
    mutationKey: ["country"],
    mutationFn: async () => {
      const data = await fetch(host + "?search=" + search);
      return await data.json();
    },
    onSuccess(data) {
      setData(data);
    },
  });

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim()) {
        searchCountry.mutate();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[900px] justify-between", className)}
        >
          {value ? value : "Select Country..."}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[300px] p-0"
        style={{ width: ref.current?.clientWidth }}
      >
        <Command>
          <div
            className="flex items-center border-b px-3"
            cmdk-input-wrapper=""
          >
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              placeholder="Search Country"
              autoComplete="off"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={cn(
                "flex h-11 w-full rounded-md  border-none bg-transparent px-2 py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              )}
            />
          </div>
          <CommandList>
            <CommandEmpty>No Country Found.</CommandEmpty>
            <CommandGroup>
              {data?.map((country) => (
                <CommandItem
                  key={country.id}
                  value={country.name}
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  <Image
                    src={host + country.icon}
                    alt=""
                    width={50}
                    height={50}
                    className="w-5 h-5 mr-5 object-cover"
                  />
                  {country.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
