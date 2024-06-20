import prisma from "../../../prisma/client";
import { auth } from "@clerk/nextjs/server";

export const db_userOrAdmin = async () => {
    try {
        const { userId } = auth();
        if (!userId) throw new Error('No user logged in');
        let adminFound = await prisma.adminUsers.findFirst({
            where: { userId }
        });
        return adminFound !== null;
    } catch (error) {
        throw error;
    }
};