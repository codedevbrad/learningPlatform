import prisma from "../../../prisma/client"


export async function getUserByUserId(userId) {
  try {
    const user = await prisma.users.findFirst({
      where: {
        userId: userId,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function addUser(userId) {
  try {
    const newUser = await prisma.users.create({
      data: {
        userId: userId,
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}