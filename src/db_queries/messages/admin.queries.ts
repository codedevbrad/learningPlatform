'use server'
import prisma from '../../../prisma/client'


export const db__getMessagesBetweenStudent = async ({ studentId }) => {
  try {
    let messages = await prisma.messages.findMany({
      where: {
        studentId,
      },
      orderBy: {
        timestamp: 'asc' 
      },
    });
    return messages;
  } 
  catch (error) {
    throw new Error(`Failed to fetch messages between student and teacher: ${error.message}`);
  }
};



export const db__postMessageBetweenStudent = async ({ messageData }) => {
  try {
    const {sender, text, studentId} = messageData;
    await prisma.messages.create({
      data: {
        sender,
        text,
        studentId,
        timestamp: new Date(),
      },
    });
  } 
  catch (error) {
    throw new Error(`Failed to post message: ${error.message}`);
  }
};