'use server'
import Title from "@/app/reusables/content/title"
import { Card } from "@/components/ui/card"
import UsersList from "./layout.components"

export default async function StudentPageLayout ( { children } ) {
    return (
        <main className="flex flex-col h-full">
            <Title title="Student area" variant="heading" noMargin={false} />
            <Card className="flex flex-row h-full mb-6  py-0">
                <UsersList />
                <>
                  { children }
                </>
            </Card>
        </main>
    )
}