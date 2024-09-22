'use server'
import Title from "@/app/reusables/content/title"
import { Card } from "@/components/ui/card"

import { db_userCanAccess } from "@/app/reusables/access/actions/actions"
import AdminControlClient from "./client.admin.control"
  

export default async function ControlStudentAccess ( { userId } : { userId: string }) {
    const userisAllowed = await db_userCanAccess({ userIdfromAdmin: userId });

    return (
     !userisAllowed.allowed ? (
            <Card className="p-4 mb-5">
                <Title title="Student Control" variant="subheading1" noMargin={false} />
                <div>
                    <AdminControlClient />
                </div>
            </Card>
        ) : (
            null 
        )
    )
}