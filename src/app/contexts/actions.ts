'use server'
import { db_userOrAdmin } from "@/db_queries/user/admin.queries"

export const action__checkRole = () => new Promise(async (resolve, reject) => {
        try {
            let isAdmin = await db_userOrAdmin();
            resolve(isAdmin);
        } catch (error) {
            console.log('error getting isAdmin');
            reject(error);
        }
});