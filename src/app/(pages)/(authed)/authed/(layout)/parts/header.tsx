'use client'
import { IoSearch } from "react-icons/io5"
import { MdOutlineNotifications } from "react-icons/md"
import NavMenu from "@/app/reusables/layouts/navMenu"
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu"
import { SignedIn, UserButton, UserProfile } from "@clerk/nextjs"
import { bootcampLogoRedirect } from "@/app/flows"
import PageLinkControl from '@/app/reusables/access/client/linkControl'
import HeaderLogo from "@/app/reusables/app/headerLogo"
import { action__getUserName } from "./action"
import { useEffect, useState } from "react"

import UserAuthedProfileAsDropdown from "@/db_queries/user/ui/profileDropdown"
import StreakStatsDropdown from "@/db_queries/streakSystem/ui/streak.dropdown"

import { useUserContext } from "@/app/contexts/context"
import TimerMusicPlayer from "../../zenMode/component"
import SubscriptionPlanModal from "@/db_queries/enrollment/ui.components/ui.plan/ui.plan.modal"


export default function Header() {

  const { isAdminRole } = useUserContext();

  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const name = await action__getUserName();
        console.log( name )
        setNickname(name);
      } 
      catch (error) {
        console.error("Failed to fetch nickname:", error);
        setNickname( "" )
      }
    };

    !isAdminRole ? fetchNickname() : null;
  }, [] );

  function RenderZenMode ( ) {
      return (
        <div> 
            zen mode
        </div>
      )
  }
 
  return (
      <header className="text-black py-4 px-6 flex items-center justify-between">
        <HeaderLogo url={ bootcampLogoRedirect } />
        <nav>
          <NavigationMenu>
                <NavigationMenuList>  
                      <NavMenu link={{ title: 'Learn' , href: '#' }} subLinks={[
                        { title: 'Concepts' , href: '/authed/content/concepts' , colorChosen: 'purple', emoji: '👹' },
                        { title: 'Challenge me' , href: '/authed/content/challenges', colorChosen: 'red' , emoji: '👊' }
                      ]} />
                     <NavMenu link={{ title: 'Zen Mode' , href: '#' }} subLinks={ <RenderZenMode /> } />
                      <NavMenu link={{ title: 'Help with' , href: '#' }} subLinks={[
                        { title: 'Figuring problems out' , href: '/authed/content/help/chat' , colorChosen: 'emerald' },
                        { title: 'Creating' , href: '/authed/content/help/build', colorChosen: 'purple' },
                        { title:  'Resources to help' , href: '/authed/content/help/resources' }
                      ]} />
                      <NavMenu link={{ title: 'My learning' , href: '/authed/user/home' }} subLinks={ null } />
                </NavigationMenuList>
          </NavigationMenu>
        </nav>
   
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white focus:outline-none">
              <IoSearch className="text-black text-2xl"/>
          </button>
          <button className="text-gray-400 hover:text-white focus:outline-none">
              <MdOutlineNotifications className="text-2xl text-black"/>
          </button>            
          
            <SignedIn>
                <div className="flex flex-row items-center gap-3">
                  <PageLinkControl />
                  <SubscriptionPlanModal hideIfActiveSubscription={ false } /> 
                  <div className=" border rounded-md flex flex-row"> 
                    <StreakStatsDropdown />
                    <UserAuthedProfileAsDropdown />
                  </div>
                </div>
            </SignedIn>
        </div>
      </header>
    );
  }