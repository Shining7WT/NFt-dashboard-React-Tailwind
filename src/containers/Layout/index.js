import React, { useState, useEffect, Fragment, useRef } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { Link, useNavigate } from "react-router-dom";
import jwt from 'jsonwebtoken';
import {
  HomeIcon,
  InboxIcon,
  XIcon,
  VariableIcon,
  PresentationChartLineIcon,
  CreditCardIcon,
  TableIcon,
  MenuIcon,
} from '@heroicons/react/outline';

import logo from "../../img/stacks-logo.svg";
import DefaultImage from "../../img/default_image.jpg";
import { API_ENDPOINT_URL } from '../../constants/default';

let user = jwt.decode(localStorage.getItem('grant_app_token'))

const navigation = [
  { name: 'Grants', link: '/', icon: HomeIcon },
  { name: 'Payments Due', link: '/ready-for-funding', icon: CreditCardIcon },
  { name: 'Funding Ledger', link: '/funding-ledger', icon: TableIcon },
  { name: 'Reporting', link: '/report', icon: PresentationChartLineIcon },
  { name: 'Stale Grants', link: '/grants/stale', icon: InboxIcon },
  { name: 'Converter', link: '/converter', icon: VariableIcon },
  { name: 'Olvis', link: '/olvis', icon: VariableIcon},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Layout = (props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const userProfileDropdownRef = useRef(null);
  const path = window.location.pathname;
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (userProfileDropdownRef.current && !userProfileDropdownRef.current.contains(event.target)) {
      setShowUserDropdown(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('grant_app_token')
    navigate("/login")
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-black">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                {
                  (API_ENDPOINT_URL.includes('staging')) &&
                  <div className="flex justify-between items-center w-full bg-red-600 text-sm">
                    <div className="py-4 px-3 text-white">
                      You are on the staging version.
                    </div>
                  </div>
                }
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img
                      className="h-20 w-auto"
                      src={logo}
                      alt="Stacks Foundation"
                    />
                  </div>
                  <nav className="mt-5 px-2 space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.link}
                        className={classNames(
                          (path === item.link)
                            ? 'bg-gray-800 text-white'
                            : 'text-white hover:bg-gray-600 hover:bg-opacity-75',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                        )}
                      >
                        <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-gray-300" aria-hidden="true" />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
                <div ref={userProfileDropdownRef} className="relative p-4">
                  <div className="w-full group block">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowUserDropdown(!showUserDropdown)}>
                      <div className="w-14">
                        <img
                          className="inline-block h-9 w-9 rounded-full"
                          src={(user && user.avatar_url) || DefaultImage}
                          alt="logo"
                        />
                      </div>
                      <div className="ml-3 w-full">
                        <p className="text-md text-left font-medium text-white group-hover:text-white">{user && user.name && user.name.split(' ')[0]} </p>
                      </div>
                      <div className="text-white w-3">
                        <i className="fal fa-angle-down" />
                      </div>
                    </div>
                  </div>
                  {
                    showUserDropdown &&
                    <div className="absolute right-6 -top-16 w-64 xl:w-52 shadow-lg bg-gray-600 rounded-lg">
                      {/* <div className="flex justify-between text-white text-base px-8 py-5 border-gray-300 border-b cursor-pointer">
                        <div>Settings</div>
                        <div><i className="far fa-cog" /></div>
                      </div> */}
                      <div className="flex justify-between text-white text-base px-8 py-5 cursor-pointer" onClick={() => handleLogout()}>
                        <div>Log Out</div>
                        <div><i className="far fa-sign-out" /></div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 bg-black">
            {
              (API_ENDPOINT_URL.includes('staging')) &&
              <div className="flex justify-between items-center w-full bg-red-600 text-sm">
                <div className="py-4 px-3 text-white">
                  You are on the staging version.
                </div>
              </div>
            }
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <img
                  className="h-20 w-auto"
                  src={logo}
                  alt="Stacks Foundation"
                />
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.link}
                    className={classNames(
                      (path === item.link) ? 'bg-gray-800 text-white' : 'text-white hover:bg-gray-600 hover:bg-opacity-75',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon className="mr-3 flex-shrink-0 h-6 w-6 text-gray-300" aria-hidden="true" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div ref={userProfileDropdownRef} className="relative p-4">
              <div className="w-full group block">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowUserDropdown(!showUserDropdown)}>
                  <div className="w-14">
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src={(user && user.avatar_url) || DefaultImage}
                      alt="logo"
                    />
                  </div>
                  <div className="ml-3 w-full">
                    <p className="text-md text-left font-medium text-white group-hover:text-white">{user && user.name && user.name.split(' ')[0]} </p>
                  </div>
                  <div className="text-white w-3">
                    <i className="fal fa-angle-down" />
                  </div>
                </div>
              </div>
              {
                showUserDropdown &&
                <div className="absolute right-6 -top-16 w-64 xl:w-52 shadow-lg bg-gray-600 rounded-lg">
                  {/* <div className="flex justify-between text-white text-base px-8 py-5 border-gray-300 border-b cursor-pointer">
                    <div>Settings</div>
                    <div><i className="far fa-cog" /></div>
                  </div> */}
                  <div className="flex justify-between text-white text-base px-8 py-5 cursor-pointer" onClick={() => handleLogout()}>
                    <div>Log Out</div>
                    <div><i className="far fa-sign-out" /></div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="lg:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 lg:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="pt-5 lg:pt-10 xl:pt-16 px-5 lg:px-10 xl:px-20 pb-10">
              {props.children}
            </div>
          </main>
        </div>
      </div>
    </>
  )
};

export default Layout;
