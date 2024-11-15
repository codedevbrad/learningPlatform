'use server'
import { db__getAllStudents } from "@/db_queries/user/admin.queries"

export async function action__getStudents ( ) {
    try {
        let users = await db__getAllStudents();
        console.log( users )
        return users;
    }
    catch ( error ) {
        console.error(`error fetching all students : ${ error }`);
        throw error;
    }
}