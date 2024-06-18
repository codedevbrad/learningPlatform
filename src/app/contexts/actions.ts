'use server'
import { db_userOrAdmin } from "@/db_queries/user/admin.queries"

export const action__checkRole = async ( ) => {
    try {
        let isAdmin = await db_userOrAdmin();
        return isAdmin;
    }
    catch( error ) {
        console.log( error );
        throw error;
    }
}