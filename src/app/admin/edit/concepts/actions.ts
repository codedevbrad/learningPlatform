'use server'
import { updateTopicDetails, updateTopicStatus } from "@/db_queries/concepts/student.queries"

export async function action_updateTopicDetails(topicId: string, data: object ) {
  try {
    const updatedTopics = await updateTopicDetails(topicId, data);
    return updatedTopics;
  } catch (error) {
    console.error(`Failed to update topic details: ${error.message}`);
    throw new Error(`Failed to update topic details: ${error.message}`);
  }
}

export async function action_updateTopicStatus(topicId: string, status: boolean) {
  try {
    const updatedTopics = await updateTopicStatus(topicId, status);
    return updatedTopics;
  } catch (error) {
    console.error(`Failed to update topic status: ${error.message}`);
    throw new Error(`Failed to update topic status: ${error.message}`);
  }
}
