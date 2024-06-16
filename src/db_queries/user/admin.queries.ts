import prisma from "../../../prisma/client"
import { auth, currentUser } from "@clerk/nextjs/server";

export const db_fetchUser = async ( ) => {
    try {
        // Query DB for user specific information or display assets only to signed in users ...
        const { userId } = auth()
        return await prisma.users.findFirst({
            where: { userId }
        });
    }
    catch ( error ) {
        console.error("Error creating user:", error);
        throw error;
    }
}