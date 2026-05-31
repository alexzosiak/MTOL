"use client";

import WorldMap, { type ISOCode } from "react-svg-worldmap";
import styles from "./CountryWorldMap.module.css";

type CountryData = {
  country: string;
  count: number;
};

const countryCodes: Record<string, ISOCode> = {
  Ukraine: "ua",
  Ireland: "ie",
  Germany: "de",
  France: "fr",
  Poland: "pl",
  "United Kingdom": "gb",
  USA: "us",
};

export function CountryWorldMap({ data }: { data: CountryData[] }) {
  const mapData = data
    .map((item) => ({
      country: countryCodes[item.country],
      value: item.count,
    }))
    .filter((item) => item.country);

  return (
    <div className={styles.map}>
      <WorldMap
        color="#3157d5"
        valueSuffix="visitors"
        size="responsive"
        data={mapData}
      />
    </div>
  );
}
