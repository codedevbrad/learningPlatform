'use server'
import { updateTopicDetails, updateTopicStatus, addNewTopic, findTopicById } from "@/db_queries/concepts/student.queries"

// Define a custom error interface
interface CustomError extends Error {
  message: string;
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
