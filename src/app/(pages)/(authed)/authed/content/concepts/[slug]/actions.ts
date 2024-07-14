'use server'
import { updateUserNotesForTopic } from "@/db_queries/user/queries"


export const action__updateTopicNotesForUser = async (  topicId: string, notesData: object , ) => {
    try {
        console.log( 'nnotes:', notesData, topicId )
        return await updateUserNotesForTopic( notesData , topicId );
    }
    catch ( error ) {
        console.error("Error creating user:", error);
    }
}