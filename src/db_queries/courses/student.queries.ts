import prisma from '../../../prisma/client'


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

export async function getCourseById( id ) {
    try {
      return await prisma.courses.findUnique({
        where: {
          id
        }
      })
    }
    catch ( error ) {
      console.error('Error fetching languages:', error);
      return [];
    }
}

// Fetch all courses with associated categories and languages ...
export async function getAllCourses() {
  try {
    const courses = await prisma.courses.findMany({
      include: {
        categories: true,
        languages: true
      }
    });

    // Map courses and replace categories and languages with fetched data
    const mappedCourses = courses.map(async (course) => {
      // Fetch categories and languages for this course
      const categories = await getCategoriesByIds(course.categories.map(cat => cat.categoryId));
      const languages = await getLanguagesByIds(course.languages.map(lang => lang.languageId));
      // const userData = await getUserDataForCourse()
      console.log( categories )

      // Replace category and language IDs with actual data
      return {
        ...course,
        categories,
        languages
      };
    });
    return Promise.all(mappedCourses);
  } 
  catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}