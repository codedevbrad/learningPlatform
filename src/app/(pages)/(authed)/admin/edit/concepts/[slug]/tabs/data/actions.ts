'use server'
import { updateTopicData } from "@/db_queries/concepts/admin.queries";

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