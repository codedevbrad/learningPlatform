'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { IoSearch } from "react-icons/io5"
import { MdOutlineNotifications } from "react-icons/md"
import NavMenu from "@/app/reusables/layouts/navMenu"
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import Link from 'next/link';
import { appLogoRedirect } from "@/app/flows"
import { Button } from '@/components/ui/button'

function HeaderLogo() {
  return (
    <div className="flex items-center">
      <Link href={ '/' }>
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
      </Link>
    </div>
  );
}


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [] );

  return (
    <header className={`text-black py-4 px-6 flex items-center justify-between fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-white' : ''}`}>
      
      <HeaderLogo /> 

      <nav>
        <NavigationMenu>
          <NavigationMenuList>
            <NavMenu link={{ title: 'Learning with us', href: '/' }} subLinks={null} />
            <NavMenu link={{ title: 'Our Company', href: '/' }} subLinks={null} />
            <NavMenu link={{ title: 'Faqs', href: '/' }} subLinks={null} />
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      {/* Search and Notifications */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-400 hover:text-white focus:outline-none">
          <IoSearch className="text-black text-2xl" />
        </button>
        <button className="text-gray-400 hover:text-white focus:outline-none">
          <MdOutlineNotifications className="text-2xl text-black" />
        </button>
        <Button>
          <Link href={ appLogoRedirect }> Enter the bootcamp </Link>
        </Button>
      </div>
    </header>
  );
}
