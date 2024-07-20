'use server'
import { findTopicById } from "@/db_queries/concepts/student.queries"

import { 
  addNewConcept, getAllConcepts, deleteConceptById, editConceptById, 
} from "@/db_queries/concepts/admin.queries"

import {
   updateTopicDetails, updateTopicStatus, addNewTopic, deleteTopicAndRemoveConnections,
   db__updateTopicOrder, db__updateConceptOrder
} from "@/db_queries/concepts/admin.queries"


// Define a custom error interface.
interface CustomError extends Error {
  message: string;
}

// concept ...

export const action__getConcepts = async( ) => {
    try {
      return await getAllConcepts();
    }
    catch( error ) {
      console.error('Error fetching concepts asynchronously:', error);
      throw new Error('Failed to fetch concepts asynchronously.');
    }
}

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


export const action_editConcept = async ({ conceptId, conceptData }) => {
    try {
      return await editConceptById({ conceptId, conceptData });
    }
    catch ( error ) {
      console.error('Error editing concept asynchronously:', error);
      throw new Error('Failed to edit concept asynchronously.');
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


export const action_updateConceptPositions = async ( { conceptPositions }) => {
  try {
    await db__updateConceptOrder({ conceptPositions });
  }
  catch ( error ) {
      console.error('Error updating topic positions:', error );
      throw new Error('Failed to update topic positions.');
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
      console.error('Error deleting topic data asynchronously:', error);
      throw new Error('Failed to delete topic data asynchronously.');
   }
}


export async function action__updateTopicPositions ( { conceptId , topicPositions } ) {
  try {
      console.log( topicPositions );
      let topicsUpdated = await db__updateTopicOrder({ conceptId, topicPositions });
      return topicsUpdated;
  }
  catch ( error ) {
      console.error('Error updating topic positions:', error );
      throw new Error('Failed to update topic positions.');
  }
}


// Update function signatures with explicit return types
export async function action_addNewTopic({conceptId, title, description, selectedLanguages }) : Promise<any> {
  try {
    const updatedTopics = await addNewTopic({conceptId, title, description, selectedLanguages });
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
