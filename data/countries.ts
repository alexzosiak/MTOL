import countriesData from 'world-countries';
import type { ISOCode } from 'react-svg-worldmap';

export const countries = countriesData
    .map((country) => country.name.common)
    .sort((a, b) => a.localeCompare(b));

    export const countryCodes = Object.fromEntries(
    countriesData.map((country) => [
        country.name.common,
        country.cca2.toLowerCase(),
    ]),
) as Record<string, ISOCode>;