'use server'
import prisma from "../../../../../prisma/client";
import { auth } from "@clerk/nextjs/server"

export const db_userCanAccess = async (input?: { userIdfromAdmin?: string }) => {
    try {
        // Extract userIdfromAdmin if input is an object, otherwise it's undefined
        const userIdfromAdmin = input?.userIdfromAdmin;

        const { userId } = auth();
        if (!userId && !userIdfromAdmin) throw new Error('No user logged in or no user ID provided');

        const user = await prisma.users.findFirst({
            where: { userId: userId || userIdfromAdmin }
        });

        return {
            allowed: user?.status === 'ACTIVE',
            status: user?.status
        };
    } 
    catch (error) {
        throw error;
    }
};
