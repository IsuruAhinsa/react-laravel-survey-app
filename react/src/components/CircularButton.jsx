import React from "react";

export const CircularButton = ({
  type = "button",
  onClick,
  color = "indigo",
  children,
}) => {
  const colorVariants = {
    blue: "bg-blue-600 hover:bg-blue-500 focus:ring-blue-500",
    red: "bg-red-600 hover:bg-red-500 focus:ring-red-500",
    green: "bg-green-600 hover:bg-green-500 focus:ring-green-500",
    purple: "bg-purple-600 hover:bg-purple-500 focus:ring-purple-500",
    orange: "bg-orange-600 hover:bg-orange-500 focus:ring-orange-500",
    indigo: "bg-indigo-600 hover:bg-indigo-500 focus:ring-indigo-500",
  };

  let classes = [
    "inline-flex",
    "items-center",
    "p-2",
    "border",
    "border-transparent",
    "rounded-full",
    "shadow-sm",
    "text-white",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    `${colorVariants[color]}`,
  ];

  return (
    <button type={type} onClick={onClick} className={classes.join(" ")}>
      {children}
    </button>
  );
};
