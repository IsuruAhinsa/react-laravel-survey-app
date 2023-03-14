import React from "react";

export const Button = ({
  type = "button",
  onClick,
  children,
  color = "white",
  disabled = false,
}) => {
  const colorVariants = {
    blue: "bg-blue-600 hover:bg-blue-500 focus:ring-blue-500 text-white disabled:bg-gray-300",
    red: "bg-red-600 hover:bg-red-500 focus:ring-red-500 text-white disabled:bg-gray-300",
    green:
      "bg-green-600 hover:bg-green-500 focus:ring-green-500 text-white disabled:bg-gray-300",
    purple:
      "bg-purple-600 hover:bg-purple-500 focus:ring-purple-500 text-white disabled:bg-gray-300",
    orange:
      "bg-orange-600 hover:bg-orange-500 focus:ring-orange-500 text-white disabled:bg-gray-300",
    indigo:
      "bg-indigo-600 hover:bg-indigo-500 focus:ring-indigo-500 text-white disabled:bg-gray-300",
    white:
      "bg-white hover:bg-gray-50 focus:ring-indigo-500 text-gray-700 border border-gray-300 disabled:bg-gray-300",
    black:
      "bg-black hover:bg-gray-800 focus:ring-gray-500 text-white border border-gray-300 disabled:bg-gray-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center px-4 py-2 shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${colorVariants[color]} disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
};
