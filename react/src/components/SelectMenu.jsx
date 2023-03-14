import React from "react";

export const SelectMenu = ({ label, id, onChange, children, value }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        name={id}
        onChange={onChange}
        value={value}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {children}
      </select>
    </div>
  );
};
