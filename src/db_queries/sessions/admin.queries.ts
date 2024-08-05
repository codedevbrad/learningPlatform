'use server'
import prisma from '../../../prisma/client'
import { subHours, isBefore } from 'date-fns'


export async function db__getProposedSession({ studentId }) {
  try {
    const session = await prisma.proposedSession.findUnique({
      where: {
        studentId,
      },
    });

    if (!session) {
      return null;
    }

    const oneHourBeforeSession = subHours(session.date, 1);
    const now = new Date();

    if (isBefore(oneHourBeforeSession, now) || isBefore(session.date, now)) {
      await prisma.proposedSession.delete({
        where: {
          studentId,
        },
      });
      return null;
    }

    return session;
  } 
  catch (error) {
    console.error('Error retrieving session:', error);
    throw error;
  }
}


export async function db__sessionAccepted ( { studentId } ) {

}


export async function db__cancelSession ( { studentId } ) {
  
}


export async function db__upsertProposedSession ({ studentId , sessionData }) {
   // check if current logged in is Admin or Student ...
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
          proposer: sessionData.proposer 
        },
        create: {
          title: sessionData.title,
          date: sessionData.date,
          length: sessionData.length,
          studentId: sessionData.studentId,
          proposer: sessionData.proposer 
        },
      });
      return session;
    } 
    catch (error) {
      console.error('Error upserting session:', error);
      throw error;
    }
  }