'use client'
import useSWR from 'swr'
import { useTransition } from 'react'
import Title from "@/app/reusables/content/title"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { changeStudentStatus , db_userCanAccess } from "@/db_queries/user/admin.queries";
import { UserStatus } from "@prisma/client"

// Fetcher function for SWR
const fetchUserAccess = async (userId) => {
    const response = await db_userCanAccess({ studentId: userId });
    return response.allowed;
};

export default function ControlStudentAccess({ userId }) {
    const { data: userIsAllowed, mutate } = useSWR(userId, fetchUserAccess);
    const [isPending, startTransition] = useTransition();

    async function acceptUser() {
        await changeStudentStatus({ studentId: userId, status: UserStatus.ACTIVE });
        mutate(); // Re-fetch userIsAllowed after status change
    }

    if (userIsAllowed === undefined) return (
         <p> checking if you need to accept user </p>
    );

    return !userIsAllowed ? (
        <Card className="p-4 mb-5">
            <Title title="Student Control" variant="subheading1" noMargin={false} />
            <div>
                <div className="space-y-3">
                    <p>You need to set this student to active first before they can message back or start sessions.</p>
                </div>
                <div className="flex justify-end">
                    <Button
                        onClick={() => startTransition(acceptUser)}
                        disabled={isPending}
                        className="bg-black text-white"
                    >
                        {isPending ? 'Accepting...' : 'Accept user'}
                    </Button>
                </div>
            </div>
        </Card>
    ) : null;
}