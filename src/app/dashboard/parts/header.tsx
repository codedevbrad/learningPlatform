'use client'
import React, { ReactNode } from 'react';
import { IoSearch } from "react-icons/io5";
import { MdOutlineNotifications } from "react-icons/md";
import NavMenu from "../../reusables/layouts/navMenu";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu"
import UserAuthBar from '@/app/auth/userAuthBar';

export default function Header() {
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
        <NavigationMenu>
              <NavigationMenuList>  
                    <NavMenu link={{ title: 'explore' , href: '#' }} subLinks={[
                      { title: 'courses' , href: '/content/courses' },
                      { title: 'concepts' , href: '/content/concepts' },
                      { title: 'challenge me' , href: '/content/challenge' }
                    ]} />
                    <NavMenu link={{ title: 'help with' , href: '#' }} subLinks={[
                      { title: 'figuring problems out' , href: '/content/help/chat' },
                      { title: 'creating ...' , href: '/content/help/build' },
                    ]} />
                    <NavMenu link={{ title: 'my learning' , href: '/user/home' }} subLinks={ null } />
              </NavigationMenuList>
        </NavigationMenu>
        
        </nav>
  
        {/* Search and Notifications */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white focus:outline-none">
              <IoSearch className="text-black text-2xl"/>
          </button>
          <button className="text-gray-400 hover:text-white focus:outline-none">
                <MdOutlineNotifications className="text-2xl text-black"/>
          </button>
          <UserAuthBar />
        </div>
      </header>
    );
  }