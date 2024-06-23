'use server'
import { findTopicById } from "@/db_queries/concepts/student.queries"
import { 
  addNewConcept, deleteConceptById, updateTopicDetails, updateTopicStatus, addNewTopic, deleteTopicAndRemoveConnections
} from "@/db_queries/concepts/admin.queries"

// Define a custom error interface.
interface CustomError extends Error {
  message: string;
}

// concept ...

export const action_addNewConcept = async( concept ) => {
    try {
        let concepts = await addNewConcept(concept);
        return concepts;
    }
    catch ( error ) {
        console.error('Error creating concept asynchronously:', error);
        throw new Error('Failed to create concept asynchronously.');
    }
}


export const action_DeleteConcept = async( conceptId : string ) => {
  try {
      let conceptsChanged = await deleteConceptById( conceptId );
      return conceptsChanged;
  }
  catch ( error ) {
      console.error('Error deleting concept asynchronously:', error);
      throw new Error('Failed to delete concept asynchronously.');
  }
}


// topics...

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


export async function action_deleteTopic ( topicId : string ) {
  try {
      return await deleteTopicAndRemoveConnections( topicId );
  }
  catch ( error ) {
      console.error('Error updating topic data asynchronously:', error);
      throw new Error('Failed to update topic data asynchronously.');
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
