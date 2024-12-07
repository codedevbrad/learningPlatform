'use actions'

import prisma from "../../../../prisma/client"

export async function saveAvailability(adminUserId: string, weekSchedule: any) {
    return await prisma.calendar.create({
      data: {
        relatedToId: adminUserId,
        availability: weekSchedule,
      },
    });
}

export async function getAvailability(adminUserId: string) {
    const calendar = await prisma.calendar.findFirst({
      where: { relatedToId: adminUserId },
    }); 
    return calendar?.availability;
}
  