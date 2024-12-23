import React from 'react';

export const Alert = ({ children, variant = "default", className }) => {
    let baseStyles = "rounded-md border p-4";
    if (variant === "destructive") baseStyles += " border-red-500 bg-red-100 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-50";
    return (
        <div className={`${baseStyles} ${className || ''}`} role="alert">
            {children}
        </div>
    );
};

export const AlertDescription = ({ children, className }) => (
    <p className={`text-sm ${className || ''}`}>{children}</p>
);