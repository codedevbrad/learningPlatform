'use client'
import { useUser } from "@clerk/nextjs";
import { SignInButton , SignOutButton, UserButton } from "@clerk/nextjs";

export default function UserAuthBar () {
    const { isSignedIn, user , isLoaded } = useUser();

    console.log( user )
    return (
      <div>
        { isSignedIn ? (
            <div>
                <UserButton />
            </div>
               
        ) : (
            <div>
                <SignInButton />
            </div>
        )}
       
      </div>
    );
}