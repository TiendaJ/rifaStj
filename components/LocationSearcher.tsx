'use client';

import { useState, useEffect, useRef } from 'react';

// Simplified list of locations for demonstration. 
// In a real app, this should fetch from an API or a larger JSON file.
const LOCATIONS = [
    { dep: 'San Martin', prov: 'San Martin', dist: 'Tarapoto' },
    { dep: 'San Martin', prov: 'San Martin', dist: 'Morales' },
    { dep: 'San Martin', prov: 'San Martin', dist: 'Banda de Shilcayo' },
    { dep: 'San Martin', prov: 'San Martin', dist: 'Cacatachi' },
    { dep: 'San Martin', prov: 'San Martin', dist: 'Juan Guerra' },
    { dep: 'San Martin', prov: 'Moyobamba', dist: 'Moyobamba' },
    { dep: 'San Martin', prov: 'Rioja', dist: 'Rioja' },
    { dep: 'Lima', prov: 'Lima', dist: 'Miraflores' },
    { dep: 'Lima', prov: 'Lima', dist: 'San Isidro' },
    { dep: 'Lima', prov: 'Lima', dist: 'Santiago de Surco' },
    { dep: 'Lima', prov: 'Lima', dist: 'La Molina' },
    { dep: 'Lima', prov: 'Lima', dist: 'San Borja' },
    { dep: 'Lima', prov: 'Lima', dist: 'Lima' },
    { dep: 'Arequipa', prov: 'Arequipa', dist: 'Arequipa' },
    { dep: 'Cusco', prov: 'Cusco', dist: 'Cusco' },
    { dep: 'La Libertad', prov: 'Trujillo', dist: 'Trujillo' },
    { dep: 'Lambayeque', prov: 'Chiclayo', dist: 'Chiclayo' },
    { dep: 'Piura', prov: 'Piura', dist: 'Piura' },
    { dep: 'Loreto', prov: 'Maynas', dist: 'Iquitos' },
    { dep: 'Ucayali', prov: 'Coronel Portillo', dist: 'Pucallpa' },
];

type Location = {
    dep: string;
    prov: string;
    dist: string;
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
    const [selected, setSelected] = useState<Location | null>(
        defaultDep && defaultProv && defaultDist
            ? { dep: defaultDep, prov: defaultProv, dist: defaultDist }
            : null
    );
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (query.length > 1) {
            const filtered = LOCATIONS.filter(l =>
                l.dist.toLowerCase().includes(query.toLowerCase()) ||
                l.prov.toLowerCase().includes(query.toLowerCase()) ||
                l.dep.toLowerCase().includes(query.toLowerCase())
            );
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
                        <span className="font-bold text-gray-900">{selected.dist}</span>
                        <span className="text-gray-500 mx-2">-</span>
                        <span className="text-gray-600">{selected.prov}, {selected.dep}</span>
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
                    <input type="hidden" name="departamento" value={selected.dep} />
                    <input type="hidden" name="provincia" value={selected.prov} />
                    <input type="hidden" name="distrito" value={selected.dist} />
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
                            {results.map((loc, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => handleSelect(loc)}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm border-b border-gray-100 last:border-0 transition-colors"
                                >
                                    <span className="font-bold text-gray-900">{loc.dist}</span>
                                    <div className="text-xs text-gray-500">{loc.prov} - {loc.dep}</div>
                                </button>
                            ))}
                        </div>
                    )}
                    {isOpen && results.length === 0 && query.length > 1 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm text-gray-500 text-center">
                            No se encontraron resultados
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
