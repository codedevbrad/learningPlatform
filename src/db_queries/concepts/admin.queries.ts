// *** CONCEPTS & TOPICS *** ///
import prisma from '../../../prisma/client'
import { TopicType } from '../../../prisma/schema.types';
import { getCategoriesByIds, getLanguagesByIds } from '../tags/student.queries'
import { auth } from "@clerk/nextjs/server"
import { db_getAdminIdFromAuth } from '../user/admin.queries'

export async function getAllConceptsPlain ( ) {
  let concepts = await prisma.concepts.findMany({
      include: {
        topics: {
          include: {
              languages: true
          }
        },
        categories: true 
      }
  });

  // Map courses and replace categories and languages with fetched data.
  const mappedConcepts = concepts.map( async (concept) => {
      // Fetch categories and languages for this course
      const categories = await getCategoriesByIds(concept.categories.map(cat => cat.categoryId));
      console.log( concept.topics )
      // Replace category and language IDs with actual data.
      return { ...concept, categories };
  });
  return Promise.all(mappedConcepts);
}


export async function getAllConcepts() {
    let concepts = await prisma.concepts.findMany({
      include: {
          topics: {
              include: {
                  languages: true
              },
              orderBy: {
                position: 'asc'
              }
          },
          categories: true
      },
      orderBy: {
        position: 'asc'
      }
  });

  // Map courses and replace categories and languages with fetched data.
  const mappedConcepts = await Promise.all(concepts.map(async (concept) => {
      // Fetch categories for this concept
      const categories = await getCategoriesByIds(concept.categories.map(cat => cat.categoryId));

      // Fetch languages for each topic
      const topicsWithLanguages = await Promise.all(concept.topics.map(async (topic) => {
          const languageIds = topic.languages ? topic.languages.map(lang => lang.languageId) : [];
          const languages = await getLanguagesByIds(languageIds);
          return { ...topic, languages };
      }));

      // Replace category and language IDs with actual data
      return { ...concept, categories, topics: topicsWithLanguages };
  }));
  return mappedConcepts;
}


export const addNewConcept = async (data) => {
  const { title, description, active, imgUrl = "", categories: categoryIds } = data;
  try {
    // Find the current largest position
    const maxPosition = await prisma.concepts.aggregate({
      _max: {
        position: true
      }
    });

    // Calculate the next position
    const nextPosition = (maxPosition._max.position || 0) + 1;

    // Create the new concept with the calculated position
    await prisma.concepts.create({
      data: {
        title,
        description,
        active,
        imgUrl,
        position: nextPosition,
        categories: {
          create: categoryIds.map((categoryId: string ) => ({
            categoryId
          }))
        }
      },
      include: {
        categories: true
      }
    });

    // Fetch all concepts after the new one has been added...
    let concepts = await getAllConcepts();
    console.log(concepts);
    return concepts;
  } 
  catch (error) {
    console.error("Error adding new concept:", error);
    throw new Error(`Failed to create a new concept: ${error.message}`);
  }
};


export const db__updateConceptOrder = async ({ conceptPositions }) => {
  try {
    // Iterate over each item in the conceptPositions array and update the concept position
    for (const { conceptId, position } of conceptPositions) {
      await prisma.concepts.update({
        where: {
          id: conceptId,
        },
        data: {
          position: position,
        },
      });
    }
    console.log('Concept positions were successfully updated.');
    return await getAllConcepts();
  } 
  catch (error) {
    console.error('Failed to update concepts order:', error);
    throw new Error(`Failed to update concepts order: ${error.message}`);
  }
};


export async function editConceptById( { conceptId, conceptData } :
  { 
    conceptId: string; conceptData:{ title: string; description: string; selectedCategories: string[]}
  }) {
  try {
    let { title, description, selectedCategories } = conceptData;

    // Delete existing categories relationships
    await prisma.categoriesConcept.deleteMany({
      where: {
        conceptId: conceptId,
      },
    });

    // Update the concept and create new categories relationships
    await prisma.concepts.update({
      where: {
        id: conceptId,
      },
      data: {
        title,
        description,
        categories: {
          create: selectedCategories.map((categoryId) => ({
            categoryId,
          })),
        },
      },
    });

    return await getAllConcepts();
  } catch (error) {
    console.error('Error when editing current concept', error);
    throw new Error('Failed to edit current concept.');
  }
}


// we'll need to delete relations between a topic and the TopicToUserDataForTopic too.

export async function deleteConceptById(conceptId: string) {
  try {
    // Fetch the concept to ensure it exists and get its position
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

    // Store the position of the concept to be deleted
    const deletedConceptPosition = concept.position;

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

    // Update the positions of the other concepts
    await prisma.concepts.updateMany({
      where: {
        position: {
          gt: deletedConceptPosition,
        },
      },
      data: {
        position: {
          decrement: 1,
        },
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


export async function db__getNextTopic ( { position } ) {
   try {
      return await prisma.topic.findFirst({
          where: {
             position: position + 1
          }
      })
   }
   catch ( error ) {
      console.error('Error getting next topic in reading:', error);
      throw new Error('Failed to get next topic in reading.');
   }
}


export async function deleteTopicAndRemoveConnections(topicId: string) {
  try {

    let { userId } = auth();
    if (!userId) {
      throw new Error("User ID is null or undefined");
    }

    // Fetch the topic to get the associated conceptId
    const topic = await prisma.topic.findUnique({
      where: {
        id: topicId,
      },
    });

    if (!topic) {
      throw new Error('Topic not found');
    }

     // Store the position of the topic to be deleted
     const deletedTopicPosition = topic.position;

    // Remove all LanguagesTopic entries associated with the topic
    await prisma.languagesTopic.deleteMany({
      where: {
        topicId: topicId,
      },
    });

    // remove all TopicToUserDataForTopic rows for that topic. this will delete any user progress 
    // and notes for that topic.
    await prisma.userDataForTopic.deleteMany({
        where: {
          topicId
        }
    })

    // Delete the topic
    await prisma.topic.delete({
      where: {
        id: topicId,
      },
    });

    // update all topic positions after... 
      // Update the positions of the other topics
      await prisma.topic.updateMany({
        where: {
          position: {
            gt: deletedTopicPosition,
          },
        },
        data: {
          position: {
            decrement: 1,
          },
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


export async function db__updateTopicLanguages({ topicId, languages } : { topicId: string; languages: any[] }): Promise<any> {
  try {
       // Delete existing categories relationships
       await prisma.languagesTopic.deleteMany({
        where: {
          topicId
        }
      });
  
      // Update the concept and create new categories relationships
      await prisma.topic.update({
        where: {
          id: topicId,
        },
        data: {
          languages: {
            create: languages.map((languageId) => ({
              languageId,
            })),
          },
        },
      });
      console.log('Topic Languages updated successfully.');
  } 
  catch (error) {
      console.error('Error updating topic data:', error);
      throw new Error('Failed to update topic data.');
  }
}


export const addNewTopic = async (
  { conceptId, title, description, active = false, selectedLanguages } : 
  { conceptId: string; title: string; description: string; active: boolean; selectedLanguages: any } 
) => {
  try {
    // if an error happens from that func then does this continue or do we go to the catch block?
    let authorId = await db_getAdminIdFromAuth();

    // Fetch the current maximum position
    const maxPosition = await prisma.topic.aggregate({
      _max: {
        position: true,
      },
    });

    // Determine the new position
    const newPosition = (maxPosition._max.position ?? 0) + 1;

    // Create the new topic with the incremented order value
    await prisma.topic.create({
      data: {
        title,
        description,
        conceptId,
        active,
        position: newPosition,
        introMedia: {
            url: null,  type: null, bucketId: null
        },
        languages: {
          create: selectedLanguages.map((languageId: string ) => ({
            languageId,
          })),
        },
        authorId: authorId
      },
    });

    return await getAllConcepts();
  } 
  catch (error) {
    throw new Error(`Failed to create a new topic: ${error.message}`);
  }
};


export const db__updateTopicOrder = async ({ conceptId, topicPositions }) => {
  try {
    // Iterate over each item in the topicPositions array and update the topic position
    for (const { topicId, position } of topicPositions) {
      await prisma.topic.update({
        where: {
          id: topicId,
          conceptId
        },
        data: {
          position: position,
        },
      });
    }
    console.log('Topic positions were successfully updated.');
    return await getAllConcepts();
  } 
  catch (error) {
    console.error('Failed to update topic item order:', error);
    throw new Error(`Failed to update topic item order: ${error.message}`);
  }
};


export const updateTopicStatus = async (topicId: string, status: boolean) => {
    try {
      await prisma.topic.update({
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
      await prisma.topic.update({
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

export const updateTopicIntro = async ( topicId , media ) => {
    try {
        await prisma.topic.update({
            where: { id: topicId },
            data: {
                introMedia: media
            }
        })
    }
    catch ( error ) {
        throw new Error(`Failed to update topic resources: ${error.message}`);
    }
}