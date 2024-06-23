'use client'
import Title from "@/app/reusables/content/title"
import TutorSessionsCalendar from "./calendar/calendar"
import TutorSessionsTable from "./sessions/sessionTable"

export default function TutorSessions ( ) {
    return (
        <div className="p-5 border border-gray-200 rounded-lg mt-4">
            <Title variant="subheading1" title="Sessions with Your tutor 🙏" />
            <div className="flex flex-row">
                <TutorSessionsCalendar />
                <TutorSessionsTable />
            </div>
        </div>
    )
}