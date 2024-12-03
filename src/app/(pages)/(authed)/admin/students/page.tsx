'use server'
import DisplayAvailability from "@/db_queries/calendar/ui/ui.availability";
import CalendarSystem from "./calendar";

export default async function StudentsPage() {
    return (
        <div className="flex w-full m-5 flex-col space-y-8">  
            <CalendarSystem />
            <DisplayAvailability />
        </div>
    );
}
