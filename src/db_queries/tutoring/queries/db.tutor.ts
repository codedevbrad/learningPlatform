import prisma from "../../../../prisma/client"
import { USERTYPE } from "@prisma/client"

/* === GET AVAILABILITY OF TUTOR === */

export async function db__getCalendarOfTutor({
  userId,
  fetchBy, 
}: {
  userId: string;
  fetchBy: USERTYPE;
}) {
  try {
    if (fetchBy === USERTYPE.TEACHER) {
      // If the caller is a TEACHER, fetch their own calendar (tutorAvailability).
      const tutorRecord = await prisma.adminUsers.findUnique({
        where: { userId },              // or { id: userId }, depending on how you store it
        include: {
          tutorAvailability: true,      // presumably a one-to-one or one-to-many relation
        },
      });
      return tutorRecord?.tutorAvailability;
    } 
    else {
      // If the caller is a STUDENT, find which tutor they're assigned to and fetch the tutor’s calendar.
      const studentRecord = await prisma.users.findUnique({
        where: { userId },
        include: {
          tutorRelation: {
            include: {
              tutor: {
                include: {
                  tutorAvailability: true,
                },
              },
            },
          },
        },
      });

      // studentRecord?.tutorRelation?.tutor is your AdminUsers record
      // so just return the tutorAvailability from there.
      return studentRecord?.tutorRelation?.tutor?.tutorAvailability;
    }
  } 
  catch (error) {
    throw error;
  }
}
