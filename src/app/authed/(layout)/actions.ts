'use server'
import { getUserByUserId } from '@/db_queries/user/queries'

export async function action__userRegisteredThroughDbCheck ( userId ) {
    // check if user exists in the db using userId ...
    try {
        const user = await getUserByUserId(userId);
        return user ? true : false;
    } 
    catch (error) {
        return { message: 'Error fetching user', error: error.message };
    }
}
