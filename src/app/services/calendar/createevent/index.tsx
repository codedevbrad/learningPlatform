interface GoogleCalendarEventParams {
    title?: string;
    description?: string;
    location?: string;
    startDateTime: string; // ISO format: YYYY-MM-DDTHH:mm:ssZ
    endDateTime: string;   // ISO format: YYYY-MM-DDTHH:mm:ssZ
  }
  
  export function createGoogleCalendarEvent({
    title = "New Event",
    description = "",
    location = "",
    startDateTime,
    endDateTime,
  }: GoogleCalendarEventParams): void {
    if (!startDateTime || !endDateTime) {
      console.error("Start and end date/time are required to create a Google Calendar event.");
      return;
    }
  
    const baseUrl = "https://calendar.google.com/calendar/u/0/r/eventedit";
  
    // Helper to format the datetime for Google Calendar
    const formatDateTimeForGoogle = (dateTime: string): string =>
      new Date(dateTime).toISOString().replace(/[-:]|\.\d{3}/g, "");
  
    // Construct the query parameters
    const params = new URLSearchParams({
      text: title, // Event title
      details: description, // Event description
      location: location, // Event location
      dates: `${formatDateTimeForGoogle(startDateTime)}/${formatDateTimeForGoogle(endDateTime)}`, // Start and end time
    });
  
    // Open the Google Calendar event creation page in a new tab
    window.open(`${baseUrl}?${params.toString()}`, "_blank");
  }
  