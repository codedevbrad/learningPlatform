
// Get the availability for a specific tutor ...

export async function getAvailability({ adminUserId } : { adminUserId : string }) {
    try {
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
  