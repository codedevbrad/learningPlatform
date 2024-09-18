// 'use server'
// import prisma from '../../../../../prisma/client'
// import { subHours, isBefore } from 'date-fns'
// import { ProposedSession, Sessions, USERTYPE } from '@prisma/client'
// import { db_fetchUser, getUserByuuid } from '@/db_queries/user/queries'

// interface DbGetProposedSessionParams {
//   studentId: string;
// }

// interface DbRemoveProposedSessionParams {
//   studentId: string;
// }

// interface DbUpsertProposedSessionParams {
//   studentId: string;
//   sessionData: {
//     title: string;
//     date: Date;
//     length: number;
//     studentId: string;
//     proposer: USERTYPE;
//   };
// }

// interface DbConfirmProposedSessionParams {
//   studentId: string;
// }

// export async function db__getSessions({ studentId } : { studentId : string; }) {
//   try {
//     let { userId } = await getUserByuuid(studentId);
//     // Fetch sessions where the session's userId matches the given studentId
//     const sessions = await prisma.sessions.findMany({
//       where: {
//         userId, // Assuming studentId corresponds to the userId in the Sessions model
//       },
//       include: {
//         student: true, // Include related user data if needed
//       },
//     });
//     console.log( sessions )
//     return sessions;
//   } 
//   catch (error) {
//     console.error('Error fetching sessions:', error);
//     throw error;
//   }
// }

// export async function db__getProposedSession({ studentId }: DbGetProposedSessionParams): Promise<ProposedSession | null> {
//   try {
//     const session = await prisma.proposedSession.findUnique({
//       where: {
//         studentId,
//       },
//     });

//     if (!session) {
//       return null;
//     }

//     const oneHourBeforeSession = subHours(session.date, 1);
//     const now = new Date();

//     if (isBefore(oneHourBeforeSession, now) || isBefore(session.date, now)) {
//       await prisma.proposedSession.delete({
//         where: {
//           studentId,
//         },
//       });
//       return null;
//     }

//     return session;
//   } 
//   catch (error) {
//     console.error('Error retrieving session:', error);
//     throw error;
//   }
// }

// export async function db__removeProposedSession({ studentId }: DbRemoveProposedSessionParams): Promise<void> {
//   try {
//     await prisma.proposedSession.delete({
//       where: {
//         studentId
//       }
//     });
//   } 
//   catch (error) {
//     console.error('Error deleting proposed session:', error);
//   }
// }

// export async function db__upsertProposedSession({ studentId, sessionData }: DbUpsertProposedSessionParams): Promise<ProposedSession> {
//   try {
//     const session = await prisma.proposedSession.upsert({
//       where: {
//         studentId: studentId,
//       },
//       update: {
//         title: sessionData.title,
//         date: sessionData.date,
//         length: sessionData.length,
//         studentId: sessionData.studentId,
//         proposer: sessionData.proposer 
//       },
//       create: {
//         title: sessionData.title,
//         date: sessionData.date,
//         length: sessionData.length,
//         studentId: sessionData.studentId,
//         proposer: sessionData.proposer 
//       },
//     });
//     return session;
//   } 
//   catch (error) {
//     console.error('Error creating / upserting session:', error);
//     throw error;
//   }
// }

// export async function db__confirmProposedSession({ studentId }: DbConfirmProposedSessionParams): Promise<Sessions | null> {
//   try {
//     // Fetch the proposed session details using the studentId
//     const proposedSession = await db__getProposedSession({ studentId });

//     if (!proposedSession) {
//       return null;
//     }

//     const { title, date, length, proposer } = proposedSession;

//     let { userId } = await getUserByuuid(studentId);

//     if ( !userId ) throw new Error('Couldnt locate userId of student');

//     // Create the new session, linking it to the user via the userId
//     const newSession = await prisma.sessions.create({
//       data: {
//         title,
//         date,
//         length,
//         proposer,
//         notes: {},
//         preSessionNotes: {}, 
//         student: {
//           connect: { userId }, // Establish the connection to the user
//         },
//       },
//     });

//     if (!newSession) {
//       throw new Error('Could not create a new session');
//     }

//     // Remove the proposed session after confirming it...
//     await db__removeProposedSession({ studentId });

//     return newSession;
//   } 
//   catch (error) {
//     console.error('Error converting proposed session to a confirmed session:', error);
//     throw error;
//   }
// }