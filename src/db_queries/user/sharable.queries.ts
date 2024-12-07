'use server'
import prisma from "../../../prisma/client"
import { auth } from "@clerk/nextjs/server"

export const db_userCanAccess = async () => {
    try {
        const { userId } = auth()
        const user = await prisma.users.findFirst({
            where: {
                userId : userId
            }
        });
        return {
            status: user?.status,
            allowed: user?.status === 'ACTIVE'
        };
    } 
    catch (error) {
        throw error;
    }
};

export const db_userCanAccess__ById = async ({ studentId } : { studentId?: string }) => {
    try {
        const user = await prisma.users.findFirst({
            where: {
                userId : studentId
            }
        });
        return {
            status: user?.status,
            allowed: user?.status === 'ACTIVE'
        };
    } 
    catch (error) {
        throw error;
    }
};
