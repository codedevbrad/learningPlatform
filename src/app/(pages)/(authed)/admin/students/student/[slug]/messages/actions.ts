'use server'
import { db__getMessagesBetweenStudent , db__postMessageBetweenStudent } from "@/db_queries/messages/admin.queries"

export async function action__getMessages ( {studentId} ) {
    try {
        let messages = await db__getMessagesBetweenStudent( { studentId } );
        console.log( 'message in actionss: ', messages )
        return messages
    }
    catch ( error ) {
        console.error('error fetching messages for student and tutor')
        throw error;
    }
}


export async function action__postMessage ( { messageData }) {
    try {
        return db__postMessageBetweenStudent( { messageData } );
    }
    catch ( error ) {
        console.error('error posting new message for student')
        throw error;
    }
}