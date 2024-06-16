'use server'
import { db_fetchUser } from "@/db_queries/user/admin.queries"

export const action__getUserData = async ( ) => {
    try {
        return await db_fetchUser( );
    }
    catch ( error ) {
        console.error("Error creating user:", error);
    }
}