'use server'

import prisma from "../../../prisma/client"
import { auth } from "@clerk/nextjs/server"

// **** USER MODEL **** //

export const db_userCanAccess = async ({ studentId }) => {
    try {
        const user = await prisma.users.findFirst({
            where: { id: studentId }
        });

        console.log( user );
        return {
            status: user?.status,
            allowed: user?.status === 'ACTIVE'
        };
    } 
    catch (error) {
        throw error;
    }
};

export const changeStudentStatus = async ({ studentId , status } ) => {
    try {
        console.log( studentId , status )
        return await prisma.users.update({
            where: { id: studentId },
            data: { status  },
        });
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


// ****** ADMIN USER ****** //

export const DB_getAdminOBJFromClerkId = async ( ) => {
    try {
        const { userId } = auth();
        if (!userId) throw new Error('No user logged in');
        return await prisma.adminUsers.findFirst({
            where: { userId: userId }
        });
    }
    catch ( err ) {
        throw err;
    }
}


export const db_getAdminIdFromAuth = async ( ) => {
    try {
        const { userId } = auth();
        if (!userId) throw new Error('No user logged in');
        let adminFound = await prisma.adminUsers.findFirst({
            where: { userId }
        });
        return adminFound.id;
    }
    catch ( error ) {
        throw error;
    }
}

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


