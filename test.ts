import countryCity from "./src/data/country-city.json";
import fs from "fs";
const data = countryCity.map((e) => {
  return {
    country: e.name,
    cities: e.cities.map((e) => {
      return e.name;
    }),
  };
});

console.log(data);
fs.writeFileSync(
  "test.json",
  JSON.stringify({
    error: false,
    msg: "countries and cities retrieved",
    data: data,
  })
);
