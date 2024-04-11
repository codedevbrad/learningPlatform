'use client'
import { navigation, navigationAuthItems } from "./data";
import Link from 'next/link'
import React, { ReactNode } from 'react';
import { IoSearch } from "react-icons/io5";
import { MdOutlineNotifications } from "react-icons/md";


function Header() {
  return (
    <header className="text-black py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
      <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
      </div>

      {/* Navigation */}
      <nav>
        <ul className="flex space-x-6">
            { navigation.map( ( each ) =>
                <li className={`italic py-2 px-4 shadow-2xl rounded-lg ${ each.current ? 'bg-white' : ''}`}>
                  <Link href={ each.href }> { each.name } </Link>
                </li>
            )}
        </ul>
      </nav>

      {/* Search and Notifications */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-400 hover:text-white focus:outline-none">
            <IoSearch className="text-black text-2xl"/>
        </button>
        <button className="text-gray-400 hover:text-white focus:outline-none">
              <MdOutlineNotifications className="text-2xl text-black"/>
        </button>
      </div>
    </header>
  );
}


interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
      <div className="h-full flex flex-row bg-amber-50 p-5">
        {/* left main content */}
        <div className="flex-grow p-5 mt-4 overflow-hidden pb-20">
          <Header />
          {children}
        </div>

        {/* right sidebar */}

      </div>
    );
}


/*
        <div className=" bg-white rounded-xl p-5 flex flex-col items-center justify-start w-24">
          {navigationAuthItems.map(({ icon: Icon, label }, index) => (
            <div key={index} className="flex flex-col items-center mb-4">
                <div className="my-5">
                  <Icon className="text-2xl " />
                </div>
            </div>
          ))}
        </div>
*/