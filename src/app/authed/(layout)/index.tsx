'use client'
import React, { ReactNode, useEffect } from 'react'
import Header from './parts/header'
import Sidebar from './parts/sidebar'
import { colors } from "../data"
import { useUser } from "@clerk/clerk-react"
import { SignedIn , SignedOut } from "@clerk/nextjs"
import Link from 'next/link'
import { action__userRegisteredThroughDbCheck } from "./actions"


interface DashboardLayoutProps {
  children: ReactNode;
}

function AuthId () {
  const { isSignedIn, user, isLoaded } = useUser();
  if (isSignedIn) {
    return user.id;
  } 
  else {
    return null;
  }
}


function Authed ( { children } ) {
  
    useEffect( ( ) => {
       
    }, [  ] );

    return ( 
      <SignedIn>
          <div className={`h-full flex flex-row ${ colors.app_primary_bg } p-5 `}>
              {/* left main content */}
              <div className="flex-grow p-5 mt-4 overflow-hidden pb-20">
                  <Header />
                  {children}
              </div>
              {/* right sidebar */}
              <Sidebar />
            </div>
      </SignedIn>
    )
}


export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
      <>
        <Authed>
            { children }
        </Authed>
        <SignedOut>
            <div>
                  <h1> It seems you tried entering our bootcamp </h1>
                  <p> you have tried entering the bootcamp without registering. </p>
                <Link href={'/register'}> Enroll in the bootcamp </Link>
            </div>
       </SignedOut>
      </>
    );
}