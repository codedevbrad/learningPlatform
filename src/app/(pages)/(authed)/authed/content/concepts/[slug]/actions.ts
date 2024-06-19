'use server'
import { updateUserProgressForTopic, updateUserNotesForTopic } from "@/db_queries/user/queries"

export const action__updateTopicProgressForUser = async ( state, topicId ) => {
    try {
        return await updateUserProgressForTopic(state, topicId );
    }
    catch ( error ) {
        console.error("Error creating user:", error);
    }
}


export const action__updateTopicNotesForUser = async ( notesData , topicId ) => {
    try {
        return await updateUserProgressForTopic( notesData , topicId );
    }
    catch ( error ) {
        console.error("Error creating user:", error);
    }
}