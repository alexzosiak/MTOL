'use client';

import dynamic from 'next/dynamic';
import { countryCodes } from '@/data/countries';

const WorldMap = dynamic(() => import('react-svg-worldmap'), { ssr: false });

type CountryData = {
    country: string;
    count: number;
};

export function CountryWorldMap({ data }: { data: CountryData[] }) {
    const mapData = data
        .map((item) => ({
            country: countryCodes[item.country],
            value: item.count,
        }))
        .filter((item) => item.country);

    return (
        <div className="min-w-0 overflow-hidden px-[18px] pt-4 pb-1 [&_.country-world-map]:min-w-0 [&_.country-world-map_figure]:m-0 [&_.country-world-map_figure]:flex [&_.country-world-map_figure]:w-full [&_.country-world-map_figure]:justify-center [&_.country-world-map_figure]:overflow-hidden [&_.country-world-map_svg]:block [&_.country-world-map_svg]:h-auto [&_.country-world-map_svg]:max-w-full">
            <WorldMap
                color="#3157d5"
                valueSuffix="visitors"
                size="responsive"
                data={mapData}
                containerClassName="country-world-map"
            />
        </div>
    );
}
