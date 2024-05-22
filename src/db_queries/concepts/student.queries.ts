// *** CONCEPTS *** ///
import prisma from '../../../prisma/client'
import { getCategoriesByIds } from '../tags/student.queries'

// *** CONCEPTS *** //

export const addNewConcept = async (title: string = "", description: string = "", imgUrl: string = "", active: boolean = true) => {
  try {
    const newConcept = await prisma.concepts.create({
      data: {
        title,
        description,
        imgUrl,
        active,
      },
    });
    return await getAllConcepts();
  } 
  catch (error) {
    throw new Error(`Failed to create a new concept: ${error.message}`);
  }
};

export async function getAllConcepts ( ) {
    let concepts = await prisma.concepts.findMany({
        include: {
          topics: true , categories: true 
        }
    });

    // Map courses and replace categories and languages with fetched data
    const mappedConcepts = concepts.map(async (concept) => {
    // Fetch categories and languages for this course
    const categories = await getCategoriesByIds(concept.categories.map(cat => cat.categoryId));
    // const userData = await getUserDataForCourse()
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
