'use server'
import SessionProposedDisplay from "@/db_queries/sessions/ui/client.proposeSession"

export default async function BookingPage ( ) {
    return (
        <div className="flex justify-center items-center">
            <p> Book a session with your tutor. Once they've accepted you'll </p>
            <SessionProposedDisplay studentId={""} userType={"Student"} />
        </div>
    )
}