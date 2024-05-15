import Title from "@/app/reusables/content/title"
import Statistics from "./components/statistics"
import UsersList from "./components/users"

export default async function CoursesPage ( ) {
    return (
        <main className="flex flex-col">
            <Title title="Dashboard" variant="heading" />
           <Statistics />
           <div className="flex flex-row space-x-3 my-3">
                <UsersList />
                chart
           </div>
           
        </main>
    )
}