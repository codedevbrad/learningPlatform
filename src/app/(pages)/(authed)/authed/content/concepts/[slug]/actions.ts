'use server'
import { db__getNextTopic } from "@/db_queries/concepts/admin.queries"
import { updateUserNotesForTopic } from "@/db_queries/user/queries"


export const action__getNextTopic = async ( { position } ) => {
    try {
        return await db__getNextTopic( { position } );
    }
    catch ( error ) {
        console.error("Error getting next topic in reading:" , error );
    }
}


export const action__updateTopicNotesForUser = async (  topicId: string, notesData: object , ) => {
    try {
        console.log( 'nnotes:', notesData, topicId )
        return await updateUserNotesForTopic( notesData , topicId );
    }
    catch ( error ) {
        console.error("Error creating user:" , error) ;
    }
}