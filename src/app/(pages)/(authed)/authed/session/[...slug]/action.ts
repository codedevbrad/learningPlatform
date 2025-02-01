'use server'

import { db__getSession } from "@/db_queries/sessions/sharable.queries";

// Correct action__getSession function
export async function action__getSession({ sessionId }) {
    try {
      // Log to check the actual type of sessionId
      console.log('sessionId:', sessionId, typeof sessionId);
  
      // Ensure sessionId is a string and not an array
      if (Array.isArray(sessionId)) {
        sessionId = sessionId[0]; // Access the first element if it's an array
      }
  
      // Call your database function or perform the desired action here
      return await db__getSession({ sessionId });
    } 
    catch (error) {
      console.error('Error fetching session:', error);
      throw error;
    }
}
  