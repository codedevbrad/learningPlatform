'use server';

export async function fetchAvailability() {
  const API_KEY = process.env.CALENDAR_API_KEY;
  const CALENDAR_ID = process.env.CALENDAR_ID;

  const timeMin = new Date().toISOString();
  const timeMax = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString();

  const requestBody = {
    timeMin,
    timeMax,
    items: [{ id: CALENDAR_ID }],
  };

  try {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/freeBusy?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch availability');
    }

    const data = await response.json();

    const busySlots = data.calendars[CALENDAR_ID]?.busy || [];
    return busySlots;
  } catch (error) {
    console.error('Error fetching availability:', error);
    throw new Error('Unable to fetch availability');
  }
}
