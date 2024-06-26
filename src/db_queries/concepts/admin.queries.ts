// *** CONCEPTS & TOPICS *** ///
import prisma from '../../../prisma/client'
import { getCategoriesByIds } from '../tags/student.queries'
import { Prisma, Topic } from '@prisma/client';

export async function getAllConcepts ( ) {
  let concepts = await prisma.concepts.findMany({
      include: {
        topics: true , categories: true 
      }
  });

  // Map courses and replace categories and languages with fetched data.
  const mappedConcepts = concepts.map( async (concept) => {
      // Fetch categories and languages for this course
      const categories = await getCategoriesByIds(concept.categories.map(cat => cat.categoryId));
      // const userData = await getUserDataForCourse()
      console.log( categories );
      // Replace category and language IDs with actual data
      return { ...concept, categories };
  });
  return Promise.all(mappedConcepts);
}


export async function deleteConceptById(conceptId: string) {
  try {
    // Fetch the concept to ensure it exists
    const concept = await prisma.concepts.findUnique({
      where: {
        id: conceptId,
      },
      include: {
        topics: true,       // Include related topics
        categories: true,   // Include related categories
      },
    });

    if (!concept) {
      throw new Error('Concept not found');
    }

    // Delete all related categories
    await prisma.categoriesConcept.deleteMany({
      where: {
        conceptId: conceptId,
      },
    });

    // Delete all related topics
    await prisma.topic.deleteMany({
      where: {
        conceptId: conceptId,
      },
    });

    // Delete the concept after all related topics and categories are deleted
    await prisma.concepts.delete({
      where: {
        id: conceptId,
      },
    });
    console.log(`Concept with ID ${conceptId}, all related topics, and categories were successfully deleted.`);
    return await getAllConcepts();
  } 
  catch (error) {
    console.error('Error deleting concept and removing all related topics and categories:', error);
    throw new Error('Failed to delete concept and remove all related topics and categories.');
  }
}

export async function deleteTopicAndRemoveConnections(topicId: string) {
  try {
    // Fetch the topic to get the associated conceptId
    const topic = await prisma.topic.findUnique({
      where: {
        id: topicId,
      },
    });

    if (!topic) {
      throw new Error('Topic not found');
    }

    // Remove all LanguagesTopic entries associated with the topic
    await prisma.languagesTopic.deleteMany({
      where: {
        topicId: topicId,
      },
    });

    // Delete the topic
    await prisma.topic.delete({
      where: {
        id: topicId,
      },
    });

    console.log(`Topic with ID ${topicId} and its references were successfully deleted.`);
    return await getAllConcepts();
  } 
  catch (error) {
    console.error('Error deleting topic and removing connections:', error);
    throw new Error('Failed to delete topic.');
  }
}

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
    } 
    catch (error) {
        console.error('Error updating topic data:', error);
        throw new Error('Failed to update topic data.');
    }
}

export const addNewConcept = async (data ) => {
  const { title, description, active, imgUrl = "", categories : categoryIds } = data;
  try {
    const newConcept = await prisma.concepts.create({
      data: {
        title,
        description,
        active,
        imgUrl,
        categories: {
          create: categoryIds.map(categoryId => ({
            categoryId
          }))
        }
      },
      include: {
        categories: true
      }
    });
    let concepts = await getAllConcepts();
    console.log( concepts );
    return concepts;
  } 
  catch (error) {
    console.error("Error adding new concept:", error);
    throw new Error(`Failed to create a new concept: ${error.message}`);
  } 
};

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



export const updateTopicResources = async (topicId, resources) => {
    try {

      // Perform the update operation with the updated resources array
      await prisma.topic.update({
        where: { id: topicId },
        data: {
          resources
        }
      });

      // Optionally, return updated concepts
      return await getAllConcepts();
    } 
    catch (error) {
      throw new Error(`Failed to update topic resources: ${error.message}`);
    }
};