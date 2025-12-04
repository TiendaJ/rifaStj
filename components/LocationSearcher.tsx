'use client';

import { useState, useEffect, useRef } from 'react';

import locationsData from '@/data/locations.json';

const LOCATIONS = locationsData as Location[];

type Location = {
    id: string;
    code: string;
    district: string;
    province: string;
    department: string;
    state: string;
};

export default function LocationSearcher({
    defaultDep,
    defaultProv,
    defaultDist
}: {
    defaultDep?: string | null,
    defaultProv?: string | null,
    defaultDist?: string | null
}) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Location[]>([]);
    const [selected, setSelected] = useState<Location | null>(() => {
        if (defaultDep && defaultProv && defaultDist) {
            const match = LOCATIONS.find(l =>
                l.department === defaultDep &&
                l.province === defaultProv &&
                l.district === defaultDist
            );
            if (match) return match;
            return {
                id: '', code: '', state: '',
                department: defaultDep,
                province: defaultProv,
                district: defaultDist
            } as Location;
        }
        return null;
    });
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (query.length > 2) {
            const lowerQuery = query.toLowerCase();
            const filtered = LOCATIONS.filter(l =>
                l.district.toLowerCase().includes(lowerQuery)
            ).slice(0, 50); // Limit results for performance
            setResults(filtered);
            setIsOpen(true);
        } else {
            setResults([]);
            setIsOpen(false);
        }
    }, [query]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handleSelect = (loc: Location) => {
        setSelected(loc);
        setQuery('');
        setIsOpen(false);
    };

    const clearSelection = () => {
        setSelected(null);
        setQuery('');
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación (Distrito)</label>

            {selected ? (
                <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="text-sm">
                        <span className="font-bold text-gray-900">{selected.district}</span>
                        <span className="text-gray-500 mx-2">-</span>
                        <span className="text-gray-600">{selected.province}, {selected.department}</span>
                    </div>
                    <button
                        type="button"
                        onClick={clearSelection}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <input type="hidden" name="departamento" value={selected.department} />
                    <input type="hidden" name="provincia" value={selected.province} />
                    <input type="hidden" name="distrito" value={selected.district} />
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar distrito (ej. Tarapoto)..."
                        className="input-tech"
                        autoComplete="off"
                    />
                    {isOpen && results.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                            {results.map((loc) => (
                                <button
                                    key={loc.id}
                                    type="button"
                                    onClick={() => handleSelect(loc)}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm border-b border-gray-100 last:border-0 transition-colors"
                                >
                                    <span className="font-bold text-gray-900">{loc.district}</span>
                                    <div className="text-xs text-gray-500">{loc.province} - {loc.department}</div>
                                </button>
                            ))}
                        </div>
                    )}
                    {isOpen && results.length === 0 && query.length > 2 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm text-gray-500 text-center">
                            No se encontraron resultados
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
