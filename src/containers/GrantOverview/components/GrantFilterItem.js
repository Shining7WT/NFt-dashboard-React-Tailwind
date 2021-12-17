import React, { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";

const GrantFilterItem = ({ title, options }) => {
  const [selected, setSelected] = useState(options[0]);

  useEffect(() => {
    console.log("initialied component", options);
  }, []);

  const classNames = (...classes) => classes.filter(Boolean).join(" ");

  return (
    <div className="bg-bgGray flex-1 rounded-lg">
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <div className="mt-1 relative">
              <Listbox.Button className="relative w-full rounded-lg shadow-sm pl-3 pr-4 py-2 text-left cursor-default focus:outline-none focus:ring-2 focus:ring-gray-300 sm:text-sm">
                <Listbox.Label className="block font-normal text-lbGray text-xs">
                  {title}
                </Listbox.Label>
                <span className="mt-1 flex items-center relative">
                  <span className="block truncate text-lbBlack font-semibold text-sm">
                    {selected.val}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.id}
                      className={({ active }) =>
                        classNames(
                          active ? "text-white bg-black" : "text-gray-900",
                          "cursor-default select-none relative py-2 pl-3 pr-9"
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {option.val}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-green-500",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default GrantFilterItem;
