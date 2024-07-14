'use client'
import React, { ReactNode } from 'react'
import { IoSearch } from "react-icons/io5"
import { MdOutlineNotifications } from "react-icons/md"
import NavMenu from "@/app/reusables/layouts/navMenu"
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu"
import { SignedIn, UserButton } from "@clerk/nextjs"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { signInRedirect, adminRedirect } from '@/app/flows'
import HeaderLogo from '@/app/reusables/app/headerLogo'
  

export default function Header() {
      return (
        <header className="text-black py-4 px-6 flex items-center justify-between">
          <HeaderLogo url={ adminRedirect } />
          {/* Navigation */}
          <nav>
            <NavigationMenu>
                  <NavigationMenuList>  
                        <NavMenu link={{ title: 'Dashboard'    , href: '/admin/' }} subLinks={ null } />
                        <NavMenu link={{ title: 'content work' , href: '/admin/edit/' }} subLinks={ null } />
                        <NavMenu link={{ title: 'Student area' , href: '/admin/students' }} subLinks={ null } />
                  </NavigationMenuList>
            </NavigationMenu>
          </nav>
    
          {/* Search and Notifications */}
          <div className="flex items-center space-x-4">  
            <Link href={ signInRedirect }> 
                  <Button variant={'outline'}> Bootcamp </Button>
            </Link>
            <button className="text-gray-400 hover:text-white focus:outline-none">
                <IoSearch className="text-black text-2xl"/>
            </button>
            <button className="text-gray-400 hover:text-white focus:outline-none">
                  <MdOutlineNotifications className="text-2xl text-black"/>
            </button>
            <div className="flex flex-row space-x-2">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </header>
      );
    }