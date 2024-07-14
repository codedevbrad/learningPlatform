import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/toaster"
import LoadingBar from "./reusables/usables/pageLoad"
import { UserProvider } from "./contexts/context"
import Footer from "./reusables/app/footer"
import CookiesToast from "./reusables/app/cookies"

import "./globals.css"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeBootcamp.com",
  description: "Generated by create next app"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
        <UserProvider>
            <html className={`${inter.className} h-full`} lang="en">
              <body className="flex flex-col h-full">
                      <LoadingBar />
                      <Toaster />  
                      <CookiesToast />
                      <div className="flex-grow flex flex-col">
                            {children}
                        <Footer />
                      </div>
              </body>
            </html> 
        </UserProvider>
    </ClerkProvider>
  );
}