'use client'
import { useUser } from "@/app/contexts/context"
import Header from "../../admin/(layout)/header"
import NotAllowedAccessView from "../notAllowedView"

export default function AdminAuthCheck ( { children } ) {
    const { isAdminRole } = useUser();
  
    if ( !isAdminRole ) {
        return (
            (
               <NotAllowedAccessView>
                     <div>
                        you're not an admin.. 
                    </div>
               </NotAllowedAccessView>
            )
        )
    } 
  
    return (
      <div>
          <Header />
          <div className="p-8 pt-1">
              { children }
          </div>
      </div>
    )
}