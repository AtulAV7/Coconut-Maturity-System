import React from 'react';

export const Card = ({ children, className }) => (
    <div className={`border rounded-lg p-4 shadow-md ${className || ''}`}>{children}</div>
);

export const CardHeader = ({ children }) => <div className="mb-2 font-bold">{children}</div>;
export const CardContent = ({ children }) => <div>{children}</div>;
export const CardTitle = ({ children }) => <h3 className="text-lg font-semibold">{children}</h3>
export const CardDescription = ({ children }) => <p className="text-sm text-gray-500">{children}</p>