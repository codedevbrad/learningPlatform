'use server'
import { updateTopicData, db__updateTopicLanguages } from "@/db_queries/concepts/admin.queries"


export const action_saveTopicBlock = async(topicId: string, newData: any[]): Promise<any> => {
    try {
        let topics = await updateTopicData(topicId, newData);
        console.log( topics );
        return topics;
    } 
    catch (error) {
        console.error('Error updating topic data asynchronously:', error);
        throw new Error('Failed to update topic data asynchronously.');
    }
}


export const action__updateTopicLanguages = async({ topicId, languages } : { topicId: string; languages: any }): Promise<any> => {
    try {
        let topics = await db__updateTopicLanguages({topicId, languages });
        return topics;
    } 
    catch (error) {
        console.error('Error updating topic data asynchronously:', error);
        throw new Error('Failed to update topic data asynchronously.');
    }
}