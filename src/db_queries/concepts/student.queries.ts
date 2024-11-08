// *** CONCEPTS *** ///
import prisma from '../../../prisma/client'
import { getCategoriesByIds, getLanguagesByIds } from '../tags/student.queries'

// *** CONCEPTS *** //

export async function getAllConcepts() {
  // Fetch concepts with topics and categories included, ordered by position, where active is true
  const concepts = await prisma.concepts.findMany({
    include: {
      topics: {
        where: {
          active: true, // Filter topics where active is true
        },
        include: {
          languages: true,
        },
        orderBy: {
          position: 'asc',
        },
      },
      categories: true,
    },
    where: {
      active: true, // Filter concepts where active is true
    },
    orderBy: {
      position: 'asc',
    },
  });

  // Map over the concepts to replace category data with the fetched categories
  const mappedConcepts = await Promise.all(
    concepts.map(async (concept) => {
      const categories = await getCategoriesByIds(
        concept.categories.map((cat) => cat.categoryId)
      );
      console.log(categories);
      return {
        ...concept,
        categories,
      };
    })
  );

  return mappedConcepts;
}


// **** TOPIC **** //

export async function findTopicById(topicId: string) {
  try {
    const topic = await prisma.topic.findUnique({
      where: {
        id: topicId,
      },
      include: {
        languages: true,
        author: {
          select: {
            userId: true,
            name: true,
          },
        },
      },
    });

    if (!topic) {
      throw new Error(`Topic with ID ${topicId} not found`);
    }

    // Fetch languages for the topic using getLanguagesByIds
    const languageIds = topic.languages.map((lang) => lang.languageId);
    const languages = await getLanguagesByIds(languageIds);

    // Replace language IDs with actual language data
    const topicWithLanguagesAndAuthor = {
      ...topic,
      languages,
    };

    return topicWithLanguagesAndAuthor;
  } 
  catch (error) {
    console.error(`Failed to find topic by ID: ${error.message}`);
    throw new Error(`Failed to find topic by ID: ${error.message}`);
  }
}
