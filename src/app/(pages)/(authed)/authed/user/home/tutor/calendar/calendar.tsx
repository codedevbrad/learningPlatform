import { Calendar } from "@/components/ui/calendar"
import React, { useState } from "react"

export default function TutorSessionsCalendar ( ) {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
        <div>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
        </div>
    )
}