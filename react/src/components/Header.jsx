import React from "react";

const Header = ({ title, buttons }) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          {title}
        </h1>
        <div>
          {buttons}
        </div>
      </div>
    </header>
  );
};

export default Header;
