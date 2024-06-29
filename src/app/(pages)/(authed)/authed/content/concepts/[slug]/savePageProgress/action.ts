'use server'
import { updateUserProgressForTopic } from "@/db_queries/user/queries"


export const action__updateProgressForUser = async ( state, topicId ) => {
    try {
        return await updateUserProgressForTopic(state, topicId );
    }
    catch ( error ) {
        console.error("Error updating progress for topic:", error);
    }
}