import { google } from "googleapis"
import path from "path"

const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
const KEY_FILE = path.join(process.cwd(), "your-service-account-key.json");

export async function GET(request) {
  try {
    // Parse query parameters from the request URL
    const { searchParams } = new URL(request.url);
    const timeMin = searchParams.get("timeMin") || new Date().toISOString();
    const timeMax =
      searchParams.get("timeMax") ||
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const calendarId =
      searchParams.get("calendarId") || "primary"; // Default to the primary calendar

    // Authenticate with the service account
    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_FILE,
      scopes: SCOPES,
    });

    // Initialize the Calendar API
    const calendar = google.calendar({ version: "v3", auth });

    // Fetch events from the calendar
    const response = await calendar.events.list({
      calendarId,
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items;

    // Return the fetched events in a JSON response
    return new Response(
      JSON.stringify({
        message: "Events fetched successfully!",
        events,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching events:", error);

    return new Response(
      JSON.stringify({
        message: "Error fetching events",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
