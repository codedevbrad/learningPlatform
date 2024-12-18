'use client'
import AppLoadingScreen from "@/app/reusables/app/loadingScreen"
import { useUser, SignedIn } from "@clerk/nextjs"
import { ReactNode, useState, useEffect } from "react"
import { action__userRegisteredThroughDbCheck } from "./authed/actions"
import AuthedButRegister from "./authed/(layout)/register"

export default function AuthedFlow ({ children } : { children: ReactNode }) {
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
          <div className={`h-full flex flex-row bg-white`}>
            { !isUserRegistered ? <AuthedButRegister /> : null }
            <div className="flex-grow px-5 pb-20">
              {children}
            </div>
          </div>
      </SignedIn>
    );
  }