import prisma from '../../../prisma/client'
import { getCategoriesByIds, getLanguagesByIds } from '../tags/student.queries'
import { auth } from "@clerk/nextjs/server"

// middleware.


export async function db__getAllChallenges ( ) {
    try {
        let { userId } = auth();
        if (!userId) {
          throw new Error("User ID is null or undefined");
        }
        let challenges = await prisma.challenges.findMany({
            include: {
                languages: true, categories: true
            }
        });
        // Map courses and replace categories and languages with fetched data.
        const mappedChallenges = challenges.map( async (concept) => {
            // Fetch categories and languages for this course
            const categories = await getCategoriesByIds( concept.categories.map( cat => cat.categoryId ) );
            const languages  = await getLanguagesByIds( concept.languages.map( lan => lan.languageId ) );
            return { ...concept, categories, languages };
        });
        return Promise.all( mappedChallenges );
    }
    catch (error) {
        console.error('Error fetching all challenges in db', error);
        throw new Error('Failed to fetch challenges.');
    }
}


export async function db__addChallenge( challengeObj : {
    title: string , selectedCategories: string[], selectedLanguages: string[]
} ) {
    try {
        // create new CategoriesChallenge relations using category ids from selectedCategories ...
        // create new LanguagesChallenge relations using language ids from selectedLanguages ...

        const { title, selectedCategories , selectedLanguages } = challengeObj;

        await prisma.challenges.create({
            data: {
                title,
                languages: {
                    create: selectedLanguages.map( languageId => ({
                        languageId
                    }))
                },
                categories: {
                    create: selectedCategories.map(categoryId => ({
                        categoryId
                    }))
                },
                tasks: {},
                notes: {},
                description: [],
                resources: []
            },
            include: {
                categories: true,
                languages: true 
            }
        });
        return await db__getAllChallenges();
    }
    catch ( error ) {
        console.error('Error creating new challenge in db', error );
        throw new Error('Failed to create new challenge.');
    }
}


export async function db__editChallenge({ challengeId, challengeObj }: {
    challengeId: string;
    challengeObj: {
        title: string;
        selectedCategories: string[];
        selectedLanguages: string[];
    };
}) {
    try {
        const { title, selectedCategories, selectedLanguages } = challengeObj;

        // Delete existing categories and languages relationships
        await prisma.categoriesChallenge.deleteMany({
            where: {
                challengeId: challengeId,
            },
        });

        await prisma.languagesChallenge.deleteMany({
            where: {
                challengeId: challengeId,
            },
        });

        // Update the challenge and create new categories and languages relationships
        await prisma.challenges.update({
            where: {
                id: challengeId,
            },
            data: {
                title,
                categories: {
                    create: selectedCategories.map((categoryId) => ({
                        categoryId,
                    })),
                },
                languages: {
                    create: selectedLanguages.map((languageId) => ({
                        languageId,
                    })),
                },
            },
        });

        return await db__getAllChallenges();
    } catch (error) {
        console.error('Error editing existing challenge in db', error);
        throw new Error('Failed to edit existing challenge.');
    }
}



// Function to delete a challenge and its related CategoriesChallenge and LanguagesChallenge
export async function db__deleteChallenge(challengeId: string) {
  try {
    // Check if challengeId is provided
    if (!challengeId) {
      throw new Error("Challenge ID is required for deletion.");
    }

    // Delete CategoriesChallenge and LanguagesChallenge related to the challengeId
    await prisma.categoriesChallenge.deleteMany({
        where: {
        challengeId,
        },
    });

    await prisma.languagesChallenge.deleteMany({
        where: {
        challengeId,
        },
    });

    // Delete the challenge itself
    const deletedChallenge = await prisma.challenges.delete({
      where: {
        id: challengeId,
      },
    });

    return deletedChallenge;
  } catch (error) {
    console.error('Error deleting challenge in db', error);
    throw new Error('Failed to delete challenge.');
  }
}
