'use client'
import { useUserContext } from "@/app/contexts/context"

export default function AdminAuthCheck ( { children } ) {
    const { isAdminRole } = useUserContext();
  
    if ( !isAdminRole ) {
        return (
            (
              <div>
                  you're not an admin.. 
              </div>
            )
        )
    } 
  
    return (
       <>
         { children }
       </>
    )
}