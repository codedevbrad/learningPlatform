'use client'
import Title from "@/app/reusables/content/title"
import TutorSessionsTable from "./sessions/sessionTable"

export default function TutorSessions ( ) {
    return (
        <div className="p-5 border border-gray-200 rounded-lg mt-4">
            <Title variant="heading" title="Sessions with Your tutor 🙏" noMargin={false} />
            <div className="flex flex-row">
                <TutorSessionsTable />
            </div>
        </div>
    )
}