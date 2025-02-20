"use client"

import { useUser, SignOutButton } from "@clerk/nextjs"
import Link from "next/link"

// Replace these with the correct import paths in your project.
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
// import SubscriptionPlanModal from "@/db_queries/enrollment/ui.components/ui.plan/ui.plan.modal"

export default function UserAuthedProfileAsDropdown() {
  const { user } = useUser()

  // If the user is not logged in or still loading, don't render the dropdown
  if (!user) return null

  // function SubscriptionModalHandle ( ) {
  //     return (
  //       <div className="flex justify-center my-3">
  //         <SubscriptionPlanModal hideIfActiveSubscription={ false } />
  //       </div>
  //     )
  // }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="">
        <Button variant="ghost" className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={user.imageUrl}
              alt={user.fullName || "User Avatar"}
            />
            <AvatarFallback>
              {user.firstName?.[0] || user.username?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[275px]">

        <DropdownMenuLabel>
                <div> {user.fullName || user.username || "User"} <span className="font-normal"> joined Dec 2024 </span> </div>
                <span> {user.primaryEmailAddress?.emailAddress } </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/profile/update">
            Update Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <SignOutButton>
            Sign Out
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}