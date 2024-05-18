import { getAllConcepts } from "../concepts/student.queries"
import { getAllCourses } from "../courses/student.queries"

export async function getAllStudentContent ( ) {
    let courses = await getAllConcepts();
    let concepts = await getAllCourses();
    return courses;
}