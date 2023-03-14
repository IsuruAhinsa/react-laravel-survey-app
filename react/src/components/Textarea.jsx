import React from "react";

export const Textarea = ({ label, placeholder, id, onChange, value }) => {
  return (
    <>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <textarea
          id={id}
          name={id}
          onChange={onChange}
          value={value}
          rows={7}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={placeholder}
        />
      </div>
    </>
  );
};
