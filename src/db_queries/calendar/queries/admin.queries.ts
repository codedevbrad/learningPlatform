'use server'

import prisma from "../../../../prisma/client"
import { db_getAdminIdFromAuth } from "@/db_queries/user/admin.queries";

// Save the availability schedule for the admin user
export async function saveAvailability(weekSchedule: any) {
  try {
    // Get admin user ID
    const adminUserId = await db_getAdminIdFromAuth();

    // Check if the admin user already has a calendar
    const existingCalendar = await prisma.calendar.findFirst({
      where: { relatedToId: adminUserId },
    });

    if (existingCalendar) {
      // If a calendar exists, update it
      await prisma.calendar.update({
        where: { id: existingCalendar.id },
        data: {
          availability: weekSchedule, // Save the updated weekSchedule
        },
      });
    } else {
      // If no calendar exists, create a new one and link it to the admin user
      await prisma.calendar.create({
        data: {
          relatedToId: adminUserId, // Enforce the 1-to-1 relationship
          availability: weekSchedule, // Save the weekSchedule
        },
      });
    }
  } 
  catch (error) {
    console.error('Error saving availability:', error);
    throw new Error('Failed to save availability');
  }
}


// Get the availability for the logged in admin user
export async function getAvailability() {
  try {
    let adminUserId = await db_getAdminIdFromAuth();

    // Find the calendar associated with the admin user
    const calendar = await prisma.calendar.findFirst({
      where: { relatedToId: adminUserId },
    });

    // If the calendar exists, return the availability, otherwise return null or empty object
    return calendar ? calendar.availability : null;

  } 
  catch (error) {
    console.error('Error fetching availability:', error);
    throw new Error('Failed to fetch availability');
  }
}
