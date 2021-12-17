import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Listbox, Transition } from "@headlessui/react";

import "./GrantFilterItem.scss";
const GrantFilterItem = ({ title, options }) => {
  useEffect(() => {
    console.log("initialied component", options[0]);
  }, []);

  const onChangeSelect = (value) => {
    console.log({ value });
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="filter-item flex-1 rounded-xl">
      {/* <p className="px-1 text-lbGray text-xs">{title}</p> */}
      {/* <select
          className="form-select
                block
                w-full
                py-1.5
                text-base
                font-medium
                leading-4
                text-lbBlack
                transition
                ease-in-out
                m-0 
                bg-transparent
                focus:outline-none"
          onChange={onChangeSelect}
        >
          {options.map((value) => (
            <option key={value.id} value={value.id}>
              {value.title}
            </option>
          ))}
        </select> */}
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-lbGray text-xs">
              {title}
            </Listbox.Label>
            <div className="mt-1 relative">
              <Listbox.Button className="relative w-full py-2 text-left focus:outline-none sm:text-sm">
                <span className="flex items-center">
                  <span className="block truncate">{selected.title}</span>
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-3 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.id}
                      className={({ active }) =>
                        classNames(
                          active ? "text-white bg-indigo-600" : "text-gray-900",
                          "cursor-default select-none relative py-2 pl-3 pr-9"
                        )
                      }
                      value={option.title}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span className="ml-3 block truncate">
                              {option.title}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            ></span>
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
