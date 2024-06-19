import Title from "@/app/reusables/content/title"
import CoursesUI from "./components/courseUI"
import { getAllCourses } from "@/db_queries/courses/student.queries"

export default async function CoursesPage ( ) {
    const courses = await getAllCourses();
    return (
        <main className="flex flex-col items-center p-4">
            <Title title="Courses to work on" variant="heading" noMargin={false} />
            <div className="my-6">
                <CoursesUI courses={ courses }/> 
            </div>
        </main>
    )
}