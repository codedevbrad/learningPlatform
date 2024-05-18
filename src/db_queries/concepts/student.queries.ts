// *** CONCEPTS *** ///
import prisma from '../../../prisma/client'

export async function getAllConcepts ( ) {
    return await prisma.concepts.findMany({
        include: {
          topics: true // Include the associated topics for each concept
        }
      })
}

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
