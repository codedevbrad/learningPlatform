'use server'
import { Card } from "@/components/ui/card"
import WeekdaySelector from "./comp.calendar/availability"
import TutorCalendar from "./comp.calendar/calendar"

export default async function StudentsPage() {
    return (
        <div className="flex w-full m-5 flex-col space-y-8">  
            <Card className="w-full p-6">
                <WeekdaySelector />
            </Card>
            <Card className="w-full p-6">
               <TutorCalendar />
            </Card>
        </div>
    );
}
