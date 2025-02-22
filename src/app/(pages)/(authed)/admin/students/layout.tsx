'use server'
import Title from "@/app/reusables/content/title"
import { Card } from "@/components/ui/card"
import StudentsList from "./comp.students"
import Link from "next/link"

export default async function StudentPageLayout ( { children } ) {
    return (
        <main className="flex flex-col h-full">
            <Link href={'/admin/students'}>
                <Title title="Tutor Area" variant="heading" noMargin={false} />
            </Link>
            <Card className="flex flex-row h-full mb-6  py-0">
                <StudentsList />
                <>
                  { children }
                </>
            </Card>
        </main>
    )
}