import React from 'react';

export const Input = ({ label, type = 'text', error, className = '', ...props }) => {
  return (
    <div className="flex flex-col space-y-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`
          px-4 py-2.5 bg-white border rounded-lg text-sm text-slate-900 
          transition-all duration-200 outline-none
          placeholder:text-slate-400
          focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200'}
          ${className}
        `}
        {...props}
      />
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};
