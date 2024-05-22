'use server'
import { findTopicById } from "@/db_queries/concepts/student.queries"
import { updateTopicData,  updateTopicDetails, updateTopicStatus, addNewTopic } from "@/db_queries/concepts/admin.queries"

// Define a custom error interface.
interface CustomError extends Error {
  message: string;
}

export const action_saveConceptBlock = async(topicId: string, newData: any[]): Promise<any> => {
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

export async function action_getTopicById(topicId: string) {
  try {
    const topic = await findTopicById( topicId );
    return topic;
  } 
  catch (error) {
    const err = error as CustomError;
    console.error(`Failed to get topic by ID: ${err.message}`);
    throw new Error(`Failed to get topic by ID: ${err.message}`);
  }
}

// Update function signatures with explicit return types
export async function action_addNewTopic(conceptId: string, title: string, description: string, active: boolean = true): Promise<any> {
  try {
    const updatedTopics = await addNewTopic(conceptId, title, description, active);
    return updatedTopics;
  } 
  catch (error: unknown) {
    const err = error as CustomError;
    console.error(`Failed to add new topic: ${err.message}`);
    throw new Error(`Failed to add new topic: ${err.message}`);
  }
}

export async function action_updateTopicDetails(topicId: string, data: object): Promise<any> {
  try {
    const updatedTopics = await updateTopicDetails(topicId, data);
    return updatedTopics;
  } catch (error: unknown) {
    const err = error as CustomError;
    console.error(`Failed to update topic details: ${err.message}`);
    throw new Error(`Failed to update topic details: ${err.message}`);
  }
}

export async function action_updateTopicStatus(topicId: string, status: boolean): Promise<any> {
  try {
    const updatedTopics = await updateTopicStatus(topicId, status);
    return updatedTopics;
  } catch (error: unknown) {
    const err = error as CustomError;
    console.error(`Failed to update topic status: ${err.message}`);
    throw new Error(`Failed to update topic status: ${err.message}`);
  }
}
