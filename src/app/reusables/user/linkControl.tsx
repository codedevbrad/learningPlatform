'use client'
import { useUserContext } from "@/app/contexts/context"
import { adminRedirect } from "@/app/flows";
import { Button } from "@/components/ui/button"
import { SignedIn } from "@clerk/nextjs"
import Link from "next/link"


export default function PageLinkControl ( ) {
    const { isAdminRole } = useUserContext();
    
    return (
        <SignedIn>
          { isAdminRole &&
             <Button variant={'outline'}>
              <Link href={ adminRedirect }> Go to Admin </Link>
            </Button>
          } 
        </SignedIn>
    )
}