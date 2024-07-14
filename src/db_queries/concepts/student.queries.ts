// *** CONCEPTS *** ///
import prisma from '../../../prisma/client'
import { getCategoriesByIds, getLanguagesByIds } from '../tags/student.queries'

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
      include: {
        languages: true
      }
    });

    if (!topic) {
      throw new Error(`Topic with ID ${topicId} not found`);
    }

    // Fetch languages for the topic using getLanguagesByIds
    const languageIds = topic.languages.map(lang => lang.languageId);
    const languages = await getLanguagesByIds(languageIds);

    // Replace language IDs with actual language data
    const topicWithLanguages = { ...topic, languages };

    return topicWithLanguages;
  } 
  catch (error) {
    console.error(`Failed to find topic by ID: ${error.message}`);
    throw new Error(`Failed to find topic by ID: ${error.message}`);
  }
}