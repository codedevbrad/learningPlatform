'use server'
import MessagesDisplayComponent from "@/db_queries/messages/ui"

export default async function StudentMessages ( { studentId } ) {
    return (
        <MessagesDisplayComponent studentId={ studentId } sender={"TEACHER"} />
    )
}