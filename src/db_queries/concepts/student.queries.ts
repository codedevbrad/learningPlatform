// *** CONCEPTS *** ///
import prisma from '../../../prisma/client'
import { getCategoriesByIds } from '../tags/student.queries'

// *** CONCEPTS *** //

export async function getAllConcepts ( ) {
    let concepts = await prisma.concepts.findMany({
        include: { topics: true , categories: true }
    });

    // Map courses and replace categories and languages with fetched data
    const mappedConcepts = concepts.map(async (concept) => {
        const categories = await getCategoriesByIds(concept.categories.map(cat => cat.categoryId));
        console.log( categories );
        // Replace category and language IDs with actual data
        return {
            ...concept,
            categories,
        };
    });
    return Promise.all(mappedConcepts);
}


// **** TOPIC **** //

export async function findTopicById(topicId: string) {
  try {
    const topic = await prisma.topic.findUnique({
      where: {
        id: topicId,
      },
    });
    return topic;
  } 
  catch (error) {
    console.error(`Failed to find topic by ID: ${error.message}`);
    throw new Error(`Failed to find topic by ID: ${error.message}`);
  }
}

