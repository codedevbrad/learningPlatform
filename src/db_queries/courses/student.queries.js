import prisma from '../../../prisma/client'; 
import { currentUser } from '@clerk/nextjs';

// Retrieve all passwords
export async function getAllCourses ( ) {
  // get current logged userId.
  const { id } = await currentUser();
  if ( !id ) return;
  
  return await prisma.courses.findMany({
    where: { userId: id }
  });
} 

export async function getCoursesAssigned ( ) {
    
}