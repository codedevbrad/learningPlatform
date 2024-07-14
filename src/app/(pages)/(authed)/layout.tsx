import Title from "@/app/reusables/content/title";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs"

import AuthedFlow from "./auth.flow.access"

export default function AuthedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
       <>
          <SignedOut>
            <div className="flex items-center pt-10 flex-col space-y-4">
                  <Title variant='heading' title='It seems you tried entering our bootcamp' noMargin={false} />
                  <p> you have tried entering the bootcamp without registering. first, sign up with our platform </p>
                  <SignInButton>
                      <Button> Sign up to the Platform </Button>
                  </SignInButton>
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