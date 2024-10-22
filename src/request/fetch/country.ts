import { client } from "../actions";
import { NextClient } from "../request";

const _countryCityApi = new NextClient("https://countriesnow.space");
export interface CountryList {
  error: boolean;
  msg: string;
  data: Country[];
}

export interface Country {
  iso2: string;
  iso3: string;
  country: string;
  cities: string[];
}

export const getCountryCity = async () => {
  let req: Country[] = [];
  if (typeof window !== "undefined" && window.localStorage) {
    const data = window.localStorage.getItem("CountryList");
    if (data) {
      req = JSON.parse(data);
    }
  }
  if (req.length == 0) {
    req = await _countryCityApi.get("api/v0.1/countries").send<Country[]>();
    console.log(req);

    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem("CountryList", JSON.stringify(req));
    }
  }
  return req;
};
