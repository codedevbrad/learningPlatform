'use client'
import React, { useState, ReactNode, useEffect } from 'react'
import Header from  './parts/header'

import { colors } from "../data"
import { useUser } from "@clerk/clerk-react"
import { SignInButton, SignedIn , SignedOut } from "@clerk/nextjs"
import { action__userRegisteredThroughDbCheck } from "./actions"
import { Button } from '@/components/ui/button'
import Title from '@/app/reusables/content/title'
import AuthedButRegister from './register'

interface DashboardLayoutProps {
  children: ReactNode;
}


function AuthLoadingScreen ( ) {
  return (
      <div className='flex w-full h-full fixed z-40 justify-center items-center'>
          <Title title="Coding Bootcamp" variant="heading" />
      </div>
  )
}


function Authed({ children }) {
  const { user, isLoaded } = useUser();
  const [isUserRegistered, setIsUserRegistered] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRegistration = async () => {
      if (isLoaded && user) {
        const result = await action__userRegisteredThroughDbCheck();
        setIsUserRegistered(result === true);
        setLoading(false);
      }
    };
    checkUserRegistration();
  }, [isLoaded, user]);

  if (loading) {
    return (
        <AuthLoadingScreen />
    );
  }

  return (
    <SignedIn>
          <div className={`h-full flex flex-row ${colors.app_primary_bg} p-5`}>
            { !isUserRegistered ? <AuthedButRegister /> : null }
            {/* left main content */}
            <div className="flex-grow p-5 mt-4 overflow-hidden pb-20">
              <Header />
              {children}
            </div>
          </div>
    </SignedIn>
  );
}


export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
      <>
        <Authed>
            { children }
        </Authed>
        <SignedOut>
            <div className="flex items-center mt-10 flex-col space-y-4">
                  <Title variant='heading' title='It seems you tried entering our bootcamp' />
                  <p> you have tried entering the bootcamp without registering. first, sign up with our platform </p>
                  <SignInButton>
                      <Button> Sign up to the Platform </Button>
                  </SignInButton>
            </div>
        </SignedOut>
      </>
    );
}