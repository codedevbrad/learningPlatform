'use server'
import { getCategories,  } from "@/db_queries/tags/student.queries"

export async function action_getCategories ( ) {
    try {
        let categories = await getCategories();
        console.log( categories );
        return categories;
    } 
    catch (error) {
        console.error('Error getting categories asynchronously:', error);
        throw new Error('Failed to get categories asynchronously.');
    }
}

export async function action_getLanguages ( ) {
    try {


    }
    catch ( error ) {
        console.error('Error getting languages asynchronously:', error);
        throw new Error('Failed to get languages asynchronously.');
    }
}