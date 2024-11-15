'use client'
import React, { useState, useEffect } from 'react'
import NavMenu from "@/app/reusables/layouts/navMenu"
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu"
import Link from 'next/link';
import { Button } from '@/components/ui/button'
import PageLinkControl from '@/app/reusables/access/client/linkControl'
import HeaderLogo from '@/app/reusables/app/headerLogo'
import { bootcampRedirect  } from '@/app/flows'

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
      
      <HeaderLogo url={ bootcampRedirect } /> 

      <nav>
        <NavigationMenu>
          <NavigationMenuList>
            <NavMenu link={{ title: 'Learning with us', href: '/' }} subLinks={null} />
            <NavMenu link={{ title: 'Blog', href: '/' }} subLinks={null} />
            <NavMenu link={{ title: 'Our Company', href: '/' }} subLinks={null} />
            <NavMenu link={{ title: 'Faqs', href: '/' }} subLinks={null} />
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      <div className="flex items-center space-x-4">
          <PageLinkControl />
          <Button>
            <Link href={ bootcampRedirect }> Enter Bootcamp </Link>
          </Button>
      </div>
    </header>
  );
}
