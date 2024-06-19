import { SignedIn, SignedOut } from "@clerk/nextjs"

export default function AuthedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
       <>
          <SignedOut>
            <p> sorry, sign in please </p>
          </SignedOut>
          <SignedIn>
            { children }
          </SignedIn>
       </>
    );
}