import prisma from "../../../prisma/client"
import { auth, currentUser } from "@clerk/nextjs/server"


export const db_userOrAdmin = async ( ) => {
    try {
        const { userId } = auth()
        if ( !userId ) throw 'no user logged'
        let adminFound = await prisma.adminUsers.findFirst({
            where: { userId }
        });
        return adminFound !== null;
    }
    catch ( error ) {
        console.error("Error creating user:", error);
        throw error;
    }
}