import React from "react";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Pagination = ({ meta, onPaginationClick }) => {

  const onClick = (e, link) => {
    e.preventDefault();
    if (!link.url) {
      return;
    }
    onPaginationClick(link);
  };

  return (
    <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0 mt-10">
      <div className="-mt-px w-0 flex-1 flex">
        <a
          href="#"
          onClick={(e) => onClick(e, meta.links[0])}
          className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
        >
          <ArrowLongLeftIcon
            className="mr-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          Previous
        </a>
      </div>
      {meta.total > meta.per_page && (
        <div className="hidden md:-mt-px md:flex">
          {meta.links &&
            meta.links.slice(1, meta.links.length - 1).map((link, index) => (
              <a
                href="#"
                onClick={(e) => onClick(e, link)}
                key={index}
                className={classNames(
                  link.active
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500",
                  "hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                )}
                dangerouslySetInnerHTML={{ __html: link.label }}
              ></a>
            ))}
        </div>
      )}
      <div className="-mt-px w-0 flex-1 flex justify-end">
        <a
          href="#"
          onClick={(e) => onClick(e, meta.links[meta.links.length - 1])}
          className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
        >
          Next
          <ArrowLongRightIcon
            className="ml-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </a>
      </div>
    </nav>
  );
};
