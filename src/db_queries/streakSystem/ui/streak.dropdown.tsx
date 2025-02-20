"use client"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Zap, Timer } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
 

function ActivityStreak() {
    // For simplicity, we're just hardcoding which days have a streak
    // (e.g., Sunday, Tuesday, and Wednesday). You can change or compute
    // these boolean values from your actual data.
    const daysOfWeek = [
      { short: "S", full: "Sunday",    streak: true },
      { short: "M", full: "Monday",   streak: false },
      { short: "T", full: "Tuesday",  streak: true },
      { short: "W", full: "Wednesday",streak: true },
      { short: "T", full: "Thursday", streak: false },
      { short: "F", full: "Friday",   streak: false },
      { short: "S", full: "Saturday", streak: false },
    ];
  
    return (
      <div className="mb-3 bg-gray-100 p-4 rounded-md">
        {/* Panel Header / Title */}
        <h2 className="text-lg font-semibold">Activity Streak</h2>
        <p className="text-sm text-muted-foreground">
          Track your current and longest streaks, total Streak, and more.
        </p>
  
        {/* Days of the Week */}
        <div className="flex items-center mt-4 space-x-4">
          {daysOfWeek.map((day) => (
            <div key={day.full} className="flex flex-col items-center">
              {/* Circle for the day */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center 
                  ${day.streak ? "bg-pink-500 text-white" : "bg-gray-300 text-gray-800"}`}
              >
                {day.short}
              </div> 
            </div>
          ))}
        </div>
      </div>
    );
  }

export function ReadingStreakPanel() {
  return (
    <div className="p-4 w-full max-w-sm">
      {/* Panel Header / Title */}
      <ActivityStreak />

      {/* Streak Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4 bg-gray-100 p-4 rounded-md">
        <div>
          <p className="text-sm font-medium">Current Streak</p>
          <p className="text-base">2 days</p>
        </div>
        <div>
          <p className="text-sm font-medium">Longest Streak</p>
          <p className="text-base">2 days</p>
        </div>
      </div>

      {/* Settings / Toggles */}
      <div className="space-y-2 bg-gray-100 p-4 rounded-md">
        <div className="flex items-center space-x-2">
           <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">Remind me to keep my streak</Label>
           </div>
        </div>

        <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode"> Show Reading Streak </Label>
            </div>
        </div>
      </div>
    </div>
  );
}

export default function StreakStatsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-purple-500 text-white hover:bg-purple-600 flex items-center space-x-1">
            <Zap className="h-4 w-4" />
            <span>10</span>
          </Badge>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-1" align="end" sideOffset={10}>
            <ReadingStreakPanel />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
