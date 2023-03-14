import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars4Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserIcon } from "@heroicons/react/20/solid";
import axiosClient from "../axios.js";
import { REMOVE_CURRENT_USER } from "../features/auth/authSlice";

const navigation = [
  { name: "Dashboard", to: "/" },
  { name: "Surveys", to: "/surveys" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    axiosClient.post("/logout").then(() => {
      dispatch(REMOVE_CURRENT_USER());
    });
  };

  return (
    <Disclosure as="nav" className="bg-indigo-600">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? "bg-indigo-700 text-white"
                              : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="max-w-xs bg-indigo-600 rounded-full flex items-center text-sm text-white focus:outline-none">
                        <span className="sr-only">Open user menu</span>
                        <div className="flex items-center px-5">
                          <div className="flex-shrink-0">
                            <UserIcon className="w-9 h-9 border rounded-full" />
                          </div>
                          <div className="ml-3 text-left">
                            <div className="text-base font-medium text-white">
                              {user.name}
                            </div>
                            <div className="text-sm font-medium text-indigo-300">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          <a
                            onClick={(e) => logout(e)}
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700"
                          >
                            Signout
                          </a>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars4Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? "bg-indigo-700 text-white"
                        : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-indigo-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <UserIcon className="w-9 h-9 border rounded-full text-white" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-indigo-300">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Disclosure.Button
                  as="a"
                  href="#"
                  onClick={(e) => logout(e)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
                >
                  Signout
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
