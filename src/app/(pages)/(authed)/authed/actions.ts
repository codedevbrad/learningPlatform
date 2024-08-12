'use server'
import { getUserByUserId , addUser } from '@/db_queries/user/queries'
import { auth, currentUser } from "@clerk/nextjs/server";

// get user id from clerk.

export async function action__userRegisteredThroughDbCheck (  ) {
    // check if user exists in the db using userId ...
    try {
        const { userId } = auth();
        const user = await getUserByUserId(userId);
        return user ? true : false;
    } 
    catch (error) {
        return { message: 'Error fetching user', error: error.message };
    }
}

export async function action__createUser ( newUser ) {
    try {
        const { userId } = auth();
        const user = { ...newUser , userId: userId }
        await addUser( user );
        console.log( { ...newUser , userId: userId } );
    }
    catch ( error ) {
        console.error( 'couldnt save user', error );
        throw error;
    }
}