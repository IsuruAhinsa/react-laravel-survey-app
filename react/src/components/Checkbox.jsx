import React from "react";

export const Checkbox = ({
  label,
  id,
  onChange,
  hint = null,
  name,
  checked,
}) => {
  return (
    <div className="flex items-start">
      <div className="flex h-5 items-center">
        <input
          id={id}
          name={name}
          checked={checked}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          onChange={onChange}
        />
      </div>
      {label && (
        <div className="ml-3 text-sm">
          <label htmlFor={id} className="font-medium text-gray-700">
            {label}
          </label>
          {hint && <p className="text-gray-500">{hint}</p>}
        </div>
      )}
    </div>
  );
};
