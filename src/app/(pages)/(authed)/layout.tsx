
import Title from "@/app/reusables/content/title"
import { Button } from "@/components/ui/button"
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs"

import AuthedFlow from "./auth.flow.access"
import AppLogo from "@/app/reusables/app/logo"

export default function AuthedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
       <>
          <SignedOut>
            <div className="flex h-full justify-center items-center">
                    <div className="flex items-center pt-10 flex-col space-y-4">
                        <AppLogo />
                        <Title 
                            variant='heading' 
                            title='You tried entering the bootcamp without being a Member' 
                            noMargin={false} 
                        />
                        <p> 
                            you have tried entering the bootcamp without registering. 
                            first, sign up with our platform 
                        </p>
                        <SignInButton>
                            <Button> 
                                Sign in to the Platform 
                            </Button>
                        </SignInButton>
                    </div>
            </div>
           
          </SignedOut>
          <SignedIn>
                <AuthedFlow>
                    { children }
                </AuthedFlow>
          </SignedIn>
       </>
    );
}