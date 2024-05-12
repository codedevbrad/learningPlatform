// *** CONCEPTS *** ///
import prisma from '../../../prisma/client'

export async function getAllConcepts ( ) {
    return await prisma.concepts.findMany({
        include: {
          topics: true // Include the associated topics for each concept
        }
      })
}