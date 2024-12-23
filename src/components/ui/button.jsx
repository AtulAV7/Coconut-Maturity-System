import React from 'react';

export const Button = ({ children, onClick, className, disabled, type, variant = "default", size = "default", ...props }) => {
    let baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-slate-100 dark:bg-slate-950 dark:text-slate-50 dark:focus:ring-slate-800";
    if (variant === "outline") baseStyles += " border border-slate-200 bg-white hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800";
    if (variant === "ghost") baseStyles += " hover:bg-slate-100 dark:hover:bg-slate-800";
    if (variant === "destructive") baseStyles += " bg-red-500 hover:bg-red-600 text-white dark:bg-red-900 dark:hover:bg-red-950";

    if (size === "sm") baseStyles += " px-3 py-2 text-xs";
    if (size === "lg") baseStyles += " px-8 py-3 text-sm";

    return (
        <button type={type} disabled={disabled} onClick={onClick} className={`${baseStyles} ${className || ''}`} {...props}>
            {children}
        </button>
    );
};