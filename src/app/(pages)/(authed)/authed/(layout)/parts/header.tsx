'use client'
import { IoSearch } from "react-icons/io5"
import { MdOutlineNotifications } from "react-icons/md"
import NavMenu from "@/app/reusables/layouts/navMenu"
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu"
import { SignedIn, UserButton } from "@clerk/nextjs"
import { signInRedirect } from "@/app/flows"
import PageLinkControl from '@/app/reusables/user/linkControl'
import HeaderLogo from "@/app/reusables/app/headerLogo"

export default function Header() {
    return (
      <header className="text-black py-4 px-6 flex items-center justify-between">

        <HeaderLogo url={ signInRedirect } />
        {/* Navigation */}
        <nav>
          <NavigationMenu>
                <NavigationMenuList>  
                      <NavMenu link={{ title: 'explore' , href: '#' }} subLinks={[
                        { title: 'courses' , href: '/authed/content/courses' },
                        { title: 'concepts' , href: '/authed/content/concepts' },
                        { title: 'challenge me' , href: '/authed/content/challenges' }
                      ]} />
                      <NavMenu link={{ title: 'help with' , href: '#' }} subLinks={[
                        { title: 'figuring problems out' , href: '/authed/content/help/chat' },
                        { title: 'creating ...' , href: '/authed/content/help/build' },
                        { title: 'resources to help' , href: '/authed/content/help/resources' }
                      ]} />
                      <NavMenu link={{ title: 'my learning' , href: '/authed/user/home' }} subLinks={ null } />
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
          
            <SignedIn>
              <PageLinkControl />
              <UserButton />
            </SignedIn>
        </div>
      </header>
    );
  }