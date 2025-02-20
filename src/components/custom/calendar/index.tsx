"use client"

import { useState } from "react"
import { Calendar as CalendarBase } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { getTimeFrom } from "@/app/utils/dateParse" // Import your date formatting function

interface CalendarProps {
  selectedDate: Date | undefined
  onDateChange: (date: Date | undefined) => void
  className?: string
  minDate?: Date // Minimum selectable date
  showFormattedDate?: boolean // New prop to toggle formatted date display
  blockedDays?: number[] // Array of days to block (0 for Sunday, 1 for Monday, etc.)
}

export default function Calendar({
  selectedDate,
  onDateChange,
  className,
  minDate = new Date(), // Defaults to the current date if not provided
  showFormattedDate = true, // Defaults to showing formatted date
  blockedDays = [], // Defaults to no blocked days
}: CalendarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const isDayBlocked = (date: Date): boolean => {
    // Check if the day of the week is in the blockedDays array
    return blockedDays.includes(date.getDay())
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-[240px] pl-3 text-left font-normal ${className}`}
        >
          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarBase
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            onDateChange(date)
            setIsOpen(false)
          }}
          disabled={(date) =>
            date < minDate.setHours(0, 0, 0, 0) || isDayBlocked(date)
          }
          initialFocus
        />
      </PopoverContent>
      {showFormattedDate && selectedDate && (
        <div className="mt-1 text-sm text-gray-500">
          {`Set for: ${getTimeFrom(selectedDate)}`}
        </div>
      )}
    </Popover>
  )
}
