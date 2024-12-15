"use client";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import { CountryDropdown } from "./country-dropdown";
import { useState } from "react";
import { CityDropdown } from "./city-dropdown";

function Page() {
  const index = 1;
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("kolkata");
  return (
    <WorkSpace>
      <CountryDropdown onChange={setCountry} value={country} />
      <CityDropdown onChange={setCity} value={city} country={country} />
    </WorkSpace>
  );
}

export default Page;
