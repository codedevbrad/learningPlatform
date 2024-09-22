'use client'
import AppLoadingScreen from "@/app/reusables/app/loadingScreen"
import { useUser, SignedIn } from "@clerk/nextjs"
import { ReactNode, useState, useEffect } from "react"
import { action__userRegisteredThroughDbCheck } from "./authed/actions"
import { colors } from "./authed/data"
import { useUserContext } from "@/app/contexts/context"
import AuthedButRegister from "./authed/(layout)/register"

export default function AuthedFlow ({ children } : { children: ReactNode }) {
    const { user, isLoaded } = useUser();
    const [isUserRegistered, setIsUserRegistered] = useState(true);
    const [loading, setLoading] = useState(true);
    const { isAdminRole } = useUserContext();
  
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
            <div className="flex-grow px-5 overflow-hidden pb-20">
              {children}
            </div>
          </div>
      </SignedIn>
    );
  }