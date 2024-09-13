'use server';
import prisma from '../../../prisma/client';

/* 
  === MAY NEED TO DELETE ASSOCIATIONS ===
  The change you are trying to make would violate the required relation 
  'LanguagesToLanguagesCourse' between the `LanguagesCourse` and `Languages` models.
*/

// Add Category
export async function addCategory(data) {
    try {
        return await prisma.categories.create({
            data,
        });
    } 
    catch (error) {
        console.error('Error adding category:', error);
        throw error;
    }
}

// Update Category
// Update Category
export async function updateCategory(id, data) {
    try {
        const { name, color } = data;
        return await prisma.categories.update({
            where: { id },
            data: { name, color },
        });
    } 
    catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
}


// Delete Category
export async function deleteCategory(id) {
    try {
        return await prisma.categories.delete({
            where: { id },
        });
    } 
    catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
}

// Add Language
export async function addLanguage(data) {
    try {
        return await prisma.languages.create({
            data,
        });
    } 
    catch (error) {
        console.error('Error adding language:', error);
        throw error;
    }
}

// Update Language
export async function updateLanguage(id, data) {
    try {
        // Destructure the fields you want to update, excluding `id`
        const { name, color } = data;
        return await prisma.languages.update({
            where: { id },
            data: { name, color },
        });
    } 
    catch (error) {
        console.error('Error updating language:', error);
        throw error;
    }
}

// Delete Language
export async function deleteLanguage(id) {
    try {
        return await prisma.languages.delete({
            where: { id },
        });
    } 
    catch (error) {
        console.error('Error deleting language:', error);
        throw error;
    }
}
