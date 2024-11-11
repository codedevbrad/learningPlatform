'use server'
import Title from "@/app/reusables/content/title"
import { Card } from "@/components/ui/card"

import { db_userCanAccess } from "./actions";

export default async function ControlStudentAccess ( { userId } : { userId: string }) {
    const userisAllowed = await db_userCanAccess({ userIdfromAdmin: userId });

    return (
     !userisAllowed.allowed ? (
            <Card className="p-4 mb-5">
                <Title title="Student Control" variant="subheading1" noMargin={false} />
                <div>
                    <div className="space-y-3">
                        <p>You need to accept this student in first before they can message back or start sessions.</p>
                    </div>
                </div>
            </Card>
        ) : (
            null 
        )
    )
}