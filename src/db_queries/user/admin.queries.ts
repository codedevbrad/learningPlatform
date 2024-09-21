'use server'

import prisma from "../../../prisma/client"
import { auth } from "@clerk/nextjs/server"

export const db_userOrAdmin = async () => {
    try {
        const { userId } = auth();
        if (!userId) throw new Error('No user logged in');
        let adminFound = await prisma.adminUsers.findFirst({
            where: { userId }
        });
        return adminFound !== null;
    } 
    catch (error) {
        throw error;
    }
};


export const db_userCanAccess = async ({ userIdfromAdmin } : { userIdfromAdmin: string }) => {
    try {
        const { userId } = auth();
        if (!userId) throw new Error('No user logged in');
        let user = await prisma.users.findFirst({
            where: { userId: userId || userIdfromAdmin }
        });
        return user?.status == 'ACTIVE';
    } 
    catch (error) {
        throw error;
    }
}


export const db__getAllPendingStudents = async ( ) => {
    try {
        const { userId } = auth();
        if (!userId) throw new Error('No user logged in');
        return await prisma.users.findMany({
            where: {
                status: 'PENDING'
            }
        });
    }
    catch ( error ) {
        throw error;
    } 
}

export const db__getAllStudents = async ( ) => {
    try {
        const { userId } = auth();
        if (!userId) throw new Error('No user logged in');
        return await prisma.users.findMany();
    }
    catch ( error ) {
        throw error;
    }
}