import React from "react";

export const RadioButton = ({ id, name, label, value, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        type="radio"
        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
      {label && (
        <label
          htmlFor={id}
          className="ml-3 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
    </div>
  );
};
