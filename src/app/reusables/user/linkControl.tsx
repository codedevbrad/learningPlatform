'use client'
import { useUser } from "@/app/contexts/context"
import { adminRedirect } from "@/app/flows";
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import Link from "next/link"


export default function PageLinkControl ( ) {
    const { isAdminRole } = useUser();
    
    return (
        <>
          { isAdminRole &&
             <Button variant={'outline'}>
              <Link href={ adminRedirect }> Go to Admin </Link>
            </Button>
          } 
        </>
    )
}