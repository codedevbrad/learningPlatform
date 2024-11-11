'use server'
import { Card } from "@/components/ui/card"
import { db_userCanAccess } from "../../actions/actions"

export default async function AllowContentOrDisplayUserStatus ( { userId , children }) {
    const check = await db_userCanAccess();
    return (
        check.allowed ? (
            { children }
        ) : (
             <Card className="p-4">
                something needs to be done { check.status }
            </Card>
        )
    )
}