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


export async function updateUserProgressForTopic(progress: boolean, topicId: string, ) {
  try {
    // Authenticate and get the user ID
    let { userId } = auth();
    if (!userId) {
      throw new Error("User ID is null or undefined");
    }

    // Update the user's progress for the specified topic
    const data = await prisma.userDataForTopic.update({
      where: {
          userId: userId,
          topicId: topicId
      },
      data: {
        userProgress: !progress, // Update the userProgress based on the passed result
      },
    });

    console.log( data )
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
    let { userId } = auth();
    if (!userId) {
      throw new Error("User ID is null or undefined");
    }

    // Update the user's notes for the specified topic
    const data = await prisma.userDataForTopic.update({
      where: {
          userId: userId,
          topicId: topicId
      },
      data: {
        userNotes: userNotes, // Update the userNotes based on the passed notes
      },
    });

    console.log(data);
    return data;
  } 
  catch (error) {
    console.error("Error updating user notes for topic:", error);
    throw error;
  } 
}
