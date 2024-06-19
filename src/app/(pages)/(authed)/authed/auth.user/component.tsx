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
import AppLoadingScreen from '@/app/reusables/app/loadingScreen'

function Authed({ children } : { children: ReactNode }) {
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
          <AppLoadingScreen />
      );
    }
  
    return (
      <SignedIn>
            <div className={`h-full flex flex-row ${colors.app_primary_bg} `}>
              { !isUserRegistered ? <AuthedButRegister /> : null }
              {/* left main content */}
              <div className="flex-grow px-5 overflow-hidden pb-20">
                <Header />
                {children}
              </div>
            </div>
      </SignedIn>
    );
  }
  