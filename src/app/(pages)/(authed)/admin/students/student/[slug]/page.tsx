'use server'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import MessagesTabContent from "./messages"

import SessionsWithProposals from "@/app/reusables/components/sessions"

import { db_userCanAccess } from "@/db_queries/user/admin.queries"
import Title from "@/app/reusables/content/title"
import { Card } from "@/components/ui/card"

function AllowStudentAccess ( ) {
    return (
        <Card className="p-4 mb-5">
            <Title title="Student Control" variant="subheading1" noMargin={false} />
            <p> you need to accept this student in first before you can message or start sessions. </p>
        </Card>
    )
}

export default async function StudentTabsArea({ params }) {
    // Extract student id (slug) from params...
    const { slug } = params;
    const userisAllowed = await db_userCanAccess({ userIdfromAdmin: slug });
    
    return (
        <div className="flex-1 flex flex-col border-l border-gray-200 p-4">
            { !userisAllowed ? <AllowStudentAccess /> : null }
            <Tabs storageKey="studentArea__tabs" className="flex flex-col h-full">
                <TabsList className="flex flex-row justify-start">
                    <TabsTrigger value="messages">Messages</TabsTrigger>
                    <TabsTrigger value="tutoring">Tutoring</TabsTrigger>
                </TabsList>
                <TabsContent value="messages"> 
                    <MessagesTabContent studentId={slug} />
                </TabsContent>
                <TabsContent value="tutoring">
                    <SessionsWithProposals studentId={slug} userType="Teacher" />
                </TabsContent>
            </Tabs>
        </div>
    );
}