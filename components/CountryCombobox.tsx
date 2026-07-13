'use client';

import { useMemo, useState } from 'react';
import { countries } from '@/data/countries';

type Props = {
    value: string;
    onChange: (value: string) => void;
    className?: string;
};

export function CountryCombobox({ value, onChange, className }: Props) {
    const [search, setSearch] = useState(value);
    const [open, setOpen] = useState(false);

    const filteredCountries = useMemo(() => {
        return countries.filter((country) =>
            country.toLowerCase().includes(search.toLowerCase()),
        );
    }, [search]);

    function selectCountry(country: string) {
        setSearch(country);
        onChange(country);
        setOpen(false);
    }

    return (
        <div className="relative">
            <input
                value={search}
                onFocus={() => setOpen(true)}
                onChange={(e) => {
                    setSearch(e.target.value);
                    onChange('');
                    setOpen(true);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && filteredCountries[0]) {
                        e.preventDefault();
                        selectCountry(filteredCountries[0]);
                    }

                    if (e.key === 'Escape') {
                        setOpen(false);
                    }
                }}
                placeholder="Search country"
                className={className}
            />

            {open && search && filteredCountries.length > 0 && (
                <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-[rgba(144,181,213,0.28)] bg-[#07182d] text-[#edf6ff] shadow-[0_18px_44px_rgba(0,0,0,0.38)]">
                    {filteredCountries.map((country) => (
                        <button
                            key={country}
                            type="button"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                selectCountry(country);
                            }}
                            className="block w-full px-3 py-2 text-left text-[#edf6ff] hover:bg-[rgba(158,216,255,0.12)]"
                        >
                            {country}
                        </button>
                    ))}
                </div>
            )}

            <input type="hidden" name="country" value={value} />
        </div>
    );
}
