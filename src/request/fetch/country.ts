import countryData from "@/data/citycountry.json";
export interface CountryList {
  error: boolean;
  msg: string;
  data: Country[];
}

export interface Country {
  country: string;
  cities: string[];
}
export const getCountryCity = () => {
  let req: CountryList = {
    error: false,
    msg: "",
    data: [],
  };
  if (typeof window !== "undefined" && window.localStorage) {
    const data = window.localStorage.getItem("CountryList");
    if (data) {
      req = JSON.parse(data);
    }
  }
  if (req.data.length == 0) {
    req = countryData as CountryList;
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem("CountryList", JSON.stringify(req));
    }
  }
  return req.data;
};
