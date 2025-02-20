
"use server";
import prisma from "../../../../prisma/client";

/** CAPTURE USER INTEREST IN DB  **/

interface CreateInterestedCaptureParams {
  name: string;
  email: string;
}

export async function createInterestedCapture({
  name,
  email,
}: CreateInterestedCaptureParams) {
  try {
    return await prisma.interestedCapture.create({
      data: { name, email },
    });
  } 
  catch (error: any) {
    // Handle unique constraint (duplicate email) error

    // Check if this is a Prisma 'unique constraint' error (P2002)
    if (error.code === "P2002") {
        throw new Error("It seems you've already expressed interest using this email.");
    }

    throw new Error("Failed to create InterestedCapture.");
  }
}


/* === SETUP A TUTOR WITH A STUDENT === */


/* === REMOVE A TUTOR AND STUDENT + THEIR CONTENT === */
