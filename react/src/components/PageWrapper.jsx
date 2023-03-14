import React from "react";
import Header from "../components/Header";

export const PageWrapper = ({ title, buttons = null, children }) => {
  return (
    <>
      <Header title={title} buttons={buttons} />

      <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-4 sm:px-0">{children}</div>
      </div>
    </>
  );
};
