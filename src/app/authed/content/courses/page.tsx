import Title from "@/app/reusables/content/title"
import CoursesUI from "./components/courseUI"
 
export default function CoursesPage ( ) {
    return (
        <main className="flex flex-col items-center p-4">
            <Title title="Courses to work on" variant="heading" />
            <div className="my-6">
                <CoursesUI /> 
            </div>
        </main>
    )
}