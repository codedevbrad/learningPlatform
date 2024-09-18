'use server'
import MessagesDisplayComponent from "@/app/reusables/components/messages"

export default async function StudentMessages ( { studentId } ) {
    return (
        <MessagesDisplayComponent studentId={ studentId } sender={"TEACHER"} />
    )
}