import Title from "@/app/reusables/content/title"
import UsersList from "./(components)/users"

export default async function StudentsPage ( ) {
    return (
        <main className="flex flex-col">
            <Title title="Student area" variant="heading" />
            <div className="flex flex-row">
                    <UsersList />
                    <div> 

                    </div>
            </div>
        </main>
    )
}