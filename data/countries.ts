import countriesData from 'world-countries';

export const countries = countriesData
    .map((country) => country.name.common)
    .sort((a, b) => a.localeCompare(b));
