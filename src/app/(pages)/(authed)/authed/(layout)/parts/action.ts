'use server'
import { db_fetchUser } from "@/db_queries/user/queries"

export async function action__getUserName( ) {
    try {
        let user = await db_fetchUser( );
        return user?.nickname;

    }
    catch ( error ) {
        console.error( error );
        throw error;
    }
} 