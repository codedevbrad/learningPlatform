import prisma from '../../../prisma/client'

export async function getLanguages ( ) {
    try {
      return await prisma.languages.findMany({});
    }
    catch ( error ) {
      console.error('Error fetching languages: ', error);
      throw error;
    }
}

export async function getCategories ( ) {
    try {
      return await prisma.categories.findMany({});
    }
    catch ( error ) {
      console.error('Error fetching categories:', error);
      return [];
    }
}

// Fetch categories by IDs
export async function getCategoriesByIds(categoryIds: string[]) {
    try {
      const categories = await prisma.categories.findMany({
        where: {
          id: {
            in: categoryIds
          }
        }
      });
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }
  
// Fetch languages by IDs
export async function getLanguagesByIds(languageIds: string[]) {
  try {
    const languages = await prisma.languages.findMany({
      where: {
        id: {
          in: languageIds
        }
      }
    });
    return languages;
  } 
  catch (error) {
    console.error('Error fetching languages:', error);
    return [];
  }
}