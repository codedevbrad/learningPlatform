'use client'

import { Card } from "@/components/ui/card"
import WeekdaySelector from "./comps/availability"
import TutorCalendar from "./comps/calendar"
import { useState } from "react"

export default function CalendarSystem() {
  const [availability, setAvailability] = useState<string[]>([]);

  return (
    <div>
      <Card className="w-full p-6">
        <WeekdaySelector setAvailability={setAvailability} />
      </Card>
      <Card className="w-full p-6">
        <TutorCalendar availability={availability} />
      </Card>
    </div>
  )
}
