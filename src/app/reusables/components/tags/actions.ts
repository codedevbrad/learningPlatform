'use server'
import { getCategories } from "@/db_queries/tags/student.queries"

export async function action_getCategories ( ) {
    try {
        let categories = await getCategories();
        console.log( categories );
        return categories;
    } 
    catch (error) {
        console.error('Error updating topic data asynchronously:', error);
        throw new Error('Failed to update topic data asynchronously.');
    }
}
