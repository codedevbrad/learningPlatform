import prisma from '../../../prisma/client'
import { auth } from "@clerk/nextjs/server"

export async function db__getChallengeById ( challengeId: string ) {
    try {
        let { userId } = auth();
        if (!userId) {
          throw new Error("User ID is null or undefined");
        }
        return prisma.challenges.findUnique({
            where: {
                id: challengeId
            }
        })
    }
    catch ( error ) {
        console.error('Error fetching all challenges in db', error);
        throw new Error('Failed to fetch challenges.');
    }
}