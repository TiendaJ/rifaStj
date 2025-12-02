import React from 'react';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-5xl mx-auto my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            {children}
        </div>
    );
}
