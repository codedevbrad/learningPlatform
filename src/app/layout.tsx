import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/toaster"
import LoadingBar from "./reusables/app/pageLoad"
import { UserProvider } from "./contexts/context"
import Footer from "./reusables/app/footer"
import CookiesToast from "./reusables/app/cookies"

import "./globals.css"
import { TooltipProvider } from "@/components/ui/tooltip"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeBootcamp.com",
  description: "A Learning bootcamp"
};


function ENVDisplay ( ) {
    let whatENV;
    const env = process.env.NODE_ENV;
    const shouldDisplay = process.env.DISPLAYENV == 'true';
    if (env === "development") {
        whatENV = "development";
    } 
    else if (env === "production") {
        whatENV = "production";
    }
    return (
      shouldDisplay ? (
        <div className="z-50 rounded-md fixed bottom-4 right-3 bg-black text-white text-center p-4"> { whatENV } </div>
      ) : (
        null
      )
    )
}


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
        <UserProvider>
            <html className={`${inter.className} h-full`} lang="en">
              <body className="flex flex-col h-full overflow-x-hidden">
                <TooltipProvider>
                      <ENVDisplay />
                      <LoadingBar />
                      <Toaster />  
                      <CookiesToast />
                      <div className="flex-grow flex flex-col">
                            {children}
                        <Footer />
                      </div>
                </TooltipProvider>
              </body>
            </html> 
        </UserProvider>
    </ClerkProvider>
  );
}