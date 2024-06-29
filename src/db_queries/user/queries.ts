import prisma from "../../../prisma/client"
import { auth, currentUser } from "@clerk/nextjs/server"

export const db_fetchUser = async ( ) => {
  try {
      const { userId } = auth()
      if ( !userId ) throw 'no user logged'
      return await prisma.users.findFirst({
          where: { userId }
      });
  }
  catch ( error ) {
      console.error("Error creating user:", error);
      throw error;
  }
}


export async function getUserByUserId(userId) {
  try {
    const user = await prisma.users.findFirst({
      where: {
        userId: userId,
      },
    });
    return user;
  } 
  catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}


export async function addUser( userObj ) {
  try {
    const newUser = await prisma.users.create({
      data: userObj
    });
    return newUser;
  } 
  catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}


export async function fetchUserDataOnTopic(topicId: string) {
  try {
    let { userId } = auth();
    if (!userId) {
      throw new Error("User ID is null or undefined");
    }
    const data = await prisma.userDataForTopic.findFirst({
      where: {
        userId,
        topicId: topicId
      },
    });
    return data;
  } 
  catch (error) {
    console.error("Error fetching user data for topic:", error);
    throw error;
  }
}


export async function fetchAllTopicsThatHaveUserData() {
  try {
    let { userId } = auth();
    if (!userId) {
      throw new Error("User ID is null or undefined");
    }
    return await prisma.userDataForTopic.findMany({
      where: {
        userId
      },
      include: {
        topic: {
          select: {
            title: true,
            description: true
          }
        }
      }
    });
  } 
  catch (error) {
    console.error("Error fetching topics user has completed/made notes on.", error);
    throw error;
  }
}


export async function updateUserProgressForTopic(progress: boolean, topicId: string ) {
  try {
    // Authenticate and get the user ID
    let { userId } = auth();
    if (!userId) {
      throw new Error("User ID is null or undefined");
    }

    // Use upsert to update the user's progress if the row exists, or create a new row if it does not
    const data = await prisma.userDataForTopic.upsert({
      where: {
        userId: userId,
        topicId: topicId
      },
      update: {
        userProgress: !progress, // Update the userProgress based on the passed result
      },
      create: {
        userId: userId,
        topicId: topicId,
        userNotes: {},
        userProgress: true // Initialize with the passed progress
      },
    });
    return data;
  } 
  catch (error) {
    console.error("Error updating user progress for topic:", error);
    throw error;
  } 
}


export async function updateUserNotesForTopic(userNotes: any, topicId: string) {
  try {
    // Authenticate and get the user ID
    const { userId } = auth();

    // Check if userId is valid
    if (!userId) {
      throw new Error("User ID is null or undefined");
    }

    // Upsert the user's notes for the specified topic in the database
    const data = await prisma.userDataForTopic.upsert({
      where: {
          userId: userId,
          topicId: topicId
      },
      update: {
        userNotes: userNotes, // Update the userNotes if the record exists
      },
      create: {
        userId: userId,
        topicId: topicId,
        userNotes: userNotes, // Create a new record with the provided userNotes
        userProgress: false
      }
    });
    // Return the upserted data
    return data;
  } 
  catch (error) {
    // Log any errors that occur during the upsert process
    console.error("Error updating or creating user notes for topic:", error);
    // Rethrow the error to propagate it up the call stack
    throw error;
  }
}