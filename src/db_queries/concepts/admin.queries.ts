// *** CONCEPTS & TOPICS *** ///
import prisma from '../../../prisma/client'
import { getAllConcepts } from './student.queries'

export async function updateTopicData(topicId: string, newData: any[]): Promise<any> {
    try {
        await prisma.topic.update({
            where: { id: topicId },
            data: {
                data: newData
            }
        });
        console.log('Topic data updated successfully.');
        return await getAllConcepts();
    } catch (error) {
        console.error('Error updating topic data:', error);
        throw new Error('Failed to update topic data.');
    }
}

export const addNewTopic = async (conceptId: string, title: string, description: string, active: boolean = false ) => {
    try {
      const newTopic = await prisma.topic.create({
        data: {
          title,
          description,
          conceptId,
          active,
        },
      });
      return await getAllConcepts();
    } 
    catch (error) {
      throw new Error(`Failed to create a new topic: ${error.message}`);
    }
  };
  
export const updateTopicStatus = async (topicId: string, status: boolean) => {
    try {
      const updatedTopic = await prisma.topic.update({
        where: { id: topicId },
        data: { active: status },
      });
      return await getAllConcepts();
    } 
    catch (error) {
      throw new Error(`Failed to update topic status: ${error.message}`);
    }
};


export const updateTopicDetails = async (topicId: string, data: object ) => {
  try {
      // Perform the update operation with the constructed data object
      const updatedTopic = await prisma.topic.update({
          where: { id: topicId },
          data
      });

      // Optionally, return updated concepts
      return await getAllConcepts();
  } 
  catch (error) {
      throw new Error(`Failed to update topic details: ${error.message}`);
  }
};
