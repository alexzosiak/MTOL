"use client";

import WorldMap, { type ISOCode } from "react-svg-worldmap";

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
    <div className="px-[18px] pt-4 pb-1 [&_svg]:block [&_svg]:max-h-[420px]">
      <WorldMap
        color="#3157d5"
        valueSuffix="visitors"
        size="responsive"
        data={mapData}
      />
    </div>
  );
}
