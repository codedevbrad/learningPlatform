'use server'
import prisma from '../../../prisma/client'

export async function db__getProposedSession ( { studentId } ) {
    try {
      const session = await prisma.proposedSession.findUnique({
        where: {
          studentId
        },
      });
      return session;
    } 
    catch (error) {
      console.error('Error retrieving session:', error);
      throw error;
    }
}


export async function db__upsertProposedSession ({ studentId , sessionData }) {
    try {
      const session = await prisma.proposedSession.upsert({
        where: {
          studentId: studentId,
        },
        update: {
          title: sessionData.title,
          date: sessionData.date,
          length: sessionData.length,
          studentId: sessionData.studentId,
        },
        create: {
          title: sessionData.title,
          date: sessionData.date,
          length: sessionData.length,
          studentId: sessionData.studentId,
        },
      });
      return session;
    } 
    catch (error) {
      console.error('Error upserting session:', error);
      throw error;
    }
  }