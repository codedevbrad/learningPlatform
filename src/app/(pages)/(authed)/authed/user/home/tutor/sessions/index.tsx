'use server'
import SessionProposedDisplay from "@/app/reusables/components/sessions/client.proposeSession"
import { action__getUserData } from "../../actions"

export default async function StudentSessions ( ) {
    // get userId...
    const { id } = await action__getUserData();
    return (
        <div>
            <SessionProposedDisplay studentId={ id } userType={"Student"} />
        </div>
    )
}